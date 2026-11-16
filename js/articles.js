/* ==================================================================
   articles.js — the single source of truth for article data.
   Every page reads and writes through these functions.
   ================================================================== */
import { B } from './paths.js';
import { KEYS, read, write } from './storage.js';
import { buildSeedArticles } from './seed-data.js';

const SEED_VERSION = '1';

export const STATUS = Object.freeze({
  draft: 'Draft',
  pending: 'Pending Approval',
  published: 'Published',
  rejected: 'Rejected',
  unpublished: 'Unpublished',
});

export const CATEGORIES = [
  { name: 'Prayagraj', hi: 'प्रयागराज', slug: 'prayagraj', description: 'Civic news, Sangam, education and everyday life from across Prayagraj — Civil Lines to Naini, Jhunsi to Phaphamau.' },
  { name: 'Uttar Pradesh', hi: 'उत्तर प्रदेश', slug: 'uttar-pradesh', description: 'Stories from Lucknow and districts across the state that matter to readers in Prayagraj.' },
  { name: 'National', hi: 'देश', slug: 'national', description: 'The national developments that shape life in our city, explained simply.' },
  { name: 'Politics', hi: 'राजनीति', slug: 'politics', description: 'Municipal corporation, ward committees and state politics — accountability reporting from the ground.' },
  { name: 'Crime', hi: 'अपराध', slug: 'crime', description: 'Police updates, cyber-safety and public alerts, reported responsibly.' },
  { name: 'Sports', hi: 'खेल', slug: 'sports', description: 'Local cricket, athletics, football and the young players making the city proud.' },
  { name: 'Entertainment', hi: 'मनोरंजन', slug: 'entertainment', description: 'Music, theatre, dance and festivals across the city.' },
  { name: 'Business', hi: 'कारोबार', slug: 'business', description: 'Markets, traders, jobs and the local economy.' },
];

/** Sections shown in the public top navigation (per demo scope). */
export const NAV_CATEGORIES = ['Prayagraj', 'Uttar Pradesh', 'National', 'Politics', 'Crime', 'Sports'];

export function findCategory(value = '') {
  const v = String(value).trim().toLowerCase();
  return CATEGORIES.find((c) => c.name.toLowerCase() === v || c.slug === v) || null;
}

export const sectionUrl = (category) => `${B}section.html?category=${encodeURIComponent(findCategory(category)?.slug || category)}`;
export const articleUrl = (id) => `${B}article.html?id=${encodeURIComponent(id)}`;

/* ---------------- Initialisation ---------------- */

/**
 * Seeds the demo dataset once. Later visits keep whatever reporters and
 * editors have changed — data is only replaced by resetDemoData().
 */
export function ensureSeeded() {
  const existing = read(KEYS.articles, null);
  if (Array.isArray(existing) && read(KEYS.seedVersion) === SEED_VERSION) return;
  write(KEYS.articles, buildSeedArticles());
  write(KEYS.seedVersion, SEED_VERSION);
}

export function resetDemoData() {
  write(KEYS.articles, buildSeedArticles());
  write(KEYS.seedVersion, SEED_VERSION);
}

/* ---------------- Reads ---------------- */

export function getAll() {
  ensureSeeded();
  return read(KEYS.articles, []);
}

export function getById(id) {
  return getAll().find((a) => a.id === id) || null;
}

const byDateDesc = (field) => (a, b) => new Date(b[field] || b.updatedAt) - new Date(a[field] || a.updatedAt);

export function getPublished({ category, exclude = [], limit } = {}) {
  const cat = category ? findCategory(category)?.name : null;
  const list = getAll()
    .filter((a) => a.status === STATUS.published && !exclude.includes(a.id) && (!cat || a.category === cat))
    .sort(byDateDesc('publishedAt'));
  return limit ? list.slice(0, limit) : list;
}

/** The homepage Top Story: the flagged article, else the newest published one. */
export function getTopStory() {
  const published = getPublished();
  return published.find((a) => a.isTopStory) || published[0] || null;
}

/** Featured side stories next to the Top Story (flagged first, then newest). */
export function getFeatured(excludeId, count = 3) {
  const published = getPublished({ exclude: [excludeId] });
  const flagged = published.filter((a) => a.isFeatured);
  const rest = published.filter((a) => !a.isFeatured);
  return [...flagged, ...rest].slice(0, count);
}

export function getByAuthor(email) {
  return getAll()
    .filter((a) => a.authorEmail === email)
    .sort(byDateDesc('updatedAt'));
}

/** Everything the editor can see — drafts stay private to the reporter. */
export function getEditorial() {
  return getAll()
    .filter((a) => a.status !== STATUS.draft)
    .sort(byDateDesc('updatedAt'));
}

export function getPendingQueue() {
  return getAll()
    .filter((a) => a.status === STATUS.pending)
    .sort(byDateDesc('submittedAt'));
}

