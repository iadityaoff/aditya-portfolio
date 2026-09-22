import * as React from "react";
import { Project } from "@/types";

export interface MetaGridProps {
  project: Project;
}

export function MetaGrid({ project }: MetaGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-6 pb-2 border-t border-line">
      <div>
        <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold block mb-1">
          Role
        </span>
        <span className="text-sm font-medium text-ink block">
          {project.role}
        </span>
      </div>

      <div>
        <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold block mb-1">
          Platform
        </span>
        <span className="text-sm text-ink block">
          {project.platform.join(", ")}
        </span>
      </div>

      <div>
        <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold block mb-1">
          Scope
        </span>
        <span className="text-sm text-ink block">
          {project.scope.join(", ")}
        </span>
      </div>

      <div>
        <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold block mb-1">
          Tools
        </span>
        <span className="text-sm text-ink block">
          {project.tools.join(", ")}
        </span>
      </div>

      {project.timeline && (
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold block mb-1">
            Timeline
          </span>
          <span className="text-sm text-ink block font-mono">
            {project.timeline}
          </span>
        </div>
      )}
    </div>
  );
}
