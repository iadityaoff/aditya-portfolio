"use client";

/**
 * Theme Builder as a side drawer, available on every page (nav palette
 * button, ⌘K "Open theme builder"). Same builder as the Design System lab;
 * both write the site theme store.
 */

import * as React from "react";
import Link from "next/link";
import { ThemeBuilder } from "@/components/design-system/theme-builder";
import { randomTheme } from "@/components/design-system/theme-engine";
import { resetSiteTheme, setSiteTheme, useSiteTheme } from "@/lib/site-theme";
import { useSmoothScroll } from "@/components/layout/smooth-scroll";
import { cn } from "@/lib/utils";

const OPEN_EVENT = "theme-builder:open";

export function openThemeBuilder() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function ThemeDrawer() {
  const theme = useSiteTheme();
  const { lenis } = useSmoothScroll();
  const [open, setOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const returnFocus = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    lenis?.stop();
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("button")?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const f = Array.from(panelRef.current.querySelectorAll<HTMLElement>("button, a[href], input"));
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      returnFocus.current?.focus?.();
    };
  }, [open, lenis]);

  return (
    <div className={cn("fixed inset-0 z-[65]", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <div
        onClick={() => setOpen(false)}
        className={cn("absolute inset-0 bg-[#0a0a0c]/35 backdrop-blur-[2px] transition-opacity duration-[450ms]", open ? "opacity-100" : "opacity-0")}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Theme builder"
        inert={!open}
        className={cn(
          "absolute top-0 right-0 h-full w-full max-w-[400px] bg-background border-l border-line shadow-[-30px_0_80px_rgba(0,0,0,.18)] flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)]",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between gap-3 px-5 h-14 border-b border-line shrink-0">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-muted">
            <b className="text-accent font-medium">#</b> Theme · live
          </span>
          <div className="flex items-center gap-3">
            <Link href="/design-system#components" onClick={() => setOpen(false)} className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-accent hover:underline">
              Full lab ↗
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close theme builder"
              className="w-8 h-8 rounded-full grid place-items-center border border-line text-muted hover:text-ink cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4" data-lenis-prevent>
          <ThemeBuilder
            theme={theme}
            onChange={setSiteTheme}
            onReset={resetSiteTheme}
            onSurprise={() => setSiteTheme(randomTheme(theme))}
            className="shadow-none"
          />
        </div>
      </div>
    </div>
  );
}
