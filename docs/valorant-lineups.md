# Valorant lineups data format

Each lineup is one TypeScript file in `src/data/valorant/lineups/`. The site automatically loads every file in that folder, so adding a lineup never requires editing a registry.

Copy `ascent-example.ts`, rename it to a descriptive slug, and replace all template text with tested instructions.

## Required concepts

- `mapId`, `side`, and `utility` power the map/attack-or-defense/recon-or-shock filters.
- `startMarkerId` and `endMarkerId` must match marker IDs in `src/data/valorant/maps/<map>.ts`.
- Map-marker positions use percentages, so they remain correct as the map image resizes.
- A map line is not stored separately. The UI draws it from a lineup's start and end marker.
- After selecting a marker, call `getLineupsForMarker()`. Only those returned lineup lines should render.
- After clicking a line, render `stand`, `aim`, `mechanics`, `notes`, `result`, and optional `media`.

## Adding a new map

1. Create a map file in `src/data/valorant/maps/` with its image path and markers.
2. Add its ID to `MapId` in `types.ts` and add the map to `maps` in `index.ts`.
3. Add one lineup file per route in `src/data/valorant/lineups/`.

Keep `verified: false` until the lineup has been tested in-game. Do not use the example record as a real lineup.
