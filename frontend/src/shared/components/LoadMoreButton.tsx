import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { fonts, useTheme, type AppTheme } from '@/shared/theme';
import { PressableScale } from './PressableScale';
import { FadeInView } from './FadeInView';

type Props = {
  remaining: number; // how many items are still hidden
  expanded: boolean;
  onPress: () => void;
};

// "Load more" pill with a bouncing arrow. Turns into "Show less" once everything is open.
export function LoadMoreButton({ remaining, expanded, onPress }: Props) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: 1, duration: 650, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 650, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [bounce]);

  const label = expanded ? 'Show less' : `Load more · ${remaining} more`;

  return (
    <FadeInView delay={120} style={styles.wrap}>
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        style={styles.btn}
      >
        <Text style={styles.text}>{label}</Text>
        <Animated.View
          style={{
            transform: [
              { translateY: bounce.interpolate({ inputRange: [0, 1], outputRange: [0, expanded ? -4 : 4] }) },
            ],
          }}
        >
          <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={t.accent} />
        </Animated.View>
      </PressableScale>
    </FadeInView>
  );
}

const makeStyles = (t: AppTheme) =>
  StyleSheet.create({
    wrap: { alignItems: 'center', marginTop: 18 },
    btn: {
      height: 48,
      paddingHorizontal: 22,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderRadius: 24,
      borderWidth: 1.5,
      borderColor: t.accent,
      backgroundColor: t.surface,
      boxShadow: '0px 8px 18px rgba(104, 51, 124, 0.2)',
    },
    text: { fontFamily: fonts.sansBold, fontSize: 14, color: t.accent },
  });
