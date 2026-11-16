/* ==================================================================
   editor.js — Head Editor dashboard: stats, Approval Queue,
   current Top Story and the All Articles table.
   ================================================================== */
import { B } from './paths.js';
import { initPanelPage } from './app.js';
import { getEditorial, getPendingQueue, countByStatus, STATUS, getTopStory, getFeatured, resetDemoData, articleUrl } from './articles.js';
import { statCard, statusBadge, emptyState, icon } from './components.js';
import { esc, img, langAttr, formatDate, timeAgo, greeting, avatar, openModal, toast } from './utils.js';
import { onExternalChange, KEYS } from './storage.js';

const session = initPanelPage('editor', location.hash === '#all' ? 'all' : 'queue');

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: STATUS.pending, label: 'Pending' },
  { id: STATUS.published, label: 'Published' },
  { id: STATUS.rejected, label: 'Rejected' },
  { id: STATUS.unpublished, label: 'Unpublished' },
];
let filter = 'all';

if (session) {
  render();
  onExternalChange([KEYS.articles], render);
  if (location.hash) requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
}

function reviewUrl(id) {
  return `${B}editor/review-article.html?id=${encodeURIComponent(id)}`;
}

function render() {
  const root = document.getElementById('editor-root');
  const all = getEditorial();
  const queue = getPendingQueue();
  const c = countByStatus(all);
  const top = getTopStory();
  const featured = top ? getFeatured(top.id, 3) : [];
  const list = filter === 'all' ? all : all.filter((a) => a.status === filter);

  root.removeAttribute('aria-busy');
  root.innerHTML = `
    <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-[13px] font-medium text-muted">${esc(greeting())}, ${esc(session.name.split(' ')[0])}</p>
        <h1 class="mt-1 text-[28px] font-semibold tracking-tight sm:text-[32px]">
          ${queue.length ? `${queue.length} ${queue.length === 1 ? 'story is' : 'stories are'} waiting for review` : 'The queue is clear'}
        </h1>
      </div>
      <a href="${B}index.html" target="_blank" rel="noopener" class="btn btn-outline">${icon.external('size-4')} Open public homepage</a>
    </div>

    <div class="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      ${statCard({ label: 'Total Articles', value: c.total, iconSvg: icon.file('size-4'), hint: 'Submitted to the desk' })}
      ${statCard({ label: 'Pending Approval', value: c[STATUS.pending], tone: 'amber', iconSvg: icon.clock('size-4'), hint: queue[0] ? `Latest ${timeAgo(queue[0].submittedAt).toLowerCase()}` : 'Nothing waiting' })}
      ${statCard({ label: 'Published', value: c[STATUS.published], tone: 'green', iconSvg: icon.check('size-4'), hint: 'Live on the website' })}
      ${statCard({ label: 'Rejected', value: c[STATUS.rejected], tone: 'red', iconSvg: icon.x('size-4'), hint: 'Returned to reporters' })}
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-12">
      <!-- Approval queue -->
      <section id="queue" class="panel-card scroll-mt-24 overflow-hidden lg:col-span-8" aria-labelledby="queue-title">
        <div class="flex items-center justify-between border-b border-line p-4 sm:p-5">
          <h2 id="queue-title" class="flex items-center gap-2.5 text-[17px] font-semibold">Approval Queue
            <span class="rounded-full ${queue.length ? 'bg-accent text-white' : 'bg-cream text-muted'} px-2 py-0.5 text-[12px] font-semibold">${queue.length}</span>
          </h2>
          <p class="text-[12.5px] text-muted">Newest first</p>
        </div>
        ${queue.length ? `<ul class="divide-y divide-line">${queue.map(queueItem).join('')}</ul>` : emptyState({
          title: 'All caught up',
          text: 'There are no articles waiting for approval. New submissions from reporters will appear here automatically.',
          iconSvg: icon.check('size-6'),
        })}
      </section>

      <!-- Homepage control -->
      <aside class="space-y-6 lg:col-span-4">
        <section class="panel-card overflow-hidden" aria-labelledby="top-title">
          <div class="flex items-center justify-between p-4 pb-3 sm:px-5">
            <h2 id="top-title" class="flex items-center gap-2 text-[15px] font-semibold">${icon.star('size-4 text-accent')} Current Top Story</h2>
            ${top ? `<a href="${reviewUrl(top.id)}" class="text-[12.5px] font-semibold text-accent hover:underline">Manage</a>` : ''}
          </div>
          ${top ? `
          <a href="${articleUrl(top.id)}" target="_blank" rel="noopener" class="group block px-4 pb-4 sm:px-5 sm:pb-5">
            <img src="${img(top.image, 640)}" alt="" class="aspect-[16/9] w-full rounded-xl object-cover">
            <p class="mt-3 line-clamp-2 text-[14.5px] font-semibold leading-snug group-hover:underline"${langAttr(top.title)}>${esc(top.title)}</p>
            <p class="mt-1 text-[12px] text-muted">${esc(top.category)} · ${top.isTopStory ? 'Selected by editor' : 'Automatic (newest story)'}</p>
          </a>` : `<p class="px-5 pb-5 text-[13px] text-muted">No published stories yet.</p>`}
          ${featured.length ? `
          <div class="border-t border-line px-4 py-3 sm:px-5">
            <p class="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-muted">Featured beside it</p>
            <ul class="mt-2 space-y-2">
              ${featured.map((a) => `<li><a href="${reviewUrl(a.id)}" class="line-clamp-1 text-[13px] hover:text-accent"${langAttr(a.title)}>${a.isFeatured ? '★' : '·'} ${esc(a.title)}</a></li>`).join('')}
            </ul>
          </div>` : ''}
        </section>

        <section class="panel-card p-4 sm:p-5" aria-labelledby="demo-title">
          <h2 id="demo-title" class="text-[15px] font-semibold">Demo workflow</h2>
          <ol class="mt-3 space-y-2 text-[13px] leading-relaxed text-[#555]">
            <li><span class="font-semibold text-ink">1.</span> Reporter submits a story.</li>
            <li><span class="font-semibold text-ink">2.</span> Review it here — approve or reject with a note.</li>
            <li><span class="font-semibold text-ink">3.</span> Approved stories go live instantly on the homepage.</li>
          </ol>
          <button type="button" id="reset-demo" class="btn btn-ghost mt-3 -ml-2 !px-2 !py-1.5 text-[12.5px] text-muted">${icon.refresh('size-3.5')} Reset demo data</button>
        </section>
      </aside>
    </div>

    <!-- All articles -->
    <section id="all" class="panel-card mt-6 scroll-mt-24 overflow-hidden" aria-labelledby="all-title">
      <div class="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <h2 id="all-title" class="text-[17px] font-semibold">All Articles</h2>
        <div class="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1" role="tablist" aria-label="Filter by status">
          ${FILTERS.map((f) => {
            const n = f.id === 'all' ? c.total : c[f.id];
            const on = f.id === filter;
            return `<button type="button" role="tab" aria-selected="${on}" data-filter="${esc(f.id)}" class="shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${on ? 'bg-ink text-white' : 'text-muted hover:bg-cream hover:text-ink'}">${f.label} <span class="${on ? 'text-white/60' : 'text-[#aaa]'}">${n}</span></button>`;
          }).join('')}
        </div>
      </div>
      ${list.length ? allTable(list, top) : emptyState({ title: 'Nothing here', text: 'No articles match this filter.' })}
    </section>
  `;

  root.querySelectorAll('[data-filter]').forEach((b) =>
    b.addEventListener('click', () => {
      filter = b.dataset.filter;
      render();
      document.getElementById('all').scrollIntoView({ block: 'nearest' });
    }),
  );
  root.querySelector('#reset-demo').addEventListener('click', onReset);
}