export function countByStatus(list) {
  const counts = { total: list.length };
  Object.values(STATUS).forEach((s) => (counts[s] = 0));
  list.forEach((a) => (counts[a.status] = (counts[a.status] || 0) + 1));
  return counts;
}

/* ---------------- Writes ---------------- */

function saveAll(list) {
  write(KEYS.articles, list);
}

function update(id, changes) {
  const list = getAll();
  const idx = list.findIndex((a) => a.id === id);
  if (idx === -1) throw new Error('Article not found.');
  list[idx] = { ...list[idx], ...changes, updatedAt: new Date().toISOString() };
  saveAll(list);
  return list[idx];
}

function newId(list) {
  const max = list.reduce((m, a) => Math.max(m, Number(String(a.id).replace(/\D/g, '')) || 0), 0);
  return `article-${String(max + 1).padStart(3, '0')}`;
}

/**
 * Creates or updates a reporter's article.
 * `submit: true` moves it to Pending Approval; otherwise it is a Draft.
 */
export function saveReporterArticle(fields, author, { submit = false } = {}) {
  const list = getAll();
  const now = new Date().toISOString();
  const status = submit ? STATUS.pending : STATUS.draft;
  const clean = {
    title: fields.title?.trim() || '',
    subtitle: fields.subtitle?.trim() || '',
    category: fields.category || '',
    image: fields.image || '',
    body: fields.body || '',
    location: fields.location?.trim() || '',
  };

  if (fields.id) {
    const existing = list.find((a) => a.id === fields.id);
    if (!existing) throw new Error('Article not found.');
    if (existing.authorEmail !== author.email) throw new Error('You can only edit your own articles.');
    return update(fields.id, {
      ...clean,
      status,
      submittedAt: submit ? now : existing.submittedAt,
      // Keep the editor's note visible on the draft until it is resubmitted.
      rejectionNote: submit ? '' : existing.rejectionNote,
      previousRejectionNote: submit && existing.rejectionNote ? existing.rejectionNote : existing.previousRejectionNote || '',
      isTopStory: false,
    });
  }

  const article = {
    id: newId(list),
    ...clean,
    author: author.name,
    authorEmail: author.email,
    status,
    rejectionNote: '',
    isTopStory: false,
    isFeatured: false,
    createdAt: now,
    updatedAt: now,
    submittedAt: submit ? now : '',
    publishedAt: '',
    reviewedBy: '',
    reviewedAt: '',
  };
  list.push(article);
  saveAll(list);
  return article;
}

export function deleteDraft(id, author) {
  const list = getAll();
  const a = list.find((x) => x.id === id);
  if (!a || a.authorEmail !== author.email || a.status !== STATUS.draft) throw new Error('Only your own drafts can be deleted.');
  saveAll(list.filter((x) => x.id !== id));
}

function clearTopStory(list) {
  list.forEach((a) => (a.isTopStory = false));
}

export function approveArticle(id, editor, { topStory = false, featured = false } = {}) {
  const list = getAll();
  const a = list.find((x) => x.id === id);
  if (!a) throw new Error('Article not found.');
  const now = new Date().toISOString();
  if (topStory) clearTopStory(list);
  Object.assign(a, {
    status: STATUS.published,
    publishedAt: now,
    updatedAt: now,
    reviewedBy: editor.name,
    reviewedAt: now,
    rejectionNote: '',
    isTopStory: topStory,
    isFeatured: featured || a.isFeatured,
  });
  saveAll(list);
  return a;
}

export function rejectArticle(id, editor, note) {
  if (!note || note.trim().length < 10) throw new Error('Please write a short rejection note (at least 10 characters).');
  const now = new Date().toISOString();
  return update(id, {
    status: STATUS.rejected,
    rejectionNote: note.trim(),
    reviewedBy: editor.name,
    reviewedAt: now,
    isTopStory: false,
    isFeatured: false,
  });
}

export function unpublishArticle(id, editor) {
  return update(id, { status: STATUS.unpublished, isTopStory: false, isFeatured: false, reviewedBy: editor.name, reviewedAt: new Date().toISOString() });
}

export function republishArticle(id, editor) {
  return update(id, { status: STATUS.published, reviewedBy: editor.name, reviewedAt: new Date().toISOString() });
}

/** Only one article can be the Top Story at a time. */
export function setTopStory(id, value = true) {
  const list = getAll();
  const a = list.find((x) => x.id === id);
  if (!a) throw new Error('Article not found.');
  if (value && a.status !== STATUS.published) throw new Error('Only published articles can be the Top Story.');
  if (value) clearTopStory(list);
  a.isTopStory = value;
  a.updatedAt = new Date().toISOString();
  saveAll(list);
  return a;
}

export function setFeatured(id, value = true) {
  return update(id, { isFeatured: value });
}
