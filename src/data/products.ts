import type { StaticImageData } from "next/image";

import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

const productImages = [product1, product2, product3, product4, product5, product6];

const getProductImage = (index: number) => productImages[index % productImages.length];

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
    image: getProductImage(0),
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
    image: getProductImage(1),
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
    image: getProductImage(2),
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
    image: getProductImage(3),
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
    image: getProductImage(4),
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
    image: getProductImage(5),
    rating: 4,
    category: "Numerology",
    bullets: ["Personal number calculator", "Life path analysis", "Lucky numbers guide", "Name numerology secrets"],
  },
  {
    id: "moon-rituals-almanac",
    title: "Moon Rituals & Lunar Almanac",
    description: "Work with each moon phase using guided rituals, journaling prompts, and intention-setting practices for emotional reset.",
    price: 18,
    originalPrice: 36,
    image: getProductImage(0),
    rating: 5,
    badge: "Featured",
    category: "Rituals",
    bullets: ["New moon and full moon rituals", "Monthly lunar planner", "Manifestation journaling prompts", "Ritual supply checklist"],
  },
  {
    id: "aura-cleansing-handbook",
    title: "Aura Cleansing & Protection Handbook",
    description: "Learn to clear stagnant energy, protect your field, and build grounding rituals for everyday spiritual hygiene.",
    price: 16,
    originalPrice: 32,
    image: getProductImage(1),
    rating: 5,
    category: "Healing",
    bullets: ["Energy clearing techniques", "Protection visualizations", "Salt, smoke, and sound rituals", "Weekly reset routine"],
  },
  {
    id: "tarot-intuition-workbook",
    title: "Tarot Intuition Workbook",
    description: "Build a deeper relationship with tarot through intuitive spreads, symbolism prompts, and interpretation exercises.",
    price: 20,
    originalPrice: 38,
    image: getProductImage(2),
    rating: 4,
    category: "Divination",
    bullets: ["22 guided tarot spreads", "Card interpretation journal pages", "Intuition-strengthening prompts", "Beginner-friendly reading tips"],
  },
  {
    id: "divine-feminine-healing",
    title: "Divine Feminine Healing Codes",
    description: "Reconnect with softness, magnetism, and emotional wisdom through rituals and embodiment practices.",
    price: 22,
    originalPrice: 44,
    image: getProductImage(3),
    rating: 5,
    badge: "Popular",
    category: "Healing",
    bullets: ["Embodiment rituals", "Heart-opening practices", "Inner child reflection prompts", "Sacred self-devotion routines"],
  },
  {
    id: "manifestation-journal",
    title: "Manifestation Journal & Alignment Planner",
    description: "A structured manifestation system combining clarity prompts, energetic alignment exercises, and weekly tracking pages.",
    price: 15,
    originalPrice: 30,
    image: getProductImage(4),
    rating: 4,
    category: "Manifestation",
    bullets: ["90-day manifestation planner", "Limiting belief prompts", "Weekly aligned action tracker", "Vision scripting templates"],
  },
  {
    id: "karmic-relationship-insights",
    title: "Karmic Relationship Insights Guide",
    description: "Decode recurring relationship lessons, soul contracts, and compatibility dynamics through a spiritual lens.",
    price: 23,
    originalPrice: 46,
    image: getProductImage(5),
    rating: 5,
    category: "Relationships",
    bullets: ["Soulmate vs karmic patterns", "Attachment and healing prompts", "Compatibility reflection worksheets", "Cord-cutting ritual guidance"],
  },
  {
    id: "vastu-home-harmony",
    title: "Vastu Shastra for Home Harmony",
    description: "Create a more supportive home environment using Vastu placement principles adapted for modern living spaces.",
    price: 19,
    originalPrice: 37,
    image: getProductImage(0),
    rating: 4,
    category: "Vastu",
    bullets: ["Room-by-room Vastu checklist", "Directional remedies guide", "Desk and workspace alignment", "Rental-friendly corrections"],
  },
  {
    id: "dream-symbols-oracle",
    title: "Dream Symbols & Oracle Meanings",
    description: "Interpret recurring dreams and intuitive symbols with a practical guide to spiritual messages and subconscious patterns.",
    price: 17,
    originalPrice: 33,
    image: getProductImage(1),
    rating: 4,
    category: "Dreamwork",
    bullets: ["100+ dream symbol interpretations", "Dream journal prompts", "Sleep ritual support", "Intuition recall techniques"],
  },
  {
    id: "mercury-retrograde-survival",
    title: "Mercury Retrograde Survival Kit",
    description: "Navigate retrogrades with clarity using communication resets, tech backup rituals, and practical reflection prompts.",
    price: 13,
    originalPrice: 26,
    image: getProductImage(2),
    rating: 4,
    badge: "Seasonal",
    category: "Astrology",
    bullets: ["Retrograde prep checklist", "Communication reset rituals", "Mercury journal prompts", "Transit survival quick guide"],
  },
  {
    id: "shadow-work-companion",
    title: "Shadow Work Companion Journal",
    description: "A thoughtful workbook for self-inquiry, healing triggers, and integrating the parts of yourself you usually avoid.",
    price: 18,
    originalPrice: 35,
    image: getProductImage(3),
    rating: 5,
    category: "Self-Discovery",
    bullets: ["30 shadow prompts", "Trigger mapping exercises", "Emotional processing pages", "Integration reflections"],
  },
  {
    id: "planetary-protection-rituals",
    title: "Planetary Protection Rituals",
    description: "Daily and weekly rituals designed to stabilize your energy and invite planetary support for peace, focus, and strength.",
    price: 21,
    originalPrice: 41,
    image: getProductImage(4),
    rating: 5,
    badge: "Featured",
    category: "Rituals",
    bullets: ["Planet-by-planet ritual guide", "Protection altar setup", "Day-of-week spiritual practices", "Prayer and offering templates"],
  },
  {
    id: "akashic-records-primer",
    title: "Akashic Records Primer",
    description: "An accessible introduction to Akashic records work with grounding practices, opening prayers, and reflection prompts.",
    price: 25,
    originalPrice: 48,
    image: getProductImage(5),
    rating: 4,
    category: "Intuition",
    bullets: ["Opening and closing process", "Protective grounding routine", "Questions to ask the records", "Integration journaling pages"],
  },
  {
    id: "sacred-mantras-collection",
    title: "Sacred Mantras & Chanting Collection",
    description: "Use mantra practice for calm, focus, devotion, and abundance with pronunciation notes and chanting sequences.",
    price: 14,
    originalPrice: 28,
    image: getProductImage(0),
    rating: 5,
    category: "Mantras",
    bullets: ["40 sacred mantras", "Pronunciation support", "Morning and evening chanting sets", "Intention-based mantra index"],
  },
  {
    id: "sound-healing-essentials",
    title: "Sound Healing Essentials",
    description: "Explore singing bowls, frequencies, and simple sound rituals to regulate the nervous system and clear emotional heaviness.",
    price: 22,
    originalPrice: 43,
    image: getProductImage(1),
    rating: 4,
    badge: "New",
    category: "Healing",
    bullets: ["Frequency guide by intention", "Singing bowl basics", "Home sound bath structure", "Grounding and integration tips"],
  },
];

export const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];

export const testimonials = [
  { name: "Priya M.", text: "This changed my entire approach to spiritual healing. The remedies are practical and actually work. I've recommended it to all my friends.", rating: 5, location: "Mumbai, India" },
  { name: "Sarah K.", text: "I was skeptical at first, but the astrology guide was incredibly accurate. The cosmic calendar has become part of my daily routine.", rating: 5, location: "Austin, TX" },
  { name: "Ananya R.", text: "Beautifully designed and so easy to follow. The crystal healing manual is now my go-to reference. Worth every penny.", rating: 5, location: "Bangalore, India" },
  { name: "Jessica L.", text: "Instant delivery and the content quality is amazing. Sia really knows her stuff. The chakra system guide transformed my meditation practice.", rating: 5, location: "London, UK" },
  { name: "Meera D.", text: "The numerology guide helped me understand so much about myself. Simple, clear, and deeply insightful.", rating: 4, location: "Delhi, India" },
  { name: "Emma W.", text: "I bought the bundle and it's the best investment I've made in my spiritual journey. Highly recommend!", rating: 5, location: "Sydney, AU" },
];

export const getProductById = (id: string) => products.find((product) => product.id === id);
