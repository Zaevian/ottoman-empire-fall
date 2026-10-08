import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { chapters } from "../data/chapters";
import { questions } from "../data/learning";
import media from "../data/media.json";

test("all sixteen chapters, references, and local assets are present", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page).toHaveTitle(/The Fall of an Empire/);
  await expect(page.locator("h1")).toHaveCount(1);
  for (const c of chapters)
    await expect(page.locator(`#${c.id} h2`)).toBeVisible();
  const broken = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((a) => a.getAttribute("href")!)
        .filter((h) => h.length > 1 && !document.getElementById(h.slice(1))),
    );
  expect(broken).toEqual([]);
  for (const m of media) {
    const response = await request.get(m.src);
    expect(response.ok(), m.id).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/webp");
  }
  expect(errors).toEqual([]);
});

test("chapter navigation supports keyboard closing and in-page links", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open chapter navigation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Close chapter navigation" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "Open chapter navigation" }).click();
  await page
    .getByRole("navigation", { name: "All chapters" })
    .getByRole("link")
    .filter({ hasText: "Two treaties." })
    .click();
  await expect(page).toHaveURL(/#sevres-lausanne$/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("atlas eras, places, campaigns, and population layer respond", async ({
  page,
}) => {
  await page.goto("/#atlas");
  const atlas = page.locator("#atlas");
  await atlas
    .getByRole("button", { name: "1932 Statehood", exact: true })
    .click();
  await atlas.getByLabel("Select an atlas place").selectOption("baghdad");
  await expect(atlas.locator(".atlas-info")).toContainText(
    "ending the formal mandate relationship",
  );
  await atlas
    .getByRole("button", { name: "1914 Before the war", exact: true })
    .click();
  await expect(atlas.locator(".rule-badge")).toHaveText("Ottoman");
  await atlas
    .getByRole("button", { name: "Wartime fronts", exact: true })
    .click();
  await atlas.getByLabel("Select a campaign").selectOption("1");
  await expect(atlas.locator(".atlas-info h3")).toHaveText("Gallipoli");
  await atlas
    .getByRole("button", { name: "Kurdish regions", exact: true })
    .click();
  await expect(atlas.locator(".atlas-info")).toContainText(
    "neither an ethnic boundary nor a proposed state",
  );
  await atlas
    .getByRole("button", { name: "Political control", exact: true })
    .click();
  await atlas.getByRole("button", { name: "Zoom into atlas" }).click();
  await expect(
    atlas.getByRole("button", { name: "Zoom out of atlas" }),
  ).toBeEnabled();
  await atlas.getByRole("button", { name: "Reset atlas zoom" }).click();
  await expect(
    atlas.getByRole("button", { name: "Zoom out of atlas" }),
  ).toBeDisabled();
});

test("map pins are keyboard operable", async ({ page }) => {
  await page.goto("/#atlas");
  const pin = page
    .locator("#atlas")
    .getByRole("button", { name: "Damascus: Ottoman", exact: true });
  await pin.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#atlas .atlas-info h3")).toHaveText("Damascus");
});

test("treaty comparison responds to keyboard and pointer movement", async ({
  page,
}) => {
  await page.goto("/#sevres-lausanne");
  const slider = page.getByRole("slider", {
    name: "Compare Sèvres and Lausanne maps",
  });
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveValue("51");
  const box = await slider.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box!.x + box!.width * 0.5, box!.y + box!.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box!.x + box!.width * 0.8, box!.y + box!.height * 0.5);
  await page.mouse.up();
  expect(Number(await slider.inputValue())).toBeGreaterThan(70);
  await expect(page.locator(".comparison-overlay")).not.toHaveAttribute(
    "style",
    "clip-path: inset(0 50% 0 0);",
  );
});

test("timeline expands, filters, and reveals context", async ({ page }) => {
  await page.goto("/#chronology");
  const section = page.locator("#chronology");
  await expect(section.locator(".timeline-event")).toHaveCount(8);
  await section
    .getByRole("button", { name: "Continue through all 34 events" })
    .click();
  await expect(section.locator(".timeline-event")).toHaveCount(34);
  await section.getByRole("button", { name: "Diplomacy", exact: true }).click();
  const first = section.locator(".timeline-event details").first();
  await first.locator("summary").click();
  await expect(first.locator(".timeline-detail")).toBeVisible();
  await expect(section.locator(".timeline-year span")).toHaveText(
    Array(await section.locator(".timeline-event").count()).fill("Diplomacy"),
  );
});

