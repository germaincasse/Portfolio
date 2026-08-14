/**
 * Publie le site sur GitHub Pages: build local, puis push du contenu de dist/
 * sur la branche gh-pages (c'est elle que Pages sert, pas main).
 *
 *   npm run deploy
 *
 * dist/ est vide a chaque build, donc son depot git est recree a chaque fois et
 * l'historique de gh-pages est ecrase. C'est voulu: seul le dernier build compte.
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://germaincasse.github.io';
const BASE_PATH = '/Portfolio';
const BRANCH = 'gh-pages';
const DIST = 'dist';

const git = (args, cwd = process.cwd()) =>
  execFileSync('git', args, { cwd, stdio: 'inherit' });

const remote = execFileSync('git', ['remote', 'get-url', 'origin'], {
  encoding: 'utf8',
}).trim();

console.log(`> build  (base ${BASE_PATH})`);
execFileSync('npm', ['run', 'build'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, SITE_URL, BASE_PATH },
});

// Sans ce fichier, GitHub fait passer le site par Jekyll, qui ignore les
// dossiers commencant par un underscore: tout le CSS de dist/_astro/ tombe.
writeFileSync(join(DIST, '.nojekyll'), '');

if (existsSync(join(DIST, '.git'))) {
  rmSync(join(DIST, '.git'), { recursive: true, force: true });
}

console.log(`> push   ${remote} ${BRANCH}`);
git(['init', '-q', '-b', BRANCH], DIST);
git(['add', '-A'], DIST);
git(['-c', 'core.safecrlf=false', 'commit', '-q', '-m', 'Deploy site build'], DIST);
git(['push', '-q', '--force', remote, BRANCH], DIST);

console.log(`\nEn ligne dans une minute: ${SITE_URL}${BASE_PATH}/`);
