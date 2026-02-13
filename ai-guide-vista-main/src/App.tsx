import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Lab from "./pages/Lab";
import Achievements from "./pages/Achievements";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Diagnostic from "./pages/Diagnostic";
import Results from "./pages/Results";
import ProtectedRoute, { RequireDiagnosticComplete, RequireOnboarding } from "./components/ProtectedRoute";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="login" element={<Login />} />
              <Route path="onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
              <Route path="dashboard" element={<RequireDiagnosticComplete><Dashboard /></RequireDiagnosticComplete>} />
              <Route path="diagnostic" element={<ProtectedRoute><Diagnostic /></ProtectedRoute>} />
              <Route path="results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
              <Route path="courses" element={<RequireDiagnosticComplete><Courses /></RequireDiagnosticComplete>} />
              <Route path="lab" element={<RequireDiagnosticComplete><Lab /></RequireDiagnosticComplete>} />
              <Route path="achievements" element={<RequireDiagnosticComplete><Achievements /></RequireDiagnosticComplete>} />
              <Route path="profile" element={<RequireDiagnosticComplete><Profile /></RequireDiagnosticComplete>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
