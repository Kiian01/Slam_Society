// Color palette for the *main app* (Home, tabs, and beyond) — adapts to the
// device's light/dark setting. Onboarding/Login/Register/Verify intentionally
// keep their own fixed brand palette (see constants/authTheme.ts) and don't
// use this file.

export type ThemeColors = {
  background: string; // page background
  surface: string; // card / header background
  text: string;
  subtleText: string;
  border: string;
  primary: string;
  onPrimary: string; // text/icon color on top of a primary-colored button
  error: string;
};

export const lightColors: ThemeColors = {
  background: '#FAFAFA',
  surface: '#FFFFFF',
  text: '#2B2B2B',
  subtleText: '#8A8A8A',
  border: '#E7E7E7',
  primary: '#E85D75',
  onPrimary: '#FFFFFF',
  error: '#D64545',
};

export const darkColors: ThemeColors = {
  background: '#121212',
  surface: '#1E1E1E',
  text: '#F2F2F2',
  subtleText: '#A0A0A0',
  border: '#2C2C2E',
  primary: '#F0788D',
  onPrimary: '#FFFFFF',
  error: '#FF6B6B',
};