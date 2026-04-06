"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, KeyRound, Mail, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import GoogleMark from "@/components/GoogleMark";
import { useAuth } from "@/contexts/AuthContext";
import { hardcodedCredentialAccounts, type HardcodedCredentialAccount } from "@/lib/demo-credentials";
import { authPanelId, buildAuthHref, siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthMode = "login" | "create";

interface AuthLandingProps {
  initialMode?: AuthMode;
  initialError?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
}

const modeContent: Record<AuthMode, { title: string; description: string }> = {
  login: {
    title: "Sign in",
    description: "Use your Gmail or email plus password to sign in.",
  },
  create: {
    title: "Create account",
    description: "Create a customer account now and keep your cart, orders, and library flow moving.",
  },
};

const authCardClassName =
  "scroll-mt-28 rounded-[28px] border border-amber-200/70 bg-[rgba(255,251,245,0.96)] p-6 shadow-[0_28px_80px_rgba(93,66,33,0.14)] sm:p-8";

const authErrorMessages: Record<string, string> = {
  AccessDenied: "Access was denied. If you cancelled Google sign-in or used an unverified Google account, try again.",
  OAuthAccountNotLinked: "This email is already linked to a different sign-in method.",
  OAuthCallback: "Google sign-in could not be completed. Check the OAuth redirect URI and client credentials.",
  OAuthSignin: "Google sign-in could not be started. Check the OAuth client configuration.",
  Configuration: "Authentication is not configured correctly. Check your auth environment variables.",
  Default: "Authentication could not be completed. Please try again.",
};

const demoCustomerAccount = hardcodedCredentialAccounts.find((account) => account.role === "customer")!;
const demoAdminAccount = hardcodedCredentialAccounts.find((account) => account.role === "admin")!;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthLanding = ({ initialMode = "login", initialError }: AuthLandingProps) => {
  const router = useRouter();
  const { user, isHydrated, loginCustomer, loginWithGoogle, createAccount, logout } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomerPassword, setShowCustomerPassword] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [customerLoginForm, setCustomerLoginForm] = useState({ email: "", password: "" });
  const [createForm, setCreateForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loginErrors, setLoginErrors] = useState<FormErrors>({});
  const [createErrors, setCreateErrors] = useState<FormErrors>({});
  const [isGoogleAvailable, setIsGoogleAvailable] = useState(false);
  const [quickAccessRole, setQuickAccessRole] = useState<HardcodedCredentialAccount["role"] | null>(null);
  const customerEmailRef = useRef<HTMLInputElement>(null);
  const customerPasswordRef = useRef<HTMLInputElement>(null);
  const createNameRef = useRef<HTMLInputElement>(null);
  const createEmailRef = useRef<HTMLInputElement>(null);
  const createPasswordRef = useRef<HTMLInputElement>(null);
  const [capsLockOn, setCapsLockOn] = useState<null | "login" | "create">(null);

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
    setLoginErrors({});
    setCreateErrors({});
    router.replace(buildAuthHref(nextMode), { scroll: false });
  };

  const focusCustomerField = () => {
    requestAnimationFrame(() => {
      customerEmailRef.current?.focus();
    });
  };

  const applyDemoLogin = (account: HardcodedCredentialAccount) => {
    setMode("login");
    setError(null);
    setLoginErrors({});
    setCustomerLoginForm({ email: account.email, password: account.password });
    router.replace(buildAuthHref("login"), { scroll: false });
    focusCustomerField();
  };

  const signInDemoAccount = async (account: HardcodedCredentialAccount) => {
    applyDemoLogin(account);
    setQuickAccessRole(account.role);
    setIsSubmitting(true);

    try {
      const loggedInUser = await loginCustomer({
        email: account.email,
        password: account.password,
      });

      if (!loggedInUser) {
        setError("We couldn't start that demo account.");
        return;
      }

      routeToArea(loggedInUser.role);
    } finally {
      setIsSubmitting(false);
      setQuickAccessRole(null);
    }
  };

  const validateLogin = () => {
    const nextErrors: FormErrors = {};

    if (!customerLoginForm.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(customerLoginForm.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!customerLoginForm.password.trim()) {
      nextErrors.password = "Password is required.";
    }

    setLoginErrors(nextErrors);
    requestAnimationFrame(() => {
      if (nextErrors.email) {
        customerEmailRef.current?.focus();
      } else if (nextErrors.password) {
        customerPasswordRef.current?.focus();
      }
    });
    return Object.keys(nextErrors).length === 0;
  };

  const validateCreate = () => {
    const nextErrors: FormErrors = {};

    if (!createForm.name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!createForm.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(createForm.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!createForm.password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (createForm.password.trim().length < 6) {
      nextErrors.password = "Use at least 6 characters.";
    }

    setCreateErrors(nextErrors);
    requestAnimationFrame(() => {
      if (nextErrors.name) {
        createNameRef.current?.focus();
      } else if (nextErrors.email) {
        createEmailRef.current?.focus();
      } else if (nextErrors.password) {
        createPasswordRef.current?.focus();
      }
    });
    return Object.keys(nextErrors).length === 0;
  };

  const handleCapsLock = (event: KeyboardEvent<HTMLInputElement>, form: "login" | "create") => {
    setCapsLockOn(event.getModifierState("CapsLock") ? form : null);
  };

  const handleCustomerLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setQuickAccessRole(null);

    if (!validateLogin()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const loggedInUser = await loginCustomer(customerLoginForm);

      if (!loggedInUser) {
        setError("We couldn't match that email and password.");
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
    setQuickAccessRole(null);

    if (!validateCreate()) {
      return;
    }

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
        <div className={`rounded-[26px] border p-5 ${isAdmin ? "border-stone-300 bg-stone-50" : "border-amber-200 bg-amber-50/70"}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isAdmin ? "bg-stone-900 text-white" : "bg-white text-amber-800"}`}>
                <GoogleMark className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {isAdmin ? "Administrator" : "Customer account"}
                </p>
                <h2 className="mt-1 font-sans text-[1.9rem] font-medium tracking-tight text-stone-900">Welcome back, {user.name}</h2>
              </div>
            </div>
            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${isAdmin ? "bg-stone-200 text-stone-800" : "bg-amber-100 text-amber-800"}`}>
              {isAdmin ? "Dashboard" : "Active"}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {isAdmin
              ? "Your admin session is ready. Open the dashboard to manage content, products, and store operations."
              : "Your customer session is active. Open your account, revisit your library, or continue browsing the shop."}
          </p>

          <div className="mt-5 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-stone-700">
            {user.email}
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-3xl border border-amber-200 bg-amber-50/60 p-5">
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
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-full border border-amber-200 bg-white/80 p-1">
        <button
          type="button"
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            mode === "login" ? "bg-[linear-gradient(135deg,#caa16f_0%,#8b6440_100%)] text-[#fff9f0]" : "text-stone-600"
          }`}
          onClick={() => {
            setActiveMode("login");
            focusCustomerField();
          }}
        >
          Sign in
        </button>
        <button
          type="button"
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            mode === "create" ? "bg-[linear-gradient(135deg,#caa16f_0%,#8b6440_100%)] text-[#fff9f0]" : "text-stone-600"
          }`}
          onClick={() => setActiveMode("create")}
        >
          Create account
        </button>
      </div>

      <div className="space-y-2 text-center">
        <h2 className="font-display text-[2rem] font-bold leading-tight text-stone-900">{activeContent.title}</h2>
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-stone-600">{activeContent.description}</p>
      </div>

      {error ? (
        <p className="mt-5 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {mode === "login" ? (
        <div className="mt-7 space-y-4">
          <div className="rounded-3xl border border-amber-200 bg-white/85 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
              <Sparkles className="h-4 w-4 text-amber-700" />
              Quick access
            </div>
            <div className="mt-3 grid gap-3">
              <button
                type="button"
                onClick={() => signInDemoAccount(demoCustomerAccount)}
                disabled={isSubmitting}
                className="rounded-2xl border border-amber-200 bg-[#fffdf8] px-4 py-3 text-left transition-colors hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Demo customer</p>
                    <p className="text-xs text-stone-500">
                      {quickAccessRole === "customer" && isSubmitting ? "Signing in..." : demoCustomerAccount.email}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-800">
                    Account
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => signInDemoAccount(demoAdminAccount)}
                disabled={isSubmitting}
                className="rounded-2xl border border-amber-200 bg-[#fffdf8] px-4 py-3 text-left transition-colors hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Admin access</p>
                    <p className="text-xs text-stone-500">
                      {quickAccessRole === "admin" && isSubmitting ? "Opening dashboard..." : demoAdminAccount.email}
                    </p>
                  </div>
                  <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-700">
                    Dashboard
                  </span>
                </div>
              </button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleCustomerLogin}>
            <div className="space-y-2">
              <Label htmlFor="customer-login-email" className="text-[15px] font-medium text-stone-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <Input
                  ref={customerEmailRef}
                  id="customer-login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`h-11 rounded-md bg-white pl-11 pr-4 text-stone-700 placeholder:text-stone-400 focus-visible:ring-amber-400/30 ${
                    loginErrors.email ? "border-destructive/50" : "border-amber-200"
                  }`}
                  value={customerLoginForm.email}
                  onChange={(event) => {
                    setCustomerLoginForm((current) => ({ ...current, email: event.target.value }));
                    setLoginErrors((current) => ({ ...current, email: undefined }));
                  }}
                  required
                />
              </div>
              {loginErrors.email ? <p className="text-sm text-destructive">{loginErrors.email}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-login-password" className="text-[15px] font-medium text-stone-700">
                Password
              </Label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <Input
                  ref={customerPasswordRef}
                  id="customer-login-password"
                  type={showCustomerPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`h-11 rounded-md bg-white pl-11 pr-11 text-stone-700 placeholder:text-stone-400 focus-visible:ring-amber-400/30 ${
                    loginErrors.password ? "border-destructive/50" : "border-amber-200"
                  }`}
                  value={customerLoginForm.password}
                  onChange={(event) => {
                    setCustomerLoginForm((current) => ({ ...current, password: event.target.value }));
                    setLoginErrors((current) => ({ ...current, password: undefined }));
                  }}
                  onKeyUp={(event) => handleCapsLock(event, "login")}
                  onKeyDown={(event) => handleCapsLock(event, "login")}
                  onBlur={() => setCapsLockOn((current) => (current === "login" ? null : current))}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCustomerPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 transition-colors hover:text-stone-600"
                  aria-label={showCustomerPassword ? "Hide password" : "Show password"}
                >
                  <PasswordToggleIcon visible={showCustomerPassword} />
                </button>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  {loginErrors.password ? <p className="text-sm text-destructive">{loginErrors.password}</p> : null}
                  {capsLockOn === "login" ? <p className="text-sm text-amber-800">Caps Lock is on.</p> : null}
                </div>
                <a
                  href={`mailto:${siteConfig.supportEmail}?subject=Password%20Reset%20Help`}
                  className="text-sm font-medium text-amber-800 underline-offset-2 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <Button type="submit" className="h-11 w-full rounded-md bg-[linear-gradient(135deg,#caa16f_0%,#8b6440_100%)] text-base font-semibold text-[#fff9f0] hover:brightness-105" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In to Your Account"}
            </Button>
          </form>

          {isGoogleAvailable ? (
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-amber-200 bg-amber-50/70 px-4 text-sm font-medium text-stone-700 transition-colors hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <GoogleMark className="h-5 w-5" />
              Continue with Google
            </button>
          ) : null}

          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-xs text-stone-500">
            Use any saved account, or tap one of the quick-access options above.
          </div>

          <p className="pt-2 text-center text-sm text-stone-500">
            Need a customer account?{" "}
            <button
              type="button"
              className="font-semibold text-amber-800 transition-colors hover:text-amber-900"
              onClick={() => setActiveMode("create")}
            >
              Create one here
            </button>
          </p>
        </div>
      ) : (
        <div className="mt-7 space-y-4">
          <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 rounded-full bg-amber-200/40 p-2 text-amber-800">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-stone-900">Customer onboarding is available now</h3>
                <p className="text-sm leading-relaxed text-stone-600">
                  Create an email/password account in the browser and move straight into your customer dashboard. Google
                  sign-in still works when OAuth is configured.
                </p>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleCreateAccount}>
            <div className="space-y-2">
              <Label htmlFor="create-name" className="text-[15px] font-medium text-stone-700">
                Full name
              </Label>
              <Input
                ref={createNameRef}
                id="create-name"
                autoComplete="name"
                placeholder="Your name"
                className={`h-11 rounded-md bg-white text-stone-700 placeholder:text-stone-400 focus-visible:ring-amber-400/30 ${
                  createErrors.name ? "border-destructive/50" : "border-amber-200"
                }`}
                value={createForm.name}
                onChange={(event) => {
                  setCreateForm((current) => ({ ...current, name: event.target.value }));
                  setCreateErrors((current) => ({ ...current, name: undefined }));
                }}
                required
              />
              {createErrors.name ? <p className="text-sm text-destructive">{createErrors.name}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-email" className="text-[15px] font-medium text-stone-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <Input
                  ref={createEmailRef}
                  id="create-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`h-11 rounded-md bg-white pl-11 pr-4 text-stone-700 placeholder:text-stone-400 focus-visible:ring-amber-400/30 ${
                    createErrors.email ? "border-destructive/50" : "border-amber-200"
                  }`}
                  value={createForm.email}
                  onChange={(event) => {
                    setCreateForm((current) => ({ ...current, email: event.target.value }));
                    setCreateErrors((current) => ({ ...current, email: undefined }));
                  }}
                  required
                />
              </div>
              {createErrors.email ? <p className="text-sm text-destructive">{createErrors.email}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-password" className="text-[15px] font-medium text-stone-700">
                Password
              </Label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <Input
                  ref={createPasswordRef}
                  id="create-password"
                  type={showCreatePassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  className={`h-11 rounded-md bg-white pl-11 pr-11 text-stone-700 placeholder:text-stone-400 focus-visible:ring-amber-400/30 ${
                    createErrors.password ? "border-destructive/50" : "border-amber-200"
                  }`}
                  value={createForm.password}
                  onChange={(event) => {
                    setCreateForm((current) => ({ ...current, password: event.target.value }));
                    setCreateErrors((current) => ({ ...current, password: undefined }));
                  }}
                  onKeyUp={(event) => handleCapsLock(event, "create")}
                  onKeyDown={(event) => handleCapsLock(event, "create")}
                  onBlur={() => setCapsLockOn((current) => (current === "create" ? null : current))}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCreatePassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 transition-colors hover:text-stone-600"
                  aria-label={showCreatePassword ? "Hide password" : "Show password"}
                >
                  <PasswordToggleIcon visible={showCreatePassword} />
                </button>
              </div>
              <div className="space-y-1">
                {createErrors.password ? <p className="text-sm text-destructive">{createErrors.password}</p> : null}
                {capsLockOn === "create" ? <p className="text-sm text-amber-800">Caps Lock is on.</p> : null}
              </div>
            </div>
            <Button type="submit" className="h-11 w-full gap-2 rounded-md bg-[linear-gradient(135deg,#caa16f_0%,#8b6440_100%)] text-base font-semibold text-[#fff9f0] hover:brightness-105" disabled={isSubmitting}>
              <UserPlus className="h-4 w-4" />
              {isSubmitting ? "Creating account..." : "Create Customer Account"}
            </Button>
          </form>

          {isGoogleAvailable ? (
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-amber-200 bg-amber-50/70 px-4 text-sm font-medium text-stone-700 transition-colors hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <GoogleMark className="h-5 w-5" />
              Create with Google
            </button>
          ) : null}

          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-xs text-stone-500">
            Customer accounts are stored locally in this environment so you can complete signup and onboarding immediately.
          </div>

          <p className="pt-2 text-center text-sm text-stone-500">
            Already have an account?{" "}
            <button
              type="button"
              className="font-semibold text-amber-800 transition-colors hover:text-amber-900"
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
