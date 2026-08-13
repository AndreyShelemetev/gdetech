"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export interface AuthUser {
  id: string;
  email: string;
  displayName: string | null;
  role: "user" | "admin";
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isModalOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const signOut = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isModalOpen,
        openLogin: () => setIsModalOpen(true),
        closeLogin: () => setIsModalOpen(false),
        signOut,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
