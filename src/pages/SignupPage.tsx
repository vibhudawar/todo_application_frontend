import { Link } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';
import { SignupForm } from '../components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <CheckSquare className="size-4" />
            </div>
            Todo App
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <h2 className="text-3xl font-bold">Join us today!</h2>
            <p className="text-muted-foreground text-lg">
              Start organizing your life with our beautiful and intuitive todo app
            </p>
            <div className="flex items-center justify-center gap-4 pt-8">
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <CheckSquare className="size-12 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 