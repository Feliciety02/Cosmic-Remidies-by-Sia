import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const badgeStyles: Record<string, string> = {
  completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  draft: "border-slate-200 bg-slate-100 text-slate-700",
  refunded: "border-red-200 bg-red-50 text-red-700",
  "best seller": "border-primary/20 bg-primary/10 text-primary",
  new: "border-amber-200 bg-amber-50 text-amber-700",
};

export const StatusBadge = ({ status }: { status: string }) => (
  <Badge
    variant="outline"
    className={cn("whitespace-nowrap border font-medium", badgeStyles[status.toLowerCase()] ?? "bg-muted text-foreground")}
  >
    {status}
  </Badge>
);
