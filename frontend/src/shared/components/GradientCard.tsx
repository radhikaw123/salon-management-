import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '@/shared/theme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;        // outer spacing (margin)
  contentStyle?: StyleProp<ViewStyle>; // inner layout
  diagonal?: boolean;
};

// Hero card: button gradient, soft glow shadow and two decorative rings
export function GradientCard({ children, style, contentStyle, diagonal = false }: Props) {
  return (
    <View style={[styles.shadow, style]}>
      <LinearGradient
        colors={gradients.button}
        start={diagonal ? { x: 0, y: 0 } : { x: 0.5, y: 0 }}
        end={diagonal ? { x: 1, y: 1 } : { x: 0.5, y: 1 }}
        style={[styles.card, contentStyle]}
      >
        <View pointerEvents="none" style={styles.ringBig} />
        <View pointerEvents="none" style={styles.ringSmall} />
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 26,
    boxShadow: '0px 14px 28px rgba(104, 51, 124, 0.35)',
  },
  card: { borderRadius: 26, padding: 22, overflow: 'hidden' },
  ringBig: {
    position: 'absolute',
    right: -70,
    bottom: -90,
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  ringSmall: {
    position: 'absolute',
    right: -20,
    bottom: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
});
