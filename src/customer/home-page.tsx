import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, Shield, Sparkles } from "lucide-react";
import AuthLanding from "@/components/AuthLanding";
import EmailCaptureForm from "@/components/EmailCaptureForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import TrustBar from "@/components/TrustBar";
import { Button } from "@/components/ui/button";
import { products, testimonials } from "@/data/products";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Spiritual Guides for Modern Healing",
  description:
    "Explore premium spiritual guides, Vedic remedies, and cosmic healing resources designed for modern seekers.",
  path: "/",
});

const Hero = () => (
  <section className="relative overflow-hidden py-16 md:py-24">
    <div className="absolute inset-0 bg-gradient-to-br from-teal-light/30 to-background" />
    <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.18),_transparent_60%)]" />
    <div className="container relative mx-auto px-4">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <span className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            Trusted by 10,000+ spiritual seekers
          </span>
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Unlock Ancient Wisdom for <span className="text-gradient-teal">Modern Healing</span>
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            Sign in or create your customer account first, then explore premium spiritual guides, Vedic remedies, and
            cosmic healing resources delivered instantly to your inbox.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full gap-2 px-8 text-base sm:w-auto">
              <Link href="/shop">
                Browse Collection <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full px-8 text-base sm:w-auto">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border bg-card/70 px-4 py-4">
              <p className="text-sm font-semibold">Instant access</p>
              <p className="mt-1 text-sm text-muted-foreground">Customer sign-in starts the journey immediately.</p>
            </div>
            <div className="rounded-2xl border bg-card/70 px-4 py-4">
              <p className="text-sm font-semibold">Secure checkout path</p>
              <p className="mt-1 text-sm text-muted-foreground">Account flow is now part of the storefront entry point.</p>
            </div>
            <div className="rounded-2xl border bg-card/70 px-4 py-4">
              <p className="text-sm font-semibold">Ready for growth</p>
              <p className="mt-1 text-sm text-muted-foreground">Account pages can expand into downloads and order history.</p>
            </div>
          </div>
        </div>
        <AuthLanding />
      </div>
    </div>
  </section>
);

const Benefits = () => {
  const items = [
    {
      icon: BookOpen,
      title: "Expert-Crafted Content",
      desc: "Written by Sia with years of spiritual practice and Vedic knowledge.",
    },
    {
      icon: Download,
      title: "Instant Digital Delivery",
      desc: "Get your guides immediately after purchase. No waiting and no shipping.",
    },
    {
      icon: Shield,
      title: "100% Satisfaction Guaranteed",
      desc: "Not happy? Get a full refund within 30 days, no questions asked.",
    },
    {
      icon: Sparkles,
      title: "Practical and Actionable",
      desc: "Every guide includes step-by-step instructions you can use today.",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-display text-2xl font-bold md:text-3xl">Why Thousands Trust Our Guides</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
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
    <section className="bg-teal-light/30 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-display text-2xl font-bold md:text-3xl">How It Works</h2>
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <span className="font-display text-4xl font-bold text-gradient-teal">{step.num}</span>
              <h3 className="mb-2 mt-3 font-semibold">{step.title}</h3>
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
      <div className="mx-auto max-w-lg rounded-2xl border bg-card p-8 text-center md:p-10">
        <h2 className="mb-3 font-display text-xl font-bold md:text-2xl">Get a Free Cosmic Healing Starter Guide</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Join 5,000+ spiritual seekers. Get your free guide and weekly cosmic insights.
        </p>
        <EmailCaptureForm />
        <p className="mt-3 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  </section>
);

const FinalCta = () => (
  <section className="bg-gradient-teal py-16 text-primary-foreground md:py-20">
    <div className="container mx-auto px-4 text-center">
      <h2 className="mb-4 font-display text-2xl font-bold md:text-3xl">Ready to Transform Your Spiritual Journey?</h2>
      <p className="mx-auto mb-8 max-w-lg text-primary-foreground/80">
        Browse our collection of premium guides and start your healing journey today. Instant delivery and a 30-day guarantee.
      </p>
      <Button asChild size="lg" variant="secondary" className="gap-2 px-8 text-base">
        <Link href="/shop">
          Shop All Guides <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  </section>
);

const HomePage = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <TrustBar />
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold md:text-3xl">Featured Guides</h2>
          <p className="text-muted-foreground">Our most popular spiritual guides, trusted by thousands.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/shop">
              View All Guides <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
    <Benefits />
    <HowItWorks />
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-display text-2xl font-bold md:text-3xl">What Our Readers Say</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
    <EmailCapture />
    <FinalCta />
    <Footer />
  </div>
);

export default HomePage;
