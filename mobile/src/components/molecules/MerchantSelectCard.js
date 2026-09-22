import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function MerchantSelectCard({ merchantKey, data, isSelected, onSelect }) {
  const avatarEmoji = merchantKey === 'sharma_kirana' ? '🏪' : '☕';

  return (
    <TouchableOpacity 
      style={[styles.card, isSelected && styles.cardActive]} 
      onPress={() => onSelect(merchantKey)}
      activeOpacity={0.8}
    >
      <View style={styles.contentRow}>
        {/* Avatar Badge */}
        <View style={[styles.avatarBox, isSelected && styles.avatarBoxActive]}>
          <Text style={styles.avatarText}>{avatarEmoji}</Text>
        </View>

        {/* Info Column */}
        <View style={styles.infoCol}>
          <View style={styles.titleRow}>
            <Text style={styles.merchantName}>{data.name}</Text>
            {isSelected && (
              <View style={styles.selectedPill}>
                <Text style={styles.selectedPillText}>Active Target</Text>
              </View>
            )}
          </View>
          <Text style={styles.categoryText}>{data.category} • {data.location}</Text>
          
          <View style={styles.metaRow}>
            <Text style={styles.metaItem}>
              Turnover: <Text style={styles.metaValue}>{data.claimedTurnover}</Text>
            </Text>
            <Text style={styles.metaDivider}>•</Text>
            <Text style={styles.metaItem}>
              Entries: <Text style={styles.metaValue}>{data.ledger.entries.length} Ledger Lines</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderColor: COLORS.borderSubtle,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  cardActive: {
    borderColor: COLORS.cyberCyan,
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
    shadowColor: COLORS.cyberCyan,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.bgSurface,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBoxActive: {
    borderColor: COLORS.cyberCyan,
    backgroundColor: 'rgba(0, 240, 255, 0.12)',
  },
  avatarText: {
    fontSize: 22,
  },
  infoCol: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  merchantName: {
    color: COLORS.textPrimary,
    fontSize: 13.5,
    fontWeight: 'bold',
  },
  selectedPill: {
    backgroundColor: 'rgba(0, 240, 255, 0.15)',
    borderColor: COLORS.cyberCyan,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  selectedPillText: {
    color: COLORS.cyberCyan,
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  categoryText: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 3,
  },
  metaItem: {
    color: COLORS.textMuted,
    fontSize: 10.5,
  },
  metaValue: {
    color: COLORS.electricVioletLight,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  metaDivider: {
    color: COLORS.textDisabled,
    fontSize: 10,
  },
});
