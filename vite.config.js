import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

const root = import.meta.dirname;

// GitHub Pages serves the site from /<repo-name>/, so production builds use
// that base path. Override with BASE_PATH=/ for hosting at a domain root.
const PAGES_BASE = '/prayag-news-demo/';

export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? (process.env.BASE_PATH ?? PAGES_BASE) : '/',
  plugins: [tailwindcss()],
  server: { port: 5180 },
  preview: { port: 5180 },
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        article: resolve(root, 'article.html'),
        section: resolve(root, 'section.html'),
        login: resolve(root, 'login.html'),
        reporterDashboard: resolve(root, 'reporter/dashboard.html'),
        reporterCreate: resolve(root, 'reporter/create-article.html'),
        editorDashboard: resolve(root, 'editor/dashboard.html'),
        editorReview: resolve(root, 'editor/review-article.html'),
      },
    },
  },
}));
