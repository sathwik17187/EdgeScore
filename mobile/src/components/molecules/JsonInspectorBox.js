import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function JsonInspectorBox({ title = "JSON Financial Output", data }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const formattedJson = typeof data === 'string' ? data : JSON.stringify(data, null, 2);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.titleRow}>
          <Text style={styles.terminalIcon}>⚡</Text>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <Text style={styles.toggleText}>{isExpanded ? '▲ Collapse' : '▼ Expand'}</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.codeBody}>
          <Text style={styles.codeText}>{formattedJson}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#050811',
    borderColor: COLORS.borderSubtle,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#090E1A',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  terminalIcon: {
    fontSize: 11,
  },
  titleText: {
    color: COLORS.cyberCyan,
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  toggleText: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontFamily: 'monospace',
  },
  codeBody: {
    padding: 12,
  },
  codeText: {
    color: '#A5B4FC',
    fontSize: 10,
    fontFamily: 'monospace',
    lineHeight: 15,
  },
});
