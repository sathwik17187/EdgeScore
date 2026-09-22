import React, { useState } from 'react';
import { 
  Camera, MessageSquare, ShieldCheck, Cpu, Wifi, WifiOff, 
  CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Zap, Lock,
  Sparkles, Send, Trash2, KeyRound
} from 'lucide-react';

const MERCHANT_DATA = {
  sharma_kirana: {
    id: "merchant_delhi_091",
    merchantName: "Sharma General Store & Kirana",
    category: "Retail FMCG & Kirana",
    location: "Chawri Bazar, Old Delhi",
    claimedTurnover: "₹55,000 / month",
    ledger: [
      { customer: "Gupta Ji (Makan #4)", type: "UDHAR", amount: 1420, hindiText: "गुप्ता जी आटा + तेल बाक़ी" },
      { customer: "Cash Galla Counter", type: "JAMA", amount: 4850, hindiText: "नक़द गल्ला रोकड़ जमा" },
      { customer: "Sharma Dudh Dairy", type: "SUPPLIER_PAY", amount: 3200, hindiText: "दूध वाले का भुगतान" },
      { customer: "Raju Chaiwala", type: "UDHAR", amount: 580, hindiText: "राजू चाय पत्ती + चीनी उधार" },
      { customer: "Mishra Tailor", type: "JAMA", amount: 1200, hindiText: "मिश्रा जी पुराना हिसाब जमा" }
    ],
    smsList: [
      { sender: "VK-HDFCBK", body: "Dear HDFC Bank User, A/C *4012 is credited with Rs.450.00 on 01-Sep-26 by UPI/SunilKumar." },
      { sender: "AD-SBIINB", body: "Rs 1,200.00 credited to SBI A/C ...8821 on 01-09-2026 by UPI (UPI/MishraJi)." },
      { sender: "PAYTM-ALERTS", body: "Paytm Business: ₹4,850 received in QR Soundbox on 01 Sep. 42 transactions settled." },
      { sender: "PHONEPE-ALERT", body: "PhonePe SmartSpeaker: ₹5,120 received across 38 UPI payments today." }
    ]
  },
  raju_chai: {
    id: "merchant_blr_042",
    merchantName: "Raju Tea & Quick Snacks",
    category: "Street Food & Beverage",
    location: "Koramangala, Bengaluru",
    claimedTurnover: "₹38,000 / month",
    ledger: [
      { customer: "Startup Techies Khata", type: "UDHAR", amount: 350, hindiText: "ऑफिस चाय नाश्ता बाक़ी" },
      { customer: "Daily Galla Counter", type: "JAMA", amount: 2400, hindiText: "नक़द गल्ला बिक्री" },
      { customer: "Nandini Milk Depot", type: "SUPPLIER_PAY", amount: 1150, hindiText: "दूध का भुगतान" },
      { customer: "Daily Galla Counter", type: "JAMA", amount: 2850, hindiText: "रोज़ की बिक्री" }
    ],
    smsList: [
      { sender: "GPAY-BUSINESS", body: "Google Pay for Business: ₹2,400.00 received today from 56 customer QR scans." },
      { sender: "AXIS-ALERT", body: "INR 1,150.00 debited from A/C XX9932 to NANDINI MILK DEPOT via UPI." },
      { sender: "GPAY-BUSINESS", body: "Google Pay for Business: ₹2,850.00 received today from 68 customer QR scans." }
    ]
  }
};

