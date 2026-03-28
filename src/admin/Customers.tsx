"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Download, Mail, Search, Users as UsersIcon } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PaginationControls } from "@/components/admin/PaginationControls";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const Customers = () => {
  const [query, setQuery] = useState("");
  const [customerPage, setCustomerPage] = useState(1);
  const [subscriberPage, setSubscriberPage] = useState(1);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportTarget, setExportTarget] = useState<"customers" | "subscribers" | "all">("all");

  const filteredCustomers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return customers.filter((customer) => {
      return !normalizedQuery || customer.name.toLowerCase().includes(normalizedQuery) || customer.email.toLowerCase().includes(normalizedQuery);
    });
  }, [query]);

  const filteredSubscribers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return subscribers.filter((subscriber) => {
      return (
        !normalizedQuery ||
        subscriber.name.toLowerCase().includes(normalizedQuery) ||
        subscriber.email.toLowerCase().includes(normalizedQuery) ||
        subscriber.source.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query]);

  const customerPageSize = 4;
  const subscriberPageSize = 4;
  const paginatedCustomers = filteredCustomers.slice((customerPage - 1) * customerPageSize, customerPage * customerPageSize);
  const paginatedSubscribers = filteredSubscribers.slice((subscriberPage - 1) * subscriberPageSize, subscriberPage * subscriberPageSize);

  const handleExport = () => {
    const labels = {
      customers: "customers",
      subscribers: "subscribers",
      all: "customers and subscribers",
    };

    toast.success(`Prepared export for ${labels[exportTarget]}.`);
    setExportOpen(false);
  };

  return (
    <AdminLayout title="Customers" subtitle="Manage customers and subscribers">
      <Tabs defaultValue="customers" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Customers", value: customers.length, note: "Recorded buyer accounts" },
            { label: "Subscribers", value: subscribers.length, note: "Lead magnet and newsletter signups" },
            { label: "Repeat buyers", value: customers.filter((customer) => customer.purchases > 1).length, note: "Strongest retention segment" },
          ].map((item) => (
            <Card key={item.label} className="rounded-[1.5rem] border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(66,97,129,0.08)]">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{item.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
            </Card>
          ))}
        </div>

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <TabsList className="h-auto rounded-2xl border border-white/70 bg-white/90 p-1.5 shadow-sm">
          <TabsTrigger value="customers" className="gap-2">
            <UsersIcon className="h-4 w-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="subscribers" className="gap-2">
            <Mail className="h-4 w-4" />
            Subscribers
          </TabsTrigger>
        </TabsList>
        <Button variant="outline" className="gap-2 rounded-xl border-white bg-white/90" onClick={() => setExportOpen(true)}>
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="customers-search"
          name="customersSearch"
          placeholder="Search by name or email..."
          className="border-white bg-white/90 pl-9"
          autoComplete="off"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setCustomerPage(1);
            setSubscriberPage(1);
          }}
        />
      </div>

      <TabsContent value="customers">
        <Card className="overflow-hidden rounded-[1.75rem] border-white/70 bg-white/90 shadow-[0_18px_52px_rgba(66,97,129,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium">Customer</th>
                  <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Purchases</th>
                  <th className="px-4 py-3 text-left font-medium">Total Spent</th>
                  <th className="hidden px-4 py-3 text-left font-medium lg:table-cell">Joined</th>
                  <th className="hidden px-4 py-3 text-left font-medium sm:table-cell">Last Purchase</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((customer) => (
                  <tr key={customer.email} className="border-b border-border/50 transition-colors hover:bg-slate-50/70">
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
          <PaginationControls
            page={customerPage}
            pageSize={customerPageSize}
            totalItems={filteredCustomers.length}
            itemLabel="customers"
            onPageChange={setCustomerPage}
          />
        </Card>
      </TabsContent>

      <TabsContent value="subscribers">
        <Card className="overflow-hidden rounded-[1.75rem] border-white/70 bg-white/90 shadow-[0_18px_52px_rgba(66,97,129,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium">Subscriber</th>
                  <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Source</th>
                  <th className="px-4 py-3 text-left font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSubscribers.map((subscriber) => (
                  <tr key={subscriber.email} className="border-b border-border/50 transition-colors hover:bg-slate-50/70">
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
          <PaginationControls
            page={subscriberPage}
            pageSize={subscriberPageSize}
            totalItems={filteredSubscribers.length}
            itemLabel="subscribers"
            onPageChange={setSubscriberPage}
          />
        </Card>
      </TabsContent>
      </Tabs>

      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Audience Data</DialogTitle>
            <DialogDescription>Choose which list you want to export from the admin panel.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label>Export scope</Label>
            <div className="flex flex-col gap-2">
              {[
                { value: "all", label: "All audience records" },
                { value: "customers", label: "Customers only" },
                { value: "subscribers", label: "Subscribers only" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setExportTarget(option.value as "customers" | "subscribers" | "all")}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    exportTarget === option.value ? "border-primary bg-primary/5 text-primary" : "border-border bg-background"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport}>Prepare Export</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Customers;
