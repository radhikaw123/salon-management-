import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { brand, fonts, useTheme, type AppTheme } from '@/shared/theme';

// Small tag such as COMPLETED or ALLOCATED TO YOU (theme purple tint)
export function StatusBadge({ label }: { label: string }) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const makeStyles = (t: AppTheme) => StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: t.accentSoft,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  text: { fontFamily: fonts.sansBold, fontSize: 9, letterSpacing: 1.2, color: t.accent },
});
