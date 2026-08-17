import { Attendee } from '@/types/models';
import { mockAttendees } from '@/data/mockAttendees';

/**
 * Returns attendees for a given event.
 * TODO(firebase): replace with events/{eventId}/attendees subcollection query.
 */
export async function getAttendees(eventId: string): Promise<Attendee[]> {
  return Promise.resolve(mockAttendees[eventId] ?? []);
}