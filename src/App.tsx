
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToolsGallery from "./pages/ToolsGallery";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import PythonCourse from "./pages/PythonCourse";
import Login from "./pages/Login";
import Index from "./pages/Index";
import { isLoggedIn, isAdmin, isStudent, isGuide, getCurrentUser } from "./utils/authUtils";

// Modify the existing route components to allow guides
const AdminRoute = ({ element }: { element: JSX.Element }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin() && !isGuide()) {
    return <Navigate to="/" />;
  }
  
  return element;
};

// Update PythonRoute to use the same logic as AdminRoute
const PythonRoute = ({ element }: { element: JSX.Element }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin() && !isGuide()) {
    return <Navigate to="/" />;
  }
  
  return element;
};

// Create a route for Tools Gallery that allows guides and admins
const ToolsGalleryRoute = ({ element }: { element: JSX.Element }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin() && !isGuide()) {
    return <Navigate to="/" />;
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
          <Route path="/tools" element={<ToolsGalleryRoute element={<ToolsGallery />} />} />
          <Route path="/login" element={<AuthRedirect element={<Login />} />} />
          <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
          <Route path="/python-course" element={<PythonRoute element={<PythonCourse />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
