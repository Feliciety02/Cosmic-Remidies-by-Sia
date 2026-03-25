"use client";

import { Download, Mail, Search, Users as UsersIcon } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const customers = [
  { name: "Priya Sharma", email: "priya@email.com", purchases: 5, spent: "$249.95", joined: "Jan 2026", lastPurchase: "Mar 24" },
  { name: "Amit Patel", email: "amit@email.com", purchases: 3, spent: "$179.97", joined: "Feb 2026", lastPurchase: "Mar 24" },
  { name: "Sarah Johnson", email: "sarah@email.com", purchases: 2, spent: "$74.98", joined: "Mar 2026", lastPurchase: "Mar 23" },
  { name: "Ravi Kumar", email: "ravi@email.com", purchases: 4, spent: "$209.96", joined: "Dec 2025", lastPurchase: "Mar 23" },
  { name: "Maya Chen", email: "maya@email.com", purchases: 1, spent: "$34.99", joined: "Mar 2026", lastPurchase: "Mar 22" },
  { name: "David Wilson", email: "david@email.com", purchases: 2, spent: "$89.98", joined: "Jan 2026", lastPurchase: "Mar 22" },
];

const subscribers = [
  { name: "Emily Brown", email: "emily@email.com", source: "Chakra Guide Lead Magnet", joined: "Mar 24, 2026" },
  { name: "Raj Mehta", email: "raj@email.com", source: "Numerology Free PDF", joined: "Mar 23, 2026" },
  { name: "Lisa Wang", email: "lisa@email.com", source: "Homepage Popup", joined: "Mar 22, 2026" },
  { name: "Vikram Singh", email: "vikram@email.com", source: "Chakra Guide Lead Magnet", joined: "Mar 21, 2026" },
  { name: "Anna Lee", email: "anna@email.com", source: "Blog Signup", joined: "Mar 20, 2026" },
];

const Customers = () => (
  <AdminLayout title="Customers" subtitle="Manage customers and subscribers">
    <Tabs defaultValue="customers" className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <TabsList className="bg-secondary">
          <TabsTrigger value="customers" className="gap-2">
            <UsersIcon className="h-4 w-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="subscribers" className="gap-2">
            <Mail className="h-4 w-4" />
            Subscribers
          </TabsTrigger>
        </TabsList>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search by name or email..." className="border-border bg-card pl-9" />
      </div>

      <TabsContent value="customers">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium">Customer</th>
                  <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Purchases</th>
                  <th className="px-4 py-3 text-left font-medium">Total Spent</th>
                  <th className="hidden px-4 py-3 text-left font-medium lg:table-cell">Joined</th>
                  <th className="hidden px-4 py-3 text-left font-medium sm:table-cell">Last Purchase</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.email} className="border-b border-border/50 transition-colors hover:bg-muted/20">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3.5 md:table-cell">{customer.purchases}</td>
                    <td className="px-4 py-3.5 font-semibold">{customer.spent}</td>
                    <td className="hidden px-4 py-3.5 text-muted-foreground lg:table-cell">{customer.joined}</td>
                    <td className="hidden px-4 py-3.5 text-muted-foreground sm:table-cell">{customer.lastPurchase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="subscribers">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium">Subscriber</th>
                  <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Source</th>
                  <th className="px-4 py-3 text-left font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.email} className="border-b border-border/50 transition-colors hover:bg-muted/20">
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="font-medium">{subscriber.name}</p>
                        <p className="text-xs text-muted-foreground">{subscriber.email}</p>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3.5 text-muted-foreground md:table-cell">{subscriber.source}</td>
                    <td className="px-4 py-3.5 text-muted-foreground">{subscriber.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  </AdminLayout>
);

export default Customers;
