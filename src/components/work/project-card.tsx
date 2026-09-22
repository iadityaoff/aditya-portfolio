"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: Project;
  index?: number;
  variant?: "large" | "compact" | "card";
  reverse?: boolean; // For alternating image left/right on large cards
}

export function ProjectCard({
  project,
  index,
  variant = "large",
  reverse = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const formattedIndex =
    index !== undefined ? String(index + 1).padStart(2, "0") : undefined;

  // LARGE CARD VARIANT (Used on Homepage S3 and Flagship sections)
  if (variant === "large") {
    return (
      <article
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative rounded-[20px] bg-white border border-line p-6 sm:p-8 lg:p-10 card-hover transition-all duration-300"
      >
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center",
            reverse && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
          )}
        >
          {/* Text Content Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Header: Index & Tags */}
            <div className="flex items-center gap-3">
              {formattedIndex && (
                <span className="font-mono text-xs font-semibold text-accent tracking-wider">
                  {formattedIndex}
                </span>
              )}
              <div className="flex flex-wrap gap-2">
                <Badge variant="neutral">{project.industry}</Badge>
                {project.confidential === "anonymized" && (
                  <Badge variant="outline">Anonymized</Badge>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink group-hover:text-accent transition-colors duration-200">
              <Link href={`/work/${project.slug}`} className="focus-visible:outline-none">
                {project.title}
              </Link>
            </h3>

            {/* One-line Problem & One-line Outcome */}
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-start gap-2">
                <span className="font-mono text-xs font-semibold text-muted uppercase tracking-wider min-w-[70px] pt-0.5">
                  Problem:
                </span>
                <p className="text-muted leading-relaxed">
                  {project.tldr.problem}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider min-w-[70px] pt-0.5">
                  Outcome:
                </span>
                <p className="text-ink font-medium leading-relaxed">
                  {project.tldr.outcome}
                </p>
              </div>
            </div>

            {/* Action link */}
            <div className="pt-2">
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-2 font-medium text-sm text-ink group-hover:text-accent transition-colors duration-200"
                aria-label={`View case study for ${project.title}`}
              >
                <span>View case study</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1.5 text-accent" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Visual Showcase Column (7 cols) */}
          <div className="lg:col-span-7">
            <Link
              href={`/work/${project.slug}`}
              tabIndex={-1}
              aria-hidden="true"
              className="block relative rounded-[16px] overflow-hidden border border-line/80 bg-[#F5F5F0] aspect-[16/10]"
            >
              <Image
                src={project.cover}
                alt={`Interface showcase for ${project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 58vw, 700px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />

              {/* Desktop Hover "View" cursor pill */}
              <div
                className={cn(
                  "hidden lg:flex absolute bottom-4 right-4 items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink text-white font-mono text-xs font-medium shadow-lg transition-opacity duration-200 pointer-events-none",
                  isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                )}
              >
                <span>View</span>
                <span className="text-accent">→</span>
              </div>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // COMPACT & CARD VARIANT (Used on Work Index for secondary projects)
  return (
    <article className="group rounded-[18px] bg-white border border-line p-5 sm:p-6 card-hover flex flex-col justify-between">
      <div className="space-y-4">
        {/* Cover Thumbnail */}
        <Link
          href={`/work/${project.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="block relative rounded-[12px] overflow-hidden border border-line/60 bg-[#F5F5F0] aspect-[16/10]"
        >
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Badge variant="neutral" size="sm">{project.industry}</Badge>
          <Badge variant="outline" size="sm">
            {project.category === "compact" ? "Full Case Study" : "Quick Look"}
          </Badge>
        </div>

        {/* Title */}
        <h4 className="text-lg font-semibold text-ink tracking-tight group-hover:text-accent transition-colors">
          <Link href={`/work/${project.slug}`}>
            {project.title}
          </Link>
        </h4>

        {/* One-line summary */}
        <p className="text-sm text-muted line-clamp-2">
          {project.summary}
        </p>
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-line/60 mt-4 flex items-center justify-between">
        <span className="font-mono text-xs text-muted">{project.timeline || "Case Study"}</span>
        <Link
          href={`/work/${project.slug}`}
          className="font-medium text-xs text-ink group-hover:text-accent transition-colors inline-flex items-center gap-1"
        >
          <span>Explore</span>
          <span className="transition-transform group-hover:translate-x-0.5 text-accent">→</span>
        </Link>
      </div>
    </article>
  );
}
