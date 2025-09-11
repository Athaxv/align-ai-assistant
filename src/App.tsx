import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import UpdatedLoginForm from "./components/auth/UpdatedLoginForm";
import SignupForm from "./components/auth/SignupForm";
import ASHADashboard from "./components/asha/ASHADashboard";
import ClinicDashboard from "./components/clinic/ClinicDashboard";
import ResearcherDashboard from "./components/researcher/ResearcherDashboard";
import PublicDashboard from "./components/public/PublicDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<UpdatedLoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/dashboard/asha" element={<ASHADashboard />} />
            <Route path="/dashboard/clinic" element={<ClinicDashboard />} />
            <Route path="/dashboard/researcher" element={<ResearcherDashboard />} />
            <Route path="/dashboard/public" element={<PublicDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
