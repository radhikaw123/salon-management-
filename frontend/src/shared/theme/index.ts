export const colors = {
  primary: '#D97706',      // Warm salon amber / bronze
  primaryDark: '#B45309',
  primaryLight: '#FEF3C7',
  
  // Backgrounds
  background: '#F8FAFC',
  cardBackground: '#FFFFFF',
  surfaceDark: '#0F172A',
  
  // Text
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',
  
  // Borders
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  
  // Status Colors (Aligned with appointment state machine)
  status: {
    booked: '#3B82F6',       // Blue
    checkedIn: '#8B5CF6',    // Purple
    inProgress: '#F59E0B',   // Amber
    completed: '#10B981',    // Emerald Green
    noShow: '#6B7280',       // Gray
    cancelled: '#EF4444',    // Red
  },

  // Alerts
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 9999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: '700' as const, lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
  bodyBold: { fontSize: 15, fontWeight: '600' as const, lineHeight: 22 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  captionBold: { fontSize: 12, fontWeight: '600' as const, lineHeight: 16 },
};
