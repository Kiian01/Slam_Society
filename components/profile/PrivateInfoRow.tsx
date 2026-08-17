import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
  label: string;
  value: string;
  isLast?: boolean;
  onPress?: () => void;
};

export default function PrivateInfoRow({ label, value, isLast, onPress }: Props) {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      style={[styles.row, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, { color: colors.primary }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.text }]} numberOfLines={1}>
        {value}
      </Text>
      <Ionicons name="chevron-forward" size={16} color={colors.subtleText} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  label: { flex: 1, fontSize: 13, fontFamily: AuthFonts.medium },
  value: { fontSize: 13, fontFamily: AuthFonts.regular, marginRight: 6 },
});