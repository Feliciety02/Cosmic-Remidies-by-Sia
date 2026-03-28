"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LeadMagnetForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const firstName = data.get("firstName");
    const email = data.get("email");
    const consent = data.get("consent");

    if (typeof firstName !== "string" || !firstName.trim() || typeof email !== "string" || !email.trim()) {
      toast.error("Add your first name and email address to receive the free guide.");
      return;
    }

    if (consent !== "yes") {
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
          source: "lead-magnet-page",
          firstName,
          email,
          consent: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Lead capture failed");
      }

      toast.success("Request received. We'll send the starter guide to your inbox.");
      form.reset();
    } catch {
      toast.error("We couldn't save your request right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mb-6 space-y-4" onSubmit={handleSubmit}>
      <Input name="firstName" placeholder="First name" className="h-12" autoComplete="given-name" required />
      <Input name="email" placeholder="Email address" type="email" className="h-12" autoComplete="email" required />
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
      <Button type="submit" size="lg" className="w-full text-base" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Me the Free Guide"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">We respect your privacy. Unsubscribe anytime.</p>
    </form>
  );
};

export default LeadMagnetForm;
