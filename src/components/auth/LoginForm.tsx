
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, Phone } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { signIn } = useAuth();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/home";

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Phone validation regex for international format
  const phoneRegex = /^\+?[0-9]{10,15}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (activeTab === "email") {
        // Validate email format
        if (!emailRegex.test(email)) {
          toast({
            title: "Invalid email format",
            description: "Please enter a valid email address",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        console.log("Attempting to sign in with email:", email);
        const { data, error } = await signIn(email, password);
        
        if (error) {
          console.error("Login error:", error);
          
          // Check if the error is due to user not existing
          if (error.message.includes("Email not confirmed") || 
              error.message.includes("Invalid login credentials")) {
            toast({
              title: "Login failed",
              description: "Invalid email or password. Please try again or register if you don't have an account.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Login failed",
              description: error.message,
              variant: "destructive",
            });
          }
          
          setLoading(false);
          return;
        }
        
        console.log("Sign in response:", data);
        
        if (data) {
          toast({
            title: "Login successful",
            description: "Welcome back to Strike!",
          });
          
          // Navigate to where the user was trying to go, or home page
          navigate(from, { replace: true });
        }
      } else {
        // Validate phone format
        if (!phoneRegex.test(phone)) {
          toast({
            title: "Invalid phone number",
            description: "Please enter a valid phone number (10-15 digits)",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        // For now, phone login is just a placeholder
        // Show an error message indicating this functionality isn't fully implemented
        toast({
          title: "Phone login not available",
          description: "Phone authentication is not fully implemented yet. Please use email login.",
          variant: "destructive",
        });
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Unexpected login error:", error);
      toast({
        title: "An unexpected error occurred",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Log in to Strike</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "email" | "phone")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-strike-600 hover:text-strike-800"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full bg-strike-500 hover:bg-strike-600" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="phone">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="Phone Number (with country code)"
                    className="pl-8"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-strike-600 hover:text-strike-800"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full bg-strike-500 hover:bg-strike-600" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center flex-col space-y-2">
        <div className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-strike-600 hover:text-strike-800">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
