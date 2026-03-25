import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import { products, testimonials } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, BookOpen, Download, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => (
  <section className="relative overflow-hidden py-16 md:py-24">
    <div className="absolute inset-0 bg-gradient-to-br from-teal-light/30 to-background" />
    <div className="container mx-auto px-4 relative">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6">✨ Trusted by 10,000+ spiritual seekers</span>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Unlock Ancient Wisdom for <span className="text-gradient-teal">Modern Healing</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Premium spiritual guides, vedic remedies & cosmic healing resources — delivered instantly to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop">
            <Button size="lg" className="w-full sm:w-auto text-base px-8 gap-2">
              Browse Collection <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">Learn More</Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Benefits = () => {
  const items = [
    { icon: BookOpen, title: "Expert-Crafted Content", desc: "Written by Sia with years of spiritual practice and vedic knowledge." },
    { icon: Download, title: "Instant Digital Delivery", desc: "Get your guides immediately after purchase. No waiting, no shipping." },
    { icon: Shield, title: "100% Satisfaction Guaranteed", desc: "Not happy? Get a full refund within 30 days, no questions asked." },
    { icon: Sparkles, title: "Practical & Actionable", desc: "Every guide includes step-by-step instructions you can use today." },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">Why Thousands Trust Our Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.title} className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Choose Your Guide", desc: "Browse our collection and find the perfect guide for your journey." },
    { num: "02", title: "Secure Checkout", desc: "Pay safely with Paddle. Your data is always protected." },
    { num: "03", title: "Instant Download", desc: "Get your PDF guide delivered to your inbox within seconds." },
  ];

  return (
    <section className="py-16 md:py-20 bg-teal-light/30">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <span className="text-4xl font-display font-bold text-gradient-teal">{step.num}</span>
              <h3 className="font-semibold mt-3 mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EmailCapture = () => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-4">
      <div className="max-w-lg mx-auto text-center bg-card border rounded-2xl p-8 md:p-10">
        <span className="text-2xl mb-4 block">🎁</span>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3">Get a Free Cosmic Healing Starter Guide</h2>
        <p className="text-sm text-muted-foreground mb-6">Join 5,000+ spiritual seekers. Get your free guide + weekly cosmic insights.</p>
        <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
          <Input placeholder="Enter your email" type="email" className="flex-1" />
          <Button type="submit" className="shrink-0">Get Free Guide</Button>
        </form>
        <p className="text-xs text-muted-foreground mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-16 md:py-20 bg-gradient-teal text-primary-foreground">
    <div className="container mx-auto px-4 text-center">
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Spiritual Journey?</h2>
      <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">Browse our collection of premium guides and start your healing journey today. Instant delivery, 30-day guarantee.</p>
      <Link to="/shop">
        <Button size="lg" variant="secondary" className="text-base px-8 gap-2">
          Shop All Guides <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  </section>
);

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <TrustBar />
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Featured Guides</h2>
          <p className="text-muted-foreground">Our most popular spiritual guides, trusted by thousands.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/shop">
            <Button variant="outline" size="lg" className="gap-2">View All Guides <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
    <Benefits />
    <HowItWorks />
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">What Our Readers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
    <EmailCapture />
    <FinalCTA />
    <Footer />
  </div>
);

export default Index;
