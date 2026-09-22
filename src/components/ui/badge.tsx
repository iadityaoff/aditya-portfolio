import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "accent" | "outline" | "dark";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "neutral",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-mono uppercase tracking-wider font-medium rounded-md select-none";

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 leading-none",
    md: "text-[11px] px-2.5 py-1 leading-tight",
  };

  const variantStyles = {
    neutral: "bg-line/60 text-ink border border-line/80",
    accent: "bg-accent/10 text-accent border border-accent/20",
    outline: "bg-transparent text-muted border border-line",
    dark: "bg-showcase-border/60 text-white/80 border border-showcase-border",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
