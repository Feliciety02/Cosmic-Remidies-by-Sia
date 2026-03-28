"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EmailCaptureForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = data.get("email");

    if (typeof email !== "string" || !email.trim()) {
      toast.error("Enter an email address to request the starter guide.");
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
          source: "homepage-strip",
          email,
          consent: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Lead capture failed");
      }

      toast.success("Starter guide request received.");
      form.reset();
    } catch {
      toast.error("We couldn't save your request right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <Input name="email" placeholder="Enter your email" type="email" className="flex-1" autoComplete="email" required />
        <Button type="submit" className="shrink-0" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Get Free Guide"}
        </Button>
      </form>
      <p className="text-xs text-stone-400">
        By requesting the guide, you agree to receive relevant emails. Review our{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-stone-600">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default EmailCaptureForm;
