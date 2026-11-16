/* ==================================================================
   utils.js — small, dependency-free helpers shared by every page
   ================================================================== */

const IST = 'Asia/Kolkata';

/** Escape text for safe insertion into HTML. */
export function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export function param(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* ---------------- Language ---------------- */

const DEVANAGARI = /[ऀ-ॿ]/;
export const isHindi = (text = '') => DEVANAGARI.test(text);
/** Returns ` lang="hi"` for Devanagari strings so CSS can tune the type. */
export const langAttr = (text = '') => (isHindi(text) ? ' lang="hi"' : '');

/* ---------------- Dates (always shown in IST) ---------------- */

const fmtDate = new Intl.DateTimeFormat('en-IN', { timeZone: IST, day: 'numeric', month: 'short', year: 'numeric' });
const fmtTime = new Intl.DateTimeFormat('en-IN', { timeZone: IST, hour: 'numeric', minute: '2-digit', hour12: true });
const fmtLong = new Intl.DateTimeFormat('en-IN', { timeZone: IST, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export function formatDate(iso) {
  if (!iso) return '—';
  return fmtDate.format(new Date(iso));
}

export function formatDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return `${fmtDate.format(d)}, ${fmtTime.format(d).toUpperCase()} IST`;
}

export function formatLongDate(date = new Date()) {
  return fmtLong.format(date);
}

/** "12 min ago", "5 hrs ago", "Yesterday", else a date. */
export function timeAgo(iso) {
  if (!iso) return '';
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) {
    const h = Math.floor(diff / 3600);
    return `${h} hr${h > 1 ? 's' : ''} ago`;
  }
  if (diff < 172800) return 'Yesterday';
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  return formatDate(iso);
}

/** Current hour in IST — for greetings. */
export function istHour() {
  return Number(new Intl.DateTimeFormat('en-IN', { timeZone: IST, hour: 'numeric', hour12: false }).format(new Date()));
}

export function greeting() {
  const h = istHour();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/* ---------------- Text ---------------- */

export function stripHtml(html = '') {
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  return (tpl.content.textContent || '').replace(/\s+/g, ' ').trim();
}

export function wordCount(html = '') {
  const text = stripHtml(html);
  return text ? text.split(/\s+/).length : 0;
}

export function readingTime(html = '') {
  return Math.max(1, Math.round(wordCount(html) / 200));
}

export function initials(name = '') {
  return name
    .replace(/^(Mohd\.?|Dr\.?)\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');
}

const AVATAR_TONES = ['#171717', '#F04418', '#3d5a4c', '#5b4a8a', '#8a5a2b', '#2f5d8a', '#D92332'];
export function avatarTone(name = '') {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR_TONES[h % AVATAR_TONES.length];
}

export function avatar(name, size = 'size-7 text-[10px]') {
  return `<span class="${size} inline-grid shrink-0 place-items-center rounded-full font-semibold text-white" style="background:${avatarTone(name)}" aria-hidden="true">${esc(initials(name))}</span>`;
}

/* ---------------- Images ---------------- */

/** Builds a sized, compressed URL for hosted photos; data URLs pass through. */
export function img(url, width = 800) {
  if (!url) return '';
  if (url.startsWith('https://images.unsplash.com/')) {
    return `${url}?auto=format&fit=crop&w=${width}&q=68`;
  }
  return url;
}

/** Swap broken images for a neutral block instead of a broken-image icon. */
export function installImageFallback() {
  document.addEventListener(
    'error',
    (e) => {
      const el = e.target;
      if (el instanceof HTMLImageElement && !el.dataset.failed) {
        el.dataset.failed = '1';
        el.removeAttribute('src');
        el.classList.add('img-fallback');
      }
    },
    true,
  );
}

/**
 * Reads an image file, scales it down (max 1600×1200) and re-encodes as JPEG.
 * Keeps LocalStorage usage small and mirrors the "automatic resizing and
 * compression" noted in the requirements.
 */
export function compressImage(file, { maxWidth = 1600, maxHeight = 1200, quality = 0.78 } = {}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the file.'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('This file is not a valid image.'));
      image.onload = () => {
        const scale = Math.min(1, maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);
        const w = Math.round(image.naturalWidth * scale);
        const h = Math.round(image.naturalHeight * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(image, 0, 0, w, h);
        resolve({
          dataUrl: canvas.toDataURL('image/jpeg', quality),
          width: image.naturalWidth,
          height: image.naturalHeight,
        });
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ---------------- HTML sanitising for article bodies ---------------- */

const ALLOWED_TAGS = new Set(['P', 'BR', 'B', 'STRONG', 'I', 'EM', 'U', 'H2', 'H3', 'UL', 'OL', 'LI', 'BLOCKQUOTE']);
const RENAME = { DIV: 'P', H1: 'H2', H4: 'H3', H5: 'H3', H6: 'H3' };

/** Keeps a small allow-list of formatting tags and drops every attribute. */
export function sanitizeHtml(html = '') {
  const tpl = document.createElement('template');
  tpl.innerHTML = html;

  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        let el = child;
        const renameTo = RENAME[el.tagName];
        if (renameTo) {
          const replacement = document.createElement(renameTo);
          replacement.append(...el.childNodes);
          el.replaceWith(replacement);
          el = replacement;
        }
        if (!ALLOWED_TAGS.has(el.tagName)) {
          if (['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED'].includes(el.tagName)) {
            el.remove();
            return;
          }
          walk(el);
          el.replaceWith(...el.childNodes);
          return;
        }
        [...el.attributes].forEach((a) => el.removeAttribute(a.name));
        walk(el);
      } else if (child.nodeType !== Node.TEXT_NODE) {
        child.remove();
      }
    });
  };
  walk(tpl.content);

  // Wrap stray top-level text into paragraphs.
  const out = document.createElement('div');
  let para = null;
  [...tpl.content.childNodes].forEach((n) => {
    const inline = n.nodeType === Node.TEXT_NODE || ['B', 'STRONG', 'I', 'EM', 'U', 'BR'].includes(n.nodeName);
    if (inline) {
      if (n.nodeType === Node.TEXT_NODE && !n.textContent.trim() && !para) return;
      para ??= document.createElement('p');
      para.append(n);
    } else {
      if (para) out.append(para);
      para = null;
      out.append(n);
    }
  });
  if (para) out.append(para);
  // Drop empty paragraphs.
  out.querySelectorAll('p').forEach((p) => {
    if (!p.textContent.trim()) p.remove();
  });
  return out.innerHTML;
}

/* ---------------- Toasts ---------------- */

const TOAST_ICONS = {
  success: '<path d="M20 6 9 17l-5-5"/>',
  error: '<path d="M12 8v5m0 3h.01"/><circle cx="12" cy="12" r="9"/>',
  info: '<path d="M12 16v-4m0-4h.01"/><circle cx="12" cy="12" r="9"/>',
};

export function toast(message, type = 'success', { action } = {}) {
  let root = document.getElementById('toast-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'toast-root';
    document.body.append(root);
  }
  root.className = 'pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:items-end';
  root.setAttribute('aria-live', 'polite');

  const tone = type === 'error' ? 'text-crimson' : type === 'info' ? 'text-ink' : 'text-[#1f8a4c]';
  const el = document.createElement('div');
  el.className = 'toast-enter pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl bg-ink px-4 py-3.5 text-[14px] text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,.45)]';
  el.setAttribute('role', type === 'error' ? 'alert' : 'status');
  el.innerHTML = `
    <span class="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white ${tone}">
      <svg viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${TOAST_ICONS[type] || TOAST_ICONS.info}</svg>
    </span>
    <div class="min-w-0 flex-1 leading-snug">${esc(message)}
      ${action ? `<a href="${esc(action.href)}" class="mt-1 block font-semibold text-accent hover:underline">${esc(action.label)} →</a>` : ''}
    </div>
    <button type="button" class="-mr-1 rounded-md p-0.5 text-white/60 hover:text-white" aria-label="Dismiss notification">
      <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
    </button>`;
  root.append(el);

  const close = () => {
    el.classList.add('toast-leave');
    setTimeout(() => el.remove(), 200);
  };
  el.querySelector('button').addEventListener('click', close);
  setTimeout(close, action ? 7000 : 4200);
}

/* Flash messages survive one redirect (e.g. "Submitted" after saving). */
const FLASH_KEY = 'pn_flash';
export function setFlash(message, type = 'success', action) {
  try {
    sessionStorage.setItem(FLASH_KEY, JSON.stringify({ message, type, action }));
  } catch { /* ignore */ }
}
export function consumeFlash() {
  try {
    const raw = sessionStorage.getItem(FLASH_KEY);
    if (!raw) return;
    sessionStorage.removeItem(FLASH_KEY);
    const { message, type, action } = JSON.parse(raw);
    toast(message, type, { action });
  } catch { /* ignore */ }
}

/* ---------------- Modal ---------------- */

/**
 * Minimal accessible modal. Resolves with the form values (or true) when
 * confirmed, and null when cancelled.
 */
export function openModal({ title, body = '', confirmLabel = 'Confirm', tone = 'primary', validate, onOpen } = {}) {
  return new Promise((resolve) => {
    const lastFocus = document.activeElement;
    const wrap = document.createElement('div');
    wrap.className = 'modal-backdrop fixed inset-0 z-[60] flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-4';
    wrap.innerHTML = `
      <form class="modal-panel w-full max-w-lg rounded-t-3xl bg-white p-5 sm:rounded-3xl sm:p-7" role="dialog" aria-modal="true" aria-labelledby="modal-title" novalidate>
        <div class="flex items-start justify-between gap-4">
          <h2 id="modal-title" class="text-lg font-semibold tracking-tight">${esc(title)}</h2>
          <button type="button" data-cancel class="-m-1 rounded-lg p-1.5 text-muted hover:bg-cream hover:text-ink" aria-label="Close dialog">
            <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
          </button>
        </div>
        <div class="mt-3 text-[14px] leading-relaxed text-[#444]">${body}</div>
        <div class="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" data-cancel class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn ${tone === 'danger' ? 'bg-crimson text-white hover:bg-[#b81c2a]' : 'btn-primary'}">${esc(confirmLabel)}</button>
        </div>
      </form>`;
    document.body.append(wrap);
    document.body.style.overflow = 'hidden';

    const form = wrap.querySelector('form');
    const focusable = () => [...form.querySelectorAll('button, textarea, input, select, [href]')].filter((el) => !el.disabled);
    (form.querySelector('textarea, input') || form.querySelector('[type=submit]')).focus();

    const finish = (value) => {
      document.body.style.overflow = '';
      wrap.remove();
      document.removeEventListener('keydown', onKey);
      lastFocus?.focus?.();
      resolve(value);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') finish(null);
      if (e.key === 'Tab') {
        const items = focusable();
        const first = items[0];
        const last = items.at(-1);
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    wrap.addEventListener('mousedown', (e) => { if (e.target === wrap) finish(null); });
    form.querySelectorAll('[data-cancel]').forEach((b) => b.addEventListener('click', () => finish(null)));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const values = Object.fromEntries(new FormData(form));
      if (validate) {
        const error = validate(values, form);
        if (error) return;
      }
      finish(Object.keys(values).length ? values : true);
    });
    // Let callers wire up extra behaviour inside the body (chips etc.)
    onOpen?.(form);
  });
}

export function debounce(fn, ms = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
