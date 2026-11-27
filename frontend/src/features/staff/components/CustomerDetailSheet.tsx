import React, { useMemo } from 'react';
import { Modal, View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { brand, fonts, useTheme, type AppTheme } from '@/shared/theme';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { staffSummary, type StaffCustomer } from '../mock';

type Props = { customer: StaffCustomer | null; onClose: () => void };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function IconRow({ icon, value }: { icon: 'mail' | 'phone'; value: string }) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  return (
    <View style={styles.row}>
      <Feather name={icon} size={16} color={t.textMuted} />
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export function CustomerDetailSheet({ customer, onClose }: Props) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={!!customer}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable
          accessibilityLabel="Close details"
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />

        {customer && (
          <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
            <View style={styles.handle} />

            <View style={styles.header}>
              <LinearGradient
                colors={[brand.logoTo, brand.purple]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>{customer.initials}</Text>
              </LinearGradient>

              <View style={styles.headerText}>
                <StatusBadge label="ALLOCATED TO YOU" />
                <Text style={styles.name}>{customer.name}</Text>
                <View style={styles.phoneRow}>
                  <Feather name="phone" size={13} color={t.textMuted} />
                  <Text style={styles.phone}>{customer.phone}</Text>
                </View>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close"
                onPress={onClose}
                style={styles.close}
              >
                <Feather name="x" size={18} color={t.text} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
              <Section title="PERSONAL INFORMATION">
                <IconRow icon="mail" value={customer.email} />
                <IconRow icon="phone" value={customer.phone} />
              </Section>

              <Section title="CUSTOMER ALLOCATION">
                <Row label="Assigned employee" value={staffSummary.staffName} />
                <Row label="Employee ID" value={staffSummary.employeeId} />
              </Section>

              <Section title="SERVICE PREFERENCES">
                <Row label="Frequently booked" value={customer.favoriteService} />
                <Text style={styles.preference}>Preference: {customer.preference}</Text>
              </Section>

              <Section title="VISIT HISTORY">
                <Row label="Total visits" value={String(customer.totalVisits)} />
                <Row label="Last visit" value={customer.lastVisit} />
                <Row label="Next appointment" value={customer.nextAppointment} />
              </Section>

              <Section title="PREVIOUS SERVICES">
                {customer.previousServices.map((s, i) => (
                  <View key={`${s.name}-${s.date}`}>
                    {i > 0 && <View style={styles.divider} />}
                    <View style={styles.row}>
                      <Text style={styles.prevName}>{s.name}</Text>
                      <Text style={styles.prevDate}>{s.date}</Text>
                      <Text style={styles.prevStatus}>COMPLETED</Text>
                    </View>
                  </View>
                ))}
              </Section>
            </ScrollView>
          </View>
        )}
      </View>
    </Modal>
  );
}

const makeStyles = (t: AppTheme) => StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(43, 10, 59, 0.45)' },
  sheet: {
    maxHeight: '90%',
    backgroundColor: t.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: t.divider,
    marginBottom: 14,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 72, height: 72, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.heading, fontSize: 26, color: brand.white },
  headerText: { flex: 1, gap: 2 },
  name: { fontFamily: fonts.heading, fontSize: 28, color: t.text },
  phoneRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  phone: { fontFamily: fonts.sans, fontSize: 13, color: t.textMuted },
  close: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.accentSoft,
  },
  content: { paddingTop: 16, paddingBottom: 8, gap: 12 },
  section: {
    backgroundColor: t.surface,
    borderRadius: 20,
    padding: 16,
    gap: 12,
    boxShadow: '0px 4px 12px rgba(104, 51, 124, 0.08)',
  },
  sectionTitle: { fontFamily: fonts.sansMedium, fontSize: 10, letterSpacing: 1.5, color: t.textMuted },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  rowLabel: { fontFamily: fonts.sans, fontSize: 14, color: t.textMuted },
  rowValue: { fontFamily: fonts.sansBold, fontSize: 14, color: t.text },
  preference: { fontFamily: fonts.sans, fontSize: 13, color: t.textMuted },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: t.divider, marginVertical: 10 },
  prevName: { flex: 1, fontFamily: fonts.sansMedium, fontSize: 14, color: t.text },
  prevDate: { fontFamily: fonts.sans, fontSize: 13, color: t.textMuted },
  prevStatus: { fontFamily: fonts.sansBold, fontSize: 9, letterSpacing: 1, color: t.accent },
});
