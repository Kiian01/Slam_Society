import { useColorScheme } from '@/hooks/use-color-scheme';
import { lightColors, darkColors, ThemeColors } from '@/constants/appTheme';

// Returns the right color palette for the device's current light/dark
// setting. Used by Home/tabs screens only — auth screens use AuthColors directly.
export function useThemeColors(): ThemeColors {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkColors : lightColors;
}