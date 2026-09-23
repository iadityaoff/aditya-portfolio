import * as React from "react";
import { cn } from "@/lib/utils";

// --------------------------------------------------------
// Conceptual Tag (Honest Disclosure per user rule)
// --------------------------------------------------------
function ConceptualTag() {
  return (
    <div className="absolute top-4 right-4 z-50 pointer-events-none">
      <span className="bg-surface/80 backdrop-blur-md border border-line text-muted font-mono text-[9px] uppercase font-bold tracking-widest px-2 py-1 rounded shadow-sm">
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

      <div className="flex-1 border border-slate-200 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
        <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider p-3">
          <div>Semantic Token</div>
          <div>Primitive Ref</div>
          <div>Visual</div>
        </div>
        
        {[
          { sem: "bg-surface-interactive", prim: "blue-500", color: "bg-blue-500" },
          { sem: "bg-surface-hover", prim: "blue-600", color: "bg-blue-600" },
          { sem: "text-on-interactive", prim: "white", color: "bg-white border border-slate-200" },
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
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg border border-slate-200 relative">
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
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden border border-slate-200">
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
        <div className="w-2/3 p-6 bg-white flex flex-col">
          <div className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Button</div>
          <div className="flex-1 border border-slate-200 border-dashed rounded-lg flex items-center justify-center p-6 bg-slate-50/50">
            <div className="flex gap-4 items-center">
              <button className="bg-[#0F172A] text-white font-medium py-2 px-5 rounded-md shadow-sm text-sm">Dark Theme</button>
              <button className="bg-white border border-slate-200 text-slate-700 font-medium py-2 px-5 rounded-md shadow-sm text-sm">Light Outline</button>
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
  // Step 1: Patient Dashboard
  return (
    <div className="w-full h-full bg-[#F1F5F9] flex flex-col relative overflow-hidden font-sans">
      <ConceptualTag />
      <div className="h-12 bg-white border-b border-slate-200 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-500 rounded-md" />
          <span className="font-bold text-slate-800 text-sm">DrPro Care</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-slate-200" />
      </div>
      
      <div className="p-4 flex-1 overflow-hidden flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-lg font-bold text-slate-800">Queue</h1>
            <p className="text-xs text-slate-500">Tuesday, Oct 24 • 14 Patients</p>
          </div>
          <button className="bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-md font-medium">Refresh</button>
        </div>

        <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
          {[
            { time: "09:00 AM", name: "Eleanor Rigby", type: "Follow-up", status: "Waiting", color: "text-amber-600 bg-amber-50" },
            { time: "09:30 AM", name: "Jude Lawson", type: "Consultation", status: "In Session", color: "text-emerald-600 bg-emerald-50" },
            { time: "10:00 AM", name: "Penny Lane", type: "Review", status: "Scheduled", color: "text-slate-600 bg-slate-50" },
          ].map((patient, i) => (
            <div key={i} className="flex items-center p-3 border-b border-slate-100 hover:bg-slate-50">
              <div className="w-16 text-[10px] font-semibold text-slate-500">{patient.time}</div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-800">{patient.name}</div>
                <div className="text-[10px] text-slate-500">{patient.type}</div>
              </div>
              <div className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full", patient.color)}>
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
  // Step 2: Medical Record Entry (Dense Form)
  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden">
      <ConceptualTag />
      {/* Sticky Context Header */}
      <div className="bg-slate-800 text-white p-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-600 border border-slate-500" />
          <div>
            <div className="text-xs font-bold flex items-center gap-2">
              Jude Lawson <span className="bg-blue-500 text-[8px] px-1.5 py-0.5 rounded">Male, 34</span>
            </div>
            <div className="text-[10px] text-slate-300 font-mono">UHID: 994-203-11A</div>
          </div>
        </div>
        <div className="text-[9px] font-bold text-emerald-400 border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 rounded">
          Insurance Active
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-4">
        <div className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2">Clinical Notes</div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Symptoms</label>
            <div className="h-16 w-full border border-slate-200 rounded-md bg-slate-50 p-2 text-xs text-slate-700">
              Mild fever, persistent cough for 3 days.
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Diagnosis (ICD-10)</label>
            <div className="w-full border border-emerald-300 rounded-md bg-emerald-50 p-2 text-xs text-emerald-800 flex items-center justify-between">
              <span>J06.9 - Acute upper respiratory...</span>
              <div className="w-3 h-3 rounded-full bg-emerald-200" />
            </div>
          </div>
        </div>

        <div className="space-y-1 mt-2">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Prescriptions</label>
          <div className="w-full border border-slate-200 rounded-md divide-y divide-slate-100">
            <div className="p-2 text-xs flex justify-between items-center">
              <div><span className="font-bold text-slate-700">Amoxicillin</span> <span className="text-slate-500">500mg</span></div>
              <div className="text-slate-400 text-[10px]">1x Daily</div>
            </div>
            <div className="p-2 text-xs flex justify-between items-center bg-slate-50">
              <span className="text-slate-400 italic">Add medication +</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HealthMock03() {
  // Step 3: Billing Generation (Draft Invoice)
  return (
    <div className="w-full h-full bg-[#F1F5F9] p-4 flex flex-col relative overflow-hidden">
      <ConceptualTag />
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <div className="text-xs font-bold text-slate-800">Draft Invoice #INV-0092</div>
            <div className="text-[10px] text-slate-500">Generated from Clinical Encounter</div>
          </div>
          <div className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded">Pending Review</div>
        </div>
        
        <div className="flex-1 p-4">
          <div className="w-full border border-slate-200 rounded overflow-hidden">
            <div className="grid grid-cols-12 bg-slate-100 border-b border-slate-200 p-2 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-2">Code</div>
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-right">Qty</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {[
              { code: "99213", desc: "Outpatient Visit, Level 3", qty: 1, total: "$120.00" },
              { code: "J06.9", desc: "Respiratory Dx Bundle", qty: 1, total: "$45.00" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-12 p-2 border-b border-slate-100 text-xs items-center hover:bg-slate-50">
                <div className="col-span-2 font-mono text-slate-500 text-[10px]">{row.code}</div>
                <div className="col-span-6 text-slate-700 font-medium truncate pr-2">{row.desc}</div>
                <div className="col-span-2 text-right text-slate-500">{row.qty}</div>
                <div className="col-span-2 text-right font-mono font-medium text-slate-800">{row.total}</div>
              </div>
            ))}
            
            <div className="grid grid-cols-12 p-2 bg-emerald-50 text-xs items-center">
              <div className="col-span-8 text-right font-bold text-emerald-800 text-[10px] uppercase">Insurance Coverage (80%)</div>
              <div className="col-span-4 text-right font-mono font-bold text-emerald-700">-$132.00</div>
            </div>
            <div className="grid grid-cols-12 p-3 bg-slate-800 text-white text-xs items-center">
              <div className="col-span-8 text-right font-bold text-[10px] uppercase tracking-wider">Patient Responsibility</div>
              <div className="col-span-4 text-right font-mono font-bold text-base">$33.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HealthMock04() {
  // Step 4: Action & Sign-off
  return (
    <div className="w-full h-full bg-slate-800/40 p-4 flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
      <ConceptualTag />
      <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        <div className="p-5 border-b border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-slate-800">Ready to Submit Claim</h3>
          <p className="text-xs text-slate-500 mt-1">Invoice INV-0092 has been verified against clinical notes.</p>
        </div>
        
        <div className="bg-slate-50 p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-600 bg-white p-2 border border-slate-200 rounded">
            <input type="checkbox" checked readOnly className="rounded border-slate-300 text-emerald-500" />
            <span>Attending Physician Signed Off</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 bg-white p-2 border border-slate-200 rounded">
            <input type="checkbox" checked readOnly className="rounded border-slate-300 text-emerald-500" />
            <span>ICD-10 Codes Validated</span>
          </div>
          
          <div className="pt-2 flex gap-2">
            <button className="flex-1 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50">
              Edit Invoice
            </button>
            <button className="flex-1 py-2 text-xs font-bold text-white bg-emerald-500 rounded-md hover:bg-emerald-600 shadow-sm flex justify-center items-center gap-1.5">
              Submit to Payor
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
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
