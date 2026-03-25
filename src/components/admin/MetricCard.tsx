import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconClassName?: string;
}

export const MetricCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconClassName,
}: MetricCardProps) => (
  <Card className="p-5">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="mt-2 text-2xl font-semibold">{value}</p>
      </div>
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary",
          iconClassName,
          iconClassName?.includes("gradient") ? "text-primary-foreground" : "",
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
    </div>

    <div className="mt-4 flex items-center gap-2 text-sm">
      {changeType === "positive" ? <ArrowUpRight className="h-4 w-4 text-emerald-600" /> : null}
      {changeType === "negative" ? <ArrowDownRight className="h-4 w-4 text-red-600" /> : null}
      <span
        className={cn(
          changeType === "positive" && "text-emerald-700",
          changeType === "negative" && "text-red-700",
          changeType === "neutral" && "text-muted-foreground",
        )}
      >
        {change}
      </span>
    </div>
  </Card>
);
