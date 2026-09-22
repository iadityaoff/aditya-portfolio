import * as React from "react";
import { cn } from "@/lib/utils";

export interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  project: string;
  source?: string;
  className?: string;
}

export function Testimonial({
  quote,
  name,
  role,
  project,
  source,
  className,
}: TestimonialProps) {
  return (
    <div
      className={cn(
        "p-6 sm:p-8 rounded-[20px] bg-white border border-line card-hover flex flex-col justify-between space-y-6",
        className
      )}
    >
      <div className="space-y-4">
        {/* Quote mark icon */}
        <span
          className="font-serif text-4xl text-accent/60 leading-none select-none block"
          aria-hidden="true"
        >
          “
        </span>
        <p className="text-base sm:text-lg text-ink font-normal leading-relaxed -mt-2">
          {quote}
        </p>
      </div>

      <div className="pt-4 border-t border-line/60 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">{name}</p>
          <p className="text-xs text-muted mt-0.5">
            {role} · <span className="text-ink/80">{project}</span>
          </p>
        </div>

        {source && (
          <span className="font-mono text-[10px] text-muted uppercase tracking-wider px-2 py-0.5 rounded-md bg-line/40 border border-line/60">
            {source}
          </span>
        )}
      </div>
    </div>
  );
}
