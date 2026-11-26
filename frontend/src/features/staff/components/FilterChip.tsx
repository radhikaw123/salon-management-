import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { brand, fonts } from '@/shared/theme';
import { PressableScale } from '@/shared/components/PressableScale';

type IconName = React.ComponentProps<typeof Feather>['name'];

type Props = {
  label: string;
  onPress: () => void;
  icon?: IconName;
  trailingIcon?: IconName;
  active?: boolean;
  align?: 'center' | 'start';
};

export function FilterChip({ label, onPress, icon, trailingIcon, active = false, align = 'center' }: Props) {
  const color = active ? brand.white : brand.fieldLabel;
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[
        styles.chip,
        align === 'center' ? styles.center : styles.start,
        active && styles.active,
      ]}
    >
      {icon && <Feather name={icon} size={16} color={color} />}
      <Text style={[styles.text, active && styles.textActive]} numberOfLines={1}>
        {label}
      </Text>
      {trailingIcon && (
        <Feather name={trailingIcon} size={16} color={color} style={styles.trailing} />
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 16,
    backgroundColor: brand.white,
    boxShadow: '0px 6px 16px rgba(104, 51, 124, 0.12)',
  },
  center: { justifyContent: 'center', paddingHorizontal: 12 },
  start: { paddingHorizontal: 16 },
  active: { backgroundColor: brand.purple, boxShadow: '0px 8px 18px rgba(104, 51, 124, 0.35)' },
  text: { flexShrink: 1, fontFamily: fonts.sansMedium, fontSize: 14, color: brand.plumDeep },
  textActive: { color: brand.white },
  trailing: { marginLeft: 'auto' },
});
