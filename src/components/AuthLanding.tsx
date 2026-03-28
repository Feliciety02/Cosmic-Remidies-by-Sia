"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, KeyRound, Mail, UserPlus } from "lucide-react";
import GoogleMark from "@/components/GoogleMark";
import { useAuth } from "@/contexts/AuthContext";
import { authPanelId, buildAuthHref } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthMode = "login" | "create";

interface AuthLandingProps {
  initialMode?: AuthMode;
}

const modeContent: Record<AuthMode, { title: string; description: string }> = {
  login: {
    title: "Welcome back",
    description: "Sign in to access your cart, saved items, downloads, and account dashboard.",
  },
  create: {
    title: "Create account",
    description: "Set up your Cosmic Remedies account to save items, track purchases, and access your dashboard.",
  },
};

const authCardClassName =
  "scroll-mt-28 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.14)] sm:p-8";

const AuthLanding = ({ initialMode = "login" }: AuthLandingProps) => {
  const router = useRouter();
  const { user, isHydrated, login, createAccount, logout } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showCreateConfirmPassword, setShowCreateConfirmPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [createForm, setCreateForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState<string | null>(null);
  const loginEmailRef = useRef<HTMLInputElement>(null);
  const createNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialMode === "login" || initialMode === "create") {
      setMode(initialMode);
      setError(null);
    }
  }, [initialMode]);

  const routeToArea = (role: "customer" | "admin") => {
    router.push(role === "admin" ? "/admin" : "/account");
    router.refresh();
  };

  const setActiveMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setError(null);
    router.replace(buildAuthHref(nextMode), { scroll: false });
  };

  const focusFieldForMode = (nextMode: AuthMode) => {
    requestAnimationFrame(() => {
      if (nextMode === "login") {
        loginEmailRef.current?.focus();
        return;
      }

      createNameRef.current?.focus();
    });
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

    if (!createForm.name.trim()) {
      setError("Enter your full name to create the account.");
      return;
    }

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
      <div id={authPanelId} className={authCardClassName}>
        <div className="space-y-3">
          <div className="h-10 w-10 rounded-full bg-muted" />
          <div className="h-4 w-20 rounded-full bg-muted" />
          <div className="h-8 w-3/5 rounded-xl bg-muted" />
          <div className="h-4 w-4/5 rounded-full bg-muted" />
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
      <div id={authPanelId} className={authCardClassName}>
        <GoogleMark className="h-10 w-10" />
        <p className="mt-5 text-sm text-muted-foreground">{isAdmin ? "Admin session active" : "Signed in"}</p>
        <h2 className="mt-1 font-sans text-[2rem] font-medium tracking-tight text-slate-900">Welcome back, {user.name}</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {isAdmin
            ? "Open the dashboard to manage the platform, or return to the storefront view."
            : "Your account is active. Open your dashboard, revisit saved items, or continue exploring the collection."}
        </p>

        <div className="mt-6 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
          {user.email}
        </div>

        <div className="mt-6 grid gap-4 rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Signed in as</p>
              <p className="mt-2 text-sm font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Role</p>
              <p className="mt-2 text-sm font-medium">{isAdmin ? "Administrator" : "Customer"}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button onClick={() => routeToArea(user.role)} className="gap-2">
              {isAdmin ? "Open Admin" : "Open Account"} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline">
              <Link href={isAdmin ? "/" : "/shop"}>{isAdmin ? "View Storefront" : "Browse Guides"}</Link>
            </Button>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          className="mt-4 w-full"
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

  const activeContent = modeContent[mode];
  const PasswordToggleIcon = ({ visible }: { visible: boolean }) => (visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />);

  return (
    <div id={authPanelId} className={`${authCardClassName} mx-auto w-full max-w-md`}>
      <div className="space-y-2 text-center">
        <h2 className="font-display text-[2rem] font-bold leading-tight text-slate-900">{activeContent.title}</h2>
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-slate-500">{activeContent.description}</p>
      </div>

      {error ? (
        <p className="mt-5 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {mode === "login" ? (
        <form className="mt-7 space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-[15px] font-medium text-slate-700">
              Email
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                ref={loginEmailRef}
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="h-11 rounded-md border-slate-200 bg-slate-50 pl-11 pr-4 text-slate-700 placeholder:text-slate-400 focus-visible:ring-[#2f6b89]/30"
                value={loginForm.email}
                onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password" className="text-[15px] font-medium text-slate-700">
              Password
            </Label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="login-password"
                type={showLoginPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="********"
                className="h-11 rounded-md border-slate-200 bg-slate-50 pl-11 pr-11 text-slate-700 placeholder:text-slate-400 focus-visible:ring-[#2f6b89]/30"
                value={loginForm.password}
                onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                required
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                aria-label={showLoginPassword ? "Hide password" : "Show password"}
              >
                <PasswordToggleIcon visible={showLoginPassword} />
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="h-11 w-full rounded-md bg-[#2f6b89] text-base font-semibold text-white hover:bg-[#275b74]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
          <div className="flex items-center gap-3 pt-2">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            <GoogleMark className="h-5 w-5" />
            Continue with Google
          </button>
          <p className="pt-2 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="font-semibold text-[#2f6b89] transition-colors hover:text-[#275b74]"
              onClick={() => {
                setActiveMode("create");
                focusFieldForMode("create");
              }}
            >
              Sign up
            </button>
          </p>
        </form>
      ) : (
        <form className="mt-7 space-y-4" onSubmit={handleCreateAccount}>
          <div className="space-y-2">
            <Label htmlFor="create-name" className="text-[15px] font-medium text-slate-700">
              Full name
            </Label>
            <div className="relative">
              <UserPlus className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                ref={createNameRef}
                id="create-name"
                autoComplete="name"
                placeholder="Your full name"
                className="h-11 rounded-md border-slate-200 bg-slate-50 pl-11 pr-4 text-slate-700 placeholder:text-slate-400 focus-visible:ring-[#2f6b89]/30"
                value={createForm.name}
                onChange={(event) => setCreateForm((current) => ({ ...current, name: event.target.value }))}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-email" className="text-[15px] font-medium text-slate-700">
              Email
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="create-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="h-11 rounded-md border-slate-200 bg-slate-50 pl-11 pr-4 text-slate-700 placeholder:text-slate-400 focus-visible:ring-[#2f6b89]/30"
                value={createForm.email}
                onChange={(event) => setCreateForm((current) => ({ ...current, email: event.target.value }))}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-password" className="text-[15px] font-medium text-slate-700">
              Password
            </Label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="create-password"
                type={showCreatePassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="h-11 rounded-md border-slate-200 bg-slate-50 pl-11 pr-11 text-slate-700 placeholder:text-slate-400 focus-visible:ring-[#2f6b89]/30"
                value={createForm.password}
                onChange={(event) => setCreateForm((current) => ({ ...current, password: event.target.value }))}
                required
              />
              <button
                type="button"
                onClick={() => setShowCreatePassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                aria-label={showCreatePassword ? "Hide password" : "Show password"}
              >
                <PasswordToggleIcon visible={showCreatePassword} />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-password-confirm" className="text-[15px] font-medium text-slate-700">
              Confirm password
            </Label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="create-password-confirm"
                type={showCreateConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repeat your password"
                className="h-11 rounded-md border-slate-200 bg-slate-50 pl-11 pr-11 text-slate-700 placeholder:text-slate-400 focus-visible:ring-[#2f6b89]/30"
                value={createForm.confirmPassword}
                onChange={(event) => setCreateForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                required
              />
              <button
                type="button"
                onClick={() => setShowCreateConfirmPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                aria-label={showCreateConfirmPassword ? "Hide password" : "Show password"}
              >
                <PasswordToggleIcon visible={showCreateConfirmPassword} />
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="h-11 w-full rounded-md bg-[#2f6b89] text-base font-semibold text-white hover:bg-[#275b74]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create account"}
          </Button>
          <div className="flex items-center gap-3 pt-2">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            <GoogleMark className="h-5 w-5" />
            Sign up with Google
          </button>
          <p className="pt-2 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <button
              type="button"
              className="font-semibold text-[#2f6b89] transition-colors hover:text-[#275b74]"
              onClick={() => {
                setActiveMode("login");
                focusFieldForMode("login");
              }}
            >
              Sign in
            </button>
          </p>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
            Your account can use Gmail, Google Workspace, or any standard email address.
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthLanding;
