import { Reward } from '@/types/models';

// Placeholder data — replace with a Firestore "rewards" collection admins
// manage later (requirement #13/#15).
export const mockRewards: Reward[] = [
  {
    id: 'rwd-1',
    name: '$10 Event Credit',
    type: 'event_credit',
    pointsRequired: 1000,
    quantityAvailable: -1,
    collectionMethod: 'Automatically applied to your next event booking',
    vipOnly: false,
    status: 'active',
  },
  {
    id: 'rwd-2',
    name: 'SLAM Water Bottle',
    type: 'merch',
    pointsRequired: 1500,
    quantityAvailable: 40,
    collectionMethod: 'Collect at your next SLAM event',
    vipOnly: false,
    status: 'active',
  },
  {
    id: 'rwd-3',
    name: 'SLAM Hat',
    type: 'merch',
    pointsRequired: 2000,
    quantityAvailable: 25,
    collectionMethod: 'Collect at your next SLAM event',
    vipOnly: false,
    status: 'active',
  },
  {
    id: 'rwd-4',
    name: '1 Month VIP',
    type: 'vip_upgrade',
    pointsRequired: 3000,
    quantityAvailable: -1,
    collectionMethod: 'Applied automatically to your account',
    vipOnly: false,
    status: 'active',
  },
  {
    id: 'rwd-5',
    name: 'Free Selected SLAM Event',
    type: 'prize_entry',
    pointsRequired: 5000,
    quantityAvailable: 10,
    collectionMethod: 'Collect at your next SLAM event',
    vipOnly: false,
    status: 'active',
  },
];