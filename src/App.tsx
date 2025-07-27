import {
 BrowserRouter as Router,
 Routes,
 Route,
 Navigate,
} from "react-router-dom";
import {AuthProvider, useAuth} from "./context/AuthContext";
import {ThemeProvider} from "./context/ThemeContext";
import {TodoProvider} from "./context/TodoContext";
import {ProtectedRoute} from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TodoPage from "./pages/TodoPage";

// Component to handle authenticated redirects
function AuthenticatedRedirect() {
 const {isAuthenticated, isLoading} = useAuth();

 if (isLoading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
   </div>
  );
 }

 if (isAuthenticated) {
  return <Navigate to="/todos" replace />;
 }

 return <Navigate to="/" replace />;
}

// Component to redirect authenticated users away from auth pages
function AuthPageRedirect({children}: {children: React.ReactNode}) {
 const {isAuthenticated, isLoading} = useAuth();

 if (isLoading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
   </div>
  );
 }

 if (isAuthenticated) {
  return <Navigate to="/todos" replace />;
 }

 return <>{children}</>;
}

function AppRoutes() {
 return (
  <Routes>
   <Route
    path="/"
    element={
     <AuthPageRedirect>
      <LandingPage />
     </AuthPageRedirect>
    }
   />
   <Route
    path="/login"
    element={
     <AuthPageRedirect>
      <LoginPage />
     </AuthPageRedirect>
    }
   />
   <Route
    path="/signup"
    element={
     <AuthPageRedirect>
      <SignupPage />
     </AuthPageRedirect>
    }
   />
   <Route
    path="/todos"
    element={
     <ProtectedRoute>
      <TodoProvider>
       <TodoPage />
      </TodoProvider>
     </ProtectedRoute>
    }
   />
   <Route path="/dashboard" element={<AuthenticatedRedirect />} />
   <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
 );
}

function App() {
 return (
  <ThemeProvider>
   <Router>
    <AuthProvider>
     <div className="min-h-screen bg-background text-foreground">
      <AppRoutes />
     </div>
    </AuthProvider>
   </Router>
  </ThemeProvider>
 );
}

export default App;
