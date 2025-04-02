
import LoginForm from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Check if the user needs onboarding after login
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (user) {
        try {
          // Check if the user has completed onboarding by looking for preferences
          const { data: profiles, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (error) throw error;
          
          // If user has no preferences set, redirect to onboarding
          if (!profiles || (!profiles.hasOwnProperty('grade') && !profiles.hasOwnProperty('topics'))) {
            navigate('/onboarding');
          } else {
            navigate('/home');
          }
        } catch (error) {
          console.error('Error checking onboarding status:', error);
          // If there's an error, still redirect to home
          navigate('/home');
        }
      }
    };
    
    if (user) {
      checkOnboardingStatus();
    }
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md mb-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-strike-600">Strike</h1>
          <p className="text-muted-foreground mt-2">Learn anything. Anytime. Anywhere.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
