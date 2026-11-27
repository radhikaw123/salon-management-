import React from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../shared/theme';
import { DashboardScreen } from '../features/analytics/screens/DashboardScreen';
import { ServicesScreen } from '../features/services/screens/ServicesScreen';
import { StaffScreen } from '../features/staff/screens/StaffScreen';
import { FinanceScreen } from '../features/analytics/screens/FinanceScreen';

const Tab = createBottomTabNavigator();

// Luxury horizontal gradient matching Figma: Terracotta Rose -> Purple -> Deep Plum
const TAB_BAR_GRADIENT = ['#BA5C63', '#7A3273', '#3E104B', '#22062C'] as const;

const CustomOwnerTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.barOuter} pointerEvents="box-none">
      <LinearGradient
        colors={TAB_BAR_GRADIENT}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.tabBar}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;

          let iconName: keyof typeof Ionicons.glyphMap = 'grid-outline';
          if (route.name === 'Dashboard') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Services') {
            iconName = focused ? 'cut' : 'cut-outline';
          } else if (route.name === 'Staff') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Finance') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          }

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

          const tintColor = focused ? colors.white : 'rgba(255, 255, 255, 0.45)';

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              style={styles.tabItem}
            >
              <View style={[styles.pill, focused && styles.pillActive]}>
                <Ionicons name={iconName} size={18} color={tintColor} />
                <Text style={[styles.tabLabel, { color: tintColor }]}>
                  {route.name}
                </Text>
                {focused && <View style={styles.activeIndicatorDash} />}
              </View>
            </Pressable>
          );
        })}
      </LinearGradient>
    </View>
  );
};

export const OwnerNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomOwnerTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Staff" component={StaffScreen} />
      <Tab.Screen name="Finance" component={FinanceScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barOuter: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 18,
    right: 18,
  },
  tabBar: {
    flexDirection: 'row',
    height: 64,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pill: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    minWidth: 64,
  },
  pillActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  tabLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: -0.2,
  },
  activeIndicatorDash: {
    width: 14,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: colors.white,
    marginTop: 2.5,
  },
});
