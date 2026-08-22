import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useAuth } from '@/context/AuthContext';
import { getEventById } from '@/services/eventsService';
import { getAttendees } from '@/services/attendeesService';
import { getRsvpStatus, rsvpToEvent, checkInToEvent } from '@/services/rsvpService';

import ScriptHeading from '@/components/events/ScriptHeading';
import PricingCard from '@/components/events/PricingCard';
import AttendeesPreview from '@/components/events/AttendeesPreview';
import { POINTS_RULES } from '@/data/pointsRules';

// Static for now — swap for a real comments collection later.
const mockComments = [
  { id: 'c1', name: 'Teresa', text: 'I am so excited for this event. Hope to meet you all.' },
  { id: 'c2', name: 'Linda', text: 'I hope it will go well like last time.' },
  { id: 'c3', name: 'Kelly', text: "Can't wait to meet with new member." },
  { id: 'c4', name: 'Mikasa', text: 'Hi everyone!! See u soon!!' },
];

export default function EventDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useThemeColors();
  const { user } = useAuth(); // guaranteed non-null here — this route is behind Stack.Protected
  const [refreshKey, setRefreshKey] = useState(0);
  const [actionLoading, setActionLoading] = useState(false);

  const { data: event, loading: eventLoading } = useAsyncData(() => getEventById(id), [id, refreshKey]);
  const { data: attendees, loading: attendeesLoading } = useAsyncData(
    () => getAttendees(id),
    [id, refreshKey]
  );
  const { data: rsvpStatus, loading: rsvpLoading } = useAsyncData(
    () => getRsvpStatus(id, user!.uid),
    [id, user?.uid, refreshKey]
  );

  const isLoading = eventLoading || attendeesLoading || rsvpLoading;

  if (isLoading || !event || !rsvpStatus) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  const isGoing = rsvpStatus.isGoing;
  const checkedIn = rsvpStatus.checkedIn;
  const previewAvatars = (attendees ?? []).slice(0, 3).map((a) => a.avatar);
  const previewNames = (attendees ?? []).slice(0, 2).map((a) => a.name.split(' ')[0]);
  const isPaid = event.pricingType === 'paid';
  const actionLabel = isPaid ? 'Tickets' : isGoing ? "You're Going ✓" : 'RSVP';

  const handleAction = async () => {
    if (isPaid) {
      Alert.alert('Tickets', "Checkout isn't wired up yet — this is a placeholder for now.");
      return;
    }
    if (isGoing || actionLoading) return;

    setActionLoading(true);
    const result = await rsvpToEvent(id, user!.uid);
    setActionLoading(false);

    if (!result.success) {
      Alert.alert("Can't RSVP", result.message ?? 'Something went wrong.');
      return;
    }
    setRefreshKey((k) => k + 1);
  };

  // Placeholder for check-in — client requirement #11 is explicit that RSVP
  // alone should never award points, only real attendance. A real version
  // needs a host-facing tool (QR scan or "mark attended") since a button the
  // guest taps themselves isn't verified. This exists so the RSVP-vs-attendance
  // data model and point values are correct and ready to wire up once that
  // tool exists.
  const handleCheckIn = async () => {
    if (checkedIn || actionLoading) return;
    setActionLoading(true);
    const basePoints = isPaid ? POINTS_RULES.attendPaidEvent : POINTS_RULES.attendFreeEvent;
    const result = await checkInToEvent(id, user!.uid, event.title, basePoints);
    setActionLoading(false);

    if (!result.success) {
      Alert.alert("Can't check in", result.message ?? 'Something went wrong.');
      return;
    }
    setRefreshKey((k) => k + 1);
    Alert.alert('Checked in!', `You earned ${result.pointsEarned} SLAM Points for attending.`);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={styles.heroWrapper}>
        <Image source={{ uri: event.image }} style={styles.hero} />
        <View style={styles.heroTopRow}>
          <TouchableOpacity
            style={[styles.circleButton, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.heroTopRightRow}>
            <TouchableOpacity style={[styles.circleButton, { backgroundColor: colors.primary }]}>
              <Ionicons name="share-outline" size={16} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.circleButton, { backgroundColor: colors.primary }]}>
              <Ionicons name="ellipsis-vertical" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.heroTitleWrap}>
          <Text style={styles.heroTitle}>{event.title}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <ScriptHeading>Time and Location</ScriptHeading>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={15} color={colors.subtleText} />
          <Text style={[styles.metaText, { color: colors.subtleText }]}>
            {event.date}, {event.time}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={15} color={colors.subtleText} />
          <Text style={[styles.metaText, { color: colors.subtleText }]}>{event.location}</Text>
        </View>

        <ScriptHeading>About The Event</ScriptHeading>
        <Text style={[styles.description, { color: colors.text }]}>{event.description}</Text>

        {isPaid && event.standardPrice && event.vipPrice ? (
          <View style={styles.pricingWrapper}>
            <PricingCard standardPrice={event.standardPrice} vipPrice={event.vipPrice} />
          </View>
        ) : null}

        <ScriptHeading>See who attending</ScriptHeading>
        <AttendeesPreview
          avatars={previewAvatars}
          names={previewNames}
          totalCount={event.attendeeCount}
          onPress={() => router.push(`/event/${event.id}/attendees`)}
        />

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: isGoing && !isPaid ? colors.border : colors.primary },
          ]}
          onPress={handleAction}
          activeOpacity={0.85}
          disabled={(isGoing && !isPaid) || actionLoading}
        >
          {actionLoading && !isGoing ? (
            <ActivityIndicator color={colors.onPrimary} />
          ) : (
            <Text style={[styles.actionText, { color: isGoing && !isPaid ? colors.text : colors.onPrimary }]}>
              {actionLabel}
            </Text>
          )}
        </TouchableOpacity>

        {isGoing ? (
          <>
            <Text style={[styles.unlockText, { color: colors.subtleText }]}>
              You're in! This RSVP unlocks the event chat, attendee visibility, and 1 free connection for
              this event.
            </Text>
            <TouchableOpacity
              style={[
                styles.checkInButton,
                { borderColor: colors.primary, backgroundColor: checkedIn ? colors.border : 'transparent' },
              ]}
              onPress={handleCheckIn}
              disabled={checkedIn || actionLoading}
              activeOpacity={0.85}
            >
              {actionLoading && !checkedIn ? (
                <ActivityIndicator color={colors.primary} />
              ) : (
                <Text style={[styles.checkInText, { color: checkedIn ? colors.subtleText : colors.primary }]}>
                  {checkedIn ? "You're checked in ✓" : 'Check In (at the event)'}
                </Text>
              )}
            </TouchableOpacity>
          </>
        ) : null}

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <ScriptHeading>Comments</ScriptHeading>
        <View style={[styles.commentInput, { borderColor: colors.border }]}>
          <Text style={{ color: colors.subtleText, fontFamily: AuthFonts.regular, fontSize: 13 }}>
            Add Your Comment...
          </Text>
        </View>
        {mockComments.map((comment) => (
          <View key={comment.id} style={styles.commentRow}>
            <Text style={[styles.commentAuthor, { color: colors.primary }]}>@{comment.name}</Text>
            <Text style={[styles.commentText, { color: colors.text }]}>{comment.text}</Text>
          </View>
        ))}
        <Text style={[styles.seeMore, { color: colors.primary }]}>See more....</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  heroWrapper: { position: 'relative' },
  hero: { width: '100%', height: 260 },
  heroTopRow: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroTopRightRow: { flexDirection: 'row', gap: 10 },
  circleButton: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  heroTitleWrap: { position: 'absolute', bottom: 16, left: 16, right: 16 },
  heroTitle: { color: '#FFFFFF', fontSize: 20, fontFamily: AuthFonts.bold },
  content: { padding: 20 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  metaText: { fontSize: 13, fontFamily: AuthFonts.regular },
  description: { fontSize: 13, lineHeight: 20, fontFamily: AuthFonts.regular, marginBottom: 8 },
  pricingWrapper: { marginHorizontal: -20, marginVertical: 12 },
  actionButton: { marginTop: 16, borderRadius: 24, paddingVertical: 15, alignItems: 'center' },
  actionText: { fontSize: 15, fontFamily: AuthFonts.bold },
  unlockText: { fontSize: 11, fontFamily: AuthFonts.regular, marginTop: 8, lineHeight: 16 },
  checkInButton: {
    marginTop: 14,
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: 'center',
  },
  checkInText: { fontSize: 13, fontFamily: AuthFonts.bold },
  divider: { height: 1, marginVertical: 20 },
  commentInput: { borderBottomWidth: 1, paddingVertical: 10, marginBottom: 16 },
  commentRow: { marginBottom: 12 },
  commentAuthor: { fontSize: 12, fontFamily: AuthFonts.bold, marginBottom: 2 },
  commentText: { fontSize: 13, fontFamily: AuthFonts.regular },
  seeMore: { fontSize: 12, fontFamily: AuthFonts.medium, marginTop: 4 },
});