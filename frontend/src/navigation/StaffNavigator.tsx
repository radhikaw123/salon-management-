import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
<<<<<<< HEAD
import { View, Text, StyleSheet, Button } from 'react-native';
import { StaffTabParamList } from './types';
import { colors, typography } from '../shared/theme';
import { useAuthStore } from '../shared/store/authStore';
=======
import { Feather } from '@expo/vector-icons';
import type { StaffTabParamList } from './types';
import { GradientTabBar } from '@/shared/components/GradientTabBar';
import { MyCustomersScreen } from '@/features/staff/screens/MyCustomersScreen';
import { DailyEarningsScreen } from '@/features/staff/screens/DailyEarningsScreen';
>>>>>>> e4f9cff (Updated project changes)

const Tab = createBottomTabNavigator<StaffTabParamList>();

export default function StaffNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="MyCustomers"
      tabBar={(props) => <GradientTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="MyCustomers"
        component={MyCustomersScreen}
        options={{
          title: 'My Customers',
          tabBarIcon: ({ color, size }) => <Feather name="users" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="DailyEarnings"
        component={DailyEarningsScreen}
        options={{
          title: 'Daily Earnings',
          tabBarIcon: ({ color, size }) => <Feather name="credit-card" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
