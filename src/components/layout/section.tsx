import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "light" | "dark" | "tinted";
  padding?: "normal" | "compact" | "none";
}

export function Section({
  className,
  tone = "light",
  padding = "normal",
  children,
  ...props
}: SectionProps) {
  const toneStyles = {
    light: "bg-background text-ink",
    dark: "bg-showcase text-white",
    tinted: "bg-line/25 text-ink",
  };

  const paddingStyles = {
    normal: "py-[72px] lg:py-[120px]",
    compact: "py-12 lg:py-16",
    none: "py-0",
  };

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden transition-colors duration-300",
        toneStyles[tone],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
