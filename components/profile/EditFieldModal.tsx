import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
  visible: boolean;
  title: string; // full modal heading, e.g. "Edit Email" or "Add Interest"
  initialValue: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  onClose: () => void;
  onSave: (value: string) => void;
};

// Generic single-field editor — reused for private-info fields on the
// Profile page and for adding a new interest on Edit Profile.
export default function EditFieldModal({
  visible,
  title,
  initialValue,
  keyboardType,
  onClose,
  onSave,
}: Props) {
  const colors = useThemeColors();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (visible) setValue(initialValue);
  }, [visible, initialValue]);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.backdrop}>
        <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            value={value}
            onChangeText={setValue}
            keyboardType={keyboardType}
            autoFocus
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, { borderWidth: 1, borderColor: colors.border }]} onPress={onClose}>
              <Text style={[styles.buttonText, { color: colors.subtleText }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => onSave(value.trim())}
            >
              <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
  title: { fontSize: 15, fontFamily: AuthFonts.bold, marginBottom: 14 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: AuthFonts.regular,
    marginBottom: 16,
  },
  buttonRow: { flexDirection: 'row', gap: 12 },
  button: { flex: 1, borderRadius: 20, paddingVertical: 12, alignItems: 'center' },
  buttonText: { fontSize: 13, fontFamily: AuthFonts.bold },
});