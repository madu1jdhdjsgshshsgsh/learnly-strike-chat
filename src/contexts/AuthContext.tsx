
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: Session | null;
  }>;
  signUp: (email: string, password: string, fullName: string, userType?: string) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null };
  }>;
  signOut: () => Promise<{ error: Error | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log('Initializing auth context...');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        console.log('Current session:', currentSession);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Handle different auth events
        if (event === 'SIGNED_IN') {
          console.log('User signed in:', currentSession?.user?.email);
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          toast({
            title: "Signed out",
            description: "You have been signed out successfully.",
          });
          navigate('/login');
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed');
        } else if (event === 'USER_UPDATED') {
          console.log('User updated');
          toast({
            title: "Profile updated",
            description: "Your profile has been updated successfully.",
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Initial session check:', currentSession);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const signIn = async (email: string, password: string) => {
    console.log('Attempting to sign in with email:', email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }
      
      console.log('Sign in successful:', data);
      return { data: data.session, error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      return { data: null, error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userType = "learner") => {
    console.log('Attempting to sign up:', email);
    try {
      // Don't check for existing user by email in profiles table
      // This was causing the infinite type instantiation error
      // The signup function from Supabase will handle existing users

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_type: userType
          },
        }
      });
      
      if (error) {
        console.error('Sign up error:', error);
        throw error;
      }
      
      console.log('Sign up successful:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Error signing up:', error);
      return { 
        data: { user: null, session: null }, 
        error: error as Error 
      };
    }
  };

  const signOut = async () => {
    console.log('Attempting to sign out');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }
      console.log('Sign out successful');
      return { error: null };
    } catch (error) {
      console.error('Error signing out:', error);
      return { error: error as Error };
    }
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
