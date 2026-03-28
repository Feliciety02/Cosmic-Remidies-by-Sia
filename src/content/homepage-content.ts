export interface HomepageCardContent {
  title: string;
  body: string;
}

export interface HomepageBenefitContent {
  title: string;
  desc: string;
}

export interface HomepageStepContent {
  num: string;
  title: string;
  desc: string;
}

export interface HomepageContent {
  hero: {
    badge: string;
    headingIntro: string;
    headingHighlight: string;
    headingEnding: string;
    description: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    accountPrompt: string;
    accountLinkText: string;
    featureCards: HomepageCardContent[];
  };
  featured: {
    eyebrow: string;
    title: string;
    description: string;
    viewAllLabel: string;
  };
  benefits: {
    eyebrow: string;
    title: string;
    description: string;
    items: HomepageBenefitContent[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    description: string;
    steps: HomepageStepContent[];
  };
  stories: {
    eyebrow: string;
    title: string;
    description: string;
  };
  leadCapture: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
  };
}

export const defaultHomepageContent: HomepageContent = {
  hero: {
    badge: "Trusted by 5,000+ Seekers",
    headingIntro: "Your sanctuary for",
    headingHighlight: "cosmic healing",
    headingEnding: "and inner wisdom",
    description:
      "Carefully crafted Vedic guides and spiritual remedies, written by Sia to help you reconnect with clarity, balance, and purpose at any stage of life.",
    primaryCtaLabel: "Shop Guides",
    secondaryCtaLabel: "Free Guide",
    accountPrompt: "Looking for your account?",
    accountLinkText: "Sign in here",
    featureCards: [
      { title: "Your private library", body: "Downloads, saved items, and purchase history all in one secure place." },
      { title: "Simple to get started", body: "Create an account in seconds and browse with full confidence." },
      { title: "Room to grow", body: "Your account grows with you: guides today, new tools and sessions tomorrow." },
    ],
  },
  featured: {
    eyebrow: "Most Loved",
    title: "Featured Guides",
    description: "Our most beloved spiritual guides, presented with the same tone and structure used across the page.",
    viewAllLabel: "View All Guides",
  },
  benefits: {
    eyebrow: "Why Choose Us",
    title: "Why Thousands Trust Our Guides",
    description: "Every guide is built to feel grounded, usable, and supportive from the moment it reaches your inbox.",
    items: [
      { title: "Expert-Crafted Content", desc: "Written by Sia with years of spiritual practice and deep Vedic knowledge." },
      { title: "Instant Digital Delivery", desc: "Receive your guide immediately after purchase with no waiting and no shipping." },
      { title: "30-Day Guarantee", desc: "Not satisfied? Receive a full refund within 30 days, no questions asked." },
      { title: "Practical & Actionable", desc: "Step-by-step instructions you can begin using the same day you receive them." },
    ],
  },
  howItWorks: {
    eyebrow: "Simple Process",
    title: "How It Works",
    description: "The storefront now follows the same guided rhythm as the product itself: simple entry, clear choice, easy return.",
    steps: [
      { num: "01", title: "Create Your Account", desc: "Start with a customer profile so your saved items and future downloads live in one secure place." },
      { num: "02", title: "Choose Your Guide", desc: "Explore the full collection once signed in and select the wisdom that calls to you." },
      { num: "03", title: "Return Anytime", desc: "Revisit your library, access saved guides, and explore new tools whenever you need them." },
    ],
  },
  stories: {
    eyebrow: "Reader Stories",
    title: "What Our Readers Say",
    description: "Social proof now carries the same spacing, typography, and surface treatment as the rest of the storefront.",
  },
  leadCapture: {
    eyebrow: "Free Gift",
    title: "Receive a Free Cosmic Healing Starter Guide",
    description: "Most first-time visitors are not ready to buy immediately. Capture the free starter guide first, then continue the journey by email.",
    ctaLabel: "Get the Free Guide",
  },
  finalCta: {
    eyebrow: "Begin Your Journey",
    title: "Ready to Transform Your Spiritual Path?",
    description: "Browse our complete collection of premium guides and begin your healing journey today. Instant delivery and a 30-day satisfaction guarantee.",
    ctaLabel: "Shop All Guides",
  },
};
