"use client";

import * as React from "react";
import { useScroll, useTransform, MotionValue } from "motion/react";

/**
 * Returns a 0–1 progress value for an element's journey through the viewport.
 * `offset` controls when the measurement starts/ends relative to the viewport.
 *
 * Default: progress starts when element's top enters viewport bottom,
 * ends when element's bottom exits viewport top.
 */
export function useSectionProgress(
  ref: React.RefObject<HTMLElement | null>,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  offset?: any
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: offset ?? (["start end", "end start"] as any),
  });
  return scrollYProgress;
}

/**
 * Returns a 0–1 progress for a sticky/pinned section.
 * The outer container should have a large height (e.g. 300vh).
 * The inner content is position: sticky at the top.
 * Progress maps from when the container enters to when it exits.
 */
export function useStickyProgress(
  ref: React.RefObject<HTMLElement | null>
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return scrollYProgress;
}

/**
 * Maps a MotionValue from one range to another.
 * Shorthand for useTransform(value, inputRange, outputRange).
 */
export function useProgressTransform(
  progress: MotionValue<number>,
  inputRange: number[],
  outputRange: number[]
): MotionValue<number> {
  return useTransform(progress, inputRange, outputRange);
}
