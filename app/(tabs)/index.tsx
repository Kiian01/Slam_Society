import React from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useAsyncData } from '@/hooks/useAsyncData';

import { getUpcomingEvents } from '@/services/eventsService';
import { getSuggestedPeople } from '@/services/peopleService';
import { getLatestPosts } from '@/services/postsService';
import { getCurrentUser } from '@/services/userService';

import AppHeader from '@/components/home/AppHeader';
import SectionHeader from '@/components/home/SectionHeader';
import EventCard from '@/components/home/EventCard';
import PersonCard from '@/components/home/PersonCard';
import PostCard from '@/components/home/PostCard';
import VipBanner from '@/components/home/VipBanner';

export default function Home() {
  const colors = useThemeColors();
  const tabBarHeight = useBottomTabBarHeight();

  const { data: events, loading: eventsLoading } = useAsyncData(getUpcomingEvents);
  const { data: people, loading: peopleLoading } = useAsyncData(getSuggestedPeople);
  const { data: posts, loading: postsLoading } = useAsyncData(getLatestPosts);
  const { data: currentUser, loading: userLoading } = useAsyncData(getCurrentUser);

  const isLoading = eventsLoading || peopleLoading || postsLoading || userLoading;
  const nextEvent = events?.[0];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        onPressNotifications={() => {
          /* TODO: navigate to notifications */
        }}
        onPressMessages={() => {
          /* TODO: navigate to messages */
        }}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
          showsVerticalScrollIndicator={false}
        >
          {nextEvent ? (
            <View style={styles.section}>
              <SectionHeader title="Upcoming Event" actionLabel="View all" />
              <EventCard event={nextEvent} />
            </View>
          ) : null}

          {people && people.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader
                title="Women Near You"
                actionLabel="See all"
                subtitle="Connect people with similar interest"
              />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.peopleList}
              >
                {people.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </ScrollView>
            </View>
          ) : null}

          {posts && posts.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader
                title="Latest posts"
                actionLabel="View all posts"
                onPressAction={() => router.push('/(tabs)/community')}
              />
              {posts.slice(0, 2).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </View>
          ) : null}

          {currentUser && !currentUser.isVip ? (
            <VipBanner
              onPress={() => {
                /* TODO: navigate to the VIP tab/upgrade flow */
              }}
            />
          ) : null}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  section: { marginTop: 20, marginBottom: 4 },
  peopleList: { paddingHorizontal: 20 },
});