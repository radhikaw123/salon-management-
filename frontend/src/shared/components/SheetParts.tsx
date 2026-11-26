import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { brand, fonts } from '@/shared/theme';
import { StatusBadge } from './StatusBadge';

export const sheetContent = { paddingTop: 16, paddingBottom: 8, gap: 12 } as const;

type HeaderProps = {
  title: string;
  onClose: () => void;
  initials?: string;
  badge?: string;
  subtitle?: string;
};

export function SheetHeader({ title, onClose, initials, badge, subtitle }: HeaderProps) {
  return (
    <View style={styles.header}>
      {initials && (
        <LinearGradient
          colors={[brand.logoTo, brand.purple]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>{initials}</Text>
        </LinearGradient>
      )}
      <View style={styles.headerText}>
        {badge && <StatusBadge label={badge} />}
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close"
        onPress={onClose}
        style={styles.close}
      >
        <Feather name="x" size={18} color={brand.plumDeep} />
      </Pressable>
    </View>
  );
}

export function SheetSection({
  title,
  children,
  tinted = false,
}: {
  title: string;
  children: React.ReactNode;
  tinted?: boolean;
}) {
  return (
    <View style={[styles.section, tinted && styles.sectionTinted]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export function SheetRow({
  label,
  value,
  divider = false,
}: {
  label: string;
  value: string;
  divider?: boolean;
}) {
  return (
    <View style={[styles.row, divider && styles.rowDivider]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 72, height: 72, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.heading, fontSize: 26, color: brand.white },
  headerText: { flex: 1, gap: 2 },
  title: { fontFamily: fonts.heading, fontSize: 28, color: brand.plumDeep },
  subtitle: { fontFamily: fonts.sans, fontSize: 13, color: brand.fieldLabel },
  close: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(104, 51, 124, 0.12)',
  },
  section: {
    backgroundColor: brand.white,
    borderRadius: 20,
    padding: 16,
    gap: 12,
    boxShadow: '0px 4px 12px rgba(104, 51, 124, 0.08)',
  },
  sectionTinted: {
    backgroundColor: 'rgba(104, 51, 124, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(104, 51, 124, 0.2)',
    boxShadow: 'none',
  },
  sectionTitle: { fontFamily: fonts.sansMedium, fontSize: 10, letterSpacing: 1.5, color: brand.fieldLabel },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  rowDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(85, 46, 81, 0.25)',
    paddingTop: 12,
  },
  rowLabel: { fontFamily: fonts.sans, fontSize: 14, color: brand.fieldLabel },
  rowValue: { fontFamily: fonts.sansBold, fontSize: 14, color: brand.plumDeep },
});
