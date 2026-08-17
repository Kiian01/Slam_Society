import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getLatestPosts, createPost } from '@/services/postsService';
import { getCurrentUser } from '@/services/userService';

import PostCard from '@/components/home/PostCard';
import PostComposer from '@/components/community/PostComposer';
import CreatePostModal from '@/components/community/CreatePostModal';

export default function Community() {
  const colors = useThemeColors();
  const tabBarHeight = useBottomTabBarHeight();

  const [refreshKey, setRefreshKey] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const { data: posts, loading: postsLoading } = useAsyncData(getLatestPosts, [refreshKey]);
  const { data: currentUser, loading: userLoading } = useAsyncData(getCurrentUser);

  const isLoading = postsLoading || userLoading;

  const handleSubmitPost = async (content: string) => {
    await createPost(content);
    setModalVisible(false);
    setRefreshKey((key) => key + 1); // triggers useAsyncData to refetch the feed
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border, backgroundColor: colors.surface }]}>
        <View style={styles.brandRow}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={[styles.brandText, { color: colors.text }]}>SLAM</Text>
        </View>
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: colors.primary }]}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.85}
        >
          <Text style={[styles.createButtonText, { color: colors.onPrimary }]}>Create Post</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingTop: 16, paddingBottom: tabBarHeight + 90 }}
          showsVerticalScrollIndicator={false}
        >
          {currentUser ? (
            <PostComposer
              userName={currentUser.name}
              userAvatar={currentUser.avatar}
              onPress={() => setModalVisible(true)}
            />
          ) : null}

          {posts && posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <Text style={[styles.emptyText, { color: colors.subtleText }]}>
              No posts yet — be the first to share something!
            </Text>
          )}
        </ScrollView>
      )}

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary, bottom: tabBarHeight + 20 }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={26} color={colors.onPrimary} />
      </TouchableOpacity>

      {currentUser ? (
        <CreatePostModal
          visible={modalVisible}
          userName={currentUser.name}
          userAvatar={currentUser.avatar}
          onClose={() => setModalVisible(false)}
          onSubmit={handleSubmitPost}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logo: { width: 24, height: 24 },
  brandText: { fontSize: 18, fontFamily: AuthFonts.bold, letterSpacing: 1 },
  createButton: { borderRadius: 20, paddingHorizontal: 16, paddingVertical: 9 },
  createButtonText: { fontSize: 13, fontFamily: AuthFonts.bold },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 13, fontFamily: AuthFonts.regular },
  fab: {
    position: 'absolute',
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
});