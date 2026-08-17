import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getCurrentUser, updateCurrentUser } from '@/services/userService';
import { awardPoints } from '@/services/pointsService';
import { POINTS_RULES } from '@/data/pointsRules';

import InterestTag from '@/components/profile/InterestTag';
import EditFieldModal from '@/components/profile/EditFieldModal';

export default function EditProfile() {
  const colors = useThemeColors();
  const { data: user, loading } = useAsyncData(getCurrentUser);

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [addInterestVisible, setAddInterestVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio);
      setInterests(user.interests);
    }
  }, [user]);

  const handleRemoveInterest = (interest: string) => {
    setInterests((prev) => prev.filter((item) => item !== interest));
  };

  const handleAddInterest = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests((prev) => [...prev, trimmed]);
    }
    setAddInterestVisible(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateCurrentUser({ name: name.trim(), bio: bio.trim(), interests });
    // Client requirement #11: 50 points for completing profile — only once,
    // not on every edit. This is a simple "first save ever" heuristic; a
    // more complete rule (e.g. bio + interests + photo all filled in) can
    // replace it once the real backend decides what "complete" means.
    if (user && !user.profileCompleted) {
      await updateCurrentUser({ profileCompleted: true });
      await awardPoints('Completed your profile', POINTS_RULES.completeProfile);
    }
    setSaving(false);
    router.back();
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
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.primary }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} disabled={saving}>
          <Text style={[styles.saveText, { color: saving ? colors.subtleText : colors.text }]}>
            {saving ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={() =>
            Alert.alert(
              'Change photo',
              "Photo upload isn't wired up yet — this will connect to your device photos and Firebase Storage later."
            )
          }
          activeOpacity={0.85}
        >
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.cameraBadge}>
            <Ionicons name="camera" size={22} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <Text style={[styles.email, { color: colors.subtleText }]}>{user.email}</Text>

        <Text style={[styles.fieldLabel, { color: colors.subtleText }]}>Name</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          value={name}
          onChangeText={setName}
        />

        <Text style={[styles.fieldLabel, { color: colors.subtleText }]}>Bio</Text>
        <TextInput
          style={[styles.input, styles.bioInput, { color: colors.text, borderColor: colors.border }]}
          value={bio}
          onChangeText={setBio}
          multiline
        />

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Interests</Text>
        <View style={styles.interestsWrap}>
          {interests.map((interest) => (
            <InterestTag
              key={interest}
              label={interest}
              removable
              onRemove={() => handleRemoveInterest(interest)}
            />
          ))}
          <TouchableOpacity
            style={[styles.addMoreButton, { borderColor: colors.border }]}
            onPress={() => setAddInterestVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={[styles.addMoreText, { color: colors.text }]}>add more...</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => Alert.alert('Social links', 'Coming soon.')}>
          <Text style={[styles.socialLinksText, { color: colors.text }]}>Add Social Links</Text>
        </TouchableOpacity>
      </ScrollView>

      <EditFieldModal
        visible={addInterestVisible}
        title="Add Interest"
        initialValue=""
        onClose={() => setAddInterestVisible(false)}
        onSave={handleAddInterest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 10,
  },
  backButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  saveText: { fontSize: 15, fontFamily: AuthFonts.bold },
  scroll: { paddingHorizontal: 20, paddingBottom: 60, alignItems: 'center' },
  avatarWrapper: { marginTop: 10 },
  avatar: { width: 110, height: 110, borderRadius: 55 },
  cameraBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  email: { fontSize: 13, fontFamily: AuthFonts.regular, marginTop: 10, marginBottom: 20 },
  fieldLabel: { alignSelf: 'flex-start', fontSize: 11, fontFamily: AuthFonts.medium, marginBottom: 4 },
  input: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: AuthFonts.regular,
    marginBottom: 16,
  },
  bioInput: { minHeight: 70, textAlignVertical: 'top' },
  sectionTitle: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontFamily: AuthFonts.bold,
    marginBottom: 10,
    marginTop: 6,
  },
  interestsWrap: { flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'flex-start' },
  addMoreButton: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 9, marginBottom: 10 },
  addMoreText: { fontSize: 13, fontFamily: AuthFonts.medium },
  socialLinksText: {
    alignSelf: 'flex-start',
    fontSize: 13,
    fontFamily: AuthFonts.medium,
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});