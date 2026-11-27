import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types';
import { colors, gradients, spacing, radius, typography } from '../../../shared/theme';
import {
  mockStaffBookingsMap,
  StaffBookingItem,
  formatRupee,
} from '../../../shared/api/mockData';

type Props = NativeStackScreenProps<RootStackParamList, 'StaffBookingsDetail'>;

type StatusFilter = 'All' | 'Completed' | 'In Progress' | 'Upcoming';

export const StaffBookingsDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { staffId, staffName, staffRole, initials, totalBookings } = route.params;

  const [activeFilter, setActiveFilter] = useState<StatusFilter>('All');

  // Retrieve bookings for this staff member (or default sample bookings if new)
  const allBookings: StaffBookingItem[] = useMemo(() => {
    if (mockStaffBookingsMap[staffId]) {
      return mockStaffBookingsMap[staffId];
    }
    // Fallback bookings for new or unmapped staff members
    return [
      { id: 'b_f1', clientName: 'Sophia Miller', serviceName: 'Classic Haircut & Blowdry', time: '10:00 AM', duration: '45m', price: 1200, status: 'Completed' },
      { id: 'b_f2', clientName: 'Zara Khan', serviceName: 'Global Gloss & Refresh', time: '01:30 PM', duration: '1h 30m', price: 3200, status: 'In Progress' },
      { id: 'b_f3', clientName: 'Kriti Sharma', serviceName: 'Deep Conditioning Ritual', time: '04:00 PM', duration: '45m', price: 2100, status: 'Upcoming' },
    ];
  }, [staffId]);

  // Filter bookings
  const filteredBookings = useMemo(() => {
    if (activeFilter === 'All') return allBookings;
    return allBookings.filter((b) => b.status === activeFilter);
  }, [allBookings, activeFilter]);

  // Total earnings calculated from completed & in-progress
  const totalRevenue = useMemo(() => {
    return allBookings.reduce((sum, b) => sum + b.price, 0);
  }, [allBookings]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      {/* Top Navigation Bar with Back Button */}
      <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 20) + spacing.xs }]}>
        <TouchableOpacity
          style={styles.backButtonCircle}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={20} color={colors.plumDeep} />
        </TouchableOpacity>

        <View style={styles.navTitleContainer}>
          <Text style={styles.navEyebrow}>STAFF SCHEDULE & CLIENTS</Text>
          <Text style={styles.navTitle}>{staffName}</Text>
        </View>

        <View style={styles.topRightPill}>
          <Text style={styles.topRightPillText}>{totalBookings || allBookings.length} bookings</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Staff Profile Luxury Hero Card */}
        <LinearGradient
          colors={gradients.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileHeroCard}
        >
          <View style={styles.profileHeroRow}>
            {/* Initials Avatar Box */}
            <View style={styles.avatarCircleLarge}>
              <Text style={styles.avatarInitialsText}>{initials || staffName.slice(0, 2).toUpperCase()}</Text>
            </View>

            {/* Staff Details */}
            <View style={styles.profileHeroInfo}>
              <Text style={styles.profileStaffName}>{staffName}</Text>
              <View style={styles.roleTagPill}>
                <Text style={styles.roleTagText}>{staffRole}</Text>
              </View>
            </View>
          </View>

          {/* Metrics Row Inside Hero */}
          <View style={styles.heroMetricsGrid}>
            <View style={styles.heroMetricItem}>
              <Text style={styles.heroMetricValue}>{allBookings.length}</Text>
              <Text style={styles.heroMetricLabel}>Today's Clients</Text>
            </View>
            <View style={styles.heroMetricDivider} />
            <View style={styles.heroMetricItem}>
              <Text style={styles.heroMetricValue}>{formatRupee(totalRevenue)}</Text>
              <Text style={styles.heroMetricLabel}>Booked Value</Text>
            </View>
            <View style={styles.heroMetricDivider} />
            <View style={styles.heroMetricItem}>
              <Text style={styles.heroMetricValue}>4.9 ★</Text>
              <Text style={styles.heroMetricLabel}>Client Rating</Text>
            </View>
          </View>
        </LinearGradient>

        {/* 2. Filter Status Chips */}
        <View style={styles.filterRow}>
          {(['All', 'Completed', 'In Progress', 'Upcoming'] as StatusFilter[]).map((tab) => {
            const isActive = activeFilter === tab;
            const count = tab === 'All' ? allBookings.length : allBookings.filter((b) => b.status === tab).length;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setActiveFilter(tab)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                  {tab} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 3. Section Title */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>
            {activeFilter === 'All' ? 'All Client Appointments' : `${activeFilter} Appointments`}
          </Text>
          <Text style={styles.sectionCountText}>{filteredBookings.length} clients</Text>
        </View>

        {/* 4. Bookings Container Card */}
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="calendar-outline" size={32} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No {activeFilter.toLowerCase()} appointments</Text>
            <Text style={styles.emptySubtitle}>There are currently no clients matching this status.</Text>
          </View>
        ) : (
          <View style={styles.bookingsContainerCard}>
            {filteredBookings.map((booking, index) => {
              const isLast = index === filteredBookings.length - 1;
              return (
                <View
                  key={booking.id}
                  style={[styles.bookingItemRow, !isLast && styles.bookingItemDivider]}
                >
                  {/* Client Initial Avatar Box */}
                  <View style={styles.clientAvatarBox}>
                    <Text style={styles.clientAvatarLetter}>
                      {booking.clientName.charAt(0)}
                    </Text>
                  </View>

                  {/* Booking Info */}
                  <View style={styles.bookingMainInfo}>
                    <Text style={styles.clientNameText}>{booking.clientName}</Text>
                    <Text style={styles.serviceNameText}>{booking.serviceName}</Text>
                    <View style={styles.timeScheduleRow}>
                      <Ionicons name="time-outline" size={12} color={colors.textMuted} />
                      <Text style={styles.timeScheduleText}>
                        {booking.time} · {booking.duration}
                      </Text>
                    </View>
                  </View>

                  {/* Price and Status Badge */}
                  <View style={styles.bookingRightColumn}>
                    <Text style={styles.priceAmountText}>
                      {formatRupee(booking.price)}
                    </Text>
                    <View
                      style={[
                        styles.statusPill,
                        booking.status === 'Completed' && styles.statusCompleted,
                        booking.status === 'In Progress' && styles.statusInProgress,
                        booking.status === 'Upcoming' && styles.statusUpcoming,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusPillText,
                          booking.status === 'Completed' && styles.statusCompletedText,
                          booking.status === 'In Progress' && styles.statusInProgressText,
                          booking.status === 'Upcoming' && styles.statusUpcomingText,
                        ]}
                      >
                        {booking.status}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.lavender,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    backgroundColor: colors.lavender,
  },
  backButtonCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  navTitleContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  navEyebrow: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#9C7866',
    letterSpacing: 1.2,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.plumDeep,
    letterSpacing: -0.2,
  },
  topRightPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: '#E6DCD2',
  },
  topRightPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.plumDeep,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  profileHeroCard: {
    borderRadius: radius.card,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  profileHeroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarCircleLarge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    marginRight: spacing.md,
  },
  avatarInitialsText: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 0.5,
  },
  profileHeroInfo: {
    flex: 1,
  },
  profileStaffName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  roleTagPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  roleTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.white,
  },
  heroMetricsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  heroMetricItem: {
    flex: 1,
    alignItems: 'center',
  },
  heroMetricDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  heroMetricValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 2,
  },
  heroMetricLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.md,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: '#E6DCD2',
  },
  filterChipActive: {
    backgroundColor: colors.plumDeep,
    borderColor: colors.plumDeep,
  },
  filterChipText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.plumDeep,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.plumDeep,
  },
  sectionCountText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  bookingsContainerCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  bookingItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  bookingItemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5ECE5',
  },
  clientAvatarBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F6ECE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  clientAvatarLetter: {
    fontSize: 17,
    fontWeight: '700',
    color: '#8A583B',
  },
  bookingMainInfo: {
    flex: 1,
  },
  clientNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  serviceNameText: {
    fontSize: 12,
    color: colors.purple,
    fontWeight: '600',
    marginBottom: 3,
  },
  timeScheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeScheduleText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  bookingRightColumn: {
    alignItems: 'flex-end',
    marginLeft: spacing.sm,
  },
  priceAmountText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statusPill: {
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: radius.pill,
  },
  statusCompleted: {
    backgroundColor: 'rgba(62, 142, 107, 0.12)',
  },
  statusInProgress: {
    backgroundColor: 'rgba(182, 89, 91, 0.14)',
  },
  statusUpcoming: {
    backgroundColor: 'rgba(104, 51, 124, 0.12)',
  },
  statusPillText: {
    fontSize: 9.5,
    fontWeight: '700',
  },
  statusCompletedText: {
    color: colors.success,
  },
  statusInProgressText: {
    color: colors.rose,
  },
  statusUpcomingText: {
    color: colors.purple,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.plumDeep,
    marginTop: spacing.sm,
    marginBottom: 2,
  },
  emptySubtitle: {
    fontSize: 11.5,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
