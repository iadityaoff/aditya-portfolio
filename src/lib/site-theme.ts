"use client";

/**
 * Site theme store. The ThemeBuilder writes here; every page follows.
 *
 * Saved to localStorage as { theme, site, proto } where `site` / `proto` are
 * the already-compiled CSS variables. That lets the pre-paint script in the
 * root layout and the homepage iframe (public/prototype.html) apply the theme
 * without re-implementing any colour logic. The iframe hears changes through
 * the browser's `storage` event (same origin, different document).
 */

import * as React from "react";
import {
  DEFAULT_THEME,
  compile,
  compilePrototype,
  compileSite,
  isHex,
  type Theme,
} from "@/components/design-system/theme-engine";
import { SITE_THEME_KEY } from "./site-theme-boot";

export { SITE_THEME_KEY };

const EVENT = "site-theme-change";

function read(): Theme {
  try {
    const raw = localStorage.getItem(SITE_THEME_KEY);
    if (!raw) return DEFAULT_THEME;
    const t = JSON.parse(raw)?.theme as Partial<Theme> | undefined;
    if (!t || !isHex(t.accent ?? "")) return DEFAULT_THEME;
    return { ...DEFAULT_THEME, ...t };
  } catch {
    return DEFAULT_THEME;
  }
}

/** Apply compiled variables to <html>. */
export function applySiteTheme(theme: Theme) {
  const root = document.documentElement;
  const vars = compileSite(theme);
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.dataset.theme = theme.mode;
  root.dataset.skin = theme.skin;
  root.dataset.motion = theme.motion;
  root.dataset.texture = theme.texture ? "on" : "off";
  root.style.colorScheme = theme.mode;
}

let cached: Theme | null = null;
let cachedKey = "";

function snapshot(): Theme {
  // stable reference for useSyncExternalStore
  const t = read();
  const key = JSON.stringify(t);
  if (key !== cachedKey) {
    cachedKey = key;
    cached = t;
  }
  return cached as Theme;
}

export function setSiteTheme(patch: Partial<Theme>) {
  const next = { ...snapshot(), ...patch };
  try {
    localStorage.setItem(
      SITE_THEME_KEY,
      JSON.stringify({ theme: next, site: compileSite(next), lab: compile(next), proto: compilePrototype(next) })
    );
  } catch {
    /* private mode: still apply for this page view */
  }
  applySiteTheme(next);
  window.dispatchEvent(new Event(EVENT));
}

export function resetSiteTheme() {
  setSiteTheme(DEFAULT_THEME);
}

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === SITE_THEME_KEY) {
      applySiteTheme(read());
      cb();
    }
  };
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

/** Current site theme (DEFAULT_THEME during SSR). */
export function useSiteTheme(): Theme {
  return React.useSyncExternalStore(subscribe, snapshot, () => DEFAULT_THEME);
}
