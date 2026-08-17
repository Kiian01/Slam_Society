import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthColors, AuthFonts } from '@/constants/authTheme';
import { SuggestedPerson } from '@/types/models';

type Props = {
  person: SuggestedPerson;
  onPressConnect?: () => void;
};

export default function PersonCard({ person, onPressConnect }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: person.avatar }} style={styles.avatar} />
      <Text style={styles.name} numberOfLines={1}>
        {person.name}
      </Text>
      <Text style={styles.occupation} numberOfLines={1}>
        {person.occupation}
      </Text>
      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={12} color={AuthColors.subtleText} />
        <Text style={styles.locationText}>{person.location}</Text>
      </View>
      <TouchableOpacity style={styles.connectButton} onPress={onPressConnect} activeOpacity={0.85}>
        <Text style={styles.connectText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    backgroundColor: AuthColors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AuthColors.border,
    padding: 14,
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: { width: 64, height: 64, borderRadius: 32, marginBottom: 10 },
  name: { fontSize: 14, fontFamily: AuthFonts.bold, color: AuthColors.text },
  occupation: { fontSize: 11, color: AuthColors.subtleText, fontFamily: AuthFonts.regular, marginTop: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 4, marginBottom: 12 },
  locationText: { fontSize: 11, color: AuthColors.subtleText, fontFamily: AuthFonts.regular },
  connectButton: {
    backgroundColor: AuthColors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  connectText: { color: AuthColors.white, fontSize: 12, fontFamily: AuthFonts.bold },
});