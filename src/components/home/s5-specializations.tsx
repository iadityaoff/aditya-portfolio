import * as React from "react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { specializations } from "@/content/site";

export function S5Specializations() {
  const tools = [
    "Figma",
    "Design Systems",
    "Storybook",
    "Angular",
    "React / Next.js",
    "Tailwind CSS",
    "Claude / ChatGPT",
    "Cursor / Copilot",
    "Antigravity",
  ];

  return (
    <section className="w-full py-20 lg:py-32 bg-background">
      <Container size="default">
        <SectionHeading
          eyebrow="SPECIALIZATION"
          title={
            <>
              Deep focus in <em>enterprise software design.</em>
            </>
          }
          description="I don't design marketing brochures or generic landing pages. I design dense operational software, administrative consoles, and cross-team design systems."
          className="mb-16"
        />

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {specializations.map((spec, index) => (
            <div
              key={spec.title}
              className="p-8 rounded-[20px] bg-white border border-line card-hover flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-accent">
                    0{index + 1}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-line/40 flex items-center justify-center text-ink text-sm">
                    {index === 0 && "❖"}
                    {index === 1 && "⬡"}
                    {index === 2 && "⇄"}
                    {index === 3 && "↺"}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
                  {spec.title}
                </h3>

                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {spec.description}
                </p>
              </div>

              {/* 3 Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-line/60">
                {spec.tags.map((tag) => (
                  <Badge key={tag} variant="neutral" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Compact row of tools as plain text (§2.1 S5) */}
        <div className="mt-16 pt-8 border-t border-line/60 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-muted font-semibold mb-3">
            Core Tooling &amp; Framework Fluency
          </p>
          <p className="text-sm sm:text-base font-mono text-ink tracking-wide">
            {tools.join(" · ")}
          </p>
        </div>
      </Container>
    </section>
  );
}
