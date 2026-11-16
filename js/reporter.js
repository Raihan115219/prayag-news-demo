/* ==================================================================
   reporter.js — Reporter dashboard: stats + "My Articles" table.
   Reporters only ever see their own articles.
   ================================================================== */
import { B } from './paths.js';
import { initPanelPage } from './app.js';
import { getByAuthor, countByStatus, STATUS, deleteDraft, articleUrl } from './articles.js';
import { statCard, statusBadge, emptyState, icon } from './components.js';
import { esc, img, langAttr, formatDate, timeAgo, greeting, openModal, toast } from './utils.js';
import { onExternalChange, KEYS } from './storage.js';

const session = initPanelPage('reporter', 'dashboard');

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: STATUS.draft, label: 'Drafts' },
  { id: STATUS.pending, label: 'Pending' },
  { id: STATUS.published, label: 'Published' },
  { id: STATUS.rejected, label: 'Rejected' },
  { id: STATUS.unpublished, label: 'Unpublished' },
];
let filter = 'all';

if (session) {
  render();
  onExternalChange([KEYS.articles], render);
}

function render() {
  const root = document.getElementById('reporter-root');
  const mine = getByAuthor(session.email);
  const c = countByStatus(mine);
  const rejected = mine.filter((a) => a.status === STATUS.rejected);
  const list = filter === 'all' ? mine : mine.filter((a) => a.status === filter);
  const firstName = session.name.split(' ')[0];

  root.removeAttribute('aria-busy');
  root.innerHTML = `
    <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-[13px] font-medium text-muted">${esc(greeting())}, ${esc(firstName)}</p>
        <h1 class="mt-1 text-[28px] font-semibold tracking-tight sm:text-[32px]">Your stories at a glance</h1>
      </div>
      <a href="${B}reporter/create-article.html" class="btn btn-primary !py-3 !px-5 text-[14.5px]">${icon.plus('size-4')} Create New Article</a>
    </div>

    <div class="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      ${statCard({ label: 'Total Articles', value: c.total, iconSvg: icon.file('size-4'), hint: `${c[STATUS.draft]} draft${c[STATUS.draft] === 1 ? '' : 's'}` })}
      ${statCard({ label: 'Published', value: c[STATUS.published], tone: 'green', iconSvg: icon.check('size-4'), hint: 'Live on the website' })}
      ${statCard({ label: 'Pending Approval', value: c[STATUS.pending], tone: 'amber', iconSvg: icon.clock('size-4'), hint: 'With the Head Editor' })}
      ${statCard({ label: 'Rejected', value: c[STATUS.rejected], tone: 'red', iconSvg: icon.x('size-4'), hint: c[STATUS.rejected] ? 'Needs your changes' : 'Nothing to fix' })}
    </div>

    ${rejected.length ? `
    <section class="mt-6 rounded-2xl border border-crimson/20 bg-white p-4 sm:p-5" aria-labelledby="needs-changes">
      <h2 id="needs-changes" class="flex items-center gap-2 text-[14px] font-semibold text-crimson">${icon.alert('size-4')} Returned by the editor — needs your changes</h2>
      <ul class="mt-3 divide-y divide-line">
        ${rejected.map((a) => `
          <li class="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="min-w-0">
              <p class="truncate text-[14.5px] font-semibold"${langAttr(a.title)}>${esc(a.title)}</p>
              <p class="mt-1 text-[13px] text-[#6b2a2f]"><span class="font-semibold">Editor’s note:</span> ${esc(a.rejectionNote)}</p>
            </div>
            <a href="${B}reporter/create-article.html?id=${encodeURIComponent(a.id)}" class="btn btn-dark shrink-0 !py-2 text-[13px]">${icon.edit('size-4')} Edit &amp; resubmit</a>
          </li>`).join('')}
      </ul>
    </section>` : ''}

    <section class="panel-card mt-6 overflow-hidden" aria-labelledby="my-articles">
      <div class="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <h2 id="my-articles" class="text-[17px] font-semibold">My Articles</h2>
        <div class="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1" role="tablist" aria-label="Filter by status">
          ${FILTERS.map((f) => {
            const n = f.id === 'all' ? c.total : c[f.id];
            const on = f.id === filter;
            return `<button type="button" role="tab" aria-selected="${on}" data-filter="${esc(f.id)}" class="shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${on ? 'bg-ink text-white' : 'text-muted hover:bg-cream hover:text-ink'}">${f.label} <span class="${on ? 'text-white/60' : 'text-[#aaa]'}">${n}</span></button>`;
          }).join('')}
        </div>
      </div>
      ${list.length ? table(list) : emptyState({
        title: filter === 'all' ? 'No articles yet' : `No ${FILTERS.find((f) => f.id === filter).label.toLowerCase()} articles`,
        text: filter === 'all' ? 'Your first story is one click away.' : 'Articles with this status will appear here.',
        action: filter === 'all' ? `<a href="${B}reporter/create-article.html" class="btn btn-primary">${icon.plus('size-4')} Create New Article</a>` : '',
      })}
    </section>
  `;

  root.querySelectorAll('[data-filter]').forEach((b) =>
    b.addEventListener('click', () => {
      filter = b.dataset.filter;
      render();
    }),
  );
  root.querySelectorAll('[data-delete]').forEach((b) => b.addEventListener('click', () => onDelete(b.dataset.delete)));
}

