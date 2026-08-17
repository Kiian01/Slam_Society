import { SuggestedPerson } from '@/types/models';
import { mockPeople } from '@/data/mockPeople';

/**
 * Returns suggested people to connect with.
 *
 * TODO(firebase): replace the body with a real query, e.g. filtered by shared
 * interests or proximity, paginated with startAfter/limit.
 */
export async function getSuggestedPeople(): Promise<SuggestedPerson[]> {
  return Promise.resolve(mockPeople);
}