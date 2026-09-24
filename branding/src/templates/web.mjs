// 06-web: favicon.svg (adapts to dark mode), pixel-snapped PNG favicons,
// favicon.ico (16/32/48), apple-touch-icon, PWA icons and the Open Graph image.
import fs from "node:fs";
import path from "node:path";
import { page, field, label, headline, text, hline, bbox, lockupInline, markShapes, SCHEMES, inkA, INK, WHITE, RED, CONTACT } from "../lib/brand.mjs";
import { chrome } from "./common.mjs";

// Hand-snapped geometry per size so edges land on whole pixels: [ink x,y,w,h], [red x,y,w,h]
const SNAP = {
  16: [[0, 4, 12, 12], [10, 0, 6, 6]],
  32: [[0, 8, 24, 24], [21, 0, 11, 11]],
  48: [[0, 12, 36, 36], [31, 0, 17, 17]],
};

export const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  <style>.i{fill:#0a0a0a}@media (prefers-color-scheme:dark){.i{fill:#fff}}</style>
  <rect class="i" x="0" y="5" width="15" height="15"/>
  <rect x="13" y="0" width="7" height="7" fill="#e10600"/>
</svg>
`;

function tinyIcon(size) {
  const [a, b] = SNAP[size];
  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><rect x="${a[0]}" y="${a[1]}" width="${a[2]}" height="${a[3]}" fill="${INK}"/><rect x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" fill="${RED}"/></svg>`;
  return page({ W: size, H: size, bg: "transparent", body: svg });
}

// Opaque square tile with the mark inside the maskable safe zone (inner 80% circle).
function tileIcon(B, side) {
  const u = side / 20, o = (B - side) / 2;
  const svg = `<svg width="${B}" height="${B}" viewBox="0 0 ${B} ${B}"><rect width="${B}" height="${B}" fill="${WHITE}"/>${markShapes(o, o, u, SCHEMES.light)}</svg>`;
  return page({ W: B, H: B, body: svg });
}

function ogImage() {
  const W = 1200, H = 630, M = 64;
  const box = { x: 800, y: 150, w: 300, h: 250 };
  const body =
    field({ x: 0, y: 0, w: W, h: H, size: 12, focal: [[950, 275, 330]], hot: [[box.x, box.y, box.w, box.h]], redAt: 2, clear: [[M, 120, 680, 400, 70]], seed: 31 }) +
    chrome({ W, H, M, top: 92, bottom: H - 76, size: 15 }) +
    `<div class="abs" style="left:${M}px;top:44px">${lockupInline("horizontal", "light", { height: 30 })}</div>` +
    label({ x: M, y: 56, right: true, size: 15, html: "ML &amp; AI studio · Bengaluru, India" }) +
    bbox({ x: box.x, y: box.y, w: box.w, h: box.h, label: "signal 0.97", size: 13, weight: 2 }) +
    headline({ x: M - 4, y: 150, w: 720, size: 84, html: "We turn noise<br>into ML systems<br>*that ship.*" }) +
    text({ x: M, y: 420, w: 600, cls: "b", style: `font-size:24px;color:${inkA(0.72)}`, html: "Fixed scope. Fixed price. One engineer, accountable end to end." }) +
    label({ x: M, y: H - 54, size: 15, html: "Noise → Parse → Model → Ship" }) +
    label({ x: M, y: H - 54, right: true, size: 15, color: RED, html: CONTACT.site });
  return page({ W, H, body });
}

/** Pack PNG files into an .ico (PNG-compressed entries, supported by all current browsers). */
function packICO(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
  const dir = Buffer.alloc(16 * pngs.length);
  let offset = 6 + dir.length;
  const datas = pngs.map(({ size, buf }, i) => {
    const e = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, e); dir.writeUInt8(size >= 256 ? 0 : size, e + 1);
    dir.writeUInt8(0, e + 2); dir.writeUInt8(0, e + 3);
    dir.writeUInt16LE(1, e + 4); dir.writeUInt16LE(32, e + 6);
    dir.writeUInt32LE(buf.length, e + 8); dir.writeUInt32LE(offset, e + 12);
    offset += buf.length;
    return buf;
  });
  return Buffer.concat([header, dir, ...datas]);
}

export function webJobs({ root }) {
  const jobs = [];
  for (const s of [16, 32, 48]) jobs.push({ out: `06-web/favicon-${s}.png`, W: s, H: s, scale: 1, transparent: true, html: tinyIcon(s) });
  jobs.push({ out: "06-web/favicon-192.png", W: 512, H: 512, scale: 192 / 512, html: tileIcon(512, 272) });
  jobs.push({ out: "06-web/favicon-512.png", W: 512, H: 512, scale: 1, html: tileIcon(512, 272) });
  jobs.push({ out: "06-web/apple-touch-icon.png", W: 180, H: 180, scale: 1, html: tileIcon(180, 104) });
  const og = ogImage();
  jobs.push({ out: "06-web/og-image.png", W: 1200, H: 630, scale: 1, html: og });
  jobs.push({ out: "06-web/og-image@2x.png", W: 1200, H: 630, scale: 2, html: og });
  for (const j of jobs) j.group = "web";
  const files = [{ out: "06-web/favicon.svg", content: FAVICON_SVG }];
  const after = () => {
    const ico = packICO([16, 32, 48].map((size) => ({ size, buf: fs.readFileSync(path.join(root, `06-web/favicon-${size}.png`)) })));
    fs.writeFileSync(path.join(root, "06-web/favicon.ico"), ico);
    fs.writeFileSync(
      path.join(root, "06-web/head-snippet.html"),
      `<!-- spacedrift icons: copy 06-web/* into /public and paste into <head> -->
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#ffffff">
<meta property="og:image" content="https://spacedrift.in/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
`
    );
    fs.writeFileSync(
      path.join(root, "06-web/site.webmanifest"),
      JSON.stringify({
        name: "spacedrift", short_name: "spacedrift", start_url: "/", display: "standalone",
        background_color: "#ffffff", theme_color: "#ffffff",
        icons: [
          { src: "/favicon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
          { src: "/favicon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
      }, null, 2) + "\n"
    );
  };
  return { jobs, files, after };
}
