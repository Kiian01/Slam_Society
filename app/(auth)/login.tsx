import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AuthColors, AuthFonts } from '@/constants/authTheme';
import { isValidEmail } from '@/utils/validation';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Allow either an email or a phone number, but if it looks like an email, validate it properly
    if (email.includes('@') && !isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    // TODO: hook up real authentication once the backend is ready
    // Flipping isLoggedIn makes (tabs) available — Stack.Protected redirects
    // there automatically, no router call needed.
    signIn();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>LOG IN</Text>

        {error ? <Text style={styles.errorBanner}>{error}</Text> : null}

        <View style={styles.field}>
          <Text style={styles.label}>Email or Phone</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={AuthColors.subtleText}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={AuthColors.subtleText}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color={AuthColors.subtleText}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} activeOpacity={0.85}>
          <Text style={styles.primaryButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or login with</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={18} color={AuthColors.text} />
          <Text style={styles.socialButtonText}>Log In with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={18} color={AuthColors.text} />
          <Text style={styles.socialButtonText}>Log In with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.footerText}>
            Don't have an account? <Text style={styles.footerLink}>Sign Up here</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AuthColors.white },
  scroll: { padding: 24, paddingTop: 80 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: AuthFonts.heading,
    color: AuthColors.primary,
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 2,
  },
  errorBanner: {
    color: AuthColors.error,
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 13,
    fontFamily: AuthFonts.regular,
  },
  field: { marginBottom: 20 },
  label: {
    fontSize: 13,
    color: AuthColors.primary,
    marginBottom: 6,
    fontWeight: '600',
    fontFamily: AuthFonts.medium,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: AuthColors.border,
    paddingVertical: 10,
    fontSize: 15,
    color: AuthColors.text,
    fontFamily: AuthFonts.regular,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: AuthColors.border,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    color: AuthColors.text,
    fontFamily: AuthFonts.regular,
  },
  forgotPassword: {
    color: AuthColors.primary,
    fontSize: 13,
    textAlign: 'right',
    marginBottom: 24,
    fontFamily: AuthFonts.regular,
  },
  primaryButton: {
    backgroundColor: AuthColors.primary,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  primaryButtonText: {
    color: AuthColors.white,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: AuthFonts.bold,
  },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  divider: { flex: 1, height: 1, backgroundColor: AuthColors.border },
  dividerText: {
    marginHorizontal: 10,
    color: AuthColors.subtleText,
    fontSize: 12,
    fontFamily: AuthFonts.regular,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: AuthColors.border,
    borderRadius: 24,
    paddingVertical: 12,
    marginBottom: 12,
  },
  socialButtonText: {
    fontSize: 14,
    color: AuthColors.text,
    fontWeight: '500',
    fontFamily: AuthFonts.medium,
  },
  footerText: {
    textAlign: 'center',
    color: AuthColors.subtleText,
    fontSize: 13,
    marginTop: 12,
    fontFamily: AuthFonts.regular,
  },
  footerLink: { color: AuthColors.primary, fontWeight: '700', fontFamily: AuthFonts.bold },
});