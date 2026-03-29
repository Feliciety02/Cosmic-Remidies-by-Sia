"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { CreditCard, Globe, Palette, Save, Shield } from "lucide-react";
import logo from "@/assets/logo.svg";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ADMIN_SETTINGS_STORAGE_KEY,
  ADMIN_USERS_STORAGE_KEY,
  initialAdminUsers,
  initialSettings,
  readAdminSettings,
  readAdminUsers,
  type AdminStoreSettings,
  type AdminUserRecord,
} from "@/lib/admin-store";

const SettingsPage = () => {
  const [generalSaveOpen, setGeneralSaveOpen] = useState(false);
  const [brandingOpen, setBrandingOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [settings, setSettings] = useState<AdminStoreSettings>(initialSettings);
  const [adminUsers, setAdminUsers] = useState<AdminUserRecord[]>(initialAdminUsers);
  const [isHydrated, setIsHydrated] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", role: "Editor" });

  useEffect(() => {
    setSettings(readAdminSettings(window.localStorage.getItem(ADMIN_SETTINGS_STORAGE_KEY)));
    setAdminUsers(readAdminUsers(window.localStorage.getItem(ADMIN_USERS_STORAGE_KEY)));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(ADMIN_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [isHydrated, settings]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(adminUsers));
  }, [adminUsers, isHydrated]);

  const saveGeneralSettings = () => {
    toast.success("Store settings saved.");
    setGeneralSaveOpen(false);
  };

  const uploadLogo = () => {
    toast.success(`Branding updated with ${settings.branding.logoFileName}.`);
    setBrandingOpen(false);
  };

  const inviteUser = () => {
    if (!inviteForm.name.trim() || !inviteForm.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }

    setAdminUsers((current) => [
      { name: inviteForm.name.trim(), email: inviteForm.email.trim(), role: inviteForm.role, status: "Invited" },
      ...current.filter((user) => user.email !== inviteForm.email.trim()),
    ]);
    toast.success(`Invitation prepared for ${inviteForm.email}.`);
    setInviteOpen(false);
    setInviteForm({ name: "", email: "", role: "Editor" });
  };

  return (
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
              <Switch
                checked={settings.paymentProviders.paddleEnabled}
                onCheckedChange={(checked) =>
                  setSettings((current) => ({
                    ...current,
                    paymentProviders: { ...current.paymentProviders, paddleEnabled: checked },
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
              <div>
                <p className="font-medium">PayPal</p>
                <p className="text-sm text-muted-foreground">Alternative payment method</p>
              </div>
              <Switch
                checked={settings.paymentProviders.paypalEnabled}
                onCheckedChange={(checked) =>
                  setSettings((current) => ({
                    ...current,
                    paymentProviders: { ...current.paymentProviders, paypalEnabled: checked },
                  }))
                }
              />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Tax and Currency</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Default Currency</label>
              <Select
                value={settings.taxAndCurrency.currency}
                onValueChange={(value) =>
                  setSettings((current) => ({
                    ...current,
                    taxAndCurrency: { ...current.taxAndCurrency, currency: value as AdminStoreSettings["taxAndCurrency"]["currency"] },
                  }))
                }
              >
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
              <Switch
                checked={settings.taxAndCurrency.autoTax}
                onCheckedChange={(checked) =>
                  setSettings((current) => ({
                    ...current,
                    taxAndCurrency: { ...current.taxAndCurrency, autoTax: checked },
                  }))
                }
              />
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="general" className="space-y-6">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Store Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="store-name" className="mb-1.5 block text-sm font-medium">Store Name</label>
              <Input
                id="store-name"
                name="storeName"
                value={settings.general.storeName}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    general: { ...current.general, storeName: event.target.value },
                  }))
                }
                className="border-0 bg-secondary"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">Contact Email</label>
              <Input
                id="contact-email"
                name="contactEmail"
                value={settings.general.contactEmail}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    general: { ...current.general, contactEmail: event.target.value },
                  }))
                }
                className="border-0 bg-secondary"
              />
            </div>
            <div>
              <label htmlFor="store-url" className="mb-1.5 block text-sm font-medium">Store URL</label>
              <Input
                id="store-url"
                name="storeUrl"
                value={settings.general.storeUrl}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    general: { ...current.general, storeUrl: event.target.value },
                  }))
                }
                className="border-0 bg-secondary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Timezone</label>
              <Select
                value={settings.general.timezone}
                onValueChange={(value) =>
                  setSettings((current) => ({
                    ...current,
                    general: { ...current.general, timezone: value as AdminStoreSettings["general"]["timezone"] },
                  }))
                }
              >
                <SelectTrigger className="border-0 bg-secondary"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                  <SelectItem value="est">EST (UTC-5)</SelectItem>
                  <SelectItem value="pst">PST (UTC-8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="mt-6 gap-2 gradient-primary text-primary-foreground" onClick={() => setGeneralSaveOpen(true)}>
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
              <Button variant="outline" className="mt-3 block" onClick={() => setBrandingOpen(true)}>Upload New Logo</Button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="primary-color" className="mb-1.5 block text-sm font-medium">Primary Color</label>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg gradient-primary" />
                  <Input
                    id="primary-color"
                    name="primaryColor"
                    value={settings.branding.primaryColor}
                    onChange={(event) =>
                      setSettings((current) => ({
                        ...current,
                        branding: { ...current.branding, primaryColor: event.target.value },
                      }))
                    }
                    className="border-0 bg-secondary"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="accent-color" className="mb-1.5 block text-sm font-medium">Accent Color</label>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg gradient-gold" />
                  <Input
                    id="accent-color"
                    name="accentColor"
                    value={settings.branding.accentColor}
                    onChange={(event) =>
                      setSettings((current) => ({
                        ...current,
                        branding: { ...current.branding, accentColor: event.target.value },
                      }))
                    }
                    className="border-0 bg-secondary"
                  />
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
            <Button className="gradient-primary text-primary-foreground" size="sm" onClick={() => setInviteOpen(true)}>Invite User</Button>
          </div>
          <div className="space-y-3">
            {adminUsers.map((user) => (
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
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">{user.role}</p>
                  <p className="text-xs text-muted-foreground">{user.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </TabsContent>
    </Tabs>
    <Dialog open={generalSaveOpen} onOpenChange={setGeneralSaveOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Store Settings</DialogTitle>
          <DialogDescription>Confirm the current store information changes before applying them.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setGeneralSaveOpen(false)}>
            Cancel
          </Button>
          <Button onClick={saveGeneralSettings}>Confirm Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog open={brandingOpen} onOpenChange={setBrandingOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload New Logo</DialogTitle>
          <DialogDescription>Queue a new branding asset for review before publishing it to the storefront.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="logo-file-name">Asset file name</Label>
          <Input
            id="logo-file-name"
            value={settings.branding.logoFileName}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                branding: { ...current.branding, logoFileName: event.target.value },
              }))
            }
            placeholder="brandmark-v2.svg"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setBrandingOpen(false)}>
            Cancel
          </Button>
          <Button onClick={uploadLogo}>Queue Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Admin User</DialogTitle>
          <DialogDescription>Create a pending invite for a new admin or editor account.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invite-name">Name</Label>
            <Input
              id="invite-name"
              value={inviteForm.name}
              onChange={(event) => setInviteForm((current) => ({ ...current, name: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite-email">Email</Label>
            <Input
              id="invite-email"
              value={inviteForm.email}
              onChange={(event) => setInviteForm((current) => ({ ...current, email: event.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite-role">Role</Label>
            <Select value={inviteForm.role} onValueChange={(value) => setInviteForm((current) => ({ ...current, role: value }))}>
              <SelectTrigger id="invite-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Owner">Owner</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setInviteOpen(false)}>
            Cancel
          </Button>
          <Button onClick={inviteUser}>Send Invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </AdminLayout>
  );
};

export default SettingsPage;