function queueItem(a) {
  return `
  <li class="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
    <a href="${reviewUrl(a.id)}" class="flex min-w-0 flex-1 gap-4">
      <img src="${img(a.image, 300)}" alt="" loading="lazy" class="aspect-[4/3] w-24 shrink-0 rounded-xl object-cover sm:w-32">
      <div class="min-w-0">
        <p class="kicker">${esc(a.category)}</p>
        <h3 class="mt-1 line-clamp-2 text-[15.5px] font-semibold leading-snug"${langAttr(a.title)}>${esc(a.title)}</h3>
        <div class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-muted">
          <span class="flex items-center gap-1.5">${avatar(a.author, 'size-5 text-[8px]')} <span class="font-medium text-ink">${esc(a.author)}</span></span>
          <span aria-hidden="true">·</span>
          <span title="${esc(formatDate(a.submittedAt))}">Submitted ${esc(timeAgo(a.submittedAt).toLowerCase())}</span>
          ${a.previousRejectionNote ? '<span aria-hidden="true">·</span><span class="font-medium text-[#9a6200]">Resubmitted</span>' : ''}
        </div>
      </div>
    </a>
    <a href="${reviewUrl(a.id)}" class="btn btn-primary shrink-0 sm:!px-5">Review ${icon.arrowRight('size-4')}</a>
  </li>`;
}

