import React, { useMemo, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { brand, fonts, useTheme, type AppTheme } from '@/shared/theme';
import { FilterChip } from './FilterChip';

type IconName = React.ComponentProps<typeof Feather>['name'];
type Option = { key: string; label: string };
type Anchor = { x: number; y: number; w: number; h: number };

type Props = {
  label: string;
  options: Option[];
  value: string;
  onSelect: (key: string) => void;
  icon?: IconName;
  active?: boolean;
};

const ITEM_H = 48;

// A chip that opens an option list floating over the page, so nothing below it moves.
export function FilterDropdown({ label, options, value, onSelect, icon, active }: Props) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  const ref = useRef<React.ComponentRef<typeof View>>(null);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const { height: screenH } = useWindowDimensions();

  const close = () => setAnchor(null);
  const toggle = () => {
    if (anchor) {
      close();
      return;
    }
    ref.current?.measureInWindow((x, y, w, h) => setAnchor({ x, y, w, h }));
  };

  // open below the chip, or above it when there is not enough room
  const need = options.length * ITEM_H;
  const below = anchor ? screenH - (anchor.y + anchor.h) - 24 : 0;
  const above = anchor ? anchor.y - 24 : 0;
  const openBelow = below >= need || below >= above;
  const maxHeight = Math.max(ITEM_H * 2, Math.min(need, openBelow ? below : above));

  return (
    <View ref={ref} collapsable={false} style={styles.anchor}>
      <FilterChip
        label={label}
        icon={icon}
        active={active}
        trailingIcon={anchor ? 'chevron-up' : 'chevron-down'}
        onPress={toggle}
        align="start"
      />

      <Modal
        visible={!!anchor}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={close}
      >
        <Pressable accessibilityLabel="Close menu" style={StyleSheet.absoluteFill} onPress={close} />
        {anchor && (
          <View
            style={[
              styles.menu,
              openBelow
                ? { top: anchor.y + anchor.h + 8 }
                : { bottom: screenH - anchor.y + 8 },
              { left: anchor.x, width: anchor.w, maxHeight },
            ]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((o, i) => {
                const selected = o.key === value;
                return (
                  <Pressable
                    key={o.key}
                    accessibilityRole="menuitem"
                    accessibilityState={{ selected }}
                    onPress={() => {
                      onSelect(o.key);
                      close();
                    }}
                    style={[styles.item, i > 0 && styles.itemBorder, selected && styles.itemActive]}
                  >
                    <Text style={[styles.text, selected && styles.textActive]} numberOfLines={1}>
                      {o.label}
                    </Text>
                    {selected && <Feather name="check" size={16} color={t.accent} />}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
}

const makeStyles = (t: AppTheme) => StyleSheet.create({
  anchor: { flex: 1 },
  menu: {
    position: 'absolute',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: t.surface,
    boxShadow: '0px 12px 28px rgba(43, 10, 59, 0.28)',
  },
  item: {
    height: ITEM_H,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 16,
  },
  itemBorder: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: t.divider },
  itemActive: { backgroundColor: t.accentSoft },
  text: { flexShrink: 1, fontFamily: fonts.sansMedium, fontSize: 14, color: t.text },
  textActive: { color: t.accent },
});
