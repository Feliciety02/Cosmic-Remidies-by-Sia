"use client";

import Image from "next/image";
import { CreditCard, Globe, Palette, Save, Shield } from "lucide-react";
import logo from "@/assets/logo.svg";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsPage = () => (
  <AdminLayout title="Settings" subtitle="Configure your store">
    <Tabs defaultValue="payment" className="space-y-6">
      <TabsList className="flex-wrap bg-secondary">
        <TabsTrigger value="payment" className="gap-2">
          <CreditCard className="h-4 w-4" />
          Payments
        </TabsTrigger>
        <TabsTrigger value="general" className="gap-2">
          <Globe className="h-4 w-4" />
          General
        </TabsTrigger>
        <TabsTrigger value="branding" className="gap-2">
          <Palette className="h-4 w-4" />
          Branding
        </TabsTrigger>
        <TabsTrigger value="admin" className="gap-2">
          <Shield className="h-4 w-4" />
          Admin Users
        </TabsTrigger>
      </TabsList>

      <TabsContent value="payment" className="space-y-6">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Payment Integrations</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
              <div>
                <p className="font-medium">Paddle</p>
                <p className="text-sm text-muted-foreground">Accept payments worldwide</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
              <div>
                <p className="font-medium">PayPal</p>
                <p className="text-sm text-muted-foreground">Alternative payment method</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Tax and Currency</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Default Currency</label>
              <Select defaultValue="usd">
                <SelectTrigger className="border-0 bg-secondary"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="inr">INR</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
              <div>
                <p className="text-sm font-medium">Auto-calculate tax</p>
                <p className="text-xs text-muted-foreground">Based on customer location</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="general" className="space-y-6">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Store Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Store Name</label>
              <Input defaultValue="Cosmic Remedies by Sia" className="border-0 bg-secondary" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Contact Email</label>
              <Input defaultValue="hello@cosmicremedies.com" className="border-0 bg-secondary" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Store URL</label>
              <Input defaultValue="https://cosmicremediesbysia.com" className="border-0 bg-secondary" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Timezone</label>
              <Select defaultValue="ist">
                <SelectTrigger className="border-0 bg-secondary"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                  <SelectItem value="est">EST (UTC-5)</SelectItem>
                  <SelectItem value="pst">PST (UTC-8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="mt-6 gap-2 gradient-primary text-primary-foreground">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </Card>
      </TabsContent>

      <TabsContent value="branding" className="space-y-6">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Brand Identity</h3>
          <div className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-medium">Current Logo</label>
              <div className="inline-block rounded-xl bg-secondary p-6">
                <Image src={logo} alt="Logo" className="h-16 w-auto" priority />
              </div>
              <Button variant="outline" className="mt-3 block">Upload New Logo</Button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Primary Color</label>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg gradient-primary" />
                  <Input defaultValue="#4d9e8e" className="border-0 bg-secondary" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Accent Color</label>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg gradient-gold" />
                  <Input defaultValue="#c5973e" className="border-0 bg-secondary" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="admin" className="space-y-6">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Admin Users</h3>
            <Button className="gradient-primary text-primary-foreground" size="sm">Invite User</Button>
          </div>
          <div className="space-y-3">
            {[
              { name: "Sia", email: "sia@cosmicremedies.com", role: "Owner" },
              { name: "Assistant", email: "assistant@cosmicremedies.com", role: "Editor" },
            ].map((user) => (
              <div key={user.email} className="flex items-center justify-between rounded-xl bg-secondary p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary font-semibold text-primary-foreground">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-primary">{user.role}</span>
              </div>
            ))}
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  </AdminLayout>
);

export default SettingsPage;
