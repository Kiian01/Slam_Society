import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';
import { EventItem } from '@/types/models';

type Props = {
  event: EventItem;
  onPress?: () => void;
  onPressRsvp?: () => void;
};

// Used for both "Happening Soon" and "Nearby Events" — one flexible card
// rather than two near-identical variants.
export default function EventListCard({ event, onPress, onPressRsvp }: Props) {
  const colors = useThemeColors();
  const actionLabel = event.pricingType === 'paid' ? 'Get Tickets' : 'RSVP';

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image source={{ uri: event.image }} style={styles.image} />

      <View style={styles.body}>
        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={13} color={colors.primary} />
          <Text style={[styles.metaText, { color: colors.primary }]}>
            {event.date} · {event.time}
          </Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {event.title}
        </Text>
        <Text style={[styles.description, { color: colors.subtleText }]} numberOfLines={2}>
          {event.description}
        </Text>

        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={13} color={colors.subtleText} />
          <Text style={[styles.locationText, { color: colors.subtleText }]} numberOfLines={1}>
            {event.location}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={onPressRsvp}
          activeOpacity={0.85}
        >
          <Text style={[styles.actionText, { color: colors.onPrimary }]}>{actionLabel}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 20, marginBottom: 16, borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  image: { width: '100%', height: 150 },
  body: { padding: 14 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  metaText: { fontSize: 12, fontFamily: AuthFonts.medium },
  title: { fontSize: 16, fontFamily: AuthFonts.bold, marginBottom: 4 },
  description: { fontSize: 12, fontFamily: AuthFonts.regular, lineHeight: 17, marginBottom: 8 },
  locationText: { fontSize: 12, fontFamily: AuthFonts.regular, flex: 1 },
  actionButton: { marginTop: 12, borderRadius: 24, paddingVertical: 12, alignItems: 'center' },
  actionText: { fontSize: 14, fontFamily: AuthFonts.bold },
});