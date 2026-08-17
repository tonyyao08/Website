# Personal Website

Personal website built with Astro and deployed to GitHub Pages.

## Local website preview

```powershell
npm install
npm run dev
```

Open the local address printed by Astro (normally `http://127.0.0.1:4321/Website/`). This preview includes uncommitted lineup changes, so use it to test before publishing.

## Valorant lineup workflow

The live website is read-only. Add and edit lineups through the local editor, which can safely write the lineup data and copy screenshots into this repository.

1. Start the editor:

   ```powershell
   npm run lineup:editor
   ```

2. Open `http://127.0.0.1:4322/`.
3. Choose a map, then select whether you are editing a **Start** or **End** location.
4. To create a lineup, click an existing map marker to reuse it, or click empty map space to create a named location. Enter the lineup fields and choose local stand/aim/result images. Image previews appear before saving.
5. To edit a lineup, click a start or end marker to reveal connected green routes, then click a route. You can also select it from **Existing lineup**. Click **Save changes** when finished.
6. The editor gives new lineups and copied images unique IDs/names automatically. Review all resulting changes with `git status`.
7. Start `npm run dev` in a separate terminal and test the lineup at `http://127.0.0.1:4321/Website/tools/valorant-lineups/`.

You can also use the older prompt-driven helper with `npm run add:lineup`, but the visual editor is the recommended workflow.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run check` | Check Astro and TypeScript files. |
| `npm run build` | Check and create the production site in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lineup:editor` | Run the local visual Valorant lineup editor at `http://127.0.0.1:4322/`. |
| `npm run add:lineup` | Run the prompt-driven Valorant lineup helper. |

## Publishing

After testing a lineup locally, publish it by building, committing the generated data/images, and pushing to `main`:

```powershell
npm run build
git status
git add src/data/valorant/maps/<map>.ts src/data/valorant/lineups/<lineup>.ts public/images/valorant/<map>/lineups/<lineup-folder>/
git commit -m "Add <map> lineup"
git push origin main
```

Only add files that belong to the lineup you intend to publish; `git status` can reveal unused draft folders from abandoned editor attempts. Pushing to `main` runs the GitHub Actions workflow in `.github/workflows/deploy.yml` and deploys the site to GitHub Pages.

The current GitHub Pages address is `https://tonyyao08.github.io/Website/`.

When a custom domain is connected, update `site` and `base` in `astro.config.mjs` before deploying it.
