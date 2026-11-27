import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  fonts,
  spacing,
  themes,
  useTheme,
  useThemeMode,
  type AppTheme,
  type ThemeMode,
} from '@/shared/theme';
import { GradientText } from '@/shared/components/GradientText';
import { WorkspaceHeader } from '@/shared/components/WorkspaceHeader';
import { PressableScale } from '@/shared/components/PressableScale';
import { FadeInView } from '@/shared/components/FadeInView';
import { staffSummary } from '../mock';

const OPTIONS: { mode: ThemeMode; label: string; hint: string }[] = [
  { mode: 'color', label: 'Color theme', hint: 'Purple and rose, the Salonova look' },
  { mode: 'dark', label: 'Dark theme', hint: 'Easy on the eyes at night' },
  { mode: 'light', label: 'Light theme', hint: 'Clean white background' },
];

export function ProfileScreen() {
  const t = useTheme();
  const styles = useMemo(() => makeStyles(t), [t]);
  const { mode, setMode } = useThemeMode();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle={t.statusBar} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.sm }]}
      >
        <FadeInView>
          <WorkspaceHeader caption="STAFF WORKSPACE" />
          <Text style={styles.eyebrow}>YOUR PROFILE</Text>
          <GradientText colors={t.headingGradient} style={styles.title}>
            {staffSummary.staffName}
          </GradientText>
          <Text style={styles.subtitle}>Employee ID {staffSummary.employeeId}</Text>
        </FadeInView>

        <FadeInView delay={100} style={styles.block}>
          <Text style={styles.eyebrow}>APPEARANCE</Text>
          <Text style={styles.sectionTitle}>Choose your theme</Text>

          {OPTIONS.map((o) => {
            const selected = o.mode === mode;
            const preview = themes[o.mode];
            return (
              <PressableScale
                key={o.mode}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                accessibilityLabel={o.label}
                onPress={() => setMode(o.mode)}
                style={[styles.option, selected && styles.optionSelected]}
              >
                <View style={[styles.swatch, { backgroundColor: preview.bg, borderColor: preview.divider }]}>
                  <View style={[styles.swatchBar, { backgroundColor: preview.surface }]} />
                  <View style={[styles.swatchDot, { backgroundColor: preview.accent }]} />
                </View>

                <View style={styles.optionText}>
                  <Text style={styles.optionLabel}>{o.label}</Text>
                  <Text style={styles.optionHint}>{o.hint}</Text>
                </View>

                {selected ? (
                  <View style={styles.checkOn}>
                    <Feather name="check" size={15} color={t.bg} />
                  </View>
                ) : (
                  <View style={styles.checkOff} />
                )}
              </PressableScale>
            );
          })}
        </FadeInView>
      </ScrollView>
    </View>
  );
}

const makeStyles = (t: AppTheme) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: t.bg },
    scroll: { paddingHorizontal: spacing.md, paddingBottom: 140 },
    block: { marginTop: spacing.lg },
    eyebrow: {
      fontFamily: fonts.sans,
      fontSize: 11,
      letterSpacing: 2,
      color: t.textMuted,
      marginTop: spacing.md,
    },
    title: { fontFamily: fonts.heading, fontSize: 38, lineHeight: 46 },
    subtitle: { fontFamily: fonts.sans, fontSize: 13, color: t.textMuted, marginTop: 2 },
    sectionTitle: {
      fontFamily: fonts.heading,
      fontSize: 26,
      color: t.text,
      marginTop: 6,
      marginBottom: 4,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      padding: 14,
      marginTop: 12,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'transparent',
      backgroundColor: t.surface,
      boxShadow: '0px 8px 20px rgba(104, 51, 124, 0.14)',
    },
    optionSelected: { borderColor: t.accent },
    swatch: {
      width: 58,
      height: 58,
      borderRadius: 16,
      borderWidth: 1,
      padding: 8,
      justifyContent: 'space-between',
    },
    swatchBar: { width: 32, height: 14, borderRadius: 6 },
    swatchDot: { width: 14, height: 14, borderRadius: 7 },
    optionText: { flex: 1 },
    optionLabel: { fontFamily: fonts.sansBold, fontSize: 16, color: t.text },
    optionHint: { fontFamily: fonts.sans, fontSize: 13, color: t.textMuted, marginTop: 2 },
    checkOn: {
      width: 26,
      height: 26,
      borderRadius: 13,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: t.accent,
    },
    checkOff: {
      width: 26,
      height: 26,
      borderRadius: 13,
      borderWidth: 2,
      borderColor: t.divider,
    },
  });
