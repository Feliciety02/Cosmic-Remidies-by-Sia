import type { StaticImageData } from "next/image";

import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: StaticImageData;
  rating: number;
  badge?: string;
  category: string;
  bullets: string[];
}

export const products: Product[] = [
  {
    id: "sacred-geometry-guide",
    title: "Sacred Geometry & Cosmic Healing Guide",
    description: "Unlock the ancient secrets of sacred geometry and learn how to harness cosmic energy for healing, manifestation, and spiritual growth.",
    price: 19,
    originalPrice: 39,
    image: product1,
    rating: 5,
    badge: "Bestseller",
    category: "Healing",
    bullets: ["48 pages of sacred geometry patterns", "Step-by-step healing rituals", "Printable mandala templates", "Meditation techniques included"],
  },
  {
    id: "astrology-mastery",
    title: "Vedic Astrology Mastery Blueprint",
    description: "A comprehensive guide to understanding your birth chart, planetary influences, and cosmic timing for life decisions.",
    price: 24,
    originalPrice: 49,
    image: product2,
    rating: 5,
    badge: "New",
    category: "Astrology",
    bullets: ["Complete birth chart guide", "Planetary remedy recommendations", "Monthly cosmic calendar", "Relationship compatibility charts"],
  },
  {
    id: "vedic-remedies",
    title: "108 Vedic Remedies for Modern Life",
    description: "Time-tested spiritual remedies adapted for the modern world. From career blocks to relationship healing.",
    price: 14,
    originalPrice: 29,
    image: product3,
    rating: 5,
    category: "Remedies",
    bullets: ["108 proven remedies", "Easy-to-follow instructions", "Categorized by life area", "Bonus: Daily ritual planner"],
  },
  {
    id: "crystal-healing",
    title: "Crystal Healing & Energy Work Manual",
    description: "Discover the healing power of crystals. Learn to cleanse, charge, and use crystals for physical and spiritual wellness.",
    price: 17,
    originalPrice: 34,
    image: product4,
    rating: 4,
    badge: "Popular",
    category: "Healing",
    bullets: ["50+ crystal profiles", "Chakra alignment guide", "Crystal grid layouts", "Cleansing & charging rituals"],
  },
  {
    id: "chakra-balancing",
    title: "Complete Chakra Balancing System",
    description: "Balance all 7 chakras with this comprehensive system. Includes meditations, affirmations, and energy exercises.",
    price: 21,
    originalPrice: 42,
    image: product5,
    rating: 5,
    category: "Meditation",
    bullets: ["7 chakra deep dives", "Guided meditation scripts", "Affirmation cards (printable)", "Energy assessment quiz"],
  },
  {
    id: "numerology-destiny",
    title: "Numerology & Destiny Number Guide",
    description: "Calculate your destiny number and unlock your life purpose. Understand the cosmic significance of numbers in your life.",
    price: 12,
    originalPrice: 24,
    image: product6,
    rating: 4,
    category: "Numerology",
    bullets: ["Personal number calculator", "Life path analysis", "Lucky numbers guide", "Name numerology secrets"],
  },
];

export const categories = ["All", "Healing", "Astrology", "Remedies", "Meditation", "Numerology"];

export const testimonials = [
  { name: "Priya M.", text: "This changed my entire approach to spiritual healing. The remedies are practical and actually work. I've recommended it to all my friends.", rating: 5, location: "Mumbai, India" },
  { name: "Sarah K.", text: "I was skeptical at first, but the astrology guide was incredibly accurate. The cosmic calendar has become part of my daily routine.", rating: 5, location: "Austin, TX" },
  { name: "Ananya R.", text: "Beautifully designed and so easy to follow. The crystal healing manual is now my go-to reference. Worth every penny.", rating: 5, location: "Bangalore, India" },
  { name: "Jessica L.", text: "Instant delivery and the content quality is amazing. Sia really knows her stuff. The chakra system guide transformed my meditation practice.", rating: 5, location: "London, UK" },
  { name: "Meera D.", text: "The numerology guide helped me understand so much about myself. Simple, clear, and deeply insightful.", rating: 4, location: "Delhi, India" },
  { name: "Emma W.", text: "I bought the bundle and it's the best investment I've made in my spiritual journey. Highly recommend!", rating: 5, location: "Sydney, AU" },
];

export const getProductById = (id: string) => products.find((product) => product.id === id);
