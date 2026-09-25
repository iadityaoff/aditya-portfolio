"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotionConfig,
} from "motion/react";

// --- ScrollReveal: fade-up-on-enter animation driven by scroll ---
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Translate distance in px. Default: 24 */
  offset?: number;
  /** Delay within stagger group (0-based fraction). Default: 0 */
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  offset = 24,
  delay = 0,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotionConfig();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.55"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, 0]);
  const opacity = useTransform(
    scrollYProgress,
    [delay, Math.min(delay + 0.6, 1)],
    [0, 1]
  );

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

// --- ParallaxLayer: lightweight offset via useTransform ---
interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  /** Parallax offset in px (positive = moves down slower, negative = moves up faster) */
  offset?: number;
}

export function ParallaxLayer({
  children,
  className,
  offset = -30,
}: ParallaxLayerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotionConfig();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// --- StickySection: wraps pinned storytelling areas ---
interface StickySectionProps {
  children: React.ReactNode;
  className?: string;
  /** Height of scroll area. Default: "300vh" */
  height?: string;
}

export function StickySection({
  children,
  className,
  height = "300vh",
}: StickySectionProps) {
  return (
    <div className={className} style={{ height }}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">{children}</div>
    </div>
  );
}
