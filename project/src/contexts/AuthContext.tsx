import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, Profile } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null; user?: User; profile?: Profile }>;
  signUp: (
    email: string,
    password: string,
    fullName?: string,
    userType?: 'freelancer' | 'admin'
  ) => Promise<{ error: Error | null; user?: User; profile?: Profile }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setUser(session?.user ?? null);
        if (session?.user) await fetchProfile(session.user.id);
        else {
          setProfile(null);
          setLoading(false);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch profile helper
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      setProfile(data ?? null);
      return data ?? null;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Sign in
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) return { error };

      const profileData = data.user ? await fetchProfile(data.user.id) : null;

      return { error: null, user: data.user, profile: profileData ?? undefined };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // Sign up - profile will be created in ProfileSetup page after authentication
  const signUp = async (
    email: string,
    password: string,
    fullName?: string,
    userType?: 'freelancer' | 'admin'
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) return { error };

      // Don't create profile here - let ProfileSetup handle it after user is authenticated
      // This avoids RLS policy issues during signup when session might not be established yet
      setUser(data.user ?? null);

      return { error: null, user: data.user ?? undefined, profile: undefined };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
