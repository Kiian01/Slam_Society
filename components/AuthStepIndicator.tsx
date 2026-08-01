import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AuthColors } from '@/constants/authTheme';

type Props = {
  currentStep: number; // 1-indexed, segments up to and including this step are filled
  totalSteps: number;
};

export default function AuthStepIndicator({ currentStep, totalSteps }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.segment,
            { backgroundColor: i < currentStep ? AuthColors.primary : AuthColors.border },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 6, marginBottom: 24 },
  segment: { flex: 1, height: 3, borderRadius: 2 },
});