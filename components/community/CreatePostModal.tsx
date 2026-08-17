import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
  visible: boolean;
  userName: string;
  userAvatar: string;
  onClose: () => void;
  onSubmit: (content: string) => void;
};

export default function CreatePostModal({ visible, userName, userAvatar, onClose, onSubmit }: Props) {
  const colors = useThemeColors();
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.backdrop}>
        <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.cancelText, { color: colors.subtleText }]}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>Create Post</Text>
            <TouchableOpacity
              onPress={handlePost}
              disabled={!content.trim()}
              style={[styles.postButton, { backgroundColor: content.trim() ? colors.primary : colors.border }]}
            >
              <Text
                style={[styles.postText, { color: content.trim() ? colors.onPrimary : colors.subtleText }]}
              >
                Post
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.authorRow}>
            <Image source={{ uri: userAvatar }} style={styles.avatar} />
            <Text style={[styles.authorName, { color: colors.text }]}>{userName}</Text>
          </View>

          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="What's happening today?"
            placeholderTextColor={colors.subtleText}
            value={content}
            onChangeText={setContent}
            multiline
            autoFocus
          />

          <View style={styles.imageRow}>
            <Ionicons name="image-outline" size={20} color={colors.primary} />
            <Text style={[styles.imageRowText, { color: colors.primary }]}>Add photo (coming soon)</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, minHeight: 320 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  cancelText: { fontSize: 14, fontFamily: AuthFonts.regular },
  title: { fontSize: 15, fontFamily: AuthFonts.bold },
  postButton: { borderRadius: 16, paddingHorizontal: 16, paddingVertical: 7 },
  postText: { fontSize: 13, fontFamily: AuthFonts.bold },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  avatar: { width: 34, height: 34, borderRadius: 17 },
  authorName: { fontSize: 14, fontFamily: AuthFonts.bold },
  input: { fontSize: 14, fontFamily: AuthFonts.regular, minHeight: 100, textAlignVertical: 'top' },
  imageRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  imageRowText: { fontSize: 13, fontFamily: AuthFonts.medium },
});