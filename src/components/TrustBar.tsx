import { Star, Download, Shield, Zap } from "lucide-react";

const items = [
  { icon: Star, label: "4.9/5 Rating", sub: "500+ reviews" },
  { icon: Download, label: "10,000+", sub: "Downloads" },
  { icon: Shield, label: "100%", sub: "Money-back guarantee" },
  { icon: Zap, label: "Instant", sub: "Digital delivery" },
];

const TrustBar = () => (
  <div className="bg-teal-light/50 border-y">
    <div className="container mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 md:gap-12">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <item.icon className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold text-foreground">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TrustBar;
