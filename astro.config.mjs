// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  integrations: [sitemap()],
});
