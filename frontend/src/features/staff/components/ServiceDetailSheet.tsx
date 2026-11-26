import React, { useRef } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { brand, fonts } from '@/shared/theme';
import { BottomSheet } from '@/shared/components/BottomSheet';
import { SheetHeader, SheetSection, SheetRow, sheetContent } from '@/shared/components/SheetParts';
import { formatDateTime, formatDuration, formatRupees } from '../format';
import type { HistoryItem, StaffCustomer } from '../mock';

export type ServiceEntry = { item: HistoryItem; customer: StaffCustomer };
type Props = { entry: ServiceEntry | null; onClose: () => void };

// Popup for one completed service (opened from the history list)
export function ServiceDetailSheet({ entry, onClose }: Props) {
  // keep the last entry so the content stays visible while the sheet slides down
  const last = useRef<ServiceEntry | null>(null);
  if (entry) last.current = entry;
  const shown = entry ?? last.current;

  return (
    <BottomSheet visible={!!entry} onClose={onClose}>
      {shown && (
        <>
          <SheetHeader
            initials={shown.customer.initials}
            badge="COMPLETED"
            title={shown.customer.name}
            subtitle={shown.item.service}
            onClose={onClose}
          />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={sheetContent}>
            <SheetSection title="SERVICE INFORMATION">
              <SheetRow label="Category" value={shown.item.category} />
              <SheetRow divider label="Completed" value={formatDateTime(shown.item.completedAt)} />
              <SheetRow divider label="Actual duration" value={formatDuration(shown.item.durationMin)} />
            </SheetSection>

            <SheetSection title="FINANCIAL SNAPSHOT" tinted>
              <SheetRow label="Service price" value={formatRupees(shown.item.price)} />
              <SheetRow label="Commission at completion" value={`${shown.item.commissionPct}%`} />
              <SheetRow
                label="Commission earned"
                value={formatRupees((shown.item.price * shown.item.commissionPct) / 100)}
              />
              <Text style={styles.note}>These values are locked to the completed service record.</Text>
            </SheetSection>

            <SheetSection title="SERVICE NOTES">
              <Text style={styles.notes}>{shown.item.notes}</Text>
            </SheetSection>
          </ScrollView>
        </>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  note: { fontFamily: fonts.sans, fontSize: 12, color: brand.fieldLabel },
  notes: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: brand.fieldLabel },
});
