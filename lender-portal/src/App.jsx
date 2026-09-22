import React, { useState, useEffect } from 'react';
import { 
  Building2, ShieldCheck, CheckCircle2, DollarSign, Activity, 
  KeyRound, Cpu, Landmark, Zap, Lock, BookOpen, Printer, Award,
  RefreshCw, Check, ArrowUpRight
} from 'lucide-react';

export default function App() {
  const [proofs, setProofs] = useState([
    {
      id: "proof_9918",
      merchantName: "Sharma General Store & Kirana",
      location: "Chawri Bazar, Old Delhi",
      category: "Grocery FMCG",
      timestamp: "Just now",
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
          reconciliationConsistency: "94%",
          supplierDiscipline: "94%"
        }
      },
      sanction: {
        sanctionDecision: "INSTANT_APPROVED",
        sanctionedAmountINR: 35000,
        dailyMicroDebitINR: 389,
        riskCategory: "TIER_1_PRIME_MICRO",
        totalRepayableINR: 38500,
        tenureDays: 90,
        interestMonthly: "0.99%",
        sanctionToken: "SANCTION_OCEN4_BAJAJ_9941"
      }
    },
    {
      id: "proof_4021",
      merchantName: "Raju Tea & Quick Snacks",
      location: "Koramangala, Bengaluru",
      category: "Food & Beverage",
      timestamp: "2 mins ago",
      verification: {
        isValid: true,
        issuerDid: "did:edgescore:iqoo-tee-4021b8f1",
        hardwareLevel: "STRONGBOX_TEE",
        verifiedMetrics: {
          edgeScore: 810,
          underwritingTier: "TIER_1_PRIME_MICRO",
          maxPreApprovedLimitINR: 25000,
          monthlyEstimatedTurnoverINR: 36200,
          cashToDigitalRatio: "25% Cash : 75% UPI",
          reconciliationConsistency: "91%",
          supplierDiscipline: "96%"
        }
      },
      sanction: {
        sanctionDecision: "INSTANT_APPROVED",
        sanctionedAmountINR: 25000,
        dailyMicroDebitINR: 278,
        riskCategory: "TIER_1_PRIME_MICRO",
        totalRepayableINR: 27250,
        tenureDays: 90,
        interestMonthly: "0.99%",
        sanctionToken: "SANCTION_OCEN4_TATA_4021"
      }
    }
  ]);

  const [selectedProof, setSelectedProof] = useState(proofs[0]);
  const [disbursing, setDisbursing] = useState(false);
  const [disbursedProofIds, setDisbursedProofIds] = useState(new Set());
  const [activeTab, setActiveTab] = useState('CONSOLE'); // 'CONSOLE' or 'DEMO_KIT'

  // Connect to Backend WebSocket for live incoming proofs
  useEffect(() => {
    let ws;
    try {
      ws = new WebSocket('ws://localhost:5005');
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'NEW_PROOF_RECEIVED') {
            setProofs(prev => [data.payload, ...prev]);
            setSelectedProof(data.payload);
          }
        } catch (e) {}
      };
    } catch (e) {}
    return () => { if (ws) ws.close(); };
  }, []);

  const handleDisburse = () => {
    if (!selectedProof) return;
    setDisbursing(true);
    setTimeout(() => {
      setDisbursing(false);
      setDisbursedProofIds(prev => new Set(prev).add(selectedProof.id));
    }, 900);
  };

  const isCurrentDisbursed = selectedProof && disbursedProofIds.has(selectedProof.id);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070b14', color: '#f1f5f9', fontFamily: 'sans-serif' }}>
      
      {/* Top Navbar */}
      <header style={{
        height: '64px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        backgroundColor: '#0a0f1d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            backgroundColor: '#059669', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '20px', color: '#fff'
          }}>
            🏦
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>OCEN 4.0 Lender Gateway</span>
              <span style={{
                fontSize: '10px', fontFamily: 'monospace', backgroundColor: '#064e3b',
                color: '#6ee7b7', padding: '2px 8px', borderRadius: '4px', border: '1px solid #059669'
              }}>
                Underwriting Console
              </span>
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Zero-Knowledge Financial Information User (FIU) Terminal</span>
          </div>
        </div>

        {/* Action Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setActiveTab('CONSOLE')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none',
              backgroundColor: activeTab === 'CONSOLE' ? '#059669' : '#1e293b',
              color: '#fff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            📊 Live Underwriting Console
          </button>

          <button
            onClick={() => setActiveTab('DEMO_KIT')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none',
              backgroundColor: activeTab === 'DEMO_KIT' ? '#d97706' : '#1e293b',
              color: '#fff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            📜 Bahi-Khata Demo Kit & Script
          </button>

          <div style={{
            backgroundColor: 'rgba(0, 230, 118, 0.1)', border: '1px solid rgba(0, 230, 118, 0.3)',
            padding: '5px 10px', borderRadius: '8px', color: '#34d399', fontSize: '11px', fontWeight: 'bold'
          }}>
            🛡️ DPDP 2023 Shield: 0 Bytes Leaked
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1300px', margin: '0 auto', padding: '24px 16px' }}>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: LIVE UNDERWRITING CONSOLE                              */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'CONSOLE' && (
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '20px', alignItems: 'start' }}>
            
            {/* Left Column: Proof Stream */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#cbd5e1' }}>Incoming Cryptographic Proofs</span>
                <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#64748b' }}>{proofs.length} Received</span>
              </div>

              {proofs.map((p) => {
                const isSelected = selectedProof?.id === p.id;
                const isDisbursed = disbursedProofIds.has(p.id);

                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProof(p)}
                    style={{
                      backgroundColor: isSelected ? 'rgba(5, 150, 105, 0.15)' : '#0f172a',
                      borderColor: isSelected ? '#059669' : '#1e293b',
                      borderWidth: '1.5px', borderStyle: 'solid',
                      borderRadius: '14px', padding: '14px', cursor: 'pointer',
                      display: 'flex', flexDirection: 'column', gap: '8px',
                      boxShadow: isSelected ? '0 0 15px rgba(5, 150, 105, 0.2)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#fff' }}>{p.merchantName}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{p.category} • {p.location}</div>
                      </div>
                      <span style={{
                        backgroundColor: '#064e3b', color: '#6ee7b7',
                        padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace'
                      }}>
                        Score {p.verification.verifiedMetrics.edgeScore}
                      </span>
                    </div>

                    <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>
                      {p.verification.issuerDid}
                    </div>

                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      paddingTop: '6px', borderTop: '1px solid #1e293b', fontSize: '11px'
                    }}>
                      <span style={{ color: '#a5b4fc', fontWeight: 'bold' }}>₹{p.sanction.sanctionedAmountINR.toLocaleString()} Limit</span>
                      {isDisbursed ? (
                        <span style={{ color: '#34d399', fontWeight: 'bold' }}>✓ Disbursed (UPI)</span>
                      ) : (
                        <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>● Ready to Disburse</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Deep Inspector & Instant Disburse */}
            {selectedProof && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* 1. Cryptographic Proof Verification Card */}
                <div style={{
                  backgroundColor: '#0f172a', border: '1px solid #1e293b',
                  borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <KeyRound style={{ width: '16px', height: '16px', color: '#34d399' }} />
                      <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#fff' }}>W3C Cryptographic Proof Verification</span>
                    </div>
                    <span style={{
                      backgroundColor: 'rgba(0,230,118,0.15)', color: '#34d399',
                      border: '1px solid #059669', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold'
                    }}>
                      ✓ ECDSA Signature Valid (P-256)
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontFamily: 'monospace', fontSize: '11px' }}>
                    <div style={{ backgroundColor: '#020617', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ color: '#64748b', fontSize: '10px' }}>Hardware Enclave</div>
                      <strong style={{ color: '#818cf8' }}>{selectedProof.verification.hardwareLevel}</strong>
                    </div>
                    <div style={{ backgroundColor: '#020617', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ color: '#64748b', fontSize: '10px' }}>Raw Data Leakage</div>
                      <strong style={{ color: '#34d399' }}>0.00 Bytes (ZK Proof)</strong>
                    </div>
                    <div style={{ backgroundColor: '#020617', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ color: '#64748b', fontSize: '10px' }}>Boot Attestation</div>
                      <strong style={{ color: '#fff' }}>GREEN_SECURE</strong>
                    </div>
                  </div>

                  {/* Privacy Comparison */}
                  <div style={{ backgroundColor: '#020617', padding: '12px', borderRadius: '10px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ color: '#94a3b8', fontWeight: 'bold', fontSize: '10px' }}>PRIVACY DIFFERENTIAL (DPDP ACT 2023):</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399' }}>
                      <span>● EdgeScore (On-Device Local SLM):</span>
                      <strong>0 Bytes Shared (Pure ZK Proof)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f87171' }}>
                      <span>● Legacy Account Aggregator / Cloud OCR:</span>
                      <strong>~14.8 MB (Raw SMS dumps & Paper Ledger photos)</strong>
                    </div>
                  </div>
                </div>

                {/* 2. Sanction Agreement & 1-Click Disburse */}
                <div style={{
                  backgroundColor: '#0f172a', border: '1px solid #1e293b',
                  borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <DollarSign style={{ width: '18px', height: '18px', color: '#4f46e5' }} />
                      <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>Pre-Approved Working Capital Facility</span>
                    </div>
                    <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#818cf8', backgroundColor: '#1e1b4b', padding: '2px 8px', borderRadius: '6px' }}>
                      {selectedProof.sanction.sanctionToken}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    <div style={{ backgroundColor: '#020617', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ color: '#64748b', fontSize: '10px' }}>Sanction Limit</div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', fontFamily: 'monospace' }}>
                        ₹{selectedProof.sanction.sanctionedAmountINR.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#020617', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ color: '#64748b', fontSize: '10px' }}>Daily Micro-Debit</div>
                      <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#34d399', fontFamily: 'monospace' }}>
                        ₹{selectedProof.sanction.dailyMicroDebitINR} / day
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#020617', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ color: '#64748b', fontSize: '10px' }}>Tenure & Rate</div>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#cbd5e1' }}>
                        90 Days @ {selectedProof.sanction.interestMonthly}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#020617', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ color: '#64748b', fontSize: '10px' }}>Co-Lender</div>
                      <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#a5b4fc' }}>
                        Bajaj Finserv
                      </div>
                    </div>
                  </div>

                  {/* Disbursement Action Bar */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingTop: '12px', borderTop: '1px solid #1e293b'
                  }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      Settlement Channel: <strong style={{ color: '#fff' }}>UPI Instant IMPS Settlement (380ms)</strong>
                    </div>

                    {isCurrentDisbursed ? (
                      <div style={{
                        backgroundColor: '#064e3b', color: '#34d399', border: '1px solid #059669',
                        padding: '8px 16px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px'
                      }}>
                        <Check style={{ width: '16px', height: '16px' }} />
                        <span>Disbursed via UPI (UTR: 624910294821)</span>
                      </div>
                    ) : (
                      <button
                        onClick={handleDisburse}
                        disabled={disbursing}
                        style={{
                          padding: '10px 20px', backgroundColor: '#059669', color: '#fff',
                          border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px',
                          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                          boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)'
                        }}
                      >
                        {disbursing ? <RefreshCw style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} /> : <Zap style={{ width: '16px', height: '16px' }} />}
                        <span>Execute 1-Click Instant Disbursement</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: BAHI-KHATA DEMO KIT & PITCH SCRIPT                      */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'DEMO_KIT' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
            
            {/* Left: Authentic Paper Ledger Sheet */}
            <div style={{ backgroundColor: '#fffdf5', color: '#1e293b', padding: '24px', borderRadius: '16px', border: '2px solid #cbd5e1' }}>
              <div style={{ textAlign: 'center', borderBottom: '2px solid #991b1b', paddingBottom: '10px', marginBottom: '16px' }}>
                <div style={{ color: '#991b1b', fontWeight: 'bold', fontSize: '13px' }}>|| श्री गणेशाय नमः ||</div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#7f1d1d' }}>Sharma General Store & Kirana</h2>
                <div style={{ fontSize: '12px', color: '#78350f' }}>दैनिक बिक्री एवं उधारी रजिस्टर (Bahi-Khata Ledger Sheet) • Chawri Bazar, Delhi</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', fontFamily: 'monospace' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', borderBottom: '1.5px solid #991b1b', paddingBottom: '4px' }}>
                  <span>ग्राहक नाम व विवरण</span>
                  <span>जमा (Cash In)</span>
                  <span>उधार (Debt)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', padding: '4px 0' }}>
                  <span>Gupta Ji (10kg Atta + Fortune Tel)</span>
                  <span style={{ color: '#166534', fontWeight: 'bold' }}>-</span>
                  <span style={{ color: '#991b1b', fontWeight: 'bold' }}>₹1,420</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', padding: '4px 0' }}>
                  <span>दुकान गल्ला नक़द बिक्री (Galla Sales)</span>
                  <span style={{ color: '#166534', fontWeight: 'bold' }}>₹4,850</span>
                  <span style={{ color: '#991b1b', fontWeight: 'bold' }}>-</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', padding: '4px 0' }}>
                  <span>Sharma Dudh Dairy (दूध भुगतान)</span>
                  <span style={{ color: '#166534', fontWeight: 'bold' }}>₹3,200</span>
                  <span style={{ color: '#991b1b', fontWeight: 'bold' }}>-</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', padding: '4px 0' }}>
                  <span>Raju Chaiwala (चाय पत्ती उधार)</span>
                  <span style={{ color: '#166534', fontWeight: 'bold' }}>-</span>
                  <span style={{ color: '#991b1b', fontWeight: 'bold' }}>₹580</span>
                </div>
              </div>
            </div>

            {/* Right: 3-Minute Pitch Script */}
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontWeight: 'bold', fontSize: '13px' }}>
                <Award style={{ width: '16px', height: '16px' }} />
                <span>3-Minute Live Judging Pitch Script</span>
              </div>

              <div style={{ fontSize: '11px', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: 1.5 }}>
                <div style={{ backgroundColor: '#020617', padding: '8px', borderRadius: '8px' }}>
                  <strong style={{ color: '#818cf8', display: 'block', marginBottom: '2px' }}>1. The Problem (0:00 - 0:45)</strong>
                  100M informal MSMEs have no CIBIL or GST. Lenders need their SMS & Bahi-Khata ledgers, but cloud uploads violate the DPDP Act 2023.
                </div>
                <div style={{ backgroundColor: '#020617', padding: '8px', borderRadius: '8px' }}>
                  <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '2px' }}>2. The Airplane Demo (0:45 - 1:45)</strong>
                  In Airplane Mode, the on-device NPU SLM audits the ledger and SMS receipts in &lt;2 seconds with zero cloud uploads.
                </div>
                <div style={{ backgroundColor: '#020617', padding: '8px', borderRadius: '8px' }}>
                  <strong style={{ color: '#34d399', display: 'block', marginBottom: '2px' }}>3. The Instant Loan (1:45 - 3:00)</strong>
                  The phone's StrongBox TEE signs a W3C credential. The lender verifies the proof and disburses ₹35,000 via UPI instantly.
                </div>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
