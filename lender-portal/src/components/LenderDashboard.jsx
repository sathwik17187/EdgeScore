import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, CheckCircle2, DollarSign, Activity, 
  KeyRound, Cpu, Landmark, Zap, Lock
} from 'lucide-react';

export default function LenderDashboard({ externalLatestProof }) {
  const [proofs, setProofs] = useState([
    {
      id: "proof_init_01",
      merchantName: "Sharma General Store & Kirana",
      verification: {
        isValid: true,
        issuerDid: "did:edgescore:iqoo-tee-9918a204",
        hardwareLevel: "STRONGBOX_TEE",
        verifiedMetrics: {
          edgeScore: 782,
          underwritingTier: "TIER_1_PRIME_MICRO",
          maxPreApprovedLimitINR: 35000,
          monthlyEstimatedTurnoverINR: 48500,
          cashToDigitalRatio: "38% Cash : 62% UPI",
          reconciliationConsistency: "94%"
        }
      },
      sanction: {
        sanctionDecision: "INSTANT_APPROVED",
        sanctionedAmountINR: 35000,
        dailyMicroDebitINR: 389,
        riskCategory: "TIER_1_PRIME_MICRO",
        totalRepayableINR: 38500,
        sanctionToken: "SANCTION_OCEN4_BAJAJ_9941"
      }
    }
  ]);

  const [selectedProof, setSelectedProof] = useState(proofs[0]);
  const [disbursed, setDisbursed] = useState(false);

  // Sync if new proof passed from mobile simulator
  React.useEffect(() => {
    if (externalLatestProof) {
      setProofs(prev => [externalLatestProof, ...prev]);
      setSelectedProof(externalLatestProof);
      setDisbursed(false);
    }
  }, [externalLatestProof]);

  return (
    <div className="flex-1 flex flex-col h-full space-y-4 font-sans text-slate-100 overflow-y-auto pr-1">
      
      {/* Top Banner */}
      <div className="p-4 rounded-2xl glass-panel-glow border border-indigo-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              OCEN 4.0 Lender Gateway & Underwriting Console
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                Agentic Oracle Live
              </span>
            </h2>
            <p className="text-xs text-slate-400">Zero-Knowledge Financial Information User (FIU) Terminal</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="px-3 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 font-bold">
            DPDP Shield: 100% Active (0 Bytes Leaked)
          </div>
        </div>
      </div>

      {/* Main Grid: Stream on Left, Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left: Proof Stream (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-indigo-400" />
              Incoming Proof Stream
            </span>
            <span className="text-[11px] font-mono text-slate-500">{proofs.length} Proofs</span>
          </div>

          <div className="space-y-2">
            {proofs.map((p) => (
              <div
                key={p.id}
                onClick={() => { setSelectedProof(p); setDisbursed(false); }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedProof?.id === p.id 
                    ? 'bg-indigo-950/70 border-indigo-500' 
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="font-bold text-xs text-white">{p.merchantName}</div>
                    <div className="text-[10px] text-slate-400 font-mono truncate max-w-[180px]">
                      {p.verification.issuerDid}
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Score {p.verification.verifiedMetrics.edgeScore}
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/80">
                  <span className="text-indigo-300 font-semibold">{p.sanction.riskCategory}</span>
                  <span className="text-emerald-400 font-mono font-bold">₹{p.sanction.sanctionedAmountINR.toLocaleString()} Approved</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Deep Inspector (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {selectedProof && (
            <div className="space-y-4">
              
              {/* Cryptographic Verification Card */}
              <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                    <KeyRound className="w-4 h-4 text-emerald-400" />
                    <span>Cryptographic Proof Verification Details</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ECDSA Signature Valid (P-256)</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Hardware Security</span>
                    <span className="font-bold text-indigo-300">{selectedProof.verification.hardwareLevel}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">DPDP Data Leakage</span>
                    <span className="font-bold text-emerald-400">0.00 Bytes (ZK Proof)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Inference Engine</span>
                    <span className="font-bold text-slate-200">iQOO NPU Local SLM</span>
                  </div>
                </div>
              </div>

              {/* Loan Sanction & Disbursement Card */}
              <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                    <DollarSign className="w-4 h-4 text-indigo-400" />
                    <span>Underwriting & Sanction Agreement (OCEN 4.0)</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                    {selectedProof.sanction.sanctionToken}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Sanctioned Amount</div>
                    <div className="text-lg font-bold text-white font-mono">
                      ₹{selectedProof.sanction.sanctionedAmountINR.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Daily Micro-Debit</div>
                    <div className="text-xs font-bold text-emerald-400 font-mono">
                      ₹{selectedProof.sanction.dailyMicroDebitINR}/day (90 days)
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Co-Lender Pool</div>
                    <div className="text-xs font-bold text-indigo-300 font-mono">
                      Bajaj Finserv (Pool A)
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    Disbursement Channel: <strong className="text-slate-200">UPI Instant IMPS Settlement</strong>
                  </div>

                  {disbursed ? (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-600 px-3 py-2 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Disbursed via UPI (UTR: 624910294821)</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDisbursed(true)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Execute 1-Click Instant Disbursement</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
