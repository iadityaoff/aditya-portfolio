import * as React from "react";
import { Metric } from "@/components/ui/metric";

export interface ComponentPreviewProps {
  systemHandoff?: {
    componentsCount: number;
    tokensCount: number;
    storybookUrl?: string;
    specsDescription: string;
  };
}

export function ComponentPreview({ systemHandoff }: ComponentPreviewProps) {
  if (!systemHandoff) return null;

  return (
    <section id="handoff" className="my-16 space-y-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          07 · DESIGN SYSTEM INTEGRATION &amp; DEV HANDOFF
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink mt-2">
          Tokens, component counts, and developer contracts.
        </h2>
        <p className="text-muted text-base mt-2">
          Ensuring zero handoff translation loss between Figma component sets and production code.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-[20px] bg-white border border-line space-y-8">
        {/* Metric counts */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pb-6 border-b border-line">
          <Metric
            value={String(systemHandoff.componentsCount)}
            label="Design System Components"
            sublabel="Full variant &amp; state matrix"
          />
          <Metric
            value={String(systemHandoff.tokensCount)}
            label="Configured Tokens"
            sublabel="Color, spacing, radius, type"
          />
          <Metric
            value="100%"
            label="WCAG AA Color Parity"
            sublabel="Contrast ratio &gt;= 4.5:1"
          />
        </div>

        {/* Specs Description */}
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-wider text-muted font-bold block">
            HANDOFF ARCHITECTURE &amp; TOKEN CONTRACTS
          </span>
          <p className="text-base text-ink leading-relaxed">
            {systemHandoff.specsDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
