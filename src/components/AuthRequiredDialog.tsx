"use client";

import Link from "next/link";
import { ArrowRight, KeyRound, Mail, ShieldAlert, UserPlus } from "lucide-react";
import GoogleMark from "@/components/GoogleMark";
import { buildAuthHref } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthRequiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: "guest" | "admin";
}

const dialogCopy = {
  guest: {
    title: "Login required to add items",
    description: "Create an account to save and access your items before adding guides to your cart.",
  },
  admin: {
    title: "Customer account required",
    description: "Admin sessions do not use the storefront cart. Sign in with a customer account to save items.",
  },
} as const;

const AuthRequiredDialog = ({ open, onOpenChange, variant = "guest" }: AuthRequiredDialogProps) => {
  const copy = dialogCopy[variant];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-[32px] border-border/70 p-0 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
        <div className="rounded-[32px] bg-white/95 p-6 backdrop-blur-xl">
          <DialogHeader className="text-left">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <ShieldAlert className="h-3.5 w-3.5" />
              Account-first access
            </span>
            <DialogTitle className="pt-3 font-display text-2xl">{copy.title}</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">{copy.description}</DialogDescription>
          </DialogHeader>

          <Link
            href={buildAuthHref("login")}
            onClick={() => onOpenChange(false)}
            className="mt-5 flex w-full items-center justify-between rounded-[22px] border border-border/70 bg-background px-4 py-4 text-left transition-colors hover:border-primary/30 hover:bg-teal-light/10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card">
                <GoogleMark className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Use Gmail or your email</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Continue with a Gmail, Google Workspace, or standard email account.
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </Link>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border/70" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">choose a path</span>
            <div className="h-px flex-1 bg-border/70" />
          </div>

          <DialogFooter className="mt-6 flex-col gap-3 sm:flex-col sm:space-x-0">
            <Button asChild className="h-12 w-full gap-2 rounded-2xl text-base">
              <Link href={buildAuthHref("login")} onClick={() => onOpenChange(false)}>
                Login <KeyRound className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 w-full gap-2 rounded-2xl text-base">
              <Link href={buildAuthHref("create")} onClick={() => onOpenChange(false)}>
                Sign Up <UserPlus className="h-4 w-4" />
              </Link>
            </Button>
          </DialogFooter>

          <div className="mt-4 rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-xs text-muted-foreground">
            <div className="flex items-start gap-2">
              <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <p>Create an account to save and access your items before using the cart.</p>
            </div>
          </div>

          <Button type="button" variant="ghost" className="mt-3 w-full gap-2" onClick={() => onOpenChange(false)}>
            Keep Browsing <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthRequiredDialog;
