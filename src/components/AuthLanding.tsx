"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, KeyRound, Sparkles, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthMode = "login" | "create";

const AuthLanding = () => {
  const router = useRouter();
  const { user, isHydrated, login, createAccount, logout } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [createForm, setCreateForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState<string | null>(null);

  const routeToArea = (role: "customer" | "admin") => {
    router.push(role === "admin" ? "/admin" : "/account");
    router.refresh();
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const loggedInUser = await login(loginForm);
      if (loggedInUser) {
        routeToArea(loggedInUser.role);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (createForm.password.length < 8) {
      setError("Use at least 8 characters for the password.");
      return;
    }

    if (createForm.password !== createForm.confirmPassword) {
      setError("Password confirmation does not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const createdUser = await createAccount({
        name: createForm.name,
        email: createForm.email,
        password: createForm.password,
      });

      if (createdUser) {
        routeToArea(createdUser.role);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="rounded-3xl border bg-card/95 p-8 shadow-xl shadow-primary/10 backdrop-blur">
        <div className="space-y-3">
          <div className="h-4 w-32 rounded-full bg-muted" />
          <div className="h-10 w-full rounded-xl bg-muted" />
          <div className="h-10 w-full rounded-xl bg-muted" />
          <div className="h-12 w-full rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  if (user) {
    const isAdmin = user.role === "admin";

    return (
      <div className="rounded-3xl border bg-card/95 p-8 shadow-xl shadow-primary/10 backdrop-blur">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          {isAdmin ? "Admin session active" : "Customer account active"}
        </span>
        <h2 className="mt-5 font-display text-3xl font-bold">Welcome back, {user.name}.</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {isAdmin
            ? "You are signed in with the admin credential. Open the admin dashboard or return to the storefront."
            : "Your account is already active. Continue browsing guides or open your customer dashboard."}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button onClick={() => routeToArea(user.role)} className="gap-2">
            {isAdmin ? "Open Admin" : "Open Account"} <ArrowRight className="h-4 w-4" />
          </Button>
          <Button asChild variant="outline">
            <Link href={isAdmin ? "/" : "/shop"}>{isAdmin ? "View Storefront" : "Browse Guides"}</Link>
          </Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="mt-3 w-full"
          onClick={() => {
            logout();
            router.refresh();
          }}
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border bg-card/95 p-8 shadow-xl shadow-primary/10 backdrop-blur">
      <div className="inline-flex rounded-full border bg-background p-1">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setError(null);
          }}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            mode === "login" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("create");
            setError(null);
          }}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            mode === "create" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          Create Account
        </button>
      </div>

      <div className="mt-6 space-y-2">
        <h2 className="font-display text-3xl font-bold">
          {mode === "login" ? "Sign in to your account" : "Create your customer account"}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {mode === "login"
            ? "Return to your dashboard and keep shopping without losing your place. Admin access uses a separate credential."
            : "Save your details now so future customer tools and downloads have a clear home base."}
        </p>
      </div>

      {error && <p className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}

      {mode === "login" ? (
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={loginForm.email}
              onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={loginForm.password}
              onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
              required
            />
          </div>
          <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
            <KeyRound className="h-4 w-4" />
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Admin login: <span className="font-medium text-foreground">admin@gmail.com</span> /{" "}
            <span className="font-medium text-foreground">admin123</span>
          </p>
        </form>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={handleCreateAccount}>
          <div className="space-y-2">
            <Label htmlFor="create-name">Full name</Label>
            <Input
              id="create-name"
              autoComplete="name"
              placeholder="Your name"
              value={createForm.name}
              onChange={(event) => setCreateForm((current) => ({ ...current, name: event.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-email">Email</Label>
            <Input
              id="create-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={createForm.email}
              onChange={(event) => setCreateForm((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-password">Password</Label>
            <Input
              id="create-password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={createForm.password}
              onChange={(event) => setCreateForm((current) => ({ ...current, password: event.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-password-confirm">Confirm password</Label>
            <Input
              id="create-password-confirm"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={createForm.confirmPassword}
              onChange={(event) => setCreateForm((current) => ({ ...current, confirmPassword: event.target.value }))}
              required
            />
          </div>
          <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
            <UserPlus className="h-4 w-4" />
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default AuthLanding;
