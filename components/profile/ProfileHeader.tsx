import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
  name: string;
  avatar: string;
  onPressSettings?: () => void;
  onPressEdit?: () => void;
  onPressShare?: () => void;
};

export default function ProfileHeader({ name, avatar, onPressSettings, onPressEdit, onPressShare }: Props) {
  const colors = useThemeColors();

  return (
    <LinearGradient colors={[colors.primary, colors.background]} style={styles.container}>
      <TouchableOpacity style={styles.settingsButton} onPress={onPressSettings}>
        <Ionicons name="settings-outline" size={22} color={colors.text} />
      </TouchableOpacity>

      <Image source={{ uri: avatar }} style={[styles.avatar, { borderColor: colors.background }]} />
      <Text style={[styles.name, { color: colors.text }]}>{name}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.pillButton, { backgroundColor: colors.border }]}
          onPress={onPressEdit}
          activeOpacity={0.85}
        >
          <Text style={[styles.pillButtonText, { color: colors.text }]}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pillButton, { backgroundColor: colors.border }]}
          onPress={onPressShare}
          activeOpacity={0.85}
        >
          <Text style={[styles.pillButtonText, { color: colors.text }]}>Share Profile</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: 55, paddingBottom: 24, paddingHorizontal: 20 },
  settingsButton: { position: 'absolute', top: 55, right: 20 },
  avatar: { width: 130, height: 130, borderRadius: 65, borderWidth: 3, marginBottom: 12 },
  name: { fontSize: 20, fontFamily: AuthFonts.bold, marginBottom: 16 },
  buttonRow: { flexDirection: 'row', gap: 12 },
  pillButton: { borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10 },
  pillButtonText: { fontSize: 13, fontFamily: AuthFonts.bold },
});