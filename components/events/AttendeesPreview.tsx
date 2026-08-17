import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
  avatars: string[];
  names: string[]; // first names of the first couple of attendees, for "Sarah, Lesha & N others"
  totalCount: number;
  onPress?: () => void;
};

export default function AttendeesPreview({ avatars, names, totalCount, onPress }: Props) {
  const colors = useThemeColors();
  const extra = totalCount - avatars.length;
  const othersCount = totalCount - names.length;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.wrapper}>
      <View style={styles.avatarStack}>
        {avatars.map((uri, index) => (
          <Image
            key={uri}
            source={{ uri }}
            style={[styles.avatar, { marginLeft: index === 0 ? 0 : -10, borderColor: colors.surface }]}
          />
        ))}
        {extra > 0 ? (
          <View
            style={[
              styles.avatar,
              styles.extraBubble,
              { marginLeft: -10, backgroundColor: colors.primary, borderColor: colors.surface },
            ]}
          >
            <Text style={styles.extraText}>+{extra}</Text>
          </View>
        ) : null}
      </View>
      <Text style={[styles.summaryText, { color: colors.text }]}>
        {names.join(', ')}
        {othersCount > 0 ? ` & ${othersCount} others` : ''}
      </Text>
      <Ionicons name="chevron-forward" size={16} color={colors.subtleText} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 12, marginBottom: 20, gap: 10 },
  avatarStack: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2 },
  extraBubble: { alignItems: 'center', justifyContent: 'center' },
  extraText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  summaryText: { flex: 1, fontSize: 13, fontFamily: AuthFonts.regular },
});