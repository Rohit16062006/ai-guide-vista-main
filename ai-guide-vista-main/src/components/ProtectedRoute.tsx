import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export function RequireDiagnosticComplete({ children }: { children: JSX.Element }) {
  const { user, hasCompletedDiagnostic } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  if (!hasCompletedDiagnostic) return <Navigate to="/diagnostic" replace />;
  return children;
}

export function RequireOnboarding({ children }: { children: JSX.Element }) {
  const { user, hasCompletedOnboarding } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  if (!hasCompletedOnboarding) return <Navigate to="/onboarding" replace />;
  return children;
}


