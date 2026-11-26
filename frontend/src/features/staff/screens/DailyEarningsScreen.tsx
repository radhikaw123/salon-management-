import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { brand, gradients, fonts, spacing } from '@/shared/theme';
import { GradientText } from '@/shared/components/GradientText';
import { GradientCard } from '@/shared/components/GradientCard';
import { PillRow } from '@/shared/components/PillRow';
import { FadeInView } from '@/shared/components/FadeInView';
import { WorkspaceHeader } from '@/shared/components/WorkspaceHeader';
import { useCountUp } from '@/shared/hooks/useCountUp';
import { EarningsTrend } from '../components/EarningsTrend';
import { DateRangeSheet } from '../components/DateRangeSheet';
import {
  averagePerDay,
  buildBuckets,
  earningsIn,
  percentVsDailyAverage,
  rangeFor,
  sumOf,
  todayBucketIndex,
  type DateRange,
  type Period,
} from '../earnings';
import { formatDayMonth, formatLongDate, formatRupees } from '../format';
import { paymentSummary, staffSummary } from '../mock';

const HERO_LABEL: Record<Period, string> = {
  today: 'TODAY’S TOTAL EARNINGS',
  week: 'THIS WEEK’S TOTAL EARNINGS',
  month: 'THIS MONTH’S TOTAL EARNINGS',
  custom: 'TOTAL EARNINGS FOR RANGE',
};

const TREND_TITLE: Record<Period, string> = {
  today: 'This week',
  week: 'This week',
  month: 'This month',
  custom: 'Custom range',
};

function PaymentRow({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.payRow}>
      <Text style={styles.payLabel}>{label}</Text>
      <Text style={[styles.payValue, bold && styles.payValueBold]}>{value}</Text>
    </View>
  );
}

