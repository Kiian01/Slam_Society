import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
  standardPrice: number;
  vipPrice: number;
};

// Client requirement: every paid event must clearly show Standard vs VIP
// price, plus how much VIP saves.
export default function PricingCard({ standardPrice, vipPrice }: Props) {
  const colors = useThemeColors();
  const savings = standardPrice - vipPrice;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.subtleText }]}>Standard</Text>
        <Text style={[styles.price, { color: colors.text }]}>${standardPrice}</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.primary }]}>SLAM VIP</Text>
        <Text style={[styles.price, { color: colors.primary }]}>${vipPrice}</Text>
      </View>
      {savings > 0 ? (
        <View style={[styles.savingsPill, { backgroundColor: colors.primary }]}>
          <Text style={[styles.savingsText, { color: colors.onPrimary }]}>VIP saves ${savings}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, padding: 16, marginHorizontal: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  label: { fontSize: 14, fontFamily: AuthFonts.medium },
  price: { fontSize: 18, fontFamily: AuthFonts.bold },
  divider: { height: 1, marginVertical: 4 },
  savingsPill: { alignSelf: 'flex-start', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, marginTop: 10 },
  savingsText: { fontSize: 12, fontFamily: AuthFonts.bold },
});