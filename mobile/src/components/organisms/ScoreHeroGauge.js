import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function ScoreHeroGauge({ score = 782, tier = "TIER_1_PRIME_MICRO", consistency = "94%", cashRatio = "38% Cash : 62% UPI" }) {
  return (
    <View style={styles.card}>
      {/* Top Header */}
      <View style={styles.badgeRow}>
        <View style={styles.oracleBadge}>
          <Text style={styles.oracleBadgeText}>⚡ NPU SYNTHETIC CREDIT ORACLE</Text>
        </View>
        <View style={styles.verifiedBadge}>
          <Text style={styles.verifiedBadgeText}>✓ ZK Audited</Text>
        </View>
      </View>

      {/* Main Glowing Score Center */}
      <View style={styles.gaugeCenter}>
        <View style={styles.scoreNumberRow}>
          <Text style={styles.scoreNumber}>{score}</Text>
          <Text style={styles.scoreMax}> / 900</Text>
        </View>
        
        <View style={styles.tierPill}>
          <Text style={styles.tierPillText}>{tier}</Text>
        </View>
      </View>

      {/* Reconciler Matrix Breakdown */}
      <View style={styles.matrixContainer}>
        
        {/* Cash vs Digital Ratio Bar */}
        <View style={styles.ratioSection}>
          <View style={styles.ratioHeader}>
            <Text style={styles.ratioLabel}>Cash vs UPI Flow Split</Text>
            <Text style={styles.ratioVal}>{cashRatio}</Text>
          </View>
          <View style={styles.ratioBarBg}>
            <View style={[styles.ratioBarCash, { width: '38%' }]} />
            <View style={[styles.ratioBarUpi, { width: '62%' }]} />
          </View>
          <View style={styles.ratioLegend}>
            <Text style={[styles.legendItem, { color: COLORS.amber }]}>● 38% Cash (Bahi-Khata)</Text>
            <Text style={[styles.legendItem, { color: COLORS.cyberCyan }]}>● 62% Digital (UPI Soundbox)</Text>
          </View>
        </View>

        {/* Consistency Index */}
        <View style={styles.consistencyRow}>
          <View style={styles.consistencyItem}>
            <Text style={styles.cLabel}>Ledger-to-UPI Consistency</Text>
            <Text style={styles.cVal}>{consistency} Match</Text>
          </View>
          <View style={styles.consistencyItem}>
            <Text style={styles.cLabel}>Supplier Default Risk</Text>
            <Text style={[styles.cVal, { color: COLORS.emerald }]}>LOW (0.06)</Text>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderColor: 'rgba(0, 240, 255, 0.3)',
    borderWidth: 1.5,
    borderRadius: 18,
    padding: 16,
    gap: 12,
    shadowColor: COLORS.cyberCyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  oracleBadge: {
    backgroundColor: 'rgba(138, 43, 226, 0.15)',
    borderColor: COLORS.electricViolet,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  oracleBadgeText: {
    color: COLORS.electricVioletLight,
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  verifiedBadge: {
    backgroundColor: COLORS.emeraldSubtle,
    borderColor: COLORS.emerald,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  verifiedBadgeText: {
    color: COLORS.emerald,
    fontSize: 9,
    fontWeight: 'bold',
  },
  gaugeCenter: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  scoreNumberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreNumber: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: -1,
  },
  scoreMax: {
    color: COLORS.textMuted,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  tierPill: {
    backgroundColor: 'rgba(0, 240, 255, 0.15)',
    borderColor: COLORS.cyberCyan,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
  },
  tierPillText: {
    color: COLORS.cyberCyan,
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  matrixContainer: {
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  ratioSection: {
    gap: 4,
  },
  ratioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratioLabel: {
    color: COLORS.textSecondary,
    fontSize: 10.5,
  },
  ratioVal: {
    color: COLORS.textPrimary,
    fontSize: 10.5,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  ratioBarBg: {
    height: 6,
    backgroundColor: COLORS.bgSurface,
    borderRadius: 3,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  ratioBarCash: {
    height: '100%',
    backgroundColor: COLORS.amber,
  },
  ratioBarUpi: {
    height: '100%',
    backgroundColor: COLORS.cyberCyan,
  },
  ratioLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  legendItem: {
    fontSize: 9,
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  consistencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.bgSurface,
    padding: 10,
    borderRadius: 10,
  },
  consistencyItem: {
    gap: 2,
  },
  cLabel: {
    color: COLORS.textMuted,
    fontSize: 9.5,
  },
  cVal: {
    color: COLORS.emerald,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});
