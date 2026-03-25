"use client";

import { useState, type ReactNode } from "react";
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

const orderData: Record<
  string,
  {
    id: string;
    customer: string;
    email: string;
    phone: string;
    address: string;
    items: { name: string; qty: number; price: string }[];
    subtotal: string;
    tax: string;
    total: string;
    status: string;
    payment: string;
    paymentId: string;
    date: string;
    timeline: { event: string; date: string; icon: string }[];
  }
> = {
  "CR-1042": {
    id: "#CR-1042",
    customer: "Priya Sharma",
    email: "priya@email.com",
    phone: "+91 98765 43210",
    address: "Mumbai, Maharashtra, India",
    items: [{ name: "Vedic Astrology Guide", qty: 1, price: "$49.99" }],
    subtotal: "$49.99",
    tax: "$0.00",
    total: "$49.99",
    status: "Completed",
    payment: "Paddle",
    paymentId: "txn_3a8f2k9x",
    date: "Mar 24, 2026",
    timeline: [
      { event: "Order placed", date: "Mar 24, 10:23 AM", icon: "cart" },
      { event: "Payment confirmed", date: "Mar 24, 10:24 AM", icon: "payment" },
      { event: "PDF delivered via email", date: "Mar 24, 10:25 AM", icon: "delivered" },
      { event: "Download link accessed", date: "Mar 24, 11:02 AM", icon: "download" },
    ],
  },
  "CR-1041": {
    id: "#CR-1041",
    customer: "Amit Patel",
    email: "amit@email.com",
    phone: "+91 91234 56789",
    address: "Ahmedabad, Gujarat, India",
    items: [{ name: "Cosmic Healing Bundle", qty: 1, price: "$89.99" }],
    subtotal: "$89.99",
    tax: "$0.00",
    total: "$89.99",
    status: "Completed",
    payment: "PayPal",
    paymentId: "pp_9x2k4m1b",
    date: "Mar 24, 2026",
    timeline: [
      { event: "Order placed", date: "Mar 24, 09:15 AM", icon: "cart" },
      { event: "Payment confirmed", date: "Mar 24, 09:16 AM", icon: "payment" },
      { event: "PDF delivered via email", date: "Mar 24, 09:17 AM", icon: "delivered" },
    ],
  },
  "CR-1040": {
    id: "#CR-1040",
    customer: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "+1 555 234 5678",
    address: "Austin, TX, USA",
    items: [{ name: "Chakra Meditation PDF", qty: 1, price: "$24.99" }],
    subtotal: "$24.99",
    tax: "$0.00",
    total: "$24.99",
    status: "Pending",
    payment: "Paddle",
    paymentId: "txn_7b3d5f2a",
    date: "Mar 23, 2026",
    timeline: [
      { event: "Order placed", date: "Mar 23, 03:45 PM", icon: "cart" },
      { event: "Awaiting payment confirmation", date: "Mar 23, 03:45 PM", icon: "pending" },
    ],
  },
  "CR-1038": {
    id: "#CR-1038",
    customer: "Maya Chen",
    email: "maya@email.com",
    phone: "+1 555 876 5432",
    address: "San Francisco, CA, USA",
    items: [{ name: "Crystal Healing Guide", qty: 1, price: "$34.99" }],
    subtotal: "$34.99",
    tax: "$0.00",
    total: "$34.99",
    status: "Refunded",
    payment: "PayPal",
    paymentId: "pp_4n8m2x1c",
    date: "Mar 22, 2026",
    timeline: [
      { event: "Order placed", date: "Mar 22, 11:30 AM", icon: "cart" },
      { event: "Payment confirmed", date: "Mar 22, 11:31 AM", icon: "payment" },
      { event: "PDF delivered via email", date: "Mar 22, 11:32 AM", icon: "delivered" },
      { event: "Refund requested", date: "Mar 22, 04:15 PM", icon: "refund" },
      { event: "Refund processed", date: "Mar 23, 09:00 AM", icon: "refund-done" },
    ],
  },
};

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
  const orderId = params?.orderId;
  const resolvedOrderId = Array.isArray(orderId) ? orderId[0] : orderId;
  const order = orderData[resolvedOrderId ?? ""];

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
    toast.success(`Refund initiated for ${order.id}${refundReason ? "." : "."}`);
    setRefundOpen(false);
    setRefundReason("");
  };

  const handleResendEmail = () => {
    toast.success(`Download link resent to ${order.email}`);
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
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Invoice
            </Button>
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
