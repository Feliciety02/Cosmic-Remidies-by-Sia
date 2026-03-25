import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">About Cosmic Remedies</h1>

      <div className="prose prose-lg mx-auto">
        <div className="bg-card border rounded-2xl p-8 mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🙏</span>
          </div>
          <h2 className="font-display text-xl font-bold text-center mb-4">Hi, I'm Sia</h2>
          <p className="text-muted-foreground leading-relaxed text-center mb-4">
            I'm a spiritual practitioner and vedic astrology enthusiast based in India. For over a decade, I've studied ancient healing traditions — from sacred geometry to crystal therapy — and I've made it my mission to make this wisdom accessible to everyone.
          </p>
          <p className="text-muted-foreground leading-relaxed text-center mb-4">
            Cosmic Remedies was born from a simple idea: that ancient spiritual knowledge shouldn't be gatekept. These guides are the culmination of years of study, practice, and real-world application, distilled into practical, beautiful PDFs you can use immediately.
          </p>
          <p className="text-muted-foreground leading-relaxed text-center">
            Every guide is written with love, tested with care, and designed to help you on your unique spiritual journey. Based in India 🇮🇳, serving seekers worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { num: "10,000+", label: "Happy Readers" },
            { num: "20+", label: "Premium Guides" },
            { num: "30+", label: "Countries Served" },
          ].map((s) => (
            <div key={s.label} className="text-center bg-teal-light/30 rounded-xl p-6">
              <p className="text-2xl font-bold text-gradient-teal font-display">{s.num}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/shop">
            <Button size="lg" className="gap-2">Explore Our Guides</Button>
          </Link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default AboutPage;
