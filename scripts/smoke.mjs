import assert from "node:assert/strict";
const base = process.argv[2] || "http://127.0.0.1:3000";
const response = await fetch(base, { signal: AbortSignal.timeout(20000) });
assert.equal(response.status, 200, "Documentary must respond successfully");
const html = await response.text();
for (const marker of [
  'id="hero-title"',
  'id="world-of-empires"',
  'id="atlas"',
  'id="knowledge"',
  'id="sources"',
]) {
  assert.ok(html.includes(marker), `Missing documentary content: ${marker}`);
}
const image = await fetch(new URL("/images/constantinople.webp", base), {
  signal: AbortSignal.timeout(20000),
});
assert.equal(image.status, 200, "Archival image must respond successfully");
assert.ok(
  image.headers.get("content-type")?.includes("image/webp"),
  "Expected the local archival image",
);
console.log("Documentary content and local archival image verified.");
