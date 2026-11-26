import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { brand, fonts, spacing } from '@/shared/theme';
import { TextField } from '@/shared/components/TextField';
import { GradientButton } from '@/shared/components/GradientButton';
import { AuthHero } from '@/shared/components/AuthHero';
import { signUpSchema, SignUpForm } from '../schemas/signup.schema';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
type Errors = Partial<Record<keyof SignUpForm, string>>;

const EMPTY: SignUpForm = {
  firstName: '',
  lastName: '',
  organisationName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export function SignUpScreen({ navigation }: Props) {
  const [form, setForm] = useState<SignUpForm>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});

  const set = (key: keyof SignUpForm) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = () => {
    const result = signUpSchema.safeParse(form);
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setErrors({
        firstName: fe.firstName?.[0],
        lastName: fe.lastName?.[0],
        organisationName: fe.organisationName?.[0],
        email: fe.email?.[0],
        password: fe.password?.[0],
        confirmPassword: fe.confirmPassword?.[0],
      });
      return;
    }
    setErrors({});
    // TODO: call sign-up API with result.data, then navigate
    console.log('Sign up', result.data);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <AuthHero subtitle="JOIN THE SALONOVA FAMILY" />

        <View style={styles.form}>
          <Text style={styles.title}>Create Account</Text>

          <View style={styles.row}>
            <TextField
              label="First Name"
              placeholder="First name"
              value={form.firstName}
              onChangeText={set('firstName')}
              error={errors.firstName}
              autoCapitalize="words"
              containerStyle={styles.half}
            />
            <TextField
              label="Last Name"
              placeholder="Last name"
              value={form.lastName}
              onChangeText={set('lastName')}
              error={errors.lastName}
              autoCapitalize="words"
              containerStyle={styles.half}
            />
          </View>

          <TextField
            label="Organisation Name"
            placeholder="Organisation"
            value={form.organisationName}
            onChangeText={set('organisationName')}
            error={errors.organisationName}
            autoCapitalize="words"
          />
          <TextField
            label="Email"
            placeholder="you@salonova.com"
            value={form.email}
            onChangeText={set('email')}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextField
            label="Password"
            placeholder="••••••••"
            value={form.password}
            onChangeText={set('password')}
            error={errors.password}
            secureTextEntry
          />
          <TextField
            label="Confirm Password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChangeText={set('confirmPassword')}
            error={errors.confirmPassword}
            secureTextEntry
          />

          <GradientButton title="Create Account" onPress={onSubmit} style={styles.createBtn} />

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Pressable hitSlop={10} onPress={() => navigation.navigate('Login', { role: 'owner' })}>
              <Text style={styles.loginLink}>Login</Text>
            </Pressable>
          </View>

          <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.row}>
            <GradientButton
              title="Reception login"
              onPress={() => navigation.navigate('Login', { role: 'reception' })}
              style={styles.half}
            />
            <GradientButton
              title="Staff login"
              onPress={() => navigation.navigate('Login', { role: 'staff' })}
              style={styles.half}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: brand.lavender },
  scroll: { flexGrow: 1 },
  form: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xl },
  title: { fontFamily: fonts.displayBold, fontSize: 38, textAlign: 'center', color: brand.fieldLabel },
  row: { flexDirection: 'row', gap: spacing.md },
  half: { flex: 1 },
  createBtn: { marginTop: spacing.lg },
  loginRow: { flexDirection: 'row', marginTop: spacing.md },
  loginText: { fontFamily: fonts.body, fontSize: 13, color: brand.plumDeep },
  loginLink: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: brand.plumDeep,
    textDecorationLine: 'underline',
  },
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.md },
  line: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: brand.fieldBorder },
  orText: { marginHorizontal: spacing.md, fontFamily: fonts.body, fontSize: 12, color: brand.placeholder },
});
