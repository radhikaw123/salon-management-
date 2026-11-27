import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { brand, fonts, spacing, useTheme, type AppTheme } from '@/shared/theme';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { PressableScale } from '@/shared/components/PressableScale';
import { FadeInView } from '@/shared/components/FadeInView';
import { ServiceDetailSheet } from '../components/ServiceDetailSheet';
import { formatDateTime, formatDuration } from '../format';
import { mockHistory, mockStaffCustomers } from '../mock';

type Props = NativeStackScreenProps<RootStackParamList, 'CustomerVisits'>;

function Stat({ label, value }: { label: string; value: string }) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

// All visits of one customer. Tap a visit to open the service popup.
export function CustomerVisitsScreen({ navigation, route }: Props) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  const insets = useSafeAreaInsets();
  const { customerId } = route.params;
  const customer = mockStaffCustomers.find((c) => c.id === customerId);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visits = useMemo(
    () =>
      mockHistory
        .filter((h) => h.customerId === customerId)
        .sort((a, b) => b.completedAt.localeCompare(a.completedAt)),
    [customerId],
  );

  const selected = visits.find((v) => v.id === selectedId);
  const entry = customer && selected ? { item: selected, customer } : null;

  return (
    <View style={styles.root}>
      <StatusBar barStyle={t.statusBar} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.sm }]}
      >
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Feather name="arrow-left" size={20} color={t.text} />
        </PressableScale>

        {!customer ? (
          <Text style={styles.empty}>Customer not found</Text>
        ) : (
          <>
            <FadeInView style={styles.header}>
              <LinearGradient
                colors={[brand.logoTo, brand.purple]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>{customer.initials}</Text>
              </LinearGradient>
              <View style={styles.headerText}>
                <Text style={styles.eyebrow}>CUSTOMER VISITS</Text>
                <Text style={styles.name}>{customer.name}</Text>
                <Text style={styles.phone}>{customer.phone}</Text>
              </View>
            </FadeInView>

            <FadeInView delay={80} style={styles.statRow}>
              <Stat label="TOTAL VISITS" value={String(customer.totalVisits)} />
              <Stat label="LAST VISIT" value={customer.lastVisit} />
            </FadeInView>

            <Text style={styles.section}>VISITS · {visits.length}</Text>

            {visits.length === 0 ? (
              <Text style={styles.empty}>No visits recorded yet</Text>
            ) : (
              visits.map((v, i) => (
                <FadeInView key={v.id} delay={160 + Math.min(i, 6) * 60}>
                  <PressableScale
                    accessibilityRole="button"
                    accessibilityLabel={`${v.service}, view service details`}
                    onPress={() => setSelectedId(v.id)}
                    style={styles.card}
                  >
                    <View style={styles.accent} />
                    <View style={styles.cardBody}>
                      <View style={styles.cardText}>
                        <StatusBadge label="COMPLETED" />
                        <Text style={styles.service}>{v.service}</Text>
                        <Text style={styles.meta}>{formatDateTime(v.completedAt)}</Text>
                        <Text style={styles.meta}>
                          {v.category} · {formatDuration(v.durationMin)}
                        </Text>
                      </View>
                      <Feather name="chevron-right" size={20} color={t.textMuted} />
                    </View>
                  </PressableScale>
                </FadeInView>
              ))
            )}
          </>
        )}
      </ScrollView>

      <ServiceDetailSheet entry={entry} onClose={() => setSelectedId(null)} />
    </View>
  );
}

const makeStyles = (t: AppTheme) => StyleSheet.create({
  root: { flex: 1, backgroundColor: t.bg },
  scroll: { paddingHorizontal: spacing.md, paddingBottom: 48 },
  back: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.surface,
    boxShadow: '0px 6px 14px rgba(104, 51, 124, 0.16)',
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: spacing.md },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 8px 18px rgba(104, 51, 124, 0.35)',
  },
  avatarText: { fontFamily: fonts.heading, fontSize: 26, color: brand.white },
  headerText: { flex: 1 },
  eyebrow: { fontFamily: fonts.sans, fontSize: 10, letterSpacing: 2, color: t.textMuted },
  name: { fontFamily: fonts.heading, fontSize: 30, color: t.text, marginTop: 2 },
  phone: { fontFamily: fonts.sans, fontSize: 13, color: t.textMuted },
  statRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  stat: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    backgroundColor: t.surface,
    boxShadow: '0px 8px 20px rgba(104, 51, 124, 0.14)',
  },
  statLabel: { fontFamily: fonts.sans, fontSize: 10, letterSpacing: 1.5, color: t.textMuted },
  statValue: { fontFamily: fonts.heading, fontSize: 22, color: t.text, marginTop: 6 },
  section: {
    fontFamily: fonts.sansMedium,
    fontSize: 11,
    letterSpacing: 2,
    color: t.textMuted,
    marginTop: spacing.lg,
  },
  empty: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: t.textMuted,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: t.surface,
    borderRadius: 22,
    overflow: 'hidden',
    marginTop: 14,
    boxShadow: '0px 8px 20px rgba(104, 51, 124, 0.14)',
  },
  accent: { width: 5, backgroundColor: brand.purple },
  cardBody: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  cardText: { flex: 1, gap: 3 },
  service: { fontFamily: fonts.heading, fontSize: 21, color: t.text },
  meta: { fontFamily: fonts.sans, fontSize: 13, color: t.textMuted },
});
