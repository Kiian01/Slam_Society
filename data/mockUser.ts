import { CurrentUser } from '@/types/models';

// Placeholder — replace with the logged-in user's real Firestore profile later.
export const mockCurrentUser: CurrentUser = {
  id: 'me',
  name: 'Test',
  avatar: 'https://i.pravatar.cc/300?img=68',
  bio: "Hi! I'm Tester, a software designer. I love connecting with people who share my interests — dancing, traveling, and music are a few of my favorites.",
  interests: ['Yoga', 'Art', 'Photography', 'Networking', 'Designing', 'Business'],
  email: 'test@example.com',
  dob: '2003-05-06',
  occupation: 'Software Designer',
  phone: '0712345678',
  isVip: false,
  points: 120,
  profileCompleted: false,
  referralCode: 'REFER123',
  referralCount: 1,
};