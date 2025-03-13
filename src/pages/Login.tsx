
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
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
