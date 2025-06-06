
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Use the resetPassword function from AuthContext instead of direct supabase call
      const { error } = await resetPassword(email);
      
      if (error) {
        throw error;
      }
      
      setSubmitted(true);
      toast({
        title: "Email sent",
        description: "Check your inbox for password reset instructions.",
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      toast({
        title: "Failed to send reset email",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Check your email</CardTitle>
          <CardDescription className="text-center">
            We've sent password reset instructions to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => setSubmitted(false)}
          >
            Try a different email
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/login" className="flex items-center text-strike-600 hover:text-strike-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Forgot password</CardTitle>
        <CardDescription className="text-center">
          Enter your email to receive password reset instructions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4 bg-blue-50">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Make sure to check your email settings in Supabase if you don't receive reset emails.
          </AlertDescription>
        </Alert>
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
          <Button type="submit" className="w-full bg-strike-500 hover:bg-strike-600" disabled={loading}>
            {loading ? "Sending..." : "Send reset instructions"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link to="/login" className="flex items-center text-strike-600 hover:text-strike-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordForm;
