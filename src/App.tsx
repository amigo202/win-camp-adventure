
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToolsGallery from "./pages/ToolsGallery";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Index from "./pages/Index";
import { isLoggedIn, isAdmin, isStudent, isGuide, getCurrentUser } from "./utils/authUtils";

// Create an admin-only route component
const AdminRoute = ({ element }: { element: JSX.Element }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin() && !isGuide()) {
    return <Navigate to="/" />;
  }
  
  return element;
};

// Create a redirect component for already logged in users
const AuthRedirect = ({ element }: { element: JSX.Element }) => {
  if (isLoggedIn()) {
    if (isAdmin() || isGuide()) {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }
  return element;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools" element={<ToolsGallery />} />
          <Route path="/login" element={<AuthRedirect element={<Login />} />} />
          <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
