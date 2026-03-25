"use client";

import { DollarSign, Eye, MousePointerClick, TrendingUp } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { Card } from "@/components/ui/card";

const revenueTimeline = [
  { date: "Week 1", revenue: 2400, leads: 45 },
  { date: "Week 2", revenue: 3200, leads: 62 },
  { date: "Week 3", revenue: 4800, leads: 78 },
  { date: "Week 4", revenue: 3900, leads: 55 },
];

const categoryData = [
  { name: "Astrology", value: 35, color: "hsl(170 45% 40%)" },
  { name: "Healing", value: 28, color: "hsl(42 60% 55%)" },
  { name: "Meditation", value: 20, color: "hsl(195 50% 35%)" },
  { name: "Numerology", value: 17, color: "hsl(200 25% 60%)" },
];

const conversionData = [
  { stage: "Visitors", count: 12400 },
  { stage: "Lead Signups", count: 1860 },
  { stage: "Purchases", count: 596 },
];

const Analytics = () => (
  <AdminLayout title="Analytics" subtitle="Track your performance metrics">
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <MetricCard title="Monthly Revenue" value="$9,200" change="+18% vs last month" changeType="positive" icon={DollarSign} iconClassName="gradient-primary" />
        <MetricCard title="Page Views" value="12,400" change="+24% vs last month" changeType="positive" icon={Eye} />
        <MetricCard title="Click Rate" value="15.2%" change="+2.1% vs last month" changeType="positive" icon={MousePointerClick} />
        <MetricCard title="Lead Magnet CVR" value="15%" change="+3% vs last month" changeType="positive" icon={TrendingUp} iconClassName="gradient-gold" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-6 text-lg font-semibold">Revenue and Leads Trend</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueTimeline}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(170 45% 40%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(170 45% 40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 15% 90%)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(200 10% 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(200 10% 50%)" />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(170 45% 40%)" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="mb-6 text-lg font-semibold">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value">
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                <span className="text-muted-foreground">
                  {category.name} ({category.value}%)
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="mb-6 text-lg font-semibold">Conversion Funnel</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={conversionData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 15% 90%)" />
            <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(200 10% 50%)" />
            <YAxis dataKey="stage" type="category" tick={{ fontSize: 12 }} stroke="hsl(200 10% 50%)" width={100} />
            <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} />
            <Bar dataKey="count" fill="hsl(170 45% 40%)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </AdminLayout>
);

export default Analytics;
