import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, Shield, Sparkles, Star } from "lucide-react";
import Footer from "@/components/Footer";
import HomeAuthModal from "@/components/HomeAuthModal";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import TrustBar from "@/components/TrustBar";
import { products, testimonials } from "@/data/products";
import { buildAuthHref, buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Cosmic Remedies by Sia",
  description:
    "Explore premium spiritual guides, Vedic remedies, and cosmic healing resources designed for modern seekers.",
  path: "/",
});

type AuthMode = "login" | "create";

interface HomePageProps {
  initialAuthMode?: AuthMode;
}

const sectionShell = "py-16 md:py-24";
const sectionHeading = "mb-12 text-center";
const sectionEyebrow = "mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-sky-700";
const sectionTitle = "font-display text-3xl font-bold tracking-tight text-stone-800 md:text-4xl";
const sectionDescription = "mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-500";
const softPanel =
  "rounded-[1.75rem] border border-white/70 bg-white/72 shadow-[0_18px_60px_rgba(46,84,138,0.08)] backdrop-blur-sm";

const Hero = () => (
  <section className="relative overflow-hidden py-20 md:py-28 lg:py-36">
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 72% 58% at 50% 0%, rgba(123,185,227,0.16) 0%, transparent 65%), radial-gradient(circle at 20% 24%, rgba(217,188,146,0.16) 0%, transparent 30%), linear-gradient(160deg, #fcfaf5 0%, #f5efe6 52%, #fbf7f1 100%)",
      }}
    />
    <div
      className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full border border-sky-900/10"
      style={{ boxShadow: "0 0 0 32px rgba(123,185,227,0.08), 0 0 0 64px rgba(84,128,210,0.04)" }}
    />
    <div className="pointer-events-none absolute -bottom-16 -left-16 h-[340px] w-[340px] rounded-full border border-blue-700/10" />

    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-700/20 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700 shadow-sm backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 fill-sky-600 text-sky-600" />
          Trusted by 5,000+ Seekers
        </div>

        <h1 className="mb-6 font-display text-4xl font-bold leading-snug tracking-tight text-stone-800 md:text-5xl lg:text-[3.6rem]">
          Your sanctuary for{" "}
          <span
            className="relative inline-block"
            style={{
              background: "linear-gradient(135deg, #5b8fe0 0%, #3d86b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            cosmic healing
          </span>{" "}
          and inner wisdom
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-stone-500">
          Carefully crafted Vedic guides and spiritual remedies, written by Sia to help you reconnect with clarity,
          balance, and purpose at any stage of life.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={buildAuthHref("login")}
            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#4d88d8_0%,#2c6dbe_100%)] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-950/20 transition-all hover:-translate-y-0.5 hover:brightness-105 hover:shadow-xl hover:shadow-blue-950/30"
          >
            Login
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={buildAuthHref("create")}
            className="inline-flex items-center gap-2 rounded-full border-2 border-sky-900/15 bg-white/65 px-8 py-4 text-base font-semibold text-stone-700 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-white hover:text-primary"
          >
            Sign Up
          </Link>
        </div>

        <p className="mt-5 text-sm text-stone-400">
          Already have an account?{" "}
          <Link href={buildAuthHref("login")} className="font-medium text-sky-700 underline-offset-2 hover:underline">
            Sign in here
          </Link>
        </p>

        <div className="mt-14 grid gap-4 text-left sm:grid-cols-3">
          {[
            { title: "Your private library", body: "Downloads, saved items, and purchase history all in one secure place." },
            { title: "Simple to get started", body: "Create an account in seconds and browse with full confidence." },
            { title: "Room to grow", body: "Your account grows with you: guides today, new tools and sessions tomorrow." },
          ].map((card) => (
            <div key={card.title} className={`${softPanel} px-6 py-5`}>
              <p className="mb-1 font-semibold text-stone-800">{card.title}</p>
              <p className="text-sm leading-relaxed text-stone-500">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Benefits = () => {
  const items = [
    {
      icon: BookOpen,
      title: "Expert-Crafted Content",
      desc: "Written by Sia with years of spiritual practice and deep Vedic knowledge.",
    },
    {
      icon: Download,
      title: "Instant Digital Delivery",
      desc: "Receive your guide immediately after purchase with no waiting and no shipping.",
    },
    {
      icon: Shield,
      title: "30-Day Guarantee",
      desc: "Not satisfied? Receive a full refund within 30 days, no questions asked.",
    },
    {
      icon: Sparkles,
      title: "Practical & Actionable",
      desc: "Step-by-step instructions you can begin using the same day you receive them.",
    },
  ];

  return (
    <section className="bg-[linear-gradient(180deg,#faf6ef_0%,#f5efe6_100%)] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={sectionHeading}>
          <p className={sectionEyebrow}>Why Choose Us</p>
          <h2 className={sectionTitle}>Why Thousands Trust Our Guides</h2>
          <p className={sectionDescription}>
            Every guide is built to feel grounded, usable, and supportive from the moment it reaches your inbox.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className={`${softPanel} group p-7 text-center transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 transition-colors group-hover:bg-sky-100">
                <item.icon className="h-6 w-6 text-sky-700" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-stone-800">{item.title}</h3>
              <p className="text-sm leading-relaxed text-stone-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Create Your Account",
      desc: "Start with a customer profile so your saved items and future downloads live in one secure place.",
    },
    {
      num: "02",
      title: "Choose Your Guide",
      desc: "Explore the full collection once signed in and select the wisdom that calls to you.",
    },
    {
      num: "03",
      title: "Return Anytime",
      desc: "Revisit your library, access saved guides, and explore new tools whenever you need them.",
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: "linear-gradient(135deg, #fcfaf5 0%, #f3ede4 100%)" }}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 opacity-10" style={{ background: "radial-gradient(circle, #5b8fe0 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={sectionHeading}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-sky-700">Simple Process</p>
          <h2 className={sectionTitle}>How It Works</h2>
          <p className={sectionDescription}>
            The storefront now follows the same guided rhythm as the product itself: simple entry, clear choice, easy return.
          </p>
        </div>
        <div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          <div className="pointer-events-none absolute left-1/6 right-1/6 top-10 hidden h-px border-t border-dashed border-sky-300 md:block" />
          {steps.map((step, i) => (
            <div key={step.num} className={`${softPanel} relative px-6 py-8 text-center`}>
              <div
                className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-sky-200 bg-white font-display text-2xl font-bold shadow-sm"
                style={{ color: i % 2 === 0 ? "#4d88d8" : "#2f6ea7" }}
              >
                {step.num}
              </div>
              <h3 className="mb-2 font-display text-xl font-bold text-stone-800">{step.title}</h3>
              <p className="text-sm leading-relaxed text-stone-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EmailCapture = () => (
  <section className={sectionShell}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-sky-200/50 bg-[linear-gradient(145deg,rgba(252,249,244,0.95)_0%,rgba(245,238,228,0.94)_100%)] p-10 text-center shadow-[0_24px_80px_rgba(110,97,72,0.10)] md:p-14">
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border-4 border-sky-200/30" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full border-4 border-blue-200/20" />

        <p className={sectionEyebrow}>Free Gift</p>
        <h2 className="mb-3 font-display text-2xl font-bold text-stone-800 md:text-3xl">Receive a Free Cosmic Healing Starter Guide</h2>
        <p className="mx-auto mb-7 max-w-xl text-base leading-relaxed text-stone-500">
          Most first-time visitors are not ready to buy immediately. Capture the free starter guide first, then continue the journey by email.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/free-guide"
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#4d88d8_0%,#2c6dbe_100%)] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-950/20 transition-all hover:-translate-y-0.5 hover:brightness-105"
          >
            Get the Free Guide
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm font-medium text-stone-500 underline underline-offset-4 transition-colors hover:text-stone-700"
          >
            Privacy Policy
          </Link>
        </div>
        <p className="mt-4 text-xs text-stone-400">No spam. Unsubscribe any time. Privacy-first signup flow.</p>
      </div>
    </div>
  </section>
);

const FinalCta = () => (
  <section
    className="relative overflow-hidden py-20 md:py-24"
    style={{ background: "linear-gradient(135deg, #396ca8 0%, #2f578f 50%, #243f6e 100%)" }}
  >
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(123,185,227,0.14) 0%, transparent 70%)" }}
    />
    <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sky-200">Begin Your Journey</p>
      <h2 className="mb-5 font-display text-3xl font-bold text-white md:text-4xl">Ready to Transform Your Spiritual Path?</h2>
      <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-sky-100/80">
        Browse our complete collection of premium guides and begin your healing journey today. Instant delivery and a 30-day satisfaction guarantee.
      </p>
      <Link
        href="/shop"
        className="group inline-flex items-center gap-2 rounded-full bg-sky-500 px-10 py-4 text-base font-bold text-white shadow-lg shadow-black/30 transition-all hover:-translate-y-0.5 hover:bg-sky-400 hover:shadow-xl"
      >
        Shop All Guides
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </section>
);

const HomePage = ({ initialAuthMode }: HomePageProps) => (
  <div className="min-h-screen bg-transparent">
    <Navbar />
    <Hero />
    <HomeAuthModal initialMode={initialAuthMode} />
    <TrustBar />

    <section className={sectionShell}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={sectionHeading}>
          <p className={sectionEyebrow}>Most Loved</p>
          <h2 className={`${sectionTitle} mb-3`}>Featured Guides</h2>
          <p className="mx-auto max-w-md text-base leading-7 text-stone-500">
            Our most beloved spiritual guides, presented with the same tone and structure used across the page.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border-2 border-stone-300 bg-white px-8 py-3.5 text-base font-semibold text-stone-700 shadow-sm transition-all hover:border-sky-400 hover:text-sky-700"
          >
            View All Guides <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>

    <Benefits />
    <HowItWorks />

    <section className="bg-[linear-gradient(180deg,#f6f0e7_0%,#fcf9f4_100%)] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={sectionHeading}>
          <p className={sectionEyebrow}>Reader Stories</p>
          <h2 className={sectionTitle}>What Our Readers Say</h2>
          <p className={sectionDescription}>
            Social proof now carries the same spacing, typography, and surface treatment as the rest of the storefront.
          </p>
        </div>
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
