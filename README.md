# The Fall of an Empire

**How the Ottoman Empire’s collapse reshaped the modern world.** A single-page educational documentary built with Next.js App Router, React, strict TypeScript, Tailwind CSS, locally hosted fonts, SVG cartography, and a detailed MapLibre explorer.

[Live documentary](https://ottoman-empire-fall.vercel.app). The Vercel project is connected to this repository; pushes to `main` deploy automatically. `vercel.json` pins the Next.js framework preset.

The experience includes 16 substantial chapters, approximately 8,300 words of core narrative and supporting learning content, 34 expandable chronology events, seven atlas eras, ten territory profiles, eight historical figure profiles, six diplomatic document comparisons, a draggable Sèvres–Lausanne comparison, a glossary with inline definitions, a cause-and-effect explorer, labeled counterfactuals, and a ten-question quiz. Twenty-four archival photographs, documents, and historical map reconstructions are stored locally with individual attribution and rights metadata.

## Run locally

Use Node.js 24; the cloud environment was validated with Node 24.19.0 and npm 11.9.0.

```sh
npm ci
npm run dev
```

The development server uses port 3000. No account, database, environment variable, or API key is required. Fonts, physical map geography, and images are local. Close map views can load present-day OpenStreetMap tiles online; this layer can be switched off and falls back locally if unavailable. Source links provide optional external reading.

For a production build:

```sh
npm run build
npm run start
```

For this cloud workspace, use `npm ci --cache /workspace/.npm-cache --no-fund` if the default npm cache directory is unavailable. This is a cloud-machine setting, not a requirement for other computers.

## Validate

```sh
npm run lint
npm run typecheck
npm run build
npm test
```

Browser tests start a production server on port 3100, exercise the interactive exhibits, check internal references and local assets, inspect layouts at 390, 768, and 1440 pixels, and run axe WCAG accessibility checks. Build before running the browser suite. They use `/usr/bin/chromium` when available; otherwise install Playwright’s Chromium with `npx playwright install chromium`. `CHROMIUM_PATH` can select another installed Chromium executable.

While a server is running, `node scripts/smoke.mjs` checks the documentary response and a representative local image. An alternate base URL can be supplied as its first argument.

## Deploy

Import this repository into Vercel using its Next.js preset, or deploy the production build on a Node hosting service that supports Next.js. No credentials or runtime API configuration are required. Vercel supplies the production hostname for social metadata automatically. On another host, optionally set `NEXT_PUBLIC_SITE_URL` to the public HTTPS origin. This variable contains no secret.

## Project organization

- `app/`: page composition, metadata, responsive design, and error pages.
- `components/`: reusable editorial layouts and interactive exhibits.
- `data/`: structured chapter, chronology, territory, glossary, figure, source, and media records.
- `public/images/`: optimized local WebP images.
- `public/maps/world.json`: public-domain Natural Earth reference geography.
- `scripts/prepare-geography.mjs`: generates local SVG path data from the reference geography; D3 is used during preparation rather than shipped as a map-rendering engine.
- `tests/`: browser interaction, responsive layout, asset, and accessibility checks.

The original era and treaty maps use lightweight SVG paths. The detailed atlas adds 90 sourced historical stories, five categories, six regional views, seven guided journeys, search, period and year filters, clustered markers, keyboard navigation, animated camera travel, route tracing, fullscreen, and perspective controls. MapLibre GL is loaded when the reader approaches the exhibit; the main narrative remains server-rendered. Motion respects reduced-motion preferences, and playback is opt-in.

Detailed coastlines, lakes, and rivers are stored locally. OpenStreetMap street tiles are enabled at close zooms (zoom 9 and above), with visible attribution, and can be switched off. They provide present-day orientation rather than reconstructed Ottoman streets. The map falls back to its local geography if the tile service is unavailable. The complete story index remains available without WebGL. No map account or API key is required.

`npm ci` and the prebuild script prepare the local MapLibre module worker in the ignored `public/maps/worker/` directory, including its BSD license. Detailed Natural Earth data can be regenerated with `node scripts/prepare-detailed-geography.mjs <input-directory>` from the four pinned 1:10m GeoJSON datasets identified in `data/field-map-provenance.json`. Historical content and tours live in `data/field-atlas.ts`.

Images use responsive Next.js optimization and lazy loading. A shared image component preserves the caption and attribution if an image fails to load.

## Historical and cartographic method

Read [RESEARCH.md](docs/RESEARCH.md) for the chronology, source audit, map limitations, and media provenance. The atlas is deliberately place-based: it shows political status at selected locations rather than inventing exact historical border polygons. Sèvres annotations identify proposed arrangements. The comparison is schematic, and its limitations are stated beside the control. Sourced reconstructions of 1683 extent and 1914 administrative divisions provide additional geographic context.

Do not convert nominal sovereignty into direct administration, proposals into implemented borders, or a later state’s name into an earlier independent country. Keep the separate milestones of 1918, 1922, 1923, and 1924 explicit when editing.

Image permissions belong to each asset. The 1914 administrative map is licensed CC BY-SA 3.0; its creator, source, and license are retained in the on-page credits and media records. Other assets have public-domain or Library of Congress “no known restrictions on reproduction” statements. Local conversion and resizing do not imply ownership of the originals.

## Cloud startup

Use the existing checkout at `/workspace/ottoman-empire-fall`. Each cloud task is already isolated; do not create a Git worktree unless the user explicitly requests one. Installed dependencies and prepared files can be retained in an environment snapshot, but running processes must be started again. Start `npm run dev -- --port 3000` in a managed background session, wait for the ready message, and run the smoke check. Reuse a healthy existing server instead of starting a duplicate.
