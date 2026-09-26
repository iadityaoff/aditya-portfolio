import * as React from "react";
import { Badge } from "@/components/ui/badge";

export interface WireframeItem {
  title: string;
  description: string;
  status: "Kept" | "Rejected";
  reason?: string;
}

export interface WireframeGalleryProps {
  wireframes?: WireframeItem[];
  storyContext?: React.ReactNode;
}

export function WireframeGallery({ wireframes, storyContext }: WireframeGalleryProps) {
  if (!wireframes || wireframes.length === 0) return null;

  return (
    <section id="exploration" className="my-16 space-y-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          04 · LOW-FI EXPLORATION &amp; HYPOTHESIS TESTING
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink mt-2">
          Evaluating structural alternatives before high-fidelity styling.
        </h2>
        <p className="text-muted text-base mt-2">
          Rejecting suboptimal patterns early protects design velocity and engineering investment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wireframes.map((item) => {
          const isKept = item.status === "Kept";

          return (
            <div
              key={item.title}
              className="p-6 sm:p-8 rounded-[20px] bg-white border border-line flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={isKept ? "accent" : "outline"}>
                    {isKept ? "STATUS: KEPT" : "STATUS: REJECTED"}
                  </Badge>
                  <span className="font-mono text-xs text-muted">
                    Exploration Draft
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-ink">
                  {item.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.reason && (
                <div
                  className={`p-4 rounded-xl text-xs leading-relaxed border ${
                    isKept
                      ? "bg-accent/5 border-accent/20 text-ink"
                      : "bg-red-500/5 border-red-500/20 text-red-900 dark:text-red-300"
                  }`}
                >
                  <strong>{isKept ? "Rationale:" : "Why Rejected:"}</strong>{" "}
                  {item.reason}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {storyContext && (
        <div className="mt-8 p-5 rounded-[16px] bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm italic">
          <strong className="font-semibold not-italic">Designer&apos;s Context: </strong>
          {storyContext}
        </div>
      )}
    </section>
  );
}
