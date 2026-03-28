import { Star, Download, Shield, Zap } from "lucide-react";

const items = [
  { icon: Star, label: "4.9/5 Rating", sub: "500+ reviews" },
  { icon: Download, label: "10,000+", sub: "Downloads" },
  { icon: Shield, label: "100%", sub: "Money-back guarantee" },
  { icon: Zap, label: "Instant", sub: "Digital delivery" },
];

const TrustBar = () => (
  <div className="border-y border-sky-100/80 bg-[linear-gradient(180deg,rgba(234,244,255,0.92)_0%,rgba(242,248,255,0.92)_100%)]">
    <div className="container mx-auto flex flex-wrap justify-center gap-6 px-4 py-5 md:gap-12">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3 rounded-full border border-white/70 bg-white/60 px-4 py-2 shadow-sm backdrop-blur-sm">
          <item.icon className={`h-5 w-5 ${item.label === "4.9/5 Rating" ? "fill-amber-400 text-amber-400" : "text-primary"}`} />
          <div>
            <p className="text-sm font-semibold text-stone-800">{item.label}</p>
            <p className="text-xs text-stone-500">{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TrustBar;
