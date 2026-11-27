import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { brand, gradients, fonts } from '@/shared/theme';

// Floating bottom bar using the same gradient as the buttons
type Props = BottomTabBarProps & { hidden?: string[] };

export function GradientTabBar({ state, descriptors, navigation, hidden = [] }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      style={[styles.outer, { bottom: Math.max(insets.bottom, 12) }]}
    >
      <LinearGradient
        colors={gradients.button}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.bar}
      >
        {state.routes.map((route, index) => {
          if (hidden.includes(route.name)) return null;
          const { options } = descriptors[route.key];
          const focused = state.index === index;
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title ?? route.name;
          const iconColor = focused ? brand.white : 'rgba(255,255,255,0.65)';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true } as never);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityLabel={label}
              accessibilityState={focused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.item}
            >
              <View style={[styles.pill, focused && styles.pillActive]}>
                {options.tabBarIcon?.({ focused, color: iconColor, size: 20 })}
                <Text style={[styles.label, { color: iconColor }]}>{label}</Text>
              </View>
            </Pressable>
          );
        })}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { position: 'absolute', left: 16, right: 16 },
  bar: {
    flexDirection: 'row',
    height: 68,
    padding: 6,
    borderRadius: 34,
    boxShadow: '0px 8px 20px rgba(43, 10, 59, 0.35)',
  },
  item: { flex: 1 },
  pill: {
    flex: 1,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  pillActive: { backgroundColor: 'rgba(255,255,255,0.18)' },
  label: { fontFamily: fonts.sansMedium, fontSize: 11 },
});
