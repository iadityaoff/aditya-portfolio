import * as React from "react";
import { Container } from "@/components/layout/container";

interface RealityCheckProps {
  quote: string;
  author: string;
  context: string;
}

export function RealityCheck({ quote, author, context }: RealityCheckProps) {
  return (
    <section className="py-16 md:py-24 bg-surface/50 border-y border-line my-16">
      <Container size="narrow">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-bold font-mono text-sm">
              !
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold">
              The Reality Check
            </span>
          </div>
          
          <blockquote className="text-2xl md:text-3xl font-medium tracking-tight text-ink leading-snug">
            &quot;{quote}&quot;
          </blockquote>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between pt-4 border-t border-line/50">
            <div className="font-mono text-sm text-accent font-semibold">
              — {author}
            </div>
            <div className="text-sm text-muted max-w-sm">
              {context}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
