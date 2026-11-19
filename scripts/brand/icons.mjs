// Generates the Nookat logo kit (SVG sources and raster exports) into public/.
// Usage: npm run icons (from scripts/brand)
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { chromium } from "playwright-core";
import { stampOrigin } from "./provenance.mjs";
import { markBody } from "./stack.mjs";

const require = createRequire(import.meta.url);
const opentype = require("opentype.js");

const repo = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const pub = path.join(repo, "public");
const brandDir = path.join(pub, "brand");
fs.mkdirSync(brandDir, { recursive: true });

const C = {
  ink: "#10141b",
  white: "#ffffff",
};

// ---- Mark -----------------------------------------------------------------
// The app's three-layer blue stack; geometry and colors live in stack.mjs.
const mark = (x = 0, y = 0, size = 64) =>
  markBody(`translate(${x} ${y}) scale(${size / 64})`);

const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}">` +
  `<title>${title}</title>${body}</svg>\n`;

// ---- Wordmark: "nookat" outlined from Geist SemiBold ----------------------
const fontFile =
  require.resolve("@fontsource/geist-sans/files/geist-sans-latin-600-normal.woff");
const buf = fs.readFileSync(fontFile);
const font = opentype.parse(
  buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
);

function wordmarkPath(text, fontSize, x, baseline, tracking) {
  const glyphs = font.stringToGlyphs(text);
  const scale = fontSize / font.unitsPerEm;
  let cursor = x;
  const parts = [];
  glyphs.forEach((g, i) => {
    parts.push(g.getPath(cursor, baseline, fontSize).toPathData(2));
    let adv = g.advanceWidth * scale + tracking * fontSize;
    if (i < glyphs.length - 1)
      adv += font.getKerningValue(g, glyphs[i + 1]) * scale;
    cursor += adv;
  });
  return { d: parts.join(""), width: cursor - x - tracking * fontSize };
}

// Lockup proportions follow the site header: 32px mark, 19px wordmark, 10px gap.
const FONT_SIZE = 19;
const TRACKING = -0.035;
const GAP = 10;
const asc =
  (font.charToGlyph("k").getBoundingBox().y2 / font.unitsPerEm) * FONT_SIZE;
const baseline = 16 + asc / 2; // centre ascender-to-baseline on the mark
const wm = wordmarkPath("nookat", FONT_SIZE, 32 + GAP, baseline, TRACKING);
const LOCKUP_W = Math.ceil(32 + GAP + wm.width + 1);

const files = {
  "brand/nookat-mark.svg": svg(64, 64, mark(), "Nookat"),
  // Horizontal lockups: ink wordmark for light grounds, white for dark ones.
  "brand/nookat-logo.svg": svg(
    LOCKUP_W,
    32,
    mark(0, 0, 32) + `<path d="${wm.d}" fill="${C.ink}"/>`,
    "Nookat",
  ),
  "brand/nookat-logo-inverse.svg": svg(
    LOCKUP_W,
    32,
    mark(0, 0, 32) + `<path d="${wm.d}" fill="${C.white}"/>`,
    "Nookat",
  ),
  "favicon.svg": svg(64, 64, mark(), "Nookat"),
};

// App icon on Apple's 1024 grid: 824px ink body, 100px margin for the shadow.
// The filter runs in sRGB: in linearRGB the shadow pass shifts and bands the
// near-black body in the 8-bit PNG.
const appIcon =
  `<defs>` +
  `<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#000" flood-opacity="0.28"/></filter>` +
  `</defs>` +
  `<rect x="100" y="100" width="824" height="824" rx="185" fill="${C.ink}" filter="url(#shadow)"/>` +
  `<rect x="100.5" y="100.5" width="823" height="823" rx="184.5" fill="none" stroke="#ffffff" stroke-opacity="0.08"/>` +
  mark(242, 242, 540);
files["brand/nookat-app-icon.svg"] = svg(
  1024,
  1024,
  appIcon,
  "Nookat app icon",
);

// Earlier kits shipped arch-mark variants; they no longer match the mark.
for (const stale of [
  "brand/nookat-mark-lime.svg",
  "brand/nookat-glyph.svg",
  "brand/nookat-glyph-lime.svg",
])
  fs.rmSync(path.join(pub, stale), { force: true });

for (const [rel, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(pub, rel), content);
}

// ---- Rasters --------------------------------------------------------------
const browser = await chromium.launch({ channel: "chrome" });
async function rasterize(svgContent, size, out, { background } = {}) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  const bg = background
    ? `background:${background};`
    : "background:transparent;";
  const inner = svgContent.replace(
    /width="\d+" height="\d+"/,
    `width="${size}" height="${size}"`,
  );
  await page.setContent(
    `<html><body style="margin:0;${bg}">${inner}</body></html>`,
  );
  await page.screenshot({
    path: out,
    omitBackground: !background,
    clip: { x: 0, y: 0, width: size, height: size },
  });
  await page.close();
  return fs.readFileSync(out);
}

// Ink tiles for home screens and the web manifest: apple-touch is full-bleed
// because iOS applies its own mask; the manifest icons carry their own corners.
const touchIcon = svg(
  64,
  64,
  `<rect width="64" height="64" fill="${C.ink}"/>` + mark(13, 13, 38),
  "Nookat",
);
const manifestIcon = svg(
  64,
  64,
  `<rect width="64" height="64" rx="14" fill="${C.ink}"/>` + mark(12, 12, 40),
  "Nookat",
);

const shipped = [
  [touchIcon, 180, "apple-touch-icon.png", "an ink square with the mark"],
  [manifestIcon, 192, "icon-192.png", "an ink tile with the mark"],
  [manifestIcon, 512, "icon-512.png", "an ink tile with the mark"],
  [
    files["brand/nookat-app-icon.svg"],
    1024,
    "brand/nookat-app-icon-1024.png",
    "public/brand/nookat-app-icon.svg",
  ],
];
for (const [svg, size, rel, source] of shipped) {
  const out = path.join(pub, rel);
  await rasterize(svg, size, out);
  stampOrigin(
    out,
    `Origin: not AI-generated. Rendered from ${source} at ${size}px by scripts/brand/icons.mjs in headless Chrome. Nookat mark: the app's three-layer blue stack (#1494f2, #1c85db, #1f6bb2), redrawn as vector from the app icon, on ink #10141b.`,
  );
}

// favicon.ico with PNG-encoded 16/32/48 entries.
const icoSizes = [16, 32, 48];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "nookat-ico-"));
const pngs = [];
for (const s of icoSizes)
  pngs.push(
    await rasterize(files["favicon.svg"], s, path.join(tmp, `${s}.png`)),
  );
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = header.length;
pngs.forEach((png, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(icoSizes[i] % 256, e);
  header.writeUInt8(icoSizes[i] % 256, e + 1);
  header.writeUInt8(0, e + 2);
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(png.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += png.length;
});
fs.writeFileSync(
  path.join(pub, "favicon.ico"),
  Buffer.concat([header, ...pngs]),
);
fs.rmSync(tmp, { recursive: true });

await browser.close();
console.log("lockup width", LOCKUP_W, "baseline", baseline.toFixed(2));
console.log(Object.keys(files).join("\n"));
