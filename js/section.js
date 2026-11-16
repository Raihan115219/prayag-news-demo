/* ==================================================================
   section.js — section.html?category=prayagraj
   Lists published articles in one section, newest first, with Load More.
   ================================================================== */
import { B } from './paths.js';
import { initPublicPage } from './app.js';
import { findCategory, getPublished, articleUrl, CATEGORIES, NAV_CATEGORIES, sectionUrl } from './articles.js';
import { gridCard, byline, arrowNotch, categoryBadge, emptyState, icon } from './components.js';
import { esc, img, langAttr, param } from './utils.js';
import { onExternalChange, KEYS } from './storage.js';

const PAGE_SIZE = 6; // grid items per "page" (plus the lead story)
const cat = findCategory(param('category') || '');
let shown = PAGE_SIZE + 1;

initPublicPage(cat && NAV_CATEGORIES.includes(cat.name) ? cat.name : '');
render();
onExternalChange([KEYS.articles], render);

function render() {
  const root = document.getElementById('section-root');

  if (!cat) {
    document.title = 'Section not found — Prayag News';
    root.innerHTML = `<div class="container-page py-16 sm:py-24">${emptyState({
      title: 'Section not found',
      text: 'Choose one of our sections below.',
      action: `<div class="flex flex-wrap justify-center gap-2">${CATEGORIES.map((c) => `<a class="btn btn-outline !rounded-full !py-2" href="${sectionUrl(c.name)}">${esc(c.name)}</a>`).join('')}</div>`,
    })}</div>`;
    return;
  }

  document.title = `${cat.name} News — Prayag News`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', cat.description);

  const all = getPublished({ category: cat.name });
  const [lead, ...rest] = all;
  const visible = rest.slice(0, shown - 1);
  const remaining = rest.length - visible.length;

  root.innerHTML = `
    <section class="border-b border-line bg-cream">
      <div class="container-page py-10 sm:py-14">
        <nav aria-label="Breadcrumb" class="mb-5 flex items-center gap-2 text-[13px] text-muted">
          <a href="${B}index.html" class="hover:text-ink">Home</a><span aria-hidden="true">/</span><span class="text-ink">${esc(cat.name)}</span>
        </nav>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 class="headline text-[38px] font-bold sm:text-[56px]">${esc(cat.name)} <span class="text-[22px] font-semibold text-muted sm:text-[28px]" lang="hi">${esc(cat.hi)}</span></h1>
            <p class="mt-3 max-w-2xl text-[16px] leading-relaxed text-[#555]">${esc(cat.description)}</p>
          </div>
          <p class="shrink-0 text-[13px] font-medium text-muted">${all.length} ${all.length === 1 ? 'story' : 'stories'}</p>
        </div>
      </div>
    </section>

    <div class="container-page pt-10 sm:pt-14">
      ${!lead ? emptyState({
        title: `No ${cat.name} stories yet`,
        text: 'Published articles in this section will appear here.',
        action: `<a href="${B}index.html" class="btn btn-dark">${icon.arrowLeft('size-4')} Back to homepage</a>`,
      }) : `
      <a href="${articleUrl(lead.id)}" class="group grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
        <div class="relative overflow-hidden rounded-[24px] lg:col-span-7">
          <img src="${img(lead.image, 1100)}" alt="" class="img-zoom aspect-[16/10] w-full object-cover" fetchpriority="high">
          ${arrowNotch({ size: 'lg', accent: true })}
        </div>
        <div class="lg:col-span-5">
          ${categoryBadge('Latest')}
          <h2 class="headline mt-4 text-[26px] font-bold sm:text-[34px]"${langAttr(lead.title)}>${esc(lead.title)}</h2>
          <p class="mt-4 line-clamp-3 text-[16px] leading-relaxed text-muted"${langAttr(lead.subtitle)}>${esc(lead.subtitle)}</p>
          <div class="mt-6">${byline(lead)}</div>
        </div>
      </a>

      ${visible.length ? `
      <div class="mt-14 grid gap-5 divide-y divide-line border-t border-line pt-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:divide-y-0 lg:grid-cols-3">
        ${visible.map((a, i) => `<div class="fade-in ${i ? 'pt-5 sm:pt-0' : ''}">${gridCard(a)}</div>`).join('')}
      </div>` : ''}

      ${remaining > 0 ? `
      <div class="mt-12 flex justify-center">
        <button type="button" id="load-more" class="btn btn-outline !rounded-full !px-6">
          Load more stories <span class="text-muted">(${remaining})</span>
        </button>
      </div>` : rest.length ? `<p class="mt-12 text-center text-[13px] text-muted">You’re all caught up.</p>` : ''}
      `}
    </div>
  `;

  document.getElementById('load-more')?.addEventListener('click', () => {
    shown += PAGE_SIZE;
    render();
  });
}
