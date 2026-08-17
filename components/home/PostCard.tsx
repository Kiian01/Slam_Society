import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthColors, AuthFonts } from '@/constants/authTheme';
import { Post } from '@/types/models';

type Props = {
  post: Post;
  onPressLike?: () => void;
  onPressComment?: () => void;
  onPressShare?: () => void;
  onPressBookmark?: () => void;
};

function formatCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(count);
}

export default function PostCard({
  post,
  onPressLike,
  onPressComment,
  onPressShare,
  onPressBookmark,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: post.authorAvatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.authorName}>{post.authorName}</Text>
          <Text style={styles.postedAt}>{post.postedAt}</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal" size={18} color={AuthColors.subtleText} />
        </TouchableOpacity>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.image ? <Image source={{ uri: post.image }} style={styles.postImage} /> : null}

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionItem} onPress={onPressLike}>
          <Ionicons name="heart" size={18} color={AuthColors.primary} />
          <Text style={styles.actionText}>{formatCount(post.likeCount)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={onPressComment}>
          <Ionicons name="chatbubble-outline" size={17} color={AuthColors.subtleText} />
          <Text style={styles.actionText}>{formatCount(post.commentCount)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={onPressShare}>
          <Ionicons name="share-outline" size={18} color={AuthColors.subtleText} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={onPressBookmark}>
          <Ionicons name="bookmark-outline" size={18} color={AuthColors.subtleText} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: AuthColors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AuthColors.border,
    padding: 16,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 38, height: 38, borderRadius: 19, marginRight: 10 },
  headerText: { flex: 1 },
  authorName: { fontSize: 14, fontFamily: AuthFonts.bold, color: AuthColors.text },
  postedAt: { fontSize: 11, color: AuthColors.subtleText, fontFamily: AuthFonts.regular, marginTop: 1 },
  menuButton: { padding: 4 },
  content: { fontSize: 13, color: AuthColors.text, lineHeight: 19, fontFamily: AuthFonts.regular },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 12,
    backgroundColor: AuthColors.inputBackground,
  },
  actionsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14, gap: 18 },
  actionItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  actionText: { fontSize: 12, color: AuthColors.subtleText, fontFamily: AuthFonts.medium },
});