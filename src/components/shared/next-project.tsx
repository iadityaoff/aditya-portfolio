import * as React from "react";
import Link from "next/link";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";

export interface NextProjectProps {
  project: Project;
}

export function NextProject({ project }: NextProjectProps) {
  return (
    <div className="w-full border-t border-line pt-16 pb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted font-semibold">
            Next Case Study
          </p>
          <h3 className="text-2xl sm:text-3xl font-semibold text-ink mt-1">
            {project.title}
          </h3>
        </div>

        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-2 font-medium text-accent hover:text-accent-hover group text-sm sm:text-base"
        >
          <span>Read case study</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <Link
        href={`/work/${project.slug}`}
        className="block p-6 sm:p-8 rounded-[20px] bg-line/20 border border-line card-hover group"
      >
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="neutral">{project.industry}</Badge>
          <Badge variant="outline">{project.role}</Badge>
        </div>
        <p className="text-base text-muted max-w-2xl group-hover:text-ink transition-colors">
          {project.summary}
        </p>
      </Link>
    </div>
  );
}
