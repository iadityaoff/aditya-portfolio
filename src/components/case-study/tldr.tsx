import * as React from "react";
import { TLDRData } from "@/types";

export interface TLDRProps {
  tldr: TLDRData;
}

export function TLDR({ tldr }: TLDRProps) {
  return (
    <section id="tldr" className="my-16 p-6 sm:p-8 rounded-[20px] bg-white border border-line shadow-xs">
      <div className="mb-6 flex items-center justify-between pb-4 border-b border-line">
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          EXECUTIVE SUMMARY · TL;DR
        </span>
        <span className="font-mono text-xs text-muted">2-Min Read</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Box 1: Problem */}
        <div className="space-y-2.5 p-5 rounded-xl bg-line/20 border border-line/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <h4 className="font-mono text-xs uppercase tracking-wider text-ink font-bold">
              The Problem
            </h4>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            {tldr.problem}
          </p>
        </div>

        {/* Box 2: My Role */}
        <div className="space-y-2.5 p-5 rounded-xl bg-line/20 border border-line/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h4 className="font-mono text-xs uppercase tracking-wider text-ink font-bold">
              My Role &amp; Approach
            </h4>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            {tldr.role}
          </p>
        </div>

        {/* Box 3: Outcome */}
        <div className="space-y-2.5 p-5 rounded-xl bg-accent/5 border border-accent/20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent font-bold">
              Verified Outcome
            </h4>
          </div>
          <p className="text-sm text-ink font-medium leading-relaxed">
            {tldr.outcome}
          </p>
        </div>
      </div>
    </section>
  );
}
