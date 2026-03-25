import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Shield, Zap, CheckCircle } from "lucide-react";

const LeadMagnetPage = () => (
  <div className="min-h-screen bg-gradient-to-b from-teal-light/40 to-background flex items-center justify-center px-4 py-12">
    <div className="max-w-md w-full">
      <div className="text-center mb-8">
        <span className="text-4xl mb-4 block">✨</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Free Cosmic Healing Starter Guide</h1>
        <p className="text-muted-foreground leading-relaxed">
          Discover 7 powerful healing techniques used by ancient spiritual masters — simplified for modern life.
        </p>
      </div>

      <div className="bg-card border rounded-2xl p-6 mb-6">
        <h3 className="font-semibold text-sm mb-4">What you'll learn:</h3>
        <ul className="space-y-3">
          {[
            "7 daily healing rituals you can start today",
            "Sacred breathing techniques for instant calm",
            "Crystal selection guide for beginners",
            "Morning manifestation framework",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <form className="space-y-3 mb-6" onSubmit={(e) => e.preventDefault()}>
        <Input placeholder="Your name" className="h-12" />
        <Input placeholder="Your best email" type="email" className="h-12" />
        <Button type="submit" size="lg" className="w-full text-base">Get My Free Guide →</Button>
      </form>

      <div className="flex justify-center gap-6 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Star className="h-3 w-3" /> 5,000+ downloads</span>
        <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> No spam ever</span>
        <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> Instant delivery</span>
      </div>
    </div>
  </div>
);

export default LeadMagnetPage;
