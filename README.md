# Portfolio — Germain Cassé

Site statique construit avec [Astro](https://astro.build). Aucun CMS, aucun compte
à gérer : le contenu vit dans des fichiers markdown versionnés avec le code.

## Lancer le site en local

```bash
npm install     # une seule fois
npm run dev     # http://localhost:4321
```

Autres commandes :

| Commande | Effet |
| --- | --- |
| `npm run dev` | serveur local avec rechargement à chaud |
| `npm run build` | génère le site statique dans `dist/` |
| `npm run preview` | sert `dist/` comme en production |

## Ajouter un projet

Deux étapes, deux minutes.

**1. Déposer les médias** dans `public/media/<slug>/` :

```
public/media/mon-jeu/
  cover.mp4      # gameplay en boucle, ~10-25 s, sans son
  shot-01.png    # image affichée avant que la vidéo charge
```

**2. Créer `src/content/projects/mon-jeu.md`** :

```markdown
---
title: Mon Jeu
tagline: Une phrase, celle qu'on lit sur la carte de la home.
role: Freelance project        # ou Personal project, Client work...
engine: Unity                  # ou Godot, Web...
year: 2026
tags: ['Unity', '3D', 'PC']
cover: /media/mon-jeu/cover.mp4
poster: /media/mon-jeu/shot-01.png
gallery:
  - /media/mon-jeu/shot-02.png
links:
  - { label: 'Steam', url: 'https://store.steampowered.com/app/...' }
  - { label: 'itch.io', url: 'https://...' }
accent: '#ff4d29'              # couleur du projet (hover, page projet)
order: 0                       # plus petit = plus haut dans la liste
draft: false                   # true = invisible sur le site
---

Le texte de la page projet, en markdown.

## What I built

Les titres `##` deviennent des labels de section.
```

Le nom du fichier donne l'URL : `mon-jeu.md` → `/work/mon-jeu`.
La page projet, la carte sur la home, la page `/work`, le lien "next project"
et le sitemap se mettent à jour tout seuls.

### Champs disponibles

| Champ | Obligatoire | Rôle |
| --- | --- | --- |
| `title` | oui | titre affiché partout |
| `tagline` | oui | une phrase, carte + SEO |
| `role` | oui | `Freelance project`, `Personal project`... |
| `engine` | oui | Unity, Godot, Web... |
| `year` | oui | année (nombre) |
| `tags` | non | étiquettes sous le titre |
| `cover` | non | vidéo `.mp4` ; sans elle, le poster est affiché |
| `poster` | oui | image de secours et de partage |
| `gallery` | non | screenshots supplémentaires |
| `links` | non | Steam, itch, trailer, GitHub... |
| `accent` | non | couleur hex du projet (défaut `#ff4d29`) |
| `order` | non | tri croissant (défaut 99) |
| `draft` | non | `true` pour cacher le projet |

Le schéma est validé au build : une faute de frappe dans un champ fait échouer
`npm run build` avec un message explicite plutôt que de casser le site en ligne.
Il est défini dans [`src/content.config.ts`](src/content.config.ts).

## Modifier les textes du site

Tout ce qui n'est pas un projet (hero, "What I do", About, contact, navigation,
email) est dans un seul fichier : [`src/site.ts`](src/site.ts).

## Structure

```
public/            médias et fichiers servis tels quels
  media/<slug>/    vidéos + screenshots de chaque projet
  icons/           icônes du bloc "What I do"
src/
  content/projects/  un .md par projet  <- le contenu
  site.ts            textes globaux     <- le contenu
  content.config.ts  schéma des projets
  layouts/Base.astro en-tête HTML, SEO, scripts globaux
  components/        Header, Footer, ProjectCard, SectionHead
  pages/             index, work, work/[slug], 404
  styles/global.css  couleurs, typo, primitives
```

## Déploiement (GitHub Pages)

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) construit et publie
à chaque push sur `main`. Une seule chose à faire côté GitHub :

1. Pousser le dépôt sur GitHub.
2. **Settings → Pages → Build and deployment → Source : GitHub Actions**.

Le workflow renseigne l'URL et le chemin de base tout seul, que le dépôt s'appelle
`<user>.github.io` ou autrement. Pour un domaine perso, ajouter un fichier
`public/CNAME` contenant le domaine, et le configurer dans Settings → Pages.

## Notes

- Les vidéos ne se chargent que lorsqu'elles entrent dans l'écran, et se coupent
  quand on scrolle plus loin. Elles sont ignorées si le visiteur a activé
  l'économiseur de données ou la réduction des animations.
- Garder les `.mp4` sous ~10 Mo : ils sont versionnés dans le dépôt.
- Les textes des pages projet sont une première version rédigée à partir des
  descriptions du portfolio Framer. **À relire et corriger** : les détails
  techniques y sont plausibles mais pas vérifiés.
