"use client";

import * as React from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

// --- Data for the 6 Stages ---
const stages = [
  {
    id: "context",
    name: "01 Context",
    leftTitle: "Understand & Synthesize",
    leftActivity: [
      "Requirements organized",
      "Constraints identified",
      "User roles mapped",
      "Dependencies identified",
      "Open questions captured",
    ],
    leftNote: "AI helps synthesize raw complex inputs quickly.",
  },
  {
    id: "strategy",
    name: "02 Strategy",
    leftTitle: "UX Architecture",
    leftActivity: [
      "Mapping workflow",
      "Exploring information architecture",
      "Comparing interaction approaches",
      "Identifying edge cases",
      "Drafting UX copy alternatives",
    ],
    leftNote: "AI helps me explore. I make the final UX decisions.",
  },
  {
    id: "design",
    name: "03 Design",
    leftTitle: "Figma Source of Truth",
    leftActivity: [
      "Page structure established",
      "Tokens & styles applied",
      "Component states defined",
      "Responsive rules mapped",
      "Auto-layout configured",
    ],
    leftNote: "The design system remains the absolute source of truth.",
  },
  {
    id: "build",
    name: "04 Build",
    leftTitle: "Agentic Implementation",
    leftActivity: [
      "Reading design context (MCP)",
      "Creating component structure",
      "Applying design tokens",
      "Implementing responsive states",
      "Preparing Storybook states",
    ],
    leftNote: "AI scaffolds the boilerplate component code rapidly.",
  },
  {
    id: "refine",
    name: "05 My Refinement",
    leftTitle: "Human Review & QA",
    leftActivity: [
      "Adjusted information hierarchy",
      "Simplified interaction flow",
      "Corrected component states",
      "Reviewed accessibility (WCAG AA)",
      "Refined visual details",
    ],
    leftNote: "I own the final quality, compliance, and product decisions.",
  },
  {
    id: "ship",
    name: "06 Ship",
    leftTitle: "Production & Documentation",
    leftActivity: [
      "Component states ✓",
      "Responsive ✓",
      "Accessibility reviewed ✓",
      "Design system aligned ✓",
      "Storybook documented ✓",
    ],
    leftNote: "AI accelerated execution. I owned the product decisions.",
  },
];

// --- Data for Tools & Outcomes ---
const tools = [
  { name: "Claude + ChatGPT", role: "Research, synthesis, requirements, UX exploration, documentation, and context." },
  { name: "Figma + Figma MCP", role: "Design source of truth, components, variables, and design-to-code context." },
  { name: "Cursor + Copilot", role: "Prompt-driven implementation, component scaffolding, and code assistance." },
  { name: "Antigravity", role: "Agentic development, multi-step implementation, UI building, and debugging." },
  { name: "Angular / Next.js", role: "Functional prototypes and production interfaces using Tailwind/PrimeNG." },
  { name: "Storybook", role: "Component states, validation, documentation, themes, and consistency." },
];

const outcomes = [
  "Faster movement from requirements to testable prototypes",
  "More UX alternatives explored before committing",
  "Better management of long-running project context",
  "Faster transition from Figma to functional interfaces",
  "Less repetitive implementation and documentation work",
  "Functional prototypes instead of only static screens",
  "Better designer-to-developer handoff",
  "Faster iteration without losing design intent",
];

