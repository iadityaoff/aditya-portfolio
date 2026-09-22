import * as React from "react";

export interface ConstraintListProps {
  context?: string[];
  constraints?: string[];
}

export function ConstraintList({ context, constraints }: ConstraintListProps) {
  return (
    <section id="context" className="my-16 space-y-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          01 · CONTEXT &amp; OPERATIONAL CHALLENGE
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink mt-2">
          High stakes, dense data, and zero room for error.
        </h2>
      </div>

      {/* Context paragraphs */}
      {context && context.length > 0 && (
        <div className="space-y-4 text-base sm:text-lg text-muted leading-relaxed max-w-3xl">
          {context.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {/* Constraints List */}
      {constraints && constraints.length > 0 && (
        <div className="p-6 sm:p-8 rounded-[20px] bg-white border border-line space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-ink font-bold">
            Hard Constraints &amp; Boundary Conditions
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {constraints.map((c, i) => (
              <li
                key={i}
                className="p-4 rounded-xl bg-line/20 border border-line/60 text-sm text-ink leading-relaxed flex items-start gap-2.5"
              >
                <span className="font-mono text-xs text-accent font-bold mt-0.5">
                  C{i + 1}:
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
