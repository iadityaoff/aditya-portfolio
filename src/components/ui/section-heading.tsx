import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "space-y-3 max-w-3xl",
        isCenter ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "font-mono text-xs font-semibold tracking-widest uppercase",
            isDark ? "text-accent" : "text-accent"
          )}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15]",
          isDark ? "text-white" : "text-ink",
          "[&>em]:font-serif [&>em]:font-normal [&>em]:italic [&>em]:tracking-normal"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed",
            isDark ? "text-showcase-muted" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
