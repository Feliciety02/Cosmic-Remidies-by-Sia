"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  page: number;
  pageSize: number;
  totalItems: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
}

export const PaginationControls = ({
  page,
  pageSize,
  totalItems,
  itemLabel = "items",
  onPageChange,
}: PaginationControlsProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, totalItems);

  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((pageNumber) => {
    return pageNumber === 1 || pageNumber === totalPages || Math.abs(pageNumber - safePage) <= 1;
  });

  const compactPages = visiblePages.reduce<Array<number | "ellipsis">>((items, pageNumber, index) => {
    const previousPage = visiblePages[index - 1];

    if (previousPage && pageNumber - previousPage > 1) {
      items.push("ellipsis");
    }

    items.push(pageNumber);
    return items;
  }, []);

  return (
    <div className="flex flex-col gap-3 border-t border-border/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="text-sm text-muted-foreground">
        Showing {start}-{end} of {totalItems} {itemLabel}
      </p>

      <div className="flex items-center gap-1.5">
        <Button variant="outline" size="sm" onClick={() => onPageChange(safePage - 1)} disabled={safePage === 1}>
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>

        {compactPages.map((item, index) =>
          item === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="px-2 text-sm text-muted-foreground">
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={cn(
                "flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors",
                item === safePage
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-background text-foreground/80 hover:border-primary/30 hover:bg-primary/5",
              )}
            >
              {item}
            </button>
          ),
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(safePage + 1)}
          disabled={safePage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
