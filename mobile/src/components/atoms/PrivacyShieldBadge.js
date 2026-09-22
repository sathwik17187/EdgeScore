import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function PrivacyShieldBadge() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.shieldIcon}>🛡️</Text>
        <Text style={styles.title}>DPDP Act 2023 Zero-Persistence Shield</Text>
      </View>
      <Text style={styles.description}>
        Under India's Digital Personal Data Protection Act, your transactional SMS receipts and personal Bahi-Khata ledger photos are audited <Text style={styles.highlight}>100% locally on the phone's NPU</Text>. Zero raw bytes ever leave the device.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(0, 230, 118, 0.06)',
    borderColor: 'rgba(0, 230, 118, 0.25)',
    borderWidth: 1,
    borderRadius: 14,
    padding: 13,
    gap: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shieldIcon: {
    fontSize: 14,
  },
  title: {
    color: COLORS.emerald,
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    color: '#A7F3D0',
    fontSize: 11,
    lineHeight: 16,
  },
  highlight: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
