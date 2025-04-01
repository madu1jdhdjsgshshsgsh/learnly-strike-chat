
import RegisterForm from "@/components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Register = () => {
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
          <p className="text-muted-foreground mt-2">Join our learning community today!</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
