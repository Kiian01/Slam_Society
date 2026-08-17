import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Reward } from '@/types/models';

const REWARD_ICONS: Record<Reward['type'], keyof typeof Ionicons.glyphMap> = {
  event_credit: 'pricetag-outline',
  vip_upgrade: 'star-outline',
  merch: 'gift-outline',
  partner_perk: 'sparkles-outline',
  prize_entry: 'trophy-outline',
  retreat_credit: 'airplane-outline',
};

type Props = {
  reward: Reward;
  currentPoints: number;
  onRedeem?: () => void;
};

export default function RewardCard({ reward, currentPoints, onRedeem }: Props) {
  const colors = useThemeColors();
  const canAfford = currentPoints >= reward.pointsRequired;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.iconCircle, { backgroundColor: colors.background }]}>
        <Ionicons name={REWARD_ICONS[reward.type]} size={20} color={colors.primary} />
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]}>{reward.name}</Text>
        <Text style={[styles.points, { color: colors.subtleText }]}>
          {reward.pointsRequired.toLocaleString()} points
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.redeemButton, { backgroundColor: canAfford ? colors.primary : colors.border }]}
        onPress={onRedeem}
        disabled={!canAfford}
        activeOpacity={0.85}
      >
        <Text style={[styles.redeemText, { color: canAfford ? colors.onPrimary : colors.subtleText }]}>
          Redeem
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    gap: 12,
  },
  iconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  name: { fontSize: 14, fontFamily: AuthFonts.bold },
  points: { fontSize: 12, fontFamily: AuthFonts.regular, marginTop: 2 },
  redeemButton: { borderRadius: 16, paddingHorizontal: 14, paddingVertical: 8 },
  redeemText: { fontSize: 12, fontFamily: AuthFonts.bold },
});