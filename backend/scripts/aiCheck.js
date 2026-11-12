/**
 * CIVIC-KALKI — AI check (`npm run ai:check`).
 *
 * Answers the three questions that decide whether the AI features will work:
 *   1. Is a key configured?
 *   2. Which models can that key use, and is the configured one among them?
 *   3. Does one real generation through the app's own AI client succeed?
 *
 * The key is never printed, in full or in part. It is sent only in a request
 * header, and any error text is scrubbed of it before being shown.
 *
 * Exit code 0 = ready; 1 = not ready (the last line says why).
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const aiClient = require('../services/aiClient');

const API = 'https://generativelanguage.googleapis.com/v1beta/models';
const key = (process.env.GEMINI_API_KEY || '').trim();

/** Remove the key from any text before it is printed. */
function scrub(text) {
  let out = String(text ?? '');
  if (key) out = out.split(key).join('[key hidden]');
  return out.replace(/([?&]key=)[^&\s"']+/gi, '$1[key hidden]');
}

function fail(message) {
  console.log(`\nNOT READY: ${scrub(message)}`);
  process.exit(1);
}

async function listModels() {
  const models = [];
  let pageToken = '';
  for (let page = 0; page < 10; page += 1) {
    const url = `${API}?pageSize=200${pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : ''}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), aiClient.getTimeoutMs());
    let res;
    try {
      // The key travels in a header, never in the URL.
      res = await fetch(url, { headers: { 'x-goog-api-key': key }, signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      const reason = body?.error?.message || `HTTP ${res.status}`;
      const err = new Error(reason);
      err.status = res.status;
      throw err;
    }
    models.push(...(body.models || []));
    pageToken = body.nextPageToken || '';
    if (!pageToken) break;
  }
  return models;
}

(async () => {
  const configured = aiClient.getModelName();
  console.log('CIVIC-KALKI — AI check');
  console.log(`Configured model : ${configured}${process.env.GEMINI_MODEL ? ' (from GEMINI_MODEL)' : ' (default; set GEMINI_MODEL in backend/.env to change)'}`);
  console.log(`Call timeout     : ${aiClient.getTimeoutMs()} ms`);

  // 1. Key
  if (!key) {
    console.log('API key          : not set');
    fail('GEMINI_API_KEY is empty. Put the key in backend/.env and run this again. Without it the app shows its labeled non-AI fallbacks.');
  }
  console.log('API key          : set (not shown)');

  // 2. Models
  let usable = [];
  try {
    const models = await listModels();
    usable = models
      .filter((m) => (m.supportedGenerationMethods || []).includes('generateContent'))
      .map((m) => String(m.name || '').replace(/^models\//, ''))
      .sort();
  } catch (err) {
    if (err.name === 'AbortError') fail('Google did not answer in time. Check the network.');
    if (err.status === 400 || err.status === 401 || err.status === 403) fail(`Google rejected the key (${err.message}).`);
    fail(`Could not list models: ${err.message}`);
  }
  console.log(`\nModels this key can use for text generation (${usable.length}):`);
  for (const name of usable) console.log(`  ${name === configured ? '*' : ' '} ${name}`);
  const available = usable.includes(configured);
  console.log(available
    ? `\nThe configured model "${configured}" is available (marked *).`
    : `\nThe configured model "${configured}" is NOT in this list.`);

  // 3. One real generation, through the same client the app uses
  if (!available) {
    const suggestion = usable.find((n) => /flash/i.test(n) && !/preview|exp|tts|image|audio|live/i.test(n)) || usable[0];
    fail(`Set GEMINI_MODEL in backend/.env to a model from the list${suggestion ? `, for example GEMINI_MODEL=${suggestion}` : ''}, then run this again.`);
  }
  try {
    const started = Date.now();
    const result = await aiClient.getModel().generateContent('Reply with the single word: ready');
    const text = String(result?.response?.text?.() ?? '').trim();
    console.log(`\nTest generation  : answered in ${Date.now() - started} ms`);
    console.log(`Model said       : ${scrub(text).slice(0, 120) || '(empty answer)'}`);
    if (!text) fail('The model answered with no text.');
  } catch (err) {
    fail(`The test generation failed: ${err.message}`);
  }

  console.log('\nREADY: the key works and the configured model answers.');
  process.exit(0);
})().catch((err) => fail(err && err.message ? err.message : String(err)));
