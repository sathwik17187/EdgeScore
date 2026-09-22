import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function CameraViewfinderHUD({ ledgerData, isScanning }) {
  const [filterMode, setFilterMode] = useState('NORMAL'); // 'NORMAL' vs 'BINARIZED'

  return (
    <View style={styles.container}>
      {/* HUD Header Bar */}
      <View style={styles.hudTop}>
        <View style={styles.confidencePill}>
          <Text style={styles.confidenceText}>🧠 Indic OCR: 98.2% Confidence</Text>
        </View>

        {/* Contrast / Binarization Filter Toggle */}
        <TouchableOpacity 
          style={[styles.filterToggle, filterMode === 'BINARIZED' && styles.filterToggleActive]}
          onPress={() => setFilterMode(filterMode === 'NORMAL' ? 'BINARIZED' : 'NORMAL')}
        >
          <Text style={styles.filterToggleText}>
            {filterMode === 'BINARIZED' ? '⚡ Binarized B&W' : '📷 RGB Color'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Simulated Camera Viewfinder Frame */}
      <View style={[styles.viewfinderBox, filterMode === 'BINARIZED' && styles.viewfinderBinarized]}>
        
        {/* Paper Ledger Content */}
        <View style={styles.paperSheet}>
          {/* Header */}
          <View style={styles.paperHeader}>
            <Text style={styles.hindiTitle}>{ledgerData.title}</Text>
            <Text style={styles.dateSub}>{ledgerData.dateRange}</Text>
          </View>

          {/* Table Header */}
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.colHeader, { flex: 4 }]}>विवरण (Customer / Item)</Text>
            <Text style={[styles.colHeader, { flex: 3, textAlign: 'right' }]}>जमा (Cash In)</Text>
            <Text style={[styles.colHeader, { flex: 3, textAlign: 'right' }]}>उधार (Credit)</Text>
          </View>

          {/* Table Rows with Animated Bounding Box Highlights */}
          {ledgerData.entries.slice(0, 5).map((entry, idx) => {
            const isJama = entry.type === 'JAMA' || entry.type === 'ROKAD_JAMA';
            return (
              <View key={idx} style={[styles.entryRow, isScanning && styles.entryRowScanning]}>
                <Text style={[styles.customerName, { flex: 4 }]} numberOfLines={1}>
                  {entry.name}
                </Text>
                <Text style={[styles.jamaValue, { flex: 3, textAlign: 'right' }]}>
                  {isJama ? `₹${entry.amount.toLocaleString()}` : '-'}
                </Text>
                <Text style={[styles.udharValue, { flex: 3, textAlign: 'right' }]}>
                  {!isJama ? `₹${entry.amount.toLocaleString()}` : '-'}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Viewfinder Reticle Overlay */}
        <View style={styles.reticleOverlay} pointerEvents="none">
          <View style={styles.reticleCornerTL} />
          <View style={styles.reticleCornerTR} />
          <View style={styles.reticleCornerBL} />
          <View style={styles.reticleCornerBR} />
          
          <View style={styles.targetStatusPill}>
            <Text style={styles.targetStatusText}>
              {isScanning ? "🧠 NPU Table Tensor Extraction..." : "[ Physical Bahi-Khata Aligned ]"}
            </Text>
          </View>
        </View>

      </View>

      {/* Split Totals Breakdown Banner */}
      <View style={styles.summarySplitBanner}>
        <View style={styles.splitItem}>
          <Text style={styles.splitLabel}>Extracted Cash In (जमा):</Text>
          <Text style={styles.splitJamaVal}>₹18,790</Text>
        </View>
        <View style={styles.splitDivider} />
        <View style={styles.splitItem}>
          <Text style={styles.splitLabel}>Extracted Credit (उधार):</Text>
          <Text style={styles.splitUdharVal}>₹2,450</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  hudTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  confidencePill: {
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    borderColor: COLORS.cyberCyan,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  confidenceText: {
    color: COLORS.cyberCyan,
    fontSize: 9.5,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  filterToggle: {
    backgroundColor: COLORS.bgCard,
    borderColor: COLORS.borderSubtle,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  filterToggleActive: {
    borderColor: COLORS.electricVioletLight,
    backgroundColor: 'rgba(138, 43, 226, 0.2)',
  },
  filterToggleText: {
    color: COLORS.textPrimary,
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  viewfinderBox: {
    height: 230,
    backgroundColor: '#0F172A',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.cyberCyan,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  viewfinderBinarized: {
    filter: 'grayscale(100%) contrast(200%)',
  },
  paperSheet: {
    backgroundColor: COLORS.bahiKhataPaper,
    padding: 12,
    height: '100%',
  },
  paperHeader: {
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.bahiKhataRedLine,
    paddingBottom: 4,
    marginBottom: 4,
    alignItems: 'center',
  },
  hindiTitle: {
    color: COLORS.bahiKhataInkUdhar,
    fontWeight: 'bold',
    fontSize: 12,
  },
  dateSub: {
    color: '#78350F',
    fontSize: 9.5,
    fontFamily: 'monospace',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D8',
    paddingBottom: 3,
    marginBottom: 3,
  },
  colHeader: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#71717A',
    fontFamily: 'monospace',
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2.5,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.bahiKhataRuledLine,
  },
  entryRowScanning: {
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
  },
  customerName: {
    fontSize: 9,
    color: COLORS.bahiKhataInkBlack,
    fontWeight: '600',
  },
  jamaValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.bahiKhataInkJama,
    fontFamily: 'monospace',
  },
  udharValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.bahiKhataInkUdhar,
    fontFamily: 'monospace',
  },
  reticleOverlay: {
    position: 'absolute',
    inset: 0,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reticleCornerTL: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 14,
    height: 14,
    borderTopWidth: 2.5,
    borderLeftWidth: 2.5,
    borderColor: COLORS.cyberCyan,
  },
  reticleCornerTR: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 14,
    height: 14,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderColor: COLORS.cyberCyan,
  },
  reticleCornerBL: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: 14,
    height: 14,
    borderBottomWidth: 2.5,
    borderLeftWidth: 2.5,
    borderColor: COLORS.cyberCyan,
  },
  reticleCornerBR: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 14,
    height: 14,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
    borderColor: COLORS.cyberCyan,
  },
  targetStatusPill: {
    backgroundColor: 'rgba(7, 11, 20, 0.85)',
    borderColor: COLORS.cyberCyan,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 'auto',
  },
  targetStatusText: {
    color: COLORS.cyberCyan,
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  summarySplitBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.bgCard,
    borderColor: COLORS.borderSubtle,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  splitItem: {
    flex: 1,
    alignItems: 'center',
    gap: 1,
  },
  splitLabel: {
    color: COLORS.textMuted,
    fontSize: 9.5,
  },
  splitJamaVal: {
    color: COLORS.emerald,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  splitUdharVal: {
    color: COLORS.roseRed,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  splitDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.borderSubtle,
  },
});
