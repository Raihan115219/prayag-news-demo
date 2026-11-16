/* ==================================================================
   storage.js — thin, safe wrapper around LocalStorage.
   All demo data lives in the browser; see README for limitations.
   ================================================================== */

export const KEYS = {
  articles: 'pn_articles',
  seedVersion: 'pn_seed_version',
  session: 'pn_session',
};

export class StorageFullError extends Error {
  constructor() {
    super('Browser storage is full. Remove an image or reset the demo data and try again.');
    this.name = 'StorageFullError';
  }
}

export function read(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    if (err && (err.name === 'QuotaExceededError' || err.code === 22)) throw new StorageFullError();
    throw err;
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch { /* ignore */ }
}

/**
 * Calls `fn` whenever another tab changes one of the given keys, so an
 * editor tab and a public tab stay in sync without manual refresh.
 */
export function onExternalChange(keys, fn) {
  window.addEventListener('storage', (e) => {
    if (e.key === null || keys.includes(e.key)) fn(e);
  });
  // Also re-render when returning to a page from the back/forward cache.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) fn(e);
  });
}
