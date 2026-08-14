# Portfolio

Mon portfolio de développeur de jeux vidéo : https://germaincasse.github.io/Portfolio/

## Comment c'est fait

Site statique généré avec [Astro](https://astro.build), pas de CMS ni de compte à
gérer. Un projet = un fichier markdown dans `src/content/projects/`, ses médias dans
`public/media/<slug>/`. Les textes hors projets (hero, about, contact) sont
regroupés dans `src/site.ts`.

```bash
npm install
npm run dev      # http://localhost:4321
npm run deploy   # build + publication sur GitHub Pages
```

Le site en ligne est servi depuis la branche `gh-pages`, qui ne contient que le
résultat du build. `npm run deploy` s'occupe de la régénérer.
