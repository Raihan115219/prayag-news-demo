/* ==================================================================
   article-details.js — renders article.html?id=article-001
   ================================================================== */
import { B } from './paths.js';
import { initPublicPage, setActiveNav } from './app.js';
import { getById, getPublished, STATUS, NAV_CATEGORIES, sectionUrl } from './articles.js';
import { articleView, gridCard, emptyState, statusBadge, icon, brandIcon } from './components.js';
import { getSession, HOME_FOR_ROLE } from './auth.js';
import { esc, param, stripHtml, toast } from './utils.js';
import { onExternalChange, KEYS } from './storage.js';

initPublicPage('');
render();
onExternalChange([KEYS.articles], render);

function render() {
  const root = document.getElementById('article-root');
  const id = param('id');
  const article = id ? getById(id) : null;
  const session = getSession();

  // Non-published articles are visible only to the editor or their reporter (as a preview).
  const canPreview = article && session && (session.role === 'editor' || session.email === article.authorEmail);
  if (!article || (article.status !== STATUS.published && !canPreview)) {
    document.title = 'Article not found — Prayag News';
    root.innerHTML = `
      <div class="container-page py-16 sm:py-24">
        ${emptyState({
          title: 'Article not found',
          text: 'This story may have been moved, unpublished, or the link may be incorrect.',
          iconSvg: icon.file('size-6'),
          action: `<a href="${B}index.html" class="btn btn-dark">${icon.arrowLeft('size-4')} Back to homepage</a>`,
        })}
      </div>`;
    return;
  }

  if (NAV_CATEGORIES.includes(article.category)) setActiveNav(article.category);
  document.title = `${article.title} — Prayag News`;
  setMeta('description', article.subtitle || stripHtml(article.body).slice(0, 150));
  setMeta('og:title', article.title, 'property');
  setMeta('og:description', article.subtitle, 'property');

  const previewBanner = article.status !== STATUS.published
    ? `<div class="container-page pt-6"><div class="flex flex-col gap-3 rounded-2xl border border-[#f3d79b] bg-[#fff8e8] px-4 py-3 text-[14px] text-[#7a5200] sm:flex-row sm:items-center sm:justify-between">
        <p class="flex items-center gap-2">${icon.eye('size-4')} <span><strong>Preview only.</strong> This article is not live on the public site.</span> ${statusBadge(article.status)}</p>
        <a href="${HOME_FOR_ROLE[session.role]}" class="font-semibold underline underline-offset-2">Back to ${session.role === 'editor' ? 'Editor' : 'Reporter'} Desk</a>
      </div></div>`
    : '';

  const related = getPublished({ category: article.category, exclude: [article.id], limit: 3 });
  const shareUrl = window.location.href;
  const shareText = `${article.title} — Prayag News`;

  root.innerHTML = `
    ${previewBanner}
    <div class="container-page pt-8 sm:pt-12">
      ${articleView(article)}

      ${article.status === STATUS.published ? `
      <div class="mx-auto mt-12 flex max-w-[680px] flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">Share this story</p>
        <div class="flex flex-wrap gap-2">
          <a class="btn !rounded-full bg-[#1f8a4c] !py-2 text-white hover:bg-[#187240]" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}">${brandIcon.whatsapp} WhatsApp</a>
          <a class="btn btn-outline !rounded-full !py-2" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}">${brandIcon.facebook} Facebook</a>
          <button type="button" data-copy class="btn btn-outline !rounded-full !py-2">${icon.copy('size-4')} Copy link</button>
        </div>
      </div>` : ''}
    </div>

    ${related.length ? `
    <section class="container-page mt-16 border-t border-line pt-12 sm:mt-20" aria-labelledby="related-title">
      <div class="mb-8 flex items-end justify-between gap-4">
        <h2 id="related-title" class="section-title">More from ${esc(article.category)}</h2>
        <a href="${sectionUrl(article.category)}" class="pill-link">View all <span class="pill-icon">${icon.arrowUpRight('size-3.5')}</span></a>
      </div>
      <div class="grid gap-5 divide-y divide-line sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:divide-y-0 lg:grid-cols-3">
        ${related.map((a, i) => `<div class="${i ? 'pt-5 sm:pt-0' : ''}">${gridCard(a)}</div>`).join('')}
      </div>
    </section>` : ''}
  `;

  root.querySelector('[data-copy]')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast('Link copied to clipboard');
    } catch {
      toast('Could not copy automatically — please copy the address bar link.', 'error');
    }
  });
}

function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.append(el);
  }
  el.setAttribute('content', content);
}
