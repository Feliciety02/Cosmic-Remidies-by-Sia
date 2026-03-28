"use client";

import Link from "next/link";
import { ArrowUpRight, DollarSign, Download, TrendingUp, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { products } from "@/data/products";

const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 7200 },
  { month: "Apr", revenue: 6100 },
  { month: "May", revenue: 8400 },
  { month: "Jun", revenue: 9200 },
  { month: "Jul", revenue: 7800 },
];

const recentOrders = [
  { id: "#CR-1042", customer: "Priya Sharma", product: products[1].title, amount: "$24.00", status: "Completed", date: "Mar 24" },
  { id: "#CR-1041", customer: "Amit Patel", product: products[6].title, amount: "$18.00", status: "Completed", date: "Mar 24" },
  { id: "#CR-1040", customer: "Sarah Johnson", product: products[4].title, amount: "$21.00", status: "Pending", date: "Mar 23" },
  { id: "#CR-1039", customer: "Ravi Kumar", product: products[11].title, amount: "$23.00", status: "Completed", date: "Mar 23" },
  { id: "#CR-1038", customer: "Maya Chen", product: products[19].title, amount: "$22.00", status: "Refunded", date: "Mar 22" },
];

const topProducts = [
  { name: products[0].title, sales: 160, revenue: "$3,040" },
  { name: products[1].title, sales: 154, revenue: "$3,696" },
  { name: products[16].title, sales: 121, revenue: "$2,541" },
  { name: products[4].title, sales: 118, revenue: "$2,478" },
];

const Dashboard = () => (
  <AdminLayout title="Dashboard" subtitle="Welcome back, Sia">
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="overflow-hidden rounded-[1.75rem] border-white/70 bg-[linear-gradient(135deg,rgba(41,92,145,0.96)_0%,rgba(65,124,177,0.94)_42%,rgba(215,235,248,0.94)_100%)] p-7 text-white shadow-[0_28px_90px_rgba(45,90,138,0.24)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">A cleaner control room for products, orders, and growth.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 md:text-base">
                Monitor sales trends, surface the strongest offers, and jump directly into the areas that need attention.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button asChild variant="secondary" className="rounded-xl border-0 bg-white text-slate-800 hover:bg-white/90">
                <Link href="/admin/orders">Review Orders</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-xl border border-white/25 bg-white/10 text-white hover:bg-white/15">
                <Link href="/admin/products">Manage Products</Link>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="rounded-[1.75rem] border-white/70 bg-white/90 p-6 shadow-[0_18px_52px_rgba(66,97,129,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/70">Today&apos;s focus</p>
          <div className="mt-5 space-y-4">
            {[
              { title: "Pending orders", value: "2", note: "Needs payment follow-up" },
              { title: "Draft products", value: "4", note: "Missing assets or copy" },
              { title: "Subscriber growth", value: "+23", note: "Compared with last week" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border/60 bg-slate-50/80 p-4">
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">{item.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <MetricCard title="Total Revenue" value="$24,580" change="+12.5% from last month" changeType="positive" icon={DollarSign} iconClassName="gradient-primary" />
        <MetricCard title="Total Downloads" value="1,247" change="+8.2% from last month" changeType="positive" icon={Download} iconClassName="gradient-gold" />
        <MetricCard title="Active Subscribers" value="386" change="+23 new this week" changeType="positive" icon={Users} />
        <MetricCard title="Conversion Rate" value="4.8%" change="+0.3% from last month" changeType="positive" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="rounded-[1.75rem] border-white/70 bg-white/90 p-6 shadow-[0_18px_52px_rgba(66,97,129,0.08)] lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Revenue Overview</h2>
            <select className="rounded-xl border border-border/70 bg-slate-50 px-3 py-2 text-sm text-foreground">
              <option>Last 7 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 15% 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(200 10% 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(200 10% 50%)" />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="hsl(170 45% 40%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="rounded-[1.75rem] border-white/70 bg-white/90 p-6 shadow-[0_18px_52px_rgba(66,97,129,0.08)]">
          <h2 className="mb-4 text-lg font-semibold">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.name} className="flex items-center justify-between rounded-2xl border border-border/70 bg-slate-50/70 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                </div>
                <p className="text-sm font-semibold text-primary">{product.revenue}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="rounded-[1.75rem] border-white/70 bg-white/90 p-6 shadow-[0_18px_52px_rgba(66,97,129,0.08)]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Link href="/admin/orders" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/70 text-muted-foreground">
                <th className="py-3 pr-4 text-left font-medium">Order</th>
                <th className="py-3 pr-4 text-left font-medium">Customer</th>
                <th className="hidden py-3 pr-4 text-left font-medium md:table-cell">Product</th>
                <th className="py-3 pr-4 text-left font-medium">Amount</th>
                <th className="py-3 pr-4 text-left font-medium">Status</th>
                <th className="hidden py-3 text-left font-medium sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 transition-colors hover:bg-slate-50/80">
                  <td className="py-3 pr-4 font-medium">{order.id}</td>
                  <td className="py-3 pr-4">{order.customer}</td>
                  <td className="hidden py-3 pr-4 text-muted-foreground md:table-cell">{order.product}</td>
                  <td className="py-3 pr-4 font-semibold">{order.amount}</td>
                  <td className="py-3 pr-4"><StatusBadge status={order.status} /></td>
                  <td className="hidden py-3 text-muted-foreground sm:table-cell">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  </AdminLayout>
);

export default Dashboard;
