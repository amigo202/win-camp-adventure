
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import PythonCourse from "./pages/PythonCourse";
import { isLoggedIn, isAdmin } from "./utils/authUtils";

// Create a protected route component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return isLoggedIn() ? element : <Navigate to="/login" />;
};

// Create an admin-only route component
const AdminRoute = ({ element }: { element: JSX.Element }) => {
  return isLoggedIn() && isAdmin() ? element : <Navigate to="/dashboard" />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
          <Route path="/python-course" element={<ProtectedRoute element={<PythonCourse />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
