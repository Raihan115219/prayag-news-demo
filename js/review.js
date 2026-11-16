/* ==================================================================
   review.js — Head Editor review screen.
   Live preview + Approve / Reject (with note) / Top Story / Featured /
   Unpublish / Republish.
   ================================================================== */
import { B } from './paths.js';
import { initPanelPage } from './app.js';
import {
  getById, STATUS, approveArticle, rejectArticle, unpublishArticle, republishArticle,
  setTopStory, setFeatured, getTopStory, articleUrl,
} from './articles.js';
import { articleView, statusBadge, emptyState, icon } from './components.js';
import { esc, param, formatDateTime, wordCount, readingTime, avatar, openModal, toast, setFlash } from './utils.js';
import { onExternalChange, KEYS } from './storage.js';

const session = initPanelPage('editor', 'queue');
const id = param('id');

const REJECT_PRESETS = [
  'Please add a quote from an official or named source.',
  'The main image is unclear or low quality — please replace it.',
  'Please verify the figures and dates mentioned in the story.',
  'The headline is too long for mobile — please shorten it.',
];

if (session) {
  render();
  onExternalChange([KEYS.articles], render);
}

function render() {
  const root = document.getElementById('review-root');
  root.removeAttribute('aria-busy');
  const a = id ? getById(id) : null;

  if (!a || a.status === STATUS.draft) {
    root.innerHTML = `<div class="panel-card">${emptyState({
      title: 'Article not found',
      text: 'It may have been withdrawn or the link is incorrect.',
      iconSvg: icon.file('size-6'),
      action: `<a href="${B}editor/dashboard.html" class="btn btn-dark">${icon.arrowLeft('size-4')} Back to queue</a>`,
    })}</div>`;
    return;
  }

  document.title = `Review: ${a.title} — Editor Desk`;
  const top = getTopStory();
  const isTop = a.status === STATUS.published && top?.id === a.id && a.isTopStory;

  root.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-3">
      <a href="${B}editor/dashboard.html" class="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted hover:text-ink">${icon.arrowLeft('size-4')} Back to Approval Queue</a>
      <div class="flex items-center gap-2">${statusBadge(a.status)}${isTop ? `<span class="badge bg-accent/10 text-accent before:!hidden">${icon.star('size-3')} Top Story</span>` : ''}</div>
    </div>

    ${statusNotice(a)}

    <div class="mt-5 grid gap-6 lg:grid-cols-12">
      <!-- Live preview -->
      <section class="panel-card overflow-hidden lg:col-span-8" aria-label="Article preview">
        <div class="flex items-center gap-3 border-b border-line bg-cream/60 px-4 py-2.5">
          <span class="flex gap-1.5" aria-hidden="true"><span class="size-2.5 rounded-full bg-[#e0e0dc]"></span><span class="size-2.5 rounded-full bg-[#e0e0dc]"></span><span class="size-2.5 rounded-full bg-[#e0e0dc]"></span></span>
          <p class="truncate rounded-md bg-white px-3 py-1 text-[12px] text-muted">/article.html?id=${esc(a.id)}</p>
          <span class="ml-auto shrink-0 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-muted">Live preview</span>
        </div>
        <div class="px-4 py-8 sm:px-10 sm:py-12">${articleView(a, { preview: true })}</div>
      </section>

      <!-- Side panel -->
      <aside class="lg:col-span-4">
        <div class="space-y-4 lg:sticky lg:top-24">
          <section class="panel-card p-5" aria-labelledby="actions-title">
            <h2 id="actions-title" class="text-[15px] font-semibold">Editorial decision</h2>
            ${actionsFor(a, isTop)}
          </section>

          <section class="panel-card p-5" aria-labelledby="details-title">
            <h2 id="details-title" class="text-[15px] font-semibold">Details</h2>
            <div class="mt-4 flex items-center gap-3">
              ${avatar(a.author, 'size-10 text-[13px]')}
              <div class="min-w-0 leading-tight"><p class="font-semibold">${esc(a.author)}</p><p class="truncate text-[12.5px] text-muted">${esc(a.authorEmail)}</p></div>
            </div>
            <dl class="mt-4 divide-y divide-line text-[13px]">
              ${row('Category', esc(a.category))}
              ${row('Location', a.location ? `<span${/[ऀ-ॿ]/.test(a.location) ? ' lang="hi"' : ''}>${esc(a.location)}</span>` : '—')}
              ${row('Submitted', esc(formatDateTime(a.submittedAt)))}
              ${a.publishedAt ? row('Published', esc(formatDateTime(a.publishedAt))) : ''}
              ${a.reviewedBy ? row('Last decision', `${esc(a.reviewedBy)}<br><span class="text-muted">${esc(formatDateTime(a.reviewedAt))}</span>`) : ''}
              ${row('Length', `${wordCount(a.body)} words · ${readingTime(a.body)} min read`)}
            </dl>
          </section>
        </div>
      </aside>
    </div>`;

  wire(a, isTop);
}

function row(k, v) {
  return `<div class="flex justify-between gap-4 py-2.5"><dt class="text-muted">${k}</dt><dd class="text-right font-medium">${v}</dd></div>`;
}

function statusNotice(a) {
  if (a.status === STATUS.rejected) {
    return `<div class="mt-4 rounded-2xl border border-crimson/25 bg-white p-4 text-[14px]">
      <p class="font-semibold text-crimson">Returned to the reporter</p>
      <p class="mt-1 text-ink">“${esc(a.rejectionNote)}”</p>
      <p class="mt-1 text-[12.5px] text-muted">Waiting for ${esc(a.author)} to edit and resubmit.</p></div>`;
  }
  if (a.status === STATUS.pending && a.previousRejectionNote) {
    return `<div class="mt-4 rounded-2xl border border-[#f3d79b] bg-[#fff8e8] p-4 text-[14px] text-[#7a5200]">
      <p class="font-semibold">Resubmitted after changes</p>
      <p class="mt-1">Your earlier note: “${esc(a.previousRejectionNote)}”</p></div>`;
  }
  return '';
}

function actionsFor(a, isTop) {
  if (a.status === STATUS.pending) {
    return `
      <p class="mt-1 text-[13px] leading-relaxed text-muted">Approving publishes the story on the website immediately.</p>
      <fieldset class="mt-4 space-y-2.5">
        <legend class="sr-only">Homepage placement</legend>
        ${toggle('opt-top', 'Make this the homepage Top Story', 'Replaces the current Top Story.')}
        ${toggle('opt-featured', 'Feature beside the Top Story', 'Shows in the three highlighted cards.')}
      </fieldset>
      <div class="mt-5 grid gap-2">
        <button type="button" id="approve" class="btn btn-primary !py-3">${icon.check('size-4')} Approve &amp; Publish</button>
        <button type="button" id="reject" class="btn btn-danger !py-3">${icon.x('size-4')} Reject with note</button>
      </div>`;
  }
  if (a.status === STATUS.published) {
    return `
      <p class="mt-1 text-[13px] leading-relaxed text-muted">This story is live. Control where it appears on the homepage.</p>
      <div class="mt-4 grid gap-2">
        <a href="${articleUrl(a.id)}" target="_blank" rel="noopener" class="btn btn-dark !py-3">${icon.external('size-4')} View live article</a>
        <button type="button" id="toggle-top" class="btn ${isTop ? 'btn-outline' : 'btn-primary'} !py-3">${icon.star('size-4')} ${isTop ? 'Remove from Top Story' : 'Set as Top Story'}</button>
        <button type="button" id="toggle-featured" class="btn btn-outline !py-3">${a.isFeatured ? 'Remove from Featured' : 'Feature beside Top Story'}</button>
        <button type="button" id="unpublish" class="btn btn-danger !py-3">Unpublish</button>
      </div>`;
  }
  if (a.status === STATUS.unpublished) {
    return `
      <p class="mt-1 text-[13px] leading-relaxed text-muted">This story has been taken off the website. The reporter can edit and resubmit it, or you can republish it as is.</p>
      <div class="mt-4 grid gap-2"><button type="button" id="republish" class="btn btn-primary !py-3">Republish</button></div>`;
  }
  return `<p class="mt-1 text-[13px] leading-relaxed text-muted">No action needed until the reporter resubmits.</p>
    <a href="${B}editor/dashboard.html" class="btn btn-outline mt-4 w-full">Back to queue</a>`;
}

function toggle(idAttr, label, hint) {
  return `<label for="${idAttr}" class="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3 transition-colors hover:bg-cream/60 has-[:checked]:border-accent has-[:checked]:bg-accent/5">
    <input id="${idAttr}" type="checkbox" class="mt-0.5 size-4 shrink-0 accent-[#F04418]">
    <span class="leading-tight"><span class="block text-[13.5px] font-semibold">${label}</span><span class="text-[12px] text-muted">${hint}</span></span>
  </label>`;
}

function wire(a, isTop) {
  const $ = (s) => document.getElementById(s);

  $('approve')?.addEventListener('click', () => {
    const topStory = $('opt-top').checked;
    const featured = $('opt-featured').checked;
    try {
      approveArticle(a.id, session, { topStory, featured });
      toast(topStory ? 'Published as the new Top Story — it is now live on the homepage.' : 'Approved and published — it is now live on the homepage.', 'success', {
        action: { label: 'View on homepage', href: B + 'index.html' },
      });
      render();
    } catch (err) {
      toast(err.message, 'error');
    }
  });

  $('reject')?.addEventListener('click', async () => {
    const result = await openModal({
      title: 'Reject and return to reporter',
      confirmLabel: 'Reject article',
      tone: 'danger',
      body: `
        <p>Tell ${esc(a.author)} what needs to change. They will see this note on their dashboard.</p>
        <div class="mt-4" data-field="note">
          <label for="reject-note" class="field-label">Rejection note <span class="text-accent">*</span></label>
          <textarea id="reject-note" name="note" rows="4" maxlength="400" class="field-input resize-none" placeholder="e.g. Please add a quote from the municipal engineer and confirm the figures."></textarea>
          <p class="field-error">Please write a short reason (at least 10 characters).</p>
        </div>
        <p class="mt-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">Quick notes</p>
        <div class="mt-2 flex flex-wrap gap-1.5">
          ${REJECT_PRESETS.map((t, i) => `<button type="button" data-preset="${i}" class="rounded-full border border-line px-3 py-1.5 text-left text-[12px] hover:border-ink">${esc(t)}</button>`).join('')}
        </div>`,
      onOpen(form) {
        const ta = form.querySelector('#reject-note');
        form.querySelectorAll('[data-preset]').forEach((b) =>
          b.addEventListener('click', () => {
            const t = REJECT_PRESETS[Number(b.dataset.preset)];
            ta.value = ta.value.trim() ? `${ta.value.trim()} ${t}` : t;
            ta.focus();
            form.querySelector('[data-field=note]').classList.remove('has-error');
          }),
        );
        ta.addEventListener('input', () => form.querySelector('[data-field=note]').classList.remove('has-error'));
      },
      validate(values, form) {
        if ((values.note || '').trim().length < 10) {
          form.querySelector('[data-field=note]').classList.add('has-error');
          form.querySelector('#reject-note').focus();
          return 'invalid';
        }
        return null;
      },
    });
    if (!result) return;
    try {
      rejectArticle(a.id, session, result.note);
      setFlash(`Article returned to ${a.author} with your note.`, 'success');
      window.location.href = B + 'editor/dashboard.html';
    } catch (err) {
      toast(err.message, 'error');
    }
  });

  $('toggle-top')?.addEventListener('click', () => {
    try {
      setTopStory(a.id, !isTop);
      toast(isTop ? 'Removed from Top Story. The newest story will lead the homepage.' : 'This is now the homepage Top Story.', 'success', {
        action: { label: 'View homepage', href: B + 'index.html' },
      });
      render();
    } catch (err) {
      toast(err.message, 'error');
    }
  });

  $('toggle-featured')?.addEventListener('click', () => {
    setFeatured(a.id, !a.isFeatured);
    toast(a.isFeatured ? 'Removed from Featured.' : 'Featured beside the Top Story.');
    render();
  });

  $('unpublish')?.addEventListener('click', async () => {
    const ok = await openModal({
      title: 'Unpublish this article?',
      body: 'It will be removed from the public website straight away. The reporter will see it as Unpublished and can resubmit it.',
      confirmLabel: 'Unpublish',
      tone: 'danger',
    });
    if (!ok) return;
    unpublishArticle(a.id, session);
    toast('Article unpublished and removed from the website.');
    render();
  });

  $('republish')?.addEventListener('click', () => {
    republishArticle(a.id, session);
    toast('Article republished.', 'success', { action: { label: 'View live', href: articleUrl(a.id) } });
    render();
  });
}
