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
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, LoginRole } from '@/navigation/types';
import { brand, fonts, spacing } from '@/shared/theme';
import { TextField } from '@/shared/components/TextField';
import { GradientButton } from '@/shared/components/GradientButton';
import { AuthHero } from '@/shared/components/AuthHero';
import { loginFormSchema, LoginFormValues } from '../schemas/login.schema';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
type Errors = Partial<Record<keyof LoginFormValues, string>>;

const TITLES: Record<LoginRole, string> = {
  owner: 'Owner Login',
  reception: 'Reception',
  staff: 'Staff',
};

const EMPTY: LoginFormValues = { email: '', password: '' };

export function LoginScreen({ navigation, route }: Props) {
  const role: LoginRole = route.params?.role ?? 'owner';
  const [form, setForm] = useState<LoginFormValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [remember, setRemember] = useState(false);

  const set = (key: keyof LoginFormValues) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = () => {
    const result = loginFormSchema.safeParse(form);
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setErrors({
        email: fe.email?.[0],
        password: fe.password?.[0],
      });
      return;
    }
    setErrors({});
    // TODO: call login API with { ...result.data, role, remember }
    console.log('Login', { ...result.data, role, remember });
    // Temporary: no API yet, so a staff login goes straight to the staff app
    if (role === 'staff') {
  navigation.reset({ index: 0, routes: [{ name: 'StaffTabs' }] });
} else if (role === 'owner') {
  navigation.reset({ index: 0, routes: [{ name: 'OwnerTabs' }] });
}
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
        <AuthHero subtitle="YOUR SALON · YOUR RULES" />

        <View style={styles.form}>
          <Text style={styles.title}>{TITLES[role]}</Text>

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

          <View style={styles.optionsRow}>
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: remember }}
              onPress={() => setRemember((r) => !r)}
              style={styles.remember}
              hitSlop={8}
            >
              <View style={[styles.box, remember && styles.boxChecked]}>
                {remember && <Feather name="check" size={12} color={brand.white} />}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </Pressable>

            <Pressable hitSlop={8} onPress={() => {/* TODO: forgot password */}}>
              <Text style={styles.forgot}>Forgot password?</Text>
            </Pressable>
          </View>

          <GradientButton title="Log In" onPress={onSubmit} style={styles.loginBtn} />

          <View style={styles.linkRow}>
            <Text style={styles.linkText}>New to Salonova? </Text>
            <Pressable hitSlop={10} onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.link}>Create account</Text>
            </Pressable>
          </View>

          <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.row}>
            <GradientButton
              title="Continue with email"
              onPress={() => {/* TODO: email link login */}}
              style={styles.half}
            />
            <GradientButton
              title="Continue with Apple"
              onPress={() => {/* TODO: Apple sign-in (iOS only) */}}
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  remember: { flexDirection: 'row', alignItems: 'center' },
  box: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: brand.fieldBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  boxChecked: { backgroundColor: brand.purple, borderColor: brand.purple },
  rememberText: { fontFamily: fonts.body, fontSize: 13, color: brand.placeholder },
  forgot: { fontFamily: fonts.bodyMedium, fontSize: 13, color: brand.plumDeep },
  loginBtn: { marginTop: spacing.md },
  linkRow: { flexDirection: 'row', marginTop: spacing.md },
  linkText: { fontFamily: fonts.body, fontSize: 13, color: brand.plumDeep },
  link: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: brand.plumDeep,
    textDecorationLine: 'underline',
  },
  row: { flexDirection: 'row', gap: spacing.md },
  half: { flex: 1 },
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.md },
  line: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: brand.fieldBorder },
  orText: { marginHorizontal: spacing.md, fontFamily: fonts.body, fontSize: 12, color: brand.placeholder },
});
