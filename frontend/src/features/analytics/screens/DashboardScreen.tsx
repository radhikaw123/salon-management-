import React from 'react';
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
import {
  mockBusinessPulse,
  mockLiveSchedule,
  formatRupee,
} from '../../../shared/api/mockData';

export const DashboardScreen = ({ navigation }: any) => {
  return (
    <View style={styles.screen}>
      <SalonHeader
        rightActionIcon="arrow-redo-outline"
        onRightActionPress={() => navigation?.navigate('Finance')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Date & Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.dateCaption}>THURSDAY, 14 NOVEMBER</Text>
          <Text style={styles.greetingTitle}>
            Good morning,{'\n'}
            <Text style={{ fontStyle: 'italic', fontWeight: '400' }}>Isabella.</Text>
          </Text>
        </View>

        {/* Business Pulse Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionCaption}>BUSINESS PULSE</Text>
          <TouchableOpacity
            onPress={() => navigation?.navigate('Finance')}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionLink}>View finance</Text>
          </TouchableOpacity>
        </View>

        {/* 1. Hero Card: Gross Revenue */}
        <LinearGradient
          colors={gradients.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroHeaderRow}>
            <Text style={styles.heroLabel}>GROSS REVENUE (THIS MONTH)</Text>
            <View style={styles.badgeSuccess}>
              <Ionicons name="arrow-up" size={12} color={colors.white} />
              <Text style={styles.badgeSuccessText}>
                +{mockBusinessPulse.revenueChangePct}%
              </Text>
            </View>
          </View>
          <Text style={styles.heroAmount}>
            {formatRupee(mockBusinessPulse.revenueThisMonth)}
          </Text>
          <Text style={styles.heroSubtext}>+12.4% vs last month</Text>
        </LinearGradient>

        {/* 2. Owner Income Card */}
        <View style={styles.incomeCard}>
          <Text style={styles.statLabel}>OWNER INCOME</Text>
          <Text style={styles.incomeAmount}>
            {formatRupee(mockBusinessPulse.ownerIncome)}
          </Text>
          <Text style={styles.statSubtext}>After payroll & expenses</Text>
        </View>

        {/* 3. 2x2 Grid: Paid, Unpaid, Active Clients, Staff */}
        <View style={styles.statsGrid}>
          {/* Paid Tickets */}
          <View style={styles.statTile}>
            <View style={styles.statIconBadge}>
              <Ionicons name="receipt-outline" size={14} color={colors.purple} />
            </View>
            <Text style={styles.statLabel}>PAID TICKETS</Text>
            <Text style={styles.statNumber}>{mockBusinessPulse.paidTickets}</Text>
            <Text style={styles.statSubtext}>
              {formatRupee(mockBusinessPulse.paidCollected)} collected
            </Text>
          </View>

          {/* Unpaid Tickets (Darker Accent) */}
          <LinearGradient
            colors={gradients.cardDark}
            style={styles.statTileDark}
          >
            <View style={styles.statIconBadgeDark}>
              <Ionicons name="alert-circle-outline" size={14} color={colors.white} />
            </View>
            <Text style={styles.statLabelDark}>UNPAID TICKETS</Text>
            <Text style={styles.statNumberDark}>
              {mockBusinessPulse.unpaidTickets}
            </Text>
            <Text style={styles.statSubtextDark}>
              {formatRupee(mockBusinessPulse.unpaidOutstanding)} outstanding
            </Text>
          </LinearGradient>

          {/* Active Clients */}
          <View style={styles.statTile}>
            <View style={styles.statIconBadge}>
              <Ionicons name="people-outline" size={14} color={colors.purple} />
            </View>
            <Text style={styles.statLabel}>ACTIVE CLIENTS</Text>
            <Text style={styles.statNumber}>
              {mockBusinessPulse.activeClients.toLocaleString('en-IN')}
            </Text>
            <Text style={styles.statSubtext}>+2.3% this month</Text>
          </View>

          {/* Total Staff */}
          <View style={styles.statTile}>
            <View style={styles.statIconBadge}>
              <Ionicons name="sparkles-outline" size={14} color={colors.purple} />
            </View>
            <Text style={styles.statLabel}>TOTAL STAFF</Text>
            <Text style={styles.statNumber}>{mockBusinessPulse.totalStaff}</Text>
            <Text style={styles.statSubtext}>
              {mockBusinessPulse.staffActiveToday} active today
            </Text>
          </View>
        </View>

        {/* Live Schedule Header */}
        <View style={[styles.sectionHeader, { marginTop: spacing.lg }]}>
          <Text style={styles.sectionCaption}>LIVE SCHEDULE</Text>
          <View style={styles.pillBadge}>
            <Text style={styles.pillBadgeText}>3 of 18</Text>
          </View>
        </View>
        <Text style={styles.scheduleSubtitle}>Coming up</Text>

        {/* Live Appointments List */}
        {mockLiveSchedule.map((item) => (
          <View key={item.id} style={styles.appointmentRow}>
            <View style={styles.timeBlock}>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <View style={styles.appointmentInfo}>
              <Text style={styles.clientName}>{item.clientName}</Text>
              <Text style={styles.serviceText}>
                {item.serviceName} ·{' '}
                <Text style={{ color: colors.purple }}>{item.staffName}</Text>
              </Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons
                name="ellipsis-horizontal"
                size={16}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>
        ))}

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
  greetingSection: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  dateCaption: {
    ...typography.captionTracked,
    marginBottom: spacing.xs,
  },
  greetingTitle: {
    ...typography.serifH1,
    fontSize: 28,
    lineHeight: 34,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionCaption: {
    ...typography.captionTracked,
  },
  sectionLink: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.purple,
  },
  heroCard: {
    borderRadius: radius.card,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  heroLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.5,
  },
  badgeSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  badgeSuccessText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
    marginLeft: 2,
  },
  heroAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  heroSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  incomeCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  incomeAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.plumDeep,
    marginBottom: 2,
  },
  statSubtext: {
    fontSize: 11,
    color: colors.textMuted,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statTile: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statTileDark: {
    width: '48%',
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  statIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: -16,
  },
  statIconBadgeDark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: -16,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.plumDeep,
    marginBottom: 2,
  },
  statLabelDark: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  statNumberDark: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 2,
  },
  statSubtextDark: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
  scheduleSubtitle: {
    ...typography.serifH2,
    fontSize: 20,
    marginBottom: spacing.md,
  },
  pillBadge: {
    backgroundColor: colors.purple,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  pillBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
  },
  appointmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.card,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeBlock: {
    backgroundColor: colors.lavender,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    marginRight: spacing.md,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.purple,
  },
  appointmentInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.plumDeep,
    marginBottom: 2,
  },
  serviceText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  moreButton: {
    padding: spacing.xs,
  },
});
