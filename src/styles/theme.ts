export const COLORS_LIGHT = {
  background: '#FFF9F1',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F8F5',
  text: '#30434A',
  textMuted: '#71838A',
  textInverse: '#FFFFFF',
  border: '#DCEBE5',
  borderLight: '#EAF1ED',
  primary: '#55AFA0',
  primaryDark: '#347F75',
  primaryLight: '#DDF2EC',
  secondary: '#F28F79',
  secondaryDark: '#C66555',
  secondaryLight: '#FCE8E1',
  success: '#63A981',
  danger: '#D96F70',
  warning: '#E8B85A',
  warningLight: '#F8F0DC',
  info: '#6D9ED1',
  badge: '#E78170',
  successLight: '#E5F2E9',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#8A989C',
  shadow: 'rgba(48, 67, 74, 0.10)',
  shadowColor: '#30434A',
} as const;

export const COLORS_DARK = {
  background: '#202D34',
  surface: '#2A3A41',
  surfaceAlt: '#30434A',
  text: '#F6F4ED',
  textMuted: '#C0CDCA',
  textInverse: '#202D34',
  border: '#43575D',
  borderLight: '#394B51',
  primary: '#82CDBD',
  primaryDark: '#B2E3D8',
  primaryLight: '#385A55',
  secondary: '#F3A897',
  secondaryDark: '#F8C7BA',
  secondaryLight: '#604944',
  success: '#91C9A5',
  danger: '#ED9996',
  warning: '#EBCB7C',
  warningLight: '#544B35',
  info: '#99BCE0',
  badge: '#F3A897',
  successLight: '#3C5144',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#A7B5B5',
  shadow: 'rgba(0, 0, 0, 0.28)',
  shadowColor: '#000000',
} as const;

export type ColorScheme = 'light' | 'dark';
export type AppColors = {
  [Key in keyof typeof COLORS_LIGHT]: string;
};

export const COLORS = COLORS_LIGHT;

export const SPACING = { xs: 5, sm: 10, md: 15, lg: 20, xl: 30, xxl: 40 } as const;
export const RADIUS = { sm: 14, md: 20, lg: 26, xl: 32, pill: 999 } as const;
export const FONT_SIZE = { xs: 12, sm: 14, md: 16, lg: 18, xl: 22, xxl: 28 } as const;
