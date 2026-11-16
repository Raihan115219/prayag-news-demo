/* ==================================================================
   article-form.js — Reporter "Create / Edit Article" form.
   Save Draft → status Draft. Submit for Approval → Pending Approval.
   ================================================================== */
import { B } from './paths.js';
import { initPanelPage } from './app.js';
import { CATEGORIES, STATUS, getById, saveReporterArticle, articleUrl } from './articles.js';
import { statusBadge, icon } from './components.js';
import { StorageFullError } from './storage.js';
import { $, $$, esc, img, param, sanitizeHtml, wordCount, compressImage, toast, setFlash, formatDateTime } from './utils.js';

const MIN_WORDS = 20;
const MAX_FILE_MB = 8;
const LOCATIONS = ['Prayagraj', 'Civil Lines, Prayagraj', 'Sangam, Prayagraj', 'Naini, Prayagraj', 'Jhunsi, Prayagraj', 'Phaphamau, Prayagraj', 'Daraganj, Prayagraj', 'Chowk, Prayagraj', 'George Town, Prayagraj', 'Kaushambi', 'Pratapgarh', 'Lucknow', 'Varanasi', 'Kanpur', 'New Delhi'];

const session = initPanelPage('reporter', 'create');
const form = $('#article-form');
const editor = $('#body-editor');
const F = form.elements; // named controls (form.title would be the title attribute)

const state = { id: null, image: '', imageMeta: '', status: null, dirty: false, locked: false };


function init() {
  // Options
  F.category.innerHTML = `<option value="">Select a category</option>${CATEGORIES.map((c) => `<option value="${esc(c.name)}">${esc(c.name)} — ${esc(c.hi)}</option>`).join('')}`;
  $('#location-options').innerHTML = LOCATIONS.map((l) => `<option value="${esc(l)}"></option>`).join('');
  document.execCommand('defaultParagraphSeparator', false, 'p');

  const id = param('id');
  if (id) loadArticle(id);
  renderImage();
  updateCounters();
  updateChecklist();
  wireEditor();
  wireImage();
  wireActions();

  form.addEventListener('input', () => {
    state.dirty = true;
    updateCounters();
    updateChecklist();
    clearErrorsFor(document.activeElement?.closest('[data-field]'));
  });
  window.addEventListener('beforeunload', (e) => {
    if (state.dirty && !state.locked) {
      e.preventDefault();
      e.returnValue = '';
    }
  });
}

/* ---------------- Load existing article ---------------- */

