import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
  label: string;
  removable?: boolean;
  onRemove?: () => void;
};

export default function InterestTag({ label, removable, onRemove }: Props) {
  const colors = useThemeColors();

  return (
    <View style={[styles.pill, { backgroundColor: colors.primary }]}>
      <Text style={styles.label}>{label}</Text>
      {removable ? (
        <TouchableOpacity onPress={onRemove} style={styles.removeButton} hitSlop={6}>
          <Ionicons name="close" size={13} color="#FFFFFF" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    marginRight: 10,
    marginBottom: 10,
  },
  label: { color: '#FFFFFF', fontSize: 13, fontFamily: AuthFonts.medium },
  removeButton: { marginLeft: 6 },
});