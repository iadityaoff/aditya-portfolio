import * as React from "react";
import { Container } from "@/components/layout/container";
import { Metric } from "@/components/ui/metric";
import { siteConfig, proofClients } from "@/content/site";

export function S2ProofStrip() {
  return (
    <section className="w-full border-y border-line bg-white/70 py-12 lg:py-16">
      <Container size="default">
        {/* 4 Stat blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {siteConfig.metrics.map((metric) => (
            <Metric
              key={metric.label}
              value={metric.value}
              label={metric.label}
              sublabel={metric.sublabel}
            />
          ))}
        </div>

        {/* Client / Product names row (text / monochrome logos per §2.1 S2) */}
        <div className="mt-12 pt-8 border-t border-line/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted uppercase tracking-wider font-semibold whitespace-nowrap">
            Selected Work &amp; Engagements:
          </p>
          <div className="flex flex-wrap items-center gap-6 lg:gap-10">
            {proofClients.map((client) => (
              <span
                key={client}
                className="font-medium text-sm text-ink/70 hover:text-ink transition-colors select-none tracking-tight"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
