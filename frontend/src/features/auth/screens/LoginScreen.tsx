import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../../shared/theme';
import { useAuthStore } from '../../../shared/store/authStore';

export const LoginScreen = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleSimulatedLogin = (role: 'OWNER' | 'RECEPTION' | 'STAFF') => {
    setAuth(
      {
        _id: 'usr_demo_1',
        salonId: 'salon_main_1',
        role,
        name: `${role} Demo User`,
        phone: '+919876543210',
        isActive: true,
      },
      'demo_access_jwt',
      'demo_refresh_jwt'
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salon Management</Text>
      <Text style={styles.subtitle}>Select a role to preview navigation & UI</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => handleSimulatedLogin('OWNER')}
      >
        <Text style={styles.buttonText}>Log In as Salon Owner</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.status.booked }]}
        onPress={() => handleSimulatedLogin('RECEPTION')}
      >
        <Text style={styles.buttonText}>Log In as Receptionist</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.status.completed }]}
        onPress={() => handleSimulatedLogin('STAFF')}
      >
        <Text style={styles.buttonText}>Log In as Staff (Stylist)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  buttonText: {
    ...typography.bodyBold,
    color: colors.textInverse,
  },
});
