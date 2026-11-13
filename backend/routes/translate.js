/**
 * CIVIC-KALKI — Translation Service Route
 * Integrates external translation engines for full-page Indian localization
 * Delivers clean JSON translations with zero iframes or third-party banners
 */

const express = require('express');
const router = express.Router();

// ── Limits: open to everyone (signed-out visitors translate the public pages),
// bounded batches, and a rate limit per signed-in user or, if signed out, per IP.
const MAX_TEXTS = 100;          // strings per request (the client sends batches)
const MAX_TEXT_LENGTH = 2000;   // characters per string
const RATE_LIMIT = 60;          // requests per caller per window
const RATE_WINDOW_MS = 60 * 1000;
const LANG_CODE = /^[a-z]{2,3}(-[A-Za-z]{2,4})?$/;
const requestCounts = new Map(); // 'user:<id>' | 'ip:<addr>' -> { count, windowStart }

function rateLimitKey(req) {
  if (req.user && req.user.user_id) return `user:${req.user.user_id}`;
  return `ip:${req.ip || req.socket?.remoteAddress || 'unknown'}`;
}

function isRateLimited(key) {
  const now = Date.now();
  if (requestCounts.size > 10000) {
    for (const [k, e] of requestCounts) if (now - e.windowStart >= RATE_WINDOW_MS) requestCounts.delete(k);
  }
  const entry = requestCounts.get(key);
  if (!entry || now - entry.windowStart >= RATE_WINDOW_MS) {
    requestCounts.set(key, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

// In-memory LRU cache to minimize network calls and provide sub-millisecond responses
const translationCache = new Map();

/**
 * Translates a single text segment into target language
 */
async function translateSingle(text, targetLang) {
  if (!text || !text.trim()) return text;
  const clean = text.trim();

  // Check in-memory cache
  const cacheKey = `${targetLang}:${clean}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(clean)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translated = data[0].map(segment => segment[0]).filter(Boolean).join('');
        if (translated) {
          translationCache.set(cacheKey, translated);
          return translated;
        }
      }
    }
  } catch (err) {
    console.error(`[Translate API] Error translating "${clean.slice(0, 30)}":`, err.message);
  }

  return clean;
}

/**
 * POST /translate
 * Body: { texts: string[], targetLang: string }
 */
router.post('/', async (req, res) => {
  try {
    if (isRateLimited(rateLimitKey(req))) {
      return res.status(429).json({ success: false, error: 'Too many translation requests. Please wait a minute.' });
    }

    const { texts, targetLang } = req.body;

    if (!texts || !Array.isArray(texts) || !targetLang) {
      return res.status(400).json({
        success: false,
        error: 'Invalid parameters. Expected { texts: string[], targetLang: string }'
      });
    }
    if (typeof targetLang !== 'string' || !LANG_CODE.test(targetLang)) {
      return res.status(400).json({ success: false, error: 'targetLang must be a language code such as "hi" or "mr".' });
    }
    if (texts.length > MAX_TEXTS) {
      return res.status(400).json({ success: false, error: `At most ${MAX_TEXTS} texts per request.` });
    }
    if (texts.some((t) => t !== null && t !== undefined && (typeof t !== 'string' || t.length > MAX_TEXT_LENGTH))) {
      return res.status(400).json({ success: false, error: `Each text must be a string of at most ${MAX_TEXT_LENGTH} characters.` });
    }

    // If English, return 1:1 mapping
    if (targetLang === 'en') {
      const identityMap = {};
      texts.forEach(t => { if (t) identityMap[t.trim()] = t.trim(); });
      return res.json({ success: true, targetLang: 'en', translations: identityMap });
    }

    // Filter unique non-empty strings
    const uniqueTexts = [...new Set(texts.map(t => (t || '').trim()).filter(Boolean))];

    // Process concurrently in chunks of 15 to remain respectful and fast
    const results = {};
    const chunkSize = 15;

    for (let i = 0; i < uniqueTexts.length; i += chunkSize) {
      const chunk = uniqueTexts.slice(i, i + chunkSize);
      await Promise.all(
        chunk.map(async text => {
          results[text] = await translateSingle(text, targetLang);
        })
      );
    }

    return res.json({
      success: true,
      targetLang,
      count: uniqueTexts.length,
      translations: results
    });
  } catch (globalErr) {
    console.error('[Translate Route Error]:', globalErr);
    return res.status(500).json({ success: false, error: 'Internal translation error' });
  }
});

module.exports = router;
module.exports.limits = { MAX_TEXTS, MAX_TEXT_LENGTH, RATE_LIMIT };
