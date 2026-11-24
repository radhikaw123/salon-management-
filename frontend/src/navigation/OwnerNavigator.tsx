import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Button } from 'react-native';
import { OwnerTabParamList } from './types';
import { colors, typography } from '@/shared/theme';
import { useAuthStore } from '@/shared/store/authStore';

const Tab = createBottomTabNavigator<OwnerTabParamList>();

const PlaceholderScreen = ({ title }: { title: string }) => {
  const logout = useAuthStore((s) => s.logout);
  return (
    <View style={styles.center}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>Owner Role: Full Analytics & Configuration Access</Text>
      <Button title="Logout" onPress={logout} color={colors.primary} />
    </View>
  );
};

export const OwnerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerStyle: { backgroundColor: colors.surfaceDark },
        headerTintColor: colors.textInverse,
      }}
    >
      <Tab.Screen
        name="OwnerDashboard"
        component={() => <PlaceholderScreen title="Owner Dashboard & Real-Time KPIs" />}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name="OwnerCalendar"
        component={() => <PlaceholderScreen title="All Stylists Master Schedule" />}
        options={{ title: 'Calendar' }}
      />
      <Tab.Screen
        name="OwnerStaff"
        component={() => <PlaceholderScreen title="Staff Roster & Commission Config" />}
        options={{ title: 'Staff' }}
      />
      <Tab.Screen
        name="OwnerInventory"
        component={() => <PlaceholderScreen title="Inventory & Supplier Orders" />}
        options={{ title: 'Inventory' }}
      />
      <Tab.Screen
        name="OwnerReports"
        component={() => <PlaceholderScreen title="Revenue & Financial Reports" />}
        options={{ title: 'Reports' }}
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
