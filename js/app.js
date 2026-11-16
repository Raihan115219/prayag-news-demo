/* ==================================================================
   app.js — shared bootstrap for every page.
   ================================================================== */
import { ensureSeeded } from './articles.js';
import { siteHeader, siteFooter, panelHeader } from './components.js';
import { installImageFallback, consumeFlash, toast } from './utils.js';
import { requireRole, logout } from './auth.js';

function boot() {
  try {
    ensureSeeded();
  } catch (err) {
    toast(err.message, 'error');
  }
  installImageFallback();
}

/** Public pages: header with the given active nav item + footer. */
export function initPublicPage(active = 'Home') {
  boot();
  document.getElementById('site-header').innerHTML = siteHeader(active);
  document.getElementById('site-footer').innerHTML = siteFooter();
  consumeFlash();
}

export function setActiveNav(active) {
  document.getElementById('site-header').innerHTML = siteHeader(active);
}

/** Panel pages: role guard + CMS header. Returns the session (or null). */
export function initPanelPage(role, active) {
  boot();
  const session = requireRole(role);
  if (!session) return null;
  document.getElementById('panel-header').innerHTML = panelHeader(session, active);
  document.querySelectorAll('[data-logout]').forEach((b) => b.addEventListener('click', logout));
  consumeFlash();
  return session;
}