function loadArticle(id) {
  const a = getById(id);
  if (!a || a.authorEmail !== session.email) {
    $('#locked-banner').innerHTML = banner('red', icon.alert('size-4'), '<strong>Article not found.</strong> It may have been deleted, or it belongs to another reporter.', `<a href="${B}reporter/create-article.html" class="font-semibold underline underline-offset-2">Start a new article</a>`);
    $('#form-title').textContent = 'Article unavailable';
    form.classList.add('hidden');
    $('#actions-mobile').classList.add('hidden');
    state.locked = true;
    return;
  }
  state.id = a.id;
  state.status = a.status;
  state.image = a.image;
  F.title.value = a.title;
  F.subtitle.value = a.subtitle;
  F.category.value = a.category;
  F.location.value = a.location;
  editor.innerHTML = sanitizeHtml(a.body);

  document.title = `Edit Article — Reporter Desk · Prayag News`;
  $('#form-title').textContent = 'Edit Article';
  $('#form-status').innerHTML = statusBadge(a.status);
  $('#save-state').textContent = `Last saved ${formatDateTime(a.updatedAt)}`;

  if (a.status === STATUS.rejected && a.rejectionNote) {
    $('#rejection-banner').innerHTML = `
      <div class="mt-5 rounded-2xl border border-crimson/25 bg-white p-4 sm:p-5" role="note">
        <p class="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-crimson">${icon.alert('size-4')} Returned by the Head Editor</p>
        <p class="mt-2 text-[15px] leading-relaxed text-ink">“${esc(a.rejectionNote)}”</p>
        <p class="mt-2 text-[12.5px] text-muted">${a.reviewedBy ? `${esc(a.reviewedBy)} · ` : ''}${esc(formatDateTime(a.reviewedAt))} — make the changes below and submit again.</p>
      </div>`;
  }
  if (a.status === STATUS.unpublished) {
    $('#rejection-banner').innerHTML = banner('blue', icon.eye('size-4'), '<strong>This article was unpublished by the editor.</strong> Update it and submit again to send it back for review.');
  }
  if (a.status === STATUS.pending || a.status === STATUS.published) {
    state.locked = true;
    const msg = a.status === STATUS.pending
      ? '<strong>Waiting for review.</strong> This article is with the Head Editor and can’t be edited right now.'
      : '<strong>This article is live.</strong> Published articles can only be changed by the Head Editor.';
    $('#locked-banner').innerHTML = banner('amber', icon.clock('size-4'), msg, `<a href="${articleUrl(a.id)}" class="font-semibold underline underline-offset-2">${a.status === STATUS.pending ? 'Preview' : 'View live'}</a>`);
    form.querySelectorAll('input, textarea, select, button').forEach((el) => (el.disabled = true));
    editor.contentEditable = 'false';
    editor.classList.add('opacity-70');
    $$('[data-action]').forEach((b) => (b.disabled = true));
    $('#actions-mobile').classList.add('hidden');
  }
}

function banner(tone, iconSvg, html, extra = '') {
  const tones = {
    red: 'border-crimson/25 bg-white text-crimson',
    amber: 'border-[#f3d79b] bg-[#fff8e8] text-[#7a5200]',
    blue: 'border-[#cfd8e6] bg-[#f2f5fa] text-[#3d4b63]',
  };
  return `<div class="mt-5 flex flex-col gap-2 rounded-2xl border px-4 py-3.5 text-[14px] sm:flex-row sm:items-center sm:justify-between ${tones[tone]}" role="note">
    <p class="flex items-start gap-2"><span class="mt-0.5">${iconSvg}</span><span>${html}</span></p>${extra}</div>`;
}

/* ---------------- Image upload ---------------- */

function renderImage() {
  const zone = $('#image-zone');
  if (!state.image) {
    zone.innerHTML = `
      <label for="image-input" id="dropzone" class="dropzone flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-cream/50 px-6 py-12 text-center transition-colors hover:border-ink/40 hover:bg-cream">
        <span class="grid size-12 place-items-center rounded-2xl bg-white text-ink shadow-sm">${icon.image('size-6')}</span>
        <span class="mt-4 text-[14.5px] font-semibold">Click to upload <span class="font-normal text-muted">or drag &amp; drop</span></span>
        <span class="mt-1 text-[12.5px] text-muted">Landscape photos work best (at least 800px wide)</span>
      </label>`;
    const dz = $('#dropzone');
    dz.addEventListener('dragover', (e) => { e.preventDefault(); dz.classList.add('!border-accent', '!bg-accent/5'); });
    dz.addEventListener('dragleave', () => dz.classList.remove('!border-accent', '!bg-accent/5'));
    dz.addEventListener('drop', (e) => {
      e.preventDefault();
      dz.classList.remove('!border-accent', '!bg-accent/5');
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    });
    return;
  }
  zone.innerHTML = `
    <div class="overflow-hidden rounded-2xl border border-line">
      <img src="${esc(img(state.image, 1200))}" alt="Preview of the main image" class="aspect-[16/9] w-full object-cover">
      <div class="flex flex-col gap-3 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="flex items-center gap-2 text-[12.5px] text-muted">${icon.check('size-4 text-[#1f8a4c]')} ${esc(state.imageMeta || 'Image attached')}</p>
        <div class="flex gap-2">
          <button type="button" data-img="replace" class="btn btn-outline !py-1.5 text-[13px]" ${state.locked ? 'disabled' : ''}>${icon.refresh('size-3.5')} Replace</button>
          <button type="button" data-img="remove" class="btn btn-danger !py-1.5 text-[13px]" ${state.locked ? 'disabled' : ''}>${icon.trash('size-3.5')} Remove</button>
        </div>
      </div>
    </div>`;
  zone.querySelector('[data-img=replace]').addEventListener('click', () => $('#image-input').click());
  zone.querySelector('[data-img=remove]').addEventListener('click', () => {
    state.image = '';
    state.imageMeta = '';
    state.dirty = true;
    $('#image-input').value = '';
    renderImage();
    updateChecklist();
    toast('Image removed.', 'info');
  });
}

