
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // Check for persistent authentication on component mount
  useEffect(() => {
    // Check if user has been authenticated before using localStorage
    const userAuth = localStorage.getItem("userAuth");
    // Also check session storage as a fallback
    const sessionAuth = sessionStorage.getItem("userAuth");
    
    // Consider authenticated if found in either storage
    setIsAuthenticated(!!(userAuth || sessionAuth));
    
    // If not found in localStorage but found in sessionStorage,
    // persist to localStorage for future visits
    if (!userAuth && sessionAuth) {
      localStorage.setItem("userAuth", sessionAuth);
    }
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
