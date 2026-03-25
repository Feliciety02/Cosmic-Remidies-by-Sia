export const AUTH_COOKIE_NAME = "cosmic_customer_session";
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
export const AUTH_USERS_STORAGE_KEY = "cosmic_customer_accounts";
export const AUTH_SESSION_STORAGE_KEY = "cosmic_customer_session";

export type UserRole = "customer" | "admin";

export const normalizeEmail = (email: string) => email.trim().toLowerCase();
export const parseSessionEmail = (email: string | null | undefined) => normalizeEmail(decodeURIComponent(email ?? ""));

export const ADMIN_EMAIL = normalizeEmail("admin@gmail.com");
export const ADMIN_PASSWORD = "admin123";
export const ADMIN_USER = {
  name: "Admin",
  email: ADMIN_EMAIL,
  createdAt: "2026-03-25T00:00:00.000Z",
  role: "admin" as const,
};

export interface StoredUser {
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface AuthUser {
  name: string;
  email: string;
  createdAt: string;
  role: UserRole;
}

export interface StoredSession {
  email: string;
  role?: UserRole;
}

export const isAdminEmail = (email: string) => normalizeEmail(email) === ADMIN_EMAIL;

export const toAuthUser = ({ passwordHash: _passwordHash, ...user }: StoredUser): AuthUser => ({
  ...user,
  role: "customer",
});
