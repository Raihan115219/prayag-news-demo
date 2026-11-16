import{B as e,G as t,H as n,K as r,N as i,O as a,R as o,X as s,Y as c,Z as l,_t as u,bt as d,ct as f,gt as p,ht as m,j as h,lt as g,mt as _,n as v,rt as y,s as b,u as x,ut as S,v as C,yt as w,z as T}from"./components-WsKqgoct.js";import{t as E}from"./app-DmycUdSl.js";var D=E(`editor`,`queue`),O=T(`id`),k=[`Please add a quote from an official or named source.`,`The main image is unclear or low quality — please replace it.`,`Please verify the figures and dates mentioned in the story.`,`The headline is too long for mobile — please shorten it.`];D&&(A(),w([u.articles],A));function A(){let t=document.getElementById(`review-root`);t.removeAttribute(`aria-busy`);let n=O?y(O):null;if(!n||n.status===c.draft){t.innerHTML=`<div class="panel-card">${b({title:`Article not found`,text:`It may have been withdrawn or the link is incorrect.`,iconSvg:x.file(`size-6`),action:`<a href="${d}editor/dashboard.html" class="btn btn-dark">${x.arrowLeft(`size-4`)} Back to queue</a>`})}</div>`;return}document.title=`Review: ${n.title} — Editor Desk`;let o=f(),s=n.status===c.published&&o?.id===n.id&&n.isTopStory;t.innerHTML=`
    <div class="flex flex-wrap items-center justify-between gap-3">
      <a href="${d}editor/dashboard.html" class="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted hover:text-ink">${x.arrowLeft(`size-4`)} Back to Approval Queue</a>
      <div class="flex items-center gap-2">${C(n.status)}${s?`<span class="badge bg-accent/10 text-accent before:!hidden">${x.star(`size-3`)} Top Story</span>`:``}</div>
    </div>

    ${M(n)}

    <div class="mt-5 grid gap-6 lg:grid-cols-12">
      <!-- Live preview -->
      <section class="panel-card overflow-hidden lg:col-span-8" aria-label="Article preview">
        <div class="flex items-center gap-3 border-b border-line bg-cream/60 px-4 py-2.5">
          <span class="flex gap-1.5" aria-hidden="true"><span class="size-2.5 rounded-full bg-[#e0e0dc]"></span><span class="size-2.5 rounded-full bg-[#e0e0dc]"></span><span class="size-2.5 rounded-full bg-[#e0e0dc]"></span></span>
          <p class="truncate rounded-md bg-white px-3 py-1 text-[12px] text-muted">/article.html?id=${h(n.id)}</p>
          <span class="ml-auto shrink-0 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-muted">Live preview</span>
        </div>
        <div class="px-4 py-8 sm:px-10 sm:py-12">${v(n,{preview:!0})}</div>
      </section>

      <!-- Side panel -->
      <aside class="lg:col-span-4">
        <div class="space-y-4 lg:sticky lg:top-24">
          <section class="panel-card p-5" aria-labelledby="actions-title">
            <h2 id="actions-title" class="text-[15px] font-semibold">Editorial decision</h2>
            ${N(n,s)}
          </section>

          <section class="panel-card p-5" aria-labelledby="details-title">
            <h2 id="details-title" class="text-[15px] font-semibold">Details</h2>
            <div class="mt-4 flex items-center gap-3">
              ${a(n.author,`size-10 text-[13px]`)}
              <div class="min-w-0 leading-tight"><p class="font-semibold">${h(n.author)}</p><p class="truncate text-[12.5px] text-muted">${h(n.authorEmail)}</p></div>
            </div>
            <dl class="mt-4 divide-y divide-line text-[13px]">
              ${j(`Category`,h(n.category))}
              ${j(`Location`,n.location?`<span${/[ऀ-ॿ]/.test(n.location)?` lang="hi"`:``}>${h(n.location)}</span>`:`—`)}
              ${j(`Submitted`,h(i(n.submittedAt)))}
              ${n.publishedAt?j(`Published`,h(i(n.publishedAt))):``}
              ${n.reviewedBy?j(`Last decision`,`${h(n.reviewedBy)}<br><span class="text-muted">${h(i(n.reviewedAt))}</span>`):``}
              ${j(`Length`,`${r(n.body)} words · ${e(n.body)} min read`)}
            </dl>
          </section>
        </div>
      </aside>
    </div>`,F(n,s)}function j(e,t){return`<div class="flex justify-between gap-4 py-2.5"><dt class="text-muted">${e}</dt><dd class="text-right font-medium">${t}</dd></div>`}function M(e){return e.status===c.rejected?`<div class="mt-4 rounded-2xl border border-crimson/25 bg-white p-4 text-[14px]">
      <p class="font-semibold text-crimson">Returned to the reporter</p>
      <p class="mt-1 text-ink">“${h(e.rejectionNote)}”</p>
      <p class="mt-1 text-[12.5px] text-muted">Waiting for ${h(e.author)} to edit and resubmit.</p></div>`:e.status===c.pending&&e.previousRejectionNote?`<div class="mt-4 rounded-2xl border border-[#f3d79b] bg-[#fff8e8] p-4 text-[14px] text-[#7a5200]">
      <p class="font-semibold">Resubmitted after changes</p>
      <p class="mt-1">Your earlier note: “${h(e.previousRejectionNote)}”</p></div>`:``}function N(e,t){return e.status===c.pending?`
      <p class="mt-1 text-[13px] leading-relaxed text-muted">Approving publishes the story on the website immediately.</p>
      <fieldset class="mt-4 space-y-2.5">
        <legend class="sr-only">Homepage placement</legend>
        ${P(`opt-top`,`Make this the homepage Top Story`,`Replaces the current Top Story.`)}
        ${P(`opt-featured`,`Feature beside the Top Story`,`Shows in the three highlighted cards.`)}
      </fieldset>
      <div class="mt-5 grid gap-2">
        <button type="button" id="approve" class="btn btn-primary !py-3">${x.check(`size-4`)} Approve &amp; Publish</button>
        <button type="button" id="reject" class="btn btn-danger !py-3">${x.x(`size-4`)} Reject with note</button>
      </div>`:e.status===c.published?`
      <p class="mt-1 text-[13px] leading-relaxed text-muted">This story is live. Control where it appears on the homepage.</p>
      <div class="mt-4 grid gap-2">
        <a href="${l(e.id)}" target="_blank" rel="noopener" class="btn btn-dark !py-3">${x.external(`size-4`)} View live article</a>
        <button type="button" id="toggle-top" class="btn ${t?`btn-outline`:`btn-primary`} !py-3">${x.star(`size-4`)} ${t?`Remove from Top Story`:`Set as Top Story`}</button>
        <button type="button" id="toggle-featured" class="btn btn-outline !py-3">${e.isFeatured?`Remove from Featured`:`Feature beside Top Story`}</button>
        <button type="button" id="unpublish" class="btn btn-danger !py-3">Unpublish</button>
      </div>`:e.status===c.unpublished?`
      <p class="mt-1 text-[13px] leading-relaxed text-muted">This story has been taken off the website. The reporter can edit and resubmit it, or you can republish it as is.</p>
      <div class="mt-4 grid gap-2"><button type="button" id="republish" class="btn btn-primary !py-3">Republish</button></div>`:`<p class="mt-1 text-[13px] leading-relaxed text-muted">No action needed until the reporter resubmits.</p>
    <a href="${d}editor/dashboard.html" class="btn btn-outline mt-4 w-full">Back to queue</a>`}function P(e,t,n){return`<label for="${e}" class="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3 transition-colors hover:bg-cream/60 has-[:checked]:border-accent has-[:checked]:bg-accent/5">
    <input id="${e}" type="checkbox" class="mt-0.5 size-4 shrink-0 accent-[#F04418]">
    <span class="leading-tight"><span class="block text-[13.5px] font-semibold">${t}</span><span class="text-[12px] text-muted">${n}</span></span>
  </label>`}function F(e,r){let i=e=>document.getElementById(e);i(`approve`)?.addEventListener(`click`,()=>{let n=i(`opt-top`).checked,r=i(`opt-featured`).checked;try{s(e.id,D,{topStory:n,featured:r}),t(n?`Published as the new Top Story — it is now live on the homepage.`:`Approved and published — it is now live on the homepage.`,`success`,{action:{label:`View on homepage`,href:d+`index.html`}}),A()}catch(e){t(e.message,`error`)}}),i(`reject`)?.addEventListener(`click`,async()=>{let r=await o({title:`Reject and return to reporter`,confirmLabel:`Reject article`,tone:`danger`,body:`
        <p>Tell ${h(e.author)} what needs to change. They will see this note on their dashboard.</p>
        <div class="mt-4" data-field="note">
          <label for="reject-note" class="field-label">Rejection note <span class="text-accent">*</span></label>
          <textarea id="reject-note" name="note" rows="4" maxlength="400" class="field-input resize-none" placeholder="e.g. Please add a quote from the municipal engineer and confirm the figures."></textarea>
          <p class="field-error">Please write a short reason (at least 10 characters).</p>
        </div>
        <p class="mt-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">Quick notes</p>
        <div class="mt-2 flex flex-wrap gap-1.5">
          ${k.map((e,t)=>`<button type="button" data-preset="${t}" class="rounded-full border border-line px-3 py-1.5 text-left text-[12px] hover:border-ink">${h(e)}</button>`).join(``)}
        </div>`,onOpen(e){let t=e.querySelector(`#reject-note`);e.querySelectorAll(`[data-preset]`).forEach(n=>n.addEventListener(`click`,()=>{let r=k[Number(n.dataset.preset)];t.value=t.value.trim()?`${t.value.trim()} ${r}`:r,t.focus(),e.querySelector(`[data-field=note]`).classList.remove(`has-error`)})),t.addEventListener(`input`,()=>e.querySelector(`[data-field=note]`).classList.remove(`has-error`))},validate(e,t){return(e.note||``).trim().length<10?(t.querySelector(`[data-field=note]`).classList.add(`has-error`),t.querySelector(`#reject-note`).focus(),`invalid`):null}});if(r)try{g(e.id,D,r.note),n(`Article returned to ${e.author} with your note.`,`success`),window.location.href=d+`editor/dashboard.html`}catch(e){t(e.message,`error`)}}),i(`toggle-top`)?.addEventListener(`click`,()=>{try{m(e.id,!r),t(r?`Removed from Top Story. The newest story will lead the homepage.`:`This is now the homepage Top Story.`,`success`,{action:{label:`View homepage`,href:d+`index.html`}}),A()}catch(e){t(e.message,`error`)}}),i(`toggle-featured`)?.addEventListener(`click`,()=>{_(e.id,!e.isFeatured),t(e.isFeatured?`Removed from Featured.`:`Featured beside the Top Story.`),A()}),i(`unpublish`)?.addEventListener(`click`,async()=>{await o({title:`Unpublish this article?`,body:`It will be removed from the public website straight away. The reporter will see it as Unpublished and can resubmit it.`,confirmLabel:`Unpublish`,tone:`danger`})&&(p(e.id,D),t(`Article unpublished and removed from the website.`),A())}),i(`republish`)?.addEventListener(`click`,()=>{S(e.id,D),t(`Article republished.`,`success`,{action:{label:`View live`,href:l(e.id)}}),A()})}