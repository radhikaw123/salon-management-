import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  LayoutAnimation,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { brand, gradients, fonts, spacing, useTheme, type AppTheme } from '@/shared/theme';
import { GradientText } from '@/shared/components/GradientText';
import { GradientCard } from '@/shared/components/GradientCard';
import { SegmentedToggle } from '@/shared/components/SegmentedToggle';
import { WorkspaceHeader } from '@/shared/components/WorkspaceHeader';
import { PressableScale } from '@/shared/components/PressableScale';
import { FadeInView } from '@/shared/components/FadeInView';
import { LoadMoreButton } from '@/shared/components/LoadMoreButton';
import { CustomerCard } from '../components/CustomerCard';
import { CustomerDetailSheet } from '../components/CustomerDetailSheet';
import { CustomerListSheet, type ListKind } from '../components/CustomerListSheet';
import { StaffAvatar } from '../components/StaffAvatar';
import { FilterChip } from '../components/FilterChip';
import { FilterDropdown } from '../components/FilterDropdown';
import { HistoryView } from '../components/HistoryView';
import { mockStaffCustomers, staffSummary } from '../mock';

const PREVIEW = 3; // customers shown before "Load more"

type Tab = 'assigned' | 'history';
type Sort = 'recent' | 'visits' | 'name';

const TABS = [
  { key: 'assigned' as const, label: 'Assigned customers' },
  { key: 'history' as const, label: 'Customer history' },
];

const SORT_OPTIONS: { key: Sort; label: string }[] = [
  { key: 'recent', label: 'Recent Visit' },
  { key: 'visits', label: 'Most Visits' },
  { key: 'name', label: 'Name A - Z' },
];

type StatProps = { label: string; value: string; caption: string; onPress: () => void };

function StatCard({ label, value, caption, onPress }: StatProps) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={`${label}, view list`}
      onPress={onPress}
      style={styles.statCard}
    >
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statCaption}>{caption}</Text>
    </PressableScale>
  );
}

