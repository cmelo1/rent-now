"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/lib/types";
import { mockUsers } from "@/data/users";

interface AuthContextType {
  user: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("rentnow_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("rentnow_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string): boolean => {
    const found = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (found) {
      setUser(found);
      localStorage.setItem("rentnow_user", JSON.stringify(found));
      return true;
    }
    // Auto-create for any email in mock mode
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0],
      email,
      avatar: `https://picsum.photos/seed/${encodeURIComponent(email)}/100/100`,
    };
    setUser(newUser);
    localStorage.setItem("rentnow_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rentnow_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
