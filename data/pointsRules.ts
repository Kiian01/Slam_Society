// Suggested MVP backend rules from the client — the single source of truth
// for all point-awarding logic. Public-facing copy stays intentionally vague
// (see PointsWalletCard) — these exact numbers only ever appear in code.
//
// TODO(firebase): move this to a "config" doc admins can edit (requirement
// #15 — "Adjust points values"), rather than a hardcoded constant.
export const POINTS_RULES = {
  createAccount: 25,
  completeProfile: 50,
  attendFreeEvent: 50,
  attendPaidEvent: 100,
  spendPerDollar: 1,
  friendJoinsViaInvite: 150,
  referralsForFreeVip: 3, // unlocks 2 weeks free VIP
  joinVip: 300,
  vipMultiplier: 1.5,
};