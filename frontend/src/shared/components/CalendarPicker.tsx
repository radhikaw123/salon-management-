import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { brand, fonts, useTheme, type AppTheme } from '@/shared/theme';

const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const dayKey = (d: Date) => d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate();

type Props = {
  value: Date;
  onChange: (d: Date) => void;
  maxDate?: Date;
  rangeStart?: Date;
  rangeEnd?: Date;
};

// Simple month calendar (Monday first). Highlights the chosen day and the range.
export function CalendarPicker({ value, onChange, maxDate, rangeStart, rangeEnd }: Props) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  const [view, setView] = useState(() => new Date(value.getFullYear(), value.getMonth(), 1));

  useEffect(() => {
    setView(new Date(value.getFullYear(), value.getMonth(), 1));
  }, [value]);

  const year = view.getFullYear();
  const month = view.getMonth();
  const lead = (view.getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: count }, (_, i) => new Date(year, month, i + 1)),
  ];
  while (cells.length % 7) cells.push(null);
  const rows: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  const canGoNext = !maxDate || new Date(year, month + 1, 1) <= maxDate;
  const today = dayKey(new Date());

  return (
    <View>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Previous month"
          hitSlop={10}
          onPress={() => setView(new Date(year, month - 1, 1))}
        >
          <Feather name="chevron-left" size={22} color={t.text} />
        </Pressable>
        <Text style={styles.month}>{MONTHS[month]} {year}</Text>
        <Pressable
          accessibilityLabel="Next month"
          hitSlop={10}
          disabled={!canGoNext}
          onPress={() => setView(new Date(year, month + 1, 1))}
        >
          <Feather name="chevron-right" size={22} color={canGoNext ? t.text : t.divider} />
        </Pressable>
      </View>

      <View style={styles.weekRow}>
        {WEEK.map((w, i) => (
          <Text key={i} style={styles.weekday}>{w}</Text>
        ))}
      </View>

      {rows.map((row, r) => (
        <View key={r} style={styles.weekRow}>
          {row.map((d, c) => {
            if (!d) return <View key={c} style={styles.cell} />;
            const k = dayKey(d);
            const disabled = !!maxDate && k > dayKey(maxDate);
            const selected = k === dayKey(value);
            const inRange =
              !!rangeStart && !!rangeEnd && k >= dayKey(rangeStart) && k <= dayKey(rangeEnd);
            return (
              <Pressable
                key={c}
                accessibilityRole="button"
                accessibilityState={{ selected, disabled }}
                disabled={disabled}
                onPress={() => onChange(d)}
                style={styles.cell}
              >
                <View
                  style={[
                    styles.day,
                    inRange && styles.dayInRange,
                    k === today && styles.dayToday,
                    selected && styles.daySelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      disabled && styles.dayTextDisabled,
                      selected && styles.dayTextSelected,
                    ]}
                  >
                    {d.getDate()}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const makeStyles = (t: AppTheme) => StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  month: { fontFamily: fonts.heading, fontSize: 20, color: t.text },
  weekRow: { flexDirection: 'row' },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.sansMedium,
    fontSize: 11,
    color: t.textMuted,
    paddingBottom: 6,
  },
  cell: { flex: 1, height: 42, alignItems: 'center', justifyContent: 'center' },
  day: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  dayInRange: { backgroundColor: t.accentSoft },
  dayToday: { borderWidth: 1, borderColor: t.accent },
  daySelected: { backgroundColor: brand.purple, borderWidth: 0 },
  dayText: { fontFamily: fonts.sansMedium, fontSize: 14, color: t.text },
  dayTextDisabled: { color: t.divider },
  dayTextSelected: { color: brand.white },
});
