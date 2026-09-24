import type { ReactNode } from "react";

/**
 * StoryBeat — the eyebrow that names which station of the story arc
 * a section belongs to. Renders the current station in signal red and
 * the whole arc as breadcrumbs.
 */
const ARC = ["NOISE", "PARSE", "MODEL", "SHIP"] as const;
export type Beat = (typeof ARC)[number];

export default function StoryBeat({
  current,
  suffix,
  children,
}: {
  current: Beat;
  suffix?: string;
  children?: ReactNode;
}) {
  return (
    <div className="story-beat">
      <div className="story-arc" aria-label={`Story arc, currently at ${current}`}>
        {ARC.map((b, i) => (
          <span key={b} className={b === current ? "on" : "off"}>
            {b}
            {i < ARC.length - 1 && <span aria-hidden> → </span>}
          </span>
        ))}
        {suffix && <span className="suffix">· {suffix}</span>}
      </div>
      {children}
      <style>{`
        .story-beat { display: flex; flex-direction: column; gap: 10px; }
        .story-arc {
          font-family: var(--font-mono); font-size: 10.5px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--ink-4);
        }
        .story-arc .off { color: var(--ink-4); }
        .story-arc .on { color: var(--signal); font-weight: 600; }
        .story-arc .suffix { color: var(--ink-3); margin-left: 12px; letter-spacing: 0.14em; }
      `}</style>
    </div>
  );
}
