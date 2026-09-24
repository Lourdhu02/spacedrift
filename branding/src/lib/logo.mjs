// Logo construction. Everything is derived from one unit `u`:
//   mark = 20u square field: ink square 15u (x0..15, y5..20) + red square 7u (x13..20, y0..7)
//   in lockups the ink square height = ascender height of Geist 600 ("d"), so u = asc / 15
//   clear space X = 7u (the red square)
import { outline } from "./fonts.mjs";

export const INK = "#0A0A0A";
export const WHITE = "#FFFFFF";
export const RED = "#E10600";

// scheme -> colours of [big square, small square, wordmark, full-stop square]
export const SCHEMES = {
  light: { big: INK, small: RED, text: INK, dot: RED, bg: WHITE },
  dark: { big: WHITE, small: RED, text: WHITE, dot: RED, bg: INK },
  red: { big: WHITE, small: INK, text: WHITE, dot: INK, bg: RED },
};

const r2 = (n) => Math.round(n * 100) / 100;
const rect = (x, y, w, h, fill) => `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w)}" height="${r2(h)}" fill="${fill}"/>`;

/** Mark with its top-left at (x, y) and size 20u. */
export function markShapes(x, y, u, c) {
  return rect(x, y + 5 * u, 15 * u, 15 * u, c.big) + rect(x + 13 * u, y, 7 * u, 7 * u, c.small);
}

/** Standalone mark SVG exactly as used on the site (viewBox 0 0 20 20). */
export function markSVG(scheme = "light", { size, title = "spacedrift" } = {}) {
  const c = SCHEMES[scheme];
  const wh = size ? ` width="${size}" height="${size}"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${wh} shape-rendering="crispEdges"><title>${title}</title>${markShapes(0, 0, 1, c)}</svg>`;
}

const F = 100; // wordmark font size in SVG units
// Optical pair spacing for the logo wordmark at -0.05em (font units per 1000):
// open the round-to-round contacts that would otherwise fuse, and let the
// f and t crossbars overlap into one clean bar instead of a hairline seam.
export const WORDMARK_PAIRS = { ac: 16, ce: 18, ed: 16, ft: -8 };

/**
 * Build a lockup. Returns { body, box:{x,y,w,h}, X } in SVG units, where body
 * is SVG markup and box is the tight bounding box of the artwork.
 * kind: mark | wordmark | horizontal | stacked | signature
 */
export function lockup(kind, scheme = "light") {
  const c = SCHEMES[scheme];
  const t = outline("spacedrift", { size: F, tracking: -0.05, pairs: WORDMARK_PAIRS });
  const u = t.ascender / 15; // ink square = ascender height
  const word = (dx, dy) => `<path transform="translate(${r2(dx)} ${r2(dy)})" fill="${c.text}" d="${t.d}"/>`;
  const dotSize = 3.5 * u; // half the red square
  const dotGap = 0.9 * u;

  if (kind === "mark") {
    const U = 10;
    return { body: markShapes(0, 0, U, c), box: { x: 0, y: 0, w: 20 * U, h: 20 * U }, X: 7 * U, u: U };
  }
  if (kind === "wordmark" || kind === "signature") {
    // baseline at y=0; artwork from ink.minX
    let body = word(-t.ink.minX, 0);
    let w = t.ink.maxX - t.ink.minX;
    if (kind === "signature") {
      body += rect(w + dotGap, -dotSize, dotSize, dotSize, c.dot);
      w += dotGap + dotSize;
    }
    const top = -t.ascender;
    const bottom = t.ink.maxY; // descender of "p"
    return { body, box: { x: 0, y: top, w, h: bottom - top }, X: 7 * u, u };
  }
  if (kind === "horizontal") {
    const gap = 6 * u;
    const body = markShapes(0, -20 * u, u, c) + word(20 * u + gap - t.ink.minX, 0);
    const w = 20 * u + gap + (t.ink.maxX - t.ink.minX);
    const top = -20 * u;
    const bottom = t.ink.maxY;
    return { body, box: { x: 0, y: top, w, h: bottom - top }, X: 7 * u, u };
  }
  if (kind === "stacked") {
    const U = 1.8 * u; // bigger mark above the word
    const gap = 6 * U;
    const markTop = -t.ascender - gap - 20 * U;
    const body = markShapes(0, markTop, U, c) + word(-t.ink.minX, 0);
    const w = Math.max(20 * U, t.ink.maxX - t.ink.minX);
    const bottom = t.ink.maxY;
    return { body, box: { x: 0, y: markTop, w, h: bottom - markTop }, X: 7 * U, u: U };
  }
  throw new Error(`unknown lockup ${kind}`);
}

/**
 * Full SVG document for a lockup with `pad` clear-space units (multiples of X)
 * around it. bg=true paints the scheme background.
 */
export function lockupSVG(kind, scheme = "light", { pad = 1, bg = false, minAspect = 0 } = {}) {
  const L = lockup(kind, scheme);
  const p = L.X * pad;
  let x = L.box.x - p, y = L.box.y - p, w = L.box.w + 2 * p, h = L.box.h + 2 * p;
  if (minAspect && w / h < minAspect) { const nw = h * minAspect; x -= (nw - w) / 2; w = nw; }
  const bgRect = bg ? rect(x, y, w, h, SCHEMES[scheme].bg) : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r2(x)} ${r2(y)} ${r2(w)} ${r2(h)}"><title>spacedrift</title>${bgRect}${L.body}</svg>`;
  return { svg, w, h, L };
}

/** Inline wordmark sized by font-size in px, for use inside templates. */
export function wordmarkInline(px, scheme = "light", { signature = false } = {}) {
  const L = lockup(signature ? "signature" : "wordmark", scheme);
  const k = px / F;
  return `<svg class="wm" viewBox="${r2(L.box.x)} ${r2(L.box.y)} ${r2(L.box.w)} ${r2(L.box.h)}" width="${r2(L.box.w * k)}" height="${r2(L.box.h * k)}" aria-label="spacedrift">${L.body}</svg>`;
}

/** Inline lockup scaled so its artwork width = px. */
export function lockupInline(kind, scheme, { width, height } = {}) {
  const L = lockup(kind, scheme);
  const k = width ? width / L.box.w : height / L.box.h;
  return `<svg class="lk" viewBox="${r2(L.box.x)} ${r2(L.box.y)} ${r2(L.box.w)} ${r2(L.box.h)}" width="${r2(L.box.w * k)}" height="${r2(L.box.h * k)}" aria-label="spacedrift">${L.body}</svg>`;
}

/** Inline mark, `px` = full 20u size. */
export function markInline(px, scheme = "light") {
  const c = SCHEMES[scheme];
  return `<svg class="mk" viewBox="0 0 20 20" width="${px}" height="${px}" shape-rendering="geometricPrecision">${markShapes(0, 0, 1, c)}</svg>`;
}
