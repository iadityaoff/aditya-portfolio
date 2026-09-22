import * as React from "react";

export interface FlowDiagramProps {
  keyFlow?: {
    title: string;
    steps: string[];
  };
}

export function FlowDiagram({ keyFlow }: FlowDiagramProps) {
  if (!keyFlow) return null;

  return (
    <section id="structure" className="my-16 space-y-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          03 · INFORMATION ARCHITECTURE &amp; KEY FLOW
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink mt-2">
          {keyFlow.title}
        </h2>
        <p className="text-muted text-base mt-2">
          Linear, state-validated progression minimizing cognitive load and dead-ends.
        </p>
      </div>

      {/* Horizontally scrollable workflow steps */}
      <div className="p-6 sm:p-8 rounded-[20px] bg-white border border-line overflow-x-auto shadow-xs">
        <div className="flex items-center min-w-[720px] py-4 gap-3">
          {keyFlow.steps.map((step, idx) => {
            const isLast = idx === keyFlow.steps.length - 1;

            return (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-line/20 border border-line/60 min-w-[140px] max-w-[180px] shrink-0">
                  <span className="font-mono text-[10px] font-bold text-accent mb-2">
                    STEP 0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-ink leading-tight">
                    {step}
                  </p>
                </div>

                {!isLast && (
                  <div className="flex items-center justify-center shrink-0 text-accent font-mono text-lg font-bold px-1 select-none">
                    →
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
