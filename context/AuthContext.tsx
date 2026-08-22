import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';

type SignUpDetails = {
  fullName: string;
  phone: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, details: SignUpDetails) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Firebase restores the session from AsyncStorage automatically and
    // fires this listener once it knows whether someone's logged in —
    // this is what replaces our old manual SecureStore boolean flag.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, details: SignUpDetails) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);

    // Basic profile doc so there's a real Firestore user record to build on.
    // The full Profile/Points fields get migrated here when we do that part
    // of the backend — for now this just mirrors what mockUser.ts had.
    await setDoc(doc(db, 'users', credential.user.uid), {
      name: details.fullName,
      phone: details.phone,
      email,
      isVip: false,
      points: 0,
      profileCompleted: false,
      createdAt: serverTimestamp(),
    });
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}