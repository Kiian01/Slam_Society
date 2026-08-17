import { Attendee } from '@/types/models';

// Placeholder data — replace with a Firestore "attendees" subcollection per
// event later (e.g. events/{eventId}/attendees).

const evt1Names = [
  'Sarah White', 'Lesha Fernandes', 'Grisha Brown', 'Leya White', 'Emily Watt',
  'Lily Pot', 'Hana Tyson', 'Libra Scoth', 'Brinda Kyle', 'Emily McQueen',
  'Freya Darth', 'Padme Nebula', 'Sophiya Therry', 'Zena Wheel', 'Kriti Indian',
];

const genericNames = [
  'Alex Rivera', 'Jordan Lee', 'Casey Kim', 'Morgan Blake', 'Taylor Reed',
  'Jamie Cole', 'Riley Stone', 'Drew Ashford', 'Quinn Parker', 'Skyler Vance',
];

function buildAttendees(names: string[], avatarSeedStart: number): Attendee[] {
  return names.map((name, index) => ({
    id: name.replace(/\s+/g, '-').toLowerCase(),
    name,
    avatar: `https://i.pravatar.cc/150?img=${avatarSeedStart + index}`,
  }));
}

export const mockAttendees: Record<string, Attendee[]> = {
  'evt-1': buildAttendees(evt1Names, 1),
  'evt-2': buildAttendees(genericNames.slice(0, 6), 20),
  'evt-3': buildAttendees(genericNames.slice(0, 4), 30),
  'evt-4': buildAttendees(genericNames.slice(0, 3), 40),
  'evt-5': buildAttendees(genericNames.slice(0, 8), 50),
  'evt-6': buildAttendees(genericNames.slice(0, 5), 60),
};