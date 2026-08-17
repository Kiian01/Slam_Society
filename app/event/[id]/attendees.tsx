import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getAttendees } from '@/services/attendeesService';
import { getCurrentUser } from '@/services/userService';
import { hasUsedFreeConnection, isConnected, connectWithPerson } from '@/services/connectionService';

// Client requirement: free members see the first 3 attendees clearly, the
// rest are blurred with a VIP prompt. VIP members see everyone.
const FREE_VISIBLE_COUNT = 3;

export default function EventAttendees() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useThemeColors();
  const [, forceRerender] = useState(0); // bump after a successful connect

  const { data: attendees, loading: attendeesLoading } = useAsyncData(() => getAttendees(id), [id]);
  const { data: currentUser, loading: userLoading } = useAsyncData(getCurrentUser);

  const isLoading = attendeesLoading || userLoading;
  const isVip = !!currentUser?.isVip;

  if (isLoading || !attendees) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  const visibleAttendees = isVip ? attendees : attendees.slice(0, FREE_VISIBLE_COUNT);
  const hiddenAttendees = isVip ? [] : attendees.slice(FREE_VISIBLE_COUNT);

  const handleConnect = async (personId: string) => {
    const result = await connectWithPerson(id, personId, isVip);
    if (!result.success) {
      Alert.alert('VIP feature', result.message ?? 'Upgrade to VIP for unlimited connections.');
      return;
    }
    forceRerender((n) => n + 1);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.primary }]} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {visibleAttendees.map((person) => {
          const alreadyConnected = isConnected(id, person.id);
          const connectDisabled = !isVip && hasUsedFreeConnection(id) && !alreadyConnected;

          return (
            <View key={person.id} style={styles.row}>
              <Image source={{ uri: person.avatar }} style={styles.avatar} />
              <Text style={[styles.name, { color: colors.text }]}>{person.name}</Text>
              <TouchableOpacity
                style={[
                  styles.connectButton,
                  { backgroundColor: alreadyConnected || connectDisabled ? colors.border : colors.primary },
                ]}
                onPress={() => handleConnect(person.id)}
                disabled={alreadyConnected || connectDisabled}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.connectText,
                    { color: alreadyConnected || connectDisabled ? colors.subtleText : colors.onPrimary },
                  ]}
                >
                  {alreadyConnected ? 'Connected' : 'Connect'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {hiddenAttendees.length > 0 ? (
          <View style={styles.blurWrapper}>
            {hiddenAttendees.slice(0, 6).map((person) => (
              <View key={person.id} style={styles.row}>
                <Image source={{ uri: person.avatar }} style={styles.avatar} />
                <Text style={[styles.name, { color: colors.text }]}>{person.name}</Text>
                <View style={[styles.connectButton, { backgroundColor: colors.border }]}>
                  <Text style={[styles.connectText, { color: colors.subtleText }]}>Connect</Text>
                </View>
              </View>
            ))}
            <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFill} />
            <View style={styles.blurOverlay}>
              <Text style={styles.blurText}>
                Upgrade to VIP to see everyone attending and connect before you arrive.{'\n'}
                VIP members can see the full Who's Going list.
              </Text>
              <TouchableOpacity
                style={[styles.upgradeButton, { backgroundColor: colors.primary }]}
                onPress={() => router.push('/(tabs)/vip')}
                activeOpacity={0.85}
              >
                <Text style={styles.upgradeText}>Upgrade to VIP</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginBottom: 16,
  },
  list: { paddingHorizontal: 20, paddingBottom: 40 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  name: { flex: 1, fontSize: 14, fontFamily: AuthFonts.bold },
  connectButton: { borderRadius: 18, paddingHorizontal: 16, paddingVertical: 8 },
  connectText: { fontSize: 12, fontFamily: AuthFonts.bold },
  blurWrapper: { position: 'relative', overflow: 'hidden', borderRadius: 16 },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  blurText: {
    color: '#E85D75',
    fontSize: 13,
    fontFamily: AuthFonts.bold,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 19,
  },
  upgradeButton: { borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10 },
  upgradeText: { color: '#FFFFFF', fontSize: 13, fontFamily: AuthFonts.bold },
});