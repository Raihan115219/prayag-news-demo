import{G as e,J as t,S as n,U as r,Y as i,_t as a,b as o,bt as s,c,j as l,n as u,pt as d,r as f,rt as p,s as m,st as h,u as g,v as _,yt as v,z as y}from"./components-WsKqgoct.js";import{n as b,r as x}from"./app-DmycUdSl.js";b(``),S(),v([a.articles],S);function S(){let a=document.getElementById(`article-root`),v=y(`id`),b=v?p(v):null,S=n(),w=b&&S&&(S.role===`editor`||S.email===b.authorEmail);if(!b||b.status!==i.published&&!w){document.title=`Article not found — Prayag News`,a.innerHTML=`
      <div class="container-page py-16 sm:py-24">
        ${m({title:`Article not found`,text:`This story may have been moved, unpublished, or the link may be incorrect.`,iconSvg:g.file(`size-6`),action:`<a href="${s}index.html" class="btn btn-dark">${g.arrowLeft(`size-4`)} Back to homepage</a>`})}
      </div>`;return}t.includes(b.category)&&x(b.category),document.title=`${b.title} — Prayag News`,C(`description`,b.subtitle||r(b.body).slice(0,150)),C(`og:title`,b.title,`property`),C(`og:description`,b.subtitle,`property`);let T=b.status===i.published?``:`<div class="container-page pt-6"><div class="flex flex-col gap-3 rounded-2xl border border-[#f3d79b] bg-[#fff8e8] px-4 py-3 text-[14px] text-[#7a5200] sm:flex-row sm:items-center sm:justify-between">
        <p class="flex items-center gap-2">${g.eye(`size-4`)} <span><strong>Preview only.</strong> This article is not live on the public site.</span> ${_(b.status)}</p>
        <a href="${o[S.role]}" class="font-semibold underline underline-offset-2">Back to ${S.role===`editor`?`Editor`:`Reporter`} Desk</a>
      </div></div>`,E=h({category:b.category,exclude:[b.id],limit:3}),D=window.location.href,O=`${b.title} — Prayag News`;a.innerHTML=`
    ${T}
    <div class="container-page pt-8 sm:pt-12">
      ${u(b)}

      ${b.status===i.published?`
      <div class="mx-auto mt-12 flex max-w-[680px] flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">Share this story</p>
        <div class="flex flex-wrap gap-2">
          <a class="btn !rounded-full bg-[#1f8a4c] !py-2 text-white hover:bg-[#187240]" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(`${O} ${D}`)}">${f.whatsapp} WhatsApp</a>
          <a class="btn btn-outline !rounded-full !py-2" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(D)}">${f.facebook} Facebook</a>
          <button type="button" data-copy class="btn btn-outline !rounded-full !py-2">${g.copy(`size-4`)} Copy link</button>
        </div>
      </div>`:``}
    </div>

    ${E.length?`
    <section class="container-page mt-16 border-t border-line pt-12 sm:mt-20" aria-labelledby="related-title">
      <div class="mb-8 flex items-end justify-between gap-4">
        <h2 id="related-title" class="section-title">More from ${l(b.category)}</h2>
        <a href="${d(b.category)}" class="pill-link">View all <span class="pill-icon">${g.arrowUpRight(`size-3.5`)}</span></a>
      </div>
      <div class="grid gap-5 divide-y divide-line sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:divide-y-0 lg:grid-cols-3">
        ${E.map((e,t)=>`<div class="${t?`pt-5 sm:pt-0`:``}">${c(e)}</div>`).join(``)}
      </div>
    </section>`:``}
  `,a.querySelector(`[data-copy]`)?.addEventListener(`click`,async()=>{try{await navigator.clipboard.writeText(D),e(`Link copied to clipboard`)}catch{e(`Could not copy automatically — please copy the address bar link.`,`error`)}})}function C(e,t,n=`name`){if(!t)return;let r=document.head.querySelector(`meta[${n}="${e}"]`);r||(r=document.createElement(`meta`),r.setAttribute(n,e),document.head.append(r)),r.setAttribute(`content`,t)}