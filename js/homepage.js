/* ==================================================================
   homepage.js — Top Story, Latest News and section blocks.
   ================================================================== */
import { initPublicPage } from './app.js';
import { getTopStory, getFeatured, getPublished, sectionUrl, articleUrl, findCategory } from './articles.js';
import { heroCard, sideCard, gridCard, compactItem, sectionHeading, byline, arrowNotch, categoryBadge, emptyState, icon } from './components.js';
import { onExternalChange, KEYS } from './storage.js';
import { esc, img, langAttr, timeAgo } from './utils.js';

let heroIds = [];
const section = (category, limit) => getPublished({ category, exclude: heroIds, limit });

initPublicPage('Home');
render();
onExternalChange([KEYS.articles], render);

function render() {
  const main = document.getElementById('home');
  const top = getTopStory();
  if (!top) {
    main.innerHTML = `<div class="container-page py-20">${emptyState({ title: 'No published stories yet', text: 'Approved articles will appear here.' })}</div>`;
    return;
  }

  const featured = getFeatured(top.id, 3);
  // Stories already in the hero are not repeated further down the page.
  heroIds = [top.id, ...featured.map((a) => a.id)];
  const latest = getPublished({ exclude: heroIds, limit: 6 });

  main.innerHTML = `
    ${topStorySection(top, featured)}
    ${latestSection(latest)}
    ${prayagrajBand()}
    ${upHighlight()}
    ${threeColumnBlocks(['National', 'Politics', 'Crime'])}
    ${sportsRow()}
    ${threeColumnBlocks(['Entertainment', 'Business'], { two: true })}
  `;
}

/* ---------------- Top Story ---------------- */

function topStorySection(top, featured) {
  return `
  <section class="container-page pt-6 sm:pt-10" aria-labelledby="top-story-title">
    <h2 id="top-story-title" class="sr-only">Top Story</h2>
    <div class="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div class="lg:col-span-7">${heroCard(top)}</div>
      <div class="flex flex-col justify-between gap-5 divide-y divide-line lg:col-span-5 lg:gap-0 lg:divide-y-0">
        ${featured.map((a, i) => `<div class="${i ? 'pt-5 lg:pt-0' : ''}">${sideCard(a)}</div>`).join('')}
      </div>
    </div>
  </section>`;
}

/* ---------------- Latest News ---------------- */

function latestSection(list) {
  if (!list.length) return '';
  return `
  <section class="container-page mt-16 sm:mt-20" aria-labelledby="latest-title">
    <div class="mb-6 flex items-end justify-between gap-4 sm:mb-8">
      <div class="flex items-center gap-3">
        <h2 id="latest-title" class="section-title">Latest News</h2>
        <span class="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
          <span class="relative flex size-1.5"><span class="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60"></span><span class="relative inline-flex size-1.5 rounded-full bg-accent"></span></span>
          Live updates
        </span>
      </div>
    </div>
    <div class="grid gap-5 divide-y divide-line sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:divide-y-0 lg:grid-cols-3">
      ${list.map((a, i) => `<div class="${i ? 'pt-5 sm:pt-0' : ''}">${gridCard(a)}</div>`).join('')}
    </div>
  </section>`;
}

/* ---------------- Prayagraj (dark band) ---------------- */

function prayagrajBand() {
  const items = section('Prayagraj', 4);
  if (!items.length) return '';
  const [lead, ...rest] = items;
  const cat = findCategory('Prayagraj');
  return `
  <section class="mt-20 bg-ink py-14 text-white sm:mt-24 sm:py-20" aria-labelledby="sec-prayagraj">
    <div class="container-page">
      <div id="sec-prayagraj">${sectionHeading('Prayagraj', { href: sectionUrl('Prayagraj'), dark: true, sub: `${cat.hi} · Our city, first` })}</div>
      <a href="${articleUrl(lead.id)}" class="group grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
        <div class="relative overflow-hidden rounded-[24px] lg:col-span-7">
          <img src="${img(lead.image, 1100)}" alt="" loading="lazy" class="img-zoom aspect-[16/10] w-full object-cover">
          ${arrowNotch({ size: 'lg', bg: '#171717' })}
        </div>
        <div class="lg:col-span-5">
          ${categoryBadge(lead.category, { solid: true })}
          <h3 class="headline mt-4 text-[26px] font-bold sm:text-[34px]"${langAttr(lead.title)}>${esc(lead.title)}</h3>
          <p class="mt-4 line-clamp-3 text-[15px] leading-relaxed text-white/70"${langAttr(lead.subtitle)}>${esc(lead.subtitle)}</p>
          <div class="mt-6">${byline(lead, { light: true })}</div>
        </div>
      </a>
      ${rest.length ? `
      <div class="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3 sm:gap-8">
        ${rest.map((a) => `
          <a href="${articleUrl(a.id)}" class="group grid grid-cols-[96px_1fr] items-start gap-4">
            <div class="relative aspect-square overflow-hidden rounded-2xl">
              <img src="${img(a.image, 260)}" alt="" loading="lazy" class="img-zoom size-full object-cover">
            </div>
            <div class="min-w-0">
              <h4 class="headline line-clamp-3 text-[15px] font-semibold group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4"${langAttr(a.title)}>${esc(a.title)}</h4>
              <p class="mt-2 text-[12px] text-white/55">${esc(a.author)} · ${esc(timeAgo(a.publishedAt))}</p>
            </div>
          </a>`).join('')}
      </div>` : ''}
    </div>
  </section>`;
}

