import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { mockEvents } from '@/data/mockEvents';

/**
 * One-time helper to push your existing mock events into Firestore so
 * there's real data to test against. Safe to run more than once — it just
 * overwrites the same doc IDs (evt-1, evt-2, etc.), it won't duplicate them.
 *
 * Delete this file (and the temporary button that calls it in events.tsx)
 * once you're managing events for real.
 */
export async function seedEvents(): Promise<number> {
  let count = 0;
  for (const event of mockEvents) {
    await setDoc(doc(db, 'events', event.id), {
      title: event.title,
      category: event.category,
      image: event.image,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      pricingType: event.pricingType,
      standardPrice: event.standardPrice ?? null,
      vipPrice: event.vipPrice ?? null,
      capacity: event.spotsLeft, // starting capacity — remaining spots are computed as capacity - rsvpCount
      rsvpCount: 0,
      createdAt: serverTimestamp(),
    });
    count += 1;
  }
  return count;
}