import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { siteConfig } from "@/lib/site";

const Footer = () => (
  <footer className="mt-20 bg-foreground text-primary-foreground">
    <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4">
      <div>
        <Image src={logo} alt="Cosmic Remedies by Sia" className="mb-4 h-10 w-auto brightness-200" />
        <p className="text-sm text-primary-foreground/60">
          Premium spiritual guides & cosmic remedies delivered instantly to your inbox.
        </p>
      </div>
      <div>
        <h4 className="mb-3 font-display text-sm font-semibold">Quick Links</h4>
        <div className="flex flex-col gap-2">
          {[
            { label: "Shop", href: "/shop" },
            { label: "About", href: "/about" },
            { label: "FAQ", href: "/faq" },
            { label: "Contact", href: "/contact" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms of Service", href: "/terms-of-service" },
            { label: "Refund Policy", href: "/refund-policy" },
            { label: "Do Not Sell / Share", href: "/do-not-sell" },
            { label: "Cookie Settings", href: "/cookie-settings" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 font-display text-sm font-semibold">Support</h4>
        <div className="flex flex-col gap-2 text-sm text-primary-foreground/60">
          <span>{siteConfig.supportEmail}</span>
          <span>Based in {siteConfig.location}</span>
          <span>We respond within 24 hours</span>
        </div>
      </div>
      <div>
        <h4 className="mb-3 font-display text-sm font-semibold">Guarantee</h4>
        <p className="text-sm text-primary-foreground/60">
          100% satisfaction guaranteed. Instant digital delivery. Secure checkout.
        </p>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10 py-4 text-center text-xs text-primary-foreground/40">
      &copy; {new Date().getFullYear()} Cosmic Remedies by Sia. All rights reserved.
    </div>
  </footer>
);

export default Footer;