export function MyCustomersScreen() {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>('assigned');
  const [query, setQuery] = useState('');
  const [regularOnly, setRegularOnly] = useState(false);
  const [sort, setSort] = useState<Sort>('recent');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [listKind, setListKind] = useState<ListKind | null>(null);
  const [showAll, setShowAll] = useState(false);

  const selected = mockStaffCustomers.find((c) => c.id === selectedId) ?? null;

  const toggleExpanded = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const customers = useMemo(() => {
    const q = query.trim().toLowerCase();
    const qPhone = q.replace(/\s/g, '');
    const list = mockStaffCustomers.filter((c) => {
      const matches =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.phone.replace(/\s/g, '').includes(qPhone);
      return matches && (!regularOnly || c.totalVisits >= 5);
    });
    return list.sort((a, b) => {
      if (sort === 'visits') return b.totalVisits - a.totalVisits;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return b.lastVisitDate.localeCompare(a.lastVisitDate);
    });
  }, [query, regularOnly, sort]);

  // changing a filter starts again with the short list
  useEffect(() => setShowAll(false), [query, regularOnly, sort]);
  const visible = showAll ? customers : customers.slice(0, PREVIEW);

  const filtersOn = query.trim() !== '' || regularOnly || sort !== 'recent';
  const reset = () => {
    setQuery('');
    setRegularOnly(false);
    setSort('recent');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle={t.statusBar} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.sm }]}
      >
        <FadeInView>
          <WorkspaceHeader caption="STAFF WORKSPACE" />

          <Text style={styles.eyebrow}>YOUR CLIENT CIRCLE</Text>
          <View style={styles.titleRow}>
            <View style={styles.titleBox}>
              <GradientText colors={t.headingGradient} style={styles.title}>
                My Customers
              </GradientText>
              <Text style={styles.subtitle}>
                {staffSummary.assignedCount} customers exclusively assigned to {staffSummary.staffName}
              </Text>
            </View>
            <StaffAvatar />
          </View>
        </FadeInView>

        <FadeInView delay={60} style={styles.block}>
          <SegmentedToggle options={TABS} value={tab} onChange={setTab} />
        </FadeInView>

        {tab === 'assigned' ? (
          <>
            <FadeInView delay={120}>
              <GradientCard style={styles.heroCard}>
                <Text style={styles.heroLabel}>TODAY’S CUSTOMERS</Text>
                <Text style={styles.heroValue}>{staffSummary.todaysCustomers}</Text>
                <Text style={styles.heroCaption}>Only your allocated clients</Text>
              </GradientCard>
            </FadeInView>

            <FadeInView delay={180} style={styles.statRow}>
              <StatCard
                label="UPCOMING"
                value={String(staffSummary.upcoming)}
                caption="Within the last 30 days"
                onPress={() => setListKind('upcoming')}
              />
              <StatCard
                label="TOTAL CUSTOMERS"
                value={String(staffSummary.totalCustomers)}
                caption="5+ completed visits"
                onPress={() => setListKind('total')}
              />
            </FadeInView>

            <FadeInView delay={240}>
              <View style={styles.search}>
                <Feather name="search" size={18} color={t.textMuted} />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Search name or phone number"
                  placeholderTextColor={t.placeholder}
                  style={styles.searchInput}
                  autoCorrect={false}
                />
              </View>

              <View style={styles.chipRow}>
                <View style={styles.flex1}>
                  <FilterChip
                    icon="filter"
                    label="Regular only"
                    active={regularOnly}
                    onPress={() => setRegularOnly((v) => !v)}
                  />
                </View>
                <FilterDropdown
                  label={SORT_OPTIONS.find((o) => o.key === sort)!.label}
                  options={SORT_OPTIONS}
                  value={sort}
                  onSelect={(key) => setSort(key as Sort)}
                />
              </View>
            </FadeInView>

            <View style={styles.resultRow}>
              <Text style={styles.resultText}>
                Showing {customers.length} of {mockStaffCustomers.length} customers
              </Text>
              {filtersOn && (
                <Pressable accessibilityRole="button" hitSlop={10} onPress={reset}>
                  <Text style={styles.reset}>Reset filters</Text>
                </Pressable>
              )}
            </View>

            {customers.length === 0 ? (
              <Text style={styles.empty}>No customers match these filters</Text>
            ) : (
              <>
                {visible.map((c, i) => (
                  <FadeInView
                    key={c.id}
                    delay={Math.min(showAll ? Math.max(i - PREVIEW, 0) : i, 6) * 70}
                  >
                    <CustomerCard
                      customer={c}
                      expanded={expandedId === c.id}
                      onToggle={() => toggleExpanded(c.id)}
                      onView={() => setSelectedId(c.id)}
                    />
                  </FadeInView>
                ))}
                {customers.length > PREVIEW && (
                  <LoadMoreButton
                    remaining={customers.length - PREVIEW}
                    expanded={showAll}
                    onPress={() => setShowAll((v) => !v)}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <HistoryView />
        )}
      </ScrollView>

      <CustomerDetailSheet customer={selected} onClose={() => setSelectedId(null)} />
      <CustomerListSheet kind={listKind} onClose={() => setListKind(null)} />
    </View>
  );
}

const makeStyles = (t: AppTheme) => StyleSheet.create({
  root: { flex: 1, backgroundColor: t.bg },
  scroll: { paddingHorizontal: spacing.md, paddingBottom: 140 },
  flex1: { flex: 1 },
  eyebrow: {
    fontFamily: fonts.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: t.textMuted,
    marginTop: spacing.md,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  titleBox: { flex: 1 },
  title: { fontFamily: fonts.heading, fontSize: 38, lineHeight: 46 },
  subtitle: { fontFamily: fonts.sans, fontSize: 13, color: t.textMuted, marginTop: 2 },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 8px 16px rgba(43, 10, 59, 0.35)',
  },
  avatarText: { fontFamily: fonts.sansBold, fontSize: 16, color: brand.white },
  block: { marginTop: spacing.md },
  heroCard: { marginTop: spacing.md },
  heroLabel: { fontFamily: fonts.sans, fontSize: 11, letterSpacing: 2, color: 'rgba(255,255,255,0.85)' },
  heroValue: { fontFamily: fonts.heading, fontSize: 46, color: brand.white, marginTop: 6 },
  heroCaption: { fontFamily: fonts.sans, fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  statRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  statCard: {
    flex: 1,
    backgroundColor: t.surface,
    borderRadius: 22,
    padding: 18,
    boxShadow: '0px 8px 20px rgba(104, 51, 124, 0.14)',
  },
  statLabel: { fontFamily: fonts.sans, fontSize: 10, letterSpacing: 1.5, color: t.textMuted },
  statValue: { fontFamily: fonts.heading, fontSize: 36, color: t.text, marginTop: 8 },
  statCaption: { fontFamily: fonts.sans, fontSize: 12, color: t.textMuted, marginTop: 4 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 54,
    marginTop: spacing.md,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: t.surface,
    boxShadow: '0px 6px 16px rgba(104, 51, 124, 0.12)',
  },
  searchInput: { flex: 1, fontFamily: fonts.sans, fontSize: 15, color: t.text },
  chipRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  resultText: { fontFamily: fonts.sans, fontSize: 13, color: t.textMuted },
  reset: { fontFamily: fonts.sansBold, fontSize: 13, color: t.accent, textDecorationLine: 'underline' },
  empty: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: t.textMuted,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