/* ---------------- Uttar Pradesh (wide highlight) ---------------- */

function upHighlight() {
  const items = section('Uttar Pradesh', 4);
  if (!items.length) return '';
  const [lead, ...rest] = items;
  const cat = findCategory('Uttar Pradesh');
  return `
  <section class="container-page mt-16 sm:mt-24" aria-labelledby="sec-up">
    <div id="sec-up">${sectionHeading('Uttar Pradesh', { href: sectionUrl('Uttar Pradesh'), sub: cat.hi })}</div>
    <div class="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <a href="${articleUrl(lead.id)}" class="group relative isolate flex min-h-[380px] flex-col justify-end overflow-hidden rounded-[28px] bg-ink sm:min-h-[460px] ${rest.length ? 'lg:col-span-8' : 'lg:col-span-12'}">
        <img src="${img(lead.image, 1400)}" alt="" loading="lazy" class="img-zoom absolute inset-0 -z-10 size-full object-cover">
        <div class="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/0"></div>
        <div class="max-w-3xl p-6 pr-20 sm:p-10 sm:pr-28">
          ${categoryBadge(lead.category, { solid: true })}
          <h3 class="headline mt-4 text-[25px] font-bold text-white sm:text-[32px]"${langAttr(lead.title)}>${esc(lead.title)}</h3>
          <p class="mt-3 line-clamp-2 text-[15px] leading-relaxed text-white/80"${langAttr(lead.subtitle)}>${esc(lead.subtitle)}</p>
          <div class="mt-5">${byline(lead, { light: true })}</div>
        </div>
        ${arrowNotch({ size: 'lg' })}
      </a>
      ${rest.length ? `<div class="flex flex-col divide-y divide-line lg:col-span-4 lg:-mt-4">
        ${rest.map((a) => `
          <a href="${articleUrl(a.id)}" class="group flex-1 py-4 first:pt-0 lg:first:pt-4">
            <div class="flex items-center gap-2 text-[12px]"><span class="kicker">${esc(a.location || a.category)}</span><span class="text-muted">· ${esc(timeAgo(a.publishedAt))}</span></div>
            <h4 class="headline mt-1.5 text-[17px] font-semibold group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4"${langAttr(a.title)}>${esc(a.title)}</h4>
            <p class="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-muted"${langAttr(a.subtitle)}>${esc(a.subtitle)}</p>
          </a>`).join('')}
      </div>` : ''}
    </div>
  </section>`;
}

/* ---------------- Column blocks (National / Politics / Crime …) ---------------- */

function threeColumnBlocks(names, { two = false } = {}) {
  const blocks = names
    .map((name) => ({ name, items: section(name, 3) }))
    .filter((b) => b.items.length);
  if (!blocks.length) return '';
  return `
  <section class="container-page mt-16 sm:mt-24">
    <div class="grid gap-14 ${two ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} md:gap-8 lg:gap-10">
      ${blocks.map(({ name, items }) => columnBlock(name, items)).join('')}
    </div>
  </section>`;
}

function columnBlock(name, [lead, ...rest]) {
  const cat = findCategory(name);
  return `
  <div aria-labelledby="sec-${cat.slug}">
    <div class="mb-5 flex items-center justify-between border-b-2 border-ink pb-3">
      <h2 id="sec-${cat.slug}" class="text-[19px] font-semibold tracking-tight">${esc(name)} <span class="ml-1 text-[13px] font-normal text-muted" lang="hi">${esc(cat.hi)}</span></h2>
      <a href="${sectionUrl(name)}" class="inline-flex items-center gap-1 text-[13px] font-semibold text-accent hover:underline">View all ${icon.arrowRight('size-3.5')}</a>
    </div>
    <a href="${articleUrl(lead.id)}" class="group block">
      <div class="relative overflow-hidden rounded-2xl">
        <img src="${img(lead.image, 720)}" alt="" loading="lazy" class="img-zoom aspect-[16/10] w-full object-cover">
        ${arrowNotch()}
      </div>
      <h3 class="headline mt-4 text-[19px] font-semibold group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4"${langAttr(lead.title)}>${esc(lead.title)}</h3>
      <p class="mt-2 line-clamp-2 text-[14px] leading-relaxed text-muted"${langAttr(lead.subtitle)}>${esc(lead.subtitle)}</p>
      <div class="mt-3">${byline(lead)}</div>
    </a>
    <div class="mt-3 divide-y divide-line border-t border-line">
      ${rest.map((a) => compactItem(a)).join('')}
    </div>
  </div>`;
}

/* ---------------- Sports (4-up row) ---------------- */

function sportsRow() {
  const items = section('Sports', 4);
  if (!items.length) return '';
  const cat = findCategory('Sports');
  return `
  <section class="mt-20 bg-cream py-14 sm:mt-24 sm:py-20" aria-labelledby="sec-sports-row">
    <div class="container-page">
      <div id="sec-sports-row">${sectionHeading('Sports', { href: sectionUrl('Sports'), sub: cat.hi })}</div>
      <div class="grid gap-5 divide-y divide-line sm:grid-cols-2 sm:gap-6 sm:divide-y-0 lg:grid-cols-4">
        ${items.map((a, i) => `<div class="${i ? 'pt-5 sm:pt-0' : ''}">${gridCard(a, { bg: '#F5F5F3', showExcerpt: false })}</div>`).join('')}
      </div>
    </div>
  </section>`;
}
