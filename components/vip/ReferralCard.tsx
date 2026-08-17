import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
  code: string;
  count: number;
  remainingForFreeVip: number;
  onShare?: () => void;
};

export default function ReferralCard({ code, count, remainingForFreeVip, onShare }: Props) {
  const colors = useThemeColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>Invite friends, earn points</Text>
      <Text style={[styles.subtitle, { color: colors.subtleText }]}>
        {remainingForFreeVip > 0
          ? `${remainingForFreeVip} more referral${remainingForFreeVip === 1 ? '' : 's'} unlocks 2 weeks free VIP`
          : "You've unlocked 2 weeks free VIP from referrals!"}
      </Text>

      <View style={[styles.codeRow, { borderColor: colors.border }]}>
        <Text style={[styles.codeText, { color: colors.primary }]}>{code}</Text>
        <Text style={[styles.countText, { color: colors.subtleText }]}>{count} joined</Text>
      </View>

      <TouchableOpacity
        style={[styles.shareButton, { backgroundColor: colors.primary }]}
        onPress={onShare}
        activeOpacity={0.85}
      >
        <Ionicons name="share-social-outline" size={16} color={colors.onPrimary} />
        <Text style={[styles.shareText, { color: colors.onPrimary }]}>Share Invite Link</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 20, marginBottom: 24, borderRadius: 16, borderWidth: 1, padding: 16 },
  title: { fontSize: 15, fontFamily: AuthFonts.bold, marginBottom: 4 },
  subtitle: { fontSize: 12, fontFamily: AuthFonts.regular, marginBottom: 14, lineHeight: 17 },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  codeText: { fontSize: 15, fontFamily: AuthFonts.bold, letterSpacing: 1 },
  countText: { fontSize: 12, fontFamily: AuthFonts.regular },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 20,
    paddingVertical: 12,
  },
  shareText: { fontSize: 13, fontFamily: AuthFonts.bold },
});