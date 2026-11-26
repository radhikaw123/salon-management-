import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types';
import { brand, fonts, spacing, borderRadius } from '@/shared/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Image
        source={require('../../../../assets/images/hero.jpg')}
        style={styles.hero}
        resizeMode="cover"
      />

      <LinearGradient
        colors={['rgba(43,10,59,0)', 'rgba(43,10,59,0.85)', brand.plumDeep]}
        locations={[0.35, 0.62, 0.78]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe}>
        <View style={styles.logoRow}>
          <Image
            source={require('../../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brand}>Salonova</Text>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.title}>Your salon{'\n'}workspace</Text>
          <Text style={styles.subtitle}>
            Appointments, team and billing in one place.
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Get started"
            onPress={() => navigation.navigate('SignUp')}
            style={({ pressed }: { pressed: boolean }) => [styles.cta, pressed && styles.pressed]}
          >
            <Text style={styles.ctaText}>Get Started</Text>
            <Feather name="arrow-right" size={24} color={brand.white} style={styles.arrow} />
          </Pressable>

          <Pressable
            accessibilityRole="link"
            onPress={() => navigation.navigate('Login')}
            hitSlop={12}
            style={styles.loginWrap}
          >
            <Text style={styles.login}>Log in</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.plumDeep },
  hero: { position: 'absolute', top: 0, width: '100%', height: '68%' },
  safe: { flex: 1, justifyContent: 'space-between' },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  logo: { width: 40, height: 48, marginRight: spacing.md },
  brand: { fontFamily: fonts.display, fontSize: 32, color: brand.cream, letterSpacing: 1 },
  bottom: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  title: { fontFamily: fonts.display, fontSize: 46, lineHeight: 52, color: brand.cream },
  subtitle: { marginTop: 14, fontSize: 16, color: brand.muted },
  cta: {
    marginTop: spacing.xl,
    height: 60,
    borderRadius: borderRadius.full,
    backgroundColor: brand.purple,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  ctaText: { color: brand.white, fontSize: 18, fontWeight: '700' },
  arrow: { position: 'absolute', right: spacing.lg },
  loginWrap: { alignSelf: 'center', marginTop: spacing.lg },
  login: { color: brand.cream, fontSize: 16, textDecorationLine: 'underline' },
});
