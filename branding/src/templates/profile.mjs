// 02-profile: circle-safe profile pictures. Every platform crops to a circle;
// the mark's bounding box is sized so its outermost corners (the red square's
// top-right and the big square's bottom-left) sit inside the central 70% circle.
import { page, markShapes, SCHEMES } from "../lib/brand.mjs";

const B = 1024; // base canvas
const SIDE = 496; // mark size: diagonal 701px < 70% circle (717px)

export const PROFILE_VARIANTS = [
  { id: "white", scheme: "light" },
  { id: "ink", scheme: "dark" },
  { id: "red", scheme: "red" },
];

// size = exported pixel size
export const PROFILE_TARGETS = [
  { id: "master-4096", size: 4096 },
  { id: "instagram-1080", size: 1080 },
  { id: "threads-1080", size: 1080 },
  { id: "facebook-1080", size: 1080 },
  { id: "youtube-800", size: 800 },
  { id: "x-400", size: 400 },
  { id: "linkedin-400", size: 400 },
];

export function profileHTML(scheme) {
  const c = SCHEMES[scheme];
  const u = SIDE / 20;
  const o = (B - SIDE) / 2;
  const svg = `<svg width="${B}" height="${B}" viewBox="0 0 ${B} ${B}"><rect width="${B}" height="${B}" fill="${c.bg}"/>${markShapes(o, o, u, c)}</svg>`;
  return page({ W: B, H: B, bg: c.bg, body: svg });
}

export function profileJobs() {
  const jobs = [];
  for (const v of PROFILE_VARIANTS) {
    const html = profileHTML(v.scheme);
    for (const t of PROFILE_TARGETS) {
      jobs.push({ out: `02-profile/${v.id}/spacedrift-profile-${v.id}-${t.id}.png`, W: B, H: B, scale: t.size / B, html, group: "profile" });
    }
  }
  return { jobs };
}
