import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '@/shared/store/authStore';
import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { OwnerNavigator } from './OwnerNavigator';
import { ReceptionNavigator } from './ReceptionNavigator';
import { StaffNavigator } from './StaffNavigator';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { isAuthenticated, role } = useAuthStore();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          {role === 'OWNER' && (
            <Stack.Screen name="OwnerRoot" component={OwnerNavigator} />
          )}
          {role === 'RECEPTION' && (
            <Stack.Screen name="ReceptionRoot" component={ReceptionNavigator} />
          )}
          {role === 'STAFF' && (
            <Stack.Screen name="StaffRoot" component={StaffNavigator} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};
