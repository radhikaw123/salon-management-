import React from 'react';
<<<<<<< HEAD
import { OwnerNavigator } from './OwnerNavigator';

/**
 * RootNavigator
 * Note: Login has been removed temporarily as requested.
 * Directly launches into the Salonova Owner App experience.
 */
export const RootNavigator = () => {
  return <OwnerNavigator />;
};
=======
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { WelcomeScreen, LoginScreen, SignUpScreen } from '../features/auth';
import StaffNavigator from './StaffNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="StaffTabs" component={StaffNavigator} />
    </Stack.Navigator>
  );
}
>>>>>>> e4f9cff (Updated project changes)
