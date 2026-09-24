// Shared layout grammar for social templates: grid, top/bottom mono strips.
import { grid, label, hline, inkA, whiteA, INK, WHITE, RED, markInline, text } from "../lib/brand.mjs";

/**
 * Frame chrome: 6-col grid, top strip (labels + rule) and bottom strip.
 * top/bottom: y of the rules. tl/tr/bl/br: label html. dark: on ink.
 */
export function chrome({ W, H, M = 80, top = 112, bottom, tl = "", tr = "", bl = "", br = "", dark = false, size = 20, mark = false, gridTop = 0, gridBottom }) {
  const lc = dark ? whiteA(0.62) : inkA(0.62);
  const rc = dark ? whiteA(0.16) : inkA(0.14);
  const gc = dark ? whiteA(0.07) : inkA(0.06);
  bottom ??= H - 112;
  gridBottom ??= H;
  let s = grid({ x: M, y: gridTop, w: W - 2 * M, h: gridBottom - gridTop, color: gc });
  const ly = top - size * 2;
  if (tl || mark)
    s += text({ x: M, y: ly - 2, html: `<div style="display:flex;align-items:center;gap:${size * 0.7}px">${mark ? markInline(size * 1.35, dark ? "dark" : "light") : ""}<span class="mono" style="font-size:${size}px;color:${dark ? WHITE : INK}">${tl}</span></div>` });
  if (tr) s += label({ x: M, y: ly, right: true, size, color: lc, html: tr });
  if (top) s += hline({ x: M, y: top, w: W - 2 * M, color: rc });
  if (bottom) {
    s += hline({ x: M, y: bottom, w: W - 2 * M, color: rc });
    if (bl) s += label({ x: M, y: bottom + size * 1.2, size, color: lc, html: bl });
    if (br) s += label({ x: M, y: bottom + size * 1.2, right: true, size, color: lc, html: br });
  }
  return s;
}

export const redSpan = (t) => `<span style="color:${RED}">${t}</span>`;
