#!/usr/bin/env node
// Regenerates the whole spacedrift brand kit into ../ (branding/).
//   npm run render                 # everything
//   npm run render -- logo banners # only some groups (see GROUPS below)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderAll, pngSize } from "./lib/engine.mjs";
import { logoJobs } from "./templates/logo.mjs";
import { profileJobs } from "./templates/profile.mjs";
import { bannerJobs } from "./templates/banners.mjs";
import { instagramJobs } from "./templates/instagram.mjs";
import { postJobs } from "./templates/posts.mjs";
import { webJobs } from "./templates/web.mjs";
import { guidelineJobs } from "./templates/guidelines.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GROUPS = { logo: logoJobs, profile: profileJobs, banners: bannerJobs, instagram: instagramJobs, posts: postJobs, web: webJobs, guidelines: guidelineJobs };

const want = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const only = want.length ? want : Object.keys(GROUPS);
for (const g of only) if (!GROUPS[g]) { console.error(`unknown group "${g}". Groups: ${Object.keys(GROUPS).join(", ")}`); process.exit(1); }

const t0 = Date.now();
let jobs = [], files = [], post = [];
for (const g of only) {
  const r = await GROUPS[g]({ root: ROOT });
  jobs.push(...(r.jobs || []));
  files.push(...(r.files || []));
  if (r.after) post.push(r.after);
}
for (const j of jobs) j.out = path.resolve(ROOT, j.out);

for (const f of files) {
  const out = path.join(ROOT, f.out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, f.content);
}
console.log(`wrote ${files.length} text/vector files`);

let done = 0;
const results = await renderAll(jobs.filter((j) => !j.late), {
  concurrency: Number(process.env.CONCURRENCY || 4),
  onDone: (r) => {
    done++;
    const rel = path.relative(ROOT, r.out);
    if (r.error) console.log(`  ✗ ${rel}: ${r.error}`);
    else if (process.env.VERBOSE) console.log(`  ${String(done).padStart(3)} ${rel}  ${r.w}x${r.h}  ${(r.bytes / 1e6).toFixed(2)}MB`);
  },
});

const late = jobs.filter((j) => j.late);
if (late.length) results.push(...(await renderAll(late, { concurrency: 2 })));

// Jobs that depend on other outputs (contact sheet, ICO packing, ...)
for (const fn of post) {
  const extra = await fn({ root: ROOT, results });
  if (extra?.jobs?.length) {
    for (const j of extra.jobs) j.out = path.resolve(ROOT, j.out);
    results.push(...(await renderAll(extra.jobs, { concurrency: 2 })));
  }
  if (extra?.finalize) await extra.finalize();
}

const bad = results.filter((r) => r.error || r.ok === false);
const big = results.filter((r) => r.bytes > 4e6);
console.log(`rendered ${results.length - bad.length}/${results.length} PNGs in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
for (const r of bad) console.log(`  PROBLEM ${path.relative(ROOT, r.out)}: ${r.error || `got ${r.w}x${r.h}, expected ${r.expected.w}x${r.expected.h}`}`);
for (const r of big) console.log(`  LARGE   ${path.relative(ROOT, r.out)}: ${(r.bytes / 1e6).toFixed(2)}MB`);
if (bad.length) process.exitCode = 1;
export { pngSize };
