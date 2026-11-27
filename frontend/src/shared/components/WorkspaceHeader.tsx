import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { brand, gradients, fonts, useTheme, type AppTheme } from '@/shared/theme';
import { GradientText } from '@/shared/components/GradientText';

type Props = { caption: string };

// Shared top header for every role: logo, gradient wordmark, role caption
export function WorkspaceHeader({ caption }: Props) {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  return (
    <View style={styles.row}>
      <LinearGradient
        colors={gradients.logo}
        locations={[0.2, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.logoBg}
      >
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </LinearGradient>

      <View>
        <GradientText colors={t.wordmarkGradient} locations={[0.2, 1]} style={styles.brand}>
          Salonova
        </GradientText>
        <Text style={styles.caption}>{caption}</Text>
      </View>
    </View>
  );
}

const makeStyles = (t: AppTheme) => StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logoBg: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: 30, height: 34 },
  brand: { fontFamily: fonts.headingBold, fontSize: 20 },
  caption: {
    fontFamily: fonts.sans,
    fontSize: 10,
    letterSpacing: 2,
    color: t.textMuted,
  },
});
