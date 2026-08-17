import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Alert, Share } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';
import { getCurrentUser, updateCurrentUser } from '@/services/userService';
import { awardPoints } from '@/services/pointsService';
import { getRewards, redeemReward } from '@/services/rewardsService';
import { getReferralInfo } from '@/services/referralsService';
import { POINTS_RULES } from '@/data/pointsRules';
import { CurrentUser, Reward } from '@/types/models';

import SectionHeader from '@/components/home/SectionHeader';
import PointsWalletCard from '@/components/vip/PointsWalletCard';
import VipPlanCard from '@/components/vip/VipPlanCard';
import RewardCard from '@/components/vip/RewardCard';
import ReferralCard from '@/components/vip/ReferralCard';

const VIP_BENEFITS = [
  'Event discounts',
  'VIP-only perks',
  'Bonus SLAM Points (1.5x)',
  'More event connections',
  "Full Who's Going visibility",
  'Priority access where available',
];

type ReferralInfo = { code: string; count: number; remainingForFreeVip: number };

export default function VIP() {
  const colors = useThemeColors();
  const tabBarHeight = useBottomTabBarHeight();

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [referral, setReferral] = useState<ReferralInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [userData, rewardsData, referralData] = await Promise.all([
      getCurrentUser(),
      getRewards(),
      getReferralInfo(),
    ]);
    setUser(userData);
    setRewards(rewardsData);
    setReferral(referralData);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleUpgrade = async (plan: 'monthly' | 'annual') => {
    await updateCurrentUser({ isVip: true, vipPlan: plan });
    await awardPoints('Joined VIP', POINTS_RULES.joinVip);
    Alert.alert('Welcome to VIP', "You're now a SLAM VIP member — your points now earn 1.5x faster.");
    loadData();
  };

  const handleRedeem = async (reward: Reward) => {
    const result = await redeemReward(reward.id);
    Alert.alert(result.success ? 'Reward redeemed' : "Can't redeem yet", result.message);
    if (result.success) loadData();
  };

  const handleShareInvite = () => {
    if (!referral) return;
    Share.share({
      message: `Join me on SLAM! Use my invite code ${referral.code} when you sign up.`,
    });
  };

  if (loading || !user || !referral) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 60, paddingBottom: tabBarHeight + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.pageTitle, { color: colors.text }]}>VIP & SLAM Points</Text>

        <PointsWalletCard balance={user.points} />

        {!user.isVip ? (
          <View style={styles.section}>
            <SectionHeader title="Upgrade to VIP" subtitle="Event discounts, bonus points, and more" />
            <View style={styles.planRow}>
              <VipPlanCard
                planName="Monthly VIP"
                price="$19.99/mo"
                onPressUpgrade={() => handleUpgrade('monthly')}
              />
              <VipPlanCard
                planName="Annual VIP"
                price="$199/yr"
                billingNote="Save ~17%"
                badge="Best value"
                onPressUpgrade={() => handleUpgrade('annual')}
              />
            </View>
            <View style={[styles.benefitsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              {VIP_BENEFITS.map((benefit) => (
                <View key={benefit} style={styles.benefitRow}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
                  <Text style={[styles.benefitText, { color: colors.text }]}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={[styles.vipStatusCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.vipStatusTitle, { color: colors.primary }]}>You're a SLAM VIP</Text>
            <Text style={[styles.vipStatusPlan, { color: colors.subtleText }]}>
              {user.vipPlan === 'annual' ? 'Annual plan' : 'Monthly plan'} · Points earn 1.5x faster
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <SectionHeader title="Rewards" subtitle="Redeem your SLAM Points" />
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              currentPoints={user.points}
              onRedeem={() => handleRedeem(reward)}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="Referrals" />
          <ReferralCard
            code={referral.code}
            count={referral.count}
            remainingForFreeVip={referral.remainingForFreeVip}
            onShare={handleShareInvite}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { fontSize: 20, fontFamily: AuthFonts.bold, paddingHorizontal: 20, marginBottom: 16 },
  section: { marginTop: 8, marginBottom: 20 },
  planRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginBottom: 16 },
  benefitsCard: { marginHorizontal: 20, borderRadius: 16, borderWidth: 1, padding: 16 },
  benefitRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  benefitText: { fontSize: 13, fontFamily: AuthFonts.regular },
  vipStatusCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
  },
  vipStatusTitle: { fontSize: 17, fontFamily: AuthFonts.bold, marginBottom: 4 },
  vipStatusPlan: { fontSize: 12, fontFamily: AuthFonts.regular },
});