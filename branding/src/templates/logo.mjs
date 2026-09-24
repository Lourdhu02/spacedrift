// 01-logo: SVG masters (outlined, font-independent) + PNG exports.
import { page, lockupSVG, markSVG, INK, WHITE, RED } from "../lib/brand.mjs";

const KINDS = ["horizontal", "stacked", "mark", "wordmark", "signature"];
const BGS = [
  { id: "on-white", scheme: "light", bg: WHITE },
  { id: "on-ink", scheme: "dark", bg: INK },
  { id: "on-red", scheme: "red", bg: RED },
  { id: "transparent-positive", scheme: "light", transparent: true },
  { id: "transparent-negative", scheme: "dark", transparent: true },
];

export function logoJobs() {
  const jobs = [];
  const files = [];

  // SVG masters: transparent, one per colourway
  for (const kind of KINDS) {
    for (const [name, scheme] of [["positive", "light"], ["negative", "dark"], ["for-red", "red"]]) {
      files.push({ out: `01-logo/svg/spacedrift-${kind}-${name}.svg`, content: lockupSVG(kind, scheme, { pad: 0 }).svg + "\n" });
    }
  }
  // The exact site mark (20x20 grid)
  files.push({ out: "01-logo/svg/spacedrift-mark-site-20grid.svg", content: markSVG("light") + "\n" });

  for (const kind of KINDS) {
    for (const b of BGS) {
      // Solid backgrounds get 2X clear space and a calmer aspect; transparent exports get exactly 1X.
      const opt = b.transparent ? { pad: 1 } : { pad: kind === "mark" ? 3 : 2, minAspect: kind === "mark" || kind === "stacked" ? 1 : 16 / 9 };
      const { svg, w, h } = lockupSVG(kind, b.scheme, { ...opt, bg: !b.transparent });
      const long = kind === "mark" ? 1024 : 1280;
      const scale = kind === "mark" ? 4 : 3;
      const W = w >= h ? long : Math.round((long * w) / h);
      const H = w >= h ? Math.round((long * h) / w) : long;
      const sized = svg.replace("<svg ", `<svg width="${W}" height="${H}" preserveAspectRatio="xMidYMid meet" `);
      jobs.push({
        out: `01-logo/png/spacedrift-${kind}-${b.id}.png`,
        W, H, scale,
        transparent: !!b.transparent,
        html: page({ W, H, bg: b.transparent ? "transparent" : b.bg, body: sized }),
        group: "logo",
      });
    }
  }
  return { jobs, files };
}
