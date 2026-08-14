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
  // Le hero est desature a l'encodage plutot qu'avec un filter CSS, qui serait
  // repaye a chaque frame de lecture.
  {
    from: 'home-reel.mp4',
    to: 'media/home/reel.mp4',
    width: 960,
    crf: 33,
    grade: 'eq=saturation=0.7:contrast=1.05',
  },
];

// Une carte occupe au plus une demi-largeur de page, donc 1280px couvre meme un
// ecran dense. Les icones sont affichees en 64px.
const IMAGES = [
  { from: 'images/zero-g-chef-shot-01.webp', to: 'media/zero-g-chef/shot-01.webp', width: 1280 },
  { from: 'images/starborn-shot-01.webp', to: 'media/starborn/shot-01.webp', width: 1280 },
  { from: 'images/death-drive-shot-01.webp', to: 'media/death-drive/shot-01.webp', width: 1280 },
  { from: 'images/augury-point-shot-01.webp', to: 'media/augury-point/shot-01.webp', width: 1280 },
  { from: 'images/games.png', to: 'icons/games.png', width: 128 },
  { from: 'images/software.png', to: 'icons/software.png', width: 128 },
  { from: 'images/ai.png', to: 'icons/ai.png', width: 128 },
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
