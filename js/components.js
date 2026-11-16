/* ==================================================================
   components.js — reusable markup builders (header, footer, cards,
   badges, panel chrome). Each returns an HTML string.
   ================================================================== */
import { B } from './paths.js';
import { esc, img, langAttr, timeAgo, formatDateTime, formatLongDate, avatar } from './utils.js';
import { CATEGORIES, NAV_CATEGORIES, STATUS, articleUrl, sectionUrl, findCategory } from './articles.js';
import { getSession, HOME_FOR_ROLE } from './auth.js';

/* ---------------- Icons (inline SVG, stroke = currentColor) ---------------- */

const svg = (d, cls = 'size-4', sw = 2) =>
  `<svg viewBox="0 0 24 24" class="${cls}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

export const icon = {
  arrowUpRight: (c) => svg('<path d="M7 17 17 7M8 7h9v9"/>', c),
  arrowLeft: (c) => svg('<path d="M19 12H5m6-6-6 6 6 6"/>', c),
  arrowRight: (c) => svg('<path d="M5 12h14m-6-6 6 6-6 6"/>', c),
  pin: (c) => svg('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>', c),
  clock: (c) => svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', c),
  plus: (c) => svg('<path d="M12 5v14M5 12h14"/>', c, 2.4),
  logout: (c) => svg('<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11"/>', c),
  external: (c) => svg('<path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>', c),
  edit: (c) => svg('<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>', c),
  eye: (c) => svg('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>', c),
  trash: (c) => svg('<path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3"/>', c),
  check: (c) => svg('<path d="M20 6 9 17l-5-5"/>', c, 2.4),
  x: (c) => svg('<path d="M6 6l12 12M18 6 6 18"/>', c, 2.2),
  star: (c) => svg('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>', c),
  file: (c) => svg('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>', c),
  inbox: (c) => svg('<path d="M3 13h5l1.5 3h5L16 13h5M5 5h14l2 8v6H3v-6Z"/>', c),
  alert: (c) => svg('<path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>', c),
  image: (c) => svg('<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>', c),
  layers: (c) => svg('<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>', c),
  copy: (c) => svg('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>', c),
  refresh: (c) => svg('<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>', c),
};

const brandIcon = {
  whatsapp: '<svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4ZM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.6V14h2.8v8h3.1Z"/></svg>',
  x: '<svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
};
export { brandIcon };

/* ---------------- Brand ---------------- */

export function logo({ invert = false, compact = false } = {}) {
  const word = invert ? 'text-white' : 'text-ink';
  return `
    <a href="${B}index.html" class="group inline-flex items-center gap-2.5" aria-label="Prayag News — home">
      <span class="relative grid size-9 shrink-0 place-items-center rounded-full ${invert ? 'bg-white text-ink' : 'bg-ink text-white'}" lang="hi">
        <span class="text-[15px] font-bold leading-none" style="margin-top:1px">प्र</span>
        <span class="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 ${invert ? 'border-ink' : 'border-white'} bg-accent"></span>
      </span>
      <span class="leading-none">
        <span class="block text-[19px] font-extrabold tracking-[-0.035em] ${word}">PRAYAG<span class="text-accent">NEWS</span></span>
        ${compact ? '' : `<span class="mt-1 block text-[9.5px] font-medium uppercase tracking-[0.24em] ${invert ? 'text-white/50' : 'text-muted'}">Your City. Your News.</span>`}
      </span>
    </a>`;
}

/* ---------------- Public header & footer ---------------- */

export function siteHeader(active = 'Home') {
  const session = getSession();
  const deskHref = session ? HOME_FOR_ROLE[session.role] : B + 'login.html';
  const deskLabel = session ? (session.role === 'editor' ? 'Editor Desk' : 'Reporter Desk') : 'Newsroom Login';

  const items = ['Home', ...NAV_CATEGORIES];
  const link = (name) => {
    const isActive = name === active;
    const href = name === 'Home' ? B + 'index.html' : sectionUrl(name);
    return `<a href="${href}" class="relative shrink-0 whitespace-nowrap px-1 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.08em] transition-colors ${isActive ? 'text-accent' : 'text-ink/75 hover:text-ink'}" ${isActive ? 'aria-current="page"' : ''}>
      ${esc(name)}
      ${isActive ? '<span class="absolute inset-x-1 bottom-0 h-[2px] rounded-full bg-accent"></span>' : ''}
    </a>`;
  };

  return `
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded-lg focus:bg-ink focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
  <header class="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
    <div class="container-page">
      <div class="flex h-[64px] items-center justify-between gap-4 sm:h-[76px] lg:grid lg:grid-cols-3">
        <p class="hidden text-[12.5px] text-muted lg:block">
          <span class="font-medium text-ink">${esc(formatLongDate())}</span><br>Prayagraj, Uttar Pradesh
        </p>
        <div class="lg:justify-self-center">${logo()}</div>
        <div class="flex items-center justify-end gap-2">
          <a href="${deskHref}" class="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[12.5px] font-semibold text-ink transition-colors hover:border-ink">
            ${session ? avatar(session.name, 'size-5 text-[8px]') : svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>', 'size-4')}
            <span class="hidden sm:inline">${deskLabel}</span><span class="sm:hidden">${session ? 'Desk' : 'Login'}</span>
          </a>
        </div>
      </div>
      <nav aria-label="Sections" class="-mx-4 border-t border-line sm:mx-0">
        <div class="no-scrollbar nav-fade flex gap-5 overflow-x-auto px-4 sm:justify-center sm:gap-7 sm:px-0 md:gap-9">
          ${items.map(link).join('')}
        </div>
      </nav>
    </div>
  </header>`;
}

export function siteFooter() {
  const year = new Date().getFullYear();
  const social = ['whatsapp', 'facebook', 'x', 'youtube', 'instagram'];
  return `
  <footer class="mt-20 bg-ink text-white/70 sm:mt-28">
    <!-- Reserved: a future leaderboard ad slot can sit above this footer (nothing shown in the demo). -->
    <div class="container-page grid gap-12 py-14 sm:py-16 md:grid-cols-12">
      <div class="md:col-span-5">
        ${logo({ invert: true })}
        <h2 class="mt-7 text-[13px] font-semibold uppercase tracking-[0.12em] text-white">About</h2>
        <p class="mt-3 max-w-sm text-[14px] leading-relaxed">
          Prayag News is an independent local newsroom covering Prayagraj and Uttar Pradesh — civic issues,
          public services, education, sport and community life, in Hindi and English.
        </p>
        <div class="mt-6 flex gap-2.5" aria-label="Social media (coming soon)">
          ${social.map((s) => `<span title="${s[0].toUpperCase() + s.slice(1)} — coming soon" class="grid size-9 place-items-center rounded-full border border-white/15 text-white/70">${brandIcon[s]}<span class="sr-only">${s} (coming soon)</span></span>`).join('')}
        </div>
      </div>
      <div class="md:col-span-3">
        <h2 class="text-[13px] font-semibold uppercase tracking-[0.12em] text-white">Sections</h2>
        <ul class="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[14px] md:grid-cols-1">
          ${CATEGORIES.map((c) => `<li><a class="transition-colors hover:text-white" href="${sectionUrl(c.name)}">${esc(c.name)}</a></li>`).join('')}
        </ul>
      </div>
      <div class="md:col-span-4">
        <h2 class="text-[13px] font-semibold uppercase tracking-[0.12em] text-white">Contact</h2>
        <address class="mt-4 space-y-2.5 text-[14px] not-italic leading-relaxed">
          <p>News Desk, Civil Lines<br>Prayagraj, Uttar Pradesh 211001</p>
          <p>Phone: +91 532 000 0000 <span class="text-white/40">(demo)</span></p>
          <p>Email: <a class="text-accent hover:underline" href="mailto:desk@prayagnews.demo">desk@prayagnews.demo</a></p>
        </address>
        <h2 class="mt-7 text-[13px] font-semibold uppercase tracking-[0.12em] text-white">Newsroom</h2>
        <p class="mt-3 text-[14px]"><a class="inline-flex items-center gap-1.5 hover:text-white" href="${B}login.html">Reporter &amp; Editor login ${icon.arrowUpRight('size-3.5')}</a></p>
      </div>
    </div>
    <div class="border-t border-white/10">
      <div class="container-page flex flex-col gap-2 py-5 text-[12.5px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© ${year} Prayag News. All rights reserved.</p>
        <p>Demo build — all articles are fictional sample content.</p>
      </div>
    </div>
  </footer>`;
}

/* ---------------- Small atoms ---------------- */

export function categoryBadge(category, { solid = false } = {}) {
  return `<span class="inline-flex items-center rounded-full ${solid ? 'bg-accent text-white' : 'bg-accent/10 text-accent'} px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]">${esc(category)}</span>`;
}

export function byline(a, { light = false, time = true } = {}) {
  return `
    <div class="flex min-w-0 items-center gap-2 text-[12.5px] ${light ? 'text-white/80' : 'text-muted'}">
      ${avatar(a.author, `size-6 text-[9px] ${light ? 'ring-1 ring-white/40' : ''}`)}
      <span class="truncate font-medium ${light ? 'text-white' : 'text-ink'}">${esc(a.author)}</span>
      ${time ? `<span aria-hidden="true">·</span><time datetime="${esc(a.publishedAt)}" class="shrink-0">${esc(timeAgo(a.publishedAt))}</time>` : ''}
    </div>`;
}

export function arrowNotch({ size = 'md', bg = '#fff', accent = false } = {}) {
  const cls = size === 'lg' ? 'notch notch-lg' : size === 'sm' ? 'notch notch-sm' : 'notch';
  const btn = size === 'lg' ? 'size-14 rounded-2xl' : size === 'sm' ? 'size-8 rounded-[10px]' : 'size-10 rounded-xl';
  const ic = size === 'lg' ? 'size-6' : size === 'sm' ? 'size-3.5' : 'size-4';
  return `<span class="${cls}" style="--notch-bg:${bg}" aria-hidden="true">
    <span class="arrow-btn ${btn} ${accent ? '!bg-accent' : ''}">${icon.arrowUpRight(ic)}</span>
  </span>`;
}

const statusTone = {
  [STATUS.draft]: 'bg-[#efefec] text-[#555]',
  [STATUS.pending]: 'bg-[#fff3d6] text-[#9a6200]',
  [STATUS.published]: 'bg-[#e3f4ea] text-[#17693b]',
  [STATUS.rejected]: 'bg-crimson/10 text-crimson',
  [STATUS.unpublished]: 'bg-[#e8ecf3] text-[#3d4b63]',
};
export function statusBadge(status) {
  return `<span class="badge ${statusTone[status] || 'bg-cream text-ink'}">${esc(status)}</span>`;
}

/* ---------------- News cards ---------------- */

/** Large Top Story card with image background (homepage hero). */
export function heroCard(a) {
  return `
  <a href="${articleUrl(a.id)}" class="group relative isolate flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[28px] bg-ink sm:min-h-[520px] lg:h-full">
    <img src="${img(a.image, 1400)}" alt="" class="img-zoom absolute inset-0 -z-10 size-full object-cover" fetchpriority="high">
    <div class="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/45 to-black/0"></div>
    <div class="max-w-2xl p-6 pr-20 sm:p-9 sm:pr-28">
      <div class="mb-4 flex flex-wrap items-center gap-2">
        ${categoryBadge(a.category, { solid: true })}
        <span class="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">Top Story</span>
      </div>
      <h2 class="headline text-[27px] font-bold text-white sm:text-[36px] lg:text-[40px]"${langAttr(a.title)}>${esc(a.title)}</h2>
      <p class="mt-3 line-clamp-3 text-[15px] leading-relaxed text-white/80 sm:text-base"${langAttr(a.subtitle)}>${esc(a.subtitle)}</p>
      <div class="mt-5">${byline(a, { light: true })}</div>
    </div>
    ${arrowNotch({ size: 'lg', accent: true })}
  </a>`;
}

/** Horizontal card used beside the Top Story. */
export function sideCard(a) {
  return `
  <a href="${articleUrl(a.id)}" class="group grid grid-cols-[116px_1fr] items-start gap-4 sm:grid-cols-[168px_1fr] sm:gap-5">
    <div class="relative aspect-square overflow-hidden rounded-2xl sm:aspect-[4/3.4]">
      <img src="${img(a.image, 420)}" alt="" loading="lazy" class="img-zoom size-full object-cover">
      <span class="hidden sm:block">${arrowNotch({ size: 'sm' })}</span>
    </div>
    <div class="min-w-0 py-0.5">
      <p class="kicker mb-1.5">${esc(a.category)}</p>
      <h3 class="headline line-clamp-3 text-[16px] font-semibold text-ink group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 sm:text-[17px]"${langAttr(a.title)}>${esc(a.title)}</h3>
      <p class="mt-1.5 line-clamp-2 hidden text-[13px] leading-relaxed text-muted sm:block"${langAttr(a.subtitle)}>${esc(a.subtitle)}</p>
      <div class="mt-2.5">${byline(a)}</div>
    </div>
  </a>`;
}

/** Standard grid card (Latest News, section page). Compact row on phones. */
export function gridCard(a, { bg = '#fff', showExcerpt = true, priority = false } = {}) {
  return `
  <a href="${articleUrl(a.id)}" class="group grid grid-cols-[112px_1fr] items-start gap-4 sm:block">
    <div class="relative aspect-square overflow-hidden rounded-2xl sm:mb-4 sm:aspect-[16/10.5]">
      <img src="${img(a.image, 720)}" alt="" ${priority ? '' : 'loading="lazy"'} class="img-zoom size-full object-cover">
      <span class="hidden sm:block">${arrowNotch({ bg })}</span>
    </div>
    <div class="min-w-0">
      <div class="mb-1.5 flex items-center gap-2 text-[12px]">
        <span class="kicker">${esc(a.category)}</span>
        <span class="text-muted" aria-hidden="true">·</span>
        <time class="text-muted" datetime="${esc(a.publishedAt)}">${esc(timeAgo(a.publishedAt))}</time>
      </div>
      <h3 class="headline line-clamp-3 text-[16px] font-semibold text-ink group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 sm:text-[19px]"${langAttr(a.title)}>${esc(a.title)}</h3>
      ${showExcerpt ? `<p class="mt-2 line-clamp-2 hidden text-[14px] leading-relaxed text-muted sm:block"${langAttr(a.subtitle)}>${esc(a.subtitle)}</p>` : ''}
      <div class="mt-3 hidden sm:block">${byline(a, { time: false })}</div>
    </div>
  </a>`;
}

/** Compact list item with small thumbnail (section blocks). */
export function compactItem(a, { dark = false } = {}) {
  return `
  <a href="${articleUrl(a.id)}" class="group grid grid-cols-[1fr_84px] items-start gap-4 py-4">
    <div class="min-w-0">
      <h4 class="headline line-clamp-3 text-[15px] font-semibold ${dark ? 'text-white' : 'text-ink'} group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4"${langAttr(a.title)}>${esc(a.title)}</h4>
      <time class="mt-2 block text-[12px] ${dark ? 'text-white/55' : 'text-muted'}" datetime="${esc(a.publishedAt)}">${esc(timeAgo(a.publishedAt))}</time>
    </div>
    <div class="aspect-square overflow-hidden rounded-xl">
      <img src="${img(a.image, 200)}" alt="" loading="lazy" class="img-zoom size-full object-cover">
    </div>
  </a>`;
}

export function sectionHeading(title, { href, dark = false, sub } = {}) {
  return `
  <div class="mb-6 flex items-end justify-between gap-4 sm:mb-8">
    <div>
      <h2 class="section-title ${dark ? '!text-white' : ''}">${esc(title)}</h2>
      ${sub ? `<p class="mt-1 text-[13px] ${dark ? 'text-white/55' : 'text-muted'}"${langAttr(sub)}>${esc(sub)}</p>` : ''}
    </div>
    ${href ? `<a href="${href}" class="pill-link shrink-0" aria-label="View all ${esc(title)} news">View all <span class="pill-icon">${icon.arrowUpRight('size-3.5')}</span></a>` : ''}
  </div>`;
}

/* ---------------- Article (public page + editor preview) ---------------- */

export function articleView(a, { preview = false } = {}) {
  const cat = findCategory(a.category);
  const hiTitle = langAttr(a.title);
  const time = a.publishedAt || a.submittedAt || a.updatedAt;
  const timeLabel = a.publishedAt ? 'Published' : a.submittedAt ? 'Submitted' : 'Last saved';
  return `
  <article class="fade-in">
    <header class="mx-auto max-w-[820px] ${preview ? '' : 'text-left sm:text-center'}">
      ${preview ? '' : `
      <nav aria-label="Breadcrumb" class="mb-6 flex items-center gap-2 text-[13px] text-muted sm:justify-center">
        <a href="${B}index.html" class="hover:text-ink">Home</a><span aria-hidden="true">/</span>
        <a href="${sectionUrl(a.category)}" class="hover:text-ink">${esc(a.category)}</a>
      </nav>`}
      <a href="${sectionUrl(a.category)}" class="inline-block" ${preview ? 'tabindex="-1"' : ''}>${categoryBadge(a.category)}</a>
      <h1 class="headline mt-5 text-[30px] font-bold text-ink sm:text-[42px] lg:text-[50px]"${hiTitle}>${esc(a.title)}</h1>
      ${a.subtitle ? `<p class="mt-5 text-[18px] leading-relaxed text-[#555] sm:text-[20px]"${langAttr(a.subtitle)}>${esc(a.subtitle)}</p>` : ''}
      <div class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-line py-4 text-[13.5px] text-muted ${preview ? '' : 'sm:justify-center'}">
        <span class="flex items-center gap-2.5">
          ${avatar(a.author, 'size-9 text-[12px]')}
          <span class="text-left leading-tight"><span class="block font-semibold text-ink">${esc(a.author)}</span><span class="text-[12px]">Prayag News</span></span>
        </span>
        <span class="flex items-center gap-1.5">${icon.clock('size-4')}<span>${timeLabel} <time datetime="${esc(time)}">${esc(formatDateTime(time))}</time></span></span>
        ${a.location ? `<span class="flex items-center gap-1.5">${icon.pin('size-4')}<span${langAttr(a.location)}>${esc(a.location)}</span></span>` : ''}
      </div>
    </header>
    ${a.image ? `
    <figure class="mx-auto mt-8 max-w-[1100px] sm:mt-10">
      <div class="overflow-hidden rounded-[22px] bg-cream sm:rounded-[28px]">
        <img src="${img(a.image, 1600)}" alt="${esc(a.title)}" class="aspect-[16/10] w-full object-cover sm:aspect-[16/9]" fetchpriority="high">
      </div>
      <figcaption class="mt-3 text-center text-[12px] text-muted">${cat ? esc(cat.name) : ''} · Representative image</figcaption>
    </figure>` : ''}
    <div class="article-body mx-auto mt-10 max-w-[680px] sm:mt-12"${hiTitle}>
      ${a.body || '<p class="text-muted">No body text yet.</p>'}
    </div>
  </article>`;
}

/* ---------------- Panel (CMS) chrome ---------------- */

export function panelHeader(session, active) {
  const isEditor = session.role === 'editor';
  const links = isEditor
    ? [{ id: 'queue', label: 'Approval Queue', href: B + 'editor/dashboard.html#queue' }, { id: 'all', label: 'All Articles', href: B + 'editor/dashboard.html#all' }]
    : [{ id: 'dashboard', label: 'My Articles', href: B + 'reporter/dashboard.html' }, { id: 'create', label: 'New Article', href: B + 'reporter/create-article.html' }];
  return `
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded-lg focus:bg-ink focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
  <header class="sticky top-0 z-40 border-b border-line bg-white">
    <div class="mx-auto flex h-16 max-w-[1320px] items-center gap-3 px-4 sm:px-6 lg:px-8">
      ${logo({ compact: true })}
      <span class="hidden rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted sm:inline">${isEditor ? 'Editor Desk' : 'Reporter Desk'}</span>
      <nav class="ml-4 hidden items-center gap-1 md:flex" aria-label="Panel">
        ${links.map((l) => `<a href="${l.href}" class="rounded-lg px-3 py-2 text-[13.5px] font-medium ${l.id === active ? 'bg-cream text-ink' : 'text-muted hover:text-ink'}" ${l.id === active ? 'aria-current="page"' : ''}>${l.label}</a>`).join('')}
      </nav>
      <div class="ml-auto flex items-center gap-1 sm:gap-2">
        <a href="${B}index.html" target="_blank" rel="noopener" class="btn btn-ghost !px-3 !py-2 text-[13px]" title="Open the public website">${icon.external('size-4')}<span class="hidden lg:inline">View site</span></a>
        <div class="hidden items-center gap-2.5 border-l border-line pl-3 sm:flex">
          ${avatar(session.name, 'size-8 text-[11px]')}
          <div class="leading-tight"><p class="text-[13px] font-semibold">${esc(session.name)}</p><p class="text-[11.5px] text-muted">${esc(session.title)}</p></div>
        </div>
        <button type="button" data-logout class="btn btn-ghost !px-3 !py-2 text-[13px]" title="Log out">${icon.logout('size-4')}<span class="hidden sm:inline">Logout</span></button>
      </div>
    </div>
    <nav class="flex gap-1 overflow-x-auto border-t border-line px-3 py-1.5 md:hidden" aria-label="Panel">
      ${links.map((l) => `<a href="${l.href}" class="shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-medium ${l.id === active ? 'bg-cream text-ink' : 'text-muted'}">${l.label}</a>`).join('')}
    </nav>
  </header>`;
}

export function statCard({ label, value, tone = 'ink', iconSvg, hint }) {
  const tones = {
    ink: 'bg-cream text-ink',
    green: 'bg-[#e3f4ea] text-[#17693b]',
    amber: 'bg-[#fff3d6] text-[#9a6200]',
    red: 'bg-crimson/10 text-crimson',
    orange: 'bg-accent/10 text-accent',
  };
  return `
  <div class="panel-card p-4 sm:p-5">
    <div class="flex items-center justify-between">
      <p class="text-[13px] font-medium text-muted">${esc(label)}</p>
      <span class="grid size-8 place-items-center rounded-lg ${tones[tone]}">${iconSvg}</span>
    </div>
    <p class="mt-3 text-[30px] font-semibold leading-none tracking-tight sm:text-[34px]">${value}</p>
    ${hint ? `<p class="mt-2 text-[12px] text-muted">${esc(hint)}</p>` : ''}
  </div>`;
}

export function emptyState({ title, text, action = '', iconSvg = icon.inbox('size-6') }) {
  return `
  <div class="flex flex-col items-center px-6 py-14 text-center">
    <span class="grid size-14 place-items-center rounded-2xl bg-cream text-muted">${iconSvg}</span>
    <h3 class="mt-4 text-[16px] font-semibold">${esc(title)}</h3>
    <p class="mt-1.5 max-w-sm text-[14px] text-muted">${esc(text)}</p>
    ${action ? `<div class="mt-5">${action}</div>` : ''}
  </div>`;
}
