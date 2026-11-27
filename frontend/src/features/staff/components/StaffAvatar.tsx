import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { StaffTabParamList } from '@/navigation/types';
import { brand, gradients, fonts } from '@/shared/theme';
import { PressableScale } from '@/shared/components/PressableScale';
import { staffSummary } from '../mock';

// Round initials badge at the top right of the staff pages. Opens the Profile page.
export function StaffAvatar() {
  const navigation = useNavigation<BottomTabNavigationProp<StaffTabParamList>>();
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel="Open profile"
      onPress={() => navigation.navigate('Profile')}
    >
      <LinearGradient
        colors={gradients.logo}
        locations={[0.2, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.avatar}
      >
        <Text style={styles.text}>{staffSummary.initials}</Text>
      </LinearGradient>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 8px 16px rgba(43, 10, 59, 0.35)',
  },
  text: { fontFamily: fonts.sansBold, fontSize: 16, color: brand.white },
});
