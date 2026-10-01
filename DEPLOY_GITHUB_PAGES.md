# Déploiement GitHub Pages — Guide-Bootstrap

Ce projet est configuré pour être exporté en site statique Next.js et publié sur GitHub Pages.

## Fichiers modifiés
- `next.config.ts` : `output: "export"`
- `package.json` : le script `build` utilise `next build`
- `.github/workflows/nextjs.yml` : installation avec Bun + build statique + déploiement GitHub Pages

## Dans GitHub
1. Remplacer le contenu de `.github/workflows/nextjs.yml` par celui fourni.
2. Commit sur `main`.
3. Dans `Settings → Pages`, garder `Source = GitHub Actions`.
4. Aller dans `Actions` et attendre que `Deploy Next.js site to Pages` soit vert.

Le site sera normalement disponible à :
`https://baba-niang.github.io/Guide-Bootstrap/`

Le workflow utilise `configure-pages` avec le générateur Next.js pour gérer le `basePath` de GitHub Pages, et fournit ce chemin au code des fiches afin que les images `/public/fiches` fonctionnent aussi sous `/Guide-Bootstrap/`.
