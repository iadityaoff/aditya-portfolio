"use client";

import * as React from "react";
import { ComponentGallery } from "./component-gallery";
import { ThemeBuilder } from "./theme-builder";
import { compile, randomTheme, type Theme } from "./theme-engine";
import { resetSiteTheme, setSiteTheme, useSiteTheme } from "@/lib/site-theme";
import { cn } from "@/lib/utils";

/**
 * Component lab: the ThemeBuilder compiles a few decisions into semantic
 * tokens. Accent + mode are the *site* theme (the whole portfolio follows,
 * see src/lib/site-theme.ts); radius + density are component tokens and
 * apply to this artboard.
 */
const noop = () => () => {};

export function ComponentLab() {
  const theme = useSiteTheme();
  const [pulse, setPulse] = React.useState(0);

  const update = (patch: Partial<Theme>) => {
    setSiteTheme(patch);
    setPulse((p) => p + 1);
  };

  const tokens = compile(theme);
  const dark = theme.mode === "dark";
  // Before hydration the artboard inherits the tokens the boot script put on
  // <html> (or the CSS defaults), so the first paint is already the saved theme.
  const mounted = React.useSyncExternalStore(noop, () => true, () => false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 items-start">
      <div className="lg:sticky lg:top-24">
        <ThemeBuilder
          theme={theme}
          onChange={update}
          onReset={() => { resetSiteTheme(); setPulse((p) => p + 1); }}
          onSurprise={() => update(randomTheme(theme))}
        />
      </div>

      {/* the artboard: tokens live here */}
      <div
        style={mounted ? (tokens as React.CSSProperties) : undefined}
        className="rounded-[24px] border border-line bg-[var(--t-canvas)] transition-colors duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)] overflow-hidden"
      >
        <div className={cn("flex items-center justify-between gap-3 px-5 py-3 border-b font-mono text-[10.5px] tracking-[0.06em] uppercase", "border-line text-muted")}>
          <span>
            <b className="text-accent font-medium">#</b> Frame · Component library · {dark ? "Dark" : "Light"}
          </span>
          {/* compile receipt: flashes on every change */}
          <span key={pulse} className={cn("flex items-center gap-2", pulse > 0 && "animate-[lab-in_.45s_cubic-bezier(.16,1,.3,1)]")} aria-live="polite">
            <i className="w-1.5 h-1.5 rounded-full bg-[#12a150]" />
            {Object.keys(tokens).length} tokens → 62 components
          </span>
        </div>
        <div className="p-5 sm:p-6 pt-8">
          <ComponentGallery />
        </div>
      </div>
    </div>
  );
}
