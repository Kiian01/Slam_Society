import { SuggestedPerson } from '@/types/models';

// Placeholder data — replace with a Firestore "users" query (e.g. filtered by
// shared interests/location) later.
export const mockPeople: SuggestedPerson[] = [
  {
    id: 'usr-1',
    name: 'Sarah',
    occupation: 'Wellness Coach',
    location: 'Sutherland',
    avatar: 'https://i.pravatar.cc/300?img=47',
  },
  {
    id: 'usr-2',
    name: 'Emily',
    occupation: 'Marketing Manager',
    location: 'Sydney',
    avatar: 'https://i.pravatar.cc/300?img=48',
  },
  {
    id: 'usr-3',
    name: 'Priya',
    occupation: 'UX Designer',
    location: 'Parramatta',
    avatar: 'https://i.pravatar.cc/300?img=49',
  },
  {
    id: 'usr-4',
    name: 'Jack',
    occupation: 'Photographer',
    location: 'Bondi',
    avatar: 'https://i.pravatar.cc/300?img=13',
  },
];