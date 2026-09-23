"use client";

import * as React from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

export function S7DesignEngineering() {
  const [viewMode, setViewMode] = React.useState<"design" | "code">("design");

  return (
    <section className="w-full py-20 lg:py-32 bg-background border-t border-line">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 3 short paragraphs explaining the advantage */}
          <div className="lg:col-span-5 space-y-6">
            <p className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              THE DESIGN-ENGINEERING BRIDGE
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-tight">
              Speaking fluent code changes{" "}
              <em className="font-serif font-normal italic">how you design.</em>
            </h2>

            <div className="space-y-4 text-base text-muted leading-relaxed">
              <p>
                Knowing HTML, CSS, Tailwind, and component frameworks means I don&apos;t design impossible interactions. I design with flexbox wrapping, CSS grid constraints, container queries, and DOM rendering costs in mind from day one.
              </p>
              <p>
                Instead of handing engineers static artboards, I deliver tokens, state variants, and auto-layout structures that map directly to component props in React or Angular templates.
              </p>
              <p>
                The result is zero translation friction during implementation sprints, virtually eliminating design debt and endless QA discrepancy tickets.
              </p>
            </div>

            {/* AI-assisted handoff note per §2.1 S7 */}
            <div className="p-4 rounded-xl bg-white border border-line flex items-start gap-3">
              <span className="font-mono text-xs text-accent font-bold pt-0.5">AI</span>
              <p className="text-xs text-muted leading-normal">
                <strong>Agent-ready specs:</strong> I structure component definitions with clean markdown specs and prop dictionaries optimized for AI-assisted workflows (Cursor, GitHub Copilot).
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Design vs Code Toggle */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white border border-line shadow-lg overflow-hidden">
              {/* Header with toggle */}
              <div className="p-4 sm:p-5 bg-line/20 border-b border-line flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <span className="font-mono text-xs font-semibold text-ink">
                    Button / PrimaryAction.tsx
                  </span>
                </div>

                {/* Toggle Button */}
                <div className="flex items-center p-1 rounded-lg bg-white border border-line shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setViewMode("design")}
                    className={cn(
                      "font-mono text-xs px-3 py-1 rounded-md transition-colors cursor-pointer",
                      viewMode === "design"
                        ? "bg-ink text-white font-semibold"
                        : "text-muted hover:text-ink"
                    )}
                  >
                    Figma Design
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("code")}
                    className={cn(
                      "font-mono text-xs px-3 py-1 rounded-md transition-colors cursor-pointer",
                      viewMode === "code"
                        ? "bg-accent text-white font-semibold"
                        : "text-muted hover:text-ink"
                    )}
                  >
                    Code &amp; Props
                  </button>
                </div>
              </div>

              {/* View Content */}
              <div className="p-6 sm:p-8 min-h-[340px] flex items-center justify-center">
                {viewMode === "design" ? (
                  /* Figma Component Representation */
                  <div className="w-full max-w-md space-y-6">
                    <div className="p-6 rounded-xl bg-[#FAFAF7] border border-dashed border-accent/40 text-center space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-white font-medium text-sm shadow-xs">
                        <span>Save &amp; Continue</span>
                        <span>→</span>
                      </div>
                      <p className="font-mono text-xs text-muted">
                        Auto Layout: Horizontal (Gap: 8px, Pad: 12px 24px)
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-2.5 rounded-lg bg-line/20 border border-line/60">
                        <span className="text-muted block text-xs">VARIANT</span>
                        <span className="text-ink font-semibold">variant = &quot;primary&quot;</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-line/20 border border-line/60">
                        <span className="text-muted block text-xs">CORNER RADIUS</span>
                        <span className="text-ink font-semibold">radius = 9999px</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-line/20 border border-line/60">
                        <span className="text-muted block text-xs">COLOR VARIABLE</span>
                        <span className="text-accent font-semibold">var(--color-accent)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-line/20 border border-line/60">
                        <span className="text-muted block text-xs">STATES</span>
                        <span className="text-ink font-semibold">6 explicit variants</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Code Component Representation */
                  <div className="w-full font-mono text-xs leading-relaxed bg-[#0B0B0F] text-[#F4F4F5] p-5 rounded-xl border border-showcase-border overflow-x-auto">
                    <div className="text-muted mb-2">{"// 1:1 prop parity with Figma auto-layout"}</div>
                    <p className="text-purple-400">interface <span className="text-yellow-300">ButtonProps</span> &#123;</p>
                    <p className="pl-4 text-sky-300">variant?: <span className="text-emerald-300">&quot;primary&quot; | &quot;secondary&quot; | &quot;ghost&quot;</span>;</p>
                    <p className="pl-4 text-sky-300">size?: <span className="text-emerald-300">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</span>;</p>
                    <p className="pl-4 text-sky-300">iconRight?: <span className="text-yellow-300">React.ReactNode</span>;</p>
                    <p className="pl-4 text-sky-300">loading?: <span className="text-orange-400">boolean</span>;</p>
                    <p className="text-purple-400">&#125;</p>
                    <div className="my-2 border-t border-white/10" />
                    <p className="text-purple-400">export function <span className="text-blue-400">Button</span>(&#123; variant = <span className="text-emerald-300">&quot;primary&quot;</span>, ...props &#125;) &#123;</p>
                    <p className="pl-4 text-pink-400">return (</p>
                    <p className="pl-8 text-sky-200">&lt;<span className="text-emerald-400">button</span> className=&#123;<span className="text-blue-300">cn</span>(styles[variant])&#125; &#123;...props&#125; /&gt;</p>
                    <p className="pl-4 text-pink-400">);</p>
                    <p className="text-purple-400">&#125;</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
