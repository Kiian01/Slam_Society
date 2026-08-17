import { mockCurrentUser } from '@/data/mockUser';
import { POINTS_RULES } from '@/data/pointsRules';

// TODO(firebase): real referral tracking needs a deep-link provider (e.g.
// Firebase Dynamic Links) plus a backend record of who invited whom
// (requirement #15 — "Track referrals" / "See who referred each user").
// This returns mock counts for now; the share action itself is real.
export async function getReferralInfo() {
  return Promise.resolve({
    code: mockCurrentUser.referralCode,
    count: mockCurrentUser.referralCount,
    remainingForFreeVip: Math.max(0, POINTS_RULES.referralsForFreeVip - mockCurrentUser.referralCount),
  });
}