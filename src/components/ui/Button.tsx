import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "glass";
  size?: "md" | "sm";
  className?: string;
}) {
  const cls = `btn btn-${variant}${size === "sm" ? " btn-sm" : ""} ${className}`.trim();
  const inner = (
    <>
      <span className="btn-label">{children}</span>
      <span className="btn-ico" aria-hidden>
        <ArrowUpRight size={size === "sm" ? 15 : 18} strokeWidth={2} />
      </span>
    </>
  );

  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={cls} data-magnetic>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-magnetic>
      {inner}
    </Link>
  );
}
