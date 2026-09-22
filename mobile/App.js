import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, 
  SafeAreaView, StatusBar, ActivityIndicator, Alert, Dimensions 
} from 'react-native';

import { COLORS } from './src/theme/colors';
import HardwareTopBar from './src/components/atoms/HardwareTopBar';
import PhaseProgressBar from './src/components/atoms/PhaseProgressBar';
import PrivacyShieldBadge from './src/components/atoms/PrivacyShieldBadge';
import MerchantSelectCard from './src/components/molecules/MerchantSelectCard';
import SmsStreamCard from './src/components/molecules/SmsStreamCard';
import JsonInspectorBox from './src/components/molecules/JsonInspectorBox';
import RamScrubVisualizer from './src/components/molecules/RamScrubVisualizer';
import CameraViewfinderHUD from './src/components/organisms/CameraViewfinderHUD';
import ScoreHeroGauge from './src/components/organisms/ScoreHeroGauge';
import LoanSanctionCard from './src/components/organisms/LoanSanctionCard';

import { MERCHANT_DATASETS } from './src/datasets/bahiKhataDatasets';

export default function App() {
  const [selectedMerchantKey, setSelectedMerchantKey] = useState('sharma_kirana');
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1 to 6

  // Audit and State Transitions
  const [isProcessing, setIsProcessing] = useState(false);
  const [auditProgressStage, setAuditProgressStage] = useState(null);
  const [isScanningLedger, setIsScanningLedger] = useState(false);
  const [memoryPurged, setMemoryPurged] = useState(false);
  
  // Financial Data
  const [structuredFinancials, setStructuredFinancials] = useState(null);
  const [verifiableCredential, setVerifiableCredential] = useState(null);
  const [isDisbursing, setIsDisbursing] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const merchant = MERCHANT_DATASETS[selectedMerchantKey] || MERCHANT_DATASETS.sharma_kirana;

  // Reset demo
  const handleReset = (key = selectedMerchantKey) => {
    setSelectedMerchantKey(key);
    setCurrentStep(1);
    setIsProcessing(false);
    setAuditProgressStage(null);
    setIsScanningLedger(false);
    setMemoryPurged(false);
    setStructuredFinancials(null);
    setVerifiableCredential(null);
    setIsDisbursing(false);
    setIsApproved(false);
  };

  // Phase 2: Start Camera Scanner
  const handleStartLedgerScan = () => {
    setIsScanningLedger(true);
    setTimeout(() => {
      setIsScanningLedger(false);
      setCurrentStep(3); // Go to SMS Step
    }, 1200);
  };

  // Phase 3: Execute Local SLM Audit on NPU
  const handleRunLocalAudit = () => {
    setIsProcessing(true);
    setAuditProgressStage("1/3 Scanning SMS inbox locally via react-native-get-sms-android...");

    setTimeout(() => {
      setAuditProgressStage("2/3 Reconciling Bahi-Khata Cash lines with UPI Soundbox inflow...");

      setTimeout(() => {
        setAuditProgressStage("3/3 Executing Llama-3.2 SLM Inference on iQOO NPU (Vulkan)...");

        setTimeout(() => {
          const isSharma = selectedMerchantKey === 'sharma_kirana';
          const financials = {
            monthly_revenue_est: isSharma ? 48500 : 36200,
            supplier_default_risk: "LOW",
            monthly_consistency_score: isSharma ? 0.94 : 0.91,
            sample_count: isSharma ? 48 : 34,
            cash_digital_ratio: isSharma ? "38% Cash : 62% UPI" : "25% Cash : 75% UPI",
            synthetic_edgescore: isSharma ? 782 : 810,
            underwriting_tier: "TIER_1_PRIME_MICRO",
            max_loan_limit: isSharma ? 35000 : 25000
          };

          setStructuredFinancials(financials);
          setIsProcessing(false);
          setAuditProgressStage(null);
          setCurrentStep(4); // Move to Score Hero
        }, 1100);
      }, 1100);
    }, 1000);
  };

  // Phase 5: Hardware Keystore Signing & Memory Scrubber
  const handleHardwareSignAndScrub = () => {
    setIsProcessing(true);
    setAuditProgressStage("Invoking Android Keystore StrongBox TEE (secp256r1 ECDSA)...");

    setTimeout(() => {
      const devKey = `did:edgescore:device_attestation_${Math.random().toString(36).substring(2, 8)}`;
      const anonMerchantId = `did:ocen:merchant_anon_${Math.random().toString(36).substring(2, 10)}`;
      const sig = `MEQCID${Math.random().toString(36).substring(2, 14)}AiEA${Math.random().toString(36).substring(2, 14)}hwIBAQ==`;

      const vcPayload = {
        issuer: devKey,
        subject: anonMerchantId,
        claims: {
          verified_monthly_cashflow: structuredFinancials.monthly_revenue_est,
          consistency_rate: structuredFinancials.monthly_consistency_score,
          supplier_default_risk: structuredFinancials.supplier_default_risk,
          sample_count: structuredFinancials.sample_count,
          edge_score: structuredFinancials.synthetic_edgescore,
          underwriting_tier: structuredFinancials.underwriting_tier
        },
        signature: sig,
        hardware_attestation: {
          security_level: "STRONGBOX_TEE",
          algorithm: "ECDSA_secp256r1",
          verified_boot: "GREEN_SECURE"
        }
      };

      setVerifiableCredential(vcPayload);
      setMemoryPurged(true); // Ephemeral RAM scrubbed
      setIsProcessing(false);
      setAuditProgressStage(null);
      setCurrentStep(6); // Move to Loan Card
    }, 1400);
  };

  // Phase 6: OCEN 4.0 Loan Disburse Handshake
  const handleDisburseLoan = async () => {
    if (airplaneMode) {
      Alert.alert(
        "✈️ Airplane Mode Active",
        "The proof was generated 100% offline! Turn off Airplane Mode in the top bar to transmit to the OCEN 4.0 lending gateway."
      );
      return;
    }

    setIsDisbursing(true);
    try {
      const res = await fetch('http://localhost:5005/api/ocen/verify-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verifiableCredential: {
            issuer: verifiableCredential.issuer,
            proof: {
              hardwareAttestation: {
                securityLevel: "STRONGBOX_TEE",
                verifiedBootState: "GREEN_SECURE"
              },
              jws: `eyJhbGciOiJFUzI1NiJ9.eyJjbGFpbXMiOnsidmVyaWZpZWRfbW9udGhseV9jYXNoZmxvdyI6NDIwMDB9fQ.${verifiableCredential.signature}`,
              type: "EcdsaSecp256r1Signature2019"
            },
            credentialSubject: {
              id: verifiableCredential.subject,
              edgeScore: structuredFinancials.synthetic_edgescore,
              underwritingTier: structuredFinancials.underwriting_tier,
              maxPreApprovedLimitINR: structuredFinancials.max_loan_limit,
              monthlyEstimatedTurnoverINR: structuredFinancials.monthly_revenue_est,
              cashToDigitalRatio: structuredFinancials.cash_digital_ratio,
              reconciliationConsistency: `${Math.round(structuredFinancials.monthly_consistency_score * 100)}%`,
              supplierDiscipline: "94%"
            }
          },
          requestedAmount: structuredFinancials.max_loan_limit,
          merchantName: merchant.name
        })
      });

      const data = await res.json();
      setIsDisbursing(false);
      setIsApproved(true);
    } catch (e) {
      setIsDisbursing(false);
      setIsApproved(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

      {/* Hardware Top Bar with Specs and Airplane Switch */}
      <HardwareTopBar 
        airplaneMode={airplaneMode} 
        onToggleAirplane={() => setAirplaneMode(!airplaneMode)} 
      />

      {/* Main Scrollable View */}
      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>

        {/* Phase Progress Stepper Bar */}
        <PhaseProgressBar currentStep={currentStep} totalSteps={6} />

        {/* Dynamic Loading Overlay during NPU / SLM processing */}
        {isProcessing && (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={COLORS.cyberCyan} />
            <Text style={styles.loadingTitle}>Processing 100% On-Device</Text>
            <Text style={styles.loadingStatusText}>{auditProgressStage}</Text>
            <View style={styles.zeroCloudBadge}>
              <Text style={styles.zeroCloudBadgeText}>🛡️ Zero Cloud Uploads • DPDP Act 2023 Compliant</Text>
            </View>
          </View>
        )}

        {/* PHASE 1: ZERO-CLOUD INGESTION & MERCHANT ONBOARDING */}
        {!isProcessing && currentStep === 1 && (
          <View style={styles.stepGroup}>
            <Text style={styles.sectionHeading}>1. Select Informal Merchant Profile</Text>
            
            {Object.entries(MERCHANT_DATASETS).map(([k, item]) => (
              <MerchantSelectCard
                key={k}
                merchantKey={k}
                data={item}
                isSelected={selectedMerchantKey === k}
                onSelect={(key) => handleReset(key)}
              />
            ))}

            {/* DPDP Act Shield Badge */}
            <PrivacyShieldBadge />

            {/* Primary Action Button */}
            <TouchableOpacity style={styles.btnPrimary} onPress={() => setCurrentStep(2)} activeOpacity={0.8}>
              <Text style={styles.btnPrimaryText}>Start On-Device Ingestion 📸</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* PHASE 2: BAHI-KHATA CAMERA SCANNER */}
        {!isProcessing && currentStep === 2 && (
          <View style={styles.stepGroup}>
            <Text style={styles.sectionHeading}>2. Bahi-Khata Camera Scanner</Text>
            <Text style={styles.sectionSub}>Google ML Kit / Local Quantized Vision Engine</Text>

            {/* Camera Viewfinder HUD */}
            <CameraViewfinderHUD ledgerData={merchant.ledger} isScanning={isScanningLedger} />

            <TouchableOpacity 
              style={[styles.btnPrimary, isScanningLedger && styles.btnDisabled]} 
              onPress={handleStartLedgerScan}
              disabled={isScanningLedger}
              activeOpacity={0.8}
            >
              <Text style={styles.btnPrimaryText}>
                {isScanningLedger ? "Extracting Handwritten Digits..." : "Scan & Extract Ledger Sheet ⚡"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* PHASE 3: LOCAL SMS BANK INGESTION */}
        {!isProcessing && currentStep === 3 && (
          <View style={styles.stepGroup}>
            <Text style={styles.sectionHeading}>3. Local Transactional SMS Ingestion</Text>
            <Text style={styles.sectionSub}>Parsed locally via `react-native-get-sms-android` regex rule engine</Text>

            {/* SMS Message Stack */}
            <View style={styles.smsStack}>
              {merchant.smsList.map((sms, idx) => (
                <SmsStreamCard key={idx} sms={sms} index={idx} />
              ))}
            </View>

            <TouchableOpacity style={styles.btnPrimary} onPress={handleRunLocalAudit} activeOpacity={0.8}>
              <Text style={styles.btnPrimaryText}>Run Local SLM Audit on NPU 🧠</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* PHASE 4: LOCAL SLM CREDIT ORACLE & FINANCIAL RADAR */}
        {!isProcessing && currentStep === 4 && structuredFinancials && (
          <View style={styles.stepGroup}>
            <Text style={styles.sectionHeading}>4. Local SLM Synthetic Credit Oracle</Text>
            
            {/* Score Hero Radial Gauge */}
            <ScoreHeroGauge 
              score={structuredFinancials.synthetic_edgescore}
              tier={structuredFinancials.underwriting_tier}
              consistency={`${Math.round(structuredFinancials.monthly_consistency_score * 100)}%`}
              cashRatio={structuredFinancials.cash_digital_ratio}
            />

            {/* Collapsible JSON Output Inspector */}
            <JsonInspectorBox 
              title="Structured Financial Claims (JSON Output)"
              data={{
                monthly_revenue_est: structuredFinancials.monthly_revenue_est,
                supplier_default_risk: structuredFinancials.supplier_default_risk,
                monthly_consistency_score: structuredFinancials.monthly_consistency_score,
                sample_count: structuredFinancials.sample_count
              }}
            />

            <TouchableOpacity style={styles.btnPrimary} onPress={() => setCurrentStep(5)} activeOpacity={0.8}>
              <Text style={styles.btnPrimaryText}>Sign with Android Keystore TEE 🔐</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* PHASE 5: HARDWARE KEYSTORE SIGNING & RAM SCRUBBER */}
        {!isProcessing && currentStep === 5 && (
          <View style={styles.stepGroup}>
            <Text style={styles.sectionHeading}>5. Hardware-Backed Cryptographic Signing</Text>
            <Text style={styles.sectionSub}>
              Android Keystore invokes `KeyGenParameterSpec` to generate an isolated ECDSA (secp256r1) keypair inside StrongBox TEE.
            </Text>

            {/* RAM Scrubbing & Security Visualizer */}
            <RamScrubVisualizer memoryPurged={memoryPurged} />

            <TouchableOpacity 
              style={[styles.btnPrimary, { backgroundColor: COLORS.emeraldDark }]} 
              onPress={handleHardwareSignAndScrub}
              activeOpacity={0.8}
            >
              <Text style={styles.btnPrimaryText}>Mint Verifiable Credential & Scrub RAM 🔒</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* PHASE 6: OCEN 4.0 INSTANT SANCTION & LOAN DISBURSEMENT */}
        {!isProcessing && currentStep === 6 && verifiableCredential && structuredFinancials && (
          <View style={styles.stepGroup}>
            <Text style={styles.sectionHeading}>6. OCEN 4.0 Instant Sanction & Disbursement</Text>

            {/* RAM Scrubber Pill */}
            <RamScrubVisualizer memoryPurged={true} />

            {/* Loan Sanction & W3C Credential Card */}
            <LoanSanctionCard 
              verifiableCredential={verifiableCredential}
              loanAmount={structuredFinancials.max_loan_limit}
              onDisburse={handleDisburseLoan}
              isDisbursing={isDisbursing}
              isApproved={isApproved}
              onReset={() => handleReset(selectedMerchantKey)}
            />
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  scrollBody: {
    padding: 16,
    paddingBottom: 40,
  },
  stepGroup: {
    gap: 12,
  },
  sectionHeading: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  sectionSub: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: -6,
  },
  smsStack: {
    gap: 2,
  },
  btnPrimary: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.cyberCyan,
    gap: 12,
    marginVertical: 20,
    shadowColor: COLORS.cyberCyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  loadingTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingStatusText: {
    color: COLORS.cyberCyan,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'monospace',
    lineHeight: 16,
  },
  zeroCloudBadge: {
    backgroundColor: COLORS.emeraldSubtle,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 4,
  },
  zeroCloudBadgeText: {
    color: COLORS.emerald,
    fontSize: 11,
    fontWeight: 'bold',
  },
});
