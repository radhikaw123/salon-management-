import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ReceptionTabParamList } from './types';
import { colors, typography } from '../shared/theme';
import { useAuthStore } from '../shared/store/authStore';

const Tab = createBottomTabNavigator<ReceptionTabParamList>();

const PlaceholderScreen = ({ title }: { title: string }) => {
  const logout = useAuthStore((s) => s.logout);
  return (
    <View style={styles.center}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>Reception Role: Bookings, Walk-ins, POS & Client CRM</Text>
      <Button title="Logout" onPress={logout} color={colors.status.booked} />
    </View>
  );
};

export const ReceptionNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.status.booked,
        tabBarInactiveTintColor: colors.textSecondary,
        headerStyle: { backgroundColor: colors.surfaceDark },
        headerTintColor: colors.textInverse,
      }}
    >
      <Tab.Screen
        name="MasterCalendar"
        component={() => <PlaceholderScreen title="Master Floor Calendar" />}
        options={{ title: 'Schedule' }}
      />
      <Tab.Screen
        name="WalkInQueue"
        component={() => <PlaceholderScreen title="Live Walk-In Queue" />}
        options={{ title: 'Queue' }}
      />
      <Tab.Screen
        name="PosCheckout"
        component={() => <PlaceholderScreen title="POS Billing & Payments" />}
        options={{ title: 'POS' }}
      />
      <Tab.Screen
        name="ClientDirectory"
        component={() => <PlaceholderScreen title="Client Directory & Notes" />}
        options={{ title: 'Clients' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  meta: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
});
