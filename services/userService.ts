import { CurrentUser } from '@/types/models';
import { mockCurrentUser } from '@/data/mockUser';

/**
 * Returns the logged-in user's profile.
 *
 * TODO(firebase): replace the body with a real fetch of the signed-in user's
 * document, e.g. firestore().collection('users').doc(uid).get().
 */
export async function getCurrentUser(): Promise<CurrentUser> {
  return Promise.resolve(mockCurrentUser);
}

/**
 * Updates the current (mock) user's profile in place — used by both the
 * private-info quick-edit modal and the full Edit Profile screen.
 *
 * TODO(firebase): replace with
 *   firestore().collection('users').doc(uid).update(partial)
 * Nothing that calls updateCurrentUser() needs to change when you do this.
 */
export async function updateCurrentUser(partial: Partial<CurrentUser>): Promise<CurrentUser> {
  Object.assign(mockCurrentUser, partial);
  return Promise.resolve(mockCurrentUser);
}