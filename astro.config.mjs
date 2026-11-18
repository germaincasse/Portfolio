// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Projets `secret: true` (mode apercu, voir PreviewMode.astro): leurs pages
// sont generees mais restent hors du sitemap. Lu a la main: la collection
// Astro n'est pas encore chargee a ce stade.
const PROJECTS_DIR = new URL('./src/content/projects/', import.meta.url);
const secretSlugs = readdirSync(PROJECTS_DIR)
  .filter((f) => f.endsWith('.md'))
  .filter((f) => /^secret:\s*true\s*$/m.test(readFileSync(new URL(f, PROJECTS_DIR), 'utf8')))
  .map((f) => f.replace(/\.md$/, ''));

// ---------------------------------------------------------------------------
// Deploiement GitHub Pages
//
//  - Repo nomme "<user>.github.io"  -> site: 'https://germaincasse.github.io'
//                                      base: '/'            (laisser tel quel)
//  - Repo nomme autrement            -> site: 'https://germaincasse.github.io'
//                                      base: '/<nom-du-repo>'
//  - Domaine perso                   -> site: 'https://germaincasse.dev', base: '/'
//
// La variable d'env BASE_PATH permet de surcharger sans toucher au fichier
// (utilisee par le workflow GitHub Actions).
// ---------------------------------------------------------------------------
export default defineConfig({
  site: process.env.SITE_URL || 'https://germaincasse.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !secretSlugs.some((slug) => new RegExp(`/work/${slug}/?$`).test(page)),
    }),
  ],
});
