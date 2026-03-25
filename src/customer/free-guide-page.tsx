import type { Metadata } from "next";
import { CheckCircle, Shield, Star, Zap } from "lucide-react";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Free Cosmic Healing Starter Guide",
  description: "Claim the free starter guide and learn seven practical healing techniques for modern spiritual practice.",
  path: "/free-guide",
});

const FreeGuidePage = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-teal-light/40 to-background px-4 py-12">
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="mb-4 font-display text-3xl font-bold md:text-4xl">Free Cosmic Healing Starter Guide</h1>
        <p className="leading-relaxed text-muted-foreground">
          Discover seven powerful healing techniques used by ancient spiritual masters, simplified for modern life.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold">What you&apos;ll learn</h3>
        <ul className="space-y-3">
          {[
            "7 daily healing rituals you can start today",
            "Sacred breathing techniques for instant calm",
            "Crystal selection guide for beginners",
            "Morning manifestation framework",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <LeadMagnetForm />

      <div className="flex justify-center gap-6 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3" /> 5,000+ downloads
        </span>
        <span className="flex items-center gap-1">
          <Shield className="h-3 w-3" /> No spam ever
        </span>
        <span className="flex items-center gap-1">
          <Zap className="h-3 w-3" /> Instant delivery
        </span>
      </div>
    </div>
  </div>
);

export default FreeGuidePage;
