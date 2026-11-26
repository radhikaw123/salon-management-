import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { brand, fonts } from '@/shared/theme';

type Option = { key: string; label: string };

type Props = {
  options: Option[];
  value: string;
  onSelect: (key: string) => void;
  align?: 'left' | 'right';
};

// Option list that opens under a filter chip
export function OptionDropdown({ options, value, onSelect, align = 'right' }: Props) {
  return (
    <View style={[styles.menu, align === 'right' ? styles.right : styles.left]}>
      {options.map((o, i) => {
        const active = o.key === value;
        return (
          <Pressable
            key={o.key}
            accessibilityRole="menuitem"
            accessibilityState={{ selected: active }}
            onPress={() => onSelect(o.key)}
            style={[styles.item, i > 0 && styles.itemBorder, active && styles.itemActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>{o.label}</Text>
            {active && <Feather name="check" size={16} color={brand.purple} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    width: '48%',
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: brand.white,
    boxShadow: '0px 8px 20px rgba(104, 51, 124, 0.18)',
  },
  left: { alignSelf: 'flex-start' },
  right: { alignSelf: 'flex-end' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  itemBorder: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'rgba(85, 46, 81, 0.25)' },
  itemActive: { backgroundColor: 'rgba(104, 51, 124, 0.08)' },
  text: { fontFamily: fonts.sansMedium, fontSize: 14, color: brand.plumDeep },
  textActive: { color: brand.purple },
});
