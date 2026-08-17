import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthColors, AuthFonts } from '@/constants/authTheme';
import { EventItem } from '@/types/models';

type Props = {
  event: EventItem;
  onPressRsvp?: () => void;
  onPressAttendees?: () => void;
};

export default function EventCard({ event, onPressRsvp, onPressAttendees }: Props) {
  const extraAttendees = event.attendeeCount - event.attendeeAvatars.length;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconCircle}>
          <Ionicons name="calendar" size={18} color={AuthColors.primary} />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {event.title}
        </Text>
        <View style={styles.spotsPill}>
          <Text style={styles.spotsText}>{event.spotsLeft} spots left</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="calendar-outline" size={14} color={AuthColors.subtleText} />
        <Text style={styles.metaText}>
          {event.date} · {event.time}
        </Text>
      </View>
      <View style={styles.metaRow}>
        <Ionicons name="location-outline" size={14} color={AuthColors.subtleText} />
        <Text style={styles.metaText}>{event.location}</Text>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.attendeeRow} onPress={onPressAttendees} activeOpacity={0.7}>
        <View style={styles.avatarStack}>
          {event.attendeeAvatars.map((uri, index) => (
            <Image
              key={uri}
              source={{ uri }}
              style={[styles.avatar, { marginLeft: index === 0 ? 0 : -10 }]}
            />
          ))}
          {extraAttendees > 0 ? (
            <View style={[styles.avatar, styles.extraBubble, { marginLeft: -10 }]}>
              <Text style={styles.extraText}>+{extraAttendees}</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.attendeeText}>See who's attending</Text>
        <Ionicons name="chevron-forward" size={14} color={AuthColors.subtleText} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.rsvpButton} onPress={onPressRsvp} activeOpacity={0.85}>
        <Text style={styles.rsvpText}>RSVP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    backgroundColor: AuthColors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AuthColors.border,
    padding: 16,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: AuthColors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  title: { flex: 1, fontSize: 15, fontFamily: AuthFonts.bold, color: AuthColors.text },
  spotsPill: {
    backgroundColor: AuthColors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  spotsText: { fontSize: 11, fontFamily: AuthFonts.medium, color: AuthColors.primary },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  metaText: { fontSize: 12, color: AuthColors.subtleText, fontFamily: AuthFonts.regular },
  divider: { height: 1, backgroundColor: AuthColors.border, marginVertical: 12 },
  attendeeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatarStack: { flexDirection: 'row', alignItems: 'center', marginRight: 10 },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: AuthColors.white,
    backgroundColor: AuthColors.inputBackground,
  },
  extraBubble: { alignItems: 'center', justifyContent: 'center', backgroundColor: AuthColors.border },
  extraText: { fontSize: 9, fontFamily: AuthFonts.bold, color: AuthColors.text },
  attendeeText: { flex: 1, fontSize: 12, color: AuthColors.subtleText, fontFamily: AuthFonts.regular },
  rsvpButton: {
    backgroundColor: AuthColors.primary,
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: 'center',
  },
  rsvpText: { color: AuthColors.white, fontSize: 15, fontFamily: AuthFonts.bold },
});