test("territory and figure profiles preserve historical distinctions", async ({
  page,
}) => {
  await page.goto("/#territories");
  const explorer = page.locator("#territories");
  await explorer.getByRole("button", { name: "Israel", exact: true }).click();
  await expect(explorer.locator(".territory-profile")).toContainText(
    "Israel did not exist as a sovereign state in the Ottoman period",
  );
  await explorer
    .getByRole("button", { name: "Saudi Arabia", exact: true })
    .click();
  await expect(explorer.locator(".territory-profile")).toContainText(
    "1932 · Saudi Arabia proclaimed",
  );
  const figures = page.locator("#figures");
  await figures.getByRole("button", { name: /Talaat Pasha/ }).click();
  await expect(figures.locator(".figure-profile")).toContainText(
    "central organizer of the Armenian genocide",
  );
  await expect(figures.locator(".figure-photo")).toBeVisible();
});

test("documents, causal nodes, and counterfactuals expose substantive details", async ({
  page,
}) => {
  await page.goto("/#wartime-promises");
  await page
    .locator(".document-tabs")
    .getByRole("button", { name: /Balfour Declaration/ })
    .click();
  await expect(page.locator(".document-detail")).toContainText(
    "British policy declaration",
  );
  await page
    .locator(".cause-nodes")
    .getByRole("button", { name: /Occupation and proposals/ })
    .click();
  await expect(page.locator(".cause-detail")).toContainText(
    "Their goals conflicted",
  );
  const counter = page.locator(".counterfactuals details").first();
  await counter.locator("summary").click();
  await expect(counter.locator("p")).toContainText("Uncertain:");
});

test("glossary definitions open inline and can be dismissed", async ({
  page,
}) => {
  await page.goto("/#reform-and-pressure");
  await page
    .getByRole("button", { name: "Define Tanzimat", exact: true })
    .first()
    .click();
  const definition = page.locator("#definition-tanzimat");
  await expect(definition).toBeVisible();
  await expect(definition).toContainText("1839–1876");
  await definition.getByRole("button", { name: "Close definition" }).click();
  await expect(definition).not.toBeVisible();
});

test("a missing photograph preserves its caption and attribution", async ({
  page,
}) => {
  await page.route("**/_next/image?*", (route) => {
    const url = new URL(route.request().url());
    return url.searchParams.get("url") === "/images/bosphorus.webp"
      ? route.abort()
      : route.continue();
  });
  await page.goto("/#world-of-empires");
  const figure = page.locator("#world-of-empires .archival-image").first();
  await figure.scrollIntoViewIfNeeded();
  await expect(figure.locator(".image-unavailable")).toBeVisible();
  await expect(figure.locator("figcaption")).toContainText("Scutari");
  await expect(
    figure.getByRole("link", { name: /Attribution/ }),
  ).toHaveAttribute("href", "#credit-bosphorus");
});

test("reduced-motion preference removes scrolling and entrance animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const motion = await page.evaluate(() => ({
    scrolling: getComputedStyle(document.documentElement).scrollBehavior,
    entrance: getComputedStyle(document.querySelector(".hero-content")!)
      .animationName,
  }));
  expect(motion).toEqual({ scrolling: "auto", entrance: "none" });
});

test("quiz explains answers, completes ten questions, and resets", async ({
  page,
}) => {
  await page.goto("/#knowledge");
  const quiz = page.locator("#knowledge");
  await expect(
    quiz.getByRole("button", { name: "Next question" }),
  ).toBeDisabled();
  for (let i = 0; i < questions.length; i++) {
    await quiz
      .locator(".quiz-options button")
      .nth(i === 0 ? 0 : questions[i].answer)
      .click();
    await expect(quiz.locator(".quiz-feedback")).toContainText(
      questions[i].explanation,
    );
    await expect(quiz.locator(".quiz-options button").first()).toBeDisabled();
    await quiz
      .getByRole("button", {
        name: i === 9 ? "See your results" : "Next question",
      })
      .click();
  }
  await expect(quiz.locator(".quiz-score")).toHaveText("9/ 10");
  await quiz.getByRole("button", { name: "Try again" }).click();
  await expect(quiz.locator(".quiz-progress")).toContainText(
    "QUESTION 01 / 10",
  );
});

for (const width of [390, 768, 1440])
  test(`responsive layout and loaded photographs at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    for (const id of [
      "top",
      "world-of-empires",
      "atlas",
      "sevres-lausanne",
      "figures",
      "territories",
      "chronology",
      "knowledge",
      "sources",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        id,
      ).toBeTruthy();
    }
    for (const img of await page.locator(".archival-image img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (i: HTMLImageElement) => i.complete && i.naturalWidth > 0,
          ),
        )
        .toBeTruthy();
    }
    await page.screenshot({
      path: testInfo.outputPath(`documentary-${width}.png`),
    });
  });

test("automated WCAG checks pass on the complete page and chapter dialog", async ({
  page,
}) => {
  await page.goto("/");
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      description: v.description,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  await page.getByRole("button", { name: "Open chapter navigation" }).click();
  const dialog = await new AxeBuilder({ page })
    .include(".chapter-dialog")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dialog.violations).toEqual([]);
});
