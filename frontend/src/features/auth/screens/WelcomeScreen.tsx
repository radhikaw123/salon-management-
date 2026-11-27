import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types';
import { brand, fonts, spacing, borderRadius } from '@/shared/theme';
import { FadeInView } from '@/shared/components/FadeInView';
import { PressableScale } from '@/shared/components/PressableScale';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const heroScale = useRef(new Animated.Value(1.12)).current;
  const nudge = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // slow zoom-out on the photo
    Animated.timing(heroScale, {
      toValue: 1,
      duration: 1800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    // arrow nudges to the right again and again
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(nudge, { toValue: 6, duration: 600, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(nudge, { toValue: 0, duration: 600, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [heroScale, nudge]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.Image
        source={require('../../../../assets/images/hero.jpg')}
        style={[styles.hero, { transform: [{ scale: heroScale }] }]}
        resizeMode="cover"
      />

      <LinearGradient
        colors={['rgba(43,10,59,0)', 'rgba(43,10,59,0.85)', brand.plumDeep]}
        locations={[0.35, 0.62, 0.78]}
        style={StyleSheet.absoluteFill}
      />

      {/* flex: 1 is what pushes the content to the bottom */}
      <View style={[styles.safe, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <FadeInView delay={200} style={styles.logoRow}>
          <Image
            source={require('../../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brand}>Salonova</Text>
        </FadeInView>

        <View style={styles.bottom}>
          <FadeInView delay={400}>
            <Text style={styles.title}>Your salon{'\n'}workspace</Text>
          </FadeInView>
          <FadeInView delay={550}>
            <Text style={styles.subtitle}>Appointments, team and billing in one place.</Text>
          </FadeInView>

          <FadeInView delay={700}>
            <PressableScale
              accessibilityRole="button"
              accessibilityLabel="Get started"
              onPress={() => navigation.navigate('SignUp')}
              style={styles.cta}
            >
              <Text style={styles.ctaText}>Get Started</Text>
              <Animated.View style={[styles.arrow, { transform: [{ translateX: nudge }] }]}>
                <Feather name="arrow-right" size={24} color={brand.white} />
              </Animated.View>
            </PressableScale>
          </FadeInView>

          <FadeInView delay={850}>
            <PressableScale
              accessibilityRole="link"
              onPress={() => navigation.navigate('Login')}
              hitSlop={12}
              scaleTo={0.94}
              style={styles.loginWrap}
            >
              <Text style={styles.login}>Log in</Text>
            </PressableScale>
          </FadeInView>
        </View>
     </View>
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
  subtitle: { marginTop: 14, fontFamily: fonts.body, fontSize: 16, color: brand.muted },
  cta: {
    marginTop: spacing.xl,
    height: 60,
    borderRadius: borderRadius.full,
    backgroundColor: brand.purple,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    boxShadow: '0px 10px 24px rgba(104, 51, 124, 0.55)',
  },
  ctaText: { color: brand.white, fontFamily: fonts.bodySemi, fontSize: 18 },
  arrow: { position: 'absolute', right: spacing.lg },
  loginWrap: { alignSelf: 'center', marginTop: spacing.lg },
  login: { color: brand.cream, fontFamily: fonts.bodyMedium, fontSize: 16, textDecorationLine: 'underline' },
});
