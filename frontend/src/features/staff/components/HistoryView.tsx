import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { brand, fonts, spacing } from '@/shared/theme';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { GradientCard } from '@/shared/components/GradientCard';
import { PillRow } from '@/shared/components/PillRow';
import { PressableScale } from '@/shared/components/PressableScale';
import { FadeInView } from '@/shared/components/FadeInView';
import { FilterDropdown } from './FilterDropdown';
import { ServiceDetailSheet } from './ServiceDetailSheet';
import { rangeFor } from '../earnings';
import { MONTH_NAMES } from '../format';
import {
  mockHistory,
  mockStaffCustomers,
  staffSummary,
  weeklyTrend,
  type ServiceCategory,
} from '../mock';

type Filter = 'All services' | ServiceCategory;
type Period = 'week' | 'month' | 'all';

const FILTERS: { key: Filter; label: string }[] = (
  ['All services', 'Hair color', 'Hair care', 'Styling'] as Filter[]
).map((f) => ({ key: f, label: f }));

const PERIODS: { key: Period; label: string }[] = [
  { key: 'week', label: 'This week' },
  { key: 'month', label: 'This month' },
  { key: 'all', label: 'All time' },
];

const monthKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}`;

// "All dates" plus the current month and the 5 before it
function buildMonthOptions() {
  const now = new Date();
  const options = [{ key: 'all', label: 'All dates' }];
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    options.push({ key: monthKey(d), label: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}` });
  }
  return options;
}

export function HistoryView() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('All services');
  const [period, setPeriod] = useState<Period>('week');
  const [month, setMonth] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const monthOptions = useMemo(buildMonthOptions, []);
  const monthLabel = monthOptions.find((o) => o.key === month)?.label ?? 'Date';

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const range = period === 'all' ? null : rangeFor(period, null);

    return mockHistory
      .map((h) => ({ h, c: mockStaffCustomers.find((c) => c.id === h.customerId)! }))
      .filter(({ h, c }) => {
        const t = new Date(h.completedAt);
        return (
          (!range || (t >= range.start && t <= range.end)) &&
          (month === 'all' || monthKey(t) === month) &&
          (filter === 'All services' || h.category === filter) &&
          (!q || c.name.toLowerCase().includes(q) || h.service.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => b.h.completedAt.localeCompare(a.h.completedAt));
  }, [query, filter, period, month]);

  const selected = rows.find(({ h }) => h.id === selectedId);
  const entry = selected ? { item: selected.h, customer: selected.c } : null;
  const firstName = staffSummary.staffName.split(' ')[0].toUpperCase();

  const filtersOn = query.trim() !== '' || filter !== 'All services' || period !== 'week' || month !== 'all';
  const reset = () => {
    setQuery('');
    setFilter('All services');
    setPeriod('week');
    setMonth('all');
  };

  return (
    <>
      <FadeInView delay={0}>
        <GradientCard
          style={styles.hero}
          contentStyle={styles.heroContent}
        >
          <View style={styles.heroText}>
            <Text style={styles.heroLabel}>COMPLETED BY {firstName}</Text>
            <Text style={styles.heroValue}>{staffSummary.completedServices} services</Text>
            <Text style={styles.heroCaption}>{staffSummary.avgCommissionPct}% average commission</Text>
          </View>
          <View style={styles.bars}>
            {weeklyTrend.map((v, i) => (
              <View
                key={i}
                style={[
                  styles.bar,
                  {
                    height: 14 + v * 66,
                    backgroundColor:
                      i === weeklyTrend.length - 1 ? brand.white : 'rgba(255,255,255,0.4)',
                  },
                ]}
              />
            ))}
          </View>
        </GradientCard>
      </FadeInView>

      <FadeInView delay={80}>
        <View style={styles.search}>
          <Feather name="search" size={18} color={brand.fieldLabel} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search customer history"
            placeholderTextColor={brand.placeholder}
            style={styles.searchInput}
            autoCorrect={false}
          />
        </View>
      </FadeInView>

      <FadeInView delay={160}>
        <View style={styles.chipRow}>
          <FilterDropdown
            icon="calendar"
            label={month === 'all' ? 'Date' : monthLabel}
            active={month !== 'all'}
            options={monthOptions}
            value={month}
            onSelect={(key) => {
              setMonth(key);
              setPeriod('all'); // a month and a quick period would cancel each other out
            }}
          />
          <FilterDropdown
            label={PERIODS.find((p) => p.key === period)!.label}
            options={PERIODS}
            value={period}
            onSelect={(key) => {
              setPeriod(key as Period);
              setMonth('all');
            }}
          />
        </View>
        <View style={styles.pills}>
          <PillRow options={FILTERS} value={filter} onChange={setFilter} />
        </View>
      </FadeInView>

      <View style={styles.resultRow}>
        <Text style={styles.resultText}>
          {rows.length} {rows.length === 1 ? 'service' : 'services'} found
        </Text>
        {filtersOn && (
          <Pressable accessibilityRole="button" hitSlop={10} onPress={reset}>
            <Text style={styles.reset}>Reset filters</Text>
          </Pressable>
        )}
      </View>

      {rows.length === 0 ? (
        <Text style={styles.empty}>No services match these filters</Text>
      ) : (
        rows.map(({ h, c }, i) => (
          <FadeInView key={h.id} delay={Math.min(i, 6) * 60}>
            <PressableScale
              accessibilityRole="button"
              accessibilityLabel={`${c.name}, ${h.service}, view service details`}
              onPress={() => setSelectedId(h.id)}
              style={styles.card}
            >
              <View style={styles.accent} />
              <View style={styles.cardBody}>
                <LinearGradient
                  colors={[brand.logoTo, brand.purple]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.avatar}
                >
                  <Text style={styles.initials}>{c.initials}</Text>
                </LinearGradient>
                <View style={styles.cardText}>
                  <StatusBadge label="COMPLETED" />
                  <Text style={styles.name}>{c.name}</Text>
                  <Text style={styles.service}>{h.service}</Text>
                </View>
                <Feather name="chevron-right" size={20} color={brand.fieldLabel} />
              </View>
            </PressableScale>
          </FadeInView>
        ))
      )}

      <ServiceDetailSheet entry={entry} onClose={() => setSelectedId(null)} />
    </>
  );
}

