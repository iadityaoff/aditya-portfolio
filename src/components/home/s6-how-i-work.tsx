"use client";

import * as React from "react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/content/site";
import { cn } from "@/lib/utils";

export function S6HowIWork() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <section className="w-full py-20 lg:py-32 bg-white/60 border-t border-line">
      <Container size="default">
        <SectionHeading
          eyebrow="PROCESS &amp; METHODOLOGY"
          title={
            <>
              How I solve <em>ambiguous product problems.</em>
            </>
          }
          description="A systematic six-step approach transitioning from problem topology to engineering handoff with concrete artifacts at every stage."
          className="mb-16"
        />

        {/* Stepper (Horizontal on desktop, vertical on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {processSteps.map((step, idx) => {
            const isActive = idx === activeStep;

            return (
              <div
                key={step.name}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px]",
                  isActive
                    ? "bg-[#FAFAF7] border-accent shadow-md -translate-y-1"
                    : "bg-white border-line hover:border-ink/30"
                )}
              >
                <div>
                  {/* Step Number & Pulse */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={cn(
                        "font-mono text-xs font-bold tracking-wider",
                        isActive ? "text-accent" : "text-muted"
                      )}
                    >
                      {step.number}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-ink tracking-tight mb-2">
                    {step.name}
                  </h3>

                  <p className="text-xs text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Artifact Chip */}
                <div className="pt-4 border-t border-line/60 mt-4 space-y-2">
                  <span
                    className={cn(
                      "font-mono text-[10px] uppercase font-semibold px-2 py-1 rounded-md tracking-wider block text-center truncate",
                      isActive
                        ? "bg-accent/10 text-accent border border-accent/20"
                        : "bg-line/40 text-muted"
                    )}
                  >
                    {step.artifact}
                  </span>

                  {/* AI Tool Chip (subtle, subordinate) */}
                  {step.aiTools && (
                    <span
                      className={cn(
                        "font-mono text-[9px] px-2 py-0.5 rounded-md block text-center truncate transition-colors",
                        isActive
                          ? "text-accent/70 bg-accent/5"
                          : "text-muted/60"
                      )}
                    >
                      {step.aiTools}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