function allTable(list, top) {
  const action = (a) => `<a href="${reviewUrl(a.id)}" class="btn btn-outline !px-3 !py-1.5 text-[13px]">${a.status === STATUS.pending ? 'Review' : 'Open'}</a>`;
  const flags = (a) => `${top && a.id === top.id && a.status === STATUS.published ? `<span class="badge bg-accent/10 text-accent !pl-2 before:!hidden">${icon.star('size-3')} Top Story</span>` : ''}${a.isFeatured && a.status === STATUS.published ? '<span class="badge bg-cream text-ink before:!hidden">Featured</span>' : ''}`;
  return `
  <div class="hidden md:block">
    <table class="w-full text-left text-[14px]">
      <thead class="bg-cream/60 text-[12px] uppercase tracking-[0.08em] text-muted">
        <tr>
          <th scope="col" class="px-5 py-3 font-semibold">Article</th>
          <th scope="col" class="px-3 py-3 font-semibold">Reporter</th>
          <th scope="col" class="px-3 py-3 font-semibold">Category</th>
          <th scope="col" class="px-3 py-3 font-semibold">Updated</th>
          <th scope="col" class="px-3 py-3 font-semibold">Status</th>
          <th scope="col" class="px-5 py-3 text-right font-semibold">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-line">
        ${list.map((a) => `
        <tr class="transition-colors hover:bg-cream/40">
          <td class="px-5 py-3">
            <div class="flex items-center gap-3">
              <img src="${img(a.image, 140)}" alt="" loading="lazy" class="size-11 shrink-0 rounded-lg object-cover">
              <div class="min-w-0 max-w-[380px]">
                <p class="line-clamp-1 font-semibold"${langAttr(a.title)}>${esc(a.title)}</p>
                <div class="mt-1 flex gap-1.5">${flags(a)}</div>
              </div>
            </div>
          </td>
          <td class="whitespace-nowrap px-3 py-3 text-[#444]">${esc(a.author)}</td>
          <td class="whitespace-nowrap px-3 py-3 text-[#444]">${esc(a.category)}</td>
          <td class="whitespace-nowrap px-3 py-3 text-[#444]">${esc(formatDate(a.updatedAt))}</td>
          <td class="px-3 py-3">${statusBadge(a.status)}</td>
          <td class="px-5 py-3 text-right">${action(a)}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
  <ul class="divide-y divide-line md:hidden">
    ${list.map((a) => `
    <li>
      <a href="${reviewUrl(a.id)}" class="flex gap-3 p-4">
        <img src="${img(a.image, 140)}" alt="" loading="lazy" class="size-14 shrink-0 rounded-xl object-cover">
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">${statusBadge(a.status)}<span class="text-[12px] text-muted">${esc(formatDate(a.updatedAt))}</span></div>
          <p class="mt-1.5 line-clamp-2 text-[14px] font-semibold leading-snug"${langAttr(a.title)}>${esc(a.title)}</p>
          <p class="mt-1 text-[12px] text-muted">${esc(a.author)} · ${esc(a.category)}</p>
          <div class="mt-1.5 flex gap-1.5">${flags(a)}</div>
        </div>
      </a>
    </li>`).join('')}
  </ul>`;
}

async function onReset() {
  const ok = await openModal({
    title: 'Reset demo data?',
    body: 'This restores the original sample articles and removes every article created or changed during the demo, in this browser only.',
    confirmLabel: 'Reset data',
    tone: 'danger',
  });
  if (!ok) return;
  resetDemoData();
  filter = 'all';
  render();
  toast('Demo data has been reset.');
}
