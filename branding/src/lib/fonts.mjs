// Geist + Geist Mono, loaded from the official `geist` npm package.
// - fontFaceCSS(): @font-face rules with file:// URLs for the Playwright pages
// - outline():     text -> SVG path (used for the logo masters, so the SVGs
//                  never depend on the font being installed)
import { pathToFileURL, fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import * as fontkit from "fontkit";

const geistRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "node_modules", "geist");
export const FONT_DIR = path.join(geistRoot, "dist", "fonts");

const sans = (w) => path.join(FONT_DIR, "geist-sans", `Geist-${w}.ttf`);
const mono = (w) => path.join(FONT_DIR, "geist-mono", `GeistMono-${w}.ttf`);

const WEIGHTS = { Light: 300, Regular: 400, Medium: 500, SemiBold: 600, Bold: 700 };

for (const w of Object.keys(WEIGHTS)) {
  for (const f of [sans(w), mono(w)]) if (!fs.existsSync(f)) throw new Error(`Missing font file: ${f} (run npm install in branding/src)`);
}

// Family names are deliberately unique so a missing file can never be
// silently replaced by a system font with the same name.
export const SANS = "SD Geist";
export const MONO = "SD Geist Mono";

export function fontFaceCSS() {
  let css = "";
  for (const [w, n] of Object.entries(WEIGHTS)) {
    css += `@font-face{font-family:"${SANS}";src:url("${pathToFileURL(sans(w))}") format("truetype");font-weight:${n};font-style:normal;font-display:block}\n`;
    css += `@font-face{font-family:"${MONO}";src:url("${pathToFileURL(mono(w))}") format("truetype");font-weight:${n};font-style:normal;font-display:block}\n`;
  }
  return css;
}

const cache = new Map();
function open(file) {
  if (!cache.has(file)) cache.set(file, fontkit.openSync(file));
  return cache.get(file);
}

/**
 * Outline a run of text as a single SVG path.
 * Coordinates: baseline at y=0, y grows downward (SVG), x starts at 0 = pen origin.
 * size = font size in output units; tracking in em (e.g. -0.05).
 * Returns { d, advance, ink: {minX,maxX,minY,maxY}, ascender (d-height) }.
 */
export function outline(text, { weight = "SemiBold", size = 1000, tracking = -0.05, family = "sans", pairs = {} } = {}) {
  const font = open(family === "mono" ? mono(weight) : sans(weight));
  const s = size / font.unitsPerEm;
  // Browsers switch optional ligatures off when letter-spacing is set; do the same.
  const run = font.layout(text, { liga: false, clig: false, dlig: false });
  let x = 0;
  const parts = [];
  const ink = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity };
  run.glyphs.forEach((g, i) => {
    const pos = run.positions[i];
    const gx = x + pos.xOffset * s;
    const gy = -pos.yOffset * s;
    const p = g.path.scale(s, -s).translate(gx, gy);
    const d = p.toSVG();
    if (d) parts.push(d);
    const bb = g.bbox;
    if (bb && isFinite(bb.minX) && bb.maxX > bb.minX) {
      ink.minX = Math.min(ink.minX, gx + bb.minX * s);
      ink.maxX = Math.max(ink.maxX, gx + bb.maxX * s);
      ink.minY = Math.min(ink.minY, gy - bb.maxY * s);
      ink.maxY = Math.max(ink.maxY, gy - bb.minY * s);
    }
    const pair = (text[i] || "") + (text[i + 1] || "");
    x += pos.xAdvance * s + (i < run.glyphs.length - 1 ? tracking * size + ((pairs[pair] || 0) * size) / 1000 : 0);
  });
  const dGlyph = font.glyphForCodePoint("d".codePointAt(0));
  return {
    d: parts.join(" ").replace(/(\d+\.\d{2})\d+/g, "$1"),
    advance: x,
    ink,
    ascender: dGlyph.bbox.maxY * s,
    capHeight: font.capHeight * s,
    xHeight: font.xHeight * s,
  };
}
