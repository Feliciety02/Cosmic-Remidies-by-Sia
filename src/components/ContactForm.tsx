"use client";

import type { FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = data.get("email");
    const message = data.get("message");

    if (typeof email !== "string" || !email.trim() || typeof message !== "string" || !message.trim()) {
      toast.error("Add a valid email address and message before sending.");
      return;
    }

    toast.success("Message received. We will reply within 24 hours.");
    form.reset();
  };

  return (
    <form className="space-y-4 rounded-xl border bg-card p-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input name="name" placeholder="Your name" />
        <Input name="email" placeholder="Your email" type="email" />
      </div>
      <Input name="subject" placeholder="Subject" />
      <Textarea name="message" placeholder="Your message..." rows={5} />
      <Button type="submit" size="lg" className="w-full">
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
