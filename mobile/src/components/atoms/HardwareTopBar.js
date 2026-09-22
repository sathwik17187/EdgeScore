import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function HardwareTopBar({ airplaneMode, onToggleAirplane }) {
  return (
    <View style={styles.container}>
      {/* Top Telemetry Line */}
      <View style={styles.topRow}>
        <View style={styles.leftPills}>
          <Text style={styles.clockText}>09:41</Text>
          <View style={styles.npuPill}>
            <View style={styles.npuIndicator} />
            <Text style={styles.npuText}>iQOO NPU • Vulkan 1.3</Text>
          </View>
          <View style={styles.teePill}>
            <Text style={styles.teeText}>🔒 StrongBox TEE</Text>
          </View>
        </View>

        {/* Airplane Mode Toggle Switch */}
        <TouchableOpacity 
          style={[styles.airplaneBtn, airplaneMode ? styles.airplaneBtnActive : styles.airplaneBtnInactive]}
          onPress={onToggleAirplane}
          activeOpacity={0.8}
        >
          <Text style={[styles.airplaneBtnText, airplaneMode ? styles.textAmber : styles.textEmerald]}>
            {airplaneMode ? '✈️ Offline Mode' : '📶 Online'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic Offline Isolation Banner */}
      {airplaneMode && (
        <View style={styles.offlineBanner}>
          <View style={styles.pulseDot} />
          <Text style={styles.offlineBannerText}>
            OFFLINE MODE ACTIVE • ZERO BYTES LEAVING DEVICE • NPU LOCAL RUNTIME
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgPrimary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  leftPills: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  clockText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily: 'monospace',
  },
  npuPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0, 240, 255, 0.08)',
    borderColor: COLORS.cyberCyan,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  npuIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.cyberCyan,
  },
  npuText: {
    color: COLORS.cyberCyan,
    fontSize: 9.5,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  teePill: {
    backgroundColor: COLORS.emeraldSubtle,
    borderColor: COLORS.emerald,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  teeText: {
    color: COLORS.emerald,
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  airplaneBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 14,
    borderWidth: 1,
  },
  airplaneBtnActive: {
    backgroundColor: COLORS.amberSubtle,
    borderColor: COLORS.amber,
  },
  airplaneBtnInactive: {
    backgroundColor: COLORS.emeraldSubtle,
    borderColor: COLORS.emerald,
  },
  airplaneBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  textAmber: { color: COLORS.amber },
  textEmerald: { color: COLORS.emerald },
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 171, 0, 0.15)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 171, 0, 0.3)',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.amber,
  },
  offlineBannerText: {
    color: COLORS.amber,
    fontSize: 9.5,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
});
