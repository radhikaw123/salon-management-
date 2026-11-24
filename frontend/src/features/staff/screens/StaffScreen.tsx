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
} from '../../../shared/api/mockData';

export const StaffScreen = () => {
  const [activeSegment, setActiveSegment] = useState<'team' | 'schedule'>('team');
  const [expandedStaffId, setExpandedStaffId] = useState<string | null>('st_1');

  const toggleExpand = (id: string) => {
    setExpandedStaffId(expandedStaffId === id ? null : id);
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

        {/* 1. Team View */}
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

            {/* Staff List */}
            {mockStaffDirectory.map((member) => (
              <TouchableOpacity
                key={member.id}
                style={styles.staffRow}
                activeOpacity={0.7}
              >
                <View style={styles.staffAvatar}>
                  <Text style={styles.staffInitials}>{member.initials}</Text>
                </View>
                <View style={styles.staffInfo}>
                  <Text style={styles.staffName}>{member.name}</Text>
                  <Text style={styles.staffRole}>{member.role}</Text>
                </View>
                <View style={styles.bookingsPill}>
                  <Text style={styles.bookingsCount}>
                    {member.bookingsThisMonth} bookings
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={14}
                    color={colors.textMuted}
                    style={{ marginLeft: 4 }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* 2. Schedule View */
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
              {mockStaffDirectory.slice(0, 3).map((member) => {
                const isExpanded = expandedStaffId === member.id;
                return (
                  <View key={member.id} style={styles.expandableBlock}>
                    <TouchableOpacity
                      style={styles.expandableHeader}
                      onPress={() => toggleExpand(member.id)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.staffSmallAvatar}>
                        <Text style={styles.staffSmallInitials}>
                          {member.initials}
                        </Text>
                      </View>
                      <Text style={styles.expandableName}>{member.name}</Text>
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
  staffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.card,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  staffAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  staffInitials: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.purple,
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.plumDeep,
    marginBottom: 2,
  },
  staffRole: {
    fontSize: 12,
    color: colors.textMuted,
  },
  bookingsPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingsCount: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  staffSmallInitials: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.purple,
  },
  expandableName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: colors.plumDeep,
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
});
