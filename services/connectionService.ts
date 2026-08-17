// In-memory only for now — tracks whether the current (mock) user has used
// their one free RSVP connection for a given event, and who they've connected
// with. Resets on app reload.
//
// TODO(firebase): replace with a "connections" collection, one doc per
// (userId, eventId, personId), so this survives restarts and works across devices.

const usedFreeConnection = new Set<string>(); // eventId
const connectedPeople = new Set<string>(); // `${eventId}:${personId}`

export function hasUsedFreeConnection(eventId: string): boolean {
  return usedFreeConnection.has(eventId);
}

export function isConnected(eventId: string, personId: string): boolean {
  return connectedPeople.has(`${eventId}:${personId}`);
}

type ConnectResult = { success: boolean; message?: string };

export async function connectWithPerson(
  eventId: string,
  personId: string,
  isVip: boolean
): Promise<ConnectResult> {
  if (isConnected(eventId, personId)) {
    return { success: true };
  }
  if (!isVip && hasUsedFreeConnection(eventId)) {
    return {
      success: false,
      message:
        "You've used your free connection for this event — upgrade to VIP for unlimited connections.",
    };
  }
  connectedPeople.add(`${eventId}:${personId}`);
  if (!isVip) {
    usedFreeConnection.add(eventId);
  }
  return { success: true };
}