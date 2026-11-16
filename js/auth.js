/* ==================================================================
   auth.js — SIMULATED authentication for the demo.
   Credentials are hard-coded and checked in the browser. This is not
   secure and must be replaced by server-side auth in production.
   ================================================================== */
import { B } from './paths.js';
import { KEYS, read, write, remove } from './storage.js';

export const ROLES = { reporter: 'reporter', editor: 'editor' };

export const DEMO_USERS = [
  {
    email: 'reporter@prayagnews.demo',
    password: 'reporter123',
    role: ROLES.reporter,
    name: 'Ankit Srivastava',
    title: 'Staff Reporter, City Desk',
  },
  {
    email: 'editor@prayagnews.demo',
    password: 'editor123',
    role: ROLES.editor,
    name: 'Meenakshi Dwivedi',
    title: 'Head Editor',
  },
];

export const HOME_FOR_ROLE = {
  [ROLES.reporter]: B + 'reporter/dashboard.html',
  [ROLES.editor]: B + 'editor/dashboard.html',
};

export function login(email, password) {
  const user = DEMO_USERS.find(
    (u) => u.email.toLowerCase() === String(email).trim().toLowerCase() && u.password === password,
  );
  if (!user) return null;
  const session = { email: user.email, role: user.role, name: user.name, title: user.title, at: new Date().toISOString() };
  write(KEYS.session, session);
  return session;
}

export function getSession() {
  return read(KEYS.session, null);
}

export function logout() {
  remove(KEYS.session);
  window.location.href = B + 'login.html?signedout=1';
}

/**
 * Page guard for panel pages. Redirects to login when there is no session
 * or the session belongs to a different role.
 */
export function requireRole(role) {
  const session = getSession();
  if (!session || session.role !== role) {
    const next = encodeURIComponent(window.location.pathname + window.location.search);
    const reason = session ? 'role' : 'auth';
    window.location.replace(`${B}login.html?next=${next}&reason=${reason}&need=${role}`);
    return null;
  }
  return session;
}
