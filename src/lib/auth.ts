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

const adminEmail = process.env.ADMIN_EMAIL ? normalizeEmail(process.env.ADMIN_EMAIL) : null;
const adminPassword = process.env.ADMIN_PASSWORD ?? null;
const adminName = process.env.ADMIN_NAME?.trim() || "Admin";
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
    name: "Admin Login",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!adminEmail || !adminPassword) {
        return null;
      }

      const email = normalizeEmail(credentials?.email ?? "");
      const password = credentials?.password ?? "";

      if (email !== adminEmail || password !== adminPassword) {
        return null;
      }

      return {
        id: adminEmail,
        name: adminName,
        email: adminEmail,
        role: "admin" as const,
        createdAt: new Date().toISOString(),
      };
    },
  }),
];

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
        token.role = user.role ?? (account?.provider === "google" ? "customer" : "admin");
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
