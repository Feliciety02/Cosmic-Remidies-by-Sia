"use client";

import type { FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EmailCaptureForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = data.get("email");

    if (typeof email !== "string" || !email.trim()) {
      toast.error("Enter an email address to request the starter guide.");
      return;
    }

    toast.success("Starter guide request received.");
    form.reset();
  };

  return (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
      <Input name="email" placeholder="Enter your email" type="email" className="flex-1" />
      <Button type="submit" className="shrink-0">
        Get Free Guide
      </Button>
    </form>
  );
};

export default EmailCaptureForm;
