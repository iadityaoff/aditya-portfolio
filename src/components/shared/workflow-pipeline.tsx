import * as React from "react";
import { cn } from "@/lib/utils";

export interface WorkflowStage {
  id: string;
  name: string;
  leftTitle: string;
  leftActivity: string[];
  leftNote: string;
}

import { trackScrollMilestone } from "@/lib/analytics";

export interface WorkflowPipelineProps {
  stages: WorkflowStage[];
  activeStage: number;
  onStageClick?: (index: number) => void;
  // An optional render prop for the right-hand visual preview
  renderVisualPreview?: (activeStage: number) => React.ReactNode;
}

export function WorkflowPipeline({
  stages,
  activeStage,
  onStageClick,
  renderVisualPreview,
}: WorkflowPipelineProps) {
  // Ensure activeStage is within bounds
  const currentStage = Math.max(0, Math.min(stages.length - 1, activeStage));
  const prevStageRef = React.useRef(currentStage);

  React.useEffect(() => {
    if (prevStageRef.current !== currentStage) {
      trackScrollMilestone("WorkflowPipeline", stages[currentStage].name);
      prevStageRef.current = currentStage;
    }
  }, [currentStage, stages]);

  return (
    <div className="rounded-2xl bg-white border border-line shadow-sm overflow-hidden flex flex-col">
      {/* Top Nav */}
      <div className="flex overflow-x-auto border-b border-line bg-[#FAFAF7] hide-scrollbar">
        {stages.map((stage, idx) => (
          <button
            key={stage.id}
            onClick={() => onStageClick?.(idx)}
            className={cn(
              "flex-1 min-w-[120px] py-4 px-4 text-left border-r border-line transition-colors relative",
              currentStage === idx ? "bg-white" : "hover:bg-black/5",
              onStageClick ? "cursor-pointer" : "cursor-default"
            )}
            disabled={!onStageClick}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "font-mono text-[10px] font-bold uppercase tracking-wider",
                  currentStage === idx ? "text-accent" : "text-muted"
                )}
              >
                {stage.name}
              </span>
            </div>
            {/* Active Indicator Bar */}
            {currentStage === idx && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Split Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        {/* LEFT: Live Context / Process */}
        <div className="p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-line bg-white">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-accent/10 text-accent font-mono text-[10px] uppercase font-bold tracking-wider mb-6">
              {currentStage === stages.length - 2
                ? "I OWNED"
                : currentStage === stages.length - 1
                ? "FINAL RESULT"
                : "AI ASSISTED WITH"}
            </div>

            <h3 className="text-xl font-semibold text-ink mb-6">
              {stages[currentStage].leftTitle}
            </h3>

            <ul className="space-y-4">
              {stages[currentStage].leftActivity.map((activity, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-accent/60 mt-0.5 shrink-0">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      currentStage === stages.length - 2 ? "text-ink" : "text-muted"
                    )}
                  >
                    {activity}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 pt-6 border-t border-line/60">
            <p className="font-mono text-xs text-muted leading-relaxed">
              {stages[currentStage].leftNote}
            </p>
          </div>
        </div>

        {/* RIGHT: Visual Output / Product Preview */}
        <div className="p-8 lg:p-12 bg-[#FAFAF7] flex items-center justify-center relative overflow-hidden">
          <span className="absolute top-4 right-4 font-mono text-[10px] text-muted/50 uppercase tracking-widest">
            Workflow Example
          </span>

          <div className="w-full max-w-sm aspect-[4/3] relative flex items-center justify-center">
            {renderVisualPreview?.(currentStage)}
          </div>
        </div>
      </div>
    </div>
  );
}
