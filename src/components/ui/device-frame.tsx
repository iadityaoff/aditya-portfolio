import * as React from "react";
import { cn } from "@/lib/utils";

export interface DeviceFrameProps {
  type?: "desktop" | "mobile" | "canvas";
  title?: string;
  url?: string;
  className?: string;
  children: React.ReactNode;
}

export function DeviceFrame({
  type = "desktop",
  title,
  url,
  className,
  children,
}: DeviceFrameProps) {
  if (type === "mobile") {
    return (
      <div
        className={cn(
          "relative mx-auto rounded-[32px] p-2.5 bg-[#17171C] border border-white/10 shadow-2xl max-w-[320px]",
          className
        )}
      >
        {/* Speaker / Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20 mr-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
        </div>
        <div className="relative rounded-[24px] overflow-hidden bg-background border border-line/30">
          {children}
        </div>
      </div>
    );
  }

  if (type === "canvas") {
    return (
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden border border-line/80 bg-white shadow-xs",
          className
        )}
      >
        {children}
      </div>
    );
  }

  // Desktop minimal frame (browser-less or minimal header per §2.1)
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden border border-line/80 bg-white shadow-md",
        className
      )}
    >
      {/* Minimal Header with 3 window controls */}
      <div className="h-9 px-4 bg-line/20 border-b border-line flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
        </div>

        {url ? (
          <div className="font-mono text-[11px] text-muted truncate max-w-[280px] px-2.5 py-0.5 rounded-md bg-white/60 border border-line/60">
            {url}
          </div>
        ) : title ? (
          <div className="text-xs font-medium text-muted truncate max-w-[280px]">
            {title}
          </div>
        ) : null}

        <div className="w-10" />
      </div>

      <div className="relative overflow-hidden">{children}</div>
    </div>
  );
}
