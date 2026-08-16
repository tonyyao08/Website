# Personal Website

Personal website built with Astro and deployed to GitHub Pages.

## Getting started

```powershell
npm install
npm run dev
```

Open the local address printed by Astro (normally `http://localhost:4321`).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run check` | Check Astro and TypeScript files. |
| `npm run build` | Check and create the production site in `dist/`. |
| `npm run preview` | Preview the production build locally. |

## Publishing

Pushing to `main` runs the GitHub Actions workflow in `.github/workflows/deploy.yml` and deploys the site to GitHub Pages.

The current GitHub Pages address is `https://tonyyao08.github.io/Website/`.

When a custom domain is connected, update `site` and `base` in `astro.config.mjs` before deploying it.
