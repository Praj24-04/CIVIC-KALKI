/**
 * CIVIC-KALKI — Civic assistant: understanding layer
 *
 * Turns what a citizen typed into structured facts. It never decides what
 * happens next and never writes anything: the conversation engine
 * (agentFormFiller.js) does that, in code, and checks everything returned here
 * against metadata before using it.
 *
 * Two interpreters with the same output:
 *   - the AI model, when a key is configured and it answers in time;
 *   - plain rules, always available, used when there is no AI or it fails.
 * So the assistant keeps working with no AI at all; it just asks a little more.
 */

const aiClient = require('./aiClient');

// ── Text helpers ─────────────────────────────────────────────────────────────

const STOPWORDS = new Set(('a an the and or but of to in on at for from with by is are was were be been am it its this that these those '
  + 'there here my our your their his her i we you they me us them not no do does did have has had can could will would should '
  + 'please want need like get got just very really so too also about near outside inside some any what which who how when where why '
  + 'hi hello hey thanks thank ok okay yes no '
  // verbs that open a service description ("Report a…", "Start a…") say nothing about which service
  + 'report start record set post find propose register organise organize track create make give add raise file submit request send help').split(' '));

function normalize(text) {
  return String(text || '').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
}

/** Very light stemming, enough to match "potholes" with "pothole" and "leaking" with "leak". */
function stem(word) {
  if (word.length > 5 && word.endsWith('ing')) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith('ies')) return `${word.slice(0, -3)}y`;
  if (word.length > 4 && word.endsWith('es')) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

function tokens(text) {
  return normalize(text).split(' ').filter((w) => w.length > 1 && !STOPWORDS.has(w)).map(stem);
}

function cleanJson(text) {
  let s = String(text || '').trim();
  if (s.startsWith('```')) s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  const first = s.indexOf('{');
  const last = s.lastIndexOf('}');
  return first >= 0 && last > first ? s.slice(first, last + 1) : s;
}

// ── AI call: one retry, and only when the model answered but not usably ──────

/**
 * Ask the model for a JSON object.
 * @param {string|Array} prompt
 * @param {(data: object) => boolean} isValid
 * @returns {Promise<{ data: object|null, aiUnavailable: boolean }>}
 *   aiUnavailable = no usable AI (no key, timeout, network, provider error).
 */
async function askJson(prompt, isValid) {
  if (!aiClient.isConfigured()) return { data: null, aiUnavailable: true };
  let model;
  try {
    model = aiClient.getModel({ generationConfig: { temperature: 0.1, responseMimeType: 'application/json' } });
  } catch (err) {
    return { data: null, aiUnavailable: true };
  }
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const payload = attempt === 1 || typeof prompt !== 'string'
        ? prompt
        : `${prompt}\n\nYour previous answer was not valid. Return ONLY the JSON object described above.`;
      const result = await model.generateContent(payload);
      const data = JSON.parse(cleanJson(result.response.text()));
      if (data && typeof data === 'object' && isValid(data)) return { data, aiUnavailable: false };
    } catch (err) {
      // The call itself failed: do not try again, the handle is marked unavailable.
      if (aiClient.isAiUnavailable(err)) return { data: null, aiUnavailable: true };
      // Otherwise it was an unusable answer: one more attempt.
    }
  }
  return { data: null, aiUnavailable: false };
}

// ── Intent, by rules ─────────────────────────────────────────────────────────

const YES = /^(yes|yes please|yep|yeah|ya|y|ok|okay|sure|correct|right|confirm|confirmed|go ahead|send|send it|submit|submit it|do it|looks good|that s right|thats right|haan|ha|ho|theek hai)$/;
const NO = /^(no|nope|nah|n|not yet|wait|hold on|don t|dont|do not|not now)$/;
const CANCEL = /\b(cancel|never ?mind|forget it|stop this|start over|discard|drop it)\b/;
const STATUS = /\b(status|any update|updates?|track|tracking|what happened|whats happening|what is happening|progress)\b.*\b(request|requests|complaint|complaints|report|reports|case|cases|it|mine|my)\b|\bmy (requests|complaints|reports|cases)\b|^(status|track|updates?)$/;
const CORRECTION = /\b(actually|sorry|i meant|i mean|not .+ but|change|correct|instead|wrong|should be|make it|update)\b/;

function ruleIntent(message) {
  const n = normalize(message);
  if (!n) return 'other';
  if (YES.test(n)) return 'confirm';
  if (NO.test(n)) return 'deny';
  if (CANCEL.test(n)) return 'cancel';
  if (STATUS.test(n)) return 'status';
  return 'file';
}

