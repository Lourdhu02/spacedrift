// Playwright render engine: HTML string -> PNG at base size x deviceScaleFactor.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
process.env.PLAYWRIGHT_BROWSERS_PATH ||= "/opt/pw-browsers";
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  throw new Error("playwright not found. Run with NODE_PATH=$(npm root -g) (see README), or npm i -g playwright.");
}

export const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "sd-brand-"));

/** Read PNG width/height from the IHDR chunk (bytes 16-23). */
export function pngSize(file) {
  const b = Buffer.alloc(24);
  const fd = fs.openSync(file, "r");
  fs.readSync(fd, b, 0, 24, 0);
  fs.closeSync(fd);
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}

export async function launch() {
  return chromium.launch({ args: ["--force-color-profile=srgb", "--disable-lcd-text", "--font-render-hinting=none"] });
}

let n = 0;
/**
 * job: { out, W, H, scale, html, transparent, clip }
 * Writes the PNG and returns { out, w, h, bytes }.
 */
export async function renderOne(browser, job) {
  const ctx = await browser.newContext({ viewport: { width: job.W, height: job.H }, deviceScaleFactor: job.scale });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  const file = path.join(TMP, `p${++n}.html`);
  fs.writeFileSync(file, job.html);
  try {
    await page.goto(pathToFileURL(file).href, { waitUntil: "load" });
    await page.evaluate(() => window.__ready);
    if (errors.length) throw new Error(errors.join("; "));
    fs.mkdirSync(path.dirname(job.out), { recursive: true });
    await page.screenshot({ path: job.out, type: "png", omitBackground: !!job.transparent, animations: "disabled", scale: "device" });
  } finally {
    await ctx.close();
  }
  const { w, h } = pngSize(job.out);
  return { out: job.out, w, h, bytes: fs.statSync(job.out).size };
}

export async function renderAll(jobs, { concurrency = 4, onDone } = {}) {
  const browser = await launch();
  const results = [];
  let i = 0;
  async function worker() {
    while (i < jobs.length) {
      const job = jobs[i++];
      try {
        const r = await renderOne(browser, job);
        const ew = Math.round(job.W * job.scale), eh = Math.round(job.H * job.scale);
        r.expected = { w: ew, h: eh };
        r.ok = r.w === ew && r.h === eh;
        results.push(r);
        onDone?.(r);
      } catch (e) {
        results.push({ out: job.out, error: e.message });
        onDone?.({ out: job.out, error: e.message });
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  await browser.close();
  return results;
}
