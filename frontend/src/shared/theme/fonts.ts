import {
  CormorantGaramond_500Medium,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import {
  PlayfairDisplay_500Medium,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';

export const fonts = {
  // Auth screens (Welcome, Create Account, Login)
  display: 'CormorantGaramond_500Medium',
  displaySemi: 'CormorantGaramond_600SemiBold',
  displayBold: 'CormorantGaramond_700Bold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemi: 'Inter_600SemiBold',
  // Staff / owner / reception workspace screens
  heading: 'PlayfairDisplay_500Medium',
  headingBold: 'PlayfairDisplay_700Bold',
  sans: 'DMSans_400Regular',
  sansMedium: 'DMSans_500Medium',
  sansBold: 'DMSans_700Bold',
} as const;

// Passed to useFonts() once, in app.tsx
export const fontAssets = {
  CormorantGaramond_500Medium,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_700Bold,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
};