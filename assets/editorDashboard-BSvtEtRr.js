import{F as e,G as t,L as n,M as r,O as i,P as a,Q as o,R as s,W as c,Y as l,Z as u,_ as d,_t as f,at as p,bt as m,ct as h,dt as g,it as _,j as v,ot as y,s as b,u as x,v as S,yt as C}from"./components-WsKqgoct.js";import{t as w}from"./app-DmycUdSl.js";var T=w(`editor`,location.hash===`#all`?`all`:`queue`),E=[{id:`all`,label:`All`},{id:l.pending,label:`Pending`},{id:l.published,label:`Published`},{id:l.rejected,label:`Rejected`},{id:l.unpublished,label:`Unpublished`}],D=`all`;T&&(k(),C([f.articles],k),location.hash&&requestAnimationFrame(()=>document.querySelector(location.hash)?.scrollIntoView()));function O(e){return`${m}editor/review-article.html?id=${encodeURIComponent(e)}`}function k(){let t=document.getElementById(`editor-root`),r=_(),i=y(),s=o(r),f=h(),g=f?p(f.id,3):[],S=D===`all`?r:r.filter(e=>e.status===D);t.removeAttribute(`aria-busy`),t.innerHTML=`
    <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-[13px] font-medium text-muted">${v(a())}, ${v(T.name.split(` `)[0])}</p>
        <h1 class="mt-1 text-[28px] font-semibold tracking-tight sm:text-[32px]">
          ${i.length?`${i.length} ${i.length===1?`story is`:`stories are`} waiting for review`:`The queue is clear`}
        </h1>
      </div>
      <a href="${m}index.html" target="_blank" rel="noopener" class="btn btn-outline">${x.external(`size-4`)} Open public homepage</a>
    </div>

    <div class="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      ${d({label:`Total Articles`,value:s.total,iconSvg:x.file(`size-4`),hint:`Submitted to the desk`})}
      ${d({label:`Pending Approval`,value:s[l.pending],tone:`amber`,iconSvg:x.clock(`size-4`),hint:i[0]?`Latest ${c(i[0].submittedAt).toLowerCase()}`:`Nothing waiting`})}
      ${d({label:`Published`,value:s[l.published],tone:`green`,iconSvg:x.check(`size-4`),hint:`Live on the website`})}
      ${d({label:`Rejected`,value:s[l.rejected],tone:`red`,iconSvg:x.x(`size-4`),hint:`Returned to reporters`})}
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-12">
      <!-- Approval queue -->
      <section id="queue" class="panel-card scroll-mt-24 overflow-hidden lg:col-span-8" aria-labelledby="queue-title">
        <div class="flex items-center justify-between border-b border-line p-4 sm:p-5">
          <h2 id="queue-title" class="flex items-center gap-2.5 text-[17px] font-semibold">Approval Queue
            <span class="rounded-full ${i.length?`bg-accent text-white`:`bg-cream text-muted`} px-2 py-0.5 text-[12px] font-semibold">${i.length}</span>
          </h2>
          <p class="text-[12.5px] text-muted">Newest first</p>
        </div>
        ${i.length?`<ul class="divide-y divide-line">${i.map(A).join(``)}</ul>`:b({title:`All caught up`,text:`There are no articles waiting for approval. New submissions from reporters will appear here automatically.`,iconSvg:x.check(`size-6`)})}
      </section>

      <!-- Homepage control -->
      <aside class="space-y-6 lg:col-span-4">
        <section class="panel-card overflow-hidden" aria-labelledby="top-title">
          <div class="flex items-center justify-between p-4 pb-3 sm:px-5">
            <h2 id="top-title" class="flex items-center gap-2 text-[15px] font-semibold">${x.star(`size-4 text-accent`)} Current Top Story</h2>
            ${f?`<a href="${O(f.id)}" class="text-[12.5px] font-semibold text-accent hover:underline">Manage</a>`:``}
          </div>
          ${f?`
          <a href="${u(f.id)}" target="_blank" rel="noopener" class="group block px-4 pb-4 sm:px-5 sm:pb-5">
            <img src="${e(f.image,640)}" alt="" class="aspect-[16/9] w-full rounded-xl object-cover">
            <p class="mt-3 line-clamp-2 text-[14.5px] font-semibold leading-snug group-hover:underline"${n(f.title)}>${v(f.title)}</p>
            <p class="mt-1 text-[12px] text-muted">${v(f.category)} · ${f.isTopStory?`Selected by editor`:`Automatic (newest story)`}</p>
          </a>`:`<p class="px-5 pb-5 text-[13px] text-muted">No published stories yet.</p>`}
          ${g.length?`
          <div class="border-t border-line px-4 py-3 sm:px-5">
            <p class="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-muted">Featured beside it</p>
            <ul class="mt-2 space-y-2">
              ${g.map(e=>`<li><a href="${O(e.id)}" class="line-clamp-1 text-[13px] hover:text-accent"${n(e.title)}>${e.isFeatured?`★`:`·`} ${v(e.title)}</a></li>`).join(``)}
            </ul>
          </div>`:``}
        </section>

        <section class="panel-card p-4 sm:p-5" aria-labelledby="demo-title">
          <h2 id="demo-title" class="text-[15px] font-semibold">Demo workflow</h2>
          <ol class="mt-3 space-y-2 text-[13px] leading-relaxed text-[#555]">
            <li><span class="font-semibold text-ink">1.</span> Reporter submits a story.</li>
            <li><span class="font-semibold text-ink">2.</span> Review it here — approve or reject with a note.</li>
            <li><span class="font-semibold text-ink">3.</span> Approved stories go live instantly on the homepage.</li>
          </ol>
          <button type="button" id="reset-demo" class="btn btn-ghost mt-3 -ml-2 !px-2 !py-1.5 text-[12.5px] text-muted">${x.refresh(`size-3.5`)} Reset demo data</button>
        </section>
      </aside>
    </div>

    <!-- All articles -->
    <section id="all" class="panel-card mt-6 scroll-mt-24 overflow-hidden" aria-labelledby="all-title">
      <div class="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <h2 id="all-title" class="text-[17px] font-semibold">All Articles</h2>
        <div class="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1" role="tablist" aria-label="Filter by status">
          ${E.map(e=>{let t=e.id===`all`?s.total:s[e.id],n=e.id===D;return`<button type="button" role="tab" aria-selected="${n}" data-filter="${v(e.id)}" class="shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${n?`bg-ink text-white`:`text-muted hover:bg-cream hover:text-ink`}">${e.label} <span class="${n?`text-white/60`:`text-[#aaa]`}">${t}</span></button>`}).join(``)}
        </div>
      </div>
      ${S.length?j(S,f):b({title:`Nothing here`,text:`No articles match this filter.`})}
    </section>
  `,t.querySelectorAll(`[data-filter]`).forEach(e=>e.addEventListener(`click`,()=>{D=e.dataset.filter,k(),document.getElementById(`all`).scrollIntoView({block:`nearest`})})),t.querySelector(`#reset-demo`).addEventListener(`click`,M)}function A(t){return`
  <li class="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
    <a href="${O(t.id)}" class="flex min-w-0 flex-1 gap-4">
      <img src="${e(t.image,300)}" alt="" loading="lazy" class="aspect-[4/3] w-24 shrink-0 rounded-xl object-cover sm:w-32">
      <div class="min-w-0">
        <p class="kicker">${v(t.category)}</p>
        <h3 class="mt-1 line-clamp-2 text-[15.5px] font-semibold leading-snug"${n(t.title)}>${v(t.title)}</h3>
        <div class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-muted">
          <span class="flex items-center gap-1.5">${i(t.author,`size-5 text-[8px]`)} <span class="font-medium text-ink">${v(t.author)}</span></span>
          <span aria-hidden="true">·</span>
          <span title="${v(r(t.submittedAt))}">Submitted ${v(c(t.submittedAt).toLowerCase())}</span>
          ${t.previousRejectionNote?`<span aria-hidden="true">·</span><span class="font-medium text-[#9a6200]">Resubmitted</span>`:``}
        </div>
      </div>
    </a>
    <a href="${O(t.id)}" class="btn btn-primary shrink-0 sm:!px-5">Review ${x.arrowRight(`size-4`)}</a>
  </li>`}function j(t,i){let a=e=>`<a href="${O(e.id)}" class="btn btn-outline !px-3 !py-1.5 text-[13px]">${e.status===l.pending?`Review`:`Open`}</a>`,o=e=>`${i&&e.id===i.id&&e.status===l.published?`<span class="badge bg-accent/10 text-accent !pl-2 before:!hidden">${x.star(`size-3`)} Top Story</span>`:``}${e.isFeatured&&e.status===l.published?`<span class="badge bg-cream text-ink before:!hidden">Featured</span>`:``}`;return`
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
        ${t.map(t=>`
        <tr class="transition-colors hover:bg-cream/40">
          <td class="px-5 py-3">
            <div class="flex items-center gap-3">
              <img src="${e(t.image,140)}" alt="" loading="lazy" class="size-11 shrink-0 rounded-lg object-cover">
              <div class="min-w-0 max-w-[380px]">
                <p class="line-clamp-1 font-semibold"${n(t.title)}>${v(t.title)}</p>
                <div class="mt-1 flex gap-1.5">${o(t)}</div>
              </div>
            </div>
          </td>
          <td class="whitespace-nowrap px-3 py-3 text-[#444]">${v(t.author)}</td>
          <td class="whitespace-nowrap px-3 py-3 text-[#444]">${v(t.category)}</td>
          <td class="whitespace-nowrap px-3 py-3 text-[#444]">${v(r(t.updatedAt))}</td>
          <td class="px-3 py-3">${S(t.status)}</td>
          <td class="px-5 py-3 text-right">${a(t)}</td>
        </tr>`).join(``)}
      </tbody>
    </table>
  </div>
  <ul class="divide-y divide-line md:hidden">
    ${t.map(t=>`
    <li>
      <a href="${O(t.id)}" class="flex gap-3 p-4">
        <img src="${e(t.image,140)}" alt="" loading="lazy" class="size-14 shrink-0 rounded-xl object-cover">
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">${S(t.status)}<span class="text-[12px] text-muted">${v(r(t.updatedAt))}</span></div>
          <p class="mt-1.5 line-clamp-2 text-[14px] font-semibold leading-snug"${n(t.title)}>${v(t.title)}</p>
          <p class="mt-1 text-[12px] text-muted">${v(t.author)} · ${v(t.category)}</p>
          <div class="mt-1.5 flex gap-1.5">${o(t)}</div>
        </div>
      </a>
    </li>`).join(``)}
  </ul>`}async function M(){await s({title:`Reset demo data?`,body:`This restores the original sample articles and removes every article created or changed during the demo, in this browser only.`,confirmLabel:`Reset data`,tone:`danger`})&&(g(),D=`all`,k(),t(`Demo data has been reset.`))}