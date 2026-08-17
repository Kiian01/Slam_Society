import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthColors, AuthFonts } from '@/constants/authTheme';

type Props = {
  title: string;
  actionLabel?: string;
  subtitle?: string;
  onPressAction?: () => void;
};

export default function SectionHeader({ title, actionLabel, subtitle, onPressAction }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        {actionLabel ? (
          <TouchableOpacity style={styles.actionRow} onPress={onPressAction} activeOpacity={0.7}>
            <Text style={styles.actionText}>{actionLabel}</Text>
            <Ionicons name="chevron-forward" size={14} color={AuthColors.primary} />
          </TouchableOpacity>
        ) : null}
      </View>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 20, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 17, fontFamily: AuthFonts.bold, color: AuthColors.text },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  actionText: { fontSize: 13, fontFamily: AuthFonts.medium, color: AuthColors.primary },
  subtitle: { fontSize: 12, color: AuthColors.subtleText, marginTop: 2, fontFamily: AuthFonts.regular },
});