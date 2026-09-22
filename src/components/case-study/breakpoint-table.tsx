import * as React from "react";
import { BreakpointData } from "@/types";

export interface BreakpointTableProps {
  breakpoints?: BreakpointData[];
}

export function BreakpointTable({ breakpoints }: BreakpointTableProps) {
  if (!breakpoints || breakpoints.length === 0) return null;

  return (
    <section id="responsive" className="my-16 space-y-6">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          06 · RESPONSIVE RULES &amp; BREAKPOINTS
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink mt-2">
          What changes across viewport breakpoints.
        </h2>
        <p className="text-muted text-base mt-2">
          Specific layout adaptations ensuring high data density on desktop and touch-ergonomic clarity on tablet and mobile.
        </p>
      </div>

      <div className="overflow-x-auto rounded-[20px] bg-white border border-line shadow-xs">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-line/20 font-mono text-xs text-muted uppercase tracking-wider">
              <th className="p-4 sm:p-5 font-semibold">Breakpoint</th>
              <th className="p-4 sm:p-5 font-semibold">Viewport Width</th>
              <th className="p-4 sm:p-5 font-semibold">Interaction &amp; Layout Behavior</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {breakpoints.map((bp) => (
              <tr key={bp.breakpoint} className="hover:bg-line/10 transition-colors">
                <td className="p-4 sm:p-5 font-semibold text-ink whitespace-nowrap">
                  {bp.breakpoint}
                </td>
                <td className="p-4 sm:p-5 font-mono text-xs text-accent whitespace-nowrap">
                  {bp.viewport}
                </td>
                <td className="p-4 sm:p-5 text-muted leading-relaxed">
                  {bp.behavior}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
