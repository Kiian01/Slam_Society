import { collection, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { EventItem, EventCategory } from '@/types/models';

function mapEventDoc(docSnap: any): EventItem {
  const data = docSnap.data();
  const capacity = data.capacity ?? 0;
  const rsvpCount = data.rsvpCount ?? 0;
  return {
    id: docSnap.id,
    title: data.title,
    category: data.category,
    image: data.image,
    date: data.date,
    time: data.time,
    location: data.location,
    description: data.description,
    pricingType: data.pricingType,
    standardPrice: data.standardPrice ?? undefined,
    vipPrice: data.vipPrice ?? undefined,
    spotsLeft: Math.max(0, capacity - rsvpCount),
    // Not populated yet — the event detail page's attendee preview pulls
    // real data from attendeesService instead, so this staying empty just
    // means the small avatar stack on the Home/Events cards is blank for now.
    attendeeAvatars: data.attendeeAvatars ?? [],
    attendeeCount: rsvpCount,
  };
}

/** Returns upcoming events, newest first. */
export async function getUpcomingEvents(): Promise<EventItem[]> {
  const snap = await getDocs(query(collection(db, 'events'), orderBy('createdAt', 'desc')));
  return snap.docs.map(mapEventDoc);
}

export async function getEventById(id: string): Promise<EventItem | undefined> {
  const snap = await getDoc(doc(db, 'events', id));
  if (!snap.exists()) return undefined;
  return mapEventDoc(snap);
}

export async function getEventsByCategory(category: EventCategory | 'all'): Promise<EventItem[]> {
  if (category === 'all') return getUpcomingEvents();
  const snap = await getDocs(query(collection(db, 'events'), where('category', '==', category)));
  return snap.docs.map(mapEventDoc);
}