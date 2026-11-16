import{$ as e,F as t,G as n,L as r,M as i,P as a,Q as o,R as s,W as c,Y as l,Z as u,_ as d,_t as f,bt as p,j as m,nt as h,s as g,u as _,v,yt as y}from"./components-WsKqgoct.js";import{t as b}from"./app-DmycUdSl.js";var x=b(`reporter`,`dashboard`),S=[{id:`all`,label:`All`},{id:l.draft,label:`Drafts`},{id:l.pending,label:`Pending`},{id:l.published,label:`Published`},{id:l.rejected,label:`Rejected`},{id:l.unpublished,label:`Unpublished`}],C=`all`;x&&(w(),y([f.articles],w));function w(){let e=document.getElementById(`reporter-root`),t=h(x.email),n=o(t),i=t.filter(e=>e.status===l.rejected),s=C===`all`?t:t.filter(e=>e.status===C),c=x.name.split(` `)[0];e.removeAttribute(`aria-busy`),e.innerHTML=`
    <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-[13px] font-medium text-muted">${m(a())}, ${m(c)}</p>
        <h1 class="mt-1 text-[28px] font-semibold tracking-tight sm:text-[32px]">Your stories at a glance</h1>
      </div>
      <a href="${p}reporter/create-article.html" class="btn btn-primary !py-3 !px-5 text-[14.5px]">${_.plus(`size-4`)} Create New Article</a>
    </div>

    <div class="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      ${d({label:`Total Articles`,value:n.total,iconSvg:_.file(`size-4`),hint:`${n[l.draft]} draft${n[l.draft]===1?``:`s`}`})}
      ${d({label:`Published`,value:n[l.published],tone:`green`,iconSvg:_.check(`size-4`),hint:`Live on the website`})}
      ${d({label:`Pending Approval`,value:n[l.pending],tone:`amber`,iconSvg:_.clock(`size-4`),hint:`With the Head Editor`})}
      ${d({label:`Rejected`,value:n[l.rejected],tone:`red`,iconSvg:_.x(`size-4`),hint:n[l.rejected]?`Needs your changes`:`Nothing to fix`})}
    </div>

    ${i.length?`
    <section class="mt-6 rounded-2xl border border-crimson/20 bg-white p-4 sm:p-5" aria-labelledby="needs-changes">
      <h2 id="needs-changes" class="flex items-center gap-2 text-[14px] font-semibold text-crimson">${_.alert(`size-4`)} Returned by the editor — needs your changes</h2>
      <ul class="mt-3 divide-y divide-line">
        ${i.map(e=>`
          <li class="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="min-w-0">
              <p class="truncate text-[14.5px] font-semibold"${r(e.title)}>${m(e.title)}</p>
              <p class="mt-1 text-[13px] text-[#6b2a2f]"><span class="font-semibold">Editor’s note:</span> ${m(e.rejectionNote)}</p>
            </div>
            <a href="${p}reporter/create-article.html?id=${encodeURIComponent(e.id)}" class="btn btn-dark shrink-0 !py-2 text-[13px]">${_.edit(`size-4`)} Edit &amp; resubmit</a>
          </li>`).join(``)}
      </ul>
    </section>`:``}

    <section class="panel-card mt-6 overflow-hidden" aria-labelledby="my-articles">
      <div class="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <h2 id="my-articles" class="text-[17px] font-semibold">My Articles</h2>
        <div class="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1" role="tablist" aria-label="Filter by status">
          ${S.map(e=>{let t=e.id===`all`?n.total:n[e.id],r=e.id===C;return`<button type="button" role="tab" aria-selected="${r}" data-filter="${m(e.id)}" class="shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${r?`bg-ink text-white`:`text-muted hover:bg-cream hover:text-ink`}">${e.label} <span class="${r?`text-white/60`:`text-[#aaa]`}">${t}</span></button>`}).join(``)}
        </div>
      </div>
      ${s.length?E(s):g({title:C===`all`?`No articles yet`:`No ${S.find(e=>e.id===C).label.toLowerCase()} articles`,text:C===`all`?`Your first story is one click away.`:`Articles with this status will appear here.`,action:C===`all`?`<a href="${p}reporter/create-article.html" class="btn btn-primary">${_.plus(`size-4`)} Create New Article</a>`:``})}
    </section>
  `,e.querySelectorAll(`[data-filter]`).forEach(e=>e.addEventListener(`click`,()=>{C=e.dataset.filter,w()})),e.querySelectorAll(`[data-delete]`).forEach(e=>e.addEventListener(`click`,()=>O(e.dataset.delete)))}function T(e){let t=`<a href="${p}reporter/create-article.html?id=${encodeURIComponent(e.id)}" class="btn btn-outline !px-3 !py-1.5 text-[13px]">${_.edit(`size-3.5`)} ${e.status===l.rejected?`Edit &amp; resubmit`:`Edit`}</a>`,n=t=>`<a href="${u(e.id)}" class="btn btn-outline !px-3 !py-1.5 text-[13px]" ${e.status===l.published?`target="_blank" rel="noopener"`:``}>${e.status===l.published?_.external(`size-3.5`):_.eye(`size-3.5`)} ${t}</a>`;switch(e.status){case l.draft:return`${t}<button type="button" data-delete="${m(e.id)}" class="btn btn-ghost !px-2.5 !py-1.5 text-muted hover:!text-crimson" aria-label="Delete draft">${_.trash(`size-4`)}</button>`;case l.pending:return n(`Preview`);case l.published:return n(`View live`);case l.rejected:case l.unpublished:return t;default:return``}}function E(e){return`
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
        ${e.map(e=>`
        <tr class="align-middle transition-colors hover:bg-cream/40">
          <td class="px-5 py-3.5">
            <div class="flex items-center gap-3.5">
              ${D(e,`size-12`)}
              <div class="min-w-0 max-w-[440px]">
                <p class="line-clamp-1 font-semibold"${r(e.title)}>${m(e.title||`Untitled draft`)}</p>
                <p class="mt-0.5 text-[12.5px] text-muted">Updated ${m(c(e.updatedAt))}${e.status===l.rejected?` · <span class="text-crimson">see editor’s note</span>`:``}</p>
              </div>
            </div>
          </td>
          <td class="whitespace-nowrap px-3 py-3.5 text-[#444]">${m(e.category||`—`)}</td>
          <td class="whitespace-nowrap px-3 py-3.5 text-[#444]">${m(i(e.createdAt))}</td>
          <td class="px-3 py-3.5">${v(e.status)}</td>
          <td class="px-5 py-3.5"><div class="flex justify-end gap-1.5">${T(e)}</div></td>
        </tr>`).join(``)}
      </tbody>
    </table>
  </div>

  <!-- Mobile cards -->
  <ul class="divide-y divide-line md:hidden">
    ${e.map(e=>`
    <li class="p-4">
      <div class="flex gap-3">
        ${D(e,`size-16`)}
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">${v(e.status)}<span class="text-[12px] text-muted">${m(i(e.createdAt))}</span></div>
          <p class="mt-2 line-clamp-2 text-[14.5px] font-semibold leading-snug"${r(e.title)}>${m(e.title||`Untitled draft`)}</p>
          <p class="mt-1 text-[12.5px] text-muted">${m(e.category||`No category`)}</p>
        </div>
      </div>
      <div class="mt-3 flex flex-wrap gap-1.5">${T(e)}</div>
    </li>`).join(``)}
  </ul>`}function D(e,n){return e.image?`<img src="${t(e.image,160)}" alt="" loading="lazy" class="${n} shrink-0 rounded-xl object-cover">`:`<span class="${n} grid shrink-0 place-items-center rounded-xl bg-cream text-muted">${_.image(`size-5`)}</span>`}async function O(t){if(await s({title:`Delete this draft?`,body:`The draft will be permanently removed. This cannot be undone.`,confirmLabel:`Delete draft`,tone:`danger`}))try{e(t,x),n(`Draft deleted.`),w()}catch(e){n(e.message,`error`)}}