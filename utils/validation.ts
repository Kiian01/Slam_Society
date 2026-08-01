// Simple, dependency-free credential checks.
// No backend / OTP hookup yet — these just gate the UI for now.

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Returns a human-readable error message, or null if the password is valid.
 * Rules: 8+ characters, at least 1 capital letter, 1 number, 1 symbol.
 */
export const getPasswordError = (password: string): string | null => {
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must include at least 1 capital letter';
  if (!/[0-9]/.test(password)) return 'Password must include at least 1 number';
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;']/.test(password)) {
    return 'Password must include at least 1 symbol';
  }
  return null;
};

export const isValidPassword = (password: string): boolean => getPasswordError(password) === null;