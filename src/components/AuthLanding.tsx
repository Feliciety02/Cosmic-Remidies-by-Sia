"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, KeyRound, Mail, ShieldCheck, UserPlus } from "lucide-react";
import GoogleMark from "@/components/GoogleMark";
import { useAuth } from "@/contexts/AuthContext";
import { authPanelId, buildAuthHref } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthMode = "login" | "create";

interface AuthLandingProps {
  initialMode?: AuthMode;
  initialError?: string;
}

const modeContent: Record<AuthMode, { title: string; description: string }> = {
  login: {
    title: "Sign in",
    description: "Customers can use email/password or Google. Admins still use the dedicated credentials form.",
  },
  create: {
    title: "Create account",
    description: "Create a customer account now and keep your cart, orders, and library flow moving.",
  },
};

const authCardClassName =
  "scroll-mt-28 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.14)] sm:p-8";

const authErrorMessages: Record<string, string> = {
  AccessDenied: "Access was denied. If you cancelled Google sign-in or used an unverified Google account, try again.",
  OAuthAccountNotLinked: "This email is already linked to a different sign-in method.",
  OAuthCallback: "Google sign-in could not be completed. Check the OAuth redirect URI and client credentials.",
  OAuthSignin: "Google sign-in could not be started. Check the OAuth client configuration.",
  Configuration: "Authentication is not configured correctly. Check your auth environment variables.",
  Default: "Authentication could not be completed. Please try again.",
};

