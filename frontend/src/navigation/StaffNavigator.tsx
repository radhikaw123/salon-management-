// src/navigation/StaffNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import type { StaffTabParamList } from './types';
import { GradientTabBar } from '@/shared/components/GradientTabBar';
import { MyCustomersScreen } from '@/features/staff/screens/MyCustomersScreen';
import { DailyEarningsScreen } from '@/features/staff/screens/DailyEarningsScreen';

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
