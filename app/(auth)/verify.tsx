import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthColors, AuthFonts } from '@/constants/authTheme';
import AuthStepIndicator from '@/components/AuthStepIndicator';
import { useAuth } from '@/context/AuthContext';
import { awardPoints } from '@/services/pointsService';
import { POINTS_RULES } from '@/data/pointsRules';

// No SMS/OTP backend yet — this is a placeholder step that just moves the
// user forward. Swap the button logic for a real check once verification
// (email link or OTP) is wired up.
export default function Verify() {
  const [resent, setResent] = useState(false);
  const { signIn } = useAuth();

  const handleContinue = () => {
    // Client requirement #11: 25 points for creating an account.
    awardPoints('Created your SLAM account', POINTS_RULES.createAccount);
    // Flipping isLoggedIn makes (tabs) available and (auth) unreachable —
    // Stack.Protected automatically redirects there, no router call needed.
    signIn();
  };

  return (
    <View style={styles.container}>
      <AuthStepIndicator currentStep={2} totalSteps={4} />

      <View style={styles.iconWrap}>
        <Ionicons name="mail-outline" size={48} color={AuthColors.primary} />
      </View>

      <Text style={styles.title}>Verify Your Account</Text>
      <Text style={styles.subtitle}>
        We've sent a verification link to your email. Once confirmed, tap continue below.
      </Text>

      <TouchableOpacity onPress={() => setResent(true)}>
        <Text style={styles.resendText}>{resent ? 'Link resent!' : 'Resend link'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryButton} onPress={handleContinue} activeOpacity={0.85}>
        <Text style={styles.primaryButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AuthColors.white, padding: 24, paddingTop: 60 },
  iconWrap: {
    alignSelf: 'center',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: AuthColors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: AuthFonts.heading,
    color: AuthColors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: AuthColors.subtleText,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    fontFamily: AuthFonts.regular,
  },
  resendText: {
    color: AuthColors.primary,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: AuthFonts.medium,
  },
  primaryButton: {
    backgroundColor: AuthColors.primary,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: AuthColors.white,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: AuthFonts.bold,
  },
});