import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/**
 * Numero affiche d'un projet dans sa rubrique, dans les deux etats du site:
 * `public` compte seulement les projets visibles (null pour un projet secret),
 * `preview` compte tout, comme le mode apercu M+P+O les montre.
 */
export interface Numbering {
  public: number | null;
  preview: number;
}

const byOrder = (a: Project, b: Project) => a.data.order - b.data.order;

function number(list: Project[]): Map<string, Numbering> {
  const out = new Map<string, Numbering>();
  let pub = 0;
  list.forEach((p, i) => {
    out.set(p.id, { public: p.data.secret ? null : ++pub, preview: i + 1 });
  });
  return out;
}

/**
 * Tous les projets publiables, ranges par rubrique puis par `order`.
 * `chain` est l'ordre de lecture du site (jeux puis side projects): il sert au
 * lien "Next project" des pages projet.
 */
export async function getProjects() {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  const games = all.filter((p) => p.data.category === 'games').sort(byOrder);
  const software = all.filter((p) => p.data.category === 'software').sort(byOrder);
  const chain = [...games, ...software];

  return {
    games,
    software,
    chain,
    numbering: new Map([...number(games), ...number(software)]),
  };
}

/**
 * Projet suivant dans la chaine, en sautant les projets secrets si `publicOnly`.
 * Boucle sur le premier apres le dernier.
 */
export function nextOf(chain: Project[], current: Project, publicOnly: boolean): Project {
  const list = publicOnly ? chain.filter((p) => !p.data.secret) : chain;
  const i = list.findIndex((p) => p.id === current.id);
  return list[(i + 1) % list.length];
}
