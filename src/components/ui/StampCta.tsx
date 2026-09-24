import type { ReactNode } from "react";
import Link from "next/link";

/**
 * StampCta — the site's single call-to-action button.
 * Two variants (ink + signal). Renders as <a> for mailto/hash/external,
 * <Link> for internal routes.
 */
export default function StampCta({
  href,
  children,
  variant = "ink",
  ghost = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "ink" | "signal";
  ghost?: boolean;
  className?: string;
}) {
  const base = ghost ? "stamp-ghost" : variant === "signal" ? "stamp stamp-signal" : "stamp";
  const cls = className ? `${base} ${className}` : base;

  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
