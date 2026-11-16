# Prayag News — Local News Platform (Frontend Demo)

*Your City. Your News.*

A client demo of a local news publishing platform for Prayagraj, Uttar Pradesh.
Reporters file stories, the Head Editor approves or rejects them, and approved
stories go live on the public site straight away.

Built with **HTML5, Tailwind CSS v4, vanilla JavaScript (ES modules) and Vite**.
All data is kept in the browser's LocalStorage. There is no backend.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5180
```

**Live demo:** https://raihan115219.github.io/prayag-news-demo/

Production build (static files in `dist/`):

```bash
npm run build
npm run preview    # http://localhost:5180/prayag-news-demo/
```

### Deployment (GitHub Pages)

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages. The repository's **Settings → Pages → Source** must be
set to **GitHub Actions**.

Builds use the base path `/prayag-news-demo/` (see `vite.config.js`). All internal links
go through `js/paths.js`. To host at a domain root instead, build with `BASE_PATH=/ npm run build`.

## Demo accounts

| Role        | Email                      | Password      |
|-------------|----------------------------|---------------|
| Reporter    | `reporter@prayagnews.demo` | `reporter123` |
| Head Editor | `editor@prayagnews.demo`   | `editor123`   |

Both accounts are listed on the login screen (`/login.html`). Click one to fill in the form.

## The 2-minute client walkthrough

1. Open **/login.html** and sign in as the **Reporter**.
2. Click **Create New Article**. Fill in the title, subtitle, category, location, main image and body.
3. Click **Submit for Approval**. The story now shows as *Pending Approval* on the dashboard.
4. Click **Logout**, then sign in as the **Head Editor**.
5. The story is at the top of the **Approval Queue**. Click **Review**.
6. Optionally tick **Make this the homepage Top Story**, then click **Approve & Publish**.
7. Open the public homepage. The story is in **Latest News** and in its **section block**, and it leads the page if you picked Top Story.

You can also reject a story with a note. The reporter then sees the note on their
dashboard and in the edit form, and can make changes and resubmit.

To start again, use **Reset demo data** on the login screen or the editor dashboard.

## What's included (PDF §10, Demo Scope)

| Area | Pages | Highlights |
|---|---|---|
| Public homepage | `index.html` | Top Story with three featured stories, Latest News, section blocks (Prayagraj, Uttar Pradesh, National, Politics, Crime, Sports, Entertainment, Business), footer |
| Article details | `article.html?id=article-001` | Category, headline, subtitle, author, IST timestamp, location, image, body. Also WhatsApp/Facebook/copy-link sharing and related stories |
| Section page | `section.html?category=prayagraj` | Published stories only, newest first, **Load more** |
| Login | `login.html` | One login for both roles, error states, demo account cards |
| Reporter panel | `reporter/dashboard.html`, `reporter/create-article.html` | Stats, a "my articles" table with status filters, a rejected-story callout, create/edit form with image upload (preview, replace, remove, validation) and basic formatting (bold, italic, H2, quote, lists), Save Draft, Submit |
| Head Editor panel | `editor/dashboard.html`, `editor/review-article.html` | Stats, approval queue (with an empty state), current Top Story, an all-articles table, live preview, **Approve**, **Reject with note** (required), **Top Story** (only one at a time), **Featured**, **Unpublish / Republish** |

Article statuses: `Draft` → `Pending Approval` → `Published` / `Rejected` → `Unpublished`.

**Left out on purpose** (per the PDF): search, reader accounts, comments, newsletter,
ads, analytics, notifications, breaking-news ticker, language toggle, and screens for
managing reporter accounts or sections. The footer has a marked spot for a future ad
slot, but nothing is shown there.

## Project structure

```
prayag-news/
├── index.html · article.html · section.html · login.html
├── reporter/   dashboard.html · create-article.html
├── editor/     dashboard.html · review-article.html
├── css/input.css          Tailwind entry: design tokens and components (notched cards, buttons, article typography)
├── assets/icons/          favicon
└── js/
    ├── storage.js         safe LocalStorage wrapper and cross-tab change listener
    ├── auth.js            simulated login, session and role guard
    ├── articles.js        data model, categories, every read and write (approve, reject, top story…)
    ├── seed-data.js       fictional sample articles (seeded once)
    ├── components.js      shared markup: header, footer, cards, badges, article view, panel chrome
    ├── utils.js           IST dates, escaping, sanitiser, image compression, toasts, modal
    ├── app.js             per-page bootstrap
    ├── homepage.js · article-details.js · section.js        public pages
    ├── login.js · reporter.js · article-form.js              reporter flow
    └── editor.js · review.js                                 editor flow
```

### Data

- The sample dataset is written to LocalStorage **once** (versioned with `pn_seed_version`). After that, changes made during a demo are kept until you click **Reset demo data**.
- Pages update when another tab changes the data (`storage` event), so an editor tab and a homepage tab stay in sync.
- Timestamps are stored as ISO strings and displayed in **Indian Standard Time** (`Asia/Kolkata`).
- Uploaded images are resized in the browser (max 1600×1200, JPEG) before saving. This keeps LocalStorage usage small. If storage fills up, the app shows a clear error message.
- Article bodies are cleaned against a small list of allowed tags before they are saved or shown.

## Demo limitations (please read)

This is a **frontend-only demonstration**. It is **not** a production CMS.

- **Login is simulated.** The credentials are hard-coded in `js/auth.js` and checked in the browser. Anyone can bypass the role checks.
- **LocalStorage is not secure.** It is not shared between browsers or devices, and anyone using the browser can read or change it.
- Article data lives only in this browser. Clearing site data removes it.
- Uploaded images are stored as base64 data URLs inside LocalStorage, which holds about 5 MB.
- A production version needs a backend and database, secure authentication with hashed passwords and sessions, **server-side authorisation** for every action, image storage/CDN with server-side resizing, an audit trail, and SEO/Open Graph tags rendered on the server.

## Content notice

All articles, names, quotes and figures are **fictional sample content** written for this
demo. They are not real news reports. Photos are free images from Unsplash, loaded at
reduced sizes.
