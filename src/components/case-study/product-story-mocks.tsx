import * as React from "react";
import { cn } from "@/lib/utils";

// --------------------------------------------------------
// Conceptual Tag (Honest Disclosure per user rule)
// --------------------------------------------------------
function ConceptualTag() {
  return (
    <div className="absolute top-4 right-4 z-50 pointer-events-none">
      <span className="bg-surface border border-line text-muted font-mono text-[9px] uppercase font-bold tracking-widest px-2 py-1 rounded shadow-sm">
        Illustrative UI
      </span>
    </div>
  );
}

// --------------------------------------------------------
// Design System Mocks
// --------------------------------------------------------

export function DSMock01() {
  // Step 1: Primitive Variables (Colors/Spacing scale)
  return (
    <div className="w-full h-full bg-[#1E1E1E] text-[#D4D4D4] font-mono text-[10px] p-6 flex flex-col relative overflow-hidden">
      <ConceptualTag />
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
        <div className="w-3 h-3 rounded-full bg-[#E5E5E5]" />
        <span className="text-[#A3A3A3] font-sans text-xs">primitives.json</span>
      </div>
      
      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <span className="text-[#569CD6]">&quot;colors&quot;</span><span className="text-white">:</span> {'{'}
          <div className="pl-4 space-y-1.5">
            <div className="flex items-center gap-4">
              <span className="text-[#9CDCFE]">&quot;blue-500&quot;</span><span className="text-white">:</span> <span className="text-[#CE9178]">&quot;#3B82F6&quot;</span>,
              <div className="w-4 h-4 rounded bg-[#3B82F6] ml-4 ring-1 ring-white/20" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#9CDCFE]">&quot;blue-600&quot;</span><span className="text-white">:</span> <span className="text-[#CE9178]">&quot;#2563EB&quot;</span>,
              <div className="w-4 h-4 rounded bg-[#2563EB] ml-4 ring-1 ring-white/20" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#9CDCFE]">&quot;slate-900&quot;</span><span className="text-white">:</span> <span className="text-[#CE9178]">&quot;#0F172A&quot;</span>,
              <div className="w-4 h-4 rounded bg-[#0F172A] ml-4 ring-1 ring-white/20" />
            </div>
          </div>
          {'}'},
        </div>

        <div className="space-y-2">
          <span className="text-[#569CD6]">&quot;spacing&quot;</span><span className="text-white">:</span> {'{'}
          <div className="pl-4 flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-4">
              <span className="text-[#9CDCFE]">&quot;4&quot;</span><span className="text-white">:</span> <span className="text-[#CE9178]">&quot;1rem&quot;</span>,
              <div className="w-4 h-2 bg-white/20 rounded-sm ml-4" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#9CDCFE]">&quot;8&quot;</span><span className="text-white">:</span> <span className="text-[#CE9178]">&quot;2rem&quot;</span>,
              <div className="w-8 h-2 bg-white/20 rounded-sm ml-4" />
            </div>
          </div>
          {'}'}
        </div>
      </div>
    </div>
  );
}

