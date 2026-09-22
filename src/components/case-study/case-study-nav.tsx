"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "tldr", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "roles", label: "Roles" },
  { id: "structure", label: "Structure" },
  { id: "decisions", label: "Decisions" },
  { id: "responsive", label: "Responsive" },
  { id: "handoff", label: "Handoff" },
  { id: "outcomes", label: "Outcomes" },
  { id: "reflection", label: "Retrospective" },
];

export function CaseStudyNav() {
  const [activeSection, setActiveSection] = React.useState("tldr");

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset + 200;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="hidden xl:block sticky top-28 self-start w-52 p-4 rounded-2xl bg-white/80 border border-line backdrop-blur-xs shadow-xs text-xs font-mono">
      <p className="text-[10px] uppercase font-bold text-muted tracking-wider mb-3">
        CASE STUDY CONTENTS
      </p>
      <nav className="space-y-1">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollTo(sec.id)}
              className={cn(
                "w-full text-left px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between",
                isActive
                  ? "bg-accent/10 text-accent font-bold"
                  : "text-muted hover:text-ink hover:bg-line/40"
              )}
            >
              <span>{sec.label}</span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
