import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function RamScrubVisualizer({ memoryPurged }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, memoryPurged ? styles.dotGreen : styles.dotAmber]} />
          <Text style={[styles.statusTitle, memoryPurged ? styles.textEmerald : styles.textAmber]}>
            {memoryPurged ? "CRYPTOGRAPHICALLY SEALED (0x00)" : "EPHEMERAL BUFFERS ACTIVE"}
          </Text>
        </View>
        <Text style={styles.leakTag}>0 Bytes Leaked</Text>
      </View>

      <View style={styles.memoryHexGrid}>
        <View style={styles.hexRow}>
          <Text style={styles.hexLabel}>Camera RGB Frame Buffer:</Text>
          <Text style={styles.hexVal}>{memoryPurged ? "0x00000000 [SCRUBBED]" : "0x7F9A2B4C [VOLATILE]"}</Text>
        </View>
        <View style={styles.hexRow}>
          <Text style={styles.hexLabel}>SMS Inbox Text Dump:</Text>
          <Text style={styles.hexVal}>{memoryPurged ? "0x00000000 [OVERWRITTEN]" : "0x4A1E89F0 [VOLATILE]"}</Text>
        </View>
        <View style={styles.hexRow}>
          <Text style={styles.hexLabel}>OCR Bounding Box Coords:</Text>
          <Text style={styles.hexVal}>{memoryPurged ? "0x00000000 [PURGED]" : "0x98C134A2 [VOLATILE]"}</Text>
        </View>
      </View>

      <Text style={styles.footerNotice}>
        ✓ All intermediate inference tensors destroyed from volatile RAM immediately upon signature creation.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#050914',
    borderColor: 'rgba(0, 230, 118, 0.3)',
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    paddingBottom: 6,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  dotGreen: {
    backgroundColor: COLORS.emerald,
    shadowColor: COLORS.emerald,
    shadowRadius: 6,
    shadowOpacity: 0.8,
  },
  dotAmber: {
    backgroundColor: COLORS.amber,
  },
  statusTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  textEmerald: { color: COLORS.emerald },
  textAmber: { color: COLORS.amber },
  leakTag: {
    color: COLORS.emerald,
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    backgroundColor: COLORS.emeraldSubtle,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  memoryHexGrid: {
    gap: 4,
  },
  hexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hexLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontFamily: 'monospace',
  },
  hexVal: {
    color: COLORS.cyberCyan,
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  footerNotice: {
    color: '#A7F3D0',
    fontSize: 10,
    lineHeight: 14,
    marginTop: 2,
  },
});
