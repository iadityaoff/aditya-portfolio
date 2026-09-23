"use client";

import * as React from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "motion/react";

export function S4FeaturedDesignSystem() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [previewState, setPreviewState] = React.useState<"default" | "hover" | "focus" | "disabled">("default");
  const sectionRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const pipelineSteps = [
    { name: "Figma", desc: "Variables & semantic slots", token: "global.blue.500" },
    { name: "Tokens", desc: "Automated JSON pipeline", token: "color.interactive.primary" },
    { name: "Code", desc: "React & Angular SCSS/Tailwind", token: "var(--btn-bg-primary)" },
    { name: "AI Scaffold", desc: "Agent-assisted component generation", token: "Cursor + Antigravity → Review" },
    { name: "Storybook", desc: "Verified state parity & a11y", token: "62 Documented Stories" },
    { name: "Products", desc: "4 Enterprise platforms live", token: "Zero Design Drift" },
  ];

  // Scroll-driven pipeline: section progress maps to active step
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const stepIndex = useTransform(scrollYProgress, [0.1, 0.9], [0, pipelineSteps.length - 1]);

  useMotionValueEvent(stepIndex, "change", (latest) => {
    const clamped = Math.round(Math.max(0, Math.min(pipelineSteps.length - 1, latest)));
    setActiveStep(clamped);
  });

  // Fallback timer for reduced-motion users (original behavior)
  React.useEffect(() => {
    if (!shouldReduceMotion) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [pipelineSteps.length, shouldReduceMotion]);

  return (
    <section ref={sectionRef} className="w-full bg-showcase text-white py-20 lg:py-32 relative overflow-hidden border-y border-showcase-border">
      {/* Background soft glow */}
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[600px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & 3 Bullets */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-showcase-border bg-showcase-card text-accent font-mono text-xs uppercase tracking-widest font-semibold">
              FEATURED DESIGN SYSTEM
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              Designing systems, <em className="font-serif font-normal italic text-white">not just screens.</em>
            </h2>

            <p className="text-base text-showcase-muted leading-relaxed">
              Before drawing mockups, I build the underlying token architecture, component states, and handoff contracts that empower development teams to ship consistently.
            </p>

            <ul className="space-y-4 pt-2">
              <li className="flex items-start gap-3 text-sm text-white/90">
                <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong>Three-tier token hierarchy:</strong> Global primitives → Semantic aliases → Component tokens for instant theming.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong>Full state completeness:</strong> Every component documented across default, hover, active, focus, disabled, and error.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong>Developer parity:</strong> Component variants in Figma mirror TypeScript props in React and Angular 1:1.
                </span>
              </li>
            </ul>

            <div className="pt-4">
              <Button
                href="/design-system"
                variant="dark"
                size="md"
                iconRight={<span aria-hidden="true">→</span>}
              >
                Explore the system
              </Button>
            </div>
          </div>

          {/* Right Column: Pipeline Diagram + Interactive Component Preview */}
          <div className="lg:col-span-7 space-y-6">
            {/* Animated Pipeline Diagram */}
            <div className="rounded-2xl bg-showcase-card border border-showcase-border p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-showcase-border mb-6">
                <span className="font-mono text-xs text-accent uppercase tracking-wider font-semibold">
                  TOKEN &amp; COMPONENT LIFECYCLE
                </span>
                <span className="font-mono text-xs text-showcase-muted">
                  STEP 0{activeStep + 1} / 06
                </span>
              </div>

              {/* Horizontal / Vertical Pipeline Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {pipelineSteps.map((step, idx) => {
                  const isCurrent = idx === activeStep;
                  return (
                    <div
                      key={step.name}
                      onClick={() => setActiveStep(idx)}
                      className={cn(
                        "relative p-3.5 rounded-xl border transition-all duration-300 cursor-pointer text-left flex flex-col justify-between min-h-[96px]",
                        isCurrent
                          ? "bg-accent/15 border-accent text-white shadow-md shadow-accent/10"
                          : "bg-showcase/60 border-showcase-border text-showcase-muted hover:border-white/20 hover:text-white"
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-accent font-bold">
                            0{idx + 1}
                          </span>
                          {isCurrent && (
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                          )}
                        </div>
                        <p className="font-semibold text-sm mt-1 text-white">{step.name}</p>
                      </div>
                      <p className="font-mono text-xs line-clamp-2 text-showcase-muted mt-2">
                        {step.token}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 text-xs text-showcase-muted flex items-center justify-between">
                <span>{pipelineSteps[activeStep].desc}</span>
                <span className="font-mono text-accent text-xs">Active Pipeline Pulse</span>
              </div>
            </div>

            {/* Interactive Live Component Preview (Button with 4 states) */}
            <div className="rounded-2xl bg-showcase-card border border-showcase-border p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Live Component Playground</h3>
                  <p className="text-xs text-showcase-muted">Test state definitions in real-time</p>
                </div>

                {/* State switch buttons */}
                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-showcase border border-showcase-border">
                  {(["default", "hover", "focus", "disabled"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setPreviewState(st)}
                      className={cn(
                        "font-mono text-xs uppercase px-2.5 py-1 rounded-md transition-colors cursor-pointer",
                        previewState === st
                          ? "bg-accent text-white font-bold"
                          : "text-showcase-muted hover:text-white"
                      )}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Stage */}
              <div className="p-8 rounded-xl bg-showcase border border-showcase-border/80 flex flex-col sm:flex-row items-center justify-around gap-6">
                {/* Simulated component based on selected state */}
                <button
                  type="button"
                  disabled={previewState === "disabled"}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 cursor-pointer",
                    previewState === "default" && "bg-accent text-white shadow-sm hover:bg-accent-hover",
                    previewState === "hover" && "bg-accent-hover text-white shadow-md -translate-y-0.5",
                    previewState === "focus" && "bg-accent text-white ring-2 ring-white ring-offset-2 ring-offset-showcase",
                    previewState === "disabled" && "bg-white/10 text-white/30 cursor-not-allowed"
                  )}
                >
                  Confirm Transaction →
                </button>

                {/* Token spec display */}
                <div className="font-mono text-xs text-showcase-muted space-y-1">
                  <p><span className="text-white/40">padding:</span> 12px 24px</p>
                  <p><span className="text-white/40">radius:</span> 9999px (full)</p>
                  <p><span className="text-white/40">bg-token:</span> <span className="text-accent">var(--color-accent)</span></p>
                  <p><span className="text-white/40">focus-ring:</span> 2px offset</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
