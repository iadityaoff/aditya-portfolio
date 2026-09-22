"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Project } from "@/types";
import { FilterChips } from "./filter-chips";
import { ProjectCard } from "./project-card";

interface WorkContentProps {
  initialProjects: Project[];
}

export function WorkContent({ initialProjects }: WorkContentProps) {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") || "all";
  const [activeFilter, setActiveFilter] = React.useState(typeParam);

  const [prevTypeParam, setPrevTypeParam] = React.useState(typeParam);
  if (prevTypeParam !== typeParam) {
    setPrevTypeParam(typeParam);
    setActiveFilter(typeParam);
  }

  // Compute counts for each filter option
  const counts = React.useMemo(() => {
    const c: Record<string, number> = { all: initialProjects.length };
    initialProjects.forEach((p) => {
      const ind = p.industry.toLowerCase();
      const cat = p.category.toLowerCase();
      const title = p.title.toLowerCase();

      if (ind.includes("design system") || title.includes("design system")) {
        c["design-system"] = (c["design-system"] || 0) + 1;
      }
      if (ind.includes("healthcare") || title.includes("healthcare")) {
        c["healthcare"] = (c["healthcare"] || 0) + 1;
      }
      if (ind.includes("enterprise") || ind.includes("management")) {
        c["enterprise"] = (c["enterprise"] || 0) + 1;
      }
      if (ind.includes("event") || ind.includes("ticketing")) {
        c["events"] = (c["events"] || 0) + 1;
      }
      if (p.platform.some((plat) => plat.toLowerCase().includes("mobile")) || cat === "card") {
        c["mobile"] = (c["mobile"] || 0) + 1;
      }
    });
    return c;
  }, [initialProjects]);

  // Filter projects
  const filteredProjects = React.useMemo(() => {
    if (activeFilter === "all") return initialProjects;

    return initialProjects.filter((p) => {
      const ind = p.industry.toLowerCase();
      const title = p.title.toLowerCase();
      const cat = p.category.toLowerCase();

      switch (activeFilter) {
        case "design-system":
          return ind.includes("design system") || title.includes("design system");
        case "healthcare":
          return ind.includes("healthcare") || title.includes("healthcare");
        case "enterprise":
          return ind.includes("enterprise") || ind.includes("management");
        case "events":
          return ind.includes("event") || ind.includes("ticketing");
        case "mobile":
          return p.platform.some((plat) => plat.toLowerCase().includes("mobile")) || cat === "card";
        default:
          return true;
      }
    });
  }, [activeFilter, initialProjects]);

  const flagships = filteredProjects.filter((p) => p.category === "flagship");
  const secondary = filteredProjects.filter((p) => p.category !== "flagship");

  return (
    <div className="space-y-12">
      {/* Filter Chips Bar */}
      <FilterChips
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
      />

      {filteredProjects.length === 0 ? (
        /* Empty State per §2.2 */
        <div className="py-24 text-center rounded-2xl bg-white border border-line p-8 max-w-md mx-auto space-y-4">
          <p className="font-mono text-xs text-muted uppercase tracking-wider">
            NO MATCHING CASE STUDIES
          </p>
          <h3 className="text-xl font-semibold text-ink">
            No projects found in this category
          </h3>
          <p className="text-sm text-muted">
            Try selecting a different filter or reset to view all case studies.
          </p>
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className="px-4 py-2 rounded-full bg-accent text-white font-medium text-xs cursor-pointer hover:bg-accent-hover"
          >
            Show All Projects
          </button>
        </div>
      ) : (
        <>
          {/* Flagship Projects (Large Cards) */}
          {flagships.length > 0 && (
            <div className="space-y-10">
              {flagships.map((project, idx) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={idx}
                  variant="large"
                  reverse={idx % 2 === 1}
                />
              ))}
            </div>
          )}

          {/* More Work Group (Compact & Card Projects per §2.2) */}
          {secondary.length > 0 && (
            <div className="pt-12 border-t border-line space-y-8">
              <div>
                <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest">
                  COMPACT CASE STUDIES &amp; PRODUCTION APPS
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-ink mt-1">
                  More Selected Work
                </h3>
                <p className="text-sm text-muted mt-1">
                  Targeted redesigns, mobile companion apps, and operational utility modules.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {secondary.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
