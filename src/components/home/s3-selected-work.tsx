import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/work/project-card";
import { getFlagshipProjects } from "@/content/projects-data";

export function S3SelectedWork() {
  const flagships = getFlagshipProjects();

  return (
    <section id="selected-work" className="w-full py-20 lg:py-32 bg-background">
      <Container size="default">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading
            eyebrow="SELECTED CASE STUDIES"
            title={
              <>
                Engineered for utility. <em>Validated with outcomes.</em>
              </>
            }
            description="Deep dives into enterprise platforms with multi-role permissions, high-frequency workflows, and token-driven design systems."
          />

          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-medium text-sm text-accent hover:text-accent-hover group shrink-0 pb-1"
          >
            <span>See all 8 projects</span>
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        {/* 4 Flagship Project Cards (Alternating Layout) */}
        <div className="space-y-12 lg:space-y-16">
          {flagships.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              variant="large"
              reverse={index % 2 === 1}
            />
          ))}
        </div>

        {/* Bottom CTA to /work */}
        <div className="mt-16 text-center pt-8 border-t border-line/60">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold text-ink hover:text-accent transition-colors"
          >
            <span>Explore all case studies &amp; experiments</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
