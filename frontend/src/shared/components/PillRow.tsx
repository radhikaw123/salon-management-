import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { brand, fonts } from '@/shared/theme';
import { PressableScale } from './PressableScale';

type Option<T extends string> = { key: T; label: string };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (key: T) => void;
};

// Horizontal pills: active one is filled with the purple gradient
export function PillRow<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {options.map((o) => {
        const active = o.key === value;
        return (
          <PressableScale
            key={o.key}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(o.key)}
          >
            {active ? (
              <LinearGradient
                colors={[brand.logoTo, brand.purple]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={[styles.pill, styles.pillActive]}
              >
                <Text style={[styles.text, styles.textActive]}>{o.label}</Text>
              </LinearGradient>
            ) : (
              <View style={[styles.pill, styles.pillOutline]}>
                <Text style={styles.text}>{o.label}</Text>
              </View>
            )}
          </PressableScale>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 10, paddingVertical: 4 },
  pill: { height: 40, paddingHorizontal: 18, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  pillActive: { boxShadow: '0px 6px 14px rgba(104, 51, 124, 0.3)' },
  pillOutline: { borderWidth: 1, borderColor: brand.fieldLabel, backgroundColor: brand.white },
  text: { fontFamily: fonts.sansMedium, fontSize: 14, color: brand.plumDeep },
  textActive: { color: brand.white },
});
