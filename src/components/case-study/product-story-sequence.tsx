"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { trackScrollMilestone } from "@/lib/analytics";

import { MockComponentRegistry } from "@/components/case-study/product-story-mocks";

export interface ProductStorySequenceProps {
  story: {
    title: string;
    description: string;
    image?: string;
    mockComponentId?: string;
  }[];
}

export function ProductStorySequence({ story }: ProductStorySequenceProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = React.useState(0);
  const prevStepRef = React.useRef(0);

  // Scroll progress for the entire 2-column section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Map scroll progress to active step
  const stepIndex = useTransform(scrollYProgress, [0, 1], [0, story.length - 1]);

  useMotionValueEvent(stepIndex, "change", (latest) => {
    const clamped = Math.round(Math.max(0, Math.min(story.length - 1, latest)));
    setActiveStep(clamped);
    if (prevStepRef.current !== clamped) {
      trackScrollMilestone("ProductStory", story[clamped].title);
      prevStepRef.current = clamped;
    }
  });

  // Detect if all visual assets are identical (e.g., using a single cover image placeholder)
  const uniqueVisuals = new Set(story.map((s) => s.mockComponentId || s.image));
  const isStaticVisual = uniqueVisuals.size <= 1;

  if (shouldReduceMotion) {
    // Fallback: simple stacked layout for reduced motion
    return (
      <section className="my-16 border-t border-line/80 pt-12 space-y-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            04 · PRODUCT EVOLUTION
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink mt-2">
            The Complete Core Workflow
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {story.map((step) => {
            const MockComp = step.mockComponentId ? MockComponentRegistry[step.mockComponentId] : null;
            return (
              <div key={step.title} className="space-y-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-line shadow-sm bg-surface relative">
                  {MockComp ? (
                    <MockComp />
                  ) : (
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-ink">{step.title}</h3>
                  <p className="text-sm text-muted mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="my-16 border-t border-line/80 pt-12 relative">
      <div className="mb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          04 · PRODUCT EVOLUTION
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink mt-2">
          The Complete Core Workflow
        </h2>
        <p className="text-sm text-muted mt-2 max-w-2xl">
          Scroll to trace the user journey from initial entry to final outcome across the primary interface screens.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative items-start">
        {/* Left Column: Scrolling Text Steps */}
        <div className="md:col-span-5 space-y-[40vh] pb-[40vh]">
          {story.map((step, idx) => (
            <div
              key={step.title}
              className={cn(
                "p-6 rounded-2xl border transition-all duration-500",
                activeStep === idx
                  ? "bg-white border-accent/40 shadow-md scale-105"
                  : "bg-surface border-line/60 opacity-40 scale-100"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase font-bold text-ink">
                  {idx + 1}. {step.title}
                </span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Right Column: Sticky Visual Transformation */}
        <div className="md:col-span-7 sticky top-32 h-[60vh] flex flex-col items-center justify-center bg-surface/50 rounded-[32px] border border-line overflow-hidden p-8">
          <div className="w-full h-full flex flex-col items-center justify-center relative w-full mx-auto">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 relative bg-white flex items-center justify-center">
              {isStaticVisual ? (
                /* Static rendering for repeated placeholders (no morph/crossfade) */
                story[0].mockComponentId && MockComponentRegistry[story[0].mockComponentId] ? (
                  React.createElement(MockComponentRegistry[story[0].mockComponentId])
                ) : (
                  <img
                    src={story[0].image}
                    alt="Product Overview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )
              ) : (
                /* Dynamic morph/crossfade rendering for distinct step screenshots */
                story.map((step, idx) => {
                  const key = (step.mockComponentId || step.image || "") + idx;
                  const MockComponent = step.mockComponentId ? MockComponentRegistry[step.mockComponentId] : null;
                  return (
                    <motion.div
                      key={key}
                      className="absolute inset-0 w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: idx === activeStep ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {MockComponent ? (
                        <MockComponent />
                      ) : (
                        <img
                          src={step.image}
                          alt={`Product Screen for step ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
