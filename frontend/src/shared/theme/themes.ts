import { brand, gradients } from './brand';

export type ThemeMode = 'color' | 'dark' | 'light';

// Every screen reads these tokens through useTheme()
export interface AppTheme {
  mode: ThemeMode;
  bg: string;              // screen background
  surface: string;         // cards, chips, inputs, popups' cards
  text: string;            // main text
  textMuted: string;       // labels, captions, icons
  placeholder: string;
  accent: string;          // links and selected text
  accentSoft: string;      // tinted fills (tags, selected rows, idle bars)
  accentBorder: string;
  outline: string;         // outlined pills
  divider: string;         // hairlines
  headingGradient: readonly [string, string]; // big page titles
  wordmarkGradient: readonly [string, string]; // "Salonova" text
  statusBar: 'dark-content' | 'light-content';
}

// The original Salonova look (lavender background)
const color: AppTheme = {
  mode: 'color',
  bg: brand.lavender,
  surface: brand.white,
  text: brand.plumDeep,
  textMuted: brand.fieldLabel,
  placeholder: brand.placeholder,
  accent: brand.purple,
  accentSoft: 'rgba(104, 51, 124, 0.12)',
  accentBorder: 'rgba(104, 51, 124, 0.2)',
  outline: brand.fieldLabel,
  divider: 'rgba(85, 46, 81, 0.25)',
  headingGradient: gradients.heading,
  wordmarkGradient: gradients.wordmark,
  statusBar: 'dark-content',
};

// Same palette on a clean, near-white background
const light: AppTheme = {
  ...color,
  mode: 'light',
  bg: '#F8F6FA',
};

const dark: AppTheme = {
  mode: 'dark',
  bg: '#150720',
  surface: '#26112F',
  text: brand.cream,
  textMuted: '#BCA7C4',
  placeholder: '#8A7A93',
  accent: '#C79BDB',
  accentSoft: 'rgba(199, 155, 219, 0.16)',
  accentBorder: 'rgba(199, 155, 219, 0.3)',
  outline: '#8F6FA0',
  divider: 'rgba(246, 235, 221, 0.14)',
  headingGradient: [brand.rose, '#B98BD1'],
  wordmarkGradient: ['#E9D5F2', '#B98BD1'],
  statusBar: 'light-content',
};

export const themes: Record<ThemeMode, AppTheme> = { color, light, dark };