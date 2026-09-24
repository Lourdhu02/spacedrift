/**
 * AsciiRule — a horizontal divider drawn from characters instead of a
 * <hr>. Renders as a repeating pattern; the browser truncates via
 * overflow. Purely presentational.
 */
export default function AsciiRule({
  glyph = "─",
  label,
}: {
  glyph?: string;
  label?: string;
}) {
  return (
    <div className="ar" role="separator" aria-label={label ?? "divider"}>
      <span className="ar-glyphs" aria-hidden>
        {glyph.repeat(400)}
      </span>
      {label && <span className="ar-label">{label}</span>}
      <style>{`
        .ar {
          display: flex; align-items: center; gap: 16px;
          padding: 10px 0; color: var(--ink-4);
          font-family: var(--font-mono); font-size: 13px;
          overflow: hidden; user-select: none;
        }
        .ar-glyphs { white-space: nowrap; overflow: hidden; flex: 1; letter-spacing: 0; }
        .ar-label {
          font-size: 10.5px; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--ink-3);
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
