"use client";

import { useEffect, useState } from "react";
import TestimonialCard from "@/components/TestimonialCard";
import {
  ADMIN_TESTIMONIALS_STORAGE_KEY,
  initialTestimonials,
  readAdminTestimonials,
  type AdminTestimonial,
} from "@/lib/admin-store";

const sectionHeading = "mb-12 text-center";
const sectionEyebrow = "mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-sky-700";
const sectionTitle = "font-display text-3xl font-bold tracking-tight text-stone-800 md:text-4xl";
const sectionDescription = "mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-500";

interface HomeTestimonialsProps {
  eyebrow: string;
  title: string;
  description: string;
}

const HomeTestimonials = ({ eyebrow, title, description }: HomeTestimonialsProps) => {
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>(initialTestimonials);

  useEffect(() => {
    setTestimonials(readAdminTestimonials(window.localStorage.getItem(ADMIN_TESTIMONIALS_STORAGE_KEY)));
  }, []);

  return (
    <section className="bg-[linear-gradient(180deg,#f6f9fc_0%,#fbfcfe_100%)] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={sectionHeading}>
          <p className={sectionEyebrow}>{eyebrow}</p>
          <h2 className={sectionTitle}>{title}</h2>
          <p className={sectionDescription}>{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;
