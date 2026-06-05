"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Download, Filter, Search } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PaginationControls } from "@/components/admin/PaginationControls";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ADMIN_ORDERS_STORAGE_KEY,
  readAdminOrders,
} from "@/lib/admin-store";
import { CHECKOUT_ORDER_HISTORY_STORAGE_KEY, readOrderHistory } from "@/lib/checkout";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<ReturnType<typeof readAdminOrders>>([]);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [exportRange, setExportRange] = useState("current");

  useEffect(() => {
    const checkoutOrders = readOrderHistory(window.localStorage.getItem(CHECKOUT_ORDER_HISTORY_STORAGE_KEY));
    const nextOrders = readAdminOrders(window.localStorage.getItem(ADMIN_ORDERS_STORAGE_KEY), checkoutOrders);
    setOrders(nextOrders);
    window.localStorage.setItem(ADMIN_ORDERS_STORAGE_KEY, JSON.stringify(nextOrders));
  }, []);

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesFilter = activeFilter === "All" ? true : order.status === activeFilter;
      const matchesPayment = paymentFilter === "All" ? true : order.payment === paymentFilter;
      const matchesQuery =
        !normalizedQuery ||
        order.id.toLowerCase().includes(normalizedQuery) ||
        order.customer.toLowerCase().includes(normalizedQuery) ||
        order.email.toLowerCase().includes(normalizedQuery) ||
        order.items.some((item) => item.name.toLowerCase().includes(normalizedQuery));

      return matchesFilter && matchesPayment && matchesQuery;
    });
  }, [activeFilter, orders, paymentFilter, query]);

  const pageSize = 5;
  const paginatedOrders = filteredOrders.slice((page - 1) * pageSize, page * pageSize);

  const applyAdvancedFilter = () => {
    setPage(1);
    setFilterDialogOpen(false);
    toast.success(paymentFilter === "All" ? "Order filters updated." : `Order filters updated for ${paymentFilter} payments.`);
  };

  const exportOrders = () => {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    const exportRows =
      exportRange === "all"
        ? orders
        : exportRange === "month"
          ? orders.filter((order) => new Date(order.date).getTime() >= last30Days.getTime())
          : filteredOrders;

    const csv = [
      ["Order", "Customer", "Email", "Items", "Amount", "Status", "Payment", "Date"].join(","),
      ...exportRows.map((order) =>
        [
          order.id,
          `"${order.customer.replaceAll('"', '""')}"`,
          order.email,
          `"${order.items.map((item) => `${item.name} x${item.qty}`).join(" | ").replaceAll('"', '""')}"`,
          order.total,
          order.status,
          order.payment,
          `"${order.date}"`,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orders-${exportRange}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success(`Downloaded ${exportRows.length} order rows.`);
    setExportDialogOpen(false);
  };

  return (
    <AdminLayout title="Orders" subtitle="Track and manage all orders">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Total orders", value: orders.length, note: "Across all payment providers" },
            { label: "Completed", value: orders.filter((order) => order.status === "Completed").length, note: "Ready for fulfillment" },
            { label: "Pending or refunded", value: orders.filter((order) => order.status !== "Completed").length, note: "Needs review or follow-up" },
          ].map((item) => (
            <Card key={item.label} className="rounded-[1.5rem] border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(66,97,129,0.08)]">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{item.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="orders-search"
                name="ordersSearch"
                placeholder="Search orders..."
                className="border-white bg-white/90 pl-9"
                autoComplete="off"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
              />
            </div>
            <Button variant="outline" size="icon" className="shrink-0 rounded-xl border-white bg-white/90" onClick={() => setFilterDialogOpen(true)}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" className="shrink-0 gap-2 rounded-xl border-white bg-white/90" onClick={() => setExportDialogOpen(true)}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", "Completed", "Pending", "Refunded"].map((filter) => (
            <Button
              key={filter}
              variant={filter === activeFilter ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setActiveFilter(filter);
                setPage(1);
              }}
              className={filter === activeFilter ? "gradient-primary text-primary-foreground" : ""}
            >
              {filter}
            </Button>
          ))}
        </div>

        <Card className="overflow-hidden rounded-[1.75rem] border-white/70 bg-white/90 shadow-[0_18px_52px_rgba(66,97,129,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium">Order</th>
                  <th className="px-4 py-3 text-left font-medium">Customer</th>
                  <th className="hidden px-4 py-3 text-left font-medium lg:table-cell">Items</th>
                  <th className="px-4 py-3 text-left font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Payment</th>
                  <th className="hidden px-4 py-3 text-left font-medium sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => router.push(`/admin/orders/${order.slug}`)}
                    className="cursor-pointer border-b border-border/50 transition-colors hover:bg-slate-50/70"
                  >
                    <td className="px-4 py-3.5 font-medium text-primary">{order.id}</td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3.5 text-muted-foreground lg:table-cell">{order.items.map((item) => item.name).join(", ")}</td>
                    <td className="px-4 py-3.5 font-semibold">{order.total}</td>
                    <td className="px-4 py-3.5"><StatusBadge status={order.status} /></td>
                    <td className="hidden px-4 py-3.5 text-muted-foreground md:table-cell">{order.payment}</td>
                    <td className="hidden px-4 py-3.5 text-muted-foreground sm:table-cell">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationControls
            page={page}
            pageSize={pageSize}
            totalItems={filteredOrders.length}
            itemLabel="orders"
            onPageChange={setPage}
          />
        </Card>
      </div>

      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Advanced Filters</DialogTitle>
            <DialogDescription>Refine the orders table by payment provider.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label>Payment method</Label>
            <div className="flex flex-col gap-2">
              {["All", "Paddle", "PayPal"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPaymentFilter(option)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    paymentFilter === option ? "border-primary bg-primary/5 text-primary" : "border-border bg-background"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFilterDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={applyAdvancedFilter}>Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Orders</DialogTitle>
            <DialogDescription>Choose the export scope for your CSV download.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label>Export range</Label>
            <div className="flex flex-col gap-2">
              {[
                { value: "current", label: "Current filtered results" },
                { value: "month", label: "Last 30 days" },
                { value: "all", label: "All orders" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setExportRange(option.value)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    exportRange === option.value ? "border-primary bg-primary/5 text-primary" : "border-border bg-background"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={exportOrders}>Prepare CSV</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Orders;