function wireImage() {
  $('#image-input').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  });
}

async function handleFile(file) {
  const field = form.querySelector('[data-field=image]');
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    toast('Please upload a JPG, PNG or WebP image.', 'error');
    return;
  }
  if (file.size > MAX_FILE_MB * 1024 * 1024) {
    toast(`That image is larger than ${MAX_FILE_MB} MB. Please choose a smaller file.`, 'error');
    return;
  }
  $('#image-zone').innerHTML = `<div class="skeleton flex aspect-[16/9] items-center justify-center !rounded-2xl text-[13px] font-medium text-muted">Optimising image…</div>`;
  try {
    const { dataUrl, width, height } = await compressImage(file);
    if (width < 400) {
      toast('This image is too small (under 400px wide). Please use a larger photo.', 'error');
      renderImage();
      return;
    }
    state.image = dataUrl;
    const kb = Math.round((dataUrl.length * 3) / 4 / 1024);
    state.imageMeta = `${file.name} · ${width}×${height}px · optimised to ${kb} KB`;
    state.dirty = true;
    field.classList.remove('has-error');
    if (width < 800) toast('Image attached. It is a little small and may look soft on large screens.', 'info');
  } catch (err) {
    toast(err.message, 'error');
  }
  $('#image-input').value = '';
  renderImage();
  updateChecklist();
}

/* ---------------- Body editor ---------------- */

function wireEditor() {
  const toolbar = $('#toolbar');
  toolbar.addEventListener('mousedown', (e) => e.preventDefault()); // keep the text selection
  toolbar.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn || state.locked) return;
    editor.focus();
    if (btn.dataset.cmd) document.execCommand(btn.dataset.cmd);
    if (btn.dataset.block) {
      const current = (document.queryCommandValue('formatBlock') || '').toLowerCase();
      document.execCommand('formatBlock', false, current === btn.dataset.block ? 'p' : btn.dataset.block);
    }
    syncToolbar();
    state.dirty = true;
    updateChecklist();
  });

  editor.addEventListener('paste', (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const html = text
      .split(/\n{2,}|\r\n\r\n/)
      .map((block) => block.trim())
      .filter(Boolean)
      .map((block) => `<p>${esc(block).replace(/\n/g, '<br>')}</p>`)
      .join('');
    document.execCommand('insertHTML', false, html || esc(text));
  });

  ['keyup', 'mouseup', 'focus'].forEach((ev) => editor.addEventListener(ev, syncToolbar));
  document.addEventListener('selectionchange', () => {
    if (document.activeElement === editor) syncToolbar();
  });
}

