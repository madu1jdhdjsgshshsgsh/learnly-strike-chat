
import LoginForm from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate('/home');
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
