/**
 * Regenere les medias servis (public/media, public/icons) a partir des sources
 * lourdes rangees dans assets-original/.
 *
 *   node scripts/media.mjs              tout regenerer
 *   node scripts/media.mjs hopf umbra   seulement les sorties dont le chemin
 *                                       contient un de ces mots
 *
 * assets-original/ n'est pas versionne: ce script ne tourne que sur une machine
 * qui a les fichiers d'origine. Il sert surtout a garder trace des reglages
 * d'encodage et a traiter un nouveau projet de la meme facon que les autres.
 *
 * Demande ffmpeg. Si la commande n'est pas dans le PATH, renseigner FFMPEG_DIR.
 * L'encodeur H.264 de reference est libx264 (reglage `crf`). Un ffmpeg sans
 * libx264 (build LGPL) se rabat sur OpenH264, qui travaille au debit: c'est le
 * reglage `kbps`, choisi pour un poids proche de celui du crf.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const FFMPEG_DIR = process.env.FFMPEG_DIR ?? '';
const ffmpeg = join(FFMPEG_DIR, 'ffmpeg');

const only = process.argv.slice(2);
const wanted = (to) => only.length === 0 || only.some((word) => to.includes(word));

// Les covers s'affichent sur une demi-largeur de page, le reel du hero passe en
// fond a 32% d'opacite: 960px suffit aux deux, et 24 fps allege sans se voir.
//
// Champs optionnels: `start` et `duration` (secondes) pour ne garder qu'un
// extrait, `crop` (w:h:x:y, filtre ffmpeg) applique avant la mise a l'echelle,
// a la video comme a son poster.
const VIDEOS = [
  // Montage fourni par Germain, deja cale sur 15s: rien a decouper.
  // crf 36 comme Eldritch Break: gameplay 3D en mouvement constant, a crf 32
  // la meme sequence pesait 1.5 Mo.
  {
    from: 'space-burger-portfolio.mp4',
    to: 'media/zero-g-chef/cover.mp4',
    width: 960,
    crf: 36,
    kbps: 700,
    poster: { at: 1, to: 'media/zero-g-chef/shot-01.webp', width: 1280 },
  },
  { from: 'starborn-cover.mp4', to: 'media/starborn/cover.mp4', width: 960, crf: 32, kbps: 450 },
  { from: 'death-drive-cover.mp4', to: 'media/death-drive/cover.mp4', width: 960, crf: 32, kbps: 450 },
  { from: 'augury-point-cover.mp4', to: 'media/augury-point/cover.mp4', width: 960, crf: 32, kbps: 450 },
  // Le hero est etalonne a l'encodage plutot qu'avec un filter CSS, qui serait
  // repaye a chaque frame de lecture. Legerement eclairci: la video passe en
  // fond derriere le titre et se retrouve vite trop sombre.
  {
    from: 'home-reel.mp4',
    to: 'media/home/reel.mp4',
    width: 960,
    crf: 33,
    kbps: 500,
    grade: 'eq=saturation=0.85:contrast=1.0:brightness=0.06',
    // Poster pris dans la video elle-meme, pour que le passage de l'image a la
    // lecture ne se voie pas.
    poster: { at: 1, to: 'media/home/poster.webp', width: 1280 },
  },
  // Capture de l'editeur (gdigrab, fenetre de 1598x892) sur une scene de demo:
  // cinq polytopes 4D en rotation automatique, mode Project puis Slice a mi-prise.
  // Recadree sur le viewport et la vue Game: l'inspecteur et la console, lus a
  // 960px, ne seraient que du bruit.
  {
    from: 'hopf-capture.avi',
    to: 'media/hopf/cover.mp4',
    start: 2.5,
    duration: 15,
    crop: '994:559:250:20',
    width: 960,
    crf: 32,
    kbps: 450,
    poster: { at: 2.5, to: 'media/hopf/shot-01.webp', width: 994 },
  },
  // Capture du site en plein ecran 1920x1080: rotation du globe, eclipse totale
  // du 12 aout 2026, animation de l'ombre, passage a la carte du monde.
  // Les 2 premieres secondes portent le bandeau "plein ecran" de Chrome.
  {
    from: 'umbra-capture.avi',
    to: 'media/umbra/cover.mp4',
    start: 2,
    duration: 15,
    width: 960,
    crf: 32,
    kbps: 500,
    poster: { at: 2, to: 'media/umbra/shot-01.webp', width: 1280 },
  },
];

// Une carte occupe au plus une demi-largeur de page, donc 1280px couvre meme un
// ecran dense. Les icones sont affichees en 96px.
const IMAGES = [
  // Capsule art du jeu, logo compris: c'est l'image qui identifie Space Burger.
  { from: 'images/space-burger-capsule.png', to: 'media/zero-g-chef/capsule.webp', width: 1280 },
  // Capsules Steam, livrees a leur taille native: pas d'agrandissement, il ne
  // ferait qu'ajouter du flou.
  { from: 'images/death-drive-capsule.jpg', to: 'media/death-drive/capsule.webp', width: 1280 },
  { from: 'images/eldritch-break-capsule.jpg', to: 'media/eldritch-break/capsule.webp', width: 1280 },
  // Croquis de recherche avec le logo, tire du repo du jeu (909x612). Recadre en
  // 16:9 par le haut, pour garder le logo entier en bas.
  {
    from: 'images/divedust-keyart.png',
    to: 'media/divedust/capsule.webp',
    width: 1280,
    crop: '909:511:0:80',
  },
  { from: 'images/starborn-shot-01.webp', to: 'media/starborn/shot-01.webp', width: 1280 },
  { from: 'images/death-drive-shot-01.webp', to: 'media/death-drive/shot-01.webp', width: 1280 },
  { from: 'images/augury-point-shot-01.webp', to: 'media/augury-point/shot-01.webp', width: 1280 },
  { from: 'images/games.png', to: 'icons/games.png', width: 256 },
  { from: 'images/software.png', to: 'icons/software.png', width: 256 },
  { from: 'images/ai.png', to: 'icons/ai.png', width: 256 },
];

// Images fixes tirees d'une video source (galeries des pages projet).
const STILLS = [
  // Divedust: herbe et cascade, course sur le mur de verre, arene de combat.
  { from: 'divedust-run.avi', at: 2.5, to: 'media/divedust/shot-02.webp', width: 1280 },
  { from: 'divedust-run.avi', at: 14.2, to: 'media/divedust/shot-03.webp', width: 1280 },
  { from: 'divedust-arena.avi', at: 14.6, to: 'media/divedust/shot-04.webp', width: 1280 },
];

// Covers montees a partir de plusieurs extraits. Un extrait est [debut, fin],
// ou [debut, fin, 'autre-source'] pour le prendre dans un autre fichier.
//
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
    kbps: 700,
    clips: [
      [12.283, 14.283], [18.85, 20.85], [21.761, 23.761], [23.872, 25.872],
      [29.183, 31.183], [32.977, 34.977], [37.63, 39.63], [44.5, 46.5],
      [49.6, 51.6], [53.1, 55.1],
    ],
    poster: { at: 30.1, to: 'media/eldritch-break/shot-01.webp', width: 1280 },
  },
  // Divedust: deux prises jouees au clavier dans le jeu (gdigrab 1920x1080, UI
  // masquee par F1, rendu "cinematic" du jeu actif). Course sur le mur de verre
  // pres de la cascade puis dans l'eau, sprint dans l'herbe et saut mural, puis
  // attaques telegraphees dans l'arene.
  {
    from: 'divedust-run.avi',
    to: 'media/divedust/cover.mp4',
    width: 960,
    crf: 36,
    kbps: 700,
    clips: [[13.8, 19.3], [2.0, 4.4], [13.8, 17.6, 'divedust-arena.avi']],
    poster: { at: 13.8, to: 'media/divedust/shot-01.webp', width: 1280 },
  },
];

const run = (args) => execFileSync(ffmpeg, args, { stdio: ['ignore', 'ignore', 'inherit'] });

const hasX264 = execFileSync(ffmpeg, ['-hide_banner', '-encoders'], { encoding: 'utf8' }).includes(
  'libx264',
);
if (!hasX264) console.log('note  pas de libx264 dans ce ffmpeg: OpenH264 au debit `kbps`');

const h264 = ({ crf, kbps }) =>
  hasX264
    ? ['-c:v', 'libx264', '-profile:v', 'main', '-preset', 'slow', '-crf', String(crf)]
    : ['-c:v', 'libopenh264', '-profile:v', 'high', '-coder', 'cabac', '-b:v', `${kbps}k`];

// Largeur de la premiere piste video, lue dans la sortie de `ffmpeg -i` (sans
// fichier de sortie, ffmpeg sort en erreur apres avoir decrit l'entree).
const widthOf = (file) => {
  let text = '';
  try {
    execFileSync(ffmpeg, ['-hide_banner', '-i', file], { encoding: 'utf8', stdio: 'pipe' });
  } catch (e) {
    text = String(e.stderr);
  }
  const m = text.match(/Video:.*?\b(\d{2,5})x\d{2,5}\b/);
  if (!m) throw new Error(`largeur introuvable pour ${file}`);
  return Number(m[1]);
};

const ensureDir = (file) => {
  const dir = dirname(file);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
};

const source = (name) => {
  const src = join('assets-original', name);
  if (!existsSync(src)) {
    console.log(`skip  ${name} (absent de assets-original/)`);
    return null;
  }
  return src;
};

const stillFrom = (src, { at, to, width, crop }) => {
  const out = join('public', to);
  ensureDir(out);
  const filters = [crop && `crop=${crop}`, `scale=${width}:-2`].filter(Boolean);
  run([
    '-y', '-loglevel', 'error',
    '-ss', String(at),
    '-i', src,
    '-frames:v', '1',
    '-vf', filters.join(','),
    '-quality', '82',
    out,
  ]);
  console.log(`ok    ${to}`);
};

for (const v of VIDEOS.filter((v) => wanted(v.to))) {
  const src = source(v.from);
  if (!src) continue;
  const out = join('public', v.to);
  ensureDir(out);
  const filters = [v.crop && `crop=${v.crop}`, `scale=${v.width}:-2`, 'fps=24', v.grade].filter(
    Boolean,
  );
  const cut = [
    ...(v.start !== undefined ? ['-ss', String(v.start)] : []),
    ...(v.duration !== undefined ? ['-t', String(v.duration)] : []),
  ];

  run([
    '-y', '-loglevel', 'error',
    ...cut,
    '-i', src,
    '-an',
    '-vf', filters.join(','),
    ...h264(v),
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    out,
  ]);
  console.log(`ok    ${v.to}`);

  if (v.poster) stillFrom(src, { ...v.poster, crop: v.crop });
}

for (const m of MONTAGES.filter((m) => wanted(m.to))) {
  const files = [...new Set([m.from, ...m.clips.map((c) => c[2]).filter(Boolean)])];
  const srcs = files.map(source);
  if (srcs.some((s) => !s)) continue;
  const out = join('public', m.to);
  ensureDir(out);

  const trims = m.clips
    .map(([a, b, file], i) => {
      const input = files.indexOf(file ?? m.from);
      return `[${input}:v]trim=start=${a}:end=${b},setpts=PTS-STARTPTS[v${i}]`;
    })
    .join(';');
  const concat =
    m.clips.map((_, i) => `[v${i}]`).join('') + `concat=n=${m.clips.length}:v=1:a=0[cat]`;

  run([
    '-y', '-loglevel', 'error',
    ...srcs.flatMap((s) => ['-i', s]),
    '-filter_complex', `${trims};${concat};[cat]scale=${m.width}:-2,fps=24[out]`,
    '-map', '[out]',
    '-an',
    ...h264(m),
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    out,
  ]);
  const length = m.clips.reduce((sum, [a, b]) => sum + (b - a), 0);
  console.log(`ok    ${m.to}  (${length.toFixed(0)}s)`);

  if (m.poster) stillFrom(srcs[0], m.poster);
}

for (const s of STILLS.filter((s) => wanted(s.to))) {
  const src = source(s.from);
  if (src) stillFrom(src, s);
}

// Grain: le bruit est porte par le canal alpha (ecart au gris moyen), pour que
// la texture s'applique sans mix-blend-mode, qui coutait un repaint du viewport
// a chaque frame de scroll. L'intensite finale se regle en CSS (opacity).
const GRAIN_SRC = join('assets-original', 'images', 'grain-src.png');
if (wanted('grain.png') && existsSync(GRAIN_SRC)) {
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

for (const img of IMAGES.filter((i) => wanted(i.to))) {
  const src = source(img.from);
  if (!src) continue;
  const out = join('public', img.to);
  ensureDir(out);

  // Jamais d'agrandissement: une source deja plus petite que la cible est
  // recopiee telle quelle par ffmpeg (scale a sa largeur d'origine).
  const cropWidth = img.crop ? Number(img.crop.split(':')[0]) : Infinity;
  const width = Math.min(img.width, cropWidth, widthOf(src));
  const filters = [img.crop && `crop=${img.crop}`, `scale=${width}:-2`].filter(Boolean);
  const args = ['-y', '-loglevel', 'error', '-i', src, '-vf', filters.join(',')];
  if (out.endsWith('.webp')) args.push('-quality', '82');
  else args.push('-pix_fmt', 'rgba');
  args.push(out);

  run(args);
  console.log(`ok    ${img.to}  (${width}px)`);
}
