import{F as e,J as t,L as n,Z as r,_t as i,a,bt as o,c as s,i as c,j as l,pt as u,q as d,s as f,st as p,t as m,tt as h,u as g,yt as _,z as v}from"./components-WsKqgoct.js";import{n as y}from"./app-DmycUdSl.js";var b=6,x=h(v(`category`)||``),S=7;y(x&&t.includes(x.name)?x.name:``),C(),_([i.articles],C);function C(){let t=document.getElementById(`section-root`);if(!x){document.title=`Section not found — Prayag News`,t.innerHTML=`<div class="container-page py-16 sm:py-24">${f({title:`Section not found`,text:`Choose one of our sections below.`,action:`<div class="flex flex-wrap justify-center gap-2">${d.map(e=>`<a class="btn btn-outline !rounded-full !py-2" href="${u(e.name)}">${l(e.name)}</a>`).join(``)}</div>`})}</div>`;return}document.title=`${x.name} News — Prayag News`,document.querySelector(`meta[name="description"]`)?.setAttribute(`content`,x.description);let i=p({category:x.name}),[h,..._]=i,v=_.slice(0,S-1),y=_.length-v.length;t.innerHTML=`
    <section class="border-b border-line bg-cream">
      <div class="container-page py-10 sm:py-14">
        <nav aria-label="Breadcrumb" class="mb-5 flex items-center gap-2 text-[13px] text-muted">
          <a href="${o}index.html" class="hover:text-ink">Home</a><span aria-hidden="true">/</span><span class="text-ink">${l(x.name)}</span>
        </nav>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 class="headline text-[38px] font-bold sm:text-[56px]">${l(x.name)} <span class="text-[22px] font-semibold text-muted sm:text-[28px]" lang="hi">${l(x.hi)}</span></h1>
            <p class="mt-3 max-w-2xl text-[16px] leading-relaxed text-[#555]">${l(x.description)}</p>
          </div>
          <p class="shrink-0 text-[13px] font-medium text-muted">${i.length} ${i.length===1?`story`:`stories`}</p>
        </div>
      </div>
    </section>

    <div class="container-page pt-10 sm:pt-14">
      ${h?`
      <a href="${r(h.id)}" class="group grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
        <div class="relative overflow-hidden rounded-[24px] lg:col-span-7">
          <img src="${e(h.image,1100)}" alt="" class="img-zoom aspect-[16/10] w-full object-cover" fetchpriority="high">
          ${m({size:`lg`,accent:!0})}
        </div>
        <div class="lg:col-span-5">
          ${a(`Latest`)}
          <h2 class="headline mt-4 text-[26px] font-bold sm:text-[34px]"${n(h.title)}>${l(h.title)}</h2>
          <p class="mt-4 line-clamp-3 text-[16px] leading-relaxed text-muted"${n(h.subtitle)}>${l(h.subtitle)}</p>
          <div class="mt-6">${c(h)}</div>
        </div>
      </a>

      ${v.length?`
      <div class="mt-14 grid gap-5 divide-y divide-line border-t border-line pt-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:divide-y-0 lg:grid-cols-3">
        ${v.map((e,t)=>`<div class="fade-in ${t?`pt-5 sm:pt-0`:``}">${s(e)}</div>`).join(``)}
      </div>`:``}

      ${y>0?`
      <div class="mt-12 flex justify-center">
        <button type="button" id="load-more" class="btn btn-outline !rounded-full !px-6">
          Load more stories <span class="text-muted">(${y})</span>
        </button>
      </div>`:_.length?`<p class="mt-12 text-center text-[13px] text-muted">You’re all caught up.</p>`:``}
      `:f({title:`No ${x.name} stories yet`,text:`Published articles in this section will appear here.`,action:`<a href="${o}index.html" class="btn btn-dark">${g.arrowLeft(`size-4`)} Back to homepage</a>`})}
    </div>
  `,document.getElementById(`load-more`)?.addEventListener(`click`,()=>{S+=b,C()})}