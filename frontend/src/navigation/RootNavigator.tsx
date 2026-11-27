// src/navigation/RootNavigator.tsx
import React from 'react';
import { CustomerVisitsScreen } from '@/features/staff/screens/CustomerVisitsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { WelcomeScreen, LoginScreen, SignUpScreen } from '../features/auth';
import StaffNavigator from './StaffNavigator';
import { OwnerNavigator } from './OwnerNavigator';
import { StaffBookingsDetailScreen } from '../features/staff/screens/StaffBookingsDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="OwnerTabs" component={OwnerNavigator} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="StaffTabs" component={StaffNavigator} />
      <Stack.Screen name="CustomerVisits" component={CustomerVisitsScreen} />
      <Stack.Screen name="StaffBookingsDetail" component={StaffBookingsDetailScreen} />
    </Stack.Navigator>
  );
}

// both import styles work: `import RootNavigator` and `import { RootNavigator }`
export default RootNavigator;
