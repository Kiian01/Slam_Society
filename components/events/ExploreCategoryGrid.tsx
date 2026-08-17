import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ExploreCategory } from '@/types/models';

type Props = {
  categories: ExploreCategory[];
  onSelect?: (category: ExploreCategory) => void;
};

export default function ExploreCategoryGrid({ categories, onSelect }: Props) {
  const colors = useThemeColors();
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={styles.grid}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[styles.card, { backgroundColor: isDark ? category.colorDark : category.colorLight }]}
          onPress={() => onSelect?.(category)}
          activeOpacity={0.8}
        >
          <Text style={[styles.label, { color: colors.text }]}>{category.label}</Text>
          <Text style={[styles.count, { color: colors.primary }]}>{category.upcomingCount} Upcoming</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12 },
  card: { width: '46.5%', borderRadius: 16, padding: 16, minHeight: 90, justifyContent: 'flex-end' },
  label: { fontSize: 15, fontFamily: AuthFonts.bold, marginBottom: 4 },
  count: { fontSize: 12, fontFamily: AuthFonts.medium },
});