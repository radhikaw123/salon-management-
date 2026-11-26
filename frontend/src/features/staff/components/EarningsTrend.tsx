import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, Easing, StyleSheet } from 'react-native';
import { brand, fonts } from '@/shared/theme';
import { formatRupees } from '../format';
import type { Bucket } from '../earnings';

const CHART_H = 170;
const TIP_W = 190;

type Props = {
  buckets: Bucket[];
  highlightIndex: number; // the "today" bar
  title: string;
  total: number;
  servicesCount: number;
  averageLabel: string;
};

function Bar({ value, max, selected, delay }: { value: number; max: number; selected: boolean; delay: number }) {
  const h = useRef(new Animated.Value(0)).current;
  const target = (max > 0 ? Math.max(value / max, 0.1) : 0.1) * CHART_H;

  useEffect(() => {
    Animated.timing(h, {
      toValue: target,
      duration: 650,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [h, target, delay]);

  return <Animated.View style={[styles.bar, { height: h }, selected ? styles.barSelected : styles.barIdle]} />;
}

function Tooltip({ bucket, left }: { bucket: Bucket; left: number }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, { toValue: 1, duration: 180, useNativeDriver: true }).start();
  }, [v]);

  const shown = bucket.entries.slice(0, 4);
  const more = bucket.entries.length - shown.length;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.tip,
        {
          left,
          opacity: v,
          transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
        },
      ]}
    >
      <Text style={styles.tipHeading}>{bucket.heading}</Text>
      {shown.length === 0 ? (
        <Text style={styles.tipMuted}>No completed services</Text>
      ) : (
        shown.map((e) => (
          <View key={e.item.id} style={styles.tipRow}>
            <Text style={styles.tipName} numberOfLines={1}>{e.customerName}</Text>
            <Text style={styles.tipAmount}>{formatRupees(e.commission)}</Text>
          </View>
        ))
      )}
      {more > 0 && <Text style={styles.tipMuted}>+{more} more</Text>}
    </Animated.View>
  );
}

export function EarningsTrend({ buckets, highlightIndex, title, total, servicesCount, averageLabel }: Props) {
  const [tip, setTip] = useState<number | null>(null);
  const [width, setWidth] = useState(0);

  const max = Math.max(0, ...buckets.map((b) => b.total));
  const active = tip ?? highlightIndex;
  const colW = buckets.length ? width / buckets.length : 0;
  const tipLeft = tip === null ? 0 : Math.min(Math.max((tip + 0.5) * colW - TIP_W / 2, 0), Math.max(width - TIP_W, 0));

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>EARNINGS TREND</Text>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.total}>{formatRupees(total)}</Text>
      </View>

      <View style={styles.chart} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
        <View style={styles.bars}>
          {buckets.map((b, i) => (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityLabel={`${b.heading}, ${formatRupees(b.total)}, show customers`}
              onPress={() => setTip((t) => (t === i ? null : i))}
              style={styles.col}
            >
              <Bar value={b.total} max={max} selected={i === active} delay={i * 60} />
            </Pressable>
          ))}
        </View>
        {tip !== null && width > 0 && <Tooltip key={tip} bucket={buckets[tip]} left={tipLeft} />}
      </View>

      <View style={styles.labels}>
        {buckets.map((b, i) => (
          <Text key={i} style={[styles.label, i === active && styles.labelActive]}>{b.label}</Text>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{servicesCount} services completed</Text>
        <Text style={styles.footerText}>{averageLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: brand.white,
    borderRadius: 26,
    padding: 20,
    boxShadow: '0px 10px 24px rgba(104, 51, 124, 0.16)',
  },
  eyebrow: { fontFamily: fonts.sans, fontSize: 10, letterSpacing: 2, color: brand.fieldLabel },
  titleRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 6 },
  title: { fontFamily: fonts.heading, fontSize: 30, color: brand.plumDeep },
  total: { fontFamily: fonts.heading, fontSize: 26, color: brand.plumDeep },
  chart: { height: CHART_H, marginTop: 18 },
  bars: { flexDirection: 'row', height: CHART_H },
  col: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 4 },
  bar: { width: '100%', borderRadius: 14 },
  barIdle: { backgroundColor: 'rgba(104, 51, 124, 0.12)' },
  barSelected: { backgroundColor: brand.purple },
  labels: { flexDirection: 'row', marginTop: 8 },
  label: { flex: 1, textAlign: 'center', fontFamily: fonts.sans, fontSize: 11, color: brand.fieldLabel },
  labelActive: { fontFamily: fonts.sansBold, color: brand.purple },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(85, 46, 81, 0.25)',
  },
  footerText: { fontFamily: fonts.sans, fontSize: 12, color: brand.fieldLabel },
  tip: {
    position: 'absolute',
    top: 0,
    width: TIP_W,
    zIndex: 5,
    padding: 12,
    gap: 6,
    borderRadius: 14,
    backgroundColor: brand.plumDeep,
    boxShadow: '0px 10px 22px rgba(43, 10, 59, 0.4)',
  },
  tipHeading: { fontFamily: fonts.sansBold, fontSize: 12, color: brand.white },
  tipRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  tipName: { flex: 1, fontFamily: fonts.sans, fontSize: 12, color: 'rgba(255,255,255,0.9)' },
  tipAmount: { fontFamily: fonts.sansBold, fontSize: 12, color: brand.white },
  tipMuted: { fontFamily: fonts.sans, fontSize: 12, color: 'rgba(255,255,255,0.7)' },
});
