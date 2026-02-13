import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type UserProfile = {
  id: string;
  name: string;
  email?: string;
};

export type StudentDetails = {
  age?: number;
  place?: string;
  classGrade?: string;
  subjects?: string[];
  interests?: string[];
  learningStyle?: 'diagrams' | 'explanations' | 'practice' | 'interactive' | string;
  goal?: 'exams' | 'projects' | 'fun' | string;
};

type UserContextValue = {
  user: UserProfile | null;
  login: (profile: { name: string; email?: string }) => void;
  logout: () => void;
  hasCompletedDiagnostic: boolean;
  markDiagnosticComplete: () => void;
  resetDiagnostic: () => void;
  details: StudentDetails | null;
  setDetails: (d: StudentDetails) => void;
  hasCompletedOnboarding: boolean;
  markOnboardingComplete: () => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

const STORAGE_KEY = "ai_teacher_user";
const STORAGE_DIAG_KEY = "ai_teacher_diag_complete";
const STORAGE_DETAILS_KEY = "ai_teacher_student_details";
const STORAGE_ONBOARD_KEY = "ai_teacher_onboarding_complete";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [hasCompletedDiagnostic, setHasCompletedDiagnostic] = useState<boolean>(false);
  const [details, setDetailsState] = useState<StudentDetails | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
      const diag = localStorage.getItem(STORAGE_DIAG_KEY);
      setHasCompletedDiagnostic(diag === "true");
      const det = localStorage.getItem(STORAGE_DETAILS_KEY);
      if (det) setDetailsState(JSON.parse(det));
      const ob = localStorage.getItem(STORAGE_ONBOARD_KEY);
      setHasCompletedOnboarding(ob === "true");
    } catch (_) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch (_) {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DIAG_KEY, String(hasCompletedDiagnostic));
    } catch (_) {
      // ignore
    }
  }, [hasCompletedDiagnostic]);

  useEffect(() => {
    try {
      if (details) localStorage.setItem(STORAGE_DETAILS_KEY, JSON.stringify(details));
    } catch (_) {
      // ignore
    }
  }, [details]);

  const login = useCallback((profile: { name: string; email?: string }) => {
    const generateId = () => {
      if (typeof crypto !== 'undefined' && 'randomUUID' in crypto && typeof (crypto as any).randomUUID === 'function') {
        return (crypto as any).randomUUID();
      }
      const getRandomValues = (len: number) => {
        if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
          const arr = new Uint8Array(len);
          crypto.getRandomValues(arr);
          return Array.from(arr);
        }
        return Array.from({ length: len }, () => Math.floor(Math.random() * 256));
      };
      const bytes = getRandomValues(16);
      // Set version and variant bits for UUID v4
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      const toHex = (n: number) => n.toString(16).padStart(2, '0');
      const hex = bytes.map(toHex).join('');
      return `${hex.substring(0,8)}-${hex.substring(8,12)}-${hex.substring(12,16)}-${hex.substring(16,20)}-${hex.substring(20)}`;
    };

    const newUser: UserProfile = {
      id: generateId(),
      name: profile.name,
      email: profile.email,
    };
    setUser(newUser);
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const markDiagnosticComplete = useCallback(() => setHasCompletedDiagnostic(true), []);
  const resetDiagnostic = useCallback(() => setHasCompletedDiagnostic(false), []);
  const setDetails = useCallback((d: StudentDetails) => setDetailsState(d), []);
  const markOnboardingComplete = useCallback(() => setHasCompletedOnboarding(true), []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      hasCompletedDiagnostic,
      markDiagnosticComplete,
      resetDiagnostic,
      details,
      setDetails,
      hasCompletedOnboarding,
      markOnboardingComplete,
    }),
    [
      user,
      login,
      logout,
      hasCompletedDiagnostic,
      markDiagnosticComplete,
      resetDiagnostic,
      details,
      setDetails,
      hasCompletedOnboarding,
      markOnboardingComplete,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}


