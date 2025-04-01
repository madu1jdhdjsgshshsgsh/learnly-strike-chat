
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLearner, setIsLearner] = useState(true);
  const [isCreator, setIsCreator] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp } = useAuth();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!isLearner && !isCreator) {
      toast({
        title: "Role selection required",
        description: "Please select at least one role (Learner or Creator)",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Starting registration process");
      // Create an array of roles the user has selected
      const userRoles = [];
      if (isLearner) userRoles.push("learner");
      if (isCreator) userRoles.push("creator");

      const { data, error } = await signUp(email, password, fullName, userRoles.join(","));
      
      if (error) {
        console.error("Registration error:", error);
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      console.log("Registration response:", data);
      
      if (data.session) {
        toast({
          title: "Registration successful",
          description: "Your account has been created!",
        });
        navigate("/home");
      } else {
        // If email confirmation is enabled, there might not be a session
        toast({
          title: "Registration successful",
          description: "Please check your email for confirmation. If you don't see it, check your spam folder.",
        });
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Unexpected registration error:", error);
      toast({
        title: "An unexpected error occurred",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Sign up to start learning with Strike
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Full Name"
                className="pl-8"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                className="pl-8"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pl-8 pr-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="pl-8"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <Label>I want to join Strike as:</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="learner" 
                  checked={isLearner} 
                  onCheckedChange={() => setIsLearner(!isLearner)} 
                />
                <Label htmlFor="learner" className="cursor-pointer">
                  Learner - I want to learn new skills and knowledge
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="creator" 
                  checked={isCreator} 
                  onCheckedChange={() => setIsCreator(!isCreator)} 
                />
                <Label htmlFor="creator" className="cursor-pointer">
                  Creator - I want to create and share educational content
                </Label>
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-strike-500 hover:bg-strike-600" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-strike-600 hover:text-strike-800">
            Log in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