export function DSMock02() {
  // Step 2: Semantic Mapping (Design Tokens applied to UI structures)
  return (
    <div className="w-full h-full bg-[#F8FAFC] p-8 flex flex-col relative overflow-hidden">
      <ConceptualTag />
      <div className="text-xs font-semibold text-slate-800 mb-6 flex items-center justify-between">
        <span>Token Mapping Matrix</span>
        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Draft</span>
      </div>

      <div className="flex-1 border border-slate-200 bg-[#ffffff] rounded-lg shadow-sm overflow-hidden flex flex-col">
        <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider p-3">
          <div>Semantic Token</div>
          <div>Primitive Ref</div>
          <div>Visual</div>
        </div>
        
        {[
          { sem: "bg-surface-interactive", prim: "blue-500", color: "bg-blue-500" },
          { sem: "bg-surface-hover", prim: "blue-600", color: "bg-blue-600" },
          { sem: "text-on-interactive", prim: "white", color: "bg-[#ffffff] border border-slate-200" },
          { sem: "border-focus-ring", prim: "blue-400", color: "bg-blue-400" },
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-3 items-center border-b border-slate-100 p-3 text-xs text-slate-600">
            <div className="font-mono text-blue-600 font-medium">{row.sem}</div>
            <div className="font-mono text-slate-400 text-[10px]">{row.prim}</div>
            <div className={cn("w-6 h-6 rounded-md shadow-sm", row.color)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DSMock03() {
  // Step 3: Component Build (Figma Component Anatomy)
  return (
    <div className="w-full h-full bg-[#E5E5E5] p-6 flex items-center justify-center relative overflow-hidden">
      <ConceptualTag />
      <div className="w-full max-w-sm bg-[#ffffff] p-8 rounded-xl shadow-lg border border-slate-200 relative">
        <div className="absolute top-2 left-2 flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        
        <div className="mt-4 flex flex-col gap-6">
          <div className="space-y-2 relative">
            {/* Component Blueprint Overlay */}
            <div className="absolute -inset-2 border border-blue-400 border-dashed rounded opacity-50" />
            <div className="absolute -top-6 -left-2 text-[8px] font-mono font-bold text-blue-500 uppercase">Button / Primary / Default</div>
            
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-colors flex justify-center">
              Primary Action
            </button>
            <div className="flex justify-between px-1">
              <span className="text-[8px] font-mono text-slate-400">h: 40px (space-10)</span>
              <span className="text-[8px] font-mono text-slate-400">rad: 8px (rounded-lg)</span>
            </div>
          </div>

          <div className="space-y-2 relative mt-8">
            <div className="absolute -inset-2 border border-blue-400 border-dashed rounded opacity-50" />
            <div className="absolute -top-6 -left-2 text-[8px] font-mono font-bold text-blue-500 uppercase">Button / Primary / Focus</div>
            
            <button className="w-full bg-blue-500 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm ring-2 ring-blue-500 ring-offset-2 flex justify-center">
              Primary Action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DSMock04() {
  // Step 4: Production Storybook
  return (
    <div className="w-full h-full bg-[#ffffff] flex flex-col relative overflow-hidden border border-slate-200">
      <ConceptualTag />
      {/* Storybook Sidebar Mock */}
      <div className="flex h-full">
        <div className="w-1/3 bg-[#F6F9FC] border-r border-slate-200 p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-pink-500 rounded flex items-center justify-center text-[10px] text-white font-bold">S</div>
            <span className="text-xs font-bold text-slate-700">Storybook</span>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Components</div>
            <div className="text-xs text-slate-600 font-medium bg-blue-100/50 text-blue-600 px-2 py-1 rounded">Button</div>
            <div className="text-xs text-slate-600 pl-4 py-1">Card</div>
            <div className="text-xs text-slate-600 pl-4 py-1">Input</div>
          </div>
        </div>
        {/* Storybook Canvas Mock */}
        <div className="w-2/3 p-6 bg-[#ffffff] flex flex-col">
          <div className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Button</div>
          <div className="flex-1 border border-slate-200 border-dashed rounded-lg flex items-center justify-center p-6 bg-slate-50/50">
            <div className="flex gap-4 items-center">
              <button className="bg-[#0F172A] text-white font-medium py-2 px-5 rounded-md shadow-sm text-sm">Dark Theme</button>
              <button className="bg-[#ffffff] border border-slate-200 text-slate-700 font-medium py-2 px-5 rounded-md shadow-sm text-sm">Light Outline</button>
            </div>
          </div>
          <div className="mt-4 bg-slate-800 text-slate-300 font-mono text-[10px] p-3 rounded-md">
            &lt;Button variant=&quot;primary&quot; size=&quot;md&quot;&gt;Action&lt;/Button&gt;
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------
// Healthcare Platform Mocks
// --------------------------------------------------------

export function HealthMock01() {
  // Step 1: Appointment List
  return (
    <div className="w-full h-full bg-slate-100 flex flex-col relative overflow-hidden font-sans">
      <ConceptualTag />
      <div className="h-12 bg-[#ffffff] border-b border-slate-200 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-500 rounded-md" />
          <span className="font-bold text-slate-800 text-sm">DrPro · Clinic</span>
        </div>
        <span className="text-[10px] text-slate-500">City Care Clinic, Surat</span>
      </div>

      <div className="p-4 flex-1 overflow-hidden flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-lg font-bold text-slate-800">Appointment(s)</h1>
            <div className="flex gap-3 mt-1 text-[10px] font-semibold">
              <span className="text-slate-800 border-b-2 border-emerald-500 pb-0.5">Today&apos;s <span className="text-emerald-800">18</span></span>
              <span className="text-slate-600">Upcoming 42</span>
              <span className="text-slate-600">Requests 5</span>
            </div>
          </div>
          <button className="bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-md font-medium">Book Appointment</button>
        </div>

        <div className="flex-1 bg-[#ffffff] border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
          {[
            { time: "10:00 AM", name: "Ravi Mehta", type: "Fever, body ache · Dr. N. Shah", status: "Checked in", color: "text-emerald-800 bg-emerald-50" },
            { time: "10:15 AM", name: "Pooja Sharma", type: "Follow-up · Dr. P. Joshi", status: "Waiting", color: "text-amber-800 bg-amber-50" },
            { time: "10:30 AM", name: "Imran Sheikh", type: "Chest pain · Dr. N. Shah", status: "Urgent", color: "text-rose-800 bg-rose-50" },
            { time: "10:45 AM", name: "Sneha Kulkarni", type: "Tele consult · Dr. K. Rao", status: "Online", color: "text-slate-600 bg-slate-50" },
          ].map((patient, i) => (
            <div key={i} className="flex items-center p-3 border-b border-slate-100 hover:bg-slate-50">
              <div className="w-16 text-[10px] font-semibold text-slate-500">{patient.time}</div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-800">{patient.name}</div>
                <div className="text-[10px] text-slate-500">{patient.type}</div>
              </div>
              <div className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", patient.color)}>
                {patient.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HealthMock02() {
  // Step 2: Book Appointment drawer over the list
  const slots = ["10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45"];
  return (
    <div className="w-full h-full bg-slate-800/30 flex justify-end relative overflow-hidden">
      <ConceptualTag />
      <div className="w-[78%] h-full bg-[#ffffff] border-l border-slate-200 shadow-2xl flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <div className="text-sm font-bold text-slate-800">Book Appointment</div>
          <div className="text-[10px] text-slate-500">Please fill out the form to book an appointment</div>
        </div>
        <div className="p-4 flex-1 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Patient</label>
              <div className="border border-slate-200 rounded-md p-2 text-xs text-slate-800 font-medium">Ravi Mehta · UH-20931</div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Doctor</label>
              <div className="border border-slate-200 rounded-md p-2 text-xs text-slate-800 font-medium">Dr. N. Shah</div>
            </div>
          </div>
          <div className="border border-slate-200 rounded-md overflow-hidden">
            <div className="flex gap-4 px-3 py-2 border-b border-slate-200 text-[10px] font-semibold text-slate-500">
              <span className="text-slate-800 border-b-2 border-emerald-500">26 Sat</span><span>27 Sun</span><span>28 Mon</span><span>29 Tue</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 p-2 bg-emerald-50/40">
              {slots.map((t) => (
                <span
                  key={t}
                  className={cn(
                    "text-[10px] text-center py-1 rounded border",
                    t === "11:30" ? "bg-emerald-700 border-emerald-700 text-white font-bold" : t === "10:15" || t === "10:45" ? "border-dashed border-slate-200 text-slate-300 line-through" : "bg-[#ffffff] border-slate-200 text-slate-700"
                  )}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-1.5 text-[10px]">
            {["Critical", "Major", "Moderate", "Low"].map((u) => (
              <span key={u} className={cn("px-2 py-0.5 rounded-full border", u === "Moderate" ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-bold" : "border-slate-200 text-slate-500")}>{u}</span>
            ))}
          </div>
          <div className="mt-auto flex justify-end gap-2">
            <button className="px-3 py-1.5 text-xs font-bold text-slate-500">Cancel</button>
            <button className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 rounded-md">Book Appointment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HealthMock03() {
  // Step 3: IPD pending bills
  return (
    <div className="w-full h-full bg-slate-100 p-4 flex flex-col relative overflow-hidden">
      <ConceptualTag />
      <div className="bg-[#ffffff] rounded-lg shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <div className="text-xs font-bold text-slate-800">IPD Billing</div>
            <div className="flex gap-3 mt-1 text-[10px] font-semibold">
              <span className="text-slate-800 border-b-2 border-emerald-500">Pending Bills</span>
              <span className="text-slate-500">Paid Bills</span>
              <span className="text-slate-500">All Bills</span>
            </div>
          </div>
          <div className="text-[10px] font-bold text-slate-700 bg-[#ffffff] border border-slate-200 px-2 py-1 rounded">Generate Invoice</div>
        </div>

        <div className="flex-1 p-4">
          <div className="w-full border border-slate-200 rounded overflow-hidden">
            <div className="grid grid-cols-12 bg-slate-100 border-b border-slate-200 p-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-4">Patient</div>
              <div className="col-span-3">Ward / Bed</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-3 text-right">Balance</div>
            </div>

            {[
              { name: "Ravi Mehta", ipd: "IPD-1042 · UH-20931", bed: "General · B4", bal: "₹5,922" },
              { name: "Anita Desai", ipd: "IPD-1039 · UH-20877", bed: "ICU · 02", bal: "₹66,400" },
              { name: "Farah Khan", ipd: "IPD-1034 · UH-20790", bed: "General · B1", bal: "₹13,960" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-12 p-2 border-b border-slate-100 text-xs items-center hover:bg-slate-50">
                <div className="col-span-4">
                  <div className="text-slate-800 font-bold truncate">{row.name}</div>
                  <div className="font-mono text-slate-500 text-[10px] truncate">{row.ipd}</div>
                </div>
                <div className="col-span-3 text-slate-600">{row.bed}</div>
                <div className="col-span-2"><span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Pending</span></div>
                <div className="col-span-3 text-right font-mono font-bold text-rose-600">{row.bal}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HealthMock04() {
  // Step 4: Generate invoice
  const lines = [
    { item: "General ward · 4 days", total: "₹10,000" },
    { item: "Ceftriaxone 1g inj. ×8", total: "₹1,480" },
    { item: "CBC + CRP panel", total: "₹950" },
  ];
  return (
    <div className="w-full h-full bg-slate-800/40 p-4 flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
      <ConceptualTag />
      <div className="w-full max-w-sm bg-[#ffffff] rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Generate Invoice</h3>
            <p className="text-[10px] text-slate-500 mt-0.5 font-mono">Ravi Mehta · IPD-1042 · UH-20931</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">Gen · B4</span>
        </div>

        <div className="p-4 space-y-2">
          {lines.map((l) => (
            <div key={l.item} className="flex justify-between text-xs text-slate-700">
              <span>{l.item}</span>
              <span className="font-mono">{l.total}</span>
            </div>
          ))}
          <div className="flex justify-between text-[10px] text-slate-500 border-t border-slate-100 pt-2">
            <span>SGST 6% + CGST 6%</span>
            <span className="font-mono">₹1,492</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-800">
            <span>Total incl. taxes</span>
            <span className="font-mono">₹13,922</span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 pt-3 flex gap-2">
          <button className="flex-1 py-2 text-xs font-bold text-slate-600 bg-[#ffffff] border border-slate-200 rounded-md">
            Download
          </button>
          <button className="flex-1 py-2 text-xs font-bold text-white bg-emerald-700 rounded-md shadow-sm">
            Create &amp; Print
          </button>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------
// Registry
// --------------------------------------------------------
export const MockComponentRegistry: Record<string, React.FC> = {
  "mock:design-system:0": DSMock01,
  "mock:design-system:1": DSMock02,
  "mock:design-system:2": DSMock03,
  "mock:design-system:3": DSMock04,
  "mock:healthcare:0": HealthMock01,
  "mock:healthcare:1": HealthMock02,
  "mock:healthcare:2": HealthMock03,
  "mock:healthcare:3": HealthMock04,
};
