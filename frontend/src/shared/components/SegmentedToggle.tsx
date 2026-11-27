import React, { useMemo } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { brand, gradients, fonts, useTheme, type AppTheme } from '@/shared/theme';

type Option<T extends string> = { key: T; label: string };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (key: T) => void;
};

// Two-option toggle with the button gradient and a white active pill
export function SegmentedToggle<T extends string>({ options, value, onChange }: Props<T>) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  return (
    <LinearGradient
      colors={gradients.button}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.wrap}
    >
      {options.map((o) => {
        const active = o.key === value;
        return (
          <Pressable
            key={o.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(o.key)}
            style={[styles.item, active && styles.itemActive]}
          >
            <Text style={[styles.text, active ? styles.textActive : styles.textInactive]}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </LinearGradient>
  );
}

const makeStyles = (t: AppTheme) => StyleSheet.create({
  wrap: { flexDirection: 'row', padding: 4, borderRadius: 22 },
  item: { flex: 1, height: 46, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  itemActive: { backgroundColor: t.surface },
  text: { fontFamily: fonts.sansMedium, fontSize: 15 },
  textActive: { color: t.text },
  textInactive: { color: brand.white },
});
