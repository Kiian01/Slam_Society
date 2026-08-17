import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = { balance: number };

// Exact wording from the client — intentionally vague about the points
// conversion rather than exposing the underlying earning rules.
const EARNING_COPY =
  'Earn SLAM Points when you attend events, invite friends, use perks and get involved in the SLAM community. Use your points towards event credits, VIP upgrades, SLAM merch, partner perks and entries into major prize draws.';

export default function PointsWalletCard({ balance }: Props) {
  const colors = useThemeColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.primary }]}>
      <Text style={styles.label}>SLAM Points</Text>
      <Text style={styles.balance}>{balance.toLocaleString()}</Text>
      <Text style={styles.copy}>{EARNING_COPY}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 20, borderRadius: 20, padding: 20, marginBottom: 20 },
  label: { color: '#FFFFFF', fontSize: 13, fontFamily: AuthFonts.medium, opacity: 0.9 },
  balance: { color: '#FFFFFF', fontSize: 34, fontFamily: AuthFonts.bold, marginTop: 4, marginBottom: 10 },
  copy: { color: '#FFFFFF', fontSize: 12, lineHeight: 18, fontFamily: AuthFonts.regular, opacity: 0.95 },
});