"use client";

import { useState } from "react";
import { Edit, GripVertical, Plus, Save, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PaginationControls } from "@/components/admin/PaginationControls";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const testimonials = [
  { name: "Priya Sharma", text: "This guide transformed my understanding of Vedic astrology!", rating: 5 },
  { name: "David Wilson", text: "Beautifully written and incredibly insightful. Worth every penny.", rating: 5 },
  { name: "Maya Chen", text: "The cosmic healing bundle is a treasure trove of wisdom.", rating: 4 },
];

const pages = ["Homepage Hero", "About Page", "FAQ", "Lead Magnet Landing", "Shop Index", "Contact Page"];

const ContentPage = () => {
  const [pageListPage, setPageListPage] = useState(1);
  const [testimonialPage, setTestimonialPage] = useState(1);
  const pageSize = 4;
  const testimonialPageSize = 2;
  const paginatedPages = pages.slice((pageListPage - 1) * pageSize, pageListPage * pageSize);
  const paginatedTestimonials = testimonials.slice((testimonialPage - 1) * testimonialPageSize, testimonialPage * testimonialPageSize);

  return (
    <AdminLayout title="Content" subtitle="Manage your site content">
      <Tabs defaultValue="pages" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Editable pages", value: pages.length, note: "Core storefront destinations" },
            { label: "Testimonials", value: testimonials.length, note: "Customer proof blocks in rotation" },
            { label: "Banner slots", value: 3, note: "Reusable trust and promo messaging" },
          ].map((item) => (
            <Card key={item.label} className="rounded-[1.5rem] border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(66,97,129,0.08)]">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{item.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
            </Card>
          ))}
        </div>

      <TabsList className="h-auto rounded-2xl border border-white/70 bg-white/90 p-1.5 shadow-sm">
        <TabsTrigger value="pages">Pages</TabsTrigger>
        <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        <TabsTrigger value="banners">Banners</TabsTrigger>
      </TabsList>

      <TabsContent value="pages" className="space-y-4">
        {paginatedPages.map((page) => (
          <Card key={page} className="flex items-center justify-between rounded-[1.5rem] border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(66,97,129,0.08)] transition-shadow hover:shadow-sm">
            <div>
              <h3 className="font-semibold">{page}</h3>
              <p className="text-sm text-muted-foreground">Last edited 2 days ago</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </Card>
        ))}
        <Card className="overflow-hidden rounded-[1.5rem] border-white/70 bg-white/90 shadow-[0_18px_50px_rgba(66,97,129,0.08)]">
          <PaginationControls
            page={pageListPage}
            pageSize={pageSize}
            totalItems={pages.length}
            itemLabel="pages"
            onPageChange={setPageListPage}
          />
        </Card>
      </TabsContent>

      <TabsContent value="testimonials" className="space-y-4">
        <div className="flex justify-end">
          <Button className="gap-2 gradient-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
            Add Testimonial
          </Button>
        </div>
        {paginatedTestimonials.map((testimonial) => (
          <Card key={testimonial.name} className="rounded-[1.5rem] border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(66,97,129,0.08)]">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <GripVertical className="mt-1 h-5 w-5 cursor-grab text-muted-foreground/40" />
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-semibold">{testimonial.name}</span>
                    <span className="text-accent">{"*".repeat(testimonial.rating)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">"{testimonial.text}"</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        <Card className="overflow-hidden rounded-[1.5rem] border-white/70 bg-white/90 shadow-[0_18px_50px_rgba(66,97,129,0.08)]">
          <PaginationControls
            page={testimonialPage}
            pageSize={testimonialPageSize}
            totalItems={testimonials.length}
            itemLabel="testimonials"
            onPageChange={setTestimonialPage}
          />
        </Card>
      </TabsContent>

      <TabsContent value="banners" className="space-y-4">
        <Card className="rounded-[1.75rem] border-white/70 bg-white/90 p-6 shadow-[0_18px_52px_rgba(66,97,129,0.08)]">
          <h3 className="mb-4 font-semibold">Trust Bar</h3>
          <div className="space-y-3">
            <Input id="trust-bar-line-1" name="trustBarLine1" placeholder="e.g., 1000+ Happy Customers" defaultValue="Trusted by 1,000+ seekers worldwide" className="border-0 bg-secondary" />
            <Input id="trust-bar-line-2" name="trustBarLine2" placeholder="e.g., 100% Satisfaction Guarantee" defaultValue="100% Satisfaction Guarantee" className="border-0 bg-secondary" />
            <Input id="trust-bar-line-3" name="trustBarLine3" placeholder="e.g., Instant Digital Delivery" defaultValue="Instant PDF Download" className="border-0 bg-secondary" />
          </div>
          <Button className="mt-4 gap-2 gradient-primary text-primary-foreground">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </Card>
      </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default ContentPage;
