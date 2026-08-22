import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Attendee } from '@/types/models';

/**
 * Returns everyone who has RSVP'd to an event — reads the same
 * events/{eventId}/rsvps subcollection that rsvpService writes to, so
 * "attendees" and "RSVPs" are always in sync automatically.
 */
export async function getAttendees(eventId: string): Promise<Attendee[]> {
  const snap = await getDocs(collection(db, 'events', eventId, 'rsvps'));
  return snap.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.userName,
      avatar: data.userAvatar,
    };
  });
}