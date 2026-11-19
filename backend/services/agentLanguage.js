/**
 * CIVIC-KALKI — the civic assistant speaks the citizen's language.
 *
 * The engine writes every reply in English (its sentences are fixed and
 * checked). This module decides which language the citizen is using and, when
 * the AI is available, translates the reply into it:
 *   - the reply text, chip labels and summary labels are translated;
 *   - chip values and the citizen's own answers are never changed, so a tapped
 *     chip still matches the form's choice exactly;
 *   - numbers and references (PR-00042) must survive, or the English is kept;
 *   - translations are cached per language, so fixed sentences come back at once.
 * Without the AI the English reply is returned unchanged (the page translator
 * may still translate it in the browser).
 */

const { askJson } = require('./agentIntentRouter');
const { withinBudget } = require('./agentVoice');
const aiClient = require('./aiClient');

// The languages offered by the app's language selector.
const LANGUAGES = {
  en: 'English', hi: 'Hindi', mr: 'Marathi', ta: 'Tamil', te: 'Telugu', bn: 'Bengali', gu: 'Gujarati',
  kn: 'Kannada', ml: 'Malayalam', pa: 'Punjabi', ur: 'Urdu', as: 'Assamese', bho: 'Bhojpuri', doi: 'Dogri',
  gom: 'Konkani', mai: 'Maithili', lus: 'Mizo', ne: 'Nepali', or: 'Odia', sa: 'Sanskrit', sd: 'Sindhi',
};
const DEVANAGARI_LANGS = new Set(['hi', 'mr', 'bho', 'doi', 'gom', 'mai', 'ne', 'sa']);

function isSupported(code) {
  return typeof code === 'string' && Object.prototype.hasOwnProperty.call(LANGUAGES, code);
}

/** The script a message is written in, when it is not Latin. */
function scriptLanguage(text) {
  const t = String(text || '');
  const count = (re) => (t.match(re) || []).length;
  const scripts = [
    ['deva', /[ऀ-ॿ]/g], ['beng', /[ঀ-৿]/g], ['pa', /[਀-੿]/g], ['gu', /[઀-૿]/g],
    ['or', /[଀-୿]/g], ['ta', /[஀-௿]/g], ['te', /[ఀ-౿]/g], ['kn', /[ಀ-೿]/g],
    ['ml', /[ഀ-ൿ]/g], ['ur', /[؀-ۿ]/g],
  ];
  let best = null;
  for (const [code, re] of scripts) {
    const n = count(re);
    if (n >= 2 && (!best || n > best.n)) best = { code, n };
  }
  return best ? best.code : null;
}

/**
 * Which language to reply in: the script the citizen typed in wins; otherwise
 * the language they picked in the app. Devanagari and Bengali script are shared
 * by several languages, so the picked language decides among those.
 */
function replyLanguage(selected, message) {
  const picked = isSupported(selected) ? selected : 'en';
  const script = scriptLanguage(String(message || '').replace(/\[(?:User )?location:[^\]]*\]/gi, ''));
  if (script === 'deva') return DEVANAGARI_LANGS.has(picked) ? picked : 'hi';
  if (script === 'beng') return picked === 'as' ? 'as' : 'bn';
  if (script) return script;
  return picked;
}

// ── Translation with a small cache ───────────────────────────────────────────

const cache = new Map(); // `${lang}\u0000${text}` -> translation
const CACHE_MAX = 3000;

function remember(lang, text, translated) {
  if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value);
  cache.set(`${lang}\u0000${text}`, translated);
}

function budgetMs() {
  const n = Number(process.env.AI_LANGUAGE_BUDGET_MS);
  // Generous: for a citizen writing in their own language, a short wait beats an English reply.
  return Number.isFinite(n) && n > 0 ? n : 6000;
}

// The script each language is written in. A translation in another script
// (the model sometimes slips into a neighbouring language) is not used.
const SCRIPT_OF = {
  hi: /[\u0900-\u097F]/g, mr: /[\u0900-\u097F]/g, bho: /[\u0900-\u097F]/g, doi: /[\u0900-\u097F]/g, gom: /[\u0900-\u097F]/g,
  mai: /[\u0900-\u097F]/g, ne: /[\u0900-\u097F]/g, sa: /[\u0900-\u097F]/g,
  bn: /[\u0980-\u09FF]/g, as: /[\u0980-\u09FF]/g, pa: /[\u0A00-\u0A7F]/g, gu: /[\u0A80-\u0AFF]/g, or: /[\u0B00-\u0B7F]/g,
  ta: /[\u0B80-\u0BFF]/g, te: /[\u0C00-\u0C7F]/g, kn: /[\u0C80-\u0CFF]/g, ml: /[\u0D00-\u0D7F]/g,
  ur: /[\u0600-\u06FF]/g, sd: /[\u0600-\u06FF]/g,
};
const ANY_NON_LATIN_LETTER = /[\u0600-\u06FF\u0900-\u0DFF]/g;

