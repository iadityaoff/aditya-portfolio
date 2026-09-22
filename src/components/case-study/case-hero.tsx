import * as React from "react";
import Image from "next/image";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { MetaGrid } from "./meta-grid";

export interface CaseHeroProps {
  project: Project;
}

export function CaseHero({ project }: CaseHeroProps) {
  return (
    <header className="w-full pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-line bg-white/40">
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
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-[1.15]">
            {project.title}
          </h1>

          {project.insightHeadline && (
            <p className="font-serif italic text-xl sm:text-2xl text-accent font-normal">
              &ldquo;{project.insightHeadline}&rdquo;
            </p>
          )}

          <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-3xl">
            {project.summary}
          </p>
        </div>

        {/* Meta Grid (Role, Platform, Scope, Tools, Timeline) */}
        <MetaGrid project={project} />

        {/* Full-width Cover Visual */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-line bg-[#ECEAE4] aspect-[16/9] shadow-xl mt-8">
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
