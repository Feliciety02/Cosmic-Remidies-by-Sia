"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Filter, Search } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const orders = [
  { id: "#CR-1042", slug: "CR-1042", customer: "Priya Sharma", email: "priya@email.com", product: "Vedic Astrology Guide", amount: "$49.99", status: "Completed", date: "Mar 24, 2026", payment: "Paddle" },
  { id: "#CR-1041", slug: "CR-1041", customer: "Amit Patel", email: "amit@email.com", product: "Cosmic Healing Bundle", amount: "$89.99", status: "Completed", date: "Mar 24, 2026", payment: "PayPal" },
  { id: "#CR-1040", slug: "CR-1040", customer: "Sarah Johnson", email: "sarah@email.com", product: "Chakra Meditation PDF", amount: "$24.99", status: "Pending", date: "Mar 23, 2026", payment: "Paddle" },
  { id: "#CR-1039", slug: "CR-1039", customer: "Ravi Kumar", email: "ravi@email.com", product: "Numerology Masterclass", amount: "$59.99", status: "Completed", date: "Mar 23, 2026", payment: "Paddle" },
  { id: "#CR-1038", slug: "CR-1038", customer: "Maya Chen", email: "maya@email.com", product: "Crystal Healing Guide", amount: "$34.99", status: "Refunded", date: "Mar 22, 2026", payment: "PayPal" },
  { id: "#CR-1037", slug: "CR-1037", customer: "David Wilson", email: "david@email.com", product: "Vastu Shastra Essentials", amount: "$39.99", status: "Completed", date: "Mar 22, 2026", payment: "Paddle" },
  { id: "#CR-1036", slug: "CR-1036", customer: "Ananya Gupta", email: "ananya@email.com", product: "Vedic Astrology Guide", amount: "$49.99", status: "Completed", date: "Mar 21, 2026", payment: "Paddle" },
  { id: "#CR-1035", slug: "CR-1035", customer: "James Lee", email: "james@email.com", product: "Cosmic Healing Bundle", amount: "$89.99", status: "Pending", date: "Mar 21, 2026", payment: "PayPal" },
];

const Orders = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredOrders = activeFilter === "All" ? orders : orders.filter((order) => order.status === activeFilter);

  return (
    <AdminLayout title="Orders" subtitle="Track and manage all orders">
      <div className="space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search orders..." className="border-border bg-card pl-9" />
            </div>
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" className="gap-2 shrink-0">
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
              onClick={() => setActiveFilter(filter)}
              className={filter === activeFilter ? "gradient-primary text-primary-foreground" : ""}
            >
              {filter}
            </Button>
          ))}
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium">Order</th>
                  <th className="px-4 py-3 text-left font-medium">Customer</th>
                  <th className="hidden px-4 py-3 text-left font-medium lg:table-cell">Product</th>
                  <th className="px-4 py-3 text-left font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Payment</th>
                  <th className="hidden px-4 py-3 text-left font-medium sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => router.push(`/admin/orders/${order.slug}`)}
                    className="cursor-pointer border-b border-border/50 transition-colors hover:bg-muted/20"
                  >
                    <td className="px-4 py-3.5 font-medium text-primary">{order.id}</td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3.5 text-muted-foreground lg:table-cell">{order.product}</td>
                    <td className="px-4 py-3.5 font-semibold">{order.amount}</td>
                    <td className="px-4 py-3.5"><StatusBadge status={order.status} /></td>
                    <td className="hidden px-4 py-3.5 text-muted-foreground md:table-cell">{order.payment}</td>
                    <td className="hidden px-4 py-3.5 text-muted-foreground sm:table-cell">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Orders;
