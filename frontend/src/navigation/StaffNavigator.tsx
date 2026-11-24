import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StaffTabParamList } from './types';
import { colors, typography } from '../shared/theme';
import { useAuthStore } from '../shared/store/authStore';

const Tab = createBottomTabNavigator<StaffTabParamList>();

const PlaceholderScreen = ({ title }: { title: string }) => {
  const logout = useAuthStore((s) => s.logout);
  return (
    <View style={styles.center}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>Staff Role: Personal Schedule, Status Updates & Commission</Text>
      <Button title="Logout" onPress={logout} color={colors.status.completed} />
    </View>
  );
};

export const StaffNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.status.completed,
        tabBarInactiveTintColor: colors.textSecondary,
        headerStyle: { backgroundColor: colors.surfaceDark },
        headerTintColor: colors.textInverse,
      }}
    >
      <Tab.Screen
        name="MySchedule"
        component={() => <PlaceholderScreen title="My Daily Schedule" />}
        options={{ title: 'My Day' }}
      />
      <Tab.Screen
        name="ActiveService"
        component={() => <PlaceholderScreen title="Active Service & Client Notes" />}
        options={{ title: 'In Service' }}
      />
      <Tab.Screen
        name="MyEarnings"
        component={() => <PlaceholderScreen title="Commission & Tips Summary" />}
        options={{ title: 'Earnings' }}
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
