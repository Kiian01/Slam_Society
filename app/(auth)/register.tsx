import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AuthColors, AuthFonts } from '@/constants/authTheme';
import AuthStepIndicator from '@/components/AuthStepIndicator';
import { isValidEmail, getPasswordError } from '@/utils/validation';
import { useAuth } from '@/context/AuthContext';

// Maps Firebase's error codes to messages people actually understand.
function getFriendlyAuthError(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists — try logging in instead.';
    case 'auth/invalid-email':
      return 'That email address looks invalid.';
    case 'auth/weak-password':
      return 'Please choose a stronger password.';
    default:
      return 'Something went wrong creating your account. Please try again.';
  }
}

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const validate = () => {
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = 'Full name is required';

    if (!email.trim()) next.email = 'Email is required';
    else if (!isValidEmail(email)) next.email = 'Enter a valid email address';

    if (!phone.trim()) next.phone = 'Phone number is required';
    else if (phone.replace(/\D/g, '').length < 7) next.phone = 'Enter a valid phone number';

    const passwordError = getPasswordError(password);
    if (passwordError) next.password = passwordError;

    if (confirmPassword !== password) next.confirmPassword = 'Passwords do not match';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleContinue = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      // Firebase logs the user in immediately on account creation — so this
      // is the actual moment sign-up completes. Stack.Protected picks up the
      // new login state and redirects into the app automatically.
      await signUp(email.trim(), password, { fullName: fullName.trim(), phone: phone.trim() });
    } catch (err: any) {
      setErrors({ email: getFriendlyAuthError(err?.code ?? '') });
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <AuthStepIndicator currentStep={1} totalSteps={4} />
        <Text style={styles.title}>Create Account</Text>

        <Field
          label="Full Name *"
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
          placeholder="Your full name"
        />
        <Field
          label="Email *"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Field
          label="Phone no. *"
          value={phone}
          onChangeText={setPhone}
          error={errors.phone}
          placeholder="98XXXXXXXX"
          keyboardType="phone-pad"
        />

        <View style={styles.field}>
          <Text style={[styles.label, errors.password && styles.labelError]}>Password *</Text>
          <View style={[styles.passwordRow, errors.password ? styles.inputErrorBorder : null]}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
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
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : (
            <Text style={styles.hintText}>
              At least 8 characters, 1 capital letter, 1 number, 1 symbol
            </Text>
          )}
        </View>

        <Field
          label="Confirm Password *"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
          onPress={handleContinue}
          activeOpacity={0.85}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={AuthColors.white} />
          ) : (
            <Text style={styles.primaryButtonText}>Continue</Text>
          )}
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or Sign Up with</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={18} color={AuthColors.text} />
          <Text style={styles.socialButtonText}>Sign Up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={18} color={AuthColors.text} />
          <Text style={styles.socialButtonText}>Sign Up with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.footerLink}>Log In here</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences';
};

function Field({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
}: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={[styles.label, error && styles.labelError]}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputErrorBorder : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={AuthColors.subtleText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AuthColors.white },
  scroll: { padding: 24, paddingTop: 60 },
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: AuthFonts.heading,
    color: AuthColors.text,
    marginBottom: 24,
  },
  field: { marginBottom: 18 },
  label: {
    fontSize: 12,
    color: AuthColors.primary,
    marginBottom: 6,
    fontWeight: '600',
    fontFamily: AuthFonts.medium,
  },
  labelError: { color: AuthColors.error },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: AuthColors.border,
    paddingVertical: 10,
    fontSize: 15,
    color: AuthColors.text,
    fontFamily: AuthFonts.regular,
  },
  inputErrorBorder: { borderBottomColor: AuthColors.error },
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
  errorText: {
    color: AuthColors.error,
    fontSize: 11,
    marginTop: 4,
    fontFamily: AuthFonts.regular,
  },
  hintText: {
    color: AuthColors.subtleText,
    fontSize: 11,
    marginTop: 4,
    fontFamily: AuthFonts.regular,
  },
  primaryButton: {
    backgroundColor: AuthColors.primary,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  primaryButtonDisabled: { opacity: 0.7 },
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