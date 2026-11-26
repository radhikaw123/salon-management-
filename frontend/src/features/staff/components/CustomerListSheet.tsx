import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { brand, fonts } from '@/shared/theme';
import { BottomSheet } from '@/shared/components/BottomSheet';
import { SheetHeader, SheetSection, sheetContent } from '@/shared/components/SheetParts';
import { mockAppointments, mockStaffCustomers, type UpcomingAppointment } from '../mock';

export type ListKind = 'upcoming' | 'total';
type Props = { kind: ListKind | null; onClose: () => void };

type PersonProps = {
  initials: string;
  name: string;
  subtitle: string;
  trailing: string;
  divider?: boolean;
};

function PersonRow({ initials, name, subtitle, trailing, divider = false }: PersonProps) {
  return (
    <View style={[styles.row, divider && styles.rowDivider]}>
      <LinearGradient
        colors={[brand.logoTo, brand.purple]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.avatar}
      >
        <Text style={styles.initials}>{initials}</Text>
      </LinearGradient>
      <View style={styles.rowText}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.trailing}>{trailing}</Text>
    </View>
  );
}

function Appointments({ title, items }: { title: string; items: UpcomingAppointment[] }) {
  return (
    <SheetSection title={`${title} · ${items.length}`}>
      {items.length === 0 ? (
        <Text style={styles.subtitle}>No appointments</Text>
      ) : (
        items.map((a, i) => (
          <PersonRow
            key={a.id}
            divider={i > 0}
            initials={a.initials}
            name={a.name}
            subtitle={a.service}
            trailing={a.time}
          />
        ))
      )}
    </SheetSection>
  );
}

// Popup list opened from the Upcoming and Total customers cards
export function CustomerListSheet({ kind, onClose }: Props) {
  const last = useRef<ListKind | null>(null);
  if (kind) last.current = kind;
  const shown = kind ?? last.current;

  const completed = mockStaffCustomers.filter((c) => c.totalVisits >= 5);

  return (
    <BottomSheet visible={!!kind} onClose={onClose}>
      {shown && (
        <>
          <SheetHeader
            title={shown === 'upcoming' ? 'Upcoming customers' : 'Total customers'}
            subtitle={
              shown === 'upcoming'
                ? 'Today’s appointments first, then tomorrow'
                : 'Customers with 5+ completed visits'
            }
            onClose={onClose}
          />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={sheetContent}>
            {shown === 'upcoming' ? (
              <>
                <Appointments title="TODAY" items={mockAppointments.filter((a) => a.day === 'today')} />
                <Appointments title="TOMORROW" items={mockAppointments.filter((a) => a.day === 'tomorrow')} />
              </>
            ) : (
              <SheetSection title={`COMPLETED CUSTOMERS · ${completed.length}`}>
                {completed.map((c, i) => (
                  <PersonRow
                    key={c.id}
                    divider={i > 0}
                    initials={c.initials}
                    name={c.name}
                    subtitle={`${c.totalVisits} completed visits`}
                    trailing={c.lastVisit}
                  />
                ))}
              </SheetSection>
            )}
          </ScrollView>
        </>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(85, 46, 81, 0.25)',
    paddingTop: 12,
  },
  avatar: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  initials: { fontFamily: fonts.heading, fontSize: 16, color: brand.white },
  rowText: { flex: 1 },
  name: { fontFamily: fonts.heading, fontSize: 18, color: brand.plumDeep },
  subtitle: { fontFamily: fonts.sans, fontSize: 13, color: brand.fieldLabel },
  trailing: { fontFamily: fonts.sansBold, fontSize: 13, color: brand.purple },
});
