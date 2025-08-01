import {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, Link} from "react-router-dom";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {cn} from "../../lib/utils";
import {Button} from "../../components/ui/button";
import {Input} from "../../components/ui/input";
import {Label} from "../../components/ui/label";
import {useAppSelector, useAppDispatch} from "../../store/hooks";
import {signup, selectAuthLoading, selectAuthError} from "../../store/authSlice";
import type {UserSignup} from "../../types/auth";

interface SignupFormData extends UserSignup {
 confirmPassword: string;
}

interface SignupFormProps {
 className?: string;
}

export function SignupForm({className}: SignupFormProps) {
 const dispatch = useAppDispatch();
 const isLoading = useAppSelector(selectAuthLoading);
 const error = useAppSelector(selectAuthError);
 const navigate = useNavigate();
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [success, setSuccess] = useState(false);

 const {
  register,
  handleSubmit,
  watch,
  formState: {errors},
 } = useForm<SignupFormData>();

 const password = watch("password");

 const onSubmit = async (data: SignupFormData) => {
  try {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const {confirmPassword, ...signupData} = data;
   await dispatch(signup(signupData)).unwrap();
   setSuccess(true);
   setTimeout(() => {
    navigate("/login");
   }, 2000);
  } catch {
   // Error handled by Redux
  }
 };

 if (success) {
  return (
   <div className={cn("flex flex-col gap-6", className)}>
    <div className="flex flex-col items-center gap-2 text-center">
     <h1 className="text-2xl font-bold text-green-600">Account Created!</h1>
     <p className="text-muted-foreground text-sm">
      Your account has been successfully created. Redirecting to login...
     </p>
    </div>
   </div>
  );
 }

 return (
  <form
   className={cn("flex flex-col gap-6", className)}
   onSubmit={handleSubmit(onSubmit)}
  >
   <div className="flex flex-col items-center gap-2 text-center">
    <h1 className="text-2xl font-bold">Create an account</h1>
    <p className="text-muted-foreground text-sm text-balance">
     Enter your information below to create your account
    </p>
   </div>

   {error && (
    <div className="bg-destructive/15 text-destructive border border-destructive/20 rounded-md p-3 text-sm">
     {error}
    </div>
   )}

   <div className="grid gap-6">
    <div className="grid gap-3">
     <Label htmlFor="name">Name</Label>
     <Input
      id="name"
      type="text"
      placeholder="John Doe"
      {...register("name", {
       required: "Name is required",
       minLength: {
        value: 2,
        message: "Name must be at least 2 characters",
       },
       maxLength: {
        value: 50,
        message: "Name must not exceed 50 characters",
       },
      })}
      aria-invalid={errors.name ? "true" : "false"}
     />
     {errors.name && (
      <p className="text-sm text-destructive">{errors.name.message}</p>
     )}
    </div>

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
        minLength: {
         value: 6,
         message: "Password must be at least 6 characters",
        },
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

    <div className="grid gap-3">
     <Label htmlFor="confirmPassword">Confirm Password</Label>
     <div className="relative">
      <Input
       id="confirmPassword"
       type={showConfirmPassword ? "text" : "password"}
       {...register("confirmPassword", {
        required: "Please confirm your password",
        validate: (value) => value === password || "Passwords do not match",
       })}
       aria-invalid={errors.confirmPassword ? "true" : "false"}
      />
      <Button
       type="button"
       variant="ghost"
       size="icon"
       className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      >
       {showConfirmPassword ? (
        <EyeOffIcon className="h-4 w-4" />
       ) : (
        <EyeIcon className="h-4 w-4" />
       )}
      </Button>
     </div>
     {errors.confirmPassword && (
      <p className="text-sm text-destructive">
       {errors.confirmPassword.message}
      </p>
     )}
    </div>

    <Button type="submit" className="w-full" disabled={isLoading}>
     {isLoading ? "Creating account..." : "Create account"}
    </Button>
   </div>

   <div className="text-center text-sm">
    Already have an account?{" "}
    <Link
     to="/login"
     className="underline underline-offset-4 hover:no-underline"
    >
     Login
    </Link>
   </div>
  </form>
 );
}
