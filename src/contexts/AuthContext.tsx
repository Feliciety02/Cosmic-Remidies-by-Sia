"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import type { AuthUser } from "@/lib/auth";

interface LoginInput {
  email: string;
  password: string;
}

interface CreateAccountInput extends LoginInput {
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isHydrated: boolean;
  login: (input: LoginInput) => Promise<AuthUser | null>;
  loginWithGoogle: (callbackUrl?: string) => Promise<void>;
  createAccount: (input: CreateAccountInput) => Promise<AuthUser | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapSessionUser = (sessionUser: {
  name?: string | null;
  email?: string | null;
  createdAt?: string;
  role?: "customer" | "admin";
}): AuthUser | null => {
  if (!sessionUser.email || !sessionUser.createdAt || !sessionUser.role) {
    return null;
  }

  return {
    name: sessionUser.name ?? "Account",
    email: sessionUser.email,
    createdAt: sessionUser.createdAt,
    role: sessionUser.role,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const user = mapSessionUser(session?.user ?? {});
  const isHydrated = status !== "loading";

  const login = async ({ email, password }: LoginInput) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result || result.error) {
      toast.error("The admin credentials you entered are incorrect.");
      return null;
    }

    const nextSession = await getSession();
    const nextUser = mapSessionUser(nextSession?.user ?? {});

    if (!nextUser) {
      toast.error("Sign-in succeeded, but the session could not be loaded.");
      return null;
    }

    toast.success(nextUser.role === "admin" ? "Admin access granted." : `Welcome back, ${nextUser.name}.`);
    return nextUser;
  };

  const loginWithGoogle = async (callbackUrl = "/account") => {
    await signIn("google", { callbackUrl });
  };

  const createAccount = async (_input: CreateAccountInput) => {
    toast.error("Email/password signup is disabled until a database-backed customer auth flow is added.");
    return null;
  };

  const logout = async () => {
    await signOut({ redirect: false });
    toast.success("You have been signed out.");
  };

  return (
    <AuthContext.Provider value={{ user, isHydrated, login, loginWithGoogle, createAccount, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
