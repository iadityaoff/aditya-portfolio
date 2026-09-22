import * as React from "react";

export interface EvidenceChainProps {
  evidence: {
    problem: string;
    decision: string;
    implementation: string;
    outcome: string;
  };
}

export function EvidenceChain({ evidence }: EvidenceChainProps) {
  const steps = [
    { label: "1. Problem Evidence", text: evidence.problem, tag: "AUDIT DATA" },
    { label: "2. Design Decision", text: evidence.decision, tag: "ARCHITECTURAL CHOICE" },
    { label: "3. Implementation Evidence", text: evidence.implementation, tag: "SPEC / STORYBOOK" },
    { label: "4. Outcome Evidence", text: evidence.outcome, tag: "SHIPPED RESULT" },
  ];

  return (
    <div className="mt-6 pt-6 border-t border-line/80 space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-accent">
          EVIDENCE CHAIN (VERIFIABLE PROOF)
        </span>
        <span className="font-mono text-[10px] text-muted">
          4-Stage Traceability
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((step, idx) => (
          <div
            key={step.label}
            className="p-4 rounded-xl bg-[#FAFAF7] border border-line flex flex-col justify-between space-y-2"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] uppercase font-bold text-ink">
                  {step.label}
                </span>
                <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-line/60 text-muted font-semibold">
                  {step.tag}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                {step.text}
              </p>
            </div>

            {idx < 3 && (
              <div className="hidden lg:block text-right text-accent font-mono text-xs font-bold pt-1 select-none">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
