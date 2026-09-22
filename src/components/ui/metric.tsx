import * as React from "react";
import { cn } from "@/lib/utils";

export interface MetricProps {
  value: string;
  label: string;
  sublabel?: string;
  tone?: "light" | "dark";
  className?: string;
}

export function Metric({
  value,
  label,
  sublabel,
  tone = "light",
  className,
}: MetricProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col border-l-2 pl-4 py-1 transition-colors duration-200",
        isDark
          ? "border-showcase-border hover:border-accent"
          : "border-line hover:border-accent",
        className
      )}
    >
      <span
        className={cn(
          "font-mono text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight tabular-nums",
          isDark ? "text-white" : "text-ink"
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "text-sm font-medium mt-1.5",
          isDark ? "text-white/90" : "text-ink"
        )}
      >
        {label}
      </span>
      {sublabel && (
        <span
          className={cn(
            "text-xs mt-0.5",
            isDark ? "text-showcase-muted" : "text-muted"
          )}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
}
