import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { brand, gradients, fonts, borderRadius } from '@/shared/theme';

type Props = TextInputProps & {
  label: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const BORDER = 1.5;

export function TextField({ label, error, containerStyle, style, ...rest }: Props) {
  const borderColors = error
    ? [brand.danger, brand.danger]
    : gradients.button;

  return (
    <View style={[styles.wrap, containerStyle]}>
      {/* Gradient border + soft shadow */}
      <View style={styles.shadow}>
        <LinearGradient
          colors={borderColors as any}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.border}
        >
          <TextInput
            placeholderTextColor={brand.placeholder}
            style={[styles.input, style]}
            {...rest}
          />
        </LinearGradient>
      </View>

      <Text style={styles.label}>{label}</Text>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 16 },
  shadow: {
    borderRadius: borderRadius.lg,
    backgroundColor: brand.lavender,
    boxShadow: '0px 4px 10px rgba(104, 51, 124, 0.18)',
  },
  border: { borderRadius: borderRadius.lg, padding: BORDER },
  input: {
    height: 52 - BORDER * 2,
    borderRadius: borderRadius.lg - BORDER,
    backgroundColor: brand.lavender,
    paddingHorizontal: 16,
    fontFamily: fonts.body,
    fontSize: 15,
    color: brand.plumDeep,
  },
  label: {
    position: 'absolute',
    top: -8,
    left: 14,
    zIndex: 2,
    paddingHorizontal: 4,
    backgroundColor: brand.lavender,
    color: brand.fieldLabel,
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
  },
  error: {
    marginTop: 4,
    marginLeft: 6,
    color: brand.danger,
    fontFamily: fonts.body,
    fontSize: 12,
  },
});
