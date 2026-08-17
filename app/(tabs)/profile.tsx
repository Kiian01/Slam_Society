import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';

import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';
import { getCurrentUser, updateCurrentUser } from '@/services/userService';
import { useAuth } from '@/context/AuthContext';
import { CurrentUser } from '@/types/models';

import ProfileHeader from '@/components/profile/ProfileHeader';
import InterestTag from '@/components/profile/InterestTag';
import PrivateInfoRow from '@/components/profile/PrivateInfoRow';
import EditFieldModal from '@/components/profile/EditFieldModal';

type EditableField = 'email' | 'dob' | 'occupation' | 'phone' | null;

const FIELD_LABELS: Record<Exclude<EditableField, null>, string> = {
  email: 'Email',
  dob: 'Date of Birth',
  occupation: 'Occupation',
  phone: 'Phone',
};

export default function Profile() {
  const colors = useThemeColors();
  const tabBarHeight = useBottomTabBarHeight();
  const { signOut } = useAuth();

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState<EditableField>(null);

  // Refetch every time this tab gains focus — this is what makes edits made
  // on the Edit Profile screen (or the quick-edit modal below) show up here
  // as soon as you come back, without any extra plumbing.
  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);
      getCurrentUser().then((data) => {
        if (active) {
          setUser(data);
          setLoading(false);
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const handleSaveField = async (value: string) => {
    if (!editingField) return;
    const updated = await updateCurrentUser({ [editingField]: value });
    setUser(updated);
    setEditingField(null);
  };

  if (loading || !user) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }} showsVerticalScrollIndicator={false}>
        <ProfileHeader
          name={user.name}
          avatar={user.avatar}
          onPressSettings={() => Alert.alert('Settings', 'Settings screen coming soon.')}
          onPressEdit={() => router.push('/edit-profile')}
          onPressShare={() => Alert.alert('Share Profile', 'Sharing coming soon.')}
        />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About me</Text>
          <Text style={[styles.bio, { color: colors.subtleText }]}>{user.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Interests</Text>
          <View style={styles.interestsWrap}>
            {user.interests.map((interest) => (
              <InterestTag key={interest} label={interest} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Private Information</Text>
          <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <PrivateInfoRow
              label="Membership"
              value={user.isVip ? 'VIP' : 'Free'}
              onPress={() => router.push('/(tabs)/vip')}
            />
            <PrivateInfoRow label="Email" value={user.email} onPress={() => setEditingField('email')} />
            <PrivateInfoRow label="DOB" value={user.dob} onPress={() => setEditingField('dob')} />
            <PrivateInfoRow
              label="Occupation"
              value={user.occupation}
              onPress={() => setEditingField('occupation')}
            />
            <PrivateInfoRow label="Phone" value={user.phone} isLast onPress={() => setEditingField('phone')} />
          </View>
        </View>

        <Text style={[styles.logoutText, { color: colors.subtleText }]} onPress={signOut}>
          Log Out
        </Text>
      </ScrollView>

      {editingField ? (
        <EditFieldModal
          visible={!!editingField}
          title={`Edit ${FIELD_LABELS[editingField]}`}
          initialValue={String(user[editingField])}
          keyboardType={
            editingField === 'email' ? 'email-address' : editingField === 'phone' ? 'phone-pad' : 'default'
          }
          onClose={() => setEditingField(null)}
          onSave={handleSaveField}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 15, fontFamily: AuthFonts.bold, marginBottom: 10 },
  bio: { fontSize: 13, lineHeight: 20, fontFamily: AuthFonts.regular },
  interestsWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  infoCard: { borderRadius: 16, borderWidth: 1, paddingHorizontal: 16 },
  logoutText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 13,
    fontFamily: AuthFonts.medium,
    textDecorationLine: 'underline',
  },
});