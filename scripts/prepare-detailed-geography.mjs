import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";

// Natural Earth is public domain. Keep the source geometry within these modern
// reference bounds; historical locations are a separate editorial layer.
const directory = process.argv[2];
if (!directory) throw new Error("Supply the directory containing Natural Earth GeoJSON files.");
const bounds = [-18, 5, 72, 61];
const inside = [
  (p) => p[0] >= bounds[0], (p) => p[0] <= bounds[2],
  (p) => p[1] >= bounds[1], (p) => p[1] <= bounds[3],
];
const intersection = (a, b, edge) => {
  const axis = edge < 2 ? 0 : 1;
  const value = bounds[[0, 2, 1, 3][edge]];
  const t = (value - a[axis]) / (b[axis] - a[axis]);
  return axis === 0 ? [value, a[1] + t * (b[1] - a[1])] : [a[0] + t * (b[0] - a[0]), value];
};
const rounded = (p) => p.map((value) => +value.toFixed(5));
function ring(points) {
  let result = points.slice(0, -1);
  for (let edge = 0; edge < 4 && result.length; edge++) {
    const output = [];
    for (let i = 0; i < result.length; i++) {
      const a = result[(i + result.length - 1) % result.length], b = result[i];
      if (inside[edge](b)) {
        if (!inside[edge](a)) output.push(intersection(a, b, edge));
        output.push(b);
      } else if (inside[edge](a)) output.push(intersection(a, b, edge));
    }
    result = output;
  }
  if (result.length < 3) return null;
  result = result.map(rounded);
  result.push(result[0]);
  return result;
}
function polygon(rings) {
  const outer = ring(rings[0]);
  return outer ? [outer, ...rings.slice(1).map(ring).filter(Boolean)] : null;
}
function lines(points) {
  const parts = []; let part = [];
  for (let i = 1; i < points.length; i++) {
    let a = points[i - 1], b = points[i], valid = true;
    for (let edge = 0; edge < 4; edge++) {
      if (!inside[edge](a) && !inside[edge](b)) { valid = false; break; }
      if (!inside[edge](a)) a = intersection(a, b, edge);
      else if (!inside[edge](b)) b = intersection(a, b, edge);
    }
    if (!valid) { if (part.length > 1) parts.push(part); part = []; continue; }
    a = rounded(a); b = rounded(b);
    if (part.length && (part.at(-1)[0] !== a[0] || part.at(-1)[1] !== a[1])) {
      if (part.length > 1) parts.push(part); part = [];
    }
    if (!part.length) part.push(a);
    part.push(b);
  }
  if (part.length > 1) parts.push(part);
  return parts;
}
function clipped(geometry) {
  if (geometry.type === "Polygon" || geometry.type === "MultiPolygon") {
    const input = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
    const result = input.map(polygon).filter(Boolean);
    return result.length ? { type: "MultiPolygon", coordinates: result } : null;
  }
  if (geometry.type === "LineString" || geometry.type === "MultiLineString") {
    const input = geometry.type === "LineString" ? [geometry.coordinates] : geometry.coordinates;
    const result = input.flatMap(lines);
    return result.length ? { type: "MultiLineString", coordinates: result } : null;
  }
  return null;
}
mkdirSync("public/maps", { recursive: true });
const datasets = { land: "ne_10m_land", countries: "ne_10m_admin_0_countries", rivers: "ne_10m_rivers_lake_centerlines", lakes: "ne_10m_lakes" };
const provenance = { provider: "Natural Earth", license: "Public domain", scale: "1:10,000,000", revision: "ca96624a56bd078437bca8184e78163e5039ad19", bounds, datasets: [] };
for (const [key, name] of Object.entries(datasets)) {
  const raw = readFileSync(resolve(directory, `${name}.geojson`));
  const data = JSON.parse(raw);
  const features = data.features.flatMap((feature) => {
    const geometry = clipped(feature.geometry);
    if (!geometry) return [];
    return [{ type: "Feature", properties: { name: feature.properties.NAME_EN || feature.properties.NAME || feature.properties.name_en || feature.properties.name || "", rank: feature.properties.scalerank || 0 }, geometry }];
  });
  const output = JSON.stringify({ type: "FeatureCollection", features });
  writeFileSync(`public/maps/field-${key}.geojson`, output);
  provenance.datasets.push({ file: name, sha256: createHash("sha256").update(raw).digest("hex"), outputFeatures: features.length, outputBytes: Buffer.byteLength(output) });
  console.log(`${key}: ${features.length} features, ${Math.round(Buffer.byteLength(output) / 1024)} KiB`);
}
writeFileSync("data/field-map-provenance.json", JSON.stringify(provenance, null, 2) + "\n");
