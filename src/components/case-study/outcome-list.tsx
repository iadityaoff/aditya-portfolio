import * as React from "react";
import { OutcomeItem } from "@/types";
import { Badge } from "@/components/ui/badge";

export interface OutcomeListProps {
  outcomes: OutcomeItem[];
}

export function OutcomeList({ outcomes }: OutcomeListProps) {
  return (
    <section id="outcomes" className="my-16 space-y-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          08 · MEASURABLE OUTCOMES &amp; IMPACT
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink mt-2">
          Verified operational results post-launch.
        </h2>
        <p className="text-muted text-base mt-2">
          Every statement below is rooted in observed deployment metrics, client audits, and engineering logs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {outcomes.map((item, idx) => {
          const isQuote = item.type === "quote";
          const isFact = item.type === "fact";

          return (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-[20px] border flex flex-col justify-between space-y-4 ${
                isFact
                  ? "bg-white border-line shadow-xs"
                  : isQuote
                  ? "bg-accent/5 border-accent/20"
                  : "bg-line/20 border-line"
              }`}
            >
              <div className="flex items-center justify-between">
                <Badge variant={isFact ? "neutral" : isQuote ? "accent" : "outline"}>
                  {item.type.toUpperCase()}
                </Badge>
                <span className="font-mono text-xs text-muted">Verified 0{idx + 1}</span>
              </div>

              <p
                className={`text-base sm:text-lg leading-relaxed ${
                  isQuote ? "font-serif italic text-ink" : "text-ink font-medium"
                }`}
              >
                {isQuote ? `“${item.text}”` : item.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
