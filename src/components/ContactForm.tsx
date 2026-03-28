"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const subject = data.get("subject");
    const message = data.get("message");

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof subject !== "string" ||
      !subject.trim() ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      toast.error("Complete your name, email, subject, and message before sending.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        throw new Error("Contact submission failed");
      }

      toast.success("Message received. We will reply within 24 hours.");
      form.reset();
    } catch {
      toast.error("We couldn't send your message right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4 rounded-xl border bg-card p-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input name="name" placeholder="Your name" autoComplete="name" required />
        <Input name="email" placeholder="Your email" type="email" autoComplete="email" required />
      </div>
      <Input name="subject" placeholder="Subject" required />
      <Textarea name="message" placeholder="Your message..." rows={5} required />
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;
