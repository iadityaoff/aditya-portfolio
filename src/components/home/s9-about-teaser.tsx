import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { whatICareAbout } from "@/content/site";

export function S9AboutTeaser() {
  return (
    <section className="w-full py-20 lg:py-32 bg-background border-t border-line">
      <Container size="default">
        {/* Top: Portrait Graphic + 3 Lines of Copy + More About Me link */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-line">
          <div className="lg:col-span-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-line/40 border border-line shadow-md max-w-xs mx-auto lg:mx-0 flex items-center justify-center p-6 text-center">
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-full bg-accent/15 border-2 border-accent text-accent font-semibold text-2xl flex items-center justify-center mx-auto">
                  AT
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-ink">Aditya Tripathi</h3>
                  <p className="font-mono text-xs text-muted mt-0.5">Senior UI/UX Designer</p>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available for Q4/Q1 Projects
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <p className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              ABOUT ADITYA
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-tight">
              Designer by role. <em className="font-serif font-normal italic">Builder by mindset.</em>
            </h2>

            <div className="space-y-3 text-base sm:text-lg text-muted leading-relaxed">
              <p>
                For over 5 years, I&apos;ve focused on untangling complex domain models — clinical healthcare software, role-based enterprise portals, and high-frequency booking systems.
              </p>
              <p>
                My background bridging design and frontend development means I design with extreme empathy for both the operator using the tool and the engineer shipping the code.
              </p>
              <p>
                I believe the most impactful design work happens not in superficial decoration, but in structuring clear information architecture and robust design tokens.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-medium text-accent hover:text-accent-hover group"
              >
                <span>More about my background, principles &amp; experience</span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom: "What I care about" 5 principles */}
        <div className="pt-16">
          <p className="font-mono text-xs uppercase tracking-wider text-muted font-semibold mb-8">
            WHAT I CARE ABOUT (6 CORE PRINCIPLES)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatICareAbout.map((principle, idx) => (
              <div
                key={principle.title}
                className="p-5 rounded-xl bg-white border border-line flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-accent block mb-2">
                    0{idx + 1}
                  </span>
                  <h4 className="text-sm font-semibold text-ink mb-1.5">
                    {principle.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
