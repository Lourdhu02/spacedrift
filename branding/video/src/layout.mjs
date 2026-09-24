// Per-format frame metrics and safe areas. Every scene composes from these,
// so each ratio gets its own layout rather than a crop.

export const FORMATS = {
  // Reels/Stories: top ~210px and bottom ~420px are covered by platform UI,
  // right edge has the like/comment column on the lower half.
  "9x16": { W: 1080, H: 1920, safe: { top: 210, bottom: 1500, left: 72, right: 1008 } },
  // Feed (IG + LinkedIn): full frame visible; IG grid previews at 3:4, so keep
  // content ~45px in from each side.
  "4x5": { W: 1080, H: 1350, safe: { top: 84, bottom: 1266, left: 84, right: 996 } },
  // LinkedIn desktop / web.
  "16x9": { W: 1920, H: 1080, safe: { top: 80, bottom: 1000, left: 120, right: 1800 } },
};

export function layout(fmt) {
  const f = FORMATS[fmt];
  if (!f) throw new Error(`unknown format ${fmt}`);
  const { W, H, safe } = f;
  const portrait = H > W;
  const cw = safe.right - safe.left;
  const chH = safe.bottom - safe.top;
  // unit: 1u == 1px at 1080 short edge
  const u = Math.min(W, H) / 1080;
  return {
    fmt, W, H, safe, portrait, u,
    tall: fmt === "9x16",
    cw, chH,
    cols: portrait ? 6 : 12,
    // content starts below the chrome row
    top: safe.top + 70 * u,
  };
}
