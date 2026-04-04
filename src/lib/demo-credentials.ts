export type UserRole = "customer" | "admin";

export interface HardcodedCredentialAccount {
  name: string;
  email: string;
  password: string;
  createdAt: string;
  role: UserRole;
}

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const hardcodedCredentialAccounts: HardcodedCredentialAccount[] = [
  {
    name: "Demo Customer",
    email: "customer@gmail.com",
    password: "customer123",
    createdAt: "2026-03-29T00:00:00.000Z",
    role: "customer",
  },
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
    createdAt: "2026-03-29T00:00:00.000Z",
    role: "admin",
  },
];

export const getHardcodedCredentialUser = (email: string, password: string) => {
  const normalizedEmail = normalizeEmail(email);
  return hardcodedCredentialAccounts.find(
    (entry) => entry.email === normalizedEmail && entry.password === password,
  ) ?? null;
};