function syncToolbar() {
  $$('#toolbar [data-cmd]').forEach((b) => b.setAttribute('aria-pressed', String(document.queryCommandState(b.dataset.cmd))));
  const block = (document.queryCommandValue('formatBlock') || '').toLowerCase();
  $$('#toolbar [data-block]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.block !== 'p' && b.dataset.block === block)));
}

/* ---------------- Counters & checklist ---------------- */

function updateCounters() {
  $$('[data-count]').forEach((el) => {
    const input = F[el.dataset.count];
    el.textContent = `${input.value.length}/${input.maxLength}`;
  });
  const words = wordCount(editor.innerHTML);
  $('#word-count').textContent = `${words} word${words === 1 ? '' : 's'} · ~${Math.max(1, Math.round(words / 200))} min read`;
}

function fieldsValid() {
  return {
    title: F.title.value.trim().length >= 10,
    subtitle: F.subtitle.value.trim().length >= 10,
    category: !!F.category.value,
    location: F.location.value.trim().length >= 2,
    image: !!state.image,
    body: wordCount(editor.innerHTML) >= MIN_WORDS,
  };
}

const CHECK_LABELS = { title: 'Headline', subtitle: 'Subtitle', category: 'Category', location: 'Location tag', image: 'Main image', body: `Story body (${MIN_WORDS}+ words)` };

function updateChecklist() {
  const v = fieldsValid();
  $('#checklist').innerHTML = Object.entries(CHECK_LABELS).map(([k, label]) => `
    <li class="flex items-center gap-2 ${v[k] ? 'text-ink' : 'text-muted'}">
      <span class="grid size-[18px] place-items-center rounded-full ${v[k] ? 'bg-[#1f8a4c] text-white' : 'border border-line bg-white'}">${v[k] ? icon.check('size-3') : ''}</span>
      ${label}
    </li>`).join('');
}

function clearErrorsFor(field) {
  field?.classList.remove('has-error');
}

/* ---------------- Save / submit ---------------- */

function wireActions() {
  $$('[data-action]').forEach((btn) =>
    btn.addEventListener('click', () => (btn.dataset.action === 'submit' ? save(true) : save(false))),
  );
  form.addEventListener('submit', (e) => e.preventDefault());
}

function collect() {
  return {
    id: state.id,
    title: F.title.value,
    subtitle: F.subtitle.value,
    category: F.category.value,
    location: F.location.value,
    image: state.image,
    body: sanitizeHtml(editor.innerHTML),
  };
}

function save(submit) {
  if (state.locked) return;
  $$('[data-field]').forEach((f) => f.classList.remove('has-error'));

  if (submit) {
    const v = fieldsValid();
    const invalid = Object.keys(v).filter((k) => !v[k]);
    if (invalid.length) {
      invalid.forEach((k) => form.querySelector(`[data-field=${k}]`)?.classList.add('has-error'));
      const first = form.querySelector(`[data-field=${invalid[0]}]`);
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (first?.querySelector('input, textarea, select') || (invalid[0] === 'body' ? editor : null))?.focus({ preventScroll: true });
      toast(`Please complete ${invalid.length === 1 ? 'the highlighted field' : `the ${invalid.length} highlighted fields`} before submitting.`, 'error');
      return;
    }
  } else if (F.title.value.trim().length < 3) {
    form.querySelector('[data-field=title]').classList.add('has-error');
    F.title.focus();
    toast('Add at least a working headline to save a draft.', 'error');
    return;
  }

  try {
    const saved = saveReporterArticle(collect(), session, { submit });
    state.dirty = false;
    if (submit) {
      setFlash('Submitted for approval. It is now in the Head Editor’s queue.', 'success');
      window.location.href = B + 'reporter/dashboard.html';
      return;
    }
    state.id = saved.id;
    state.status = saved.status;
    history.replaceState(null, '', `${B}reporter/create-article.html?id=${encodeURIComponent(saved.id)}`);
    $('#form-title').textContent = 'Edit Article';
    $('#form-status').innerHTML = statusBadge(saved.status);
    $('#save-state').textContent = `Draft saved ${formatDateTime(saved.updatedAt)}`;
    toast('Draft saved. You can come back and finish it any time.');
  } catch (err) {
    toast(err instanceof StorageFullError ? err.message : err.message || 'Could not save the article.', 'error');
  }
}

/* ---------------- Start ---------------- */
if (session) init();
