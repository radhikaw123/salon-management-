import React from 'react';
import { useFonts } from 'expo-font';
import { AppProviders } from '../providers/AppProviders';
import RootNavigator from '../navigation/RootNavigator';
import { fontAssets } from '@/shared/theme';

export default function App() {
  const [loaded] = useFonts(fontAssets);
  if (!loaded) return null;

  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}