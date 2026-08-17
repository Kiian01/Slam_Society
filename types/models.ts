// Shared shapes for Home/Events/Community/Profile/VIP data. Keep these in
// sync with your future Firestore documents so swapping mock data for real
// queries is a non-event.

export type EventCategory = 'social' | 'business' | 'wellness' | 'getaways';
export type EventPricingType = 'free' | 'paid';

export type EventItem = {
  id: string;
  title: string;
  category: EventCategory;
  image: string;
  date: string;
  time: string;
  location: string;
  description: string;
  pricingType: EventPricingType;
  standardPrice?: number;
  vipPrice?: number;
  spotsLeft: number;
  attendeeAvatars: string[];
  attendeeCount: number;
};

export type Attendee = {
  id: string;
  name: string;
  avatar: string;
};

export type ExploreCategory = {
  id: string;
  label: string;
  upcomingCount: number;
  colorLight: string;
  colorDark: string;
};

export type SuggestedPerson = {
  id: string;
  name: string;
  occupation: string;
  location: string;
  avatar: string;
};

export type Post = {
  id: string;
  authorName: string;
  authorAvatar: string;
  postedAt: string;
  content: string;
  image?: string;
  likeCount: number;
  commentCount: number;
};

export type VipPlan = 'monthly' | 'annual';

export type CurrentUser = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  interests: string[];
  email: string;
  dob: string;
  occupation: string;
  phone: string;
  isVip: boolean;
  vipPlan?: VipPlan;
  points: number;
  profileCompleted: boolean;
  referralCode: string;
  referralCount: number;
};

// --- SLAM Points & Rewards ---

export type RewardType =
  | 'event_credit'
  | 'vip_upgrade'
  | 'merch'
  | 'partner_perk'
  | 'prize_entry'
  | 'retreat_credit';

export type RewardStatus = 'active' | 'inactive';
export type RedemptionStatus = 'pending' | 'collected' | 'expired';

export type Reward = {
  id: string;
  name: string;
  type: RewardType;
  pointsRequired: number;
  quantityAvailable: number; // -1 = unlimited
  collectionMethod: string;
  expiryDate?: string;
  vipOnly: boolean;
  status: RewardStatus;
};

export type RewardRedemption = {
  id: string;
  rewardId: string;
  rewardName: string;
  redeemedAt: string;
  status: RedemptionStatus;
};

export type PointsTransaction = {
  id: string;
  reason: string;
  points: number;
  date: string;
};