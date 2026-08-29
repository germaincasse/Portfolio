/**
 * Regenere les medias servis (public/media, public/icons) a partir des sources
 * lourdes rangees dans assets-original/.
 *
 *   node scripts/media.mjs
 *
 * assets-original/ n'est pas versionne: ce script ne tourne que sur une machine
 * qui a les fichiers d'origine. Il sert surtout a garder trace des reglages
 * d'encodage et a traiter un nouveau projet de la meme facon que les autres.
 *
 * Demande ffmpeg. Si la commande n'est pas dans le PATH, renseigner FFMPEG_DIR.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const FFMPEG_DIR = process.env.FFMPEG_DIR ?? '';
const ffmpeg = join(FFMPEG_DIR, 'ffmpeg');

// Les covers s'affichent sur une demi-largeur de page, le reel du hero passe en
// fond a 32% d'opacite: 960px suffit aux deux, et 24 fps allege sans se voir.
const VIDEOS = [
  { from: 'zero-g-chef-cover.mp4', to: 'media/zero-g-chef/cover.mp4', width: 960, crf: 32 },
  { from: 'starborn-cover.mp4', to: 'media/starborn/cover.mp4', width: 960, crf: 32 },
  { from: 'death-drive-cover.mp4', to: 'media/death-drive/cover.mp4', width: 960, crf: 32 },
  { from: 'augury-point-cover.mp4', to: 'media/augury-point/cover.mp4', width: 960, crf: 32 },
  // Le hero est etalonne a l'encodage plutot qu'avec un filter CSS, qui serait
  // repaye a chaque frame de lecture. Legerement eclairci: la video passe en
  // fond derriere le titre et se retrouve vite trop sombre.
  {
    from: 'home-reel.mp4',
    to: 'media/home/reel.mp4',
    width: 960,
    crf: 33,
    grade: 'eq=saturation=0.85:contrast=1.0:brightness=0.06',
  },
];

// Une carte occupe au plus une demi-largeur de page, donc 1280px couvre meme un
// ecran dense. Les icones sont affichees en 96px.
const IMAGES = [
  { from: 'images/zero-g-chef-shot-01.webp', to: 'media/zero-g-chef/shot-01.webp', width: 1280 },
  { from: 'images/starborn-shot-01.webp', to: 'media/starborn/shot-01.webp', width: 1280 },
  { from: 'images/death-drive-shot-01.webp', to: 'media/death-drive/shot-01.webp', width: 1280 },
  { from: 'images/augury-point-shot-01.webp', to: 'media/augury-point/shot-01.webp', width: 1280 },
  { from: 'images/games.png', to: 'icons/games.png', width: 256 },
  { from: 'images/software.png', to: 'icons/software.png', width: 256 },
  { from: 'images/ai.png', to: 'icons/ai.png', width: 256 },
];

// Eldritch Break n'a pas de cover dediee: elle est montee depuis le trailer.
// Les extraits ont ete choisis une fois pour toutes en detectant les changements
// de plan (seuil 0.15) et en ne gardant que des fenetres entierement contenues
// dans un plan, hors logo d'ouverture (Lunatic Moon, ~2s), hors fondu final et
// logo de fin (a partir de ~70s), et hors passages noirs.
const MONTAGES = [
  {
    from: 'eldritch-break-trailer.mp4',
    to: 'media/eldritch-break/cover.mp4',
    width: 960,
    // Contenu tres charge (FPS, camera constamment en mouvement): a crf 32 la
    // meme sequence pesait 1.7 Mo.
    crf: 36,
    clips: [
      [12.283, 14.283], [18.85, 20.85], [21.761, 23.761], [23.872, 25.872],
      [29.183, 31.183], [32.977, 34.977], [37.63, 39.63], [44.5, 46.5],
      [49.6, 51.6], [53.1, 55.1],
    ],
    poster: { at: 30.1, to: 'media/eldritch-break/shot-01.webp', width: 1280 },
  },
];

const run = (args) => execFileSync(ffmpeg, args, { stdio: ['ignore', 'ignore', 'inherit'] });

const widthOf = (file) =>
  Number(
    execFileSync(join(FFMPEG_DIR, 'ffprobe'), [
      '-v', 'quiet',
      '-select_streams', 'v:0',
      '-show_entries', 'stream=width',
      '-of', 'csv=p=0',
      file,
    ], { encoding: 'utf8' }).trim(),
  );

const ensureDir = (file) => {
  const dir = dirname(file);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
};

for (const v of VIDEOS) {
  const src = join('assets-original', v.from);
  if (!existsSync(src)) {
    console.log(`skip  ${v.from} (absent de assets-original/)`);
    continue;
  }
  const out = join('public', v.to);
  ensureDir(out);
  const filters = [`scale=${v.width}:-2`, 'fps=24'];
  if (v.grade) filters.push(v.grade);

  run([
    '-y', '-loglevel', 'error',
    '-i', src,
    '-an',
    '-vf', filters.join(','),
    '-c:v', 'libx264',
    '-profile:v', 'main',
    '-preset', 'slow',
    '-crf', String(v.crf),
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    out,
  ]);
  console.log(`ok    ${v.to}`);
}

for (const m of MONTAGES) {
  const src = join('assets-original', m.from);
  if (!existsSync(src)) {
    console.log(`skip  ${m.from} (absent de assets-original/)`);
    continue;
  }
  const out = join('public', m.to);
  ensureDir(out);

  const trims = m.clips
    .map(([a, b], i) => `[0:v]trim=start=${a}:end=${b},setpts=PTS-STARTPTS[v${i}]`)
    .join(';');
  const concat =
    m.clips.map((_, i) => `[v${i}]`).join('') + `concat=n=${m.clips.length}:v=1:a=0[cat]`;

  run([
    '-y', '-loglevel', 'error',
    '-i', src,
    '-filter_complex', `${trims};${concat};[cat]scale=${m.width}:-2,fps=24[out]`,
    '-map', '[out]',
    '-an',
    '-c:v', 'libx264',
    '-profile:v', 'main',
    '-preset', 'slow',
    '-crf', String(m.crf),
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    out,
  ]);
  console.log(`ok    ${m.to}  (${(m.clips.length * (m.clips[0][1] - m.clips[0][0])).toFixed(0)}s)`);

  if (m.poster) {
    const posterOut = join('public', m.poster.to);
    ensureDir(posterOut);
    run([
      '-y', '-loglevel', 'error',
      '-ss', String(m.poster.at),
      '-i', src,
      '-frames:v', '1',
      '-vf', `scale=${m.poster.width}:-2`,
      '-quality', '82',
      posterOut,
    ]);
    console.log(`ok    ${m.poster.to}`);
  }
}

// Grain: le bruit est porte par le canal alpha (ecart au gris moyen), pour que
// la texture s'applique sans mix-blend-mode, qui coutait un repaint du viewport
// a chaque frame de scroll. L'intensite finale se regle en CSS (opacity).
const GRAIN_SRC = join('assets-original', 'images', 'grain-src.png');
if (existsSync(GRAIN_SRC)) {
  run([
    '-y', '-loglevel', 'error',
    '-i', GRAIN_SRC,
    '-vf',
    "format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='clip(abs(r(X,Y)-128)*2,0,255)'",
    '-frames:v', '1',
    join('public', 'grain.png'),
  ]);
  console.log('ok    grain.png');
}

for (const img of IMAGES) {
  const src = join('assets-original', img.from);
  if (!existsSync(src)) {
    console.log(`skip  ${img.from} (absent de assets-original/)`);
    continue;
  }
  const out = join('public', img.to);
  ensureDir(out);

  // Jamais d'agrandissement: une source deja plus petite que la cible est
  // recopiee telle quelle par ffmpeg (scale a sa largeur d'origine).
  const width = Math.min(img.width, widthOf(src));
  const args = ['-y', '-loglevel', 'error', '-i', src, '-vf', `scale=${width}:-2`];
  if (out.endsWith('.webp')) args.push('-quality', '82');
  else args.push('-pix_fmt', 'rgba');
  args.push(out);

  run(args);
  console.log(`ok    ${img.to}  (${width}px)`);
}
