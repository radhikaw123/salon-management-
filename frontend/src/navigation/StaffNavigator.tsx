import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import type { StaffTabParamList } from './types';
import { GradientTabBar } from '@/shared/components/GradientTabBar';
import { MyCustomersScreen } from '@/features/staff/screens/MyCustomersScreen';
import { DailyEarningsScreen } from '@/features/staff/screens/DailyEarningsScreen';
import { ProfileScreen } from '@/features/staff/screens/ProfileScreen';

const Tab = createBottomTabNavigator<StaffTabParamList>();

export function StaffNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="MyCustomers"
      // Profile is a real screen but has no button in the bar
      tabBar={(props) => <GradientTabBar {...props} hidden={['Profile']} />}
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
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

export default StaffNavigator;
