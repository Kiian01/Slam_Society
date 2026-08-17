import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthColors, AuthFonts } from '@/constants/authTheme';

type Props = {
  onPressNotifications?: () => void;
  onPressMessages?: () => void;
};

export default function AppHeader({ onPressNotifications, onPressMessages }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.brandRow}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.brandText}>SLAM</Text>
      </View>

      <View style={styles.iconsRow}>
        <TouchableOpacity onPress={onPressNotifications} style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color={AuthColors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressMessages} style={styles.iconButton}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color={AuthColors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: AuthColors.border,
    marginTop: 40
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logo: { width: 26, height: 26 },
  brandText: {
    fontSize: 20,
    fontFamily: AuthFonts.bold,
    color: AuthColors.text,
    letterSpacing: 1,
  },
  iconsRow: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  iconButton: { padding: 2 },
});