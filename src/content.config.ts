import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    /** Titre affiche partout (cartes, page projet, <title>). */
    title: z.string(),
    /** Une phrase. C'est ce qu'on lit sur la carte de la home. */
    tagline: z.string(),
    /** Ex: "Freelance project", "Personal project", "Client work". */
    role: z.string(),
    /** Unity, Godot, Web... affiche a cote du role. */
    engine: z.string(),
    /** Annee de sortie / de travail. Affichee dans l'index. */
    year: z.number(),
    /** Petites etiquettes mono sous le titre. */
    tags: z.array(z.string()).default([]),
    /** Video de couverture (chemin depuis /public). Optionnelle. */
    cover: z.string().optional(),
    /** Image affichee avant que la video charge + fallback mobile. */
    poster: z.string(),
    /** Screenshots supplementaires sur la page projet. */
    gallery: z.array(z.string()).default([]),
    /** Liens externes: itch.io, Steam, trailer, GitHub... */
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
    /** Couleur d'accent propre au projet (hex). Sert au hover et a la page projet. */
    accent: z.string().default('#ff4d29'),
    /** Plus petit = plus haut dans la liste. */
    order: z.number().default(99),
    /** true = le projet n'apparait nulle part sur le site. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
