import * as React from "react";
import Image from "next/image";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { MetaGrid } from "./meta-grid";
import { DotGrid, FrameHeading, Reveal } from "@/components/motion/studio";

export interface CaseHeroProps {
  project: Project;
}

export function CaseHero({ project }: CaseHeroProps) {
  return (
    <header className="relative isolate w-full pt-32 pb-16 lg:pt-40 lg:pb-20 border-b border-line" data-section="Intro">
      <DotGrid className="h-[640px]" />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Eyebrow & Confidentiality notice */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Badge variant="accent">{project.industry}</Badge>
            <span className="font-mono text-xs text-muted">
              {project.timeline || "Case Study"}
            </span>
          </div>

          {project.confidential === "anonymized" && (
            <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-amber-700 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
              <span>🔒 Details and patient metrics anonymized for confidentiality</span>
            </div>
          )}
        </div>

        {/* Title & Insight Headline */}
        <div className="max-w-4xl space-y-4">
          <FrameHeading frame={`Case study · ${project.slug}`} className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-[1.15]">
            {project.title}
          </FrameHeading>

          {project.insightHeadline && (
            <p className="font-serif italic text-xl sm:text-2xl text-accent font-normal pt-6">
              &ldquo;{project.insightHeadline}&rdquo;
            </p>
          )}

          <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-3xl">
            {project.summary}
          </p>
        </div>

        {/* Meta Grid (Role, Platform, Scope, Tools, Timeline) */}
        <Reveal delay={0.2}>
          <MetaGrid project={project} />
        </Reveal>

        {/* Full-width Cover Visual — on large, tall, motion-enabled screens the
            CaseCoverBuild sequence (rendered after this header) replaces it */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-line bg-[#ECEAE4] aspect-[16/9] shadow-xl mt-8 lg:hidden motion-reduce:!block reduced:!block [@media(max-height:699px)]:!block">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}