function actions(a) {
  const edit = `<a href="${B}reporter/create-article.html?id=${encodeURIComponent(a.id)}" class="btn btn-outline !px-3 !py-1.5 text-[13px]">${icon.edit('size-3.5')} ${a.status === STATUS.rejected ? 'Edit &amp; resubmit' : 'Edit'}</a>`;
  const view = (label) => `<a href="${articleUrl(a.id)}" class="btn btn-outline !px-3 !py-1.5 text-[13px]" ${a.status === STATUS.published ? 'target="_blank" rel="noopener"' : ''}>${a.status === STATUS.published ? icon.external('size-3.5') : icon.eye('size-3.5')} ${label}</a>`;
  switch (a.status) {
    case STATUS.draft:
      return `${edit}<button type="button" data-delete="${esc(a.id)}" class="btn btn-ghost !px-2.5 !py-1.5 text-muted hover:!text-crimson" aria-label="Delete draft">${icon.trash('size-4')}</button>`;
    case STATUS.pending:
      return view('Preview');
    case STATUS.published:
      return view('View live');
    case STATUS.rejected:
    case STATUS.unpublished:
      return edit;
    default:
      return '';
  }
}

function table(list) {
  return `
  <!-- Desktop / tablet table -->
  <div class="hidden md:block">
    <table class="w-full text-left text-[14px]">
      <thead class="bg-cream/60 text-[12px] uppercase tracking-[0.08em] text-muted">
        <tr>
          <th scope="col" class="px-5 py-3 font-semibold">Article Title</th>
          <th scope="col" class="px-3 py-3 font-semibold">Category</th>
          <th scope="col" class="px-3 py-3 font-semibold">Created</th>
          <th scope="col" class="px-3 py-3 font-semibold">Status</th>
          <th scope="col" class="px-5 py-3 text-right font-semibold">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-line">
        ${list.map((a) => `
        <tr class="align-middle transition-colors hover:bg-cream/40">
          <td class="px-5 py-3.5">
            <div class="flex items-center gap-3.5">
              ${thumb(a, 'size-12')}
              <div class="min-w-0 max-w-[440px]">
                <p class="line-clamp-1 font-semibold"${langAttr(a.title)}>${esc(a.title || 'Untitled draft')}</p>
                <p class="mt-0.5 text-[12.5px] text-muted">Updated ${esc(timeAgo(a.updatedAt))}${a.status === STATUS.rejected ? ' · <span class="text-crimson">see editor’s note</span>' : ''}</p>
              </div>
            </div>
          </td>
          <td class="whitespace-nowrap px-3 py-3.5 text-[#444]">${esc(a.category || '—')}</td>
          <td class="whitespace-nowrap px-3 py-3.5 text-[#444]">${esc(formatDate(a.createdAt))}</td>
          <td class="px-3 py-3.5">${statusBadge(a.status)}</td>
          <td class="px-5 py-3.5"><div class="flex justify-end gap-1.5">${actions(a)}</div></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <!-- Mobile cards -->
  <ul class="divide-y divide-line md:hidden">
    ${list.map((a) => `
    <li class="p-4">
      <div class="flex gap-3">
        ${thumb(a, 'size-16')}
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">${statusBadge(a.status)}<span class="text-[12px] text-muted">${esc(formatDate(a.createdAt))}</span></div>
          <p class="mt-2 line-clamp-2 text-[14.5px] font-semibold leading-snug"${langAttr(a.title)}>${esc(a.title || 'Untitled draft')}</p>
          <p class="mt-1 text-[12.5px] text-muted">${esc(a.category || 'No category')}</p>
        </div>
      </div>
      <div class="mt-3 flex flex-wrap gap-1.5">${actions(a)}</div>
    </li>`).join('')}
  </ul>`;
}

function thumb(a, size) {
  return a.image
    ? `<img src="${img(a.image, 160)}" alt="" loading="lazy" class="${size} shrink-0 rounded-xl object-cover">`
    : `<span class="${size} grid shrink-0 place-items-center rounded-xl bg-cream text-muted">${icon.image('size-5')}</span>`;
}

async function onDelete(id) {
  const ok = await openModal({
    title: 'Delete this draft?',
    body: 'The draft will be permanently removed. This cannot be undone.',
    confirmLabel: 'Delete draft',
    tone: 'danger',
  });
  if (!ok) return;
  try {
    deleteDraft(id, session);
    toast('Draft deleted.');
    render();
  } catch (err) {
    toast(err.message, 'error');
  }
}
