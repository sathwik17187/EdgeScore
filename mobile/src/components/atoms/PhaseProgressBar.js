import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';

const PHASE_NAMES = [
  "Zero-Cloud Ingestion",
  "Bahi-Khata Camera Scanner",
  "Local SMS Bank Ingestion",
  "Local SLM Credit Oracle",
  "Hardware Keystore Signing",
  "OCEN 4.0 Instant Sanction"
];

export default function PhaseProgressBar({ currentStep, totalSteps = 6 }) {
  const stepName = PHASE_NAMES[currentStep - 1] || "Processing";
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepNum}>PHASE {currentStep} / {totalSteps}</Text>
        <Text style={styles.stepTitle}>{stepName}</Text>
      </View>
      <View style={styles.trackBg}>
        <View style={[styles.trackFill, { width: `${progressPercent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepNum: {
    color: COLORS.cyberCyan,
    fontSize: 10.5,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
  stepTitle: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  trackBg: {
    height: 4,
    backgroundColor: COLORS.borderSubtle,
    borderRadius: 2,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    backgroundColor: COLORS.cyberCyan,
    borderRadius: 2,
    shadowColor: COLORS.cyberCyan,
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
});
