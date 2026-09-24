import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({
  num,
  title,
  href,
  desc,
  station,
}: {
  num: string;
  title: string;
  href: string;
  desc: string;
  station: string;
}) {
  return (
    <Link href={href} className="card brackets svc-card" data-reveal>
      <div className="svc-top">
        <span className="mono svc-num">{num}</span>
        <span className="mono svc-station">→ {station}</span>
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <span className="mono svc-cta">
        OPEN STATION <ArrowUpRight size={13} strokeWidth={2} />
      </span>
      <style>{`
        .svc-card {
          display: flex; flex-direction: column; gap: 14px;
          min-height: 260px; text-decoration: none;
        }
        .svc-top {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase;
        }
        .svc-num { color: var(--signal); font-weight: 600; }
        .svc-station { color: var(--ink-4); }
        .svc-card h3 { color: var(--ink); }
        .svc-card p { font-size: 14px; }
        .svc-cta {
          margin-top: auto; padding-top: 12px;
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--ink);
          display: inline-flex; align-items: center; gap: 8px;
          border-top: 1px solid var(--rule);
        }
      `}</style>
    </Link>
  );
}
