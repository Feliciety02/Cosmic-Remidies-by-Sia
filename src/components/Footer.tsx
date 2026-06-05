"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.svg";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "All Guides", href: "/shop" },
      { label: "Free Guide", href: "/free-guide" },
      { label: "Account", href: "/account" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Cookie Settings", href: "/cookie-settings" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms-of-service" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Do Not Sell / Share", href: "/do-not-sell" },
    ],
  },
];

const footerHighlights = [
  { label: "Instant PDF delivery", icon: Sparkles },
  { label: "30-day guarantee", icon: ShieldCheck },
  { label: `Replies ${siteConfig.responseTime}`, icon: Clock },
];

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = data.get("email");

    if (typeof email !== "string" || !email.trim()) {
      toast.error("Enter an email address to subscribe.");
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
          source: "footer-newsletter",
          email,
          consent: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Lead capture failed");
      }

      toast.success("Subscription received. Watch your inbox for updates and new guide releases.");
      form.reset();
    } catch {
      toast.error("We couldn't save your subscription right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="mt-16 border-t border-stone-800/10 bg-[linear-gradient(180deg,rgba(82,56,33,0.98),rgba(48,32,20,1))] text-primary-foreground">
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="grid gap-10 border-b border-white/10 pb-9 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14">
          <div className="max-w-2xl">
            <Image src={logo} alt={siteConfig.name} className="h-12 w-auto brightness-200 sm:h-14" />
            <p className="mt-5 max-w-xl text-lg font-medium leading-snug text-primary-foreground">
              Spiritual guides, Vedic remedies, and practical rituals delivered instantly for modern seekers.
            </p>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
              {footerHighlights.map((item) => (
                <div key={item.label} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-2 text-xs font-medium text-primary-foreground/80">
                  <item.icon className="h-3.5 w-3.5 shrink-0 text-[#d2ad7b]" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <form className="mt-6 max-w-xl rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-4 shadow-[0_18px_42px_rgba(28,18,11,0.18)]" onSubmit={handleSubmit}>
              <p className="mb-3 text-sm font-semibold text-primary-foreground">Get product updates and seasonal guidance</p>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  autoComplete="email"
                  required
                  className="h-12 min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-white/25"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 rounded-full bg-[linear-gradient(135deg,#d2ad7b_0%,#a17245_100%)] px-6 text-sm font-semibold text-[#fff9f0] shadow-[0_10px_24px_rgba(94,66,34,0.22)] hover:brightness-105"
                >
                  {isSubmitting ? "Sending..." : "Subscribe"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-3 max-w-lg text-xs leading-5 text-primary-foreground/60">
                By subscribing you agree to our{" "}
                <Link href="/privacy-policy" className="underline underline-offset-4 transition-colors hover:text-primary-foreground">
                  Privacy Policy
                </Link>{" "}
                and consent to receive updates from {siteConfig.name}.
              </p>
            </form>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4 lg:pt-2">
            {footerGroups.map((group) => (
              <div key={group.title} className="min-w-0">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/90">{group.title}</h4>
                <div className="space-y-2.5">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-sm text-primary-foreground/60 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="grid gap-3 border-b border-white/10 py-5 text-sm text-primary-foreground/60 md:grid-cols-3">
          <Link href={`mailto:${siteConfig.supportEmail}`} className="flex items-center gap-2 transition-colors hover:text-primary-foreground">
            <Mail className="h-4 w-4 text-[#d2ad7b]" />
            {siteConfig.supportEmail}
          </Link>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#d2ad7b]" />
            Based in {siteConfig.location}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#d2ad7b]" />
            Replies {siteConfig.responseTime}
          </span>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/terms-of-service" className="transition-colors hover:text-primary-foreground">
              Terms
            </Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-primary-foreground">
              Privacy
            </Link>
            <Link href="/cookie-settings" className="transition-colors hover:text-primary-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