export function DailyEarningsScreen() {
  const insets = useSafeAreaInsets();
  const now = useMemo(() => new Date(), []);
  const [period, setPeriod] = useState<Period>('today');
  const [custom, setCustom] = useState<DateRange | null>(null);
  const [rangeOpen, setRangeOpen] = useState(false);

  const range = rangeFor(period, custom, now);
  const list = earningsIn(range);
  const total = sumOf(list);

  // chart: today uses the whole week, the others use their own range
  const trendRange = period === 'today' ? rangeFor('week', null, now) : range;
  const buckets = buildBuckets(trendRange);
  const trendList = earningsIn(trendRange);
  const trendTotal = sumOf(trendList);
  const trendKey = `${period}-${trendRange.start.getTime()}-${trendRange.end.getTime()}`;

  const animatedTotal = useCountUp(total);
  const vsAverage = period === 'today' ? percentVsDailyAverage(total, now) : null;

  const options = [
    { key: 'today' as const, label: 'Today' },
    { key: 'week' as const, label: 'This Week' },
    { key: 'month' as const, label: 'This Month' },
    {
      key: 'custom' as const,
      label: custom ? `${formatDayMonth(custom.start)} – ${formatDayMonth(custom.end)}` : 'Custom Range',
    },
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.sm }]}
      >
        <FadeInView>
          <WorkspaceHeader caption="STAFF WORKSPACE" />

          <Text style={styles.eyebrow}>
            {staffSummary.staffName.toUpperCase()} · EMPLOYEE ID {staffSummary.employeeId}
          </Text>
          <View style={styles.titleRow}>
            <View style={styles.titleBox}>
              <GradientText colors={gradients.heading} style={styles.title}>
                My Earnings
              </GradientText>
              <Text style={styles.subtitle}>{formatLongDate(now)} · Personal earnings only</Text>
            </View>
            <LinearGradient
              colors={gradients.logo}
              locations={[0.2, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>{staffSummary.initials}</Text>
            </LinearGradient>
          </View>
        </FadeInView>

        <FadeInView delay={60} style={styles.block}>
          <PillRow
            options={options}
            value={period}
            onChange={(key) => (key === 'custom' ? setRangeOpen(true) : setPeriod(key))}
          />
        </FadeInView>

        <FadeInView delay={120} style={styles.block}>
          <GradientCard diagonal>
            <Text style={styles.heroLabel}>{HERO_LABEL[period]}</Text>
            <Text style={styles.heroAmount}>{formatRupees(animatedTotal)}</Text>

            <View style={styles.deltaRow}>
              {vsAverage !== null ? (
                <>
                  <Feather
                    name={vsAverage >= 0 ? 'trending-up' : 'trending-down'}
                    size={14}
                    color={brand.white}
                  />
                  <Text style={styles.deltaText}>
                    {Math.abs(vsAverage)}% {vsAverage >= 0 ? 'above' : 'below'} your daily average
                  </Text>
                </>
              ) : (
                <Text style={styles.deltaText}>
                  Average {formatRupees(averagePerDay(range, total, now))} per day
                </Text>
              )}
            </View>

            <View style={styles.divider} />

            <View style={styles.heroRow}>
              <View style={styles.heroCol}>
                <Text style={styles.heroSmallLabel}>COMMISSION EARNED</Text>
                <Text style={styles.heroSmallValue}>{formatRupees(total)}</Text>
              </View>
              <View style={styles.heroCol}>
                <Text style={styles.heroSmallLabel}>COMPLETED SERVICES</Text>
                <Text style={styles.heroSmallValue}>{list.length}</Text>
              </View>
            </View>
          </GradientCard>
        </FadeInView>

        <FadeInView delay={180} style={styles.block}>
          <EarningsTrend
            key={trendKey}
            buckets={buckets}
            highlightIndex={todayBucketIndex(trendRange, now)}
            title={TREND_TITLE[period]}
            total={trendTotal}
            servicesCount={trendList.length}
            averageLabel={`Daily average ${formatRupees(averagePerDay(trendRange, trendTotal, now))}`}
          />
        </FadeInView>

        <FadeInView delay={240} style={styles.block}>
          <View style={styles.payCard}>
            <Text style={styles.payEyebrow}>PAYMENT SUMMARY</Text>
            <Text style={styles.payTotal}>{formatRupees(paymentSummary.totalEarnedMonth)}</Text>
            <Text style={styles.payCaption}>Total earned this month</Text>

            <View style={styles.payDivider} />
            <PaymentRow label="Paid amount" value={formatRupees(paymentSummary.paid)} bold />
            <PaymentRow label="Pending amount" value={formatRupees(paymentSummary.pending)} bold />
            <PaymentRow label="Last payment" value={paymentSummary.lastPayment} bold />

            <View style={styles.payDivider} />
            <View style={styles.viewOnly}>
              <Feather name="check" size={14} color={brand.purple} />
              <Text style={styles.viewOnlyText}>View-only financial record</Text>
            </View>
          </View>
        </FadeInView>
      </ScrollView>

      <DateRangeSheet
        visible={rangeOpen}
        initial={custom}
        onClose={() => setRangeOpen(false)}
        onApply={(r) => {
          setCustom(r);
          setPeriod('custom');
          setRangeOpen(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: brand.lavender },
  scroll: { paddingHorizontal: spacing.md, paddingBottom: 140 },
  eyebrow: {
    fontFamily: fonts.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: brand.fieldLabel,
    marginTop: spacing.md,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  titleBox: { flex: 1 },
  title: { fontFamily: fonts.heading, fontSize: 38, lineHeight: 46 },
  subtitle: { fontFamily: fonts.sans, fontSize: 13, color: brand.fieldLabel, marginTop: 2 },
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
  heroLabel: { fontFamily: fonts.sans, fontSize: 11, letterSpacing: 2, color: 'rgba(255,255,255,0.85)' },
  heroAmount: { fontFamily: fonts.heading, fontSize: 54, color: brand.white, marginTop: 10 },
  deltaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  deltaText: { fontFamily: fonts.sans, fontSize: 13, color: 'rgba(255,255,255,0.92)' },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(255,255,255,0.35)', marginVertical: 18 },
  heroRow: { flexDirection: 'row' },
  heroCol: { flex: 1 },
  heroSmallLabel: { fontFamily: fonts.sans, fontSize: 10, letterSpacing: 1.5, color: 'rgba(255,255,255,0.8)' },
  heroSmallValue: { fontFamily: fonts.heading, fontSize: 26, color: brand.white, marginTop: 6 },
  payCard: {
    backgroundColor: brand.white,
    borderRadius: 26,
    padding: 20,
    boxShadow: '0px 10px 24px rgba(104, 51, 124, 0.16)',
  },
  payEyebrow: { fontFamily: fonts.sans, fontSize: 10, letterSpacing: 2, color: brand.fieldLabel },
  payTotal: { fontFamily: fonts.heading, fontSize: 46, color: brand.plumDeep, marginTop: 10 },
  payCaption: { fontFamily: fonts.sans, fontSize: 13, color: brand.fieldLabel, marginTop: 2 },
  payDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(85, 46, 81, 0.25)',
    marginVertical: 14,
  },
  payRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  payLabel: { fontFamily: fonts.sans, fontSize: 14, color: brand.fieldLabel },
  payValue: { fontFamily: fonts.sans, fontSize: 14, color: brand.plumDeep },
  payValueBold: { fontFamily: fonts.sansBold },
  viewOnly: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  viewOnlyText: { fontFamily: fonts.sansMedium, fontSize: 12, color: brand.purple },
});
