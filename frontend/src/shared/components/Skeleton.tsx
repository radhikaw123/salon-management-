import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, StyleProp, ViewStyle, DimensionValue, Platform } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

/**
 * Base Skeleton Bone component.
 * Uses a smooth looping opacity animation (pulse) to simulate loading.
 * Works seamlessly across Mobile (Android, iOS) and Web browsers.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius = radius.sm,
  style,
  color = '#E4D8EC',
}) => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.9,
          duration: 750,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    );
    pulseLoop.start();

    return () => pulseLoop.stop();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        styles.skeletonBone,
        {
          width,
          height,
          borderRadius,
          backgroundColor: color,
          opacity: pulseAnim,
        },
        style,
      ]}
    />
  );
};

/**
 * DashboardSkeleton
 * Matches the exact visual structure of the Salonova Owner Dashboard:
 * - Greeting & Date placeholder
 * - Hero Revenue Card placeholder
 * - 2x2 Metric Grid placeholder
 * - Live Schedule ("Coming up") feed placeholder
 */
export const DashboardSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* 1. Date & Greeting Skeleton */}
      <View style={styles.greetingSection}>
        <Skeleton width={130} height={12} borderRadius={radius.sm} style={{ marginBottom: 10 }} />
        <Skeleton width={200} height={26} borderRadius={radius.md} style={{ marginBottom: 6 }} />
        <Skeleton width={140} height={26} borderRadius={radius.md} />
      </View>

      {/* 2. Hero Revenue Card Skeleton */}
      <View style={styles.heroCardSkeleton}>
        <View style={styles.rowBetween}>
          <Skeleton width={160} height={12} color="rgba(255, 255, 255, 0.4)" borderRadius={radius.sm} />
          <Skeleton width={60} height={20} color="rgba(255, 255, 255, 0.3)" borderRadius={radius.pill} />
        </View>
        <Skeleton width={180} height={36} color="rgba(255, 255, 255, 0.6)" borderRadius={radius.md} style={{ marginVertical: 12 }} />
        <Skeleton width={120} height={12} color="rgba(255, 255, 255, 0.4)" borderRadius={radius.sm} />
      </View>

      {/* 3. Section Header Skeleton */}
      <View style={[styles.rowBetween, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
        <Skeleton width={110} height={12} borderRadius={radius.sm} />
        <Skeleton width={75} height={12} borderRadius={radius.sm} />
      </View>

      {/* 4. 2x2 Pulse Metrics Grid Skeleton */}
      <View style={styles.gridRow}>
        <View style={styles.gridCardSkeleton}>
          <Skeleton width={80} height={11} style={{ marginBottom: 10 }} />
          <Skeleton width={100} height={22} borderRadius={radius.md} style={{ marginBottom: 8 }} />
          <Skeleton width={60} height={10} />
        </View>
        <View style={styles.gridCardSkeleton}>
          <Skeleton width={80} height={11} style={{ marginBottom: 10 }} />
          <Skeleton width={100} height={22} borderRadius={radius.md} style={{ marginBottom: 8 }} />
          <Skeleton width={60} height={10} />
        </View>
      </View>

      <View style={styles.gridRow}>
        <View style={styles.gridCardSkeleton}>
          <Skeleton width={80} height={11} style={{ marginBottom: 10 }} />
          <Skeleton width={90} height={22} borderRadius={radius.md} style={{ marginBottom: 8 }} />
          <Skeleton width={50} height={10} />
        </View>
        <View style={styles.gridCardSkeleton}>
          <Skeleton width={80} height={11} style={{ marginBottom: 10 }} />
          <Skeleton width={90} height={22} borderRadius={radius.md} style={{ marginBottom: 8 }} />
          <Skeleton width={50} height={10} />
        </View>
      </View>

      {/* 5. Schedule Feed Skeleton */}
      <View style={{ marginTop: spacing.lg }}>
        <Skeleton width={100} height={14} borderRadius={radius.sm} style={{ marginBottom: spacing.md }} />
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.feedItemSkeleton}>
            <Skeleton width={44} height={44} borderRadius={22} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Skeleton width="60%" height={14} borderRadius={radius.sm} style={{ marginBottom: 6 }} />
              <Skeleton width="40%" height={11} borderRadius={radius.sm} />
            </View>
            <Skeleton width={55} height={22} borderRadius={radius.pill} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonBone: {
    overflow: 'hidden',
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  greetingSection: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroCardSkeleton: {
    backgroundColor: '#3D1350', // Tinted dark plum placeholder matching hero card
    borderRadius: radius.card,
    padding: spacing.xl,
    minHeight: 140,
    justifyContent: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  gridCardSkeleton: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  feedItemSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.card,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
