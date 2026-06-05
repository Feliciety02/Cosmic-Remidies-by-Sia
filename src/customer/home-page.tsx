import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, Shield, Sparkles, Star } from "lucide-react";
import Footer from "@/components/Footer";
import HomeAuthModal from "@/components/HomeAuthModal";
import HomeTestimonials from "@/components/HomeTestimonials";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import TrustBar from "@/components/TrustBar";
import type { HomepageContent } from "@/content/homepage-content";
import { products } from "@/data/products";
import { getHomepageContent } from "@/lib/homepage-content-store";
import { buildAuthHref, buildMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description:
    "Explore premium spiritual guides, Vedic remedies, and cosmic healing resources designed for modern seekers.",
  path: "/",
});

type AuthMode = "login" | "create";

interface HomePageProps {
  initialAuthMode?: AuthMode;
  initialAuthError?: string;
}

const sectionShell = "py-16 md:py-24";
const sectionHeading = "mb-12 text-center";
const sectionEyebrow = "mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-amber-800";
const sectionTitle = "font-display text-3xl font-bold tracking-tight text-stone-800 md:text-4xl";
const sectionDescription = "mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-600";
const softPanel =
  "rounded-[1.75rem] border border-white/70 bg-[rgba(255,251,245,0.78)] shadow-[0_18px_60px_rgba(106,74,40,0.08)] backdrop-blur-sm";

