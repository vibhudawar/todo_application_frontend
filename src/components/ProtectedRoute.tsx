import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../store/hooks";
import {selectIsAuthenticated, selectAuthLoading} from "../store/authSlice";

interface ProtectedRouteProps {
 children: React.ReactNode;
}

export function ProtectedRoute({children}: ProtectedRouteProps) {
 const isAuthenticated = useAppSelector(selectIsAuthenticated);
 const isLoading = useAppSelector(selectAuthLoading);
 const location = useLocation();

 // Show loading while checking authentication
 if (isLoading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
   </div>
  );
 }

 // Redirect to login if not authenticated
 if (!isAuthenticated) {
  return <Navigate to="/login" state={{from: location}} replace />;
 }

 return <>{children}</>;
}
