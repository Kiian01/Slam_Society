import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';

// Approximates the cursive/script section headings from your design
// ("Time and Location", "About The Event", "See who attending"). If you'd
// like an actual script font, tell me which one and I'll wire it up the
// same way we did Outfit/New York.
export default function ScriptHeading({ children }: { children: string }) {
  const colors = useThemeColors();
  return <Text style={[styles.text, { color: colors.primary }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: { fontSize: 20, fontStyle: 'italic', fontWeight: '700', marginTop: 20, marginBottom: 10 },
});