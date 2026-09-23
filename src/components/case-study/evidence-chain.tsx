"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

import { trackScrollMilestone } from "@/lib/analytics";

export interface EvidenceChainProps {
  evidence: {
    problem: string;
    decision: string;
    implementation: string;
    outcome: string;
    evidenceImages?: string[];
  };
}

export function EvidenceChain({ evidence }: EvidenceChainProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = React.useState(0);
  const prevStepRef = React.useRef(0);

  const steps = [
    { label: "1. Problem Evidence", text: evidence.problem, tag: "AUDIT DATA" },
    { label: "2. Design Decision", text: evidence.decision, tag: "ARCHITECTURAL CHOICE" },
    { label: "3. Implementation Evidence", text: evidence.implementation, tag: "SPEC / STORYBOOK" },
    { label: "4. Outcome Evidence", text: evidence.outcome, tag: "SHIPPED RESULT" },
  ];

  // Scroll progress for the entire 2-column section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Map scroll progress to active step (0, 1, 2, 3)
  const stepIndex = useTransform(scrollYProgress, [0, 1], [0, steps.length - 1]);

  useMotionValueEvent(stepIndex, "change", (latest) => {
    const clamped = Math.round(Math.max(0, Math.min(steps.length - 1, latest)));
    setActiveStep(clamped);
    if (prevStepRef.current !== clamped) {
      trackScrollMilestone("EvidenceChain", steps[clamped].label);
      prevStepRef.current = clamped;
    }
  });

  if (shouldReduceMotion) {
    // Fallback: simple stacked layout for reduced motion
    return (
      <div className="mt-8 pt-8 border-t border-line/80 space-y-4">
        <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-accent">
          EVIDENCE CHAIN (VERIFIABLE PROOF)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step) => (
            <div key={step.label} className="p-4 rounded-xl bg-surface border border-line space-y-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] uppercase font-bold text-ink">{step.label}</span>
                <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-line/60 text-muted font-semibold">{step.tag}</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="mt-12 pt-8 border-t border-line/80 relative">
      <div className="mb-8">
        <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-accent">
          DESIGN DECISIONS IN MOTION
        </span>
        <p className="text-sm text-muted mt-1">Scroll to see the transformation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative items-start">
        {/* Left Column: Scrolling Text Steps */}
        <div className="md:col-span-5 space-y-[40vh] pb-[40vh]">
          {steps.map((step, idx) => (
            <div
              key={step.label}
              className={cn(
                "p-6 rounded-2xl border transition-all duration-500",
                activeStep === idx
                  ? "bg-white border-accent/40 shadow-md scale-105"
                  : "bg-surface border-line/60 opacity-40 scale-100"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase font-bold text-ink">{step.label}</span>
                <span className="font-mono text-[9px] px-2 py-1 rounded bg-line/60 text-muted font-semibold">{step.tag}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Right Column: Sticky Visual Transformation */}
        <div className="md:col-span-7 sticky top-32 h-[60vh] flex flex-col items-center justify-center bg-surface/50 rounded-[32px] border border-line overflow-hidden p-8">
          {evidence.evidenceImages && evidence.evidenceImages.length > 0 ? (
            <VisualTransformation step={activeStep} images={evidence.evidenceImages} />
          ) : (
            <div className="text-center space-y-4 opacity-50">
              <svg className="w-12 h-12 mx-auto text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="font-mono text-[10px] uppercase font-bold text-muted tracking-widest">
                Screens not published yet
              </div>
              <p className="text-xs text-muted max-w-xs mx-auto">
                I haven&apos;t uploaded the specific UI screenshots for this architecture decision yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Visual Transformation Component ---
// Renders actual project screenshots/assets tied to the specific step.
function VisualTransformation({ step, images }: { step: number; images: string[] }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative w-full mx-auto">
      <motion.div
        layout
        className="w-full h-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 relative bg-white flex items-center justify-center"
      >
        {/* We use an img tag with crossfade logic instead of synthetic HTML mockups */}
        {images.map((imgSrc, idx) => (
          <motion.img
            key={imgSrc + idx}
            src={imgSrc}
            alt={`Evidence screenshot for step ${idx + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: idx === Math.min(step, images.length - 1) ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        ))}
      </motion.div>
    </div>
  );
}