// ── Choosing a service ───────────────────────────────────────────────────────

/**
 * Score each service against the message using only the service's own
 * metadata: name, description, form and section names, field labels, options.
 * @returns {Array<{ id:number, score:number }>} best first
 */
function scoreServices(message, services) {
  const words = new Set(tokens(message));
  return services
    .map((s) => {
      let strong = 0;
      let weak = 0;
      for (const w of words) {
        if (s.keywords.strong.has(w)) strong += 1;
        else if (s.keywords.weak.has(w)) weak += 1;
      }
      // `strong` = words from the service's own name and description;
      // `weak`   = words that only appear in its form (labels, options).
      return { id: s.id, strong, weak, score: strong * 2 + weak };
    })
    .sort((a, b) => b.strong - a.strong || b.weak - a.weak || a.id - b.id);
}

/**
 * Which service does the citizen mean?
 * @returns {Promise<{ serviceId:number|null, candidates:number[], intent:string, source:'ai'|'rules', aiUnavailable:boolean }>}
 *   serviceId is set only when the choice is clear; otherwise `candidates` holds
 *   the ones worth offering (possibly empty).
 */
async function chooseService(message, services, { useAi = true } = {}) {
  const ranked = scoreServices(message, services);
  const intent = ruleIntent(message);
  const top = ranked[0];
  const second = ranked[1];
  const rules = {
    intent,
    // Sure only when this service's description is the only one the words point to.
    serviceId: top && top.strong >= 1 && (!second || second.strong === 0) ? top.id : null,
    candidates: (ranked.some((r) => r.strong > 0) ? ranked.filter((r) => r.strong > 0) : ranked.filter((r) => r.weak > 0))
      .slice(0, 3).map((r) => r.id),
    source: 'rules',
    aiUnavailable: false,
  };
  if (!useAi || !services.length) return rules;

  const prompt = `A citizen wrote to a city's civic assistant. Decide what they want.

SERVICES (the only ones that exist):
${services.map((s) => `- id ${s.id}: ${s.label}. ${s.description || ''}`).join('\n')}

CITIZEN: "${String(message).slice(0, 1500)}"

Return JSON only:
{"intent": "file" | "status" | "cancel" | "other",
 "service_id": <one id from the list, or null if none clearly fits or more than one could>,
 "candidate_ids": [<up to 3 ids that could fit, best first>]}
"file" = they want something done or reported. "status" = they ask about requests they already sent.
Never invent an id. If unsure between services, use null and list the candidates.`;

  const ids = new Set(services.map((s) => s.id));
  const { data, aiUnavailable } = await askJson(prompt, (d) =>
    ['file', 'status', 'cancel', 'other'].includes(d.intent) &&
    (d.service_id === null || ids.has(Number(d.service_id))));
  if (!data) return { ...rules, aiUnavailable };

  const candidates = (Array.isArray(data.candidate_ids) ? data.candidate_ids : [])
    .map(Number).filter((id) => ids.has(id)).slice(0, 3);
  return {
    intent: intent === 'confirm' || intent === 'deny' ? intent : data.intent,
    serviceId: data.service_id === null ? null : Number(data.service_id),
    candidates: candidates.length ? candidates : rules.candidates,
    source: 'ai',
    aiUnavailable: false,
  };
}

// ── Reading details out of a message ─────────────────────────────────────────

/** Find a ward the message names. Longest name first, whole words only. */
function findWard(message, wards) {
  const n = ` ${normalize(message)} `;
  const sorted = [...wards].sort((a, b) => b.name.length - a.name.length);
  return sorted.find((w) => n.includes(` ${normalize(w.name)} `)) || null;
}

/** Find which option of a choice field the message names. */
function findOption(message, options) {
  const n = ` ${normalize(message)} `;
  const exact = options.find((o) => normalize(o) === n.trim());
  if (exact) return exact;
  const sorted = [...options].sort((a, b) => String(b).length - String(a).length);
  const named = sorted.find((o) => n.includes(` ${normalize(o)} `));
  if (named) return named;
  // "the second one", "2"
  const m = n.match(/^\s*(\d{1,2})\s*$/);
  if (m && options[Number(m[1]) - 1]) return options[Number(m[1]) - 1];
  // One distinctive word of a multi-word option ("transport" for "Public Transport")
  const words = new Set(tokens(message));
  const byWord = options.filter((o) => tokens(o).some((t) => words.has(t)));
  return byWord.length === 1 ? byWord[0] : null;
}

/** A place phrase such as "outside my building" or "near the bus stand". */
function findPlace(message) {
  const m = String(message || '').match(/\b(outside|near|opposite|behind|beside|next to|in front of|at the|at|on)\s+([^.,;!?\n]{3,60})/i);
  return m ? `${m[1]} ${m[2]}`.trim() : null;
}

