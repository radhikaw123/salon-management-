import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { brand, fonts, spacing } from '@/shared/theme';

type Props = { subtitle: string };

export function AuthHero({ subtitle }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.hero}>
      <Image
        source={require('../../../assets/images/makeup1.jpg')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['rgba(43,10,59,0.25)', 'rgba(43,10,59,0.9)']}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.logoRow, { paddingTop: insets.top + spacing.md }]}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.brand}>Salonova</Text>
      </View>
      <View style={styles.text}>
        <Text style={styles.tagline}>Glow Bold,{'\n'}Stay Iconic</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 280, justifyContent: 'space-between', backgroundColor: brand.plumDeep },
  logoRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg },
  logo: { width: 34, height: 40, marginRight: spacing.sm },
  brand: { fontFamily: fonts.display, fontSize: 28, color: brand.cream, letterSpacing: 1 },
  text: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  tagline: { fontFamily: fonts.display, fontSize: 38, lineHeight: 42, color: brand.cream },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    letterSpacing: 2.5,
    marginTop: spacing.sm,
    color: brand.muted,
  },
});
