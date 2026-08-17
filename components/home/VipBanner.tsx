import React from 'react';
import { TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native';

type Props = {
  onPress?: () => void;
};

// Background is a placeholder Unsplash image — swap for your own asset
// (e.g. assets/images/vip-banner.png) whenever you have one ready.
const BANNER_IMAGE =
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&q=80';

export default function VipBanner({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.wrapper}>
      <ImageBackground
        source={{ uri: BANNER_IMAGE }}
        style={styles.background}
        imageStyle={styles.image}
      >
        <Text style={styles.title}>Upgrade to VIP</Text>
        <Text style={styles.subtitle}>Get extra benefits and enjoy the community</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginHorizontal: 20, marginBottom: 24, borderRadius: 16, overflow: 'hidden' },
  background: { minHeight: 130, justifyContent: 'center', paddingHorizontal: 20 },
  image: { borderRadius: 16 },
  title: { color: '#FFFFFF', fontSize: 20, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: '#FFFFFF', fontSize: 12, opacity: 0.9 },
});