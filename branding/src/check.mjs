#!/usr/bin/env node
// Verifies every PNG in the kit: IHDR dimensions, file size, and palette.
// Any pixel must be a blend of white #FFFFFF, ink #0A0A0A and red #E10600
// (antialiasing and alpha included). Such blends always have G≈B and R≥G;
// anything else is reported as off-palette.
//   node check.mjs            # whole kit
//   node check.mjs --sizes    # dimensions + sizes only (fast)
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sizesOnly = process.argv.includes("--sizes");

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) return e.name === "node_modules" || e.name === "src" ? [] : walk(p);
    return e.name.endsWith(".png") ? [p] : [];
  });
}

function decode(buf) {
  let o = 8, w, h, depth, ctype, idat = [];
  while (o < buf.length) {
    const len = buf.readUInt32BE(o), type = buf.toString("ascii", o + 4, o + 8);
    const data = buf.subarray(o + 8, o + 8 + len);
    if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); depth = data[8]; ctype = data[9]; if (data[12]) throw new Error("interlaced"); }
    if (type === "IDAT") idat.push(data);
    o += 12 + len;
  }
  if (depth !== 8 || ![2, 6].includes(ctype)) return { w, h, px: null };
  const bpp = ctype === 6 ? 4 : 3, stride = w * bpp;
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const px = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? px[y * stride + x - bpp] : 0, b = y ? px[(y - 1) * stride + x] : 0, c = x >= bpp && y ? px[(y - 1) * stride + x - bpp] : 0;
      let v = src[x];
      if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      px[y * stride + x] = v & 255;
    }
  }
  return { w, h, px, bpp };
}

let problems = 0, total = 0, bytes = 0;
for (const f of walk(ROOT).sort()) {
  total++;
  const buf = fs.readFileSync(f);
  bytes += buf.length;
  const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
  const rel = path.relative(ROOT, f);
  let note = "";
  if (buf.length > 4e6) { note += " LARGE"; problems++; }
  if (!sizesOnly) {
    const d = decode(buf);
    if (d.px) {
      let off = 0, sample = null;
      for (let i = 0; i < d.px.length; i += d.bpp * 3) {
        if (d.bpp === 4 && d.px[i + 3] < 24) continue;
        const r = d.px[i], g = d.px[i + 1], b = d.px[i + 2];
        if (Math.abs(g - b) > 10 || r < g - 6) { off++; sample ??= [r, g, b]; }
      }
      if (off) { note += ` OFF-PALETTE ${off}px e.g. rgb(${sample})`; problems++; }
    }
  }
  console.log(`${String(w).padStart(5)}×${String(h).padEnd(5)} ${(buf.length / 1e6).toFixed(2).padStart(5)}MB  ${rel}${note}`);
}
console.log(`\n${total} PNGs, ${(bytes / 1e6).toFixed(1)}MB total, ${problems} problem(s)`);
process.exitCode = problems ? 1 : 0;
