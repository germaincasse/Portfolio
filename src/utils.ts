/**
 * Prefixe un chemin absolu (/media/..., /icons/...) avec le `base` configure
 * dans astro.config.mjs. Indispensable pour un deploiement GitHub Pages sur
 * un repo qui n'est pas <user>.github.io.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL; // toujours '/', '/repo/' ...
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:')) return path;
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

/** Idem pour les liens internes de navigation. */
export const href = asset;

/** '01', '02', ... pour les index de section et de projet. */
export function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** Vrai pour un lien vers une fiche boutique Steam. */
export function isSteam(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith('steampowered.com');
  } catch {
    return false;
  }
}
