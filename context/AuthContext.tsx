import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = "slam_is_logged_in";

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return value;
}

// In-memory only for now — resets every time the app fully reloads.
// Swap setIsLoggedIn(true) for a real token check once you have a backend.
export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      if (Platform.OS !== 'web') {
        setIsLoading(false);
        return;
      }
      const stored = await SecureStore.getItemAsync(SESSION_KEY);
    setIsLoggedIn(stored === 'true');
    setIsLoading(false);
    }
    restoreSession();
  }, []);

  const signIn = () => {
    setIsLoggedIn(true);
    if (Platform.OS !== 'web') {
      SecureStore.setItemAsync(SESSION_KEY, 'true');
    }
  };

  const signOut = () => {
    setIsLoggedIn(false);
    if (Platform.OS !== 'web') {
      SecureStore.deleteItemAsync(SESSION_KEY);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}