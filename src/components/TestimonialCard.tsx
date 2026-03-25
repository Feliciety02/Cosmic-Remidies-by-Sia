import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
  location?: string;
}

const TestimonialCard = ({ name, text, rating, location }: TestimonialCardProps) => (
  <div className="bg-card rounded-lg border p-6">
    <div className="flex gap-1 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-accent text-accent" : "text-border"}`} />
      ))}
    </div>
    <p className="text-sm text-foreground/80 mb-4 leading-relaxed">"{text}"</p>
    <div>
      <p className="text-sm font-semibold">{name}</p>
      {location && <p className="text-xs text-muted-foreground">{location}</p>}
    </div>
  </div>
);

export default TestimonialCard;
