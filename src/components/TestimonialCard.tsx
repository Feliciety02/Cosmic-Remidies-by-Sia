import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
  location?: string;
}

const TestimonialCard = ({ name, text, rating, location }: TestimonialCardProps) => (
  <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_rgba(87,68,38,0.07)] backdrop-blur-sm">
    <div className="mb-4 flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
      ))}
    </div>
    <p className="mb-5 text-sm leading-7 text-stone-600">"{text}"</p>
    <div>
      <p className="text-sm font-semibold text-stone-800">{name}</p>
      {location && <p className="text-xs uppercase tracking-[0.18em] text-stone-400">{location}</p>}
    </div>
  </div>
);

export default TestimonialCard;
