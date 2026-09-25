"use client";

import * as React from "react";

/**
 * Renders the cinematic GSAP prototype inside a seamless iframe.
 * This avoids all CSS/JS conflicts with the Next.js shell — the
 * prototype runs in its own document exactly as the standalone HTML.
 */
export function PrototypeHome() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  // Relay scroll from Lenis (parent) into the iframe so the user
  // can scroll the prototype normally even though the parent page
  // has its own smooth-scroll layer.
  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // When iframe loads, sync its height or just let it scroll naturally
    const onLoad = () => {
      try {
        // Make the iframe's body transparent so it blends
        const doc = iframe.contentDocument;
        if (doc) {
          doc.documentElement.style.overscrollBehavior = "none";
        }
      } catch {
        // cross-origin safety — not needed for same-origin
      }
    };

    iframe.addEventListener("load", onLoad);
    return () => iframe.removeEventListener("load", onLoad);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      id="prototype-frame"
      src="/prototype.html?v=2"
      title="Aditya Tripathi — Senior UI/UX Designer Studio"
      className="w-full border-0 block"
      style={{
        width: "100%",
        height: "100vh",
        minHeight: "100dvh",
        border: "none",
      }}
      allowFullScreen
    />
  );
}
