import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "All Guides", href: "/shop" },
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "About Us", href: "/about" },
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

const Footer = () => (
  <footer className="mt-16 border-t border-stone-800/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.98),rgba(15,23,42,1))] text-primary-foreground">
    <div className="container mx-auto px-4 py-8 sm:py-9">
      <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-7 lg:grid-cols-2 lg:gap-12">
        <div className="lg:pr-8">
          <Image src={logo} alt="Cosmic Remedies by Sia" className="h-12 w-auto brightness-200 sm:h-14" />
          <p className="mt-5 text-lg font-medium leading-snug text-primary-foreground">
            Sign up to receive spiritual guidance, product updates, and cosmic wellness tips.
          </p>
          <div className="mt-4 flex max-w-md flex-col gap-2.5 sm:flex-row sm:items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-11 flex-1 rounded-full border border-white/15 bg-white/8 px-5 text-sm text-primary-foreground placeholder:text-primary-foreground/45 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <Button
              type="button"
              className="h-11 rounded-full bg-[linear-gradient(135deg,#4090df_0%,#245ea7_100%)] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(36,94,167,0.22)] hover:brightness-105"
            >
              Subscribe
            </Button>
          </div>
          <p className="mt-3 max-w-md text-sm leading-5 text-primary-foreground/58">
            By subscribing you agree to our{" "}
            <Link href="/privacy-policy" className="underline underline-offset-4 transition-colors hover:text-primary-foreground">
              Privacy Policy
            </Link>{" "}
            and consent to receive updates from {siteConfig.name}.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title} className="min-w-0">
              <h4 className="mb-3 font-display text-sm font-semibold tracking-[0.04em] text-primary-foreground">{group.title}</h4>
              <div className="space-y-2.5">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-primary-foreground/62 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="sm:col-span-4">
            <div className="mt-1 flex flex-col gap-1.5 text-sm text-primary-foreground/55 sm:flex-row sm:items-center sm:gap-5">
              <Link href={`mailto:${siteConfig.supportEmail}`} className="transition-colors hover:text-primary-foreground">
                {siteConfig.supportEmail}
              </Link>
              <span>Based in {siteConfig.location}</span>
              <span>Replies within 24 hours</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 text-center text-xs text-primary-foreground/45">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