export function S8AiWorkflow() {
  const [activeStage, setActiveStage] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  // Auto-play logic
  React.useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => {
        if (prev === stages.length - 1) {
          // Pause briefly at the end before restarting
          return 0;
        }
        return prev + 1;
      });
    }, 4500); // 4.5s per stage
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <section id="ai-workflow" className="w-full py-20 lg:py-32 bg-background border-t border-line">
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            AI IN MY WORKFLOW
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-tight mb-4">
            AI accelerates the workflow.<br />
            <em className="font-serif font-normal italic">I own the decisions.</em>
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            I use modern agentic workflows to handle complex enterprise products, prototype quickly, and bridge Figma to production code—while ensuring UX reasoning and final quality remain human-led.
          </p>
        </div>

        {/* 1. Interactive Auto-Playing Workflow */}
        <div className="mb-16 rounded-2xl bg-white border border-line shadow-sm overflow-hidden flex flex-col">
          {/* Top Nav */}
          <div className="flex overflow-x-auto border-b border-line bg-[#FAFAF7] hide-scrollbar">
            {stages.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStage(idx);
                  setIsPlaying(false);
                }}
                className={cn(
                  "flex-1 min-w-[120px] py-4 px-4 text-left border-r border-line transition-colors relative",
                  activeStage === idx
                    ? "bg-white"
                    : "hover:bg-black/5"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-mono text-[10px] font-bold uppercase tracking-wider",
                    activeStage === idx ? "text-accent" : "text-muted"
                  )}>
                    {stage.name}
                  </span>
                </div>
                {/* Active Indicator Bar */}
                {activeStage === idx && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                )}
              </button>
            ))}
          </div>

          {/* Split Pane Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
            
            {/* LEFT: Live Context / Process */}
            <div className="p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-line bg-white">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-accent/10 text-accent font-mono text-[10px] uppercase font-bold tracking-wider mb-6">
                  {activeStage === 4 ? "I OWNED" : activeStage === 5 ? "FINAL RESULT" : "AI ASSISTED WITH"}
                </div>
                
                <h3 className="text-xl font-semibold text-ink mb-6">
                  {stages[activeStage].leftTitle}
                </h3>

                <ul className="space-y-4">
                  {stages[activeStage].leftActivity.map((activity, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-accent/60 mt-0.5 shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span className={cn(
                        "text-sm font-medium",
                        activeStage === 4 ? "text-ink" : "text-muted" // Highlight human review stage text
                      )}>
                        {activity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 pt-6 border-t border-line/60">
                <p className="font-mono text-xs text-muted leading-relaxed">
                  {stages[activeStage].leftNote}
                </p>
              </div>
            </div>

            {/* RIGHT: Visual Output / Product Preview */}
            <div className="p-8 lg:p-12 bg-[#FAFAF7] flex items-center justify-center relative overflow-hidden">
              <span className="absolute top-4 right-4 font-mono text-[10px] text-muted/50 uppercase tracking-widest">
                Workflow Example
              </span>
              
              <div className="w-full max-w-sm aspect-[4/3] relative flex items-center justify-center">
                {/* Stage 01: Context (Document) */}
                <div className={cn("absolute inset-0 transition-opacity duration-500", activeStage === 0 ? "opacity-100 z-10" : "opacity-0 z-0")}>
                  <div className="w-full h-full bg-white rounded-lg shadow-sm border border-line p-6 font-mono text-[10px] text-muted space-y-3">
                    <div className="h-3 w-1/3 bg-line rounded mb-6"></div>
                    <div className="h-2 w-full bg-line/50 rounded"></div>
                    <div className="h-2 w-5/6 bg-line/50 rounded"></div>
                    <div className="h-2 w-4/6 bg-line/50 rounded"></div>
                    <div className="my-4 border-b border-dashed border-line/60"></div>
                    <div className="h-2 w-full bg-line/50 rounded"></div>
                    <div className="h-2 w-full bg-line/50 rounded"></div>
                  </div>
                </div>

                {/* Stage 02: Strategy (Flowchart) */}
                <div className={cn("absolute inset-0 transition-opacity duration-500", activeStage === 1 ? "opacity-100 z-10" : "opacity-0 z-0")}>
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <div className="px-4 py-2 border border-line bg-white rounded shadow-sm text-xs text-ink font-medium">Patient Details</div>
                    <div className="h-4 w-px bg-line"></div>
                    <div className="px-4 py-2 border border-line bg-white rounded shadow-sm text-xs text-ink font-medium">Billing Queue</div>
                    <div className="h-4 w-px bg-line"></div>
                    <div className="px-4 py-2 border-2 border-accent bg-accent/5 rounded shadow-sm text-xs text-accent font-semibold">Generate Invoice</div>
                  </div>
                </div>

                {/* Stage 03: Design (Figma UI) */}
                <div className={cn("absolute inset-0 transition-opacity duration-500", activeStage === 2 ? "opacity-100 z-10" : "opacity-0 z-0")}>
                  <div className="w-full h-full bg-white rounded-lg shadow-md border border-line overflow-hidden flex flex-col">
                    <div className="h-8 border-b border-line bg-[#FAFAF7] flex items-center px-3 gap-2">
                      <div className="w-2 h-2 rounded-full bg-line"></div>
                      <div className="w-2 h-2 rounded-full bg-line"></div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="h-4 w-1/4 bg-ink/10 rounded mb-4"></div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="h-12 bg-line/30 rounded border border-dashed border-line"></div>
                        <div className="h-12 bg-line/30 rounded border border-dashed border-line"></div>
                        <div className="h-12 bg-line/30 rounded border border-dashed border-line"></div>
                      </div>
                      <div className="h-24 bg-accent/5 rounded border border-accent/20"></div>
                    </div>
                  </div>
                </div>

                {/* Stage 04: Build (Code Editor) */}
                <div className={cn("absolute inset-0 transition-opacity duration-500", activeStage === 3 ? "opacity-100 z-10" : "opacity-0 z-0")}>
                  <div className="w-full h-full bg-[#1E1E1E] rounded-lg shadow-xl border border-[#333] overflow-hidden flex flex-col font-mono text-[10px] text-[#D4D4D4] p-5">
                    <div className="text-[#569CD6]">import <span className="text-[#9CDCFE]">{'{ InvoiceCard }'}</span> from <span className="text-[#CE9178]">&apos;@/components&apos;</span>;</div>
                    <br/>
                    <div className="text-[#569CD6]">export function <span className="text-[#DCDCAA]">BillingView</span>() {'{'}</div>
                    <div className="pl-4 mt-2">
                      <div className="text-[#C586C0]">return (</div>
                      <div className="pl-4 text-[#808080] mt-1">{"//"} AI: Scaffolded responsive layout based on MCP</div>
                      <div className="pl-4 mt-3 h-1.5 w-1/2 bg-[#333] rounded animate-pulse"></div>
                      <div className="pl-4 mt-2 h-1.5 w-2/3 bg-[#333] rounded animate-pulse"></div>
                      <div className="pl-4 mt-2 h-1.5 w-1/3 bg-[#333] rounded animate-pulse"></div>
                      <div className="mt-3 text-[#C586C0]">)</div>
                    </div>
                    <div className="text-[#569CD6]">{'}'}</div>
                  </div>
                </div>

                {/* Stage 05: Refine (Annotated UI) */}
                <div className={cn("absolute inset-0 transition-opacity duration-500", activeStage === 4 ? "opacity-100 z-10" : "opacity-0 z-0")}>
                  <div className="w-full h-full bg-white rounded-lg shadow-lg border border-line overflow-hidden flex flex-col relative">
                    <div className="flex-1 p-4 pointer-events-none opacity-50">
                      <div className="h-4 w-1/4 bg-ink/80 rounded mb-4"></div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="h-12 bg-line/30 rounded border border-line"></div>
                        <div className="h-12 bg-line/30 rounded border border-line"></div>
                        <div className="h-12 bg-line/30 rounded border border-line"></div>
                      </div>
                      <div className="h-24 bg-line/20 rounded border border-line"></div>
                    </div>
                    {/* Annotations */}
                    <div className="absolute top-12 left-2 bg-[#EF4444] text-white text-[9px] font-semibold px-2 py-1 rounded shadow-md z-20">Fixed spacing to match tokens</div>
                    <div className="absolute bottom-6 right-2 bg-[#3B82F6] text-white text-[9px] font-semibold px-2 py-1 rounded shadow-md z-20">Increased contrast for WCAG AA</div>
                  </div>
                </div>

                {/* Stage 06: Ship (Polished UI) */}
                <div className={cn("absolute inset-0 transition-opacity duration-500", activeStage === 5 ? "opacity-100 z-10" : "opacity-0 z-0")}>
                  <div className="w-full h-full bg-white rounded-lg shadow-xl border border-line overflow-hidden flex flex-col">
                    <div className="flex-1 p-4 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="h-4 w-1/4 bg-ink/90 rounded"></div>
                        <div className="px-2 py-1 bg-accent rounded text-[8px] text-white flex items-center justify-center font-medium">Create Invoice</div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="h-12 bg-white rounded shadow-sm border border-line"></div>
                        <div className="h-12 bg-white rounded shadow-sm border border-line"></div>
                        <div className="h-12 bg-white rounded shadow-sm border border-line"></div>
                      </div>
                      <div className="flex-1 bg-[#FAFAF7] rounded border border-line flex items-center justify-center">
                        <div className="flex items-center gap-1.5 bg-[#10B981]/10 text-[#10B981] px-3 py-1.5 rounded-full text-[10px] font-semibold border border-[#10B981]/20">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          Production Ready
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* 2 & 3. Tools + Purpose and Outcomes (Grid Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8 border-t border-line/60">
          
          {/* Tools */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink font-semibold">
              Tools &amp; Their Role
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <div key={tool.name} className="p-4 rounded-xl bg-white border border-line">
                  <div className="font-semibold text-sm text-ink mb-1">{tool.name}</div>
                  <div className="text-xs text-muted leading-relaxed">{tool.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink font-semibold">
              What AI Helps Me Achieve
            </h3>
            <ul className="space-y-3">
              {outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-muted">
                  <span className="text-accent mt-0.5 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  <span className="leading-relaxed">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
