import { View, Text, StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function Events() {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.container, { paddingBottom: tabBarHeight }]}>
      <Text style={styles.text}>Events — coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  text: { fontSize: 16, color: '#8A8A8A' },
});