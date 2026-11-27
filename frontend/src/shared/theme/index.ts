// src/shared/theme/index.ts
// Salonova brand palette + fonts (used by the welcome / sign-up screens)
export { brand } from './brand';
export * from './fonts';

export const colors = {
  plumDeep: '#2B0A3B',
  purple: '#68337C',
  rose: '#B6595B',
  logoFrom: '#25162D',
  logoTo: '#804D99',
  lavender: '#F1EAF6',
  surface: '#FFFFFF',
  border: '#E3D6EC',
  textPrimary: '#2B0A3B',
  textMuted: '#7A6A85',
  success: '#3E8E6B',
  danger: '#C0444F',
  white: '#FFFFFF',

  // Compatibility aliases
  primary: '#68337C',
  background: '#F1EAF6',
  surfaceDark: '#2B0A3B',
  textSecondary: '#7A6A85',
  textInverse: '#FFFFFF',
  status: {
    booked: '#68337C',
    checkedIn: '#804D99',
    inProgress: '#B6595B',
    completed: '#3E8E6B',
    noShow: '#7A6A85',
    cancelled: '#C0444F',
  },
} as const;

export const gradients = {
  button: [colors.rose, colors.purple, colors.plumDeep],
  logo: [colors.logoFrom, colors.logoTo],
  wordmark: [colors.logoFrom, colors.logoTo],
  heading: [colors.rose, colors.purple],
  hero: [colors.plumDeep, colors.purple],
  heroAccent: [colors.plumDeep, colors.purple, colors.rose],
  cardDark: ['#2B0A3B', '#4D1D5E'],
  tabBar: ['#2B0A3B', '#3E1552', '#54206E'],
  button: [colors.rose, colors.purple, colors.plumDeep] as readonly [string, string, ...string[]],
  wordmark: ['#26162D', '#761AA1'] as readonly [string, string, ...string[]],
  heading: [colors.rose, colors.purple] as readonly [string, string, ...string[]],
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  input: 14,
  card: 20,
  pill: 999,
  full: 999,
} as const;

export const borderRadius = radius;

export const typography = {
  serifH1: { fontSize: 26, fontWeight: '700' as const, color: colors.plumDeep, letterSpacing: -0.5 },
  serifH2: { fontSize: 20, fontWeight: '700' as const, color: colors.plumDeep, letterSpacing: -0.3 },
  captionTracked: { fontSize: 11, fontWeight: '700' as const, color: colors.textMuted, letterSpacing: 2, textTransform: 'uppercase' as const },
  body: { fontSize: 14, fontWeight: '400' as const, color: colors.textPrimary },
  bodyBold: { fontSize: 14, fontWeight: '600' as const, color: colors.textPrimary },
  numberBig: { fontSize: 26, fontWeight: '700' as const, letterSpacing: -0.5 },
  numberMedium: { fontSize: 20, fontWeight: '700' as const },
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: '700' as const, lineHeight: 28 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  captionBold: { fontSize: 12, fontWeight: '600' as const, lineHeight: 16 },
};




