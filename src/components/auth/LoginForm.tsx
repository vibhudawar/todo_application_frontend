import {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, Link} from "react-router-dom";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {cn} from "../../lib/utils";
import {Button} from "../../components/ui/button";
import {Input} from "../../components/ui/input";
import {Label} from "../../components/ui/label";
import {useAuth} from "../../context/AuthContext";
import type {UserLogin} from "../../types/auth";

interface LoginFormProps {
 className?: string;
}

export function LoginForm({className}: LoginFormProps) {
 const {login, isLoading, error} = useAuth();
 const navigate = useNavigate();
 const [showPassword, setShowPassword] = useState(false);

 const {
  register,
  handleSubmit,
  formState: {errors},
 } = useForm<UserLogin>();

 const onSubmit = async (data: UserLogin) => {
  try {
   await login(data);
   navigate("/todos");
  } catch (error) {
   // Error handled by context
  }
 };

 return (
  <form
   className={cn("flex flex-col gap-6", className)}
   onSubmit={handleSubmit(onSubmit)}
  >
   <div className="flex flex-col items-center gap-2 text-center">
    <h1 className="text-2xl font-bold">Login to your account</h1>
    <p className="text-muted-foreground text-sm text-balance">
     Enter your email below to login to your account
    </p>
   </div>

   {error && (
    <div className="bg-destructive/15 text-destructive border border-destructive/20 rounded-md p-3 text-sm">
     {error}
    </div>
   )}

   <div className="grid gap-6">
    <div className="grid gap-3">
     <Label htmlFor="email">Email</Label>
     <Input
      id="email"
      type="email"
      placeholder="m@example.com"
      {...register("email", {
       required: "Email is required",
       pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
       },
      })}
      aria-invalid={errors.email ? "true" : "false"}
     />
     {errors.email && (
      <p className="text-sm text-destructive">{errors.email.message}</p>
     )}
    </div>

    <div className="grid gap-3">
     <Label htmlFor="password">Password</Label>
     <div className="relative">
      <Input
       id="password"
       type={showPassword ? "text" : "password"}
       {...register("password", {
        required: "Password is required",
       })}
       aria-invalid={errors.password ? "true" : "false"}
      />
      <Button
       type="button"
       variant="ghost"
       size="icon"
       className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
       onClick={() => setShowPassword(!showPassword)}
      >
       {showPassword ? (
        <EyeOffIcon className="h-4 w-4" />
       ) : (
        <EyeIcon className="h-4 w-4" />
       )}
      </Button>
     </div>
     {errors.password && (
      <p className="text-sm text-destructive">{errors.password.message}</p>
     )}
    </div>

    <Button type="submit" className="w-full" disabled={isLoading}>
     {isLoading ? "Logging in..." : "Login"}
    </Button>
   </div>

   <div className="text-center text-sm">
    Don&apos;t have an account?{" "}
    <Link
     to="/signup"
     className="underline underline-offset-4 hover:no-underline"
    >
     Sign up
    </Link>
   </div>
  </form>
 );
}
