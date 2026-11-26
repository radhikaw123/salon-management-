import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { WelcomeScreen, LoginScreen, SignUpScreen } from '../features/auth';
import StaffNavigator from './StaffNavigator';
import { OwnerNavigator } from './OwnerNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="OwnerTabs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="OwnerTabs" component={OwnerNavigator} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="StaffTabs" component={StaffNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
