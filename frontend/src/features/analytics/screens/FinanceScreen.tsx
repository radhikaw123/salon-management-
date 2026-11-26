import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, spacing, radius, typography } from '../../../shared/theme';
import { SalonHeader } from '../../../shared/components/SalonHeader';
import { formatRupee } from '../../../shared/api/mockData';

export const FinanceScreen = () => {
  const [activeSegment, setActiveSegment] = useState<'overview' | 'payroll'>('overview');

  const categoryBars = [
    { label: 'Hair', percent: 42 },
    { label: 'Skin', percent: 28 },
    { label: 'Nails', percent: 14 },
    { label: 'Makeup', percent: 10 },
    { label: 'Other', percent: 6 },
  ];

  const staffPayouts = [
    { id: '1', name: 'Maya Ellis', total: 43000, commissionPct: 20, commissionAmount: 18000, initials: 'ME' },
    { id: '2', name: 'Nora James', total: 34500, commissionPct: 18, commissionAmount: 13500, initials: 'NJ' },
    { id: '3', name: 'Leah Stone', total: 36200, commissionPct: 22, commissionAmount: 16200, initials: 'LS' },
  ];

  return (
    <View style={styles.screen}>
      <SalonHeader
        rightActionIcon="download-outline"
        onRightActionPress={() => {}}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <View style={styles.headerSection}>
          <Text style={styles.caption}>FINANCIAL PULSE</Text>
          <Text style={styles.title}>
            Money, <Text style={{ fontStyle: 'italic', fontWeight: '400' }}>made clear.</Text>
          </Text>
        </View>

        {/* Segmented Control */}
        <View style={styles.segmentedContainer}>
          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeSegment === 'overview' && styles.segmentTabActive,
            ]}
            onPress={() => setActiveSegment('overview')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.segmentText,
                activeSegment === 'overview' && styles.segmentTextActive,
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeSegment === 'payroll' && styles.segmentTabActive,
            ]}
            onPress={() => setActiveSegment('payroll')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.segmentText,
                activeSegment === 'payroll' && styles.segmentTextActive,
              ]}
            >
              Payroll & commission
            </Text>
          </TouchableOpacity>
        </View>

        {/* 1. Overview View */}
        {activeSegment === 'overview' ? (
          <View>
            {/* Gross Revenue Card */}
            <LinearGradient
              colors={gradients.hero}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroCard}
            >
              <Text style={styles.heroLabel}>GROSS REVENUE</Text>
              <Text style={styles.heroAmount}>{formatRupee(486200)}</Text>
              <Text style={styles.heroSubtext}>Services & retail</Text>
            </LinearGradient>

            {/* Payroll Card */}
            <View style={styles.whiteCard}>
              <Text style={styles.cardLabel}>PAYROLL</Text>
              <Text style={styles.cardAmount}>{formatRupee(124000)}</Text>
              <Text style={styles.cardSubtext}>Including commission</Text>
            </View>

            {/* Monthly Report - Revenue by Category */}
            <View style={styles.reportCard}>
              <Text style={styles.cardLabel}>MONTHLY REPORT</Text>
              <Text style={styles.reportTitle}>Revenue by category</Text>
              <Text style={styles.reportSubtitle}>
                Hair services continue to lead, contributing 42% of November revenue.
              </Text>

              <TouchableOpacity style={styles.downloadRow}>
                <Text style={styles.downloadLink}>Download report</Text>
                <Ionicons
                  name="arrow-forward"
                  size={12}
                  color={colors.purple}
                  style={{ marginLeft: 4 }}
                />
              </TouchableOpacity>

              {/* Horizontal Bars */}
              <View style={styles.barsContainer}>
                {categoryBars.map((item) => (
                  <View key={item.label} style={styles.barRow}>
                    <Text style={styles.barLabel}>{item.label}</Text>
                    <View style={styles.barTrack}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            width: `${item.percent}%`,
                            backgroundColor:
                              item.percent > 30
                                ? colors.plumDeep
                                : item.percent > 20
                                ? colors.purple
                                : colors.rose,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.barPercent}>{item.percent}%</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ) : (
          /* 2. Payroll & Commission View */
          <View>
            {/* Total Payroll Card */}
            <View style={styles.whiteCard}>
              <Text style={styles.cardLabel}>TOTAL PAYROLL</Text>
              <Text style={styles.cardAmount}>{formatRupee(124000)}</Text>
              <Text style={styles.cardSubtext}>Base salary + commission</Text>
            </View>

            {/* 2-Column Base vs Commission */}
            <View style={styles.twoColumnGrid}>
              <View style={styles.columnCard}>
                <Text style={styles.cardLabel}>BASE SALARY</Text>
                <Text style={styles.columnAmount}>{formatRupee(78000)}</Text>
              </View>
              <View style={styles.columnCard}>
                <Text style={styles.cardLabel}>COMMISSION</Text>
                <Text style={styles.columnAmount}>{formatRupee(46000)}</Text>
                <Text style={styles.cardSubtext}>22% of revenue</Text>
              </View>
            </View>

            {/* Staff Payouts */}
            <View style={styles.reportCard}>
              <Text style={styles.cardLabel}>STAFF PAYOUTS</Text>
              <Text style={styles.reportTitle}>This month</Text>

              {staffPayouts.map((payout) => (
                <View key={payout.id} style={styles.payoutRow}>
                  <View style={styles.payoutAvatar}>
                    <Text style={styles.payoutInitials}>{payout.initials}</Text>
                  </View>
                  <View style={styles.payoutInfo}>
                    <Text style={styles.payoutName}>{payout.name}</Text>
                    <Text style={styles.payoutCommissionText}>
                      {payout.commissionPct}% commission ({formatRupee(payout.commissionAmount)})
                    </Text>
                  </View>
                  <Text style={styles.payoutTotal}>{formatRupee(payout.total)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.lavender,
    
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  headerSection: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  caption: {
    ...typography.captionTracked,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.serifH1,
    fontSize: 28,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#E6DCF0',
    borderRadius: radius.pill,
    padding: 3,
    marginBottom: spacing.lg,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.pill,
  },
  segmentTabActive: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  segmentTextActive: {
    color: colors.plumDeep,
    fontWeight: '700',
  },
  heroCard: {
    borderRadius: radius.card,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  heroLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  heroAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 2,
  },
  heroSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  whiteCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  cardAmount: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.plumDeep,
    marginBottom: 2,
  },
  cardSubtext: {
    fontSize: 11,
    color: colors.textMuted,
  },
  reportCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reportTitle: {
    ...typography.serifH2,
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  reportSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  downloadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  downloadLink: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.purple,
  },
  barsContainer: {
    marginTop: spacing.xs,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  barLabel: {
    width: 60,
    fontSize: 12,
    fontWeight: '600',
    color: colors.plumDeep,
  },
  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: colors.lavender,
    borderRadius: 4,
    marginHorizontal: spacing.sm,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  barPercent: {
    width: 32,
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textAlign: 'right',
  },
  twoColumnGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  columnCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  columnAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.plumDeep,
    marginBottom: 2,
  },
  payoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  payoutAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  payoutInitials: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.purple,
  },
  payoutInfo: {
    flex: 1,
  },
  payoutName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.plumDeep,
    marginBottom: 2,
  },
  payoutCommissionText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  payoutTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.plumDeep,
  },
});
