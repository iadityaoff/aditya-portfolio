"use client";

import * as React from "react";
import { Stagger, StaggerItem } from "@/components/motion/studio";
import { cn } from "@/lib/utils";

/**
 * Live component inventory. Every example reads the lab's semantic tokens
 * (--t-*, compiled by theme-engine.ts), so the ThemeBuilder re-themes all of
 * them at once. Each card exposes a Figma-style "Variant" property.
 */

import { accentFill, surface, surface2, ink, muted, line, r, rLg, pill, h, pad, monoSm, STATUS } from "./lab-tokens";
import {
  SlotPickerExample, PopoverExample, StatExample, ProgressExample, SearchExample, AccordionExample,
  UploadExample, SliderExample, NavExample, EmptyStateExample, TimelineExample, OtpExample,
} from "./component-examples-more";

type Ex = React.ComponentType<{ variant: string }>;

/* ---------------- Button ---------------- */
function ButtonExample({ variant }: { variant: string }) {
  const style =
    variant === "Secondary"
      ? cn("border-[1.5px] border-[var(--t-ink)]", ink, "hover:bg-[var(--t-ink)] hover:text-[var(--t-surface)]")
      : variant === "Ghost"
        ? "text-[var(--t-accent-text)] hover:bg-[var(--t-accent-subtle)]"
        : variant === "Danger"
          ? "bg-[#e5484d] text-white hover:bg-[#c93b40]"
          : accentFill;
  const sizes: [string, number, number, string][] = [["sm", 28, 12, "text-[11px]"], ["md", 34, 16, "text-xs"], ["lg", 40, 20, "text-[13px]"]];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        {sizes.map(([s, hh, px, fs]) => (
          <button key={s} type="button" style={{ ...h(hh), paddingInline: px }} className={cn(pill, fs, "font-medium transition-all duration-300 active:scale-95 cursor-pointer", style)}>
            {variant === "Danger" ? "Delete" : "Save"}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button type="button" disabled style={{ ...h(34), paddingInline: 16 }} className={cn(pill, "text-xs font-medium cursor-not-allowed opacity-45", style)}>
          Disabled
        </button>
        <span style={{ ...h(34), paddingInline: 16 }} className={cn(pill, "inline-flex items-center gap-2 text-xs font-medium", style)} aria-hidden="true">
          <i className="w-3 h-3 rounded-full border-2 border-current border-r-transparent animate-spin" /> Saving
        </span>
      </div>
    </div>
  );
}

/* ---------------- Input ---------------- */
function InputExample({ variant }: { variant: string }) {
  const id = React.useId();
  const err = variant === "Error", dis = variant === "Disabled", ok = variant === "Success", focus = variant === "Focus";
  return (
    <div className="w-full max-w-[230px] space-y-1.5">
      <label htmlFor={id} className={cn("block text-[11px] font-medium", ink)}>Patient ID</label>
      <input
        id={id}
        defaultValue={err ? "AP-849" : "AP-84920"}
        disabled={dis}
        aria-invalid={err || undefined}
        style={{ ...h(36), paddingInline: 12 }}
        className={cn(
          "w-full border text-xs font-mono outline-none transition-shadow duration-300",
          r, surface, ink,
          err ? "border-[var(--t-bad)] ring-[3px] ring-[var(--t-bad-bg)]"
            : ok ? "border-[var(--t-ok)]"
              : focus ? "border-[var(--t-accent)] ring-[3px] ring-[var(--t-accent-subtle)]"
                : cn(line, "focus:border-[var(--t-accent)] focus:ring-[3px] focus:ring-[var(--t-accent-subtle)]"),
          dis && "opacity-50 cursor-not-allowed"
        )}
      />
      <p className={cn("text-[10px]", err ? "text-[var(--t-bad)]" : ok ? "text-[var(--t-ok)]" : muted)}>
        {err ? "Must be 8 characters" : ok ? "✓ Patient found · Bed 12" : dis ? "Locked after discharge" : "Required · 8 characters"}
      </p>
    </div>
  );
}

/* ---------------- Checkbox / Radio / Switch ---------------- */
function CheckboxExample({ variant }: { variant: string }) {
  const [checks, setChecks] = React.useState([true, false, true]);
  const [radio, setRadio] = React.useState("ward");
  const [sw, setSw] = React.useState([true, false]);
  const name = React.useId();
  const indRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => { if (indRef.current) indRef.current.indeterminate = true; }, [variant]);
  const box = "w-4 h-4 accent-[var(--t-accent)] cursor-pointer";

  if (variant === "Radio")
    return (
      <div className={cn("grid gap-2 text-xs", ink)}>
        {[["ward", "General ward"], ["icu", "ICU"], ["day", "Day care"]].map(([v, l]) => (
          <label key={v} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name={name} checked={radio === v} onChange={() => setRadio(v)} className={box} /> {l}
          </label>
        ))}
      </div>
    );
  if (variant === "Switch")
    return (
      <div className={cn("grid gap-3 text-xs", ink)}>
        {["Auto-assign beds", "Notify insurer"].map((l, i) => (
          <label key={l} className="flex items-center justify-between gap-6 cursor-pointer">
            {l}
            <button
              type="button"
              role="switch"
              aria-checked={sw[i]}
              aria-label={l}
              onClick={() => setSw((s) => s.map((v, k) => (k === i ? !v : v)))}
              className={cn("relative w-9 h-5 rounded-full transition-colors duration-300 cursor-pointer", sw[i] ? "bg-[var(--t-accent)]" : "bg-[var(--t-line)]")}
            >
              <i className={cn("absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]", sw[i] && "translate-x-4")} />
            </button>
          </label>
        ))}
      </div>
    );
  if (variant === "Indeterminate")
    return (
      <div className={cn("grid gap-2 text-xs", ink)}>
        <label className="flex items-center gap-2 font-medium cursor-pointer"><input ref={indRef} type="checkbox" readOnly className={box} /> All consumables (2 of 3)</label>
        {["Saline 500ml", "Echo screening", "Cardiology visit"].map((l, i) => (
          <label key={l} className="flex items-center gap-2 pl-6 cursor-pointer">
            <input type="checkbox" checked={i < 2} readOnly className={box} /> {l}
          </label>
        ))}
      </div>
    );
  return (
    <div className={cn("grid gap-2 text-xs", ink)}>
      {["Insured", "Discharged", "Follow-up booked"].map((l, i) => (
        <label key={l} className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={checks[i]} onChange={() => setChecks((c) => c.map((v, k) => (k === i ? !v : v)))} className={box} /> {l}
        </label>
      ))}
    </div>
  );
}

/* ---------------- Select ---------------- */
function SelectExample({ variant }: { variant: string }) {
  const field = cn("flex items-center justify-between border text-xs", r, surface, ink);
  if (variant === "Multi")
    return (
      <div className={cn(field, line, "w-full max-w-[230px] flex-wrap gap-1.5 !justify-start")} style={pad(6, 8)} aria-hidden="true">
        {["Ward 4B", "ICU"].map((t) => (
          <span key={t} className={cn("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] bg-[var(--t-accent-subtle)] text-[var(--t-accent-text)]", pill)}>{t} ×</span>
        ))}
        <span className={cn("text-[11px]", muted)}>Add ward…</span>
      </div>
    );
  return (
    <div className="w-full max-w-[210px]" aria-hidden="true">
      <div
        style={{ ...h(36), paddingInline: 12 }}
        className={cn(field, variant === "Open" ? "border-[var(--t-accent)] ring-[3px] ring-[var(--t-accent-subtle)]" : line, variant === "Disabled" && "opacity-50")}
      >
        {variant === "Disabled" ? "No wards available" : "Ward 4B"} <span className={muted}>▾</span>
      </div>
      {variant === "Open" && (
        <div className={cn("mt-1 border shadow-lg p-1 text-xs", rLg, surface, line)}>
          <div className={cn("px-2 py-1.5", r, muted)}>Ward 3A</div>
          <div className={cn("px-2 py-1.5 flex justify-between font-medium bg-[var(--t-accent-subtle)] text-[var(--t-accent-text)]", r)}>Ward 4B <span>✓</span></div>
          <div className={cn("px-2 py-1.5", r, muted)}>ICU · Bay 2</div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Tabs / Stepper ---------------- */
function TabsExample({ variant }: { variant: string }) {
  const tabs = ["Vitals", "Billing", "Notes"];
  const [active, setActive] = React.useState(1);
  if (variant === "Stepper")
    return (
      <div className="w-full max-w-[240px] space-y-2">
        <div className="flex items-center">
          {[0, 1, 2, 3].map((n) => (
            <React.Fragment key={n}>
              <button
                type="button"
                aria-label={`Step ${n + 1}`}
                aria-current={n === active ? "step" : undefined}
                onClick={() => setActive(n)}
                className={cn("w-7 h-7 rounded-full grid place-items-center text-[10px] font-mono transition-colors duration-300 cursor-pointer", n <= active ? "bg-[var(--t-accent)] text-[var(--t-on-accent)]" : cn("border", line, muted))}
              >
                {n < active ? "✓" : n + 1}
              </button>
              {n < 3 && <span className={cn("flex-1 h-[2px] mx-1 transition-colors duration-300", n < active ? "bg-[var(--t-accent)]" : "bg-[var(--t-line)]")} />}
            </React.Fragment>
          ))}
        </div>
        <p className={cn("text-[11px] text-center", muted)}>Step {active + 1} of 4 · {["Admit", "Treat", "Bill", "Discharge"][active]}</p>
      </div>
    );
  const pillStyle = variant === "Pill", seg = variant === "Segmented";
  return (
    <div role="tablist" aria-label={`${variant} tabs`} className={cn("flex w-full max-w-[240px]", seg ? cn("p-1 gap-1", r, surface2) : pillStyle ? "gap-1.5" : cn("border-b", line))}>
      {tabs.map((t, i) => (
        <button
          key={t}
          type="button"
          role="tab"
          aria-selected={i === active}
          onClick={() => setActive(i)}
          style={h(seg || pillStyle ? 30 : 34)}
          className={cn(
            "relative flex-1 text-xs font-medium transition-all duration-300 cursor-pointer",
            seg ? cn(r, i === active ? cn(surface, ink, "shadow-sm") : muted)
              : pillStyle ? cn(pill, i === active ? "bg-[var(--t-accent)] text-[var(--t-on-accent)]" : cn(muted, "hover:bg-[var(--t-surface-2)]"))
                : i === active ? "text-[var(--t-accent-text)]" : muted
          )}
        >
          {t}
          {!seg && !pillStyle && (
            <span className={cn("absolute left-0 right-0 -bottom-px h-[2px] rounded bg-[var(--t-accent)] transition-transform duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)]", i === active ? "scale-x-100" : "scale-x-0")} />
          )}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Dialog ---------------- */
function DialogExample({ variant }: { variant: string }) {
  const danger = variant === "Destructive", form = variant === "Form";
  return (
    <div className={cn("relative w-full h-full grid place-items-center p-3 bg-black/20", r)} aria-hidden="true">
      <div className={cn("w-full max-w-[210px] border shadow-xl p-3 space-y-2", rLg, surface, line)}>
        <p className={cn("text-xs font-semibold", ink)}>{danger ? "Delete invoice?" : form ? "Add procedure" : "Discharge patient?"}</p>
        {form ? (
          <div className="space-y-1.5">
            <i className={cn("block h-6 border", r, line)} />
            <i className={cn("block h-6 border", r, line)} />
          </div>
        ) : (
          <p className={cn("text-[10px] leading-snug", muted)}>{danger ? "#INV-3021 will be removed. This can't be undone." : "Invoice #INV-3021 will be finalised."}</p>
        )}
        <div className="flex justify-end gap-1.5 pt-1">
          <span className={cn("h-6 px-2.5 border text-[10px] grid place-items-center", pill, line, ink)}>Cancel</span>
          <span className={cn("h-6 px-2.5 text-[10px] grid place-items-center", pill, danger ? "bg-[#e5484d] text-white" : "bg-[var(--t-accent)] text-[var(--t-on-accent)]")}>
            {danger ? "Delete" : form ? "Add" : "Confirm"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Drawer ---------------- */
function DrawerExample({ variant }: { variant: string }) {
  const bottom = variant === "Bottom";
  return (
    <div className={cn("relative w-full h-full border overflow-hidden", r, surface2, line)} aria-hidden="true">
      <div className="p-3 space-y-2">
        <i className="block h-2 w-2/5 rounded bg-[var(--t-line)]" />
        <i className="block h-2 w-3/5 rounded bg-[var(--t-line)]" />
        <i className="block h-2 w-1/2 rounded bg-[var(--t-line)]" />
      </div>
      <div
        className={cn(
          "absolute border p-3 space-y-2",
          surface, line,
          bottom ? "inset-x-0 bottom-0 h-[58%] border-t rounded-t-[var(--t-r-lg)] shadow-[0_-12px_30px_rgba(14,14,16,.1)]" : "inset-y-0 right-0 w-[58%] border-l shadow-[-12px_0_30px_rgba(14,14,16,.1)]"
        )}
      >
        {bottom && <i className="block mx-auto w-8 h-1 rounded-full bg-[var(--t-line)]" />}
        <div className="flex justify-between items-center">
          <span className={cn("text-[11px] font-semibold", ink)}>Bed 12</span>
          <span className={cn("text-xs", muted)}>✕</span>
        </div>
        <i className="block h-1.5 w-full rounded bg-[var(--t-line)]" />
        <span className={cn("block h-5 mt-2 bg-[var(--t-accent)]", pill)} />
      </div>
    </div>
  );
}

/* ---------------- Table ---------------- */
function TableExample({ variant }: { variant: string }) {
  const compact = variant === "Compact", selected = variant === "Selected", empty = variant === "Empty";
  const rows: [string, keyof typeof STATUS, string, string][] = [
    ["#INV-3018", "ok", "APPROVED", "$1,240"],
    ["#INV-3021", "wait", "PENDING", "$85.20"],
    ["#INV-3017", "no", "REJECTED", "$920.50"],
  ];
  return (
    <div className={cn("w-full border overflow-hidden text-[11px]", r, surface, line, ink)} aria-hidden="true">
      <div className={cn(monoSm, "grid grid-cols-[auto_1fr_auto_auto] gap-3 items-center px-3 py-2 uppercase", surface2, muted)}>
        {selected ? <input type="checkbox" readOnly checked={false} className="w-3 h-3 accent-[var(--t-accent)]" /> : <span />}
        <span>Invoice ↕</span><span>Status</span><span className="text-right">Total</span>
      </div>
      {empty ? (
        <div className="px-3 py-6 text-center space-y-1">
          <p className="font-medium">No unbilled items</p>
          <p className={cn("text-[10px]", muted)}>Everything for Bed 12 is invoiced.</p>
        </div>
      ) : (
        rows.map(([id, tone, label, total], i) => (
          <div
            key={id}
            style={pad(compact ? 3 : 7, 12)}
            className={cn("grid grid-cols-[auto_1fr_auto_auto] gap-3 items-center border-t", line, selected && i === 1 && "bg-[var(--t-accent-subtle)]")}
          >
            {selected ? <input type="checkbox" readOnly checked={i === 1} className="w-3 h-3 accent-[var(--t-accent)]" /> : <span />}
            <span className={cn("font-mono", muted)}>{id}</span>
            <span className={cn(monoSm, "text-[8.5px] px-1.5 py-0.5", pill, STATUS[tone])}>{label}</span>
            <b className="tabular-nums text-right font-semibold">{total}</b>
          </div>
        ))
      )}
    </div>
  );
}

/* ---------------- Pagination ---------------- */
function PaginationExample({ variant }: { variant: string }) {
  const [page, setPage] = React.useState(2);
  const [loaded, setLoaded] = React.useState(24);
  const btn = cn("grid place-items-center text-xs font-medium tabular-nums transition-colors duration-300 cursor-pointer", r);
  const box = { ...h(32), minWidth: `calc(32px * var(--t-d))` };
  if (variant === "Simple")
    return (
      <nav aria-label="Example pagination" className={cn("flex items-center gap-3 text-xs", ink)}>
        <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ ...h(32), paddingInline: 12 }} className={cn(btn, "border", line)}>‹ Prev</button>
        <span className={cn("font-mono text-[11px]", muted)}>Page {page} of 12</span>
        <button type="button" onClick={() => setPage((p) => Math.min(12, p + 1))} style={{ ...h(32), paddingInline: 12 }} className={cn(btn, "border", line)}>Next ›</button>
      </nav>
    );
  if (variant === "Load more")
    return (
      <div className="text-center space-y-2">
        <p className={cn("font-mono text-[11px]", muted)}>Showing {loaded} of 120 invoices</p>
        <button type="button" onClick={() => setLoaded((l) => Math.min(120, l + 24))} style={{ ...h(34), paddingInline: 16 }} className={cn(btn, pill, "border", line, ink, "hover:border-[var(--t-accent)]")}>
          {loaded >= 120 ? "All loaded" : "Load 24 more"}
        </button>
      </div>
    );
  return (
    <nav aria-label="Example pagination" className="flex items-center gap-1">
      <button type="button" aria-label="Previous page" onClick={() => setPage((p) => Math.max(1, p - 1))} style={box} className={cn(btn, "border", line, muted)}>‹</button>
      {[1, 2, 3].map((n) => (
        <button key={n} type="button" aria-current={n === page ? "page" : undefined} onClick={() => setPage(n)} style={box} className={cn(btn, n === page ? "bg-[var(--t-accent)] text-[var(--t-on-accent)]" : cn(ink, "hover:bg-[var(--t-surface-2)]"))}>
          {n}
        </button>
      ))}
      <span className={cn("w-5 text-center text-xs", muted)}>…</span>
      <button type="button" aria-current={page === 12 ? "page" : undefined} onClick={() => setPage(12)} style={box} className={cn(btn, page === 12 ? "bg-[var(--t-accent)] text-[var(--t-on-accent)]" : cn(ink, "hover:bg-[var(--t-surface-2)]"))}>12</button>
      <button type="button" aria-label="Next page" onClick={() => setPage((p) => (p === 3 ? 12 : Math.min(12, p + 1)))} style={box} className={cn(btn, "border", line, muted)}>›</button>
    </nav>
  );
}

/* ---------------- Badge ---------------- */
function BadgeExample({ variant }: { variant: string }) {
  const [tags, setTags] = React.useState(["Cardiology", "Insured"]);
  const items: [keyof typeof STATUS | "new", string][] = [["ok", "Approved"], ["wait", "Pending"], ["no", "Rejected"], ["new", "New"]];
  const solid = { ok: "bg-[var(--t-ok)] text-[var(--t-surface)]", wait: "bg-[var(--t-warn)] text-[var(--t-surface)]", no: "bg-[var(--t-bad)] text-[var(--t-surface)]", new: "bg-[var(--t-accent)] text-[var(--t-on-accent)]" };
  const soft = { ...STATUS, new: "bg-[var(--t-accent-subtle)] text-[var(--t-accent-text)]" };
  const outline = { ok: "border border-[var(--t-ok)] text-[var(--t-ok)]", wait: "border border-[var(--t-warn)] text-[var(--t-warn)]", no: "border border-[var(--t-bad)] text-[var(--t-bad)]", new: "border border-[var(--t-accent)] text-[var(--t-accent-text)]" };
  const dotC = { ok: "bg-[var(--t-ok)]", wait: "bg-[var(--t-warn)]", no: "bg-[var(--t-bad)]", new: "bg-[var(--t-accent)]" };
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-1.5">
        {items.map(([k, label]) =>
          variant === "Dot" ? (
            <span key={k} className={cn("inline-flex items-center gap-1.5 text-[11px]", ink)}><i className={cn("w-1.5 h-1.5 rounded-full", dotC[k])} />{label}</span>
          ) : (
            <span key={k} className={cn(monoSm, "uppercase px-2 py-0.5", pill, variant === "Solid" ? solid[k] : variant === "Outline" ? outline[k] : soft[k])}>{label}</span>
          )
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-1.5 min-h-[26px]">
        {tags.map((t) => (
          <span key={t} className={cn("inline-flex items-center gap-1 pl-2.5 pr-1 py-0.5 border text-[11px]", r, surface, line, ink)}>
            {t}
            <button type="button" aria-label={`Remove ${t}`} onClick={() => setTags((x) => x.filter((y) => y !== t))} className={cn("w-4 h-4 rounded grid place-items-center hover:bg-[var(--t-surface-2)] cursor-pointer", muted)}>×</button>
          </span>
        ))}
        {tags.length < 2 && (
          <button type="button" onClick={() => setTags(["Cardiology", "Insured"])} className="text-[11px] text-[var(--t-accent-text)] hover:underline cursor-pointer">Reset tags</button>
        )}
      </div>
    </div>
  );
}

/* ---------------- Avatar ---------------- */
function AvatarExample({ variant }: { variant: string }) {
  const people: [string, string][] = [["AT", "bg-[var(--t-accent)] text-[var(--t-on-accent)]"], ["MV", STATUS.ok], ["ER", STATUS.wait]];
  const shape = variant === "Square" ? r : "rounded-full";
  if (variant === "Sizes")
    return (
      <div className="flex items-end gap-3" aria-hidden="true">
        {[24, 32, 40, 52].map((s) => (
          <span key={s} style={{ width: s, height: s, fontSize: s * 0.34 }} className="rounded-full grid place-items-center font-semibold bg-[var(--t-accent-subtle)] text-[var(--t-accent-text)]">AT</span>
        ))}
      </div>
    );
  if (variant === "Status")
    return (
      <div className="flex items-center gap-4" aria-hidden="true">
        {[["JD", "bg-[#12a150]", "Online"], ["MV", "bg-[#f5a524]", "Away"], ["ER", "bg-[var(--t-muted)]", "Offline"]].map(([i, c, l]) => (
          <span key={i} className="flex flex-col items-center gap-1">
            <span className="relative w-10 h-10 rounded-full grid place-items-center text-xs font-semibold bg-[var(--t-accent-subtle)] text-[var(--t-accent-text)]">
              {i}<i className={cn("absolute right-0 bottom-0 w-2.5 h-2.5 rounded-full ring-2 ring-[var(--t-surface)]", c)} />
            </span>
            <span className={cn("text-[10px]", muted)}>{l}</span>
          </span>
        ))}
      </div>
    );
  return (
    <div className="flex -space-x-2" aria-hidden="true">
      {people.map(([i, c]) => (
        <span key={i} className={cn("w-10 h-10 grid place-items-center text-[11px] font-semibold ring-2 ring-[var(--t-surface)]", shape, c)}>{i}</span>
      ))}
      <span className={cn("w-10 h-10 grid place-items-center text-[11px] font-medium ring-2 ring-[var(--t-surface)] bg-[var(--t-line)]", shape, muted)}>+3</span>
    </div>
  );
}

/* ---------------- Toast / Alert ---------------- */
function ToastExample({ variant }: { variant: string }) {
  const [shown, setShown] = React.useState(true);
  const map = {
    Success: ["✓", "bg-[#12a150]", "Invoice sent to insurer", "ok"],
    Warning: ["!", "bg-[#f5a524]", "Pre-auth expires in 2 days", "wait"],
    Error: ["✕", "bg-[#e5484d]", "Claim upload failed", "no"],
    Info: ["i", "bg-[var(--t-accent)]", "3 new lab results", "new"],
  } as const;
  const [icon, dot, text, tone] = map[(variant as keyof typeof map) || "Success"] ?? map.Success;
  const alertTone = tone === "new" ? "bg-[var(--t-accent-subtle)] text-[var(--t-accent-text)] border-[var(--t-accent)]/30" : cn(STATUS[tone], "border-current/20");
  return (
    <div className="w-full max-w-[240px] space-y-2">
      <div className="min-h-[44px]" aria-live="polite">
        <div className={cn("flex items-center gap-2.5 px-3 py-2.5 bg-[#0e0e10] text-white shadow-lg transition-all duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)]", rLg, shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none")}>
          <span className={cn("w-5 h-5 rounded-full grid place-items-center text-[10px] font-bold text-white", dot)}>{icon}</span>
          <span className="text-[11px] flex-1">{text}</span>
          <button type="button" aria-label="Dismiss notification" onClick={() => setShown(false)} className="text-white/60 hover:text-white text-xs cursor-pointer">✕</button>
        </div>
      </div>
      {!shown && <button type="button" onClick={() => setShown(true)} className="text-[11px] text-[var(--t-accent-text)] hover:underline cursor-pointer">Show toast again</button>}
      <div className={cn("flex items-start gap-2 px-3 py-2 border text-[10.5px]", r, alertTone)}>
        <span aria-hidden="true" className="font-bold">{icon}</span> {text}
      </div>
    </div>
  );
}

/* ---------------- inventory ---------------- */

const INVENTORY: { name: string; count: number; category: string; Example: Ex; variants: string[]; fill?: boolean }[] = [
  { name: "Button", count: 18, category: "Actions", Example: ButtonExample, variants: ["Primary", "Secondary", "Ghost", "Danger"] },
  { name: "Input & Textarea", count: 12, category: "Forms", Example: InputExample, variants: ["Default", "Focus", "Error", "Success", "Disabled"] },
  { name: "Checkbox & Radio", count: 8, category: "Forms", Example: CheckboxExample, variants: ["Checkbox", "Radio", "Switch", "Indeterminate"] },
  { name: "Select & Combobox", count: 14, category: "Forms", Example: SelectExample, variants: ["Closed", "Open", "Multi", "Disabled"] },
  { name: "Tabs & Steppers", count: 10, category: "Navigation", Example: TabsExample, variants: ["Underline", "Pill", "Segmented", "Stepper"] },
  { name: "Dialog & Modal", count: 8, category: "Overlays", Example: DialogExample, variants: ["Confirm", "Destructive", "Form"], fill: true },
  { name: "Drawer / Sheet", count: 6, category: "Overlays", Example: DrawerExample, variants: ["Right", "Bottom"], fill: true },
  { name: "Data Table & Header", count: 16, category: "Data Display", Example: TableExample, variants: ["Default", "Compact", "Selected", "Empty"] },
  { name: "Pagination", count: 6, category: "Navigation", Example: PaginationExample, variants: ["Numbered", "Simple", "Load more"] },
  { name: "Badge & Tag", count: 9, category: "Data Display", Example: BadgeExample, variants: ["Soft", "Solid", "Outline", "Dot"] },
  { name: "Avatar & Identity", count: 8, category: "Data Display", Example: AvatarExample, variants: ["Group", "Status", "Sizes", "Square"] },
  { name: "Toast & Alert", count: 12, category: "Feedback", Example: ToastExample, variants: ["Success", "Warning", "Error", "Info"] },
  { name: "Date & Slot Picker", count: 9, category: "Scheduling", Example: SlotPickerExample, variants: ["Day tabs", "Slots", "Calendar"] },
  { name: "Tooltip & Popover", count: 10, category: "Overlays", Example: PopoverExample, variants: ["Popover", "Menu", "Tooltip"] },
  { name: "Stat & KPI Card", count: 8, category: "Data Display", Example: StatExample, variants: ["Default", "Trend", "Sparkline", "Progress"] },
  { name: "Progress & Loader", count: 8, category: "Feedback", Example: ProgressExample, variants: ["Bar", "Ring", "Skeleton", "Spinner"] },
  { name: "Search & Filters", count: 7, category: "Navigation", Example: SearchExample, variants: ["Search", "Command", "Filters"] },
  { name: "Accordion & Tree", count: 6, category: "Navigation", Example: AccordionExample, variants: ["Accordion", "Tree"] },
  { name: "File Upload", count: 6, category: "Forms", Example: UploadExample, variants: ["Dropzone", "Uploading", "Done"] },
  { name: "Slider & Stepper", count: 6, category: "Forms", Example: SliderExample, variants: ["Single", "Range", "Stepper"] },
  { name: "Sidebar & Breadcrumb", count: 9, category: "Navigation", Example: NavExample, variants: ["Sidebar", "Collapsed", "Breadcrumb"] },
  { name: "Empty & Error States", count: 6, category: "Feedback", Example: EmptyStateExample, variants: ["Empty", "No results", "Error", "Offline"] },
  { name: "Timeline & Activity", count: 5, category: "Data Display", Example: TimelineExample, variants: ["Activity", "Audit log"] },
  { name: "OTP & PIN Input", count: 4, category: "Forms", Example: OtpExample, variants: ["OTP", "PIN", "Error"] },
];

const CATEGORIES = ["All", ...Array.from(new Set(INVENTORY.map((i) => i.category)))];

function ComponentCard({ item }: { item: (typeof INVENTORY)[number] }) {
  const { name, count, category, Example, variants, fill } = item;
  const [variant, setVariant] = React.useState(variants[0]);
  return (
    <div className={cn("group/comp relative h-full flex flex-col border transition-[border-color,box-shadow,background-color] duration-[450ms] hover:border-[#9747ff]/60 hover:shadow-[0_18px_50px_rgba(14,14,16,.1)] focus-within:border-[#9747ff]/60", rLg, surface, line)}>
      <span aria-hidden="true" className="absolute -top-[18px] left-0 font-mono text-[10px] tracking-[0.04em] text-[#9747ff] opacity-0 translate-y-1 group-hover/comp:opacity-100 group-hover/comp:translate-y-0 group-focus-within/comp:opacity-100 group-focus-within/comp:translate-y-0 transition-all duration-300">
        ◆ {name.split(" ")[0]} / {variant}
      </span>
      <div className="flex items-center justify-between px-4 pt-4">
        <span className={cn("font-mono text-[10px] tracking-[0.08em] uppercase font-semibold", muted)}>{category}</span>
        <span className="font-mono text-[10px] text-[#9747ff]">◆ Component</span>
      </div>

      {/* Figma-style variant property */}
      <div className="flex items-center gap-2 px-4 pt-3">
        <span className={cn("font-mono text-[9.5px] tracking-[0.06em] uppercase shrink-0", muted)}>Variant</span>
        <div role="radiogroup" aria-label={`${name} variant`} className={cn("flex flex-wrap gap-1 p-0.5", r, surface2)}>
          {variants.map((v) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={variant === v}
              onClick={() => setVariant(v)}
              className={cn(
                "px-2 py-1 text-[10px] font-medium transition-all duration-300 cursor-pointer",
                r,
                variant === v ? cn(surface, ink, "shadow-[0_1px_2px_rgba(0,0,0,.12)]") : cn(muted, "hover:text-[var(--t-ink)]")
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn("mx-3 mt-3 border border-dashed flex items-center justify-center min-h-[176px]", rLg, line, fill ? "p-2" : "p-4")}
        style={{ backgroundImage: "radial-gradient(var(--t-dot) 1px, transparent 1.2px)", backgroundSize: "14px 14px" }}
      >
        <div key={variant} className={cn("flex items-center justify-center w-full animate-[lab-in_.45s_cubic-bezier(.16,1,.3,1)]", fill && "h-[156px]")}>
          <Example variant={variant} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 pt-3 pb-4 mt-auto">
        <h3 className={cn("text-base font-semibold", ink)}>{name}</h3>
        <span className="font-mono text-[11px] text-[var(--t-accent-text)] font-semibold whitespace-nowrap">{count} variants</span>
      </div>
    </div>
  );
}

export function ComponentGallery() {
  const [cat, setCat] = React.useState("All");
  const items = cat === "All" ? INVENTORY : INVENTORY.filter((i) => i.category === cat);
  return (
    <div className="space-y-8">
      <div role="group" aria-label="Filter components by category" className="flex flex-wrap items-center gap-1.5">
        {CATEGORIES.map((c) => {
          const n = c === "All" ? INVENTORY.length : INVENTORY.filter((i) => i.category === c).length;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium border transition-colors duration-300 cursor-pointer",
                pill,
                cat === c ? "bg-[var(--t-ink)] text-[var(--t-surface)] border-[var(--t-ink)]" : cn(surface, line, muted, "hover:text-[var(--t-ink)]")
              )}
            >
              {c}
              <span className="font-mono text-[10px] opacity-70">{n}</span>
            </button>
          );
        })}
      </div>
      {/* re-keyed so the stagger replays when the filter changes */}
      <Stagger key={cat} className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-8" stagger={0.06}>
        {items.map((item) => (
          <StaggerItem key={item.name}>
            <ComponentCard item={item} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
