import { Reward, RewardRedemption } from '@/types/models';
import { mockRewards } from '@/data/mockRewards';
import { mockCurrentUser } from '@/data/mockUser';

// In-memory only for now.
// TODO(firebase): move redemptions to a "redemptions" collection so admins
// can mark them pending/collected/expired (requirement #15).
const redemptions: RewardRedemption[] = [];
let nextId = 1;

export async function getRewards(): Promise<Reward[]> {
  return Promise.resolve(mockRewards.filter((reward) => reward.status === 'active'));
}

export async function getRedemptions(): Promise<RewardRedemption[]> {
  return Promise.resolve(redemptions);
}

type RedeemResult = { success: boolean; message: string };

export async function redeemReward(rewardId: string): Promise<RedeemResult> {
  const reward = mockRewards.find((r) => r.id === rewardId);
  if (!reward) return { success: false, message: 'Reward not found.' };
  if (reward.vipOnly && !mockCurrentUser.isVip) {
    return { success: false, message: 'This reward is only available to VIP members.' };
  }
  if (mockCurrentUser.points < reward.pointsRequired) {
    return { success: false, message: "You don't have enough SLAM Points for this reward yet." };
  }

  mockCurrentUser.points -= reward.pointsRequired;
  redemptions.unshift({
    id: `redeem-${nextId++}`,
    rewardId: reward.id,
    rewardName: reward.name,
    redeemedAt: 'Just now',
    status: 'pending',
  });

  return { success: true, message: `Reward redeemed. ${reward.collectionMethod}.` };
}