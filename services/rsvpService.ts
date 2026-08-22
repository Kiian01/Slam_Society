import { doc, getDoc, updateDoc, runTransaction, serverTimestamp, increment } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { awardPoints } from '@/services/pointsService';

type ActionResult = { success: boolean; message?: string };

export async function getRsvpStatus(eventId: string, userId: string) {
  const snap = await getDoc(doc(db, 'events', eventId, 'rsvps', userId));
  if (!snap.exists()) return { isGoing: false, checkedIn: false };
  const data = snap.data();
  return { isGoing: true, checkedIn: !!data.checkedIn };
}

/**
 * RSVPs the given user to an event. Uses a transaction so two people RSVPing
 * for the last spot at the same moment can't both get in — Firestore
 * transactions handle that race condition for us.
 */
export async function rsvpToEvent(eventId: string, userId: string): Promise<ActionResult> {
  const eventRef = doc(db, 'events', eventId);
  const rsvpRef = doc(db, 'events', eventId, 'rsvps', userId);

  // Pull the user's profile once, outside the transaction, and denormalize
  // name/avatar onto the RSVP doc — avoids extra lookups when the attendee
  // list renders. No real avatar upload yet, so this generates an
  // initials-based placeholder until Profile photo uploads are wired up.
  const userSnap = await getDoc(doc(db, 'users', userId));
  const userName = userSnap.exists() ? (userSnap.data().name ?? 'SLAM Member') : 'SLAM Member';
  const userAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=E85D75&color=fff`;

  try {
    await runTransaction(db, async (transaction) => {
      const eventDoc = await transaction.get(eventRef);
      if (!eventDoc.exists()) throw new Error('Event not found.');

      const existingRsvp = await transaction.get(rsvpRef);
      if (existingRsvp.exists()) return; // already RSVP'd — no-op, not an error

      const eventData = eventDoc.data();
      const capacity = eventData.capacity ?? 0;
      const rsvpCount = eventData.rsvpCount ?? 0;
      if (rsvpCount >= capacity) {
        throw new Error('This event is full.');
      }

      transaction.set(rsvpRef, {
        userId,
        userName,
        userAvatar,
        rsvpAt: serverTimestamp(),
        checkedIn: false,
        checkedInAt: null,
      });
      transaction.update(eventRef, { rsvpCount: increment(1) });
    });
    return { success: true };
  } catch (err: any) {
    return { success: false, message: err?.message ?? 'Something went wrong RSVPing.' };
  }
}

type CheckInResult = ActionResult & { pointsEarned?: number };

/**
 * Client-triggered check-in — the guest taps this themselves, so it is NOT
 * verified attendance yet (per your requirement, that needs a host-facing
 * QR scan or "mark attended" tool, which doesn't exist yet). This exists so
 * the RSVP-vs-attendance distinction and point values are correct and ready.
 *
 * Points are still awarded through the existing mock pointsService, since
 * Profile/Points hasn't been migrated to Firestore yet — that's next.
 */
export async function checkInToEvent(
  eventId: string,
  userId: string,
  eventTitle: string,
  basePoints: number
): Promise<CheckInResult> {
  const rsvpRef = doc(db, 'events', eventId, 'rsvps', userId);
  const rsvpSnap = await getDoc(rsvpRef);

  if (!rsvpSnap.exists()) {
    return { success: false, message: 'You need to RSVP before checking in.' };
  }
  if (rsvpSnap.data().checkedIn) {
    return { success: false, message: "You're already checked in." };
  }

  await updateDoc(rsvpRef, { checkedIn: true, checkedInAt: serverTimestamp() });
  const earned = await awardPoints(`Checked in to ${eventTitle}`, basePoints);

  return { success: true, pointsEarned: earned };
}