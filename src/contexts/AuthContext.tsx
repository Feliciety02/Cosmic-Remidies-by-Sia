"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  ADMIN_PASSWORD,
  ADMIN_USER,
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAME,
  AUTH_SESSION_STORAGE_KEY,
  AUTH_USERS_STORAGE_KEY,
  isAdminEmail,
  normalizeEmail,
  toAuthUser,
  type AuthUser,
  type StoredSession,
  type StoredUser,
  type UserRole,
} from "@/lib/auth";

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
  createAccount: (input: CreateAccountInput) => Promise<AuthUser | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const parseStoredValue = <T,>(value: string | null): T | null => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

const isStoredUser = (value: unknown): value is StoredUser => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.name === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.passwordHash === "string" &&
    typeof candidate.createdAt === "string"
  );
};

const hashPassword = async (password: string) => {
  const digest = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, "0")).join("");
};

const setSessionCookie = (email: string) => {
  document.cookie =
    `${AUTH_COOKIE_NAME}=${encodeURIComponent(email)}; path=/; max-age=${AUTH_COOKIE_MAX_AGE}; SameSite=Lax`;
};

const clearSessionCookie = () => {
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedUsers = parseStoredValue<unknown[]>(localStorage.getItem(AUTH_USERS_STORAGE_KEY)) ?? [];
      const validUsers = storedUsers.filter(isStoredUser).map((storedUser) => ({
        ...storedUser,
        email: normalizeEmail(storedUser.email),
      }));
      const storedSession = parseStoredValue<StoredSession>(localStorage.getItem(AUTH_SESSION_STORAGE_KEY));
      const sessionEmail = storedSession?.email ? normalizeEmail(storedSession.email) : null;
      const sessionRole =
        storedSession?.role ?? (sessionEmail && isAdminEmail(sessionEmail) ? "admin" : sessionEmail ? "customer" : null);
      const matchingUser = sessionEmail ? validUsers.find((storedUser) => storedUser.email === sessionEmail) : null;

      setUsers(validUsers);

      if (sessionEmail && sessionRole === "admin" && isAdminEmail(sessionEmail)) {
        setUser(ADMIN_USER);
        setSessionCookie(ADMIN_USER.email);
      } else if (matchingUser) {
        setUser(toAuthUser(matchingUser));
        setSessionCookie(matchingUser.email);
      } else {
        localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
        clearSessionCookie();
      }
    } catch {
      setUsers([]);
      setUser(null);
      clearSessionCookie();
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const persistUsers = (nextUsers: StoredUser[]) => {
    setUsers(nextUsers);
    localStorage.setItem(AUTH_USERS_STORAGE_KEY, JSON.stringify(nextUsers));
  };

  const persistSession = (email: string | null, role: UserRole | null = null) => {
    if (email) {
      localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify({ email, role }));
      setSessionCookie(email);
      return;
    }

    localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    clearSessionCookie();
  };

  const login = async ({ email, password }: LoginInput) => {
    const normalizedEmail = normalizeEmail(email);

    if (isAdminEmail(normalizedEmail)) {
      if (password !== ADMIN_PASSWORD) {
        toast.error("The password you entered is incorrect.");
        return null;
      }

      setUser(ADMIN_USER);
      persistSession(ADMIN_USER.email, "admin");
      toast.success("Admin access granted.");
      return ADMIN_USER;
    }

    const matchingUser = users.find((storedUser) => storedUser.email === normalizedEmail);

    if (!matchingUser) {
      toast.error("No customer account was found for that email.");
      return null;
    }

    const passwordHash = await hashPassword(password);

    if (matchingUser.passwordHash !== passwordHash) {
      toast.error("The password you entered is incorrect.");
      return null;
    }

    const authUser = toAuthUser(matchingUser);

    setUser(authUser);
    persistSession(matchingUser.email, "customer");
    toast.success(`Welcome back, ${matchingUser.name}.`);
    return authUser;
  };

  const createAccount = async ({ name, email, password }: CreateAccountInput) => {
    const normalizedEmail = normalizeEmail(email);

    if (isAdminEmail(normalizedEmail)) {
      toast.error("That email is reserved for admin access.");
      return null;
    }

    if (users.some((storedUser) => storedUser.email === normalizedEmail)) {
      toast.error("An account with that email already exists.");
      return null;
    }

    const nextUser: StoredUser = {
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: await hashPassword(password),
      createdAt: new Date().toISOString(),
    };
    const nextUsers = [...users, nextUser];
    const authUser = toAuthUser(nextUser);

    persistUsers(nextUsers);
    setUser(authUser);
    persistSession(nextUser.email, "customer");
    toast.success("Your customer account is ready.");
    return authUser;
  };

  const logout = () => {
    setUser(null);
    persistSession(null);
    toast.success("You have been signed out.");
  };

  return <AuthContext.Provider value={{ user, isHydrated, login, createAccount, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
