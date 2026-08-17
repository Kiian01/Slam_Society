import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
  userName: string;
  userAvatar: string;
  onPress?: () => void;
};

export default function PostComposer({ userName, userAvatar, onPress }: Props) {
  const colors = useThemeColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Image source={{ uri: userAvatar }} style={styles.avatar} />
      <TouchableOpacity
        style={[styles.inputPill, { borderColor: colors.primary }]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={[styles.placeholder, { color: colors.primary }]} numberOfLines={1}>
          What's happening today, {userName}?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.imageButton, { backgroundColor: colors.background }]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Ionicons name="image-outline" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 10,
    borderRadius: 24,
    borderWidth: 1,
    gap: 10,
  },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  inputPill: { flex: 1, borderWidth: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10 },
  placeholder: { fontSize: 13, fontFamily: AuthFonts.regular },
  imageButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});