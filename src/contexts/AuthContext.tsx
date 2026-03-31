"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { getHardcodedCredentialUser, hardcodedCredentialAccounts, type AuthUser } from "@/lib/auth";

interface LoginInput {
  email: string;
  password: string;
}

interface CreateAccountInput extends LoginInput {
  name: string;
}

interface StoredCustomerAccount extends AuthUser {
  password: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isHydrated: boolean;
  loginCustomer: (input: LoginInput) => Promise<AuthUser | null>;
  loginWithGoogle: (callbackUrl?: string) => Promise<void>;
  createAccount: (input: CreateAccountInput) => Promise<AuthUser | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const CUSTOMER_ACCOUNTS_STORAGE_KEY = "cosmic-customer-accounts";
const CUSTOMER_SESSION_STORAGE_KEY = "cosmic-customer-session";
const defaultCustomerAccounts: StoredCustomerAccount[] = hardcodedCredentialAccounts
  .filter((account) => account.role === "customer")
  .map((account) => ({ ...account }));

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

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const readStoredAccounts = (rawValue: string | null): StoredCustomerAccount[] => {
  if (!rawValue) {
    return defaultCustomerAccounts;
  }

  try {
    const parsed = JSON.parse(rawValue) as StoredCustomerAccount[];

    if (!Array.isArray(parsed)) {
      return defaultCustomerAccounts;
    }

    const validAccounts = parsed.filter(
      (account) =>
        account &&
        typeof account.name === "string" &&
        typeof account.email === "string" &&
        typeof account.password === "string" &&
        typeof account.createdAt === "string" &&
        account.role === "customer",
    );

    return [...defaultCustomerAccounts, ...validAccounts.filter((account) => account.email !== defaultCustomerAccounts[0].email)];
  } catch {
    return defaultCustomerAccounts;
  }
};

const readStoredSession = (rawValue: string | null): AuthUser | null => {
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as AuthUser;

    if (
      !parsed ||
      typeof parsed.name !== "string" ||
      typeof parsed.email !== "string" ||
      typeof parsed.createdAt !== "string" ||
      parsed.role !== "customer"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const sessionUser = mapSessionUser(session?.user ?? {});
  const [localUser, setLocalUser] = useState<AuthUser | null>(null);
  const [localReady, setLocalReady] = useState(false);
  const user = useMemo(() => sessionUser ?? localUser, [localUser, sessionUser]);
  const isHydrated = status !== "loading" && localReady;

  useEffect(() => {
    const storedSession = readStoredSession(window.localStorage.getItem(CUSTOMER_SESSION_STORAGE_KEY));
    setLocalUser(storedSession);
    setLocalReady(true);
  }, []);

  useEffect(() => {
    if (sessionUser) {
      window.localStorage.removeItem(CUSTOMER_SESSION_STORAGE_KEY);
      setLocalUser(null);
    }
  }, [sessionUser]);

  const loginCustomer = async ({ email, password }: LoginInput) => {
    const accounts = readStoredAccounts(window.localStorage.getItem(CUSTOMER_ACCOUNTS_STORAGE_KEY));
    const normalizedEmail = normalizeEmail(email);
    const account = accounts.find((entry) => entry.email === normalizedEmail && entry.password === password);

    if (account) {
      const nextUser: AuthUser = {
        name: account.name,
        email: account.email,
        createdAt: account.createdAt,
        role: "customer",
      };

      window.localStorage.setItem(CUSTOMER_SESSION_STORAGE_KEY, JSON.stringify(nextUser));
      setLocalUser(nextUser);
      toast.success(`Welcome back, ${nextUser.name}.`);
      return nextUser;
    }

    const hardcodedUser = getHardcodedCredentialUser(email, password);

    if (!hardcodedUser) {
      toast.error("We couldn't match that email and password.");
      return null;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result || result.error) {
      toast.error("That account is available, but the sign-in session could not be started.");
      return null;
    }

    const nextSession = await getSession();
    const nextUser = mapSessionUser(nextSession?.user ?? {});

    if (!nextUser) {
      toast.error("Sign-in succeeded, but the session could not be loaded.");
      return null;
    }

    toast.success(`Welcome back, ${nextUser.name}.`);
    return nextUser;
  };

  const loginWithGoogle = async (callbackUrl = "/account") => {
    await signIn("google", { callbackUrl });
  };

  const createAccount = async ({ name, email, password }: CreateAccountInput) => {
    const trimmedName = name.trim();
    const normalizedEmail = normalizeEmail(email);
    const trimmedPassword = password.trim();

    if (!trimmedName || !normalizedEmail || !trimmedPassword) {
      toast.error("Name, email, and password are required.");
      return null;
    }

    const accounts = readStoredAccounts(window.localStorage.getItem(CUSTOMER_ACCOUNTS_STORAGE_KEY));

    if (accounts.some((account) => account.email === normalizedEmail)) {
      toast.error("A customer account with that email already exists.");
      return null;
    }

    const nextUser: AuthUser = {
      name: trimmedName,
      email: normalizedEmail,
      createdAt: new Date().toISOString(),
      role: "customer",
    };

    const nextAccount: StoredCustomerAccount = {
      ...nextUser,
      password: trimmedPassword,
    };

    window.localStorage.setItem(CUSTOMER_ACCOUNTS_STORAGE_KEY, JSON.stringify([nextAccount, ...accounts]));
    window.localStorage.setItem(CUSTOMER_SESSION_STORAGE_KEY, JSON.stringify(nextUser));
    setLocalUser(nextUser);
    toast.success(`Account created for ${nextUser.name}.`);
    return nextUser;
  };

  const logout = async () => {
    window.localStorage.removeItem(CUSTOMER_SESSION_STORAGE_KEY);
    setLocalUser(null);

    if (sessionUser) {
      await signOut({ redirect: false });
    }

    toast.success("You have been signed out.");
  };

  return (
    <AuthContext.Provider
      value={{ user, isHydrated, loginCustomer, loginWithGoogle, createAccount, logout }}
    >
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
