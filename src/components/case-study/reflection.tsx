import * as React from "react";

export interface ReflectionProps {
  reflection?: {
    learnings: string[];
    improvements: string[];
  };
}

export function Reflection({ reflection }: ReflectionProps) {
  if (!reflection) return null;

  return (
    <section id="reflection" className="my-16 space-y-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          09 · RETROSPECTIVE &amp; FUTURE ITERATIONS
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink mt-2">
          What I learned, and what I would do differently.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Learnings */}
        <div className="p-6 sm:p-8 rounded-[20px] bg-white border border-line space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-ink font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Key Insights &amp; Takeaways
          </h3>
          <ul className="space-y-3 text-sm text-muted leading-relaxed">
            {reflection.learnings.map((l, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-accent font-mono text-xs">→</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="p-6 sm:p-8 rounded-[20px] bg-white border border-line space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-ink font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Areas for Next Iteration
          </h3>
          <ul className="space-y-3 text-sm text-muted leading-relaxed">
            {reflection.improvements.map((imp, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-600 font-mono text-xs">→</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
