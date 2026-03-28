import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      createdAt: string;
      role: "customer" | "admin";
    };
  }

  interface User {
    createdAt?: string;
    role?: "customer" | "admin";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    createdAt?: string;
    role?: "customer" | "admin";
  }
}