const styles = StyleSheet.create({
  hero: { marginTop: spacing.md },
  heroContent: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  heroText: { flex: 1 },
  heroLabel: { fontFamily: fonts.sans, fontSize: 11, letterSpacing: 2, color: 'rgba(255,255,255,0.85)' },
  heroValue: { fontFamily: fonts.heading, fontSize: 34, color: brand.white, marginTop: 8 },
  heroCaption: { fontFamily: fonts.sans, fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  bar: { width: 12, borderRadius: 6 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 54,
    marginTop: spacing.md,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: brand.white,
    boxShadow: '0px 6px 16px rgba(104, 51, 124, 0.12)',
  },
  searchInput: { flex: 1, fontFamily: fonts.sans, fontSize: 15, color: brand.plumDeep },
  chipRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  pills: { marginTop: spacing.md },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  resultText: { fontFamily: fonts.sans, fontSize: 13, color: brand.fieldLabel },
  reset: { fontFamily: fonts.sansBold, fontSize: 13, color: brand.purple, textDecorationLine: 'underline' },
  empty: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: brand.fieldLabel,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: brand.white,
    borderRadius: 22,
    overflow: 'hidden',
    marginTop: 14,
    boxShadow: '0px 8px 20px rgba(104, 51, 124, 0.14)',
  },
  accent: { width: 5, backgroundColor: brand.purple },
  cardBody: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14 },
  avatar: { width: 84, height: 64, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  initials: { fontFamily: fonts.heading, fontSize: 22, color: brand.white },
  cardText: { flex: 1, gap: 3 },
  name: { fontFamily: fonts.heading, fontSize: 20, color: brand.plumDeep },
  service: { fontFamily: fonts.sans, fontSize: 13, color: brand.fieldLabel },
});
