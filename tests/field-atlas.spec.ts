import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mapStories, atlasTours } from "../data/field-atlas";
import { sources } from "../data/sources";

async function openAtlas(page: Page) {
  // Tile-service availability is tested separately. Camera, gestures, and
  // historical overlays use a deterministic neutral raster during this suite.
  await page.route("https://tile.openstreetmap.org/**", route => route.fulfill({ status: 200, contentType: "image/png", body: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aD1sAAAAASUVORK5CYII=", "base64") }));
  await page.goto("/#field-atlas");
  await page.locator("#field-atlas").scrollIntoViewIfNeeded();
  await expect(page.locator('.field-map-stage[data-ready="true"]')).toBeVisible({ timeout: 30000 });
}

test("historical entries and journeys have complete reference records", () => {
  expect(mapStories.length).toBe(90);
  expect(new Set(mapStories.map(story => story.id)).size).toBe(90);
  for (const story of mapStories) {
    expect(story.sources.length, story.id).toBeGreaterThan(0);
    for (const id of story.sources) expect(sources.some(source => source.id === id), `${story.id}: source ${id}`).toBeTruthy();
    expect(story.coordinates[0]).toBeGreaterThan(-15);
    expect(story.coordinates[0]).toBeLessThan(65);
    expect(story.coordinates[1]).toBeGreaterThan(6);
    expect(story.coordinates[1]).toBeLessThan(59);
    if (story.kind === "city") expect(story.cityOrigin, story.id).toBeTruthy();
  }
  for (const tour of atlasTours) for (const id of tour.stops)
    expect(mapStories.some(story => story.id === id), `${tour.id}: ${id}`).toBeTruthy();
});

test("search and city filters distinguish original founding from Ottoman conquest", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await openAtlas(page);
  await expect(page.locator(".field-story-list button")).toHaveCount(90);
  await page.getByRole("button", { name: "Cities & foundations", exact: true }).click();
  await page.getByRole("searchbox", { name: "Search detailed atlas stories" }).fill("Bursa");
  await expect(page.locator(".field-story-list button")).toHaveCount(2);
  await page.locator(".field-story-list").getByRole("button", { name: /Bursa becomes an Ottoman capital/ }).click();
  await expect(page.locator(".field-origin")).toContainText("not an Ottoman foundation");
  await expect(page.locator(".field-map-stage")).toHaveAttribute("data-zoom", "11.000");
  await page.getByRole("searchbox").fill("nothing-matches-this");
  await expect(page.locator(".field-empty")).toBeVisible();
  await page.getByRole("button", { name: "Show all 90 stories" }).click();
  await expect(page.locator(".field-story-list button")).toHaveCount(90);
  expect(errors).toEqual([]);
});

test("Gallipoli journeys move the camera to separate beaches and support playback", async ({ page }) => {
  await openAtlas(page);
  await page.getByRole("button", { name: /6 STOPS Gallipoli, beach by beach/ }).click();
  await expect(page.locator(".field-story-content h4")).toHaveText("The naval assault on the Dardanelles");
  await page.getByRole("button", { name: "Next journey stop" }).click();
  await expect(page.locator(".field-story-content h4")).toHaveText("The landings at Cape Helles");
  const stage = page.locator(".field-map-stage");
  await expect(stage).toHaveAttribute("data-zoom", "14.000");
  await expect(stage).toHaveAttribute("data-longitude", "26.18350");
  await page.getByRole("button", { name: "Next journey stop" }).click();
  await expect(stage).toHaveAttribute("data-longitude", "26.27600");
  await expect(page.locator(".field-story-content h4")).toHaveText("The ANZAC landing");
  await page.getByRole("button", { name: "Previous journey stop" }).click();
  await expect(stage).toHaveAttribute("data-longitude", "26.18350");
  await page.getByRole("button", { name: "Play guided journey" }).click();
  await expect(page.getByRole("button", { name: "Pause guided journey" })).toBeVisible();
  await page.getByRole("button", { name: "Pause guided journey" }).click();
  await expect(page.locator(".field-journey")).toContainText("learning itinerary, not troop movements");
  await expect(page.locator(".field-story-content")).toHaveCSS("animation-name", "none");
});

test("clusters expand and mouse and keyboard gestures change geographic position", async ({ page }) => {
  await openAtlas(page);
  const stage = page.locator(".field-map-stage");
  await expect(page.locator(".field-cluster").first()).toBeVisible();
  const initialZoom = Number(await stage.getAttribute("data-zoom"));
  await page.locator(".field-cluster").first().click();
  await expect.poll(async () => Number(await stage.getAttribute("data-zoom"))).toBeGreaterThan(initialZoom);
  await page.getByRole("button", { name: "Gallipoli", exact: true }).click();
  const canvas = page.locator(".field-map-canvas canvas");
  await canvas.scrollIntoViewIfNeeded();
  await canvas.focus();
  const longitude = Number(await stage.getAttribute("data-longitude"));
  await page.keyboard.press("ArrowRight");
  await expect.poll(async () => Number(await stage.getAttribute("data-longitude"))).not.toBe(longitude);
  const box = await canvas.boundingBox();
  const beforeDrag = Number(await stage.getAttribute("data-longitude"));
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await page.mouse.down();
  await page.mouse.move(box!.x + box!.width / 2 + 70, box!.y + box!.height / 2, { steps: 12 });
  await page.mouse.up();
  await expect.poll(async () => Number(await stage.getAttribute("data-longitude"))).not.toBe(beforeDrag);
  await page.getByRole("button", { name: "Reset detailed map to overview" }).click();
  await expect.poll(async () => Number(await stage.getAttribute("data-zoom"))).toBeLessThan(5);
});

test("period and year filters narrow the mapped stories", async ({ page }) => {
  await openAtlas(page);
  await page.getByLabel("Detailed atlas period").selectOption("war");
  const warStories = mapStories.filter(story => story.year >= 1914 && story.year <= 1918);
  await expect(page.locator(".field-story-list button")).toHaveCount(warStories.length);
  const slider = page.getByRole("slider", { name: "Show historical events through year" });
  await slider.fill("1915");
  await expect(page.locator(".field-story-list button")).toHaveCount(warStories.filter(story => story.year <= 1915).length);
  await slider.fill("1400");
  await expect(page.locator(".field-empty")).toBeVisible();
  await page.getByRole("button", { name: "Reset all filters" }).click();
  await expect(page.locator(".field-story-list button")).toHaveCount(90);
});

test("street-map network failure leaves the local atlas usable", async ({ page }) => {
  await openAtlas(page);
  await page.route("https://tile.openstreetmap.org/**", route => route.fulfill({ status: 503, body: "Unavailable" }));
  await page.getByRole("searchbox").fill("Bursa");
  await page.locator(".field-story-list").getByRole("button", { name: /Bursa becomes an Ottoman capital/ }).click();
  await expect(page.locator(".field-notice")).toContainText("Street tiles could not be loaded");
  await expect(page.getByLabel("Modern street detail at close zoom", { exact: true })).not.toBeChecked();
  await page.getByRole("button", { name: "Reset all filters" }).click();
  await expect(page.locator(".field-story-list button")).toHaveCount(90);
  await page.getByLabel("Modern borders for orientation").check();
  await expect(page.getByLabel("Modern borders for orientation")).toBeChecked();
});

test("the detailed atlas is accessible and fits a phone viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openAtlas(page);
  await page.getByRole("searchbox").fill("Basra");
  await page.locator(".field-story-list").getByRole("button", { name: /Basra and the Gulf connection/ }).click();
  await expect(page.locator(".field-origin")).toContainText("Founded in the seventh century");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBeFalsy();
  const results = await new AxeBuilder({ page }).include("#field-atlas").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
});

test("normal-motion journeys animate and settle on the selected locality", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await openAtlas(page);
  await page.getByRole("button", { name: /6 STOPS Gallipoli, beach by beach/ }).click();
  await expect(page.locator(".field-story-content")).toHaveCSS("animation-name", "field-story-in");
  await expect(page.locator(".field-map-stage")).toHaveAttribute("data-longitude", "26.39900");
  await page.getByRole("button", { name: "Next journey stop" }).click();
  await expect(page.locator(".field-map-stage")).toHaveAttribute("data-longitude", "26.18350");
  await expect(page.locator(".field-map-stage")).toHaveAttribute("data-zoom", "14.000");
});

test("a phone can pinch to zoom without horizontal page overflow", async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openAtlas(page);
  await page.getByRole("button", { name: "Gallipoli", exact: true }).click();
  const canvas = page.locator(".field-map-canvas canvas");
  await canvas.scrollIntoViewIfNeeded();
  const box = await canvas.boundingBox();
  const stage = page.locator(".field-map-stage");
  const initialZoom = Number(await stage.getAttribute("data-zoom"));
  const client = await context.newCDPSession(page);
  await client.send("Emulation.setTouchEmulationEnabled", { enabled: true });
  const x = box!.x + box!.width / 2;
  const y = box!.y + box!.height / 2;
  const points = (spread: number) => [{ x: x-spread, y, id: 1 }, { x: x+spread, y, id: 2 }];
  await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: points(25) });
  for (const spread of [30,40,50,60,70]) await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: points(spread) });
  await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect.poll(async () => Number(await stage.getAttribute("data-zoom"))).toBeGreaterThan(initialZoom + 0.4);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBeFalsy();
});