/** Is the text written in the language's own script (English words mixed in are fine)? */
function inExpectedScript(text, lang) {
  const re = SCRIPT_OF[lang];
  if (!re) return true; // Latin-script languages such as Mizo
  const own = (String(text).match(re) || []).length;
  const allNonLatin = (String(text).match(ANY_NON_LATIN_LETTER) || []).length;
  return own > 0 && own >= allNonLatin * 0.9;
}

/** A translation is used only if it keeps every number and reference and the markup. */
function keepsTheFacts(source, translated, lang = null) {
  if (typeof translated !== 'string' || !translated.trim()) return false;
  // A sentence that is only a chip like "Minor" may stay in English; anything longer must be in the language's script.
  if (lang && /[a-z]{3,}.*\s.*[a-z]{3,}/i.test(source) && !inExpectedScript(translated, lang)) return false;
  if (translated.length > source.length * 4 + 40) return false;
  for (const n of source.match(/\d+(?:[.,:/-]\d+)*/g) || []) {
    if (!translated.includes(n)) return false;
  }
  if ((source.match(/\*\*/g) || []).length !== (translated.match(/\*\*/g) || []).length) return false;
  if (source.includes('?') && !/[?？؟]/.test(translated)) return false;
  return true;
}

/**
 * Translate a list of English strings into `lang`. Returns an array of the same
 * length, with null wherever no safe translation was obtained.
 */
async function translateAll(strings, lang) {
  const out = strings.map((s) => cache.get(`${lang}\u0000${s}`) || null);
  const todo = [...new Set(strings.filter((s, i) => s && !out[i]))];
  if (!todo.length) return out;

  const prompt = `Translate these messages from a city's civic help desk into ${LANGUAGES[lang]}, for a resident chatting on their phone.
Write the way people in India actually speak ${LANGUAGES[lang]}: simple, warm and polite. Keep English words that people commonly use as they are.
Keep every number, date and reference code exactly as written (for example PR-00042, 2026-11-17), using Western digits.
Keep **bold** markers and line breaks. Keep names of places and people unchanged. Do not add or remove anything.

MESSAGES:
${JSON.stringify(todo)}

Return JSON only: {"translations": [one translated string per message, same order]}`;

  const result = await withinBudget(askJson(prompt, (d) => Array.isArray(d.translations) && d.translations.length === todo.length), budgetMs());
  if (!result || !result.data) return out;
  todo.forEach((source, i) => {
    const t = result.data.translations[i];
    if (keepsTheFacts(source, t, lang)) remember(lang, source, String(t).trim());
  });
  return strings.map((s) => (s ? cache.get(`${lang}\u0000${s}`) || null : null));
}

/**
 * The reply in `lang`. Unchanged (and without a `lang` mark) when the language
 * is English, the AI is off, or the translation is not safe to show.
 */
async function localizeReply(reply, lang) {
  if (!reply || !isSupported(lang) || lang === 'en' || !aiClient.isConfigured()) return reply;
  const options = Array.isArray(reply.options) ? reply.options : [];
  const summary = Array.isArray(reply.summary) ? reply.summary : [];
  const editable = Array.isArray(reply.editable) ? reply.editable : [];
  const strings = [
    reply.text || '',
    reply.lead || '',
    ...options.map((o) => String(o.label || '')),
    ...summary.map((r) => String(r.label || '')),
    ...editable.map((e) => String(e.label || '')),
  ];
  const t = await translateAll(strings, lang);
  if (!t[0]) return reply; // the main text did not translate: keep the whole reply in English
  const localized = {
    ...reply,
    text: t[0],
    lead: reply.lead ? t[1] || reply.lead : reply.lead,
    lang,
  };
  // Chip labels change; chip values stay the form's exact choices.
  if (options.length) localized.options = options.map((o, k) => ({ ...o, label: t[2 + k] || o.label }));
  if (summary.length) {
    const start = 2 + options.length;
    localized.summary = summary.map((r, k) => ({ ...r, label: t[start + k] || r.label }));
  }
  // Edit labels change; keys, values and choices stay as the form has them.
  if (editable.length) {
    const start = 2 + options.length + summary.length;
    localized.editable = editable.map((e, k) => ({ ...e, label: t[start + k] || e.label }));
  }
  return localized;
}

module.exports = {
  LANGUAGES,
  isSupported,
  scriptLanguage,
  replyLanguage,
  localizeReply,
  keepsTheFacts,
  inExpectedScript,
  _cache: cache,
};
