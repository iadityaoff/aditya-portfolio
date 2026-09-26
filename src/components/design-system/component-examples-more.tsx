"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { accentFill, surface, surface2, ink, muted, line, r, rLg, pill, h, monoSm, STATUS } from "./lab-tokens";

/**
 * Second wave of live component examples for the lab. Same contract as the
 * originals in component-gallery.tsx: token-driven, one `variant` prop.
 */

/* small inline icons, drawn with currentColor */
const I = {
  search: <path d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm9 2-4-4" />,
  cal: <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm12-4v4M8 2v4M4 10h16" />,
  bed: <path d="M2 5v14M2 9h18a2 2 0 0 1 2 2v8M2 16h20M6 9v7" />,
  bill: <path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Zm3 6h6M9 12h6" />,
  users: <path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.8" />,
  flask: <path d="M9 2h6M10 2v6L4 19a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 19L14 8V2M7 15h10" />,
  up: <path d="M12 19V5m-6 6 6-6 6 6" />,
  file: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6" />,
  check: <path d="m5 12 5 5 9-10" />,
  more: <path d="M12 6h.01M12 12h.01M12 18h.01" />,
  wifi: <path d="M2 2l20 20M8.5 16.5a5 5 0 0 1 7 0M5 12.9a10 10 0 0 1 5.2-2.7M19 12.9a10 10 0 0 0-2.4-1.6M12 20h.01" />,
  chev: <path d="m9 6 6 6-6 6" />,
};
function Icon({ d, className }: { d: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cn("w-4 h-4 shrink-0", className)} aria-hidden="true">
      {d}
    </svg>
  );
}

