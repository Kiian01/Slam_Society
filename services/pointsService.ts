import { PointsTransaction } from '@/types/models';
import { mockCurrentUser } from '@/data/mockUser';
import { POINTS_RULES } from '@/data/pointsRules';

// In-memory only for now.
// TODO(firebase): move this to a "pointsTransactions" collection written by
// a Cloud Function (never trust point awards from the client directly), with
// the balance recalculated server-side.
const history: PointsTransaction[] = [];
let nextId = 1;

export async function getPointsBalance(): Promise<number> {
  return Promise.resolve(mockCurrentUser.points);
}

export async function getPointsHistory(): Promise<PointsTransaction[]> {
  return Promise.resolve(history);
}

/**
 * Awards points for a real, verified action (never for RSVP alone — see
 * client requirement #11). Applies the VIP 1.5x multiplier automatically.
 * basePoints should be one of the POINTS_RULES values.
 */
export async function awardPoints(reason: string, basePoints: number): Promise<number> {
  const multiplier = mockCurrentUser.isVip ? POINTS_RULES.vipMultiplier : 1;
  const earned = Math.round(basePoints * multiplier);
  mockCurrentUser.points += earned;
  history.unshift({ id: `txn-${nextId++}`, reason, points: earned, date: 'Just now' });
  return Promise.resolve(earned);
}