const AuthLanding = ({ initialMode = "login", initialError }: AuthLandingProps) => {
  const router = useRouter();
  const { user, isHydrated, loginCustomer, loginAdmin, loginWithGoogle, createAccount, logout } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomerPassword, setShowCustomerPassword] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [customerLoginForm, setCustomerLoginForm] = useState({ email: "", password: "" });
  const [createForm, setCreateForm] = useState({ name: "", email: "", password: "" });
  const [adminForm, setAdminForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isGoogleAvailable, setIsGoogleAvailable] = useState(false);
  const customerEmailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialMode === "login" || initialMode === "create") {
      setMode(initialMode);
      setError(initialError ? authErrorMessages[initialError] ?? authErrorMessages.Default : null);
    }
  }, [initialError, initialMode]);

  useEffect(() => {
    let active = true;

    const loadProviders = async () => {
      try {
        const providers = await getProviders();

        if (active) {
          setIsGoogleAvailable(Boolean(providers?.google));
        }
      } catch {
        if (active) {
          setIsGoogleAvailable(false);
        }
      }
    };

    loadProviders();

    return () => {
      active = false;
    };
  }, []);

  const routeToArea = (role: "customer" | "admin") => {
    router.push(role === "admin" ? "/admin" : "/account");
    router.refresh();
  };

  const setActiveMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setError(null);
    router.replace(buildAuthHref(nextMode), { scroll: false });
  };

  const focusCustomerField = () => {
    requestAnimationFrame(() => {
      customerEmailRef.current?.focus();
    });
  };

  const handleCustomerLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const loggedInUser = await loginCustomer(customerLoginForm);

      if (!loggedInUser) {
        setError("We couldn't match that customer email and password.");
        return;
      }

      routeToArea(loggedInUser.role);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const loggedInUser = await loginAdmin(adminForm);

      if (!loggedInUser) {
        setError("The admin credentials you entered are incorrect.");
        return;
      }

      routeToArea(loggedInUser.role);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const nextUser = await createAccount(createForm);

      if (!nextUser) {
        setError("We couldn't create that account. Try a different email or check the form.");
        return;
      }

      routeToArea(nextUser.role);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      if (!isGoogleAvailable) {
        setError("Google sign-in is not configured yet. Use customer email/password for now or add the OAuth keys.");
        return;
      }

      await loginWithGoogle("/account");
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
            : "Your customer account is active. Open your dashboard, revisit your library, or keep exploring the shop."}
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
          onClick={async () => {
            await logout();
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
        <div className="mt-7 space-y-4">
          <form className="space-y-4" onSubmit={handleCustomerLogin}>
            <div className="space-y-2">
              <Label htmlFor="customer-login-email" className="text-[15px] font-medium text-slate-700">
                Customer email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  ref={customerEmailRef}
                  id="customer-login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-11 rounded-md border-slate-200 bg-slate-50 pl-11 pr-4 text-slate-700 placeholder:text-slate-400 focus-visible:ring-[#2f6b89]/30"
                  value={customerLoginForm.email}
                  onChange={(event) => setCustomerLoginForm((current) => ({ ...current, email: event.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-login-password" className="text-[15px] font-medium text-slate-700">
                Password
              </Label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="customer-login-password"
                  type={showCustomerPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-11 rounded-md border-slate-200 bg-slate-50 pl-11 pr-11 text-slate-700 placeholder:text-slate-400 focus-visible:ring-[#2f6b89]/30"
                  value={customerLoginForm.password}
                  onChange={(event) => setCustomerLoginForm((current) => ({ ...current, password: event.target.value }))}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCustomerPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                  aria-label={showCustomerPassword ? "Hide password" : "Show password"}
                >
                  <PasswordToggleIcon visible={showCustomerPassword} />
                </button>
              </div>
            </div>
            <Button type="submit" className="h-11 w-full rounded-md bg-[#2f6b89] text-base font-semibold text-white hover:bg-[#275b74]" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In to Your Account"}
            </Button>
          </form>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <GoogleMark className="h-5 w-5" />
            {isGoogleAvailable ? "Continue with Google" : "Google sign-in not configured"}
          </button>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
            Customer accounts can now use email/password locally. Google remains optional when configured.
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">admin only</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form className="space-y-4" onSubmit={handleAdminLogin}>
            <div className="space-y-2">
              <Label htmlFor="admin-login-email" className="text-[15px] font-medium text-slate-700">
                Admin email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="admin-login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@example.com"
                  className="h-11 rounded-md border-slate-200 bg-slate-50 pl-11 pr-4 text-slate-700 placeholder:text-slate-400 focus-visible:ring-[#2f6b89]/30"
                  value={adminForm.email}
                  onChange={(event) => setAdminForm((current) => ({ ...current, email: event.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-login-password" className="text-[15px] font-medium text-slate-700">
                Admin password
              </Label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="admin-login-password"
                  type={showAdminPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your admin password"
                  className="h-11 rounded-md border-slate-200 bg-slate-50 pl-11 pr-11 text-slate-700 placeholder:text-slate-400 focus-visible:ring-[#2f6b89]/30"
                  value={adminForm.password}
                  onChange={(event) => setAdminForm((current) => ({ ...current, password: event.target.value }))}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                  aria-label={showAdminPassword ? "Hide password" : "Show password"}
                >
                  <PasswordToggleIcon visible={showAdminPassword} />
                </button>
              </div>
            </div>
            <Button type="submit" variant="outline" className="h-11 w-full rounded-md border-slate-300" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In as Admin"}
            </Button>
          </form>

          <p className="pt-2 text-center text-sm text-slate-500">
            Need a customer account?{" "}
            <button
              type="button"
              className="font-semibold text-[#2f6b89] transition-colors hover:text-[#275b74]"
              onClick={() => setActiveMode("create")}
            >
              Create one here
            </button>
          </p>
        </div>
      ) : (
        <div className="mt-7 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 rounded-full bg-[#2f6b89]/10 p-2 text-[#2f6b89]">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">Customer onboarding is available now</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Create an email/password account in the browser and move straight into your customer dashboard. Google
                  sign-in still works when OAuth is configured.
                </p>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleCreateAccount}>
            <div className="space-y-2">
              <Label htmlFor="create-name" className="text-[15px] font-medium text-slate-700">
                Full name
              </Label>
              <Input
                id="create-name"
                autoComplete="name"
                placeholder="Your name"
                className="h-11 rounded-md border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-400 focus-visible:ring-[#2f6b89]/30"
                value={createForm.name}
                onChange={(event) => setCreateForm((current) => ({ ...current, name: event.target.value }))}
                required
              />
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
                  placeholder="Create a password"
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
            <Button type="submit" className="h-11 w-full gap-2 rounded-md bg-[#2f6b89] text-base font-semibold text-white hover:bg-[#275b74]" disabled={isSubmitting}>
              <UserPlus className="h-4 w-4" />
              {isSubmitting ? "Creating account..." : "Create Customer Account"}
            </Button>
          </form>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <GoogleMark className="h-5 w-5" />
            {isGoogleAvailable ? "Create with Google" : "Google sign-in not configured"}
          </button>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
            Customer accounts are stored locally in this environment so you can complete signup and onboarding immediately.
          </div>

          <p className="pt-2 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <button
              type="button"
              className="font-semibold text-[#2f6b89] transition-colors hover:text-[#275b74]"
              onClick={() => {
                setActiveMode("login");
                focusCustomerField();
              }}
            >
              Sign in
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthLanding;
