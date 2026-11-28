import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';

const logoAsset = require('../../../assets/images/logo.png');

interface SalonHeaderProps {
  rightActionIcon?: keyof typeof Ionicons.glyphMap;
  onRightActionPress?: () => void;
  rightActionVariant?: 'light' | 'dark';
}

export const SalonHeader: React.FC<SalonHeaderProps> = ({
  rightActionIcon = 'arrow-redo-outline',
  onRightActionPress,
  rightActionVariant = 'light',
}) => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0;
  const topPadding = Math.max(insets.top, statusBarHeight, 20) + spacing.sm;
  const isDark = rightActionVariant === 'dark';

  return (
    <View style={[styles.container, { paddingTop: topPadding }]}>
      <View style={styles.leftRow}>
        <View style={styles.logoBadge}>
          <Image
            source={logoAsset}
            style={styles.logoImage}
            resizeMode="cover"
          />
        </View>
        <View>
          <Text style={styles.brandTitle}>Salonova</Text>
          <Text style={styles.brandSubtitle}>SALON STUDIO</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.iconCircle,
          isDark && styles.iconCircleDark,
        ]}
        activeOpacity={0.8}
        onPress={onRightActionPress}
      >
        <Ionicons
          name={rightActionIcon}
          size={18}
          color={isDark ? colors.white : colors.plumDeep}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.plumDeep,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    overflow: 'hidden',
  },
  logoImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.plumDeep,
    letterSpacing: -0.3,
  },
  brandSubtitle: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1.5,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconCircleDark: {
    backgroundColor: colors.plumDeep,
    borderColor: colors.plumDeep,
  },
});
