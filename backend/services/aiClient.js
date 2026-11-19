/**
 * CIVIC-KALKI — the single path to the AI provider.
 *
 * Every service that calls Gemini gets its model from here, so that:
 *   - the model name is configured in one place (env GEMINI_MODEL);
 *   - every call has a hard timeout (env AI_TIMEOUT_MS, default 15 s), so a bad
 *     network cannot hang a request;
 *   - retries are bounded. Callers may ask again when the model ANSWERED but the
 *     answer could not be parsed. When the call itself failed (timeout, network,
 *     provider error) the model handle is marked unavailable and any further
 *     call on it fails at once, so one AI action waits at most one timeout.
 *
 * Callers stay fail-closed: on AiUnavailableError they return their own labeled
 * fallback; nothing here invents a response.
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

const DEFAULT_MODEL = 'gemini-3.5-flash-lite';
const DEFAULT_TIMEOUT_MS = 15000;

class AiUnavailableError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = 'AiUnavailableError';
    this.code = 'AI_UNAVAILABLE';
    if (cause) this.cause = cause;
  }
}

/** Optional second model, used once when the first answers 503 or 429 (env GEMINI_FALLBACK_MODEL). */
function getFallbackModelName() {
  return (process.env.GEMINI_FALLBACK_MODEL || '').trim() || null;
}

/** The provider said "overloaded" (503) or "too many requests" (429). */
function isBusy(err) {
  const status = err && (err.status || err.statusCode);
  if (status === 503 || status === 429) return true;
  return /\[(503|429)\b/.test(String((err && err.message) || ''));
}

function getModelName() {
  const fromEnv = (process.env.GEMINI_MODEL || '').trim();
  return fromEnv || DEFAULT_MODEL;
}

function getTimeoutMs() {
  const n = Number(process.env.AI_TIMEOUT_MS);
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_TIMEOUT_MS;
}

function getApiKey() {
  return (process.env.GEMINI_API_KEY || '').trim();
}

/** True when a key is configured. Says nothing about whether the network works. */
function isConfigured() {
  return getApiKey() !== '';
}

function isAiUnavailable(err) {
  return Boolean(err && err.code === 'AI_UNAVAILABLE');
}

/**
 * Get a model handle. `params` are passed to the SDK (generationConfig,
 * systemInstruction, …); the model name always comes from configuration.
 *
 * @returns {{ modelName: string, generateContent: (payload: any) => Promise<any> }}
 * @throws {AiUnavailableError} when no API key is configured.
 */
function getModel(params = {}, { timeoutMs: timeoutOverride } = {}) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new AiUnavailableError('GEMINI_API_KEY is not configured.');
  }

  const modelName = getModelName();
  // A caller may ask for a shorter wait than the default (the chat does).
  const timeoutMs = Number.isFinite(timeoutOverride) && timeoutOverride > 0 ? Math.min(timeoutOverride, getTimeoutMs()) : getTimeoutMs();
  const client = new GoogleGenerativeAI(apiKey);
  const model = client.getGenerativeModel({ ...params, model: modelName }, { timeout: timeoutMs });
  const fallbackName = getFallbackModelName();
  const fallback = fallbackName && fallbackName !== modelName
    ? client.getGenerativeModel({ ...params, model: fallbackName }, { timeout: timeoutMs })
    : null;

  let unavailable = null;

  async function generateContent(payload) {
    if (unavailable) throw unavailable;

    let timer;
    const timeout = new Promise((_, reject) => {
      timer = setTimeout(
        () => reject(new AiUnavailableError(`AI call timed out after ${timeoutMs} ms.`)),
        timeoutMs
      );
    });

    try {
      try {
        return await Promise.race([model.generateContent(payload), timeout]);
      } catch (first) {
        // Overloaded or rate-limited: answered quickly, so one try on the fallback
        // model fits in the same time window. Anything else is not retried.
        if (!fallback || isAiUnavailable(first) || !isBusy(first)) throw first;
        console.warn(`[AI CLIENT] ${modelName} is busy; trying ${fallbackName} once.`);
        return await Promise.race([fallback.generateContent(payload), timeout]);
      }
    } catch (err) {
      unavailable = isAiUnavailable(err)
        ? err
        : new AiUnavailableError(`AI call failed: ${err && err.message ? err.message : err}`, err);
      throw unavailable;
    } finally {
      clearTimeout(timer);
    }
  }

  return { modelName, generateContent };
}

module.exports = {
  getModel,
  getModelName,
  getTimeoutMs,
  isConfigured,
  isAiUnavailable,
  AiUnavailableError,
  DEFAULT_MODEL,
};
