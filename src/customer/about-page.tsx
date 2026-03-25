import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About Cosmic Remedies",
  description: "Learn about Sia, the mission behind Cosmic Remedies, and the spiritual practice behind every guide.",
  path: "/about",
});

const AboutPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-12 text-center font-display text-3xl font-bold md:text-4xl">About Cosmic Remedies</h1>

      <div className="prose prose-lg mx-auto">
        <div className="mb-8 rounded-2xl border bg-card p-8">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <span className="text-3xl">S</span>
          </div>
          <h2 className="mb-4 text-center font-display text-xl font-bold">Hi, I&apos;m Sia</h2>
          <p className="mb-4 text-center leading-relaxed text-muted-foreground">
            I&apos;m a spiritual practitioner and Vedic astrology enthusiast based in India. For over a decade, I&apos;ve studied
            ancient healing traditions, from sacred geometry to crystal therapy, and made it my mission to make this
            wisdom accessible to everyone.
          </p>
          <p className="mb-4 text-center leading-relaxed text-muted-foreground">
            Cosmic Remedies was born from a simple idea: ancient spiritual knowledge should not be gatekept. These guides
            are the result of years of study, practice, and real-world application, distilled into practical PDFs you can
            use immediately.
          </p>
          <p className="text-center leading-relaxed text-muted-foreground">
            Every guide is written with care, tested with intention, and designed to support your unique spiritual journey.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { num: "10,000+", label: "Happy Readers" },
            { num: "20+", label: "Premium Guides" },
            { num: "30+", label: "Countries Served" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-teal-light/30 p-6 text-center">
              <p className="font-display text-2xl font-bold text-gradient-teal">{stat.num}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/shop">Explore Our Guides</Link>
          </Button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default AboutPage;
