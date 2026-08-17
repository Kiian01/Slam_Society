import { EventItem, EventCategory } from '@/types/models';
import { mockEvents } from '@/data/mockEvents';

/**
 * Returns upcoming events, soonest first.
 *
 * TODO(firebase): replace the body with something like:
 *   const snapshot = await firestore()
 *     .collection('events')
 *     .where('date', '>=', new Date())
 *     .orderBy('date')
 *     .get();
 *   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
 *
 * Nothing that calls getUpcomingEvents() needs to change when you do this —
 * it already returns a Promise, same shape, same import path.
 */
export async function getUpcomingEvents(): Promise<EventItem[]> {
  return Promise.resolve(mockEvents);
}

/** TODO(firebase): replace with firestore().collection('events').doc(id).get() */
export async function getEventById(id: string): Promise<EventItem | undefined> {
  return Promise.resolve(mockEvents.find((event) => event.id === id));
}
 
/** TODO(firebase): replace with a .where('category', '==', category) query */
export async function getEventsByCategory(
  category: EventCategory | 'all'
): Promise<EventItem[]> {
  if (category === 'all') return Promise.resolve(mockEvents);
  return Promise.resolve(mockEvents.filter((event) => event.category === category));
}