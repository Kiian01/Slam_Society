import React from 'react';
import { TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
  isVip: boolean;
  onCreate?: () => void;
};

// Free users get a friendly upgrade prompt instead of the create-event flow.
export default function CreateEventButton({ isVip, onCreate }: Props) {
  const colors = useThemeColors();

  const handlePress = () => {
    if (!isVip) {
      Alert.alert('VIP feature', 'You need to upgrade to VIP to create events.');
      return;
    }
    onCreate?.();
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      <Ionicons name="add" size={24} color={colors.onPrimary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
});