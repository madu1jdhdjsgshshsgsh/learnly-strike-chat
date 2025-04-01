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
  signInWithOTP: (phone: string) => Promise<{
    error: Error | null;
    data: any;
  }>;
  verifyOTP: (phone: string, token: string) => Promise<{
    error: Error | null;
    data: any;
  }>;
  signUp: (email: string, password: string, fullName: string, userRoles?: string) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null };
  }>;
  resetPassword: (email: string) => Promise<{
    error: Error | null;
    data: any;
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
        } else if (event === 'PASSWORD_RECOVERY') {
          console.log('Password recovery initiated');
          toast({
            title: "Password Recovery",
            description: "Check your email for password recovery instructions.",
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

  const signInWithOTP = async (phone: string) => {
    console.log('Attempting to send OTP to phone:', phone);
    try {
      // Make sure phone number is in international format
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });
      
      if (error) {
        console.error('Send OTP error:', error);
        // If the error is about provider not being enabled, show a helpful message
        if (error.message.includes("provider")) {
          throw new Error("Phone authentication is not enabled. Please contact support.");
        }
        throw error;
      }
      
      console.log('OTP sent successfully:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Error sending OTP:', error);
      return { data: null, error: error as Error };
    }
  };

  const verifyOTP = async (phone: string, token: string) => {
    console.log('Attempting to verify OTP for phone:', phone);
    try {
      // Make sure phone number is in international format
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token,
        type: 'sms',
      });
      
      if (error) {
        console.error('OTP verification error:', error);
        throw error;
      }
      
      console.log('OTP verification successful:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return { data: null, error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userRoles = "learner") => {
    console.log('Attempting to sign up:', email);
    try {
      // Get the current app URL to use for redirects (instead of hardcoded localhost)
      const appURL = window.location.origin;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_roles: userRoles,
            // Flag to indicate this user needs onboarding
            needs_onboarding: true
          },
          emailRedirectTo: `${appURL}/login`,
        }
      });
      
      if (error) {
        console.error('Sign up error:', error);
        throw error;
      }
      
      console.log('Sign up successful:', data);
      
      // If sign up is successful and we have a session, redirect to onboarding
      if (data && data.session) {
        toast({
          title: "Registration successful!",
          description: "You'll be directed to set up your learning preferences.",
        });
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Error signing up:', error);
      return { 
        data: { user: null, session: null }, 
        error: error as Error 
      };
    }
  };

  const resetPassword = async (email: string) => {
    console.log('Attempting to reset password for:', email);
    try {
      // Get the current app URL to use for redirects (instead of hardcoded localhost)
      const appURL = window.location.origin;
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${appURL}/reset-password`,
      });
      
      if (error) {
        console.error('Reset password error:', error);
        throw error;
      }
      
      console.log('Reset password email sent successfully:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Error resetting password:', error);
      return { data: null, error: error as Error };
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
    signInWithOTP,
    verifyOTP,
    signUp,
    resetPassword,
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
