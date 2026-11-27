import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { brand, fonts, useTheme, type AppTheme } from '@/shared/theme';
import { BottomSheet } from '@/shared/components/BottomSheet';
import { SheetHeader, sheetContent } from '@/shared/components/SheetParts';
import { CalendarPicker } from '@/shared/components/CalendarPicker';
import { GradientButton } from '@/shared/components/GradientButton';
import { PressableScale } from '@/shared/components/PressableScale';
import { addDays, endOfDay, startOfDay, type DateRange } from '../earnings';
import { formatFullDate } from '../format';

type Props = {
  visible: boolean;
  initial: DateRange | null;
  onApply: (range: DateRange) => void;
  onClose: () => void;
};

type Field = 'from' | 'to';

function DateField({ label, date, active, onPress }: { label: string; date: Date; active: boolean; onPress: () => void }) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={`${label} date ${formatFullDate(date)}`}
      onPress={onPress}
      style={[styles.field, active && styles.fieldActive]}
    >
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{formatFullDate(date)}</Text>
    </PressableScale>
  );
}

// Popup to choose a From and To date for the earnings range
export function DateRangeSheet({ visible, initial, onApply, onClose }: Props) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  const today = new Date();
  const [from, setFrom] = useState(() => addDays(startOfDay(today), -6));
  const [to, setTo] = useState(() => startOfDay(today));
  const [active, setActive] = useState<Field>('from');

  useEffect(() => {
    if (!visible) return;
    const now = new Date();
    setFrom(initial ? startOfDay(initial.start) : addDays(startOfDay(now), -6));
    setTo(initial ? startOfDay(initial.end) : startOfDay(now));
    setActive('from');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const pick = (d: Date) => {
    if (active === 'from') {
      setFrom(d);
      if (d > to) setTo(d);
      setActive('to');
    } else if (d < from) {
      setFrom(d); // picked an earlier "to": use it as the start instead
    } else {
      setTo(d);
    }
  };

  const days = Math.round((to.getTime() - from.getTime()) / 86400000) + 1;

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <SheetHeader title="Custom range" subtitle="Choose a start and end date" onClose={onClose} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={sheetContent}>
        <View style={styles.fields}>
          <DateField label="FROM" date={from} active={active === 'from'} onPress={() => setActive('from')} />
          <DateField label="TO" date={to} active={active === 'to'} onPress={() => setActive('to')} />
        </View>

        <View style={styles.calendar}>
          <CalendarPicker
            value={active === 'from' ? from : to}
            onChange={pick}
            maxDate={today}
            rangeStart={from}
            rangeEnd={to}
          />
        </View>

        <Text style={styles.count}>{days} {days === 1 ? 'day' : 'days'} selected</Text>
        <GradientButton
          title="Apply range"
          onPress={() => onApply({ start: startOfDay(from), end: endOfDay(to) })}
        />
      </ScrollView>
    </BottomSheet>
  );
}

const makeStyles = (t: AppTheme) => StyleSheet.create({
  fields: { flexDirection: 'row', gap: 12 },
  field: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    backgroundColor: t.surface,
    borderWidth: 1.5,
    borderColor: 'transparent',
    boxShadow: '0px 4px 12px rgba(104, 51, 124, 0.1)',
  },
  fieldActive: { borderColor: brand.purple },
  fieldLabel: { fontFamily: fonts.sansMedium, fontSize: 10, letterSpacing: 1.5, color: t.textMuted },
  fieldValue: { fontFamily: fonts.sansBold, fontSize: 16, color: t.text, marginTop: 4 },
  calendar: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: t.surface,
    boxShadow: '0px 4px 12px rgba(104, 51, 124, 0.08)',
  },
  count: { fontFamily: fonts.sans, fontSize: 13, color: t.textMuted, textAlign: 'center' },
});
