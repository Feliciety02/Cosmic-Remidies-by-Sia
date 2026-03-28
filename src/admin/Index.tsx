"use client";

import Link from "next/link";
import { ArrowUpRight, DollarSign, Download, TrendingUp, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <MetricCard title="Total Revenue" value="$24,580" change="+12.5% from last month" changeType="positive" icon={DollarSign} iconClassName="gradient-primary" />
        <MetricCard title="Total Downloads" value="1,247" change="+8.2% from last month" changeType="positive" icon={Download} iconClassName="gradient-gold" />
        <MetricCard title="Active Subscribers" value="386" change="+23 new this week" changeType="positive" icon={Users} />
        <MetricCard title="Conversion Rate" value="4.8%" change="+0.3% from last month" changeType="positive" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Revenue Overview</h2>
            <select className="rounded-lg border-0 bg-secondary px-3 py-1.5 text-sm text-foreground">
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

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.name} className="flex items-center justify-between border-b py-2 last:border-0">
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

      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Link href="/admin/orders" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
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
                <tr key={order.id} className="border-b border-border/50 transition-colors hover:bg-muted/30">
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
