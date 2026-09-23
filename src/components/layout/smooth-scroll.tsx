"use client";

import * as React from "react";
import Lenis from "lenis";

// --- Context ---
interface SmoothScrollContextValue {
  lenis: Lenis | null;
}

const SmoothScrollContext = React.createContext<SmoothScrollContextValue>({
  lenis: null,
});

export function useSmoothScroll() {
  return React.useContext(SmoothScrollContext);
}

// --- Provider ---
interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Global smooth-scroll provider using Lenis.
 *
 * Kill-switch: set NEXT_PUBLIC_DISABLE_SMOOTH_SCROLL=true or add ?scroll=native
 * Reduced-motion: disables interpolation automatically
 * Strict Mode safe: single instance, proper cleanup
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = React.useState<Lenis | null>(null);

  React.useEffect(() => {
    // --- Kill-switch ---
    if (process.env.NEXT_PUBLIC_DISABLE_SMOOTH_SCROLL === "true") {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    if (params.get("scroll") === "native") {
      return;
    }

    // --- Reduced motion ---
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // --- Create Lenis ---
    const instance = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.1,
      duration: prefersReducedMotion ? 0 : 1.2,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    // --- Scroll restoration ---
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // --- RAF loop ---
    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // --- Cleanup (Strict Mode Safe) ---
    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, []);

  const contextValue = React.useMemo(() => ({ lenis }), [lenis]);

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