const Hero = ({ content }: { content: HomepageContent["hero"] }) => (
  <section className="relative overflow-hidden py-20 md:py-28 lg:py-36">
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 72% 58% at 50% 0%, rgba(210,181,132,0.18) 0%, transparent 65%), radial-gradient(circle at 20% 24%, rgba(245,234,212,0.46) 0%, transparent 30%), linear-gradient(160deg, #fffaf2 0%, #f6ecdd 52%, #fdf7ee 100%)",
      }}
    />
    <div
      className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full border border-amber-900/10"
      style={{ boxShadow: "0 0 0 32px rgba(214,186,142,0.14), 0 0 0 64px rgba(145,108,65,0.06)" }}
    />
    <div className="pointer-events-none absolute -bottom-16 -left-16 h-[340px] w-[340px] rounded-full border border-amber-700/10" />

    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-700/20 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-800 shadow-sm backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 fill-amber-600 text-amber-600" />
          {content.badge}
        </div>

        <h1 className="mb-6 font-display text-4xl font-bold leading-[1.18] tracking-tight text-stone-800 md:text-5xl lg:text-[3.6rem]">
          {content.headingIntro}{" "}
          <span
            className="relative inline-block pb-[0.12em]"
            style={{
              background: "linear-gradient(135deg, #c79b63 0%, #8f6740 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {content.headingHighlight}
          </span>{" "}
          {content.headingEnding}
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-stone-600">{content.description}</p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className="group inline-flex min-w-[142px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#caa16f_0%,#8b6440_100%)] px-9 py-4 text-[1.05rem] font-semibold text-[#fff9f0] shadow-[0_14px_30px_rgba(131,94,55,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_18px_36px_rgba(131,94,55,0.34)]"
          >
            {content.primaryCtaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/free-guide"
            className="inline-flex min-w-[142px] items-center justify-center rounded-full border-2 border-amber-200/80 bg-white/80 px-9 py-4 text-[1.05rem] font-semibold text-stone-700 shadow-[0_8px_22px_rgba(90,62,28,0.08)] backdrop-blur-sm transition-all hover:border-primary/35 hover:bg-white hover:text-primary"
          >
            {content.secondaryCtaLabel}
          </Link>
        </div>

        <p className="mt-6 text-[1.02rem] text-stone-500">
          {content.accountPrompt}{" "}
          <Link href={buildAuthHref("login")} className="font-semibold text-amber-800 underline-offset-2 hover:underline">
            {content.accountLinkText}
          </Link>
        </p>

        <div className="mt-14 grid gap-4 text-left sm:grid-cols-3">
          {content.featureCards.map((card) => (
            <div key={card.title} className={`${softPanel} px-6 py-5`}>
              <p className="mb-1 font-semibold text-stone-800">{card.title}</p>
              <p className="text-sm leading-relaxed text-stone-600">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Benefits = ({ content }: { content: HomepageContent["benefits"] }) => {
  const items = [
    {
      icon: BookOpen,
      ...content.items[0],
    },
    {
      icon: Download,
      ...content.items[1],
    },
    {
      icon: Shield,
      ...content.items[2],
    },
    {
      icon: Sparkles,
      ...content.items[3],
    },
  ];

  return (
    <section className="bg-[linear-gradient(180deg,#fdf7ee_0%,#f6ecdd_100%)] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={sectionHeading}>
          <p className={sectionEyebrow}>{content.eyebrow}</p>
          <h2 className={sectionTitle}>{content.title}</h2>
          <p className={sectionDescription}>{content.description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className={`${softPanel} group p-7 text-center transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 transition-colors group-hover:bg-amber-100">
                <item.icon className="h-6 w-6 text-amber-800" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-stone-800">{item.title}</h3>
              <p className="text-sm leading-relaxed text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = ({ content }: { content: HomepageContent["howItWorks"] }) => {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: "linear-gradient(135deg, #fffaf2 0%, #f4e8d8 100%)" }}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 opacity-[0.12]" style={{ background: "radial-gradient(circle, #c79b63 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={sectionHeading}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-amber-800">{content.eyebrow}</p>
          <h2 className={sectionTitle}>{content.title}</h2>
          <p className={sectionDescription}>{content.description}</p>
        </div>
        <div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          <div className="pointer-events-none absolute left-1/6 right-1/6 top-10 hidden h-px border-t border-dashed border-amber-300 md:block" />
          {content.steps.map((step, i) => (
            <div key={step.num} className={`${softPanel} relative px-6 py-8 text-center`}>
              <div
                className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-200 bg-white font-display text-2xl font-bold shadow-sm"
                style={{ color: i % 2 === 0 ? "#c79b63" : "#8f6740" }}
              >
                {step.num}
              </div>
              <h3 className="mb-2 font-display text-xl font-bold text-stone-800">{step.title}</h3>
              <p className="text-sm leading-relaxed text-stone-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EmailCapture = ({ content }: { content: HomepageContent["leadCapture"] }) => (
  <section className={sectionShell}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-amber-200/40 bg-[linear-gradient(145deg,rgba(255,250,242,0.96)_0%,rgba(247,237,222,0.94)_100%)] p-10 text-center shadow-[0_24px_80px_rgba(113,82,47,0.08)] md:p-14">
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border-4 border-amber-200/30" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full border-4 border-orange-200/20" />

        <p className={sectionEyebrow}>{content.eyebrow}</p>
        <h2 className="mb-3 font-display text-2xl font-bold text-stone-800 md:text-3xl">{content.title}</h2>
        <p className="mx-auto mb-7 max-w-xl text-base leading-relaxed text-stone-600">{content.description}</p>
        <div className="mx-auto max-w-2xl">
          <LeadCaptureForm
            source="homepage-capture"
            layout="inline"
            submitLabel={content.ctaLabel}
            successMessage="Starter guide request received."
          />
        </div>
      </div>
    </div>
  </section>
);

const FinalCta = ({ content }: { content: HomepageContent["finalCta"] }) => (
  <section
    className="relative overflow-hidden py-20 md:py-24"
    style={{ background: "linear-gradient(180deg, #fdf7ee 0%, #f3e6d6 100%)" }}
  >
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(199,155,99,0.12) 0%, transparent 70%)" }}
    />
    <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-800">{content.eyebrow}</p>
      <h2 className="mb-5 font-display text-3xl font-bold text-stone-800 md:text-4xl">{content.title}</h2>
      <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-stone-600">{content.description}</p>
      <Link
        href="/shop"
        className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#caa16f_0%,#8b6440_100%)] px-10 py-4 text-base font-bold text-[#fff9f0] shadow-lg shadow-amber-950/20 transition-all hover:-translate-y-0.5 hover:brightness-105 hover:shadow-xl"
      >
        {content.ctaLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </section>
);

const HomePage = async ({ initialAuthMode, initialAuthError }: HomePageProps) => {
  const content = await getHomepageContent();

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <Hero content={content.hero} />
      <HomeAuthModal initialMode={initialAuthMode} initialError={initialAuthError} />
      <TrustBar />

      <section className={sectionShell}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={sectionHeading}>
            <p className={sectionEyebrow}>{content.featured.eyebrow}</p>
            <h2 className={`${sectionTitle} mb-3`}>{content.featured.title}</h2>
            <p className="mx-auto max-w-md text-base leading-7 text-stone-600">{content.featured.description}</p>
          </div>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full border-2 border-amber-200 bg-white px-8 py-3.5 text-base font-semibold text-stone-700 shadow-sm transition-all hover:border-amber-400 hover:text-amber-800"
            >
              {content.featured.viewAllLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Benefits content={content.benefits} />
      <HowItWorks content={content.howItWorks} />

      <HomeTestimonials
        eyebrow={content.stories.eyebrow}
        title={content.stories.title}
        description={content.stories.description}
      />

      <EmailCapture content={content.leadCapture} />
      <FinalCta content={content.finalCta} />
      <Footer />
    </div>
  );
};

export default HomePage;
