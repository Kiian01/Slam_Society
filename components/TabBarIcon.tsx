import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthColors, AuthFonts } from '@/constants/authTheme';

type Props = {
  name: keyof typeof Ionicons.glyphMap;
  outlineName: keyof typeof Ionicons.glyphMap;
  label: string;
  focused: boolean;
};

const inactiveColor = '#8A8A8A';

export default function TabBarIcon({ name, outlineName, label, focused }: Props) {
  const color = focused ? AuthColors.primary : inactiveColor;

  return (
    <View style={styles.container}>
      <Ionicons name={focused ? name : outlineName} size={24} color={color} />
      <Text style={[styles.label, { color }]} numberOfLines={1}>
        {label}
      </Text>
      {focused ? <View style={styles.underline} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', minWidth: 56, paddingTop: 6 },
  label: { fontSize: 11, marginTop: 3, fontFamily: AuthFonts.medium },
  underline: {
    marginTop: 4,
    width: 18,
    height: 2,
    borderRadius: 1,
    backgroundColor: AuthColors.primary,
  },
});