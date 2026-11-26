import React from 'react';
import { Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { brand, gradients, fonts, borderRadius } from '@/shared/theme';
import { PressableScale } from './PressableScale';

type Props = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function GradientButton({ title, onPress, style }: Props) {
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={[styles.wrap, style]}
    >
      <LinearGradient
        colors={gradients.button}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    boxShadow: '0px 8px 18px rgba(104, 51, 124, 0.3)',
  },
  gradient: { height: 52, alignItems: 'center', justifyContent: 'center' },
  text: { color: brand.white, fontFamily: fonts.bodySemi, fontSize: 15 },
});
