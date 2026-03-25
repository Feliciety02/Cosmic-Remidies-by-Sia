"use client";

import type { FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LeadMagnetForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = data.get("email");

    if (typeof email !== "string" || !email.trim()) {
      toast.error("Add your email address to receive the free guide.");
      return;
    }

    toast.success("You are on the list. The starter guide request has been captured.");
    form.reset();
  };

  return (
    <form className="mb-6 space-y-3" onSubmit={handleSubmit}>
      <Input name="name" placeholder="Your name" className="h-12" />
      <Input name="email" placeholder="Your best email" type="email" className="h-12" />
      <Button type="submit" size="lg" className="w-full text-base">
        Get My Free Guide
      </Button>
    </form>
  );
};

export default LeadMagnetForm;
