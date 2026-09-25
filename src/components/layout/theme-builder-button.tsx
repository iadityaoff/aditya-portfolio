"use client";

import { openThemeBuilder } from "./theme-drawer";
import { cn } from "@/lib/utils";

/** Nav button that opens the Theme Builder drawer (sits beside the light/dark toggle). */
export function ThemeBuilderButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openThemeBuilder}
      aria-label="Open theme builder"
      title="Theme builder"
      className={cn(
        "inline-flex items-center justify-center h-9 w-9 rounded-full border border-line bg-white/70 backdrop-blur-xs text-muted hover:text-ink hover:border-ink/25 transition-colors duration-300 cursor-pointer",
        className
      )}
    >
      {/* palette: the four swatches recolour with the accent */}
      <svg viewBox="0 0 16 16" className="w-4 h-4" aria-hidden="true">
        <path d="M8 1.75a6.25 6.25 0 1 0 0 12.5c.9 0 1.4-.6 1.4-1.3 0-.8-.6-1.1-.6-1.8 0-.6.5-1.1 1.2-1.1h1.4a3.4 3.4 0 0 0 3.35-3.4C14.75 4.2 11.8 1.75 8 1.75Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="5" cy="7" r="1.05" style={{ fill: "var(--color-accent)" }} />
        <circle cx="7.4" cy="4.6" r="1.05" style={{ fill: "var(--color-accent)", opacity: 0.7 }} />
        <circle cx="10.5" cy="5.1" r="1.05" style={{ fill: "var(--color-accent)", opacity: 0.45 }} />
        <circle cx="5.3" cy="10.2" r="1.05" fill="currentColor" />
      </svg>
    </button>
  );
}
