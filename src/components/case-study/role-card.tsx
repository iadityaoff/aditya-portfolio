import * as React from "react";
import { RoleData } from "@/types";

export interface RoleCardsProps {
  roles?: RoleData[];
}

export function RoleCards({ roles }: RoleCardsProps) {
  if (!roles || roles.length === 0) return null;

  return (
    <section id="roles" className="my-16 space-y-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          02 · USERS &amp; PERMISSION PROFILES
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink mt-2">
          Mapping divergent operational goals across roles.
        </h2>
        <p className="text-muted text-base mt-2 max-w-2xl">
          Enterprise software succeeds only when the interface adapts to the mental model of each distinct operator.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((r, i) => (
          <div
            key={r.role}
            className="p-6 rounded-[20px] bg-white border border-line card-hover flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <span className="font-mono text-xs font-bold text-accent">
                  PERSONA 0{i + 1}
                </span>
                <span className="w-2 h-2 rounded-full bg-line" />
              </div>

              <h3 className="text-xl font-semibold text-ink">
                {r.role}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-muted block mb-1">
                    PRIMARY GOAL
                  </span>
                  <p className="text-ink leading-relaxed">
                    {r.goal}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-accent block mb-1">
                    CORE OPERATIONAL TASK
                  </span>
                  <p className="text-muted leading-relaxed">
                    {r.mainTask}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
