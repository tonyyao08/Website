# Valorant lineups data format

Each lineup is one TypeScript file in `src/data/valorant/lineups/`. The site automatically loads every file in that folder, so adding a lineup never requires editing a registry.

## Recommended: add a lineup with the helper

For a visual workflow, use `npm run lineup:editor` and open `http://127.0.0.1:4322`. The editor displays the minimap and all existing locations. Select Start or End, then click a matching marker to reuse it; clicking open map space creates a named new location. Complete the form, attach local images, and select **Create lineup**. It writes the lineup data, copies the images, and adds any new locations locally. Stop the editor with `Ctrl+C` after saving.

1. Put the stand, aim, and result screenshots anywhere on your computer. They can stay in Downloads; the script copies them into the site.
2. From the repository folder, run `npm run add:lineup`.
3. Answer the prompts. You can paste a Windows path from Explorer when asked for each image.
4. For each endpoint, choose an existing location ID or enter `new`. For a new location, provide its label and X/Y map positions as percentages from 0 to 100. The helper adds it to the map data automatically.
5. The helper gives the lineup a unique ID, writes its data file, and copies images into `public/images/valorant/<map>/lineups/<unique-id>/` as `stand`, `aim`, and `result` while keeping their file extension.
6. Run `npm run build`, check the page locally with `npm run dev`, and test the lineup in-game. Set `verified: true` in the generated lineup file only after testing it.

To convert pixel coordinates from a square 2048 × 2048 map image to percentages: `percentage = pixels / 2048 * 100`. For example, X 460 becomes 22.4609375 and Y 1080 becomes 52.734375.

The helper currently supports maps that already have a file in `src/data/valorant/maps/` (currently Ascent). Adding a completely new map still follows the map steps below.

Copy `ascent-example.ts`, rename it to a descriptive slug, and replace all template text with tested instructions.

## Required concepts

- `mapId`, `side`, and `utility` power the map/attack-or-defense/recon-or-shock filters.
- `startLocationId` and `endLocationId` must match reusable location IDs in `src/data/valorant/maps/<map>.ts`.
- Map-location positions use percentages, so they remain correct as the map image resizes.
- A map line is not stored separately. The UI draws it from a lineup's start and end marker.
- After selecting a location, call `getLineupsForLocation()`. Only those returned lineup lines should render.
- After clicking a line, render `stand`, `aim`, `mechanics`, `notes`, `result`, and optional `media`.

## Adding a new map

1. Create a map file in `src/data/valorant/maps/` with its image path and markers.
2. Add its ID to `MapId` in `types.ts` and add the map to `maps` in `index.ts`.
3. Add one lineup file per route in `src/data/valorant/lineups/`.

Keep `verified: false` until the lineup has been tested in-game. Do not use the example record as a real lineup.
