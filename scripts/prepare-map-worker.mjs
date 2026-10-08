import { copyFile, mkdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
const require = createRequire(import.meta.url);
const packageDirectory = path.dirname(require.resolve("maplibre-gl/package.json"));
const metadata = JSON.parse(await readFile(path.join(packageDirectory, "package.json"), "utf8"));
const destination = new URL("../public/maps/worker/", import.meta.url);
await mkdir(destination, { recursive: true });
for (const file of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  await copyFile(path.join(packageDirectory, "dist", file), new URL(file, destination));
}
await copyFile(path.join(packageDirectory, "LICENSE.txt"), new URL("LICENSE.txt", destination));
console.log(`Prepared local MapLibre ${metadata.version} worker.`);
