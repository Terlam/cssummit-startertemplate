import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const WORDMARK_SRC = "/brand/chitech-cllct-wordmark-v2.png";
export const WORDMARK_ALT = "Chi Tech CLLCT";

const heights = { sm: "h-4", md: "h-[1.375rem]", lg: "h-8" } as const;

/**
 * The Chi Tech CLLCT wordmark with the project name under it. The wordmark is a white, teal
 * and orange PNG made for dark backgrounds; on the light "paper" surface --wordmark-filter
 * flips it so it stays readable.
 * Rebrand by editing `site.name` in lib/site.ts (or swap the PNG in public/brand/).
 */
export function Brand({
  href = "/",
  size = "md",
  showName = true,
  className,
}: {
  href?: string;
  size?: keyof typeof heights;
  showName?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-w-0 flex-col items-start gap-1.5 rounded-sm",
        className,
      )}
    >
      <Image
        src={WORDMARK_SRC}
        alt={WORDMARK_ALT}
        width={496}
        height={60}
        priority
        className={cn(
          "block w-auto max-w-full [filter:var(--wordmark-filter)]",
          heights[size],
        )}
      />
      {showName ? (
        <span className="truncate font-mono text-[0.6875rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase transition-colors group-hover:text-primary-text">
          {site.name}
        </span>
      ) : null}
    </Link>
  );
}