/* ---------------- Date & Slot Picker ---------------- */
export function SlotPickerExample({ variant }: { variant: string }) {
  const days = ["26 Sat", "27 Sun", "28 Mon", "29 Tue", "30 Wed"];
  const slots = ["10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00"];
  const booked = ["10:15", "10:45", "12:00"];
  const [day, setDay] = React.useState(0);
  const [slot, setSlot] = React.useState("11:30");
  const [date, setDate] = React.useState(26);

  if (variant === "Calendar") {
    // September 2026 starts on a Tuesday
    const lead = 2;
    return (
      <div className={cn("w-full max-w-[236px] border p-3", rLg, surface, line)}>
        <div className={cn("flex items-center justify-between mb-2 text-xs font-semibold", ink)}>
          <span>September 2026</span>
          <span className={cn("flex gap-2", muted)} aria-hidden="true">‹ ›</span>
        </div>
        <div className={cn(monoSm, "grid grid-cols-7 text-center mb-1", muted)}>
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i}>{d}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-0.5 text-[11px]">
          {Array.from({ length: lead }, (_, i) => <span key={`b${i}`} />)}
          {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
            const past = d < 26;
            return (
              <button
                key={d}
                type="button"
                disabled={past}
                aria-pressed={date === d}
                onClick={() => setDate(d)}
                className={cn(
                  "aspect-square grid place-items-center tabular-nums transition-colors duration-200",
                  r,
                  date === d ? "bg-[var(--t-accent)] text-[var(--t-on-accent)] font-semibold" : past ? "text-[var(--t-muted)] opacity-40" : cn(ink, "hover:bg-[var(--t-surface-2)] cursor-pointer"),
                  d === 26 && date !== d && "ring-1 ring-[var(--t-accent)]"
                )}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const grid = (
    <div className="grid grid-cols-3 gap-1.5">
      {slots.map((t) => {
        const off = booked.includes(t);
        return (
          <button
            key={t}
            type="button"
            disabled={off}
            aria-pressed={slot === t}
            onClick={() => setSlot(t)}
            style={h(28)}
            className={cn(
              "text-[11px] font-medium tabular-nums border transition-all duration-200",
              r,
              off ? cn("border-dashed line-through opacity-50", line, muted) : slot === t ? "bg-[var(--t-accent)] border-[var(--t-accent)] text-[var(--t-on-accent)] shadow-sm" : cn(surface, line, ink, "hover:border-[var(--t-accent)] cursor-pointer")
            )}
          >
            {t}
          </button>
        );
      })}
    </div>
  );

  if (variant === "Slots")
    return (
      <div className="w-full max-w-[230px] space-y-2">
        {grid}
        <p className={cn("text-[10px] text-center", muted)}>Selected {slot} · 3 slots booked</p>
      </div>
    );

  return (
    <div className="w-full max-w-[250px] space-y-2">
      <div role="tablist" aria-label="Day" className={cn("flex border-b text-[11px]", line)}>
        {days.map((d, i) => (
          <button
            key={d}
            type="button"
            role="tab"
            aria-selected={day === i}
            onClick={() => setDay(i)}
            className={cn("flex-1 pb-1.5 font-medium transition-colors cursor-pointer", day === i ? "text-[var(--t-ink)] shadow-[inset_0_-2px_0_var(--t-accent)]" : muted)}
          >
            {d}
          </button>
        ))}
      </div>
      {grid}
    </div>
  );
}

/* ---------------- Tooltip / Popover / Menu ---------------- */
export function PopoverExample({ variant }: { variant: string }) {
  const [open, setOpen] = React.useState(true);
  if (variant === "Tooltip")
    return (
      <div className="flex flex-col items-center gap-10 pt-8">
        <span className="relative group/tt">
          <button type="button" style={{ ...h(32), paddingInline: 12 }} className={cn("border text-xs font-mono", r, surface, line, ink)}>
            UH-20931
          </button>
          <span role="tooltip" className={cn("absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap px-2 py-1 text-[10.5px] bg-[var(--t-ink)] text-[var(--t-surface)] shadow-lg", r)}>
            Copy UHID <kbd className="font-mono opacity-70">⌘C</kbd>
            <i className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 bg-[var(--t-ink)]" />
          </span>
        </span>
        <p className={cn("text-[10px]", muted)}>Shows on hover and keyboard focus</p>
      </div>
    );
  if (variant === "Menu")
    return (
      <div className="relative w-full max-w-[220px] flex flex-col items-end">
        <button type="button" aria-haspopup="menu" aria-expanded={open} aria-label="Row actions" onClick={() => setOpen((o) => !o)} className={cn("w-8 h-8 grid place-items-center border cursor-pointer", r, surface, line, ink)}>
          <Icon d={I.more} />
        </button>
        {open && (
          <div role="menu" className={cn("mt-1 w-44 border shadow-xl p-1 text-xs animate-[lab-in_.3s_cubic-bezier(.16,1,.3,1)]", rLg, surface, line, ink)}>
            {["Open invoice", "Duplicate", "Download PDF"].map((m) => (
              <button key={m} role="menuitem" type="button" onClick={() => setOpen(false)} className={cn("w-full text-left px-2.5 py-1.5 hover:bg-[var(--t-surface-2)] cursor-pointer", r)}>{m}</button>
            ))}
            <i className={cn("block my-1 h-px bg-[var(--t-line)]")} />
            <button role="menuitem" type="button" onClick={() => setOpen(false)} className={cn("w-full text-left px-2.5 py-1.5 text-[var(--t-bad)] hover:bg-[var(--t-bad-bg)] cursor-pointer", r)}>Cancel invoice</button>
          </div>
        )}
      </div>
    );
  return (
    <div className="relative w-full max-w-[230px]">
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={cn("inline-flex items-center gap-2 border pl-1 pr-3 py-1 text-xs font-medium cursor-pointer", pill, surface, line, ink)}>
        <span className="w-6 h-6 rounded-full grid place-items-center text-[10px] font-semibold bg-[var(--t-accent-subtle)] text-[var(--t-accent-text)]">RM</span>
        Ravi Mehta
      </button>
      {open && (
        <div className={cn("mt-2 w-full border shadow-xl p-3 space-y-2 animate-[lab-in_.3s_cubic-bezier(.16,1,.3,1)]", rLg, surface, line)}>
          <div className="flex justify-between items-start">
            <div>
              <p className={cn("text-xs font-semibold", ink)}>Ravi Mehta</p>
              <p className={cn("font-mono text-[10px]", muted)}>UH-20931 · 48Y · Male</p>
            </div>
            <span className={cn(monoSm, "px-1.5 py-0.5 uppercase", pill, STATUS.ok)}>Admitted</span>
          </div>
          <div className={cn("grid grid-cols-2 gap-2 text-[10.5px]", muted)}>
            <span>Bed <b className={ink}>Gen · B4</b></span>
            <span>Doctor <b className={ink}>Dr. N. Shah</b></span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Stat / KPI Card ---------------- */
export function StatExample({ variant }: { variant: string }) {
  const spark = [12, 18, 14, 22, 19, 27, 24, 31];
  const max = Math.max(...spark);
  const pts = spark.map((v, i) => `${(i / (spark.length - 1)) * 100},${30 - (v / max) * 26}`).join(" ");
  return (
    <div className={cn("w-full max-w-[230px] border p-4 space-y-2", rLg, surface, line)}>
      <div className="flex items-center justify-between">
        <span className={cn("text-[11px] font-medium", muted)}>{variant === "Progress" ? "Bed occupancy" : "Balance due"}</span>
        <Icon d={variant === "Progress" ? I.bed : I.bill} className={cn("w-3.5 h-3.5", muted)} />
      </div>
      {variant === "Progress" ? (
        <>
          <p className={cn("text-2xl font-semibold tracking-tight tabular-nums", ink)}>9<span className={cn("text-sm font-normal", muted)}> / 12 beds</span></p>
          <div className="h-1.5 rounded-full bg-[var(--t-surface-2)] overflow-hidden"><i className="block h-full w-3/4 rounded-full bg-[var(--t-accent)]" /></div>
          <p className={cn("text-[10px]", muted)}>3 beds free in General ward</p>
        </>
      ) : (
        <>
          <p className={cn("text-2xl font-semibold tracking-tight tabular-nums", ink)}>₹1,13,602</p>
          {variant === "Trend" && (
            <p className="flex items-center gap-1.5 text-[10.5px]">
              <span className={cn("inline-flex items-center gap-0.5 px-1.5 py-0.5 font-semibold", pill, STATUS.no)}><Icon d={I.up} className="w-3 h-3" />12%</span>
              <span className={muted}>vs last week</span>
            </p>
          )}
          {variant === "Sparkline" && (
            <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="w-full h-8" aria-hidden="true">
              <polyline points={`0,32 ${pts} 100,32`} fill="var(--t-accent-subtle)" stroke="none" />
              <polyline points={pts} fill="none" stroke="var(--t-accent)" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
            </svg>
          )}
          {variant === "Default" && <p className={cn("text-[10px]", muted)}>Across 5 admissions</p>}
        </>
      )}
    </div>
  );
}

/* ---------------- Progress & Loader ---------------- */
export function ProgressExample({ variant }: { variant: string }) {
  if (variant === "Ring") {
    const pct = 72, c = 2 * Math.PI * 22;
    return (
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 56 56" className="w-16 h-16 -rotate-90" aria-hidden="true">
          <circle cx="28" cy="28" r="22" fill="none" stroke="var(--t-surface-2)" strokeWidth="6" />
          <circle cx="28" cy="28" r="22" fill="none" stroke="var(--t-accent)" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} className="transition-[stroke-dashoffset] duration-700" />
        </svg>
        <div>
          <p className={cn("text-xl font-semibold tabular-nums", ink)}>{pct}%</p>
          <p className={cn("text-[10.5px]", muted)}>Profile complete</p>
        </div>
      </div>
    );
  }
  if (variant === "Skeleton")
    return (
      <div className={cn("w-full max-w-[230px] border p-3 space-y-3", rLg, surface, line)} aria-busy="true" aria-label="Loading">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2.5 animate-pulse">
            <i className="w-7 h-7 rounded-full bg-[var(--t-surface-2)]" />
            <div className="flex-1 space-y-1.5">
              <i className="block h-2 w-3/5 rounded bg-[var(--t-surface-2)]" />
              <i className="block h-2 w-2/5 rounded bg-[var(--t-surface-2)]" />
            </div>
            <i className={cn("w-12 h-4 bg-[var(--t-surface-2)]", pill)} />
          </div>
        ))}
      </div>
    );
  if (variant === "Spinner")
    return (
      <div className="flex flex-col items-center gap-2">
        <i className="w-7 h-7 rounded-full border-[3px] border-[var(--t-accent-subtle)] border-t-[var(--t-accent)] animate-spin" aria-hidden="true" />
        <p className={cn("text-[11px]", muted)} role="status">Syncing lab results…</p>
      </div>
    );
  return (
    <div className="w-full max-w-[230px] space-y-3">
      {[["Uploading report.pdf", 64], ["Importing 120 invoices", 100]].map(([l, v]) => (
        <div key={l as string} className="space-y-1.5">
          <div className={cn("flex justify-between text-[11px]", ink)}>
            <span>{l}</span>
            <span className={cn("tabular-nums", v === 100 ? "text-[var(--t-ok)]" : muted)}>{v === 100 ? "Done" : `${v}%`}</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--t-surface-2)] overflow-hidden" role="progressbar" aria-valuenow={v as number} aria-valuemin={0} aria-valuemax={100} aria-label={l as string}>
            <i className={cn("block h-full rounded-full transition-[width] duration-700", v === 100 ? "bg-[var(--t-ok)]" : "bg-[var(--t-accent)]")} style={{ width: `${v}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Search & Filters ---------------- */
const PATIENTS = ["Ravi Mehta", "Anita Desai", "Suresh Iyer", "Farah Khan", "Vikram Patel"];
export function SearchExample({ variant }: { variant: string }) {
  const [q, setQ] = React.useState(variant === "Search" ? "a" : "");
  const [chips, setChips] = React.useState(["Pending", "ICU"]);
  const id = React.useId();
  if (variant === "Filters") {
    const all = ["Pending", "Paid", "ICU", "General", "Dr. N. Shah"];
    return (
      <div className="w-full max-w-[250px] space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {all.map((c) => {
            const on = chips.includes(c);
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setChips((x) => (on ? x.filter((y) => y !== c) : [...x, c]))}
                className={cn("px-2.5 py-1 text-[11px] font-medium border transition-colors duration-200 cursor-pointer", pill, on ? "bg-[var(--t-accent-subtle)] border-[var(--t-accent)] text-[var(--t-accent-text)]" : cn(surface, line, muted))}
              >
                {on && "✓ "}{c}
              </button>
            );
          })}
        </div>
        <div className={cn("flex justify-between text-[10.5px]", muted)}>
          <span>{chips.length} filters · {Math.max(0, 14 - chips.length * 3)} results</span>
          {chips.length > 0 && <button type="button" onClick={() => setChips([])} className="text-[var(--t-accent-text)] hover:underline cursor-pointer">Clear all</button>}
        </div>
      </div>
    );
  }
  const results = PATIENTS.filter((p) => p.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="w-full max-w-[230px] space-y-1.5">
      <label htmlFor={id} className="sr-only">Search patients</label>
      <div style={h(34)} className={cn("flex items-center gap-2 border px-2.5 focus-within:border-[var(--t-accent)] focus-within:ring-[3px] focus-within:ring-[var(--t-accent-subtle)]", r, surface, line)}>
        <Icon d={I.search} className={cn("w-3.5 h-3.5", muted)} />
        <input id={id} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search patient or UHID" className={cn("flex-1 min-w-0 bg-transparent text-xs outline-none", ink)} />
        {variant === "Command" ? <kbd className={cn("font-mono text-[9.5px] border px-1", r, line, muted)}>⌘K</kbd> : q && <button type="button" aria-label="Clear search" onClick={() => setQ("")} className={cn("text-xs cursor-pointer", muted)}>✕</button>}
      </div>
      <div className={cn("border p-1 text-xs", rLg, surface, line)}>
        {results.length ? results.slice(0, 3).map((p, i) => (
          <div key={p} className={cn("flex items-center justify-between px-2 py-1.5", r, i === 0 ? "bg-[var(--t-accent-subtle)] text-[var(--t-accent-text)]" : ink)}>
            {p}{i === 0 && variant === "Command" && <span className="font-mono text-[9.5px]">↵</span>}
          </div>
        )) : <p className={cn("px-2 py-1.5", muted)}>No patients match “{q}”</p>}
      </div>
    </div>
  );
}

/* ---------------- Accordion & Tree ---------------- */
export function AccordionExample({ variant }: { variant: string }) {
  const [open, setOpen] = React.useState<number | null>(0);
  const [tree, setTree] = React.useState<Record<string, boolean>>({ IPD: true, Lab: false });
  if (variant === "Tree")
    return (
      <div className={cn("w-full max-w-[210px] text-xs", ink)} role="tree" aria-label="Modules">
        {[["IPD", ["Overview", "Billing", "Patients"]], ["Lab", ["Orders", "Reports"]]].map(([g, kids]) => (
          <div key={g as string} role="treeitem" aria-expanded={tree[g as string]} aria-selected={false}>
            <button type="button" onClick={() => setTree((t) => ({ ...t, [g as string]: !t[g as string] }))} className={cn("w-full flex items-center gap-1.5 px-2 py-1.5 font-medium hover:bg-[var(--t-surface-2)] cursor-pointer", r)}>
              <Icon d={I.chev} className={cn("w-3 h-3 transition-transform duration-300", tree[g as string] && "rotate-90")} />{g as string}
            </button>
            {tree[g as string] && (
              <div role="group" className={cn("ml-4 pl-2 border-l", line)}>
                {(kids as string[]).map((k) => (
                  <div key={k} role="treeitem" aria-selected={k === "Billing"} className={cn("px-2 py-1", r, k === "Billing" ? "bg-[var(--t-accent-subtle)] text-[var(--t-accent-text)] font-medium" : muted)}>{k}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  const items = [
    ["Visit details", "18 Sep – 22 Sep · Dr. N. Shah · General ward"],
    ["Unbilled items", "Bed charges, 8 medicines and 1 lab panel waiting for an invoice."],
    ["Payments", "Advance of ₹8,000 received on 18 Sep."],
  ];
  return (
    <div className={cn("w-full max-w-[240px] border divide-y", rLg, surface, line, "divide-[var(--t-line)]")}>
      {items.map(([t, body], i) => (
        <div key={t}>
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className={cn("w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium cursor-pointer", ink)}>
            {t}<Icon d={I.chev} className={cn("w-3.5 h-3.5 transition-transform duration-300", muted, open === i && "rotate-90")} />
          </button>
          <div className={cn("grid transition-[grid-template-rows] duration-300", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
            <p className={cn("overflow-hidden px-3 text-[10.5px] leading-snug", muted, open === i && "pb-2.5")}>{body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- File Upload ---------------- */
export function UploadExample({ variant }: { variant: string }) {
  const [files, setFiles] = React.useState(["CBC_report.pdf"]);
  if (variant === "Dropzone")
    return (
      <div className={cn("w-full max-w-[240px] border-2 border-dashed px-4 py-5 text-center space-y-1.5 hover:border-[var(--t-accent)] transition-colors", rLg, line, surface)}>
        <span className="mx-auto w-9 h-9 rounded-full grid place-items-center bg-[var(--t-accent-subtle)] text-[var(--t-accent-text)]"><Icon d={I.up} /></span>
        <p className={cn("text-xs font-medium", ink)}>Drop lab report or <span className="text-[var(--t-accent-text)] underline underline-offset-2">browse</span></p>
        <p className={cn("text-[10px]", muted)}>PDF, JPG up to 10 MB</p>
      </div>
    );
  const uploading = variant === "Uploading";
  return (
    <div className="w-full max-w-[240px] space-y-2">
      {(uploading ? ["Xray_chest.jpg"] : files).map((f) => (
        <div key={f} className={cn("flex items-center gap-2.5 border px-3 py-2", rLg, surface, line)}>
          <span className={cn("w-8 h-8 grid place-items-center shrink-0", r, uploading ? "bg-[var(--t-accent-subtle)] text-[var(--t-accent-text)]" : STATUS.ok)}><Icon d={uploading ? I.file : I.check} /></span>
          <div className="flex-1 min-w-0 space-y-1">
            <p className={cn("text-[11px] font-medium truncate", ink)}>{f}</p>
            {uploading ? (
              <div className="h-1 rounded-full bg-[var(--t-surface-2)] overflow-hidden"><i className="block h-full w-[64%] rounded-full bg-[var(--t-accent)] animate-pulse" /></div>
            ) : (
              <p className={cn("text-[10px]", muted)}>1.2 MB · Uploaded</p>
            )}
          </div>
          {!uploading && <button type="button" aria-label={`Remove ${f}`} onClick={() => setFiles([])} className={cn("text-xs cursor-pointer", muted)}>✕</button>}
        </div>
      ))}
      {!uploading && files.length === 0 && <button type="button" onClick={() => setFiles(["CBC_report.pdf"])} className="text-[11px] text-[var(--t-accent-text)] hover:underline cursor-pointer">Restore file</button>}
    </div>
  );
}

/* ---------------- Slider & Stepper ---------------- */
export function SliderExample({ variant }: { variant: string }) {
  const [v, setV] = React.useState(10);
  const [min, setMin] = React.useState(500);
  const [max, setMax] = React.useState(5000);
  const [qty, setQty] = React.useState(2);
  const range = "w-full accent-[var(--t-accent)] cursor-pointer";
  if (variant === "Stepper")
    return (
      <div className={cn("flex items-center gap-3 text-xs", ink)}>
        <span className="font-medium">Quantity</span>
        <div className={cn("inline-flex items-center border", r, line, surface)}>
          <button type="button" aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 grid place-items-center cursor-pointer hover:bg-[var(--t-surface-2)]">−</button>
          <span className={cn("w-8 text-center tabular-nums font-semibold border-x leading-8", line)} aria-live="polite">{qty}</span>
          <button type="button" aria-label="Increase" onClick={() => setQty((q) => Math.min(20, q + 1))} className="w-8 h-8 grid place-items-center cursor-pointer hover:bg-[var(--t-surface-2)]">+</button>
        </div>
        <span className={cn("tabular-nums", muted)}>₹{(qty * 185).toLocaleString("en-IN")}</span>
      </div>
    );
  if (variant === "Range")
    return (
      <div className="w-full max-w-[230px] space-y-2">
        <div className={cn("flex justify-between text-[11px]", ink)}><span>Bill amount</span><b className="tabular-nums">₹{min.toLocaleString("en-IN")} – ₹{max.toLocaleString("en-IN")}</b></div>
        <label className={cn("block text-[10px]", muted)}>Min<input type="range" min={0} max={10000} step={500} value={min} onChange={(e) => setMin(Math.min(Number(e.target.value), max))} className={range} /></label>
        <label className={cn("block text-[10px]", muted)}>Max<input type="range" min={0} max={10000} step={500} value={max} onChange={(e) => setMax(Math.max(Number(e.target.value), min))} className={range} /></label>
      </div>
    );
  return (
    <div className="w-full max-w-[230px] space-y-2">
      <div className={cn("flex justify-between text-[11px]", ink)}><span>Discount</span><b className="tabular-nums">{v}%</b></div>
      <input type="range" min={0} max={30} value={v} onChange={(e) => setV(Number(e.target.value))} aria-label="Discount" className={range} />
      <div className={cn("flex justify-between font-mono text-[9.5px]", muted)}><span>0%</span><span>30%</span></div>
    </div>
  );
}

/* ---------------- Sidebar & Breadcrumb ---------------- */
export function NavExample({ variant }: { variant: string }) {
  const [active, setActive] = React.useState("Billing");
  const items: [string, React.ReactNode, number?][] = [["Appointments", I.cal, 18], ["IPD", I.bed], ["Billing", I.bill], ["Patients", I.users], ["Lab", I.flask]];
  if (variant === "Breadcrumb")
    return (
      <nav aria-label="Breadcrumb" className="w-full max-w-[250px] space-y-2">
        <ol className={cn("flex flex-wrap items-center gap-1 text-[11px]", muted)}>
          {["Clinic", "IPD", "Billing"].map((c) => (
            <li key={c} className="flex items-center gap-1"><span className="hover:text-[var(--t-accent-text)] cursor-pointer">{c}</span><Icon d={I.chev} className="w-3 h-3" /></li>
          ))}
          <li aria-current="page" className={cn("font-mono font-semibold", ink)}>INV-3021</li>
        </ol>
        <p className={cn("text-sm font-semibold", ink)}>Invoice INV-3021</p>
      </nav>
    );
  const slim = variant === "Collapsed";
  return (
    <nav aria-label="Example sidebar" className={cn("border p-1.5 space-y-0.5 transition-[width] duration-300", rLg, surface2, line, slim ? "w-12" : "w-full max-w-[200px]")}>
      {!slim && <p className={cn(monoSm, "uppercase px-2 pt-1 pb-1.5", muted)}>Clinic</p>}
      {items.map(([l, d, n]) => (
        <button
          key={l}
          type="button"
          aria-current={active === l ? "page" : undefined}
          aria-label={slim ? l : undefined}
          title={slim ? l : undefined}
          onClick={() => setActive(l)}
          className={cn("relative w-full flex items-center gap-2 text-xs font-medium transition-colors cursor-pointer", r, slim ? "justify-center py-2" : "px-2 py-1.5", active === l ? cn(surface, "text-[var(--t-accent-text)] shadow-sm") : cn(muted, "hover:text-[var(--t-ink)]"))}
        >
          {active === l && <i className="absolute left-0 top-1.5 bottom-1.5 w-[2.5px] rounded-full bg-[var(--t-accent)]" />}
          <Icon d={d} className="w-3.5 h-3.5" />
          {!slim && <span className="flex-1 text-left">{l}</span>}
          {!slim && n && <span className={cn("text-[9.5px] px-1.5 border", pill, line, surface)}>{n}</span>}
        </button>
      ))}
    </nav>
  );
}

/* ---------------- Empty & Error States ---------------- */
export function EmptyStateExample({ variant }: { variant: string }) {
  const map = {
    Empty: [I.cal, "No appointments today", "Book the first visit to fill today's queue.", "Book appointment", "accent"],
    "No results": [I.search, "No patients found", "Try a UHID, phone number or a shorter name.", "Clear search", "plain"],
    Error: [I.file, "Couldn't load invoices", "The billing service didn't respond. Your data is safe.", "Try again", "bad"],
    Offline: [I.wifi, "You're offline", "Changes are saved on this device and sync when you're back.", "Retry now", "plain"],
  } as const;
  const [d, title, body, cta, tone] = map[variant as keyof typeof map] ?? map.Empty;
  return (
    <div className="w-full max-w-[240px] text-center space-y-2">
      <span className={cn("mx-auto w-10 h-10 rounded-full grid place-items-center", tone === "bad" ? STATUS.no : "bg-[var(--t-accent-subtle)] text-[var(--t-accent-text)]")}><Icon d={d} /></span>
      <p className={cn("text-xs font-semibold", ink)}>{title}</p>
      <p className={cn("text-[10.5px] leading-snug", muted)}>{body}</p>
      <button type="button" style={{ ...h(30), paddingInline: 14 }} className={cn("text-[11px] font-medium cursor-pointer", pill, tone === "accent" ? accentFill : cn("border", line, ink, surface))}>{cta}</button>
    </div>
  );
}

/* ---------------- Timeline & Activity ---------------- */
export function TimelineExample({ variant }: { variant: string }) {
  if (variant === "Audit log")
    return (
      <div className={cn("w-full max-w-[250px] border divide-y text-[10.5px]", rLg, surface, line, "divide-[var(--t-line)]")}>
        {[["Dr. N. Shah", "changed discount", "5% → 10%", "10:42"], ["Billing desk", "added item", "CBC + CRP", "10:15"], ["Reception", "updated bed", "B2 → B4", "09:58"]].map(([who, what, val, t]) => (
          <div key={t} className="flex items-start gap-2 px-3 py-2">
            <span className={cn("font-mono shrink-0", muted)}>{t}</span>
            <p className={ink}><b className="font-semibold">{who}</b> <span className={muted}>{what}</span> <span className="font-mono">{val}</span></p>
          </div>
        ))}
      </div>
    );
  const steps: [string, string, "done" | "now" | "next"][] = [["Booked", "Reception · 26 Sep, 10:00", "done"], ["Checked in", "10:05", "done"], ["Admitted", "General · B4", "now"], ["Invoice", "Pending", "next"]];
  return (
    <ol className="w-full max-w-[220px]">
      {steps.map(([t, s, st], i) => (
        <li key={t} className="relative flex gap-3 pb-3 last:pb-0">
          {i < steps.length - 1 && <i className={cn("absolute left-[7px] top-4 bottom-0 w-px", st === "done" ? "bg-[var(--t-accent)]" : "bg-[var(--t-line)]")} />}
          <span className={cn("relative mt-0.5 w-[15px] h-[15px] rounded-full grid place-items-center shrink-0", st === "done" ? "bg-[var(--t-accent)] text-[var(--t-on-accent)]" : st === "now" ? "border-2 border-[var(--t-accent)] bg-[var(--t-surface)]" : cn("border-2", line, surface))}>
            {st === "done" && <Icon d={I.check} className="w-2.5 h-2.5" />}
          </span>
          <div>
            <p className={cn("text-xs font-medium", st === "next" ? muted : ink)}>{t}</p>
            <p className={cn("text-[10px]", muted)}>{s}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------------- OTP & PIN ---------------- */
export function OtpExample({ variant }: { variant: string }) {
  const len = variant === "PIN" ? 4 : 6;
  const err = variant === "Error";
  const [vals, setVals] = React.useState<string[]>(() => (err ? ["4", "8", "2", "9", "1", "0"] : Array(len).fill("")));
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);
  const set = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    setVals((x) => x.map((y, k) => (k === i ? d : y)));
    if (d && i < len - 1) refs.current[i + 1]?.focus();
  };
  return (
    <div className="space-y-2 text-center">
      <p className={cn("text-[11px]", ink)}>{variant === "PIN" ? "Enter billing PIN" : "Code sent to +91 98••• ••210"}</p>
      <div className="flex justify-center gap-1.5">
        {Array.from({ length: len }, (_, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            value={vals[i] ?? ""}
            onChange={(e) => set(i, e.target.value)}
            onKeyDown={(e) => { if (e.key === "Backspace" && !vals[i] && i > 0) refs.current[i - 1]?.focus(); }}
            inputMode="numeric"
            type={variant === "PIN" ? "password" : "text"}
            aria-label={`Digit ${i + 1}`}
            style={h(38)}
            className={cn("w-8 text-center text-sm font-semibold tabular-nums border outline-none transition-shadow", r, surface, ink, err ? "border-[var(--t-bad)] ring-[3px] ring-[var(--t-bad-bg)]" : cn(line, "focus:border-[var(--t-accent)] focus:ring-[3px] focus:ring-[var(--t-accent-subtle)]"))}
          />
        ))}
      </div>
      <p className={cn("text-[10px]", err ? "text-[var(--t-bad)]" : muted)}>{err ? "That code didn't match. 2 tries left." : "Resend in 0:24"}</p>
    </div>
  );
}
