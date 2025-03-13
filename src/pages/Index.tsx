
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // Check for persistent authentication on component mount
  useEffect(() => {
    const userAuth = localStorage.getItem("userAuth");
    setIsAuthenticated(!!userAuth);
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default Index;
