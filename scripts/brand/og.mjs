// Renders scripts/brand/og.html to public/og-image.png at 1200x630.
// Usage: npm run og (from scripts/brand)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { stampOrigin } from "./provenance.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "../..");
const mark = fs
  .readFileSync(path.join(repo, "public/brand/nookat-mark.svg"), "utf8")
  .replace(/ width="\d+" height="\d+"/, "");
const html = fs
  .readFileSync(path.join(here, "og.html"), "utf8")
  .replace("<!-- MARK -->", mark);

// Write next to the template so the relative font URLs resolve.
const page = path.join(here, ".og-render.html");
fs.writeFileSync(page, html);
const browser = await chromium.launch({ channel: "chrome" });
try {
  const tab = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await tab.goto("file://" + page);
  await tab.evaluate(() => document.fonts.ready);
  const missing = await tab.evaluate(() =>
    [...document.fonts]
      .filter((f) => f.status !== "loaded")
      .map((f) => f.family),
  );
  if (missing.length)
    throw new Error("fonts not loaded: " + missing.join(", "));
  await tab.screenshot({
    path: path.join(repo, "public/og-image.png"),
    type: "png",
  });
  stampOrigin(
    path.join(repo, "public/og-image.png"),
    "Origin: not AI-generated. Rendered from scripts/brand/og.html at 1200x630 by scripts/brand/og.mjs in headless Chrome, with Geist from src/assets/fonts. The app window shows illustrative sample data.",
  );
} finally {
  await browser.close();
  fs.rmSync(page, { force: true });
}
console.log("wrote public/og-image.png");