export default function MobileDevice({ onProofSubmitted }) {
  const [selectedKey, setSelectedKey] = useState('sharma_kirana');
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [step, setStep] = useState(1); // 1: Ingestion, 2: Camera, 3: SMS, 4: Score, 5: TEE Sign, 6: Loan
  
  const [isScanning, setIsScanning] = useState(false);
  const [isParsingSms, setIsParsingSms] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [memoryPurged, setMemoryPurged] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const merchant = MERCHANT_DATADATA || MERCHANT_DATA[selectedKey];

  const handleSelectMerchant = (key) => {
    setSelectedKey(key);
    setStep(1);
    setMemoryPurged(false);
    setIsSubmitted(false);
  };

  const handleScanLedger = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setStep(3);
    }, 1200);
  };

  const handleParseSms = () => {
    setIsParsingSms(true);
    setTimeout(() => {
      setIsParsingSms(false);
      setStep(4);
    }, 1100);
  };

  const handleSignKeystore = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setMemoryPurged(true);
      setStep(6);
    }, 1300);
  };

  const handleTransmit = async () => {
    if (airplaneMode) {
      alert("Turn off Airplane Mode to transmit proof to the lender!");
      return;
    }

    const payload = {
      id: `proof_${Date.now()}`,
      merchantName: merchant.merchantName,
      verification: {
        isValid: true,
        issuerDid: `did:edgescore:iqoo-tee-${Math.random().toString(36).substring(2, 8)}`,
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
        tenureMonths: 3,
        totalRepayableINR: 38500,
        dailyMicroDebitINR: 389,
        riskCategory: "TIER_1_PRIME_MICRO",
        sanctionToken: `SANCTION_OCEN4_${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      }
    };

    setIsSubmitted(true);
    if (onProofSubmitted) {
      onProofSubmitted(payload);
    }
  };

  return (
    <div className="phone-mockup flex flex-col bg-slate-950 text-slate-100 select-none shadow-2xl relative">
      
      {/* Top Status & Airplane Mode */}
      <div className="px-5 py-2.5 flex items-center justify-between text-xs text-slate-400 font-mono border-b border-slate-800/80 bg-slate-950/90 z-20">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-300">09:41</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/50">iQOO NPU</span>
        </div>

        <button 
          onClick={() => setAirplaneMode(!airplaneMode)}
          className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
            airplaneMode 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' 
              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
          }`}
        >
          {airplaneMode ? <WifiOff className="w-3 h-3 text-amber-400" /> : <Wifi className="w-3 h-3 text-emerald-400" />}
          <span>{airplaneMode ? 'Airplane ON (Offline)' : 'Online'}</span>
        </button>
      </div>

      {/* Header */}
      <div className="px-4 py-2.5 bg-gradient-to-r from-slate-900 to-indigo-950 border-b border-indigo-900/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xs font-bold tracking-tight text-white flex items-center gap-1">
              EdgeScore <span className="text-[9px] font-mono text-indigo-300 bg-indigo-900/60 px-1 rounded">OCEN 4.0</span>
            </h1>
            <p className="text-[9px] text-indigo-300/80">Zero-Knowledge Borrower Client</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
          <Lock className="w-2.5 h-2.5" />
          <span>TEE Protected</span>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs">
        
        {/* Step 1: Merchant Selection */}
        {step === 1 && (
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-slate-200">1. Select Merchant Profile</span>

            {Object.entries(MERCHANT_DATA).map(([k, item]) => (
              <div
                key={k}
                onClick={() => handleSelectMerchant(k)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedKey === k ? 'bg-indigo-950/60 border-indigo-500' : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-white">{item.merchantName}</div>
                  <div className="text-[10px] text-slate-400">{item.category} • {item.location}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5">Est. Turnover: {item.claimedTurnover}</div>
                </div>
                {selectedKey === k && <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />}
              </div>
            ))}

            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>DPDP Act 2023 Shield</span>
              </div>
              <p className="text-[10px] text-emerald-400/80 leading-relaxed">
                Your SMS & paper ledger are parsed 100% inside your phone's NPU. Zero raw bytes leave the device.
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <span>Scan Bahi-Khata Ledger 📸</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Camera Scanner */}
        {step === 2 && (
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-slate-200">2. Bahi-Khata Camera Scanner</span>

            <div className="p-3 rounded-xl bahi-khata-sheet text-slate-900 space-y-2">
              <div className="text-center font-bold text-xs text-red-950 border-b border-amber-900/30 pb-1">
                दैनिक बिक्री एवं उधारी रजिस्टर (Bahi-Khata)
              </div>
              <div className="space-y-1 text-[9px] font-mono">
                {merchant.ledger.map((e, idx) => (
                  <div key={idx} className="flex justify-between border-b border-amber-800/10 py-0.5">
                    <span>{e.customer}</span>
                    <span className="font-bold text-emerald-800">{e.type === 'JAMA' ? `₹${e.amount}` : '-'}</span>
                    <span className="font-bold text-red-700">{e.type === 'UDHAR' ? `₹${e.amount}` : '-'}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={isScanning}
              onClick={handleScanLedger}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Extracting Handwritten Digits...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Scan & Parse Ledger Sheet</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 3: SMS Ingestion */}
        {step === 3 && (
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-slate-200">3. Local SMS Bank Ingestion</span>

            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {merchant.smsList.map((sms, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[9.5px] font-mono space-y-0.5">
                  <div className="text-indigo-400 font-bold">{sms.sender}</div>
                  <div className="text-slate-300">{sms.body}</div>
                </div>
              ))}
            </div>

            <button
              disabled={isParsingSms}
              onClick={handleParseSms}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              {isParsingSms ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Reconciling Ledger vs SMS...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Cross-Reconcile on NPU</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 4: Synthetic Credit Score */}
        {step === 4 && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/40 text-center space-y-1">
              <span className="text-[10px] font-bold uppercase text-indigo-400">Synthetic Credit Score</span>
              <div className="text-4xl font-extrabold text-white font-mono">782 <span className="text-xs text-slate-500">/ 900</span></div>
              <div className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold bg-indigo-900 text-indigo-200">
                TIER_1_PRIME_MICRO
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400">Est. Monthly Turnover</div>
                <div className="text-xs font-bold text-white font-mono">₹48,500</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400">Cash vs UPI Split</div>
                <div className="text-xs font-bold text-emerald-400 font-mono">38% Cash : 62% UPI</div>
              </div>
            </div>

            <button
              onClick={() => setStep(5)}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <span>Sign with StrongBox TEE 🔐</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 5: Keystore Signing */}
        {step === 5 && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-indigo-500/40 space-y-2">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                <KeyRound className="w-4 h-4 text-indigo-400" />
                <span>Android Keystore StrongBox Enclave</span>
              </div>
              <div className="p-2 rounded bg-slate-950 text-[9px] font-mono space-y-1 text-slate-400">
                <div>Curve: <span className="text-indigo-300">secp256r1 (P-256)</span></div>
                <div>Hardware Level: <span className="text-emerald-400">STRONGBOX_TEE</span></div>
                <div>Ephemeral RAM: <span className="text-amber-300">Overwritten → 0x00</span></div>
              </div>
            </div>

            <button
              disabled={isMinting}
              onClick={handleSignKeystore}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
            >
              {isMinting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Signing in TEE & Purging Memory...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign Credential & Wipe Raw Data</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 6: Loan Card */}
        {step === 6 && (
          <div className="space-y-3">
            {memoryPurged && (
              <div className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-600/50 flex items-center justify-between text-[9px] text-emerald-300">
                <span className="flex items-center gap-1 font-semibold">
                  <Trash2 className="w-3 h-3 text-emerald-400" />
                  Raw Data Purged from RAM
                </span>
                <span className="font-mono font-bold">0 Bytes Leaked</span>
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-slate-900 border border-indigo-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Pre-Approved Working Capital</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                  Instant Sanction
                </span>
              </div>

              <div className="text-xl font-extrabold text-white font-mono">₹35,000</div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800 text-[9px] font-mono">
                <div>Daily Debit: <strong className="text-slate-200">₹389 / day</strong></div>
                <div>Tenure: <strong className="text-emerald-400">90 Days</strong></div>
              </div>
            </div>

            {isSubmitted ? (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-center space-y-1 text-emerald-300">
                <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-400" />
                <div className="font-bold text-xs">Proof Transmitted to OCEN 4.0!</div>
                <div className="text-[9.5px] text-emerald-400/80">Check the Lender Portal to disburse funds</div>
              </div>
            ) : (
              <button
                onClick={handleTransmit}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Proof to OCEN 4.0 🚀</span>
              </button>
            )}

            <button
              onClick={() => handleSelectMerchant(selectedKey)}
              className="w-full py-1.5 text-center text-[10px] text-slate-400 hover:text-slate-200"
            >
              ↺ Reset Flow
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

const MERCHANT_DATADATA = null;
