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
import {
  mockStaffDirectory,
  mockMayaSchedule,
  mockStaffBookings,
  StaffCustomerBooking,
  formatRupee,
} from '../../../shared/api/mockData';

export const StaffScreen = () => {
  const [activeSegment, setActiveSegment] = useState<'team' | 'schedule'>('team');
  const [expandedTeamStaffId, setExpandedTeamStaffId] = useState<string | null>('st_1');
  const [expandedScheduleStaffId, setExpandedScheduleStaffId] = useState<string | null>('st_1');

  const toggleTeamExpand = (id: string) => {
    setExpandedTeamStaffId(expandedTeamStaffId === id ? null : id);
  };

  const toggleScheduleExpand = (id: string) => {
    setExpandedScheduleStaffId(expandedScheduleStaffId === id ? null : id);
  };

  return (
    <View style={styles.screen}>
      <SalonHeader
        rightActionIcon="add-outline"
        onRightActionPress={() => {}}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <View style={styles.headerSection}>
          <Text style={styles.caption}>PEOPLE & PERFORMANCE</Text>
          <Text style={styles.title}>
            Your <Text style={{ fontStyle: 'italic', fontWeight: '400' }}>dream team.</Text>
          </Text>
        </View>

        {/* Segmented Control */}
        <View style={styles.segmentedContainer}>
          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeSegment === 'team' && styles.segmentTabActive,
            ]}
            onPress={() => setActiveSegment('team')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.segmentText,
                activeSegment === 'team' && styles.segmentTextActive,
              ]}
            >
              Team
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeSegment === 'schedule' && styles.segmentTabActive,
            ]}
            onPress={() => setActiveSegment('schedule')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.segmentText,
                activeSegment === 'schedule' && styles.segmentTextActive,
              ]}
            >
              Schedule
            </Text>
          </TouchableOpacity>
        </View>

        {/* ============================================================ */}
        {/* 1. TEAM DIRECTORY VIEW                                       */}
        {/* ============================================================ */}
        {activeSegment === 'team' ? (
          <View>
            {/* Utilization Hero Card */}
            <LinearGradient
              colors={gradients.hero}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.utilizationCard}
            >
              <View style={styles.utilizationLeft}>
                <Text style={styles.utilLabel}>TEAM UTILIZATION</Text>
                <Text style={styles.utilNumber}>84%</Text>
                <Text style={styles.utilSubtext}>+5% this month</Text>
              </View>

              {/* Progress Ring Visual */}
              <View style={styles.ringOuter}>
                <View style={styles.ringInner}>
                  <Text style={styles.ringText}>84%</Text>
                </View>
              </View>
            </LinearGradient>

            {/* Team Directory Header */}
            <View style={styles.directoryHeaderRow}>
              <View>
                <Text style={styles.subCaption}>TEAM DIRECTORY</Text>
                <Text style={styles.subTitle}>12 salon professionals</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.manageRolesLink}>Manage roles</Text>
              </TouchableOpacity>
            </View>

            {/* Staff List with expandable Customers & Services */}
            {mockStaffDirectory.map((member) => {
              const isExpanded = expandedTeamStaffId === member.id;
              const bookings: StaffCustomerBooking[] = mockStaffBookings[member.id] || [];

              return (
                <View key={member.id} style={styles.staffCardWrapper}>
                  {/* Card Header matching Image 2 */}
                  <TouchableOpacity
                    style={styles.staffRow}
                    activeOpacity={0.7}
                    onPress={() => toggleTeamExpand(member.id)}
                  >
                    {/* Left vertical accent bar */}
                    <View style={styles.verticalBar} />

                    {/* Staff Name and Role */}
                    <View style={styles.staffInfo}>
                      <Text style={styles.staffName}>{member.name}</Text>
                      <Text style={styles.staffRole}>{member.role}</Text>
                    </View>

                    {/* Bookings Count Block */}
                    <View style={styles.bookingsCountBlock}>
                      <Text style={styles.bookingsCountNumber}>
                        {member.bookingsThisMonth}
                      </Text>
                      <Text style={styles.bookingsCountLabel}>bookings</Text>
                    </View>

                    {/* Circle Chevron Button */}
                    <View style={styles.chevronCircle}>
                      <Ionicons
                        name={isExpanded ? 'chevron-down' : 'chevron-forward'}
                        size={15}
                        color={colors.plumDeep}
                      />
                    </View>
                  </TouchableOpacity>

                  {/* Expanded Customer Names & Services Section */}
                  {isExpanded && (
                    <View style={styles.customerListSection}>
                      <View style={styles.customerSectionHeader}>
                        <Text style={styles.customerSectionTitle}>
                          CUSTOMER APPOINTMENTS ({bookings.length})
                        </Text>
                        <Text style={styles.customerSectionSubtitle}>
                          Active bookings & services
                        </Text>
                      </View>

                      {bookings.length === 0 ? (
                        <Text style={styles.noBookingsText}>No current bookings for today.</Text>
                      ) : (
                        bookings.map((booking) => (
                          <View key={booking.id} style={styles.bookingRow}>
                            {/* Customer Avatar Circle */}
                            <View style={styles.customerAvatar}>
                              <Text style={styles.customerAvatarText}>
                                {booking.clientName.charAt(0)}
                              </Text>
                            </View>

                            {/* Customer Name & Booked Service */}
                            <View style={styles.bookingDetails}>
                              <Text style={styles.customerNameText}>{booking.clientName}</Text>
                              <Text style={styles.serviceNameText}>{booking.serviceName}</Text>
                              <View style={styles.timeRow}>
                                <Ionicons name="time-outline" size={11} color={colors.textMuted} />
                                <Text style={styles.timeText}>
                                  {booking.time} · {booking.duration}
                                </Text>
                              </View>
                            </View>

                            {/* Price & Status */}
                            <View style={styles.bookingRightBlock}>
                              <Text style={styles.priceText}>
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
                                    styles.statusText,
                                    booking.status === 'Completed' && styles.statusTextCompleted,
                                    booking.status === 'In Progress' && styles.statusTextInProgress,
                                    booking.status === 'Upcoming' && styles.statusTextUpcoming,
                                  ]}
                                >
                                  {booking.status}
                                </Text>
                              </View>
                            </View>
                          </View>
                        ))
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        ) : (
          /* ============================================================ */
          /* 2. SCHEDULE VIEW                                             */
          /* ============================================================ */
          <View>
            <View style={styles.scheduleCard}>
              <View style={styles.scheduleHeaderRow}>
                <View>
                  <Text style={styles.subCaption}>20 - 26 NOVEMBER</Text>
                  <Text style={styles.subTitle}>Weekly allocation</Text>
                </View>
                <View style={styles.weekArrowRow}>
                  <TouchableOpacity style={styles.arrowCircle}>
                    <Ionicons name="chevron-back" size={14} color={colors.plumDeep} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.arrowCircle}>
                    <Ionicons name="chevron-forward" size={14} color={colors.plumDeep} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Expandable Staff Member Schedule */}
              {mockStaffDirectory.slice(0, 4).map((member) => {
                const isExpanded = expandedScheduleStaffId === member.id;
                const bookings: StaffCustomerBooking[] = mockStaffBookings[member.id] || [];

                return (
                  <View key={member.id} style={styles.expandableBlock}>
                    <TouchableOpacity
                      style={styles.expandableHeader}
                      onPress={() => toggleScheduleExpand(member.id)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.staffSmallAvatar}>
                        <Text style={styles.staffSmallInitials}>
                          {member.initials}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.expandableName}>{member.name}</Text>
                        <Text style={styles.expandableRoleText}>{member.role}</Text>
                      </View>
                      <Ionicons
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color={colors.purple}
                      />
                    </TouchableOpacity>

                    {isExpanded && (
                      <View style={styles.shiftsContainer}>
                        {mockMayaSchedule.map((shift) => (
                          <View key={shift.day} style={styles.shiftRow}>
                            <Text style={styles.shiftDay}>{shift.day}</Text>
                            <Text style={styles.shiftHours}>{shift.hours}</Text>
                            <Text style={styles.shiftClients}>
                              {shift.clients} clients
                            </Text>
                          </View>
                        ))}

                        {/* Customer overview inside schedule */}
                        <View style={styles.scheduleCustomersBox}>
                          <Text style={styles.scheduleCustomersTitle}>Assigned Client Queue</Text>
                          {bookings.slice(0, 3).map((b) => (
                            <View key={b.id} style={styles.scheduleCustomerRow}>
                              <Text style={styles.scheduleCustomerName}>{b.clientName}</Text>
                              <Text style={styles.scheduleServiceName}>{b.serviceName}</Text>
                              <Text style={styles.scheduleTimeTag}>{b.time}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
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
  utilizationCard: {
    borderRadius: radius.card,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  utilizationLeft: {
    flex: 1,
  },
  utilLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  utilNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 2,
  },
  utilSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  ringOuter: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  directoryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },
  subCaption: {
    ...typography.captionTracked,
    fontSize: 10,
    marginBottom: 2,
  },
  subTitle: {
    ...typography.serifH2,
    fontSize: 18,
  },
  manageRolesLink: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.purple,
  },
  staffCardWrapper: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  staffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  verticalBar: {
    width: 3.5,
    height: 24,
    borderRadius: 2,
    backgroundColor: colors.plumDeep,
    marginRight: 10,
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.plumDeep,
    letterSpacing: -0.2,
  },
  staffRole: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  bookingsCountBlock: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  bookingsCountNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.plumDeep,
  },
  bookingsCountLabel: {
    fontSize: 9.5,
    color: colors.textMuted,
    marginTop: -2,
  },
  chevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1EAF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerListSection: {
    backgroundColor: '#FAF6FC',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  customerSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingTop: 4,
  },
  customerSectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.purple,
    letterSpacing: 1,
  },
  customerSectionSubtitle: {
    fontSize: 10,
    color: colors.textMuted,
  },
  noBookingsText: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
    paddingVertical: spacing.sm,
    textAlign: 'center',
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.sm,
    borderRadius: radius.md,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#EFE7F5',
  },
  customerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F6ECDB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  customerAvatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8A583B',
  },
  bookingDetails: {
    flex: 1,
  },
  customerNameText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.plumDeep,
  },
  serviceNameText: {
    fontSize: 11.5,
    color: colors.purple,
    fontWeight: '600',
    marginTop: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  timeText: {
    fontSize: 10,
    color: colors.textMuted,
  },
  bookingRightBlock: {
    alignItems: 'flex-end',
    marginLeft: spacing.sm,
  },
  priceText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.plumDeep,
    marginBottom: 3,
  },
  statusPill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  statusCompleted: {
    backgroundColor: 'rgba(62, 142, 107, 0.15)',
  },
  statusInProgress: {
    backgroundColor: 'rgba(182, 89, 91, 0.15)',
  },
  statusUpcoming: {
    backgroundColor: 'rgba(104, 51, 124, 0.12)',
  },
  statusText: {
    fontSize: 9.5,
    fontWeight: '700',
  },
  statusTextCompleted: {
    color: colors.success,
  },
  statusTextInProgress: {
    color: colors.rose,
  },
  statusTextUpcoming: {
    color: colors.purple,
  },
  scheduleCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  scheduleHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  weekArrowRow: {
    flexDirection: 'row',
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.xs,
  },
  expandableBlock: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.md,
  },
  expandableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  staffSmallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  staffSmallInitials: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.purple,
  },
  expandableName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.plumDeep,
  },
  expandableRoleText: {
    fontSize: 10.5,
    color: colors.textMuted,
  },
  shiftsContainer: {
    backgroundColor: colors.lavender,
    borderRadius: radius.card,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  shiftRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  shiftDay: {
    width: 38,
    fontSize: 12,
    fontWeight: '700',
    color: colors.purple,
  },
  shiftHours: {
    flex: 1,
    fontSize: 12,
    color: colors.plumDeep,
  },
  shiftClients: {
    fontSize: 11,
    color: colors.textMuted,
  },
  scheduleCustomersBox: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginTop: spacing.sm,
  },
  scheduleCustomersTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.purple,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  scheduleCustomerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0EAF5',
  },
  scheduleCustomerName: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.plumDeep,
  },
  scheduleServiceName: {
    fontSize: 11,
    color: colors.textMuted,
  },
  scheduleTimeTag: {
    fontSize: 10,
    color: colors.purple,
    fontWeight: '600',
  },
});
