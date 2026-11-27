import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { brand, fonts, useTheme, type AppTheme } from '@/shared/theme';
import { GradientButton } from '@/shared/components/GradientButton';
import { PressableScale } from '@/shared/components/PressableScale';
import type { StaffCustomer } from '../mock';

type Props = {
  customer: StaffCustomer;
  expanded: boolean;
  onToggle: () => void;
  onView: () => void;
};

function Info({ label, value }: { label: string; value: string }) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  return (
    <View style={styles.info}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

// Shows only the name. Tap to reveal details and the View button.
export function CustomerCard({ customer, expanded, onToggle, onView }: Props) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  return (
    <View style={styles.card}>
      <View style={styles.accent} />
      <View style={styles.body}>
        <PressableScale
          accessibilityRole="button"
          accessibilityState={{ expanded }}
          accessibilityLabel={`${customer.name}, ${expanded ? 'hide' : 'show'} details`}
          onPress={onToggle}
          style={styles.topRow}
        >
          <LinearGradient
            colors={[brand.logoTo, brand.purple]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.avatar}
          >
            <Text style={styles.initials}>{customer.initials}</Text>
          </LinearGradient>
          <Text style={styles.name}>{customer.name}</Text>
          <Feather
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={t.textMuted}
          />
        </PressableScale>

        {expanded && (
          <View>
            <Text style={styles.phone}>{customer.phone}</Text>

            <View style={styles.divider} />
            <View style={styles.twoCol}>
              <Info label="LAST VISIT" value={customer.lastVisit} />
              <Info label="TOTAL VISITS" value={String(customer.totalVisits)} />
            </View>

            <View style={styles.divider} />
            <Info label="FAVORITE SERVICE" value={customer.favoriteService} />

            <View style={styles.divider} />
            <Info label="NEXT APPOINTMENT" value={customer.nextAppointment} />

            <GradientButton title="View" onPress={onView} style={styles.viewBtn} />
          </View>
        )}
      </View>
    </View>
  );
}

const makeStyles = (t: AppTheme) => StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: t.surface,
    borderRadius: 22,
    overflow: 'hidden',
    marginTop: 16,
    boxShadow: '0px 8px 20px rgba(104, 51, 124, 0.14)',
  },
  accent: { width: 5, backgroundColor: brand.purple },
  body: { flex: 1, padding: 16 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: {
    width: 64,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: { fontFamily: fonts.heading, fontSize: 18, color: brand.white },
  name: { flex: 1, fontFamily: fonts.heading, fontSize: 20, color: t.text },
  phone: { fontFamily: fonts.sans, fontSize: 13, color: t.textMuted, marginTop: 12 },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: t.divider,
    marginVertical: 12,
  },
  twoCol: { flexDirection: 'row' },
  info: { flex: 1 },
  label: { fontFamily: fonts.sans, fontSize: 10, letterSpacing: 1.5, color: t.textMuted },
  value: { fontFamily: fonts.sansBold, fontSize: 15, color: t.text, marginTop: 4 },
  viewBtn: { marginTop: 16 },
});
