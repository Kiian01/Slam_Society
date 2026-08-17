import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';

// Per client feedback: only these 5 tabs. "Networking" and "Mums" were
// removed as top-level tabs — Business now covers women-in-business
// lunches/networking/founder catch-ups, and "Mums" lives under
// groups/communities/tags instead of here.
export type EventFilterCategory = 'all' | 'social' | 'business' | 'wellness' | 'getaways';

const TABS: { key: EventFilterCategory; label: string }[] = [
  { key: 'all', label: 'All Events' },
  { key: 'social', label: 'Social' },
  { key: 'business', label: 'Business' },
  { key: 'wellness', label: 'Wellness' },
  { key: 'getaways', label: 'Getaways' },
];

type Props = {
  selected: EventFilterCategory;
  onSelect: (category: EventFilterCategory) => void;
};

export default function CategoryTabs({ selected, onSelect }: Props) {
  const colors = useThemeColors();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.key === selected;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onSelect(tab.key)}
            style={[
              styles.pill,
              {
                backgroundColor: isActive ? colors.primary : colors.surface,
                borderColor: isActive ? colors.primary : colors.border,
              },
            ]}
            activeOpacity={0.8}
          >
            <Text style={[styles.label, { color: isActive ? colors.onPrimary : colors.text }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingBottom: 4 },
  pill: { borderRadius: 20, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 8, marginRight: 8 },
  label: { fontSize: 13, fontFamily: AuthFonts.medium },
});