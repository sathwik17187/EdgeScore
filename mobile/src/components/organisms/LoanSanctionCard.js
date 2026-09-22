import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function LoanSanctionCard({ 
  verifiableCredential, 
  loanAmount = 35000, 
  onDisburse, 
  isDisbursing, 
  isApproved, 
  onReset 
}) {
  const [activeTab, setActiveTab] = useState('CLAIMS'); // 'CLAIMS', 'SIGNATURE', 'DID_PROOF'

  const dailyDebit = Math.round(loanAmount / 90);

  return (
    <View style={styles.container}>
      
      {/* 1. W3C Verifiable Credential Tabbed Inspector */}
      <View style={styles.vcInspectorCard}>
        <View style={styles.vcHeader}>
          <Text style={styles.vcTitle}>📜 W3C Verifiable Credential</Text>
          <View style={styles.vcTabs}>
            <TouchableOpacity 
              style={[styles.tabBtn, activeTab === 'CLAIMS' && styles.tabBtnActive]}
              onPress={() => setActiveTab('CLAIMS')}
            >
              <Text style={[styles.tabBtnText, activeTab === 'CLAIMS' && styles.tabBtnTextActive]}>Claims</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabBtn, activeTab === 'SIGNATURE' && styles.tabBtnActive]}
              onPress={() => setActiveTab('SIGNATURE')}
            >
              <Text style={[styles.tabBtnText, activeTab === 'SIGNATURE' && styles.tabBtnTextActive]}>Signature</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabBtn, activeTab === 'DID_PROOF' && styles.tabBtnActive]}
              onPress={() => setActiveTab('DID_PROOF')}
            >
              <Text style={[styles.tabBtnText, activeTab === 'DID_PROOF' && styles.tabBtnTextActive]}>DID Proof</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContentBox}>
          {activeTab === 'CLAIMS' && (
            <Text style={styles.jsonText}>
              {JSON.stringify(verifiableCredential.claims, null, 2)}
            </Text>
          )}
          {activeTab === 'SIGNATURE' && (
            <View style={styles.sigBox}>
              <Text style={styles.sigLabel}>ECDSA Signature (secp256r1):</Text>
              <Text style={styles.sigValue}>{verifiableCredential.signature}</Text>
              <Text style={styles.sigHardware}>Attestation: STRONGBOX_TEE (GREEN_SECURE)</Text>
            </View>
          )}
          {activeTab === 'DID_PROOF' && (
            <View style={styles.didBox}>
              <Text style={styles.didLine}>Issuer: <Text style={styles.textCyan}>{verifiableCredential.issuer}</Text></Text>
              <Text style={styles.didLine}>Subject: <Text style={styles.textCyan}>{verifiableCredential.subject}</Text></Text>
              <Text style={styles.didLine}>Zero-Knowledge: <Text style={styles.textEmerald}>ENABLED (0 raw bytes leaked)</Text></Text>
            </View>
          )}
        </View>
      </View>

      {/* 2. Pre-Approved Working Capital Card */}
      <View style={styles.loanCard}>
        <View style={styles.loanHeader}>
          <View>
            <Text style={styles.loanTitle}>Pre-Approved Working Capital</Text>
            <Text style={styles.loanSub}>Instant Flow-Based Micro-Credit via OCEN 4.0</Text>
          </View>
          <View style={styles.sanctionBadge}>
            <Text style={styles.sanctionBadgeText}>Instant Sanction</Text>
          </View>
        </View>

        <View style={styles.amountDisplay}>
          <Text style={styles.amountLabel}>Approved Sanction Limit:</Text>
          <Text style={styles.amountValue}>₹{loanAmount.toLocaleString()}</Text>
        </View>

        <View style={styles.termsGrid}>
          <View style={styles.termCol}>
            <Text style={styles.termLabel}>Daily Micro-Debit</Text>
            <Text style={styles.termVal}>₹{dailyDebit} / day</Text>
          </View>
          <View style={styles.termCol}>
            <Text style={styles.termLabel}>Tenure</Text>
            <Text style={styles.termVal}>90 Days</Text>
          </View>
          <View style={styles.termCol}>
            <Text style={styles.termLabel}>Interest</Text>
            <Text style={[styles.termVal, { color: COLORS.emerald }]}>0.99% / mo</Text>
          </View>
        </View>
      </View>

      {/* 3. Disburse CTA or Success Confirmation */}
      {isApproved ? (
        <View style={styles.successModal}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={styles.successTitle}>Loan Sanctioned & Disbursed via UPI!</Text>
          <Text style={styles.successSub}>
            UTR: 624891029412 • Autopay Mandate Active (₹{dailyDebit}/day)
          </Text>
          <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
            <Text style={styles.resetBtnText}>↺ Test Another Merchant Flow</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity 
          style={[styles.disburseBtn, isDisbursing && styles.disburseBtnDisabled]} 
          onPress={onDisburse}
          disabled={isDisbursing}
          activeOpacity={0.8}
        >
          {isDisbursing ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="#FFFFFF" size="small" />
              <Text style={styles.disburseBtnText}>Transmitting to OCEN 4.0 Gateway...</Text>
            </View>
          ) : (
            <Text style={styles.disburseBtnText}>1-Click Instant Loan Approval 🚀</Text>
          )}
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  vcInspectorCard: {
    backgroundColor: '#050914',
    borderColor: 'rgba(0, 240, 255, 0.25)',
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  vcHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#090E1A',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  vcTitle: {
    color: COLORS.cyberCyan,
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  vcTabs: {
    flexDirection: 'row',
    gap: 4,
  },
  tabBtn: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  tabBtnActive: {
    backgroundColor: COLORS.cyberCyan,
  },
  tabBtnText: {
    color: COLORS.textMuted,
    fontSize: 9.5,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  tabBtnTextActive: {
    color: '#070B14',
  },
  tabContentBox: {
    padding: 12,
  },
  jsonText: {
    color: '#A7F3D0',
    fontSize: 9.5,
    fontFamily: 'monospace',
    lineHeight: 14,
  },
  sigBox: {
    gap: 4,
  },
  sigLabel: {
    color: COLORS.textMuted,
    fontSize: 9.5,
    fontFamily: 'monospace',
  },
  sigValue: {
    color: COLORS.emerald,
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  sigHardware: {
    color: COLORS.electricVioletLight,
    fontSize: 9,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  didBox: {
    gap: 4,
  },
  didLine: {
    color: COLORS.textSecondary,
    fontSize: 9.5,
    fontFamily: 'monospace',
  },
  textCyan: { color: COLORS.cyberCyan, fontWeight: 'bold' },
  textEmerald: { color: COLORS.emerald, fontWeight: 'bold' },
  loanCard: {
    backgroundColor: COLORS.bgCard,
    borderColor: 'rgba(138, 43, 226, 0.4)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  loanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  loanTitle: {
    color: COLORS.textPrimary,
    fontSize: 13.5,
    fontWeight: 'bold',
  },
  loanSub: {
    color: COLORS.textMuted,
    fontSize: 10,
  },
  sanctionBadge: {
    backgroundColor: COLORS.emeraldSubtle,
    borderColor: COLORS.emerald,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  sanctionBadgeText: {
    color: COLORS.emerald,
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  amountDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  amountLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  amountValue: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  termsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 8,
  },
  termCol: {
    gap: 1,
  },
  termLabel: {
    color: COLORS.textMuted,
    fontSize: 9.5,
  },
  termVal: {
    color: COLORS.textPrimary,
    fontSize: 11.5,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  disburseBtn: {
    backgroundColor: COLORS.emeraldDark,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.emerald,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  disburseBtnDisabled: {
    opacity: 0.6,
  },
  disburseBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  successModal: {
    backgroundColor: 'rgba(0, 230, 118, 0.12)',
    borderColor: COLORS.emerald,
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 6,
  },
  successEmoji: {
    fontSize: 28,
  },
  successTitle: {
    color: COLORS.emerald,
    fontSize: 14.5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successSub: {
    color: '#A7F3D0',
    fontSize: 10.5,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  resetBtn: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  resetBtnText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '600',
  },
});
