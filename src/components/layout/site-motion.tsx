"use client";

import * as React from "react";
import { MotionConfig } from "motion/react";
import { useSiteTheme } from "@/lib/site-theme";

/**
 * The Theme Builder's Motion option. "reduced" makes every motion/react
 * animation behave as if the OS asked for reduced motion (and globals.css
 * shortens CSS transitions under html[data-motion="reduced"]); "full" still
 * respects the visitor's OS setting.
 */
export function SiteMotion({ children }: { children: React.ReactNode }) {
  const { motion } = useSiteTheme();
  return <MotionConfig reducedMotion={motion === "reduced" ? "always" : "user"}>{children}</MotionConfig>;
}
