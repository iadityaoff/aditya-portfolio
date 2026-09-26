"use client";

import * as React from "react";
import { Stagger, StaggerItem } from "@/components/motion/studio";
import { useSiteTheme } from "@/lib/site-theme";
import { cn } from "@/lib/utils";
import { compile } from "./theme-engine";
import { accentFill, surface, surface2, ink, muted, line, r, rLg, pill, h, monoSm, STATUS } from "./lab-tokens";

/**
 * Composed patterns: organisms assembled only from the library's components
 * and tokens. Fully interactive, and re-themed by the same ThemeBuilder.
 */

const noop = () => () => {};

/* ---------------- Booking drawer ---------------- */
function BookingPattern() {
  const days = ["26 Sat", "27 Sun", "28 Mon", "29 Tue", "30 Wed"];
  const slots = ["10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45"];
  const booked = ["10:15", "10:45"];
  const [day, setDay] = React.useState(0);
  const [slot, setSlot] = React.useState<string | null>("11:30");
  const [urgency, setUrgency] = React.useState("Moderate");
  const [type, setType] = React.useState("Clinic visit");
  const [walkIn, setWalkIn] = React.useState(false);
  const [done, setDone] = React.useState(false);

  return (
    <div className={cn("relative h-full min-h-[430px] overflow-hidden border", rLg, surface2, line)}>
      {/* list behind the drawer */}
      <div className="p-4 space-y-2" aria-hidden="true">
        <p className={cn("text-sm font-semibold", ink)}>Appointment(s)</p>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={cn("flex items-center gap-2 border p-2", r, surface, line)}>
            <i className="w-6 h-6 rounded-full bg-[var(--t-accent-subtle)]" />
            <i className="h-2 w-16 rounded bg-[var(--t-line)]" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
      <div role="dialog" aria-label="Book appointment" className={cn("absolute inset-y-0 right-0 w-[84%] sm:w-[70%] border-l shadow-[-18px_0_40px_rgba(14,14,16,.18)] flex flex-col", surface, line)}>
        <div className={cn("flex items-start justify-between px-4 py-3 border-b", line)}>
          <div>
            <p className={cn("text-sm font-semibold", ink)}>Book Appointment</p>
            <p className={cn("text-[10.5px]", muted)}>Please fill out the form to book an appointment</p>
          </div>
          <span className={cn("text-xs", muted)} aria-hidden="true">✕</span>
        </div>
        <div className="flex-1 overflow-auto px-4 py-3 space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            {[["Patient", "Ravi Mehta · UH-20931"], ["Doctor", "Dr. N. Shah"]].map(([l, v]) => (
              <div key={l} className="space-y-1">
                <p className={cn("text-[10.5px] font-semibold", ink)}>{l} <span className="text-[var(--t-bad)]">*</span></p>
                <div style={h(32)} className={cn("flex items-center px-2.5 border truncate", r, line, ink)}>{v}</div>
              </div>
            ))}
          </div>
          <div className={cn("border overflow-hidden", r, line)}>
            <div role="tablist" aria-label="Day" className={cn("flex border-b text-[11px]", line)}>
              {days.map((d, i) => (
                <button key={d} type="button" role="tab" aria-selected={day === i} onClick={() => { setDay(i); setDone(false); }} className={cn("flex-1 py-1.5 font-medium cursor-pointer", day === i ? "text-[var(--t-ink)] shadow-[inset_0_-2px_0_var(--t-accent)]" : muted)}>{d}</button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-1.5 p-2 bg-[var(--t-accent-subtle)]/40">
              {slots.map((t) => {
                const off = booked.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={off}
                    aria-pressed={slot === t}
                    onClick={() => { setSlot(t); setDone(false); }}
                    className={cn("py-1 text-[10.5px] font-medium border tabular-nums cursor-pointer disabled:cursor-not-allowed", r, off ? cn("border-dashed line-through opacity-50", line, muted) : slot === t ? "bg-[var(--t-accent)] border-[var(--t-accent)] text-[var(--t-on-accent)]" : cn(surface, line, ink))}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-1">
            <p className={cn("text-[10.5px] font-semibold", ink)}>Level of urgency</p>
            <div className="flex flex-wrap gap-1.5">
              {["Critical", "Major", "Moderate", "Low"].map((u) => (
                <button key={u} type="button" aria-pressed={urgency === u} onClick={() => setUrgency(u)} className={cn("px-2.5 py-1 text-[10.5px] border cursor-pointer", pill, urgency === u ? (u === "Critical" ? cn(STATUS.no, "border-[var(--t-bad)]") : "bg-[var(--t-accent-subtle)] border-[var(--t-accent)] text-[var(--t-accent-text)]") : cn(line, muted))}>{u}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div role="radiogroup" aria-label="Appointment type" className={cn("flex p-0.5 gap-0.5", r, surface2)}>
              {["Clinic visit", "Video call"].map((t) => (
                <button key={t} type="button" role="radio" aria-checked={type === t} onClick={() => setType(t)} className={cn("px-2.5 py-1 text-[10.5px] font-medium cursor-pointer", r, type === t ? cn(surface, ink, "shadow-sm") : muted)}>{t}</button>
              ))}
            </div>
            <label className={cn("flex items-center gap-1.5 text-[10.5px] cursor-pointer", ink)}>
              <input type="checkbox" checked={walkIn} onChange={(e) => setWalkIn(e.target.checked)} className="w-3.5 h-3.5 accent-[var(--t-accent)]" /> Walk-in
            </label>
          </div>
        </div>
        <div className={cn("flex items-center justify-between gap-2 px-4 py-3 border-t", line)}>
          <p className={cn("text-[10.5px]", done ? "text-[var(--t-ok)] font-medium" : muted)} aria-live="polite">
            {done ? `✓ Booked ${days[day]} · ${slot}` : slot ? `${days[day]} · ${slot} · ${type}` : "Pick a slot"}
          </p>
          <button type="button" disabled={!slot} onClick={() => setDone(true)} style={{ ...h(32), paddingInline: 14 }} className={cn("text-[11px] font-semibold cursor-pointer disabled:opacity-50", pill, accentFill)}>
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Data table ---------------- */
type Bill = { id: string; name: string; uhid: string; bed: string; status: "Pending" | "Part paid" | "Paid"; balance: number };
const BILLS: Bill[] = [
  { id: "IPD-1042", name: "Ravi Mehta", uhid: "UH-20931", bed: "General · B4", status: "Pending", balance: 5922 },
  { id: "IPD-1039", name: "Anita Desai", uhid: "UH-20877", bed: "ICU · 02", status: "Part paid", balance: 66400 },
  { id: "IPD-1037", name: "Suresh Iyer", uhid: "UH-20812", bed: "Private · 11", status: "Paid", balance: 0 },
  { id: "IPD-1034", name: "Farah Khan", uhid: "UH-20790", bed: "General · B1", status: "Pending", balance: 13960 },
  { id: "IPD-1031", name: "Vikram Patel", uhid: "UH-20745", bed: "Semi-pvt · 07", status: "Part paid", balance: 27320 },
  { id: "IPD-1029", name: "Meera Nair", uhid: "UH-20702", bed: "General · B6", status: "Pending", balance: 21450 },
];
const tone = { Pending: STATUS.wait, "Part paid": "bg-[var(--t-accent-subtle)] text-[var(--t-accent-text)]", Paid: STATUS.ok };

function TablePattern() {
  const [q, setQ] = React.useState("");
  const [filter, setFilter] = React.useState<"All" | Bill["status"]>("All");
  const [sort, setSort] = React.useState<{ key: "name" | "balance"; dir: 1 | -1 }>({ key: "balance", dir: -1 });
  const [sel, setSel] = React.useState<string[]>([]);
  const [notice, setNotice] = React.useState("");

  const rows = BILLS.filter((b) => (filter === "All" || b.status === filter) && (b.name + b.uhid + b.id).toLowerCase().includes(q.toLowerCase())).sort((a, b) =>
    sort.key === "name" ? a.name.localeCompare(b.name) * sort.dir : (a.balance - b.balance) * sort.dir
  );
  const allOn = rows.length > 0 && rows.every((r) => sel.includes(r.id));
  const toggleSort = (key: "name" | "balance") => setSort((s) => ({ key, dir: s.key === key ? (s.dir === 1 ? -1 : 1) : 1 }));
  const arrow = (key: "name" | "balance") => (sort.key === key ? (sort.dir === 1 ? "↑" : "↓") : "↕");
  const bulk = (label: string) => { setNotice(`${label} · ${sel.length} bill${sel.length > 1 ? "s" : ""}`); setSel([]); };

  return (
    <div className={cn("border overflow-hidden", rLg, surface, line)}>
      <div className={cn("flex flex-wrap items-center gap-2 p-3 border-b", line)}>
        <div style={h(32)} className={cn("flex items-center gap-2 px-2.5 border flex-1 min-w-[160px] focus-within:border-[var(--t-accent)]", r, line, surface)}>
          <span className={cn("text-xs", muted)} aria-hidden="true">⌕</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search bills" placeholder="Search patient, UHID or IPD no." className={cn("flex-1 min-w-0 bg-transparent text-xs outline-none", ink)} />
        </div>
        <div role="group" aria-label="Status" className={cn("flex p-0.5 gap-0.5", r, surface2)}>
          {(["All", "Pending", "Part paid", "Paid"] as const).map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} className={cn("px-2.5 py-1 text-[10.5px] font-medium cursor-pointer", r, filter === f ? cn(surface, ink, "shadow-sm") : muted)}>{f}</button>
          ))}
        </div>
      </div>

      {sel.length > 0 ? (
        <div className="flex items-center justify-between gap-2 px-3 py-2 bg-[var(--t-ink)] text-[var(--t-surface)] text-[11px] animate-[lab-in_.3s_cubic-bezier(.16,1,.3,1)]">
          <span>{sel.length} selected</span>
          <span className="flex gap-1.5">
            <button type="button" onClick={() => bulk("Invoices generated")} className={cn("px-2.5 py-1 font-medium cursor-pointer", pill, "bg-[var(--t-accent)] text-[var(--t-on-accent)]")}>Generate invoices</button>
            <button type="button" onClick={() => bulk("Reminder sent")} className={cn("px-2.5 py-1 font-medium border border-white/25 cursor-pointer", pill)}>Send reminder</button>
          </span>
        </div>
      ) : notice ? (
        <p className={cn("px-3 py-2 text-[11px] font-medium", STATUS.ok)} role="status">✓ {notice}</p>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-xs">
          <thead className={cn(surface2, muted)}>
            <tr className={cn(monoSm, "uppercase")}>
              <th className="w-9 px-3 py-2"><input type="checkbox" aria-label="Select all" checked={allOn} onChange={() => setSel(allOn ? [] : rows.map((r) => r.id))} className="w-3.5 h-3.5 accent-[var(--t-accent)]" /></th>
              <th className="py-2 font-medium" aria-sort={sort.key === "name" ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
                <button type="button" onClick={() => toggleSort("name")} className="uppercase cursor-pointer hover:text-[var(--t-ink)]">Patient {arrow("name")}</button>
              </th>
              <th className="py-2 font-medium">Ward · Bed</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 pr-3 font-medium text-right" aria-sort={sort.key === "balance" ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
                <button type="button" onClick={() => toggleSort("balance")} className="uppercase cursor-pointer hover:text-[var(--t-ink)]">Balance {arrow("balance")}</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={5} className={cn("px-3 py-8 text-center", muted)}>No bills match these filters.</td></tr>
            ) : rows.map((b) => {
              const on = sel.includes(b.id);
              return (
                <tr key={b.id} className={cn("border-t transition-colors", line, on ? "bg-[var(--t-accent-subtle)]" : "hover:bg-[var(--t-surface-2)]")}>
                  <td className="px-3 py-2"><input type="checkbox" aria-label={`Select ${b.name}`} checked={on} onChange={() => setSel((s) => (on ? s.filter((x) => x !== b.id) : [...s, b.id]))} className="w-3.5 h-3.5 accent-[var(--t-accent)]" /></td>
                  <td className="py-2">
                    <p className={cn("font-medium", ink)}>{b.name}</p>
                    <p className={cn("font-mono text-[10px]", muted)}>{b.uhid} · {b.id}</p>
                  </td>
                  <td className={cn("py-2", muted)}>{b.bed}</td>
                  <td className="py-2"><span className={cn("px-2 py-0.5 text-[10.5px] font-medium", pill, tone[b.status])}>{b.status}</span></td>
                  <td className={cn("py-2 pr-3 text-right tabular-nums font-semibold", b.balance ? "text-[var(--t-bad)]" : "text-[var(--t-ok)]")}>₹{b.balance.toLocaleString("en-IN")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={cn("flex items-center justify-between px-3 py-2 border-t text-[10.5px]", line, muted)}>
        <span>Showing {rows.length} of {BILLS.length} bills</span>
        <span className="tabular-nums">Balance ₹{rows.reduce((t, b) => t + b.balance, 0).toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}

/* ---------------- Command palette ---------------- */
const COMMANDS: { group: string; label: string; hint: string }[] = [
  { group: "Patients", label: "Ravi Mehta", hint: "UH-20931" },
  { group: "Patients", label: "Anita Desai", hint: "UH-20877" },
  { group: "Actions", label: "Book appointment", hint: "B" },
  { group: "Actions", label: "Generate invoice", hint: "I" },
  { group: "Actions", label: "Admit patient", hint: "A" },
  { group: "Go to", label: "IPD Billing", hint: "G B" },
  { group: "Go to", label: "Lab orders", hint: "G L" },
];

function CommandPattern() {
  const [q, setQ] = React.useState("");
  const [idx, setIdx] = React.useState(0);
  const [ran, setRan] = React.useState("");
  const list = COMMANDS.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()) || c.hint.toLowerCase().includes(q.toLowerCase()));
  const cur = Math.min(idx, Math.max(0, list.length - 1));
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(list.length - 1, i + 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
    if (e.key === "Enter" && list[cur]) setRan(list[cur].label);
  };
  return (
    <div className={cn("relative min-h-[430px] grid place-items-center p-4 border overflow-hidden", rLg, surface2, line)}>
      <div className={cn("w-full max-w-[380px] border shadow-2xl overflow-hidden", rLg, surface, line)}>
        <div className={cn("flex items-center gap-2 px-3 border-b", line)} style={h(44)}>
          <span className={cn("text-sm", muted)} aria-hidden="true">⌕</span>
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setIdx(0); setRan(""); }}
            onKeyDown={onKey}
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-list"
            aria-activedescendant={list[cur] ? `cmd-${cur}` : undefined}
            aria-label="Type a command or search"
            placeholder="Type a command or search…"
            className={cn("flex-1 bg-transparent text-sm outline-none", ink)}
          />
          <kbd className={cn("font-mono text-[10px] border px-1.5 py-0.5", r, line, muted)}>esc</kbd>
        </div>
        <ul id="cmd-list" role="listbox" aria-label="Commands" className="max-h-[260px] overflow-auto p-1.5 text-xs">
          {list.length === 0 && <li className={cn("px-3 py-6 text-center", muted)}>No results for “{q}”</li>}
          {list.map((c, i) => {
            const head = i === 0 || list[i - 1].group !== c.group;
            return (
              <React.Fragment key={c.label}>
                {head && <li role="presentation" className={cn(monoSm, "uppercase px-2.5 pt-2 pb-1", muted)}>{c.group}</li>}
                <li
                  id={`cmd-${i}`}
                  role="option"
                  aria-selected={i === cur}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => setRan(c.label)}
                  className={cn("flex items-center justify-between px-2.5 py-2 cursor-pointer", r, i === cur ? "bg-[var(--t-accent-subtle)] text-[var(--t-accent-text)]" : ink)}
                >
                  {c.label}
                  <span className={cn("font-mono text-[10px]", i === cur ? "" : muted)}>{c.hint}</span>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
        <div className={cn("flex items-center justify-between px-3 py-2 border-t text-[10px]", line, muted)}>
          <span className="flex gap-3"><span>↑↓ navigate</span><span>↵ open</span></span>
          <span className={cn(ran && "text-[var(--t-ok)] font-medium")} aria-live="polite">{ran ? `✓ ${ran}` : `${list.length} results`}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Permission matrix ---------------- */
const ROLES = ["Doctor", "Receptionist", "Assistant", "Phlebotomist"];
const APPS = ["Clinic", "IPD", "Lab", "Pharmacy"];
const GROUPS: [string, string[]][] = [
  ["Patients", ["Manage patient", "View history"]],
  ["Clinical", ["Diagnosis", "Prescription", "Medicine"]],
  ["Billing", ["Create invoice", "Apply discount", "Refund"]],
];
const PRESET: Record<string, string[]> = {
  Doctor: ["Manage patient", "View history", "Diagnosis", "Prescription", "Medicine"],
  Receptionist: ["Manage patient", "View history", "Create invoice"],
  Assistant: ["View history", "Medicine"],
  Phlebotomist: ["View history"],
};

function PermissionPattern() {
  const [role, setRole] = React.useState("Receptionist");
  const [app, setApp] = React.useState("Clinic");
  // permissions are per role *and* per app; untouched pairs fall back to a preset
  const [perms, setPerms] = React.useState<Record<string, string[]>>({});
  const get = (ro: string, a: string) => perms[`${ro}:${a}`] ?? (a === "Clinic" ? PRESET[ro] : PRESET[ro].filter((_, i) => i % 2 === 0));
  const key = `${role}:${app}`;
  const on = get(role, app);
  const total = GROUPS.reduce((t, [, ps]) => t + ps.length, 0);
  const toggle = (p: string) => setPerms((x) => ({ ...x, [key]: on.includes(p) ? on.filter((y) => y !== p) : [...on, p] }));
  const setGroup = (ps: string[], val: boolean) => setPerms((x) => ({ ...x, [key]: val ? Array.from(new Set([...on, ...ps])) : on.filter((y) => !ps.includes(y)) }));

  return (
    <div className={cn("grid grid-cols-[130px_minmax(0,1fr)] min-h-[430px] border overflow-hidden", rLg, surface, line)}>
      <div className={cn("border-r p-2 space-y-0.5", line, surface2)}>
        <p className={cn(monoSm, "uppercase px-2 pt-1 pb-2", muted)}>Roles</p>
        {ROLES.map((ro) => (
          <button key={ro} type="button" aria-pressed={role === ro} onClick={() => setRole(ro)} className={cn("w-full flex items-center justify-between px-2 py-1.5 text-xs font-medium cursor-pointer", r, role === ro ? cn(surface, "text-[var(--t-accent-text)] shadow-sm") : cn(muted, "hover:text-[var(--t-ink)]"))}>
            {ro}
            <span className="font-mono text-[10px] opacity-70">{get(ro, app).length}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-col min-w-0">
        <div className={cn("px-4 pt-3 pb-2 border-b", line)}>
          <div className="flex items-center justify-between">
            <p className={cn("text-sm font-semibold", ink)}>{role} · {app}</p>
            <span className={cn("font-mono text-[10px]", muted)}>{on.length} of {total} on</span>
          </div>
          <div role="tablist" aria-label="App" className="flex gap-3 mt-2 text-[11px]">
            {APPS.map((a) => (
              <button key={a} type="button" role="tab" aria-selected={app === a} onClick={() => setApp(a)} className={cn("pb-1 font-medium cursor-pointer", app === a ? "text-[var(--t-ink)] shadow-[inset_0_-2px_0_var(--t-accent)]" : muted)}>{a}</button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto px-4 py-3 space-y-3">
          {GROUPS.map(([g, ps]) => {
            const all = ps.every((p) => on.includes(p));
            return (
              <div key={g} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className={cn(monoSm, "uppercase", muted)}>{g}</p>
                  <button type="button" onClick={() => setGroup(ps, !all)} className="text-[10.5px] text-[var(--t-accent-text)] hover:underline cursor-pointer">{all ? "Clear" : "Select all"}</button>
                </div>
                {ps.map((p) => {
                  const v = on.includes(p);
                  return (
                    <div key={p} className={cn("flex items-center justify-between text-xs", ink)}>
                      <span>{p}</span>
                      <button type="button" role="switch" aria-checked={v} aria-label={`${p} for ${role} in ${app}`} onClick={() => toggle(p)} className={cn("relative w-8 h-[18px] rounded-full transition-colors duration-300 cursor-pointer", v ? "bg-[var(--t-accent)]" : "bg-[var(--t-line)]")}>
                        <i className={cn("absolute top-[3px] left-[3px] w-3 h-3 rounded-full bg-white shadow transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]", v && "translate-x-[14px]")} />
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- gallery ---------------- */
const PATTERNS = [
  { name: "Booking Drawer", category: "Scheduling", desc: "Side drawer over the list: patient, doctor, day tabs, slot grid, urgency and visit type. Try booking a slot.", uses: ["Drawer", "Tabs", "Slot picker", "Pills", "Segmented", "Button"], Pattern: BookingPattern },
  { name: "Data Table", category: "Data Display", desc: "Search, status filter, sortable columns, row selection and a bulk-action bar. ₹ amounts stay tabular.", uses: ["Search", "Segmented", "Checkbox", "Badge", "Table", "Toast"], Pattern: TablePattern },
  { name: "Command Palette", category: "Navigation", desc: "⌘K search across patients, actions and pages. Use ↑ ↓ and Enter.", uses: ["Input", "Listbox", "Kbd", "Empty state"], Pattern: CommandPattern },
  { name: "Permission Matrix", category: "Settings", desc: "Roles × apps with grouped switches and Select all, the pattern behind multi-app access control.", uses: ["Nav list", "Tabs", "Switch", "Link button"], Pattern: PermissionPattern },
];

function PatternCard({ item }: { item: (typeof PATTERNS)[number] }) {
  const { name, category, desc, uses, Pattern } = item;
  return (
    <div className={cn("group/pat relative h-full flex flex-col border transition-[border-color,box-shadow] duration-[450ms] hover:border-[#9747ff]/60 hover:shadow-[0_18px_50px_rgba(14,14,16,.1)] focus-within:border-[#9747ff]/60", rLg, surface, line)}>
      <div className="flex items-center justify-between px-4 pt-4">
        <span className={cn("font-mono text-[10px] tracking-[0.08em] uppercase font-semibold", muted)}>{category}</span>
        <span className="font-mono text-[10px] text-[#9747ff]">❖ Organism</span>
      </div>
      <div className="px-4 pt-2">
        <h3 className={cn("text-lg font-semibold", ink)}>{name}</h3>
        <p className={cn("text-xs leading-relaxed mt-1", muted)}>{desc}</p>
      </div>
      <div className="p-3 flex-1">
        <Pattern />
      </div>
      <div className="flex flex-wrap items-center gap-1.5 px-4 pb-4">
        <span className={cn(monoSm, "uppercase mr-1", muted)}>Built from</span>
        {uses.map((u) => (
          <span key={u} className={cn("px-2 py-0.5 text-[10.5px] border", pill, line, muted)}>{u}</span>
        ))}
      </div>
    </div>
  );
}

/** Token artboard for the patterns, driven by the same site theme as the component lab. */
export function PatternLab() {
  const theme = useSiteTheme();
  const tokens = compile(theme);
  const mounted = React.useSyncExternalStore(noop, () => true, () => false);
  return (
    <div
      style={mounted ? (tokens as React.CSSProperties) : undefined}
      className="rounded-[24px] border border-line bg-[var(--t-canvas)] transition-colors duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)] overflow-hidden"
    >
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-line font-mono text-[10.5px] tracking-[0.06em] uppercase text-muted">
        <span><b className="text-accent font-medium">#</b> Frame · Composed patterns</span>
        <span>{PATTERNS.length} organisms · same tokens</span>
      </div>
      <Stagger className="p-5 sm:p-6 grid grid-cols-1 xl:grid-cols-2 gap-6" stagger={0.08}>
        {PATTERNS.map((p) => (
          <StaggerItem key={p.name}>
            <PatternCard item={p} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
