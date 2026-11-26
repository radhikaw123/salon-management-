import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { brand, fonts } from '@/shared/theme';

// Small tag such as COMPLETED or ALLOCATED TO YOU (theme purple tint)
export function StatusBadge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(104, 51, 124, 0.12)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  text: { fontFamily: fonts.sansBold, fontSize: 9, letterSpacing: 1.2, color: brand.purple },
});
