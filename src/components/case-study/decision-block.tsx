import * as React from "react";
import { DecisionItem } from "@/types";
import { EvidenceChain } from "./evidence-chain";

export interface DecisionBlockProps {
  decisions: DecisionItem[];
}

export function DecisionBlock({ decisions }: DecisionBlockProps) {
  return (
    <section id="decisions" className="my-16 space-y-10">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          05 · KEY ARCHITECTURAL DECISIONS &amp; EVIDENCE
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink mt-2">
          Why this architecture, and what evidence justifies it.
        </h2>
        <p className="text-muted text-base mt-2 max-w-3xl">
          Every decision below connects directly from an identified workflow pain point, through rejected alternatives and implementation specs, to measurable operational outcomes.
        </p>
      </div>

      <div className="space-y-8">
        {decisions.map((item, idx) => (
          <div
            key={item.title}
            className="p-6 sm:p-8 rounded-[20px] bg-white border border-line shadow-xs space-y-6"
          >
            {/* Decision Title & Counter */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-line">
              <h3 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
                {item.title}
              </h3>
              <span className="font-mono text-xs font-bold text-accent shrink-0">
                DECISION 0{idx + 1}
              </span>
            </div>

            {/* Rationale and Alternatives */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-muted font-bold block">
                  CORE RATIONALE &amp; INTERACTION MODEL
                </span>
                <p className="text-base text-ink leading-relaxed">
                  {item.reason}
                </p>
              </div>

              {item.alternative && (
                <div className="md:col-span-4 p-4 rounded-xl bg-line/20 border border-line/60 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold text-muted block">
                    ALTERNATIVE CONSIDERED &amp; REJECTED
                  </span>
                  <p className="text-xs text-muted leading-relaxed">
                    {item.alternative}
                  </p>
                </div>
              )}
            </div>

            {/* Verifiable 4-Stage Evidence Chain per spec */}
            {item.evidence && <EvidenceChain evidence={item.evidence} />}
          </div>
        ))}
      </div>
    </section>
  );
}
