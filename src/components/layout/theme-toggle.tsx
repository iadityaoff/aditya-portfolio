"use client";

import * as React from "react";
import { setSiteTheme, useSiteTheme } from "@/lib/site-theme";
import { cn } from "@/lib/utils";

/** Light / dark switch for the site theme (the ThemeBuilder holds the rest). */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSiteTheme();
  const dark = theme.mode === "dark";
  return (
    <button
      type="button"
      onClick={() => setSiteTheme({ mode: dark ? "light" : "dark" })}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
      className={cn(
        "relative inline-flex items-center justify-center h-9 w-9 rounded-full border border-line bg-white/70 backdrop-blur-xs text-muted hover:text-ink hover:border-ink/25 transition-colors duration-300 cursor-pointer overflow-hidden",
        className
      )}
    >
      {/* sun */}
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
        className="absolute w-4 h-4 transition-all duration-[450ms] ease-[cubic-bezier(.34,1.56,.64,1)] opacity-100 rotate-0 scale-100 dark:opacity-0 dark:rotate-90 dark:scale-50"
      >
        <circle cx="8" cy="8" r="3" />
        <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" />
      </svg>
      {/* moon */}
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        aria-hidden="true"
        className="absolute w-4 h-4 transition-all duration-[450ms] ease-[cubic-bezier(.34,1.56,.64,1)] opacity-0 -rotate-90 scale-50 dark:opacity-100 dark:rotate-0 dark:scale-100"
      >
        <path d="M13.5 9.6A5.8 5.8 0 0 1 6.4 2.5a5.8 5.8 0 1 0 7.1 7.1z" />
      </svg>
    </button>
  );
}
