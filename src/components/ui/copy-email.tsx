"use client";

import * as React from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

export interface CopyEmailProps {
  email: string;
  className?: string;
  tone?: "light" | "dark";
}

export function CopyEmail({ email, className, tone = "light" }: CopyEmailProps) {
  const { copied, copy } = useCopyToClipboard(2500);

  const isDark = tone === "dark";

  return (
    <button
      type="button"
      onClick={() => copy(email)}
      aria-label={`Copy email address ${email} to clipboard`}
      className={cn(
        "group relative inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg font-mono text-xs sm:text-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        isDark
          ? "bg-showcase-card border border-showcase-border text-white hover:border-white/30"
          : "bg-white border border-line text-ink hover:border-ink/30 shadow-xs",
        className
      )}
    >
      <span className="font-sans font-medium">{email}</span>

      <span
        className={cn(
          "inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md uppercase tracking-wider font-mono font-semibold transition-colors duration-200",
          copied
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : isDark
            ? "bg-white/10 text-white/70 group-hover:text-white"
            : "bg-line/60 text-muted group-hover:text-ink"
        )}
      >
        {copied ? (
          <>
            <svg
              className="w-3 h-3 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy
          </>
        )}
      </span>
    </button>
  );
}
