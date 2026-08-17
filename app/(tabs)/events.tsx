import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';

import { AuthFonts } from '@/constants/authTheme';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getUpcomingEvents } from '@/services/eventsService';
import { getCurrentUser } from '@/services/userService';
import { mockExploreCategories } from '@/data/mockExploreCategories';

import SectionHeader from '@/components/home/SectionHeader';
import SearchBar from '@/components/events/SearchBar';
import CreateEventButton from '@/components/events/CreateEventButtom';
import CategoryTabs, { EventFilterCategory } from '@/components/events/CategoryTabs';
import EventListCard from '@/components/events/EventListCard';
import ExploreCategoryGrid from '@/components/events/ExploreCategoryGrid';

const NEARBY_PAGE_SIZE = 2;

export default function Events() {
  const colors = useThemeColors();
  const tabBarHeight = useBottomTabBarHeight();

  const { data: events, loading: eventsLoading } = useAsyncData(getUpcomingEvents);
  const { data: currentUser, loading: userLoading } = useAsyncData(getCurrentUser);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<EventFilterCategory>('all');
  const [nearbyVisibleCount, setNearbyVisibleCount] = useState(NEARBY_PAGE_SIZE);

  const isLoading = eventsLoading || userLoading;

  const featuredEvents = events?.slice(0, 2) ?? [];

  const filteredEvents = useMemo(() => {
    if (!events) return [];
    return events.filter((event) => {
      const matchesCategory = category === 'all' || event.category === category;
      const matchesSearch =
        search.trim().length === 0 || event.title.toLowerCase().includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [events, category, search]);

  const nearbyEvents = filteredEvents.slice(0, nearbyVisibleCount);
  const hasMore = nearbyVisibleCount < filteredEvents.length;

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: 60, paddingBottom: tabBarHeight + 24 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.searchRow}>
        <View style={{ flex: 1 }}>
          <SearchBar value={search} onChangeText={setSearch} />
        </View>
        <CreateEventButton
          isVip={!!currentUser?.isVip}
          onCreate={() => {
            /* TODO: navigate to the create-event flow */
          }}
        />
      </View>

      <CategoryTabs selected={category} onSelect={setCategory} />

      {featuredEvents.length > 0 ? (
        <View style={styles.section}>
          <SectionHeader title="Happening Soon" subtitle="Handpicked event for you" actionLabel="View all" />
          {featuredEvents.map((event) => (
            <EventListCard
              key={event.id}
              event={event}
              onPress={() => router.push(`/event/${event.id}`)}
              onPressRsvp={() => router.push(`/event/${event.id}`)}
            />
          ))}
        </View>
      ) : null}

      <View style={styles.section}>
        <SectionHeader title="Explore Categories" />
        <ExploreCategoryGrid categories={mockExploreCategories} />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Nearby Events" />
        {nearbyEvents.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.subtleText }]}>
            No events match this filter yet.
          </Text>
        ) : (
          nearbyEvents.map((event) => (
            <EventListCard
              key={event.id}
              event={event}
              onPress={() => router.push(`/event/${event.id}`)}
              onPressRsvp={() => router.push(`/event/${event.id}`)}
            />
          ))
        )}

        {hasMore ? (
          <TouchableOpacity
            style={[styles.loadMoreButton, { borderColor: colors.primary }]}
            onPress={() => setNearbyVisibleCount((count) => count + NEARBY_PAGE_SIZE)}
            activeOpacity={0.8}
          >
            <Text style={[styles.loadMoreText, { color: colors.primary }]}>Load More Events</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20, marginBottom: 16 },
  section: { marginTop: 20 },
  emptyText: { paddingHorizontal: 20, fontSize: 13, fontFamily: AuthFonts.regular },
  loadMoreButton: {
    marginHorizontal: 20,
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  loadMoreText: { fontSize: 14, fontFamily: AuthFonts.bold },
});