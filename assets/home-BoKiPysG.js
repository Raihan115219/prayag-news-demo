import{F as e,L as t,W as n,Z as r,_t as i,a,at as o,c as s,ct as c,i as l,j as u,l as d,m as f,o as p,p as m,pt as h,s as g,st as _,t as v,tt as y,u as b,yt as x}from"./components-WsKqgoct.js";import{n as S}from"./app-DmycUdSl.js";var C=[],w=(e,t)=>_({category:e,exclude:C,limit:t});S(`Home`),T(),x([i.articles],T);function T(){let e=document.getElementById(`home`),t=c();if(!t){e.innerHTML=`<div class="container-page py-20">${g({title:`No published stories yet`,text:`Approved articles will appear here.`})}</div>`;return}let n=o(t.id,3);C=[t.id,...n.map(e=>e.id)];let r=_({exclude:C,limit:6});e.innerHTML=`
    ${E(t,n)}
    ${D(r)}
    ${O()}
    ${k()}
    ${A([`National`,`Politics`,`Crime`])}
    ${M()}
    ${A([`Entertainment`,`Business`],{two:!0})}
  `}function E(e,t){return`
  <section class="container-page pt-6 sm:pt-10" aria-labelledby="top-story-title">
    <h2 id="top-story-title" class="sr-only">Top Story</h2>
    <div class="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div class="lg:col-span-7">${d(e)}</div>
      <div class="flex flex-col justify-between gap-5 divide-y divide-line lg:col-span-5 lg:gap-0 lg:divide-y-0">
        ${t.map((e,t)=>`<div class="${t?`pt-5 lg:pt-0`:``}">${f(e)}</div>`).join(``)}
      </div>
    </div>
  </section>`}function D(e){return e.length?`
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
      ${e.map((e,t)=>`<div class="${t?`pt-5 sm:pt-0`:``}">${s(e)}</div>`).join(``)}
    </div>
  </section>`:``}function O(){let i=w(`Prayagraj`,4);if(!i.length)return``;let[o,...s]=i,c=y(`Prayagraj`);return`
  <section class="mt-20 bg-ink py-14 text-white sm:mt-24 sm:py-20" aria-labelledby="sec-prayagraj">
    <div class="container-page">
      <div id="sec-prayagraj">${m(`Prayagraj`,{href:h(`Prayagraj`),dark:!0,sub:`${c.hi} · Our city, first`})}</div>
      <a href="${r(o.id)}" class="group grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
        <div class="relative overflow-hidden rounded-[24px] lg:col-span-7">
          <img src="${e(o.image,1100)}" alt="" loading="lazy" class="img-zoom aspect-[16/10] w-full object-cover">
          ${v({size:`lg`,bg:`#171717`})}
        </div>
        <div class="lg:col-span-5">
          ${a(o.category,{solid:!0})}
          <h3 class="headline mt-4 text-[26px] font-bold sm:text-[34px]"${t(o.title)}>${u(o.title)}</h3>
          <p class="mt-4 line-clamp-3 text-[15px] leading-relaxed text-white/70"${t(o.subtitle)}>${u(o.subtitle)}</p>
          <div class="mt-6">${l(o,{light:!0})}</div>
        </div>
      </a>
      ${s.length?`
      <div class="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3 sm:gap-8">
        ${s.map(i=>`
          <a href="${r(i.id)}" class="group grid grid-cols-[96px_1fr] items-start gap-4">
            <div class="relative aspect-square overflow-hidden rounded-2xl">
              <img src="${e(i.image,260)}" alt="" loading="lazy" class="img-zoom size-full object-cover">
            </div>
            <div class="min-w-0">
              <h4 class="headline line-clamp-3 text-[15px] font-semibold group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4"${t(i.title)}>${u(i.title)}</h4>
              <p class="mt-2 text-[12px] text-white/55">${u(i.author)} · ${u(n(i.publishedAt))}</p>
            </div>
          </a>`).join(``)}
      </div>`:``}
    </div>
  </section>`}function k(){let i=w(`Uttar Pradesh`,4);if(!i.length)return``;let[o,...s]=i,c=y(`Uttar Pradesh`);return`
  <section class="container-page mt-16 sm:mt-24" aria-labelledby="sec-up">
    <div id="sec-up">${m(`Uttar Pradesh`,{href:h(`Uttar Pradesh`),sub:c.hi})}</div>
    <div class="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <a href="${r(o.id)}" class="group relative isolate flex min-h-[380px] flex-col justify-end overflow-hidden rounded-[28px] bg-ink sm:min-h-[460px] ${s.length?`lg:col-span-8`:`lg:col-span-12`}">
        <img src="${e(o.image,1400)}" alt="" loading="lazy" class="img-zoom absolute inset-0 -z-10 size-full object-cover">
        <div class="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/0"></div>
        <div class="max-w-3xl p-6 pr-20 sm:p-10 sm:pr-28">
          ${a(o.category,{solid:!0})}
          <h3 class="headline mt-4 text-[25px] font-bold text-white sm:text-[32px]"${t(o.title)}>${u(o.title)}</h3>
          <p class="mt-3 line-clamp-2 text-[15px] leading-relaxed text-white/80"${t(o.subtitle)}>${u(o.subtitle)}</p>
          <div class="mt-5">${l(o,{light:!0})}</div>
        </div>
        ${v({size:`lg`})}
      </a>
      ${s.length?`<div class="flex flex-col divide-y divide-line lg:col-span-4 lg:-mt-4">
        ${s.map(e=>`
          <a href="${r(e.id)}" class="group flex-1 py-4 first:pt-0 lg:first:pt-4">
            <div class="flex items-center gap-2 text-[12px]"><span class="kicker">${u(e.location||e.category)}</span><span class="text-muted">· ${u(n(e.publishedAt))}</span></div>
            <h4 class="headline mt-1.5 text-[17px] font-semibold group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4"${t(e.title)}>${u(e.title)}</h4>
            <p class="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-muted"${t(e.subtitle)}>${u(e.subtitle)}</p>
          </a>`).join(``)}
      </div>`:``}
    </div>
  </section>`}function A(e,{two:t=!1}={}){let n=e.map(e=>({name:e,items:w(e,3)})).filter(e=>e.items.length);return n.length?`
  <section class="container-page mt-16 sm:mt-24">
    <div class="grid gap-14 ${t?`md:grid-cols-2`:`md:grid-cols-2 lg:grid-cols-3`} md:gap-8 lg:gap-10">
      ${n.map(({name:e,items:t})=>j(e,t)).join(``)}
    </div>
  </section>`:``}function j(n,[i,...a]){let o=y(n);return`
  <div aria-labelledby="sec-${o.slug}">
    <div class="mb-5 flex items-center justify-between border-b-2 border-ink pb-3">
      <h2 id="sec-${o.slug}" class="text-[19px] font-semibold tracking-tight">${u(n)} <span class="ml-1 text-[13px] font-normal text-muted" lang="hi">${u(o.hi)}</span></h2>
      <a href="${h(n)}" class="inline-flex items-center gap-1 text-[13px] font-semibold text-accent hover:underline">View all ${b.arrowRight(`size-3.5`)}</a>
    </div>
    <a href="${r(i.id)}" class="group block">
      <div class="relative overflow-hidden rounded-2xl">
        <img src="${e(i.image,720)}" alt="" loading="lazy" class="img-zoom aspect-[16/10] w-full object-cover">
        ${v()}
      </div>
      <h3 class="headline mt-4 text-[19px] font-semibold group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4"${t(i.title)}>${u(i.title)}</h3>
      <p class="mt-2 line-clamp-2 text-[14px] leading-relaxed text-muted"${t(i.subtitle)}>${u(i.subtitle)}</p>
      <div class="mt-3">${l(i)}</div>
    </a>
    <div class="mt-3 divide-y divide-line border-t border-line">
      ${a.map(e=>p(e)).join(``)}
    </div>
  </div>`}function M(){let e=w(`Sports`,4);if(!e.length)return``;let t=y(`Sports`);return`
  <section class="mt-20 bg-cream py-14 sm:mt-24 sm:py-20" aria-labelledby="sec-sports-row">
    <div class="container-page">
      <div id="sec-sports-row">${m(`Sports`,{href:h(`Sports`),sub:t.hi})}</div>
      <div class="grid gap-5 divide-y divide-line sm:grid-cols-2 sm:gap-6 sm:divide-y-0 lg:grid-cols-4">
        ${e.map((e,t)=>`<div class="${t?`pt-5 sm:pt-0`:``}">${s(e,{bg:`#F5F5F3`,showExcerpt:!1})}</div>`).join(``)}
      </div>
    </div>
  </section>`}