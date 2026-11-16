/* ==================================================================
   login.js — single sign-in screen for Reporter and Head Editor.
   ================================================================== */
import { B } from './paths.js';
import { ensureSeeded, resetDemoData } from './articles.js';
import { login, getSession, DEMO_USERS, HOME_FOR_ROLE, ROLES } from './auth.js';
import { logo } from './components.js';
import { $, esc, param, avatar, openModal, toast, setFlash } from './utils.js';

ensureSeeded();

$('#brand-logo').innerHTML = logo({ invert: true });
$('#mobile-logo').innerHTML = logo();

const form = $('#login-form');
const errorBox = $('#login-error');
const notice = $('#login-notice');

/* ---------- Contextual notices ---------- */
const session = getSession();
const reason = param('reason');
const need = param('need');
if (param('signedout')) {
  showNotice('You have been logged out.', 'neutral');
} else if (reason === 'role' && session) {
  showNotice(`You are signed in as ${session.name}. That page needs the ${need === ROLES.editor ? 'Head Editor' : 'Reporter'} account — sign in below to switch.`, 'warn');
} else if (reason === 'auth') {
  showNotice('Please sign in to continue.', 'neutral');
} else if (session) {
  notice.innerHTML = `Signed in as <strong>${esc(session.name)}</strong>. <a class="font-semibold text-accent underline underline-offset-2" href="${HOME_FOR_ROLE[session.role]}">Continue to your desk →</a>`;
  notice.className = 'mt-6 rounded-xl border border-line bg-white px-4 py-3 text-[13.5px]';
}

function showNotice(text, tone) {
  notice.textContent = text;
  notice.className = `mt-6 rounded-xl border px-4 py-3 text-[13.5px] ${tone === 'warn' ? 'border-[#f3d79b] bg-[#fff8e8] text-[#7a5200]' : 'border-line bg-white text-ink'}`;
}

/* ---------- Demo account cards ---------- */
$('#demo-accounts').innerHTML = DEMO_USERS.map((u, i) => `
  <button type="button" data-demo="${i}" class="group rounded-2xl border border-line bg-white p-4 text-left transition-colors hover:border-ink focus-visible:border-ink">
    <span class="flex items-center gap-2.5">
      ${avatar(u.name, 'size-8 text-[11px]')}
      <span class="leading-tight"><span class="block text-[13.5px] font-semibold">${u.role === ROLES.editor ? 'Head Editor' : 'Reporter'}</span><span class="text-[12px] text-muted">${esc(u.name)}</span></span>
    </span>
    <span class="mt-3 block truncate font-mono text-[11.5px] text-muted">${esc(u.email)}</span>
    <span class="block font-mono text-[11.5px] text-muted">${esc(u.password)}</span>
    <span class="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent">Use this account →</span>
  </button>`).join('');

document.querySelectorAll('[data-demo]').forEach((btn) =>
  btn.addEventListener('click', () => {
    const u = DEMO_USERS[Number(btn.dataset.demo)];
    form.email.value = u.email;
    form.password.value = u.password;
    clearError();
    form.querySelector('[type=submit]').focus();
  }),
);

/* ---------- Password toggle ---------- */
$('#toggle-password').addEventListener('click', (e) => {
  const show = form.password.type === 'password';
  form.password.type = show ? 'text' : 'password';
  e.currentTarget.textContent = show ? 'Hide' : 'Show';
  e.currentTarget.setAttribute('aria-pressed', String(show));
});

/* ---------- Submit ---------- */
function clearError() {
  errorBox.classList.add('hidden');
  form.querySelectorAll('[data-field]').forEach((f) => f.classList.remove('has-error'));
}

form.addEventListener('input', clearError);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearError();
  const email = form.email.value.trim();
  const password = form.password.value;

  if (!email || !password) {
    errorBox.textContent = 'Please enter both your email address and password.';
    errorBox.classList.remove('hidden');
    if (!email) form.querySelector('[data-field=email]').classList.add('has-error');
    if (!password) form.querySelector('[data-field=password]').classList.add('has-error');
    return;
  }

  const s = login(email, password);
  if (!s) {
    errorBox.textContent = 'Incorrect email or password. Check the demo accounts below.';
    errorBox.classList.remove('hidden');
    form.querySelectorAll('[data-field]').forEach((f) => f.classList.add('has-error'));
    form.password.select();
    return;
  }

  const next = param('next');
  const home = HOME_FOR_ROLE[s.role];
  const target = next && next.startsWith(s.role === ROLES.editor ? B + 'editor/' : B + 'reporter/') ? next : home;
  setFlash(`Welcome back, ${s.name.split(' ')[0]}.`, 'success');
  window.location.href = target;
});

/* ---------- Reset demo data ---------- */
$('#reset-demo').addEventListener('click', async () => {
  const ok = await openModal({
    title: 'Reset demo data?',
    body: 'This restores the original sample articles and removes every article created or changed during the demo, in this browser only.',
    confirmLabel: 'Reset data',
    tone: 'danger',
  });
  if (!ok) return;
  resetDemoData();
  toast('Demo data has been reset.');
});
