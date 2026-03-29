"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  Mail,
  RefreshCcw,
  Send,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ADMIN_ORDERS_STORAGE_KEY, readAdminOrders, type AdminOrderRecord } from "@/lib/admin-store";
import { CHECKOUT_ORDER_HISTORY_STORAGE_KEY, readOrderHistory } from "@/lib/checkout";

const timelineIconMap: Record<string, ReactNode> = {
  cart: <CheckCircle2 className="h-4 w-4 text-primary" />,
  payment: <CreditCard className="h-4 w-4 text-emerald-600" />,
  delivered: <Send className="h-4 w-4 text-primary" />,
  download: <Download className="h-4 w-4 text-primary" />,
  pending: <Clock className="h-4 w-4 text-amber-600" />,
  refund: <AlertTriangle className="h-4 w-4 text-destructive" />,
  "refund-done": <RefreshCcw className="h-4 w-4 text-destructive" />,
};

const OrderDetail = () => {
  const params = useParams<{ orderId: string }>();
  const router = useRouter();
  const [refundReason, setRefundReason] = useState("");
  const [refundOpen, setRefundOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [orders, setOrders] = useState<AdminOrderRecord[]>([]);
  const orderId = params?.orderId;
  const resolvedOrderId = Array.isArray(orderId) ? orderId[0] : orderId;

  useEffect(() => {
    const checkoutOrders = readOrderHistory(window.localStorage.getItem(CHECKOUT_ORDER_HISTORY_STORAGE_KEY));
    const nextOrders = readAdminOrders(window.localStorage.getItem(ADMIN_ORDERS_STORAGE_KEY), checkoutOrders);
    setOrders(nextOrders);
    window.localStorage.setItem(ADMIN_ORDERS_STORAGE_KEY, JSON.stringify(nextOrders));
  }, []);

  const order = useMemo(() => orders.find((entry) => entry.slug === (resolvedOrderId ?? "")), [orders, resolvedOrderId]);

  const persistOrders = (nextOrders: AdminOrderRecord[]) => {
    setOrders(nextOrders);
    window.localStorage.setItem(ADMIN_ORDERS_STORAGE_KEY, JSON.stringify(nextOrders));
  };

  if (orders.length === 0) {
    return (
      <AdminLayout title="Loading Order" subtitle="">
        <div className="py-20 text-center text-muted-foreground">Loading order details...</div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout title="Order Not Found" subtitle="">
        <div className="py-20 text-center">
          <p className="mb-4 text-muted-foreground">This order could not be found.</p>
          <Button variant="outline" onClick={() => router.push("/admin/orders")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const handleRefund = () => {
    const timestamp = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date());

    const nextOrders = orders.map((entry) =>
      entry.slug === order.slug
        ? {
            ...entry,
            status: "Refunded",
            timeline: [
              { event: refundReason ? `Refund requested: ${refundReason}` : "Refund requested", date: timestamp, icon: "refund" },
              { event: "Refund processed", date: timestamp, icon: "refund-done" },
              ...entry.timeline,
            ],
          }
        : entry,
    );

    persistOrders(nextOrders);
    toast.success(`Refund completed for ${order.id}.`);
    setRefundOpen(false);
    setRefundReason("");
  };

  const handleResendEmail = () => {
    const timestamp = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date());

    persistOrders(
      orders.map((entry) =>
        entry.slug === order.slug
          ? {
              ...entry,
              timeline: [{ event: "Download link resent", date: timestamp, icon: "delivered" }, ...entry.timeline],
            }
          : entry,
      ),
    );
    toast.success(`Download link resent to ${order.email}`);
  };

  const handleInvoice = () => {
    const invoiceLines = [
      `Invoice ${order.id}`,
      `Customer: ${order.customer}`,
      `Email: ${order.email}`,
      `Date: ${order.date}`,
      "",
      ...order.items.map((item) => `${item.name} x${item.qty} - ${item.price}`),
      "",
      `Subtotal: ${order.subtotal}`,
      `Tax: ${order.tax}`,
      `Total: ${order.total}`,
    ].join("\n");

    const blob = new Blob([invoiceLines], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${order.slug}-invoice.txt`;
    link.click();
    URL.revokeObjectURL(url);

    persistOrders(
      orders.map((entry) =>
        entry.slug === order.slug
          ? {
              ...entry,
              timeline: [{ event: "Invoice generated", date: order.date, icon: "download" }, ...entry.timeline],
            }
          : entry,
      ),
    );
    toast.success(`Invoice downloaded for ${order.id}`);
    setInvoiceOpen(false);
  };

  return (
    <AdminLayout title={`Order ${order.id}`} subtitle={`Placed on ${order.date}`}>
      <div className="space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Button variant="ghost" onClick={() => router.push("/admin/orders")} className="-ml-2 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={handleResendEmail}>
              <Mail className="h-4 w-4" />
              Resend Email
            </Button>
            <Dialog open={invoiceOpen} onOpenChange={setInvoiceOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Invoice
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Prepare Invoice</DialogTitle>
                  <DialogDescription>Generate an invoice copy for {order.id} and send it to the customer if needed.</DialogDescription>
                </DialogHeader>
                <div className="rounded-xl border bg-secondary/40 p-4 text-sm">
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-muted-foreground">{order.email}</p>
                  <p className="mt-2 text-muted-foreground">
                    Total {order.total} via {order.payment}
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setInvoiceOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInvoice}>Generate Invoice</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {order.status !== "Refunded" ? (
              <Dialog open={refundOpen} onOpenChange={setRefundOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/5">
                    <RefreshCcw className="h-4 w-4" />
                    Refund
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Process Refund</DialogTitle>
                    <DialogDescription>
                      Refund {order.total} to {order.customer} via {order.payment}. This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Reason (optional)</label>
                    <Textarea
                      placeholder="Enter reason for refund..."
                      value={refundReason}
                      onChange={(event) => setRefundReason(event.target.value)}
                      className="border-0 bg-secondary"
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setRefundOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleRefund}>Confirm Refund</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Purchased Items</h2>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between border-b border-border/50 py-3 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                        PDF
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.qty} - Digital PDF</p>
                      </div>
                    </div>
                    <span className="font-semibold">{item.price}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{order.subtotal}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>{order.tax}</span></div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-semibold"><span>Total</span><span className="text-primary">{order.total}</span></div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Timeline</h2>
              <div className="relative">
                <div className="absolute bottom-2 left-[17px] top-2 w-px bg-border" />
                <div className="space-y-5">
                  {order.timeline.map((event) => (
                    <div key={`${event.event}-${event.date}`} className="relative flex items-start gap-4">
                      <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-border bg-card">
                        {timelineIconMap[event.icon] ?? <CheckCircle2 className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <div className="pt-1.5">
                        <p className="text-sm font-medium">{event.event}</p>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-2 text-sm font-medium text-muted-foreground">Status</h2>
              <StatusBadge status={order.status} />
            </Card>

            <Card className="space-y-4 p-6">
              <h2 className="text-lg font-semibold">Customer</h2>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {order.customer.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-muted-foreground">{order.email}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3 text-sm">
                <div>
                  <p className="mb-0.5 text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{order.phone}</p>
                </div>
                <div>
                  <p className="mb-0.5 text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{order.address}</p>
                </div>
              </div>
            </Card>

            <Card className="space-y-3 p-6">
              <h2 className="text-lg font-semibold">Payment</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Method</span>
                  <span className="font-medium">{order.payment}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span className="font-mono text-xs">{order.paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-semibold text-primary">{order.total}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderDetail;
