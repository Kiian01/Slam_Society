import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAuth } from '@/context/AuthContext';
import { AuthColors, AuthFonts } from '@/constants/authTheme';

export default function Profile() {
  const tabBarHeight = useBottomTabBarHeight();
  const { signOut } = useAuth();

  return (
    <View style={[styles.container, { paddingBottom: tabBarHeight }]}>
      <Text style={styles.text}>Profile — coming soon</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut} activeOpacity={0.85}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  text: { fontSize: 16, color: '#8A8A8A', marginBottom: 24, fontFamily: AuthFonts.regular },
  logoutButton: {
    borderWidth: 1,
    borderColor: AuthColors.primary,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  logoutText: { color: AuthColors.primary, fontFamily: AuthFonts.medium, fontSize: 14 },
});