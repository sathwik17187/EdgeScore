import React, { useState } from 'react';
import { FileText, Printer, BookOpen, Award } from 'lucide-react';

export default function PrintableDemoKit() {
  return (
    <div className="flex-1 flex flex-col space-y-4 font-sans text-slate-100 overflow-y-auto pr-1">
      
      {/* Header */}
      <div className="p-4 rounded-2xl glass-panel border border-indigo-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Physical Bahi-Khata Demo Kit & Pitch Guide</h2>
            <p className="text-xs text-slate-400">Authentic Hindi/English handwritten ledger sheets for physical table judging</p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700"
        >
          <Printer className="w-4 h-4" />
          <span>Print Ledger Sheet</span>
        </button>
      </div>

      {/* Grid: Ledger Sheet & Pitch Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Ledger Sheet (7 cols) */}
        <div className="lg:col-span-7 space-y-2">
          <div className="bahi-khata-sheet p-6 rounded-2xl shadow-2xl space-y-4 text-slate-900 border-2 border-[#cbb998]">
            <div className="text-center border-b-2 border-red-800/40 pb-2 space-y-0.5">
              <div className="text-red-700 font-bold text-xs tracking-widest uppercase">|| श्री गणेशाय नमः ||</div>
              <h3 className="text-lg font-bold text-red-950">Sharma General Store & Kirana</h3>
              <p className="text-xs text-amber-950">Chawri Bazar, Old Delhi • फोन: +91 98765 43210</p>
            </div>

            <div className="space-y-1 text-xs font-mono">
              <div className="grid grid-cols-12 gap-2 font-bold text-red-900 border-b border-red-900/40 pb-1">
                <span className="col-span-6">ग्राहक नाम व विवरण</span>
                <span className="col-span-3 text-right">जमा (Cash In)</span>
                <span className="col-span-3 text-right">उधार (Credit)</span>
              </div>
              <div className="grid grid-cols-12 gap-2 py-1 border-b border-amber-900/10">
                <span className="col-span-6">Gupta Ji (आटा + तेल)</span>
                <span className="col-span-3 text-right text-emerald-800 font-bold">-</span>
                <span className="col-span-3 text-right text-red-700 font-bold">₹1,420</span>
              </div>
              <div className="grid grid-cols-12 gap-2 py-1 border-b border-amber-900/10">
                <span className="col-span-6">नक़द गल्ला रोकड़ बिक्री</span>
                <span className="col-span-3 text-right text-emerald-800 font-bold">₹4,850</span>
                <span className="col-span-3 text-right text-red-700 font-bold">-</span>
              </div>
              <div className="grid grid-cols-12 gap-2 py-1 border-b border-amber-900/10">
                <span className="col-span-6">Sharma Dudh Dairy (दूध भुगतान)</span>
                <span className="col-span-3 text-right text-emerald-800 font-bold">₹3,200</span>
                <span className="col-span-3 text-right text-red-700 font-bold">-</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pitch Guide (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-2.5 text-xs">
            <div className="flex items-center gap-2 font-bold text-indigo-300">
              <Award className="w-4 h-4 text-indigo-400" />
              <span>3-Minute Live Judging Pitch Script</span>
            </div>
            <div className="space-y-2 text-slate-300">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <strong className="text-indigo-400 block mb-0.5">1. The Problem (0:00 - 0:45)</strong>
                <span>100M informal micro-merchants lack GSTIN/CIBIL. Lenders need their SMS and Bahi-Khata data, but uploading raw data violates the DPDP Act 2023.</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <strong className="text-amber-400 block mb-0.5">2. The Offline Proof (0:45 - 1:45)</strong>
                <span>In Airplane Mode, the on-device NPU SLM audits the ledger and SMS receipts in &lt;2 seconds with zero cloud uploads.</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <strong className="text-emerald-400 block mb-0.5">3. The Instant Loan (1:45 - 3:00)</strong>
                <span>The phone's StrongBox TEE signs a W3C credential. The lender verifies the proof and disburses ₹35,000 via UPI instantly.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
