import type * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Eyebrow + h2 + intro for a landing section. Centres itself in the centered layout; the
 * marketplace layout drops the eyebrow and uses a smaller title.
 */
export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col items-start gap-4",
        "layout-centered:mx-auto layout-centered:items-center layout-centered:text-center",
        "layout-editorial:max-w-none layout-editorial:border-t-2 layout-editorial:border-foreground layout-editorial:pt-6",
        className,
      )}
    >
      <p className="eyebrow layout-marketplace:hidden">{eyebrow}</p>
      <h2 className="text-3xl sm:text-5xl layout-marketplace:sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <p className="text-lg text-pretty text-muted-foreground">{children}</p>
      ) : null}
    </div>
  );
}
