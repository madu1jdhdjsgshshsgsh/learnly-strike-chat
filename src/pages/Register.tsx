
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
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
