"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LeadCaptureFormProps {
  source: string;
  includeFirstName?: boolean;
  requireConsent?: boolean;
  layout?: "stacked" | "inline";
  submitLabel: string;
  successMessage: string;
  className?: string;
}

const LeadCaptureForm = ({
  source,
  includeFirstName = false,
  requireConsent = false,
  layout = "stacked",
  submitLabel,
  successMessage,
  className,
}: LeadCaptureFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const firstName = data.get("firstName");
    const email = data.get("email");
    const consent = data.get("consent");

    if (includeFirstName && (typeof firstName !== "string" || !firstName.trim())) {
      toast.error("Add your first name to continue.");
      return;
    }

    if (typeof email !== "string" || !email.trim()) {
      toast.error("Enter an email address to continue.");
      return;
    }

    if (requireConsent && consent !== "yes") {
      toast.error("Please confirm that you'd like to receive the guide and follow-up emails.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source,
          firstName: includeFirstName && typeof firstName === "string" ? firstName : undefined,
          email,
          consent: requireConsent ? true : consent === "yes",
        }),
      });

      if (!response.ok) {
        throw new Error("Lead capture failed");
      }

      toast.success(successMessage);
      form.reset();
    } catch {
      toast.error("We couldn't save your request right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={className ?? (layout === "inline" ? "space-y-3" : "mb-6 space-y-4")} onSubmit={handleSubmit}>
      <div className={layout === "inline" ? "flex flex-col gap-3 sm:flex-row" : "space-y-4"}>
        {includeFirstName ? (
          <Input name="firstName" placeholder="First name" className="h-12" autoComplete="given-name" required />
        ) : null}
        <Input
          name="email"
          placeholder={layout === "inline" ? "Enter your email" : "Email address"}
          type="email"
          className={layout === "inline" ? "h-12 flex-1" : "h-12"}
          autoComplete="email"
          required
        />
        <Button
          type="submit"
          size="lg"
          className={layout === "inline" ? "h-12 shrink-0 px-6 text-base" : "w-full text-base"}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : submitLabel}
        </Button>
      </div>

      {requireConsent ? (
        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <input
            name="consent"
            type="checkbox"
            value="yes"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary"
            required
          />
          <span>I agree to receive the free guide and follow-up emails about related products and offers.</span>
        </label>
      ) : null}

      <p className={layout === "inline" ? "text-xs text-stone-400" : "text-center text-xs text-muted-foreground"}>
        By requesting the guide, you agree to our{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-stone-600">
          Privacy Policy
        </Link>
        . Unsubscribe anytime.
      </p>
    </form>
  );
};

export default LeadCaptureForm;
