
import { Navigate } from "react-router-dom";

const Index = () => {
  // In a real application, you would check if the user is authenticated here
  // For now, we'll simply redirect to the login page
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default Index;
