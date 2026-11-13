/**
 * CIVIC-KALKI — the civic assistant's voice.
 *
 * The conversation engine (agentFormFiller) decides WHAT to ask: which detail,
 * in which order, with which choices. This module only rewords that question so
 * it sounds like a person: one short acknowledgement of what the citizen just
 * said, then the same question.
 *
 * Fail-closed: the AI wording is used only if it passes every check below;
 * otherwise the engine's own sentence is kept. Each reply says which one it is
 * (voice: 'ai' | 'rules') so the chat can label AI wording.
 */

const { askJson } = require('./agentIntentRouter');

const MAX_CHARS = 280;
// Words that expose the machinery behind the conversation.
const SYSTEM_WORDS = /\b(grievance|entity|entities|module|parameter|field|workflow|metadata|form|database|system|ticket|json)\b/i;
// Claims about people, outcomes or seriousness that only the resident may make:
// such a word is allowed only if they used it first (so nothing is invented, and
// the wording never nudges how serious they say it is).
const UNSAID = /\b(hurt|hurts|injur\w*|wounded|accident\w*|safe|safely|unsafe|danger\w*|serious\w*|terribl\w*|awful|scary|alarming|glad|relieved|thankfully|luckily|fortunately|no one|nobody|everyone|anyone|kids?|children|elderly)\b/gi;
// The assistant cannot promise outcomes or timings: it only files the request.
const PROMISES = /\b(will be (fixed|resolved|repaired|sorted|cleaned|done|handled)|guarantee\w*|promise\w*|within|asap|immediately|right away|soon|hours?|days?|weeks?|priority|urgent(ly)?)\b/i;

/**
 * Is this AI wording safe to show in place of `fallback`?
 * - a single short message that still asks a question (contains "?");
 * - it is still about the same thing (mentions one of `subjectWords`);
 * - no system words, no promises, no numbers that were not in the conversation;
 * - no claim about people, outcomes or seriousness the resident did not make;
 * - every choice the question offers (`mustInclude`) is still named.
 */
function acceptable(text, { subjectWords, knownText, mustInclude = [], citizenSaid = '' }) {
  if (typeof text !== 'string') return false;
  const t = text.trim();
  if (t.length < 10 || t.length > MAX_CHARS) return false;
  if (!t.includes('?')) return false;
  if ((t.match(/[.!?](\s|$)/g) || []).length > 4) return false;
  if (/[*_#`<>[\]{}]/.test(t)) return false;
  if (SYSTEM_WORDS.test(t) || PROMISES.test(t)) return false;
  const lower = t.toLowerCase();
  const theySaid = String(citizenSaid || '').toLowerCase();
  for (const w of lower.match(UNSAID) || []) {
    if (!theySaid.includes(w)) return false;
  }
  if (!subjectWords.some((w) => w && lower.includes(String(w).toLowerCase()))) return false;
  if (mustInclude.some((o) => !lower.includes(String(o).toLowerCase()))) return false;
  const known = String(knownText || '');
  for (const n of t.match(/\d+(?:[.,]\d+)*/g) || []) {
    if (!known.includes(n)) return false;
  }
  return true;
}

/**
 * Reword a question reply. `reply.text` is the engine's sentence and stays the
 * answer whenever the AI is off, slow, or its wording fails a check.
 * @returns {Promise<{ text: string, voice: 'ai'|'rules', aiUnavailable: boolean }>}
 */
async function speak({ reply, citizenSaid, serviceLabel, known, subjectWords, mustInclude = [], firstName, useAi = true }) {
  const fallback = { text: reply.text, voice: 'rules', aiUnavailable: false };
  if (!useAi || !Array.isArray(subjectWords) || !subjectWords.length) return fallback;

  const facts = (known || []).filter((r) => r.value).map((r) => `- ${r.label}: ${String(r.value).slice(0, 160)}`).join('\n');
  const prompt = `You are the voice of a city's civic help desk, chatting with a resident who is reporting something. You are warm, calm and brief, like a helpful person at a counter.

THE RESIDENT JUST SAID: "${String(citizenSaid || '').slice(0, 600)}"
WHAT THEY ARE DOING: ${serviceLabel || 'reporting a civic issue'}
${facts ? `WHAT YOU ALREADY KNOW:\n${facts}\n` : ''}${firstName ? `THEIR FIRST NAME: ${firstName}\n` : ''}
YOUR NEXT MESSAGE MUST ASK EXACTLY THIS (same meaning, nothing else): "${reply.text}"

Write that next message:
- Start with a short, natural acknowledgement of what they just said (restate it in your own words, no more than one short sentence). Do not repeat a greeting every time.
- Then ask the question above, in plain everyday words. If it lists choices, keep every choice.
- The question is about the problem being reported (where it is, what it looks like), never about the resident themselves.
- At most 4 short sentences and ${MAX_CHARS} characters, and it must contain the question with a question mark.
- Do not promise anything: no fix, no timeline, no priority. Do not give advice.
- Do not assume anything they did not say (for example whether anyone was hurt), and do not judge how serious it is: they decide that.
- Do not mention forms, fields, systems, modules or databases. No markdown, no emoji.
- Use only facts from above; never invent details.
Return JSON only: {"text": "..."}`;

  const knownText = [citizenSaid, reply.text, facts].join('\n');
  const { data, aiUnavailable } = await askJson(prompt, (d) => typeof d.text === 'string');
  if (!data) return { ...fallback, aiUnavailable };
  const text = String(data.text).trim();
  if (!acceptable(text, { subjectWords, knownText, mustInclude, citizenSaid })) return fallback;
  return { text, voice: 'ai', aiUnavailable: false };
}

module.exports = { speak, acceptable };
