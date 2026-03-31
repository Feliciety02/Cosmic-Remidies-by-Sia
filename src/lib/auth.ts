import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export type UserRole = "customer" | "admin";

export interface AuthUser {
  name: string;
  email: string;
  createdAt: string;
  role: UserRole;
}

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

interface HardcodedCredentialAccount extends AuthUser {
  password: string;
}

export const hardcodedCredentialAccounts: HardcodedCredentialAccount[] = [
  {
    name: "Demo Customer",
    email: "customer@example.com",
    password: "customer123",
    createdAt: "2026-03-29T00:00:00.000Z",
    role: "customer",
  },
  {
    name: "Admin",
    email: "admin@example.com",
    password: "admin123",
    createdAt: "2026-03-29T00:00:00.000Z",
    role: "admin",
  },
];

export const getHardcodedCredentialUser = (email: string, password: string): AuthUser | null => {
  const normalizedEmail = normalizeEmail(email);
  const account = hardcodedCredentialAccounts.find(
    (entry) => entry.email === normalizedEmail && entry.password === password,
  );

  if (!account) {
    return null;
  }

  return {
    name: account.name,
    email: account.email,
    createdAt: account.createdAt,
    role: account.role,
  };
};

const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

const providers = [
  ...(googleEnabled
    ? [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
      ]
    : []),
  CredentialsProvider({
    id: "credentials",
    name: "Account Login",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = normalizeEmail(credentials?.email ?? "");
      const password = credentials?.password ?? "";
      const user = getHardcodedCredentialUser(email, password);

      return user
        ? {
            id: user.email,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          }
        : null;
    },
  }),
];

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/?auth=login",
    error: "/?auth=login",
  },
  session: {
    strategy: "jwt",
  },
  providers,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return (profile as { email_verified?: boolean } | undefined)?.email_verified === true;
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role ?? "customer";
        token.createdAt = user.createdAt ?? new Date().toISOString();
      }

      if (!token.role) {
        token.role = "customer";
      }

      if (!token.createdAt) {
        token.createdAt = new Date().toISOString();
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as UserRole;
        session.user.createdAt = typeof token.createdAt === "string" ? token.createdAt : new Date().toISOString();
        session.user.email = session.user.email ?? "";
        session.user.name = session.user.name ?? "Account";
      }

      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
export const isGoogleAuthEnabled = googleEnabled;
