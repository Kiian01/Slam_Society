import { Tabs } from 'expo-router';
import React from 'react';
import * as Haptics from 'expo-haptics';
import TabBarIcon from '@/components/TabBarIcon';

// import { HapticTab } from '@/components/haptic-tab';
// import { IconSymbol } from '@/components/ui/icon-symbol';
// import { Colors } from '@/constants/theme';
// import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarButton: HapticTab,

        tabBarItemStyle: {
          paddingVertical: 12,
        },

        tabBarStyle: {
          position: 'absolute',
          bottom: 0, 
          height: 70, 
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          shadowColor: '#FFFFFF',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.08,
          shadowRadius: 4.65,
          elevation: 8,
        }
      }}
      screenListeners={{
        tabPress: (e) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      }}
      >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="home"
              outlineName="home-outline"
              label="Home"
              focused={focused}
            />
          ),
        }}
       />
       <Tabs.Screen
        name="events"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="calendar"
              outlineName="calendar-outline"
              label="Events"
              focused={focused}
            />
          ),
        }}
       />
       <Tabs.Screen
        name="community"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="people"
              outlineName="people-outline"
              label="Community"
              focused={focused}
            />
          ),
        }}
       />
       <Tabs.Screen
        name="vip"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="star"
              outlineName="star-outline"
              label="VIP"
              focused={focused}
            />
          ),
        }}
       />
       <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="person-circle"
              outlineName="person-circle-outline"
              label="Profile"
              focused={focused}
            />
          ),
        }}
       />
    </Tabs>
  );
}
