"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Design System", value: "design-system" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Enterprise", value: "enterprise" },
  { label: "Events", value: "events" },
  { label: "Mobile", value: "mobile" },
] as const;

export type FilterValue = (typeof FILTER_OPTIONS)[number]["value"];

interface FilterChipsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: Record<string, number>;
}

export function FilterChips({
  activeFilter,
  onFilterChange,
  counts,
}: FilterChipsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (value: string) => {
    onFilterChange(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("type");
    } else {
      params.set("type", value);
    }
    const newQuery = params.toString();
    router.replace(`/work${newQuery ? `?${newQuery}` : ""}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-4" role="tablist" aria-label="Filter case studies">
      {FILTER_OPTIONS.map((opt) => {
        const isSelected = activeFilter === opt.value;
        const count = counts[opt.value] ?? 0;

        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => handleSelect(opt.value)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              isSelected
                ? "bg-accent text-white font-bold shadow-xs -translate-y-0.5"
                : "bg-white border border-line text-muted hover:border-ink/30 hover:text-ink"
            )}
          >
            <span>{opt.label}</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.2 rounded-full",
                isSelected ? "bg-white/20 text-white" : "bg-line/60 text-muted"
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
