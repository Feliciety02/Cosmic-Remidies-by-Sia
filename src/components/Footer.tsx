import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground mt-20">
    <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <img src={logo} alt="Cosmic Remedies by Sia" className="h-10 mb-4 brightness-200" />
        <p className="text-sm text-primary-foreground/60">Premium spiritual guides & cosmic remedies delivered instantly to your inbox.</p>
      </div>
      <div>
        <h4 className="font-display text-sm font-semibold mb-3">Quick Links</h4>
        <div className="flex flex-col gap-2">
          {["Shop", "About", "FAQ", "Contact"].map((l) => (
            <Link key={l} to={`/${l.toLowerCase()}`} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">{l}</Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display text-sm font-semibold mb-3">Support</h4>
        <div className="flex flex-col gap-2 text-sm text-primary-foreground/60">
          <span>cosmicremediesbysia@gmail.com</span>
          <span>Based in India 🇮🇳</span>
        </div>
      </div>
      <div>
        <h4 className="font-display text-sm font-semibold mb-3">Guarantee</h4>
        <p className="text-sm text-primary-foreground/60">100% satisfaction guaranteed. Instant digital delivery. Secure checkout.</p>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10 text-center py-4 text-xs text-primary-foreground/40">
      © {new Date().getFullYear()} Cosmic Remedies by Sia. All rights reserved.
    </div>
  </footer>
);

export default Footer;
