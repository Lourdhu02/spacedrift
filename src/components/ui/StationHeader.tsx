import type { ReactNode } from "react";

export type StationKind = "NOISE" | "PARSE" | "MODEL" | "SHIP" | "LOG" | "ABOUT";

const STATION_INDEX: Record<StationKind, string> = {
  NOISE: "01",
  PARSE: "02",
  MODEL: "03",
  SHIP: "04",
  LOG: "—",
  ABOUT: "—",
};

/**
 * StationHeader — the persistent station-log strip that sits above every
 * page hero. Renders as pure server-side markup.
 */
export default function StationHeader({
  station,
  path,
  rev = "REV 2.0.0",
  children,
}: {
  station: StationKind;
  path: string;
  rev?: string;
  children?: ReactNode;
}) {
  return (
    <div className="wrap">
      <div className="station-strip">
        <span>
          <span className="dot" aria-hidden />
          STATION {STATION_INDEX[station]} <span className="cur">/ {station}</span>
        </span>
        <span>{path}</span>
        <span className="rev">{rev}</span>
      </div>
      {children}
    </div>
  );
}
