
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToolsGallery from "./pages/ToolsGallery";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import PythonCourse from "./pages/PythonCourse";
import { isLoggedIn, isAdmin, isStudent, isGuide, getCurrentUser } from "./utils/authUtils";

// Create a guide-only route component
const GuideRoute = ({ element }: { element: JSX.Element }) => {
  return isLoggedIn() && (isGuide() || isAdmin()) ? element : <Navigate to="/" />;
};

// Create an admin-only route component
const AdminRoute = ({ element }: { element: JSX.Element }) => {
  return isLoggedIn() && isAdmin() ? element : <Navigate to="/" />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ToolsGallery />} />
          <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
          <Route path="/python-course" element={<GuideRoute element={<PythonCourse />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
