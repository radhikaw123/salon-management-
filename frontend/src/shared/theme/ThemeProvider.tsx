import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { themes, type AppTheme, type ThemeMode } from './themes';

const STORAGE_KEY = 'salonova.theme';

type ThemeContextValue = {
  theme: AppTheme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: themes.color,
  mode: 'color',
  setMode: () => {},
});

// Wrap the app once. The chosen theme is remembered between launches.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('color');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync(STORAGE_KEY)
      .then((saved) => {
        if (saved === 'color' || saved === 'dark' || saved === 'light') setModeState(saved);
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    SecureStore.setItemAsync(STORAGE_KEY, next).catch(() => {});
  }, []);

  const value = useMemo(() => ({ theme: themes[mode], mode, setMode }), [mode, setMode]);

  if (!ready) return null;
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// const t = useTheme();  ->  t.bg, t.surface, t.text ...
export const useTheme = () => useContext(ThemeContext).theme;

// const { mode, setMode } = useThemeMode();  ->  used by the Profile page
export const useThemeMode = () => {
  const { mode, setMode } = useContext(ThemeContext);
  return { mode, setMode };
};
