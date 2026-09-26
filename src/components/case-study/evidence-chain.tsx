"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotionConfig } from "motion/react";
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
  const shouldReduceMotion = useReducedMotionConfig();
  // false during SSR/hydration, true on the client (keeps the first render stable)
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (mounted && shouldReduceMotion) {
    return <EvidenceChainStatic evidence={evidence} />;
  }

  return <EvidenceChainAnimated evidence={evidence} />;
}

/** Reduced-motion fallback — no scroll hooks, no refs. */
function EvidenceChainStatic({ evidence }: EvidenceChainProps) {
  const steps = [
    { label: "1. Problem Evidence", text: evidence.problem, tag: "AUDIT DATA" },
    { label: "2. Design Decision", text: evidence.decision, tag: "ARCHITECTURAL CHOICE" },
    { label: "3. Implementation Evidence", text: evidence.implementation, tag: "SPEC / STORYBOOK" },
    { label: "4. Outcome Evidence", text: evidence.outcome, tag: "SHIPPED RESULT" },
  ];

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

/** Full animation — useScroll ref is always attached to the DOM here. */
function EvidenceChainAnimated({ evidence }: EvidenceChainProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const prevStepRef = React.useRef(0);

  const steps = [
    { label: "1. Problem Evidence", text: evidence.problem, tag: "AUDIT DATA" },
    { label: "2. Design Decision", text: evidence.decision, tag: "ARCHITECTURAL CHOICE" },
    { label: "3. Implementation Evidence", text: evidence.implementation, tag: "SPEC / STORYBOOK" },
    { label: "4. Outcome Evidence", text: evidence.outcome, tag: "SHIPPED RESULT" },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const stepIndex = useTransform(scrollYProgress, [0, 1], [0, steps.length - 1]);

  useMotionValueEvent(stepIndex, "change", (latest) => {
    const clamped = Math.round(Math.max(0, Math.min(steps.length - 1, latest)));
    setActiveStep(clamped);
    if (prevStepRef.current !== clamped) {
      trackScrollMilestone("EvidenceChain", steps[clamped].label);
      prevStepRef.current = clamped;
    }
  });

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
        <div className="md:col-span-7 sticky top-32 h-[60vh] flex flex-col items-center justify-center bg-surface/50 rounded-[32px] border border-line overflow-hidden p-6 sm:p-8">
          {evidence.evidenceImages && evidence.evidenceImages.length > 0 ? (
            <VisualTransformation step={activeStep} images={evidence.evidenceImages} />
          ) : (
            <SimulatedWorkspace step={activeStep} evidence={evidence} />
          )}
        </div>
      </div>
    </div>
  );
}

// --- Realistic Simulated Workspace ---
// Simulates the actual software development process: Ticket -> Design -> Code -> Analytics
function SimulatedWorkspace({ step, evidence }: { step: number; evidence: EvidenceChainProps["evidence"] }) {
  return (
    <div className="w-full h-full relative overflow-hidden bg-surface rounded-[24px] flex flex-col shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] border border-line">
      
      {/* OS Header Bar */}
      <div className="h-10 border-b border-line/60 bg-white/50 flex items-center px-4 gap-2 shrink-0 relative z-10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center font-mono text-[9px] uppercase tracking-widest text-muted font-semibold truncate px-4">
          {step === 0 && "Linear · Linear.app"}
          {step === 1 && "Figma · Design_System.fig"}
          {step === 2 && "Cursor · Component.tsx"}
          {step === 3 && "PostHog · Analytics Dashboard"}
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-[#fafafa]">
        
        {/* Step 0: Linear Ticket (Problem) */}
        <motion.div
          className="absolute inset-0 p-6 flex flex-col gap-4 bg-white"
          initial={false}
          animate={{ opacity: step === 0 ? 1 : 0, y: step === 0 ? 0 : -20, pointerEvents: step === 0 ? "auto" : "none" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 border-b border-line/60 pb-4">
            <span className="px-2 py-1 bg-red-100 text-red-700 font-mono text-[10px] rounded font-bold uppercase">Bug</span>
            <span className="font-mono text-xs text-muted">PRJ-1042</span>
          </div>
          <h4 className="font-semibold text-ink text-sm">Audit Findings / Friction Report</h4>
          <div className="p-4 bg-red-50/50 rounded-xl border border-red-100/50">
            <p className="text-sm text-ink/80 leading-relaxed font-mono">{evidence.problem}</p>
          </div>
        </motion.div>

        {/* Step 1: Figma Canvas (Decision & Design) */}
        <motion.div
          className="absolute inset-0 p-4 sm:p-6 flex flex-col items-center justify-center bg-[#f0f0f0] bg-[radial-gradient(#d1d1d1_1px,transparent_1px)] [background-size:16px_16px]"
          initial={false}
          animate={{ opacity: step === 1 ? 1 : 0, scale: step === 1 ? 1 : 0.95, pointerEvents: step === 1 ? "auto" : "none" }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-[280px] sm:max-w-sm relative bg-white p-5 rounded-xl shadow-sm border border-blue-400/40 ring-2 ring-blue-500/20">
            {/* Fake Figma Selection handles */}
            <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-500" />
            <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-500" />
            <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-500" />
            <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-2 border-blue-500" />
            
            <div className="absolute -top-8 left-0 flex items-center gap-2">
              <span className="bg-blue-500 text-white font-mono text-[9px] px-2 py-0.5 rounded-sm shadow-sm flex items-center gap-1.5">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="rotate-[-45deg]"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
                Drafting Design
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-ink font-medium leading-relaxed">{evidence.decision}</p>
              
              {/* Mini Generative Wireframe Animation */}
              <div className="w-full aspect-[16/9] bg-[#f8f9fa] rounded-lg border border-line flex overflow-hidden shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)]">
                {/* Sidebar Wireframe */}
                <motion.div 
                  className="w-[30%] h-full border-r border-line p-2 space-y-2 bg-white"
                  initial={false}
                  animate={{ x: step === 1 ? 0 : -30, opacity: step === 1 ? 1 : 0 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0 }}
                >
                  <div className="h-2 bg-line/80 rounded w-full" />
                  <div className="h-1.5 bg-line/50 rounded w-3/4" />
                  <div className="h-1.5 bg-line/50 rounded w-5/6" />
                </motion.div>
                
                {/* Main Content Wireframe */}
                <div className="flex-1 p-2.5 space-y-2.5 flex flex-col bg-white/50">
                  <motion.div 
                    className="flex justify-between items-center"
                    initial={false}
                    animate={{ y: step === 1 ? 0 : -10, opacity: step === 1 ? 1 : 0 }}
                    transition={{ delay: 0.3, type: "spring", bounce: 0 }}
                  >
                    <div className="h-2.5 w-1/2 bg-line/80 rounded" />
                    <div className="h-2.5 w-2.5 rounded-full bg-line/50" />
                  </motion.div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {[0, 1].map(i => (
                      <motion.div 
                        key={i} 
                        className="h-8 border border-line rounded bg-white p-1.5 space-y-1.5 shadow-xs"
                        initial={false}
                        animate={{ scale: step === 1 ? 1 : 0.8, opacity: step === 1 ? 1 : 0 }}
                        transition={{ delay: 0.4 + (i * 0.1), type: "spring", bounce: 0 }}
                      >
                        <div className="h-1 w-1/2 bg-line/60 rounded" />
                        <div className="h-1.5 w-3/4 bg-[var(--accent)]/40 rounded" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="flex-1 border border-line rounded mt-auto flex items-end px-2 gap-1 overflow-hidden bg-white shadow-xs"
                    initial={false}
                    animate={{ y: step === 1 ? 0 : 20, opacity: step === 1 ? 1 : 0 }}
                    transition={{ delay: 0.6, type: "spring", bounce: 0 }}
                  >
                    {[30, 50, 40, 70, 60, 90, 80].map((h, i) => (
                      <motion.div 
                        key={i} 
                        className="flex-1 bg-line/60 rounded-t-[1px]" 
                        initial={false}
                        animate={{ height: step === 1 ? `${h}%` : "0%" }} 
                        transition={{ delay: 0.7 + (i * 0.05), type: "spring", bounce: 0 }}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 2: VS Code (Implementation) */}
        <motion.div
          className="absolute inset-0 p-6 bg-[#0E0E11] text-[#A1A1AA] font-mono text-[11px] sm:text-xs overflow-hidden"
          initial={false}
          animate={{ opacity: step === 2 ? 1 : 0, y: step === 2 ? 0 : 20, pointerEvents: step === 2 ? "auto" : "none" }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-1.5 whitespace-pre-wrap">
            <span className="text-[#F472B6]">export</span> <span className="text-[#F472B6]">function</span> <span className="text-[#38BDF8]">ImplementationSpec</span>() {"{"}
            <br/>
            <span className="text-[#F472B6] pl-4">return</span> (
            <br/>
            <span className="text-[#38BDF8] pl-8">{"<SystemProvider>"}</span>
            <br/>
            <span className="text-[#A3E635] pl-12">{"//"} {evidence.implementation}</span>
            <br/>
            <span className="text-[#38BDF8] pl-8">{"</SystemProvider>"}</span>
            <br/>
            <span className="pl-4">);</span>
            <br/>
            {"}"}
          </div>
          <motion.div 
            className="w-2 h-4 bg-white/80 mt-2 ml-12 animate-pulse"
            animate={{ opacity: step === 2 ? [1, 0, 1] : 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>

        {/* Step 3: Analytics (Outcome) */}
        <motion.div
          className="absolute inset-0 p-6 flex flex-col justify-center items-center bg-white"
          initial={false}
          animate={{ opacity: step === 3 ? 1 : 0, scale: step === 3 ? 1 : 1.05, pointerEvents: step === 3 ? "auto" : "none" }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-sm p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center relative overflow-hidden shadow-sm">
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-emerald-200/50 to-transparent"
              initial={{ y: "100%" }}
              animate={{ y: step === 3 ? "0%" : "100%" }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            />
            <span className="relative z-10 px-3 py-1 bg-emerald-100 text-emerald-700 font-mono text-[10px] rounded-full font-bold uppercase tracking-wider shadow-sm border border-emerald-200">Verified Outcome</span>
            <p className="relative z-10 mt-4 text-emerald-950 font-medium leading-relaxed">{evidence.outcome}</p>
          </div>
        </motion.div>

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
