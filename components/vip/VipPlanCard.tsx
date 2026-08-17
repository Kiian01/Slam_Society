import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
  planName: string;
  price: string;
  billingNote?: string;
  badge?: string;
  onPressUpgrade?: () => void;
};

// Pricing shown here is placeholder — swap for your real Monthly/Annual
// pricing whenever it's finalized.
export default function VipPlanCard({ planName, price, billingNote, badge, onPressUpgrade }: Props) {
  const colors = useThemeColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {badge ? (
        <View style={[styles.badge, { backgroundColor: colors.primary }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
      <Text style={[styles.planName, { color: colors.text }]}>{planName}</Text>
      <Text style={[styles.price, { color: colors.primary }]}>{price}</Text>
      {billingNote ? <Text style={[styles.billingNote, { color: colors.subtleText }]}>{billingNote}</Text> : null}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={onPressUpgrade}
        activeOpacity={0.85}
      >
        <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Upgrade</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, borderRadius: 16, borderWidth: 1, padding: 16, position: 'relative' },
  badge: { position: 'absolute', top: -10, right: 12, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { color: '#FFFFFF', fontSize: 10, fontFamily: AuthFonts.bold },
  planName: { fontSize: 14, fontFamily: AuthFonts.bold, marginBottom: 4 },
  price: { fontSize: 20, fontFamily: AuthFonts.bold, marginBottom: 2 },
  billingNote: { fontSize: 11, fontFamily: AuthFonts.regular, marginBottom: 12 },
  button: { borderRadius: 18, paddingVertical: 10, alignItems: 'center', marginTop: 8 },
  buttonText: { fontSize: 13, fontFamily: AuthFonts.bold },
});