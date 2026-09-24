// Timelines for the 60s master and the 15s / 6s cutdowns. Every boundary sits
// on the 120 BPM grid (0.5s beats) except the 6s flash cut, which is 0.4s.
import { hook, problem, station, services, proof, endcard } from "./scenes.mjs";
import { BEAT } from "./core.mjs";

const S = (scene, dur, o = {}, fx = {}) => ({ scene, dur, o, ...fx });

export const CUTS = {
  60: [
    S(hook, 3),
    S(problem, 7),
    S(station, 7, { i: 0 }, { wipeOut: true }),
    S(station, 7, { i: 1 }, { wipeIn: true, wipeOut: true }),
    S(station, 7, { i: 2 }, { wipeIn: true, wipeOut: true }),
    S(station, 7, { i: 3 }, { wipeIn: true, wipeOut: true }),
    S(services, 10, {}, { wipeIn: true }),
    S(proof, 6, {}, { wipeOut: true }),
    S(endcard, 6, {}, { wipeIn: true }),
  ],
  15: [
    S(hook, 3),
    S(station, 1.5, { i: 0 }),
    S(station, 1.5, { i: 1 }),
    S(station, 1.5, { i: 2 }),
    S(station, 1.5, { i: 3 }, { wipeOut: true }),
    S(services, 2.5, {}, { wipeIn: true, wipeOut: true }),
    S(endcard, 3.5, {}, { wipeIn: true }),
  ],
  6: [
    S(hook, 2),
    S(station, 0.4, { i: 0 }),
    S(station, 0.4, { i: 1 }),
    S(station, 0.4, { i: 2 }),
    S(station, 0.4, { i: 3 }),
    S(endcard, 2.4),
  ],
};

export function build(cut) {
  const list = CUTS[cut];
  if (!list) throw new Error(`unknown cut ${cut}`);
  let at = 0;
  const items = list.map((it) => {
    const r = { ...it, start: at, end: at + it.dur };
    at += it.dur;
    return r;
  });
  return { items, duration: at };
}

export function find(tl, t) {
  for (const it of tl.items) if (t < it.end) return it;
  return tl.items[tl.items.length - 1];
}

export const WIPE = 0.32;

/** All sound cues for a cut, in global time. */
export function audioEvents(tl) {
  const ev = [];
  for (const it of tl.items) {
    for (const e of it.scene.audio(it.dur, it.o)) ev.push({ ...e, t: e.t + it.start });
    if (it.wipeOut) ev.push({ t: it.end - WIPE, type: "whoosh", dur: WIPE * 2, gain: 0.8 });
  }
  // Beat bed: sub pulse on every beat after the hook cut, off-beat ticks in
  // the middle acts, silence over the final held end card.
  const hookEnd = tl.items[0].dur * 0.5;
  const endStart = tl.items[tl.items.length - 1].start;
  const endHold = endStart + Math.min(3, tl.items[tl.items.length - 1].dur * 0.5);
  for (let t = hookEnd; t < endHold; t += BEAT) {
    ev.push({ t, type: "kick", gain: t < endStart ? 1 : 0.6 });
    if (t > tl.items[0].end && t < endStart) ev.push({ t: t + BEAT / 2, type: "hat" });
  }
  return ev.sort((a, b) => a.t - b.t);
}
