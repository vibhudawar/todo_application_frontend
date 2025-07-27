import {
 BrowserRouter as Router,
 Routes,
 Route,
 Navigate,
} from "react-router-dom";
import {useEffect} from "react";
import {Provider} from "react-redux";
import {store} from "./store";
import {useAppSelector, useAppDispatch} from "./store/hooks";
import {initializeAuth, selectIsAuthenticated, selectAuthLoading} from "./store/authSlice";
import {initializeTheme} from "./store/themeSlice";
import {ProtectedRoute} from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TodoPage from "./pages/TodoPage";

// Component to handle authenticated redirects
function AuthenticatedRedirect() {
 const isAuthenticated = useAppSelector(selectIsAuthenticated);
 const isLoading = useAppSelector(selectAuthLoading);

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
 const isAuthenticated = useAppSelector(selectIsAuthenticated);
 const isLoading = useAppSelector(selectAuthLoading);

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
      <TodoPage />
     </ProtectedRoute>
    }
   />
   <Route path="/dashboard" element={<AuthenticatedRedirect />} />
   <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
 );
}

function AppContent() {
 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(initializeAuth());
  dispatch(initializeTheme());
 }, [dispatch]);

 return (
  <Router>
   <div className="min-h-screen bg-background text-foreground">
    <AppRoutes />
   </div>
  </Router>
 );
}

function App() {
 return (
  <Provider store={store}>
   <AppContent />
  </Provider>
 );
}

export default App;
