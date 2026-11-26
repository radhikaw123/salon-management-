export const brand = {
  plumDeep: '#2B0A3B',
  purple: '#68337C',
  rose: '#B6595B',
  logoFrom: '#25162D',
  logoTo: '#804D99',
  wordmarkFrom: '#26162D',
  wordmarkTo: '#761AA1',
  cream: '#F6EBDD',
  muted: '#C9B7CC',
  white: '#FFFFFF',
  lavender: '#EBDFF0',
  gold: '#B8955A',
  fieldBorder: '#C8A98A',
  placeholder: '#8A7A93',
  danger: '#C0444F',
  fieldLabel: '#552E51',
} as const;

export const gradients = {
  // Buttons, toggle, bottom tab bar (left to right)
  button: [brand.rose, brand.purple, brand.plumDeep],
  // Behind the logo (use with locations [0.2, 1])
  logo: [brand.logoFrom, brand.logoTo],
  // "Salonova" wordmark text (use with locations [0.2, 1])
  wordmark: [brand.wordmarkFrom, brand.wordmarkTo],
  // Big page headings such as "My Customers"
  heading: [brand.rose, brand.purple],
} as const;