/**
 * Read what a message says about the chosen service's fields.
 * @param {object} args
 * @param {string} args.message
 * @param {Array}  args.fields        [{ key, label, type, options }]
 * @param {Array}  args.wards         [{ id, name }]
 * @param {string|null} args.askedKey the field the assistant just asked about ('__ward' for the area)
 * @param {Array}  args.history       earlier citizen messages
 * @param {'collect'|'confirm'} args.phase
 * @returns {Promise<{ intent:string, values:Object, ward:object|null, place:string|null, source:'ai'|'rules', aiUnavailable:boolean }>}
 *   values are raw; the engine validates each one against the field's metadata.
 */
async function readDetails({ message, fields, wards, askedKey = null, history = [], phase = 'collect', useAi = true }) {
  // Rules first: they are instant, and they are the floor the AI result is laid over.
  const intent = ruleIntent(message);
  const values = {};
  for (const f of fields) {
    if (f.type !== 'choice' || !f.options.length) continue;
    // A bare answer only counts for the field that was asked about.
    const picked = findOption(message, f.options);
    if (!picked) continue;
    const bare = normalize(message) === normalize(picked) || /^\s*\d{1,2}\s*$/.test(message);
    if (f.key === askedKey || !bare) values[f.key] = picked;
  }
  const rules = {
    intent: intent === 'file' && phase === 'confirm' && CORRECTION.test(normalize(message)) ? 'correct' : intent,
    values,
    ward: findWard(message, wards),
    place: findPlace(message),
    source: 'rules',
    aiUnavailable: false,
  };
  if (!useAi || ['confirm', 'deny'].includes(intent)) return rules;

  const prompt = `You read one message from a citizen who is talking to a city's civic assistant, and extract facts. You do not reply to the citizen.

DETAILS THE ASSISTANT CAN RECORD (use these keys only):
${fields.map((f) => `- "${f.key}": ${f.label} (${f.type}${f.options.length ? `; must be one of: ${f.options.join(' | ')}` : ''})`).join('\n')}

AREAS (use one of these names exactly, or null): ${wards.slice(0, 200).map((w) => w.name).join(', ') || '(none)'}

${history.length ? `EARLIER, THE CITIZEN SAID:\n${history.slice(-6).map((h) => `- ${String(h).slice(0, 400)}`).join('\n')}\n` : ''}${askedKey ? `THE ASSISTANT JUST ASKED ABOUT: "${askedKey === '__ward' ? 'the area' : askedKey}"\n` : ''}
THE CITIZEN NOW SAYS: "${String(message).slice(0, 1500)}"

Return JSON only:
{"intent": "answer" | "correct" | "confirm" | "deny" | "cancel" | "status" | "other",
 "values": {<key>: <value>, ...},
 "area": <an area name from the list, or null>,
 "place": <a short landmark or address they mentioned, or null>}
Rules:
- Put in "values" only what the citizen actually said or what plainly follows from it. Never guess personal details.
- For a choice, the value must be one of the listed options, chosen only if it clearly fits; otherwise leave the key out.
- "correct" = they are changing something said before. Include only the changed keys.
- "confirm"/"deny" = a plain yes/no to sending. "cancel" = they want to stop.`;

  const keys = new Set(fields.map((f) => f.key));
  const { data, aiUnavailable } = await askJson(prompt, (d) => typeof d.intent === 'string' && (!d.values || typeof d.values === 'object'));
  if (!data) return { ...rules, aiUnavailable };

  const aiValues = {};
  for (const [k, v] of Object.entries(data.values || {})) {
    if (keys.has(k) && v !== null && v !== undefined && String(v).trim() !== '') aiValues[k] = v;
  }
  const aiWard = data.area ? wards.find((w) => normalize(w.name) === normalize(data.area)) || null : null;
  const aiIntent = ['answer', 'correct', 'confirm', 'deny', 'cancel', 'status', 'other'].includes(data.intent) ? data.intent : 'answer';
  return {
    intent: aiIntent === 'answer' ? rules.intent : aiIntent,
    values: { ...aiValues, ...rules.values }, // an option the citizen named outright wins over an inference
    ward: rules.ward || aiWard,
    place: rules.place || (data.place ? String(data.place).slice(0, 120) : null),
    source: 'ai',
    aiUnavailable: false,
  };
}

module.exports = {
  askJson,
  chooseService,
  readDetails,
  ruleIntent,
  scoreServices,
  findWard,
  findOption,
  findPlace,
  tokens,
  normalize,
};
