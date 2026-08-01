import { Platform } from "react-native";

// Color palette for the onboarding + auth flow (Login / Register / Verify)
// Pulled from the SLAM design mockups — soft blush pink gradient with a coral accent.

export const AuthColors = {
  gradientTop: "#FFFFFF",
  gradientBottom: "#F6C6D2",
  primary: "#E85D75",
  primaryDark: "#D6435F",
  text: "#2B2B2B",
  subtleText: "#8A8A8A",
  border: "#E7E7E7",
  inputBackground: "#FAFAFA",
  error: "#D64545",
  white: "#FFFFFF",
};

export const AuthFonts = {
  regular: 'Outfit_400Regular',
  medium: 'Outfit_500Medium',
  bold: 'Outfit_700Bold',
  heading: Platform.select({
    ios: 'New York',
    default: 'Outfit_700Bold',
  }),
};