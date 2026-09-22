import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function SmsStreamCard({ sms, index }) {
  const isCredit = /(credited|received)/i.test(sms.text);
  const isSoundbox = /(Soundbox|SmartSpeaker)/i.test(sms.text);

  // Extract amount match for highlighting
  const amountMatch = sms.text.match(/(?:Rs\.?|INR|₹)\s*([\d,]+(?:\.\d{1,2})?)/i);
  const amountStr = amountMatch ? amountMatch[0] : null;

  return (
    <View style={styles.card}>
      {/* SMS Header */}
      <View style={styles.header}>
        <View style={styles.senderPill}>
          <Text style={styles.senderText}>{sms.sender}</Text>
          {isSoundbox && (
            <View style={styles.soundboxBadge}>
              <Text style={styles.soundboxBadgeText}>QR Soundbox</Text>
            </View>
          )}
        </View>
        <Text style={styles.timeText}>{sms.time}</Text>
      </View>

      {/* SMS Body */}
      <Text style={styles.bodyText}>
        {sms.text}
      </Text>

      {/* Regex Rule Highlight Bar */}
      <View style={styles.regexBar}>
        <View style={styles.tagGroup}>
          <View style={[styles.ruleTag, isCredit ? styles.ruleTagCredit : styles.ruleTagDebit]}>
            <Text style={[styles.ruleTagText, isCredit ? styles.textEmerald : styles.textRose]}>
              {isCredit ? "✓ REGEX: CREDIT_INFLOW" : "✓ REGEX: DEBIT_PAYMENT"}
            </Text>
          </View>
          {amountStr && (
            <View style={styles.amountPill}>
              <Text style={styles.amountPillText}>{amountStr}</Text>
            </View>
          )}
        </View>
        <Text style={styles.offlineTag}>Offline Regex Hook</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderColor: COLORS.borderSubtle,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  senderPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  senderText: {
    color: COLORS.cyberCyan,
    fontWeight: 'bold',
    fontSize: 11.5,
    fontFamily: 'monospace',
  },
  soundboxBadge: {
    backgroundColor: 'rgba(138, 43, 226, 0.2)',
    borderColor: COLORS.electricViolet,
    borderWidth: 0.8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  soundboxBadgeText: {
    color: COLORS.electricVioletLight,
    fontSize: 8.5,
    fontWeight: 'bold',
  },
  timeText: {
    color: COLORS.textMuted,
    fontSize: 9.5,
    fontFamily: 'monospace',
  },
  bodyText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    lineHeight: 15,
  },
  regexBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  tagGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ruleTag: {
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  ruleTagCredit: {
    backgroundColor: COLORS.emeraldSubtle,
  },
  ruleTagDebit: {
    backgroundColor: COLORS.roseRedSubtle,
  },
  ruleTagText: {
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  textEmerald: { color: COLORS.emerald },
  textRose: { color: COLORS.roseRed },
  amountPill: {
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  amountPillText: {
    color: COLORS.cyberCyan,
    fontSize: 9.5,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  offlineTag: {
    color: COLORS.textMuted,
    fontSize: 9,
    fontFamily: 'monospace',
  },
});
