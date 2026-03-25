"use client";

import { Edit, GripVertical, Plus, Save, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const testimonials = [
  { name: "Priya Sharma", text: "This guide transformed my understanding of Vedic astrology!", rating: 5 },
  { name: "David Wilson", text: "Beautifully written and incredibly insightful. Worth every penny.", rating: 5 },
  { name: "Maya Chen", text: "The cosmic healing bundle is a treasure trove of wisdom.", rating: 4 },
];

const ContentPage = () => (
  <AdminLayout title="Content" subtitle="Manage your site content">
    <Tabs defaultValue="pages" className="space-y-6">
      <TabsList className="bg-secondary">
        <TabsTrigger value="pages">Pages</TabsTrigger>
        <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        <TabsTrigger value="banners">Banners</TabsTrigger>
      </TabsList>

      <TabsContent value="pages" className="space-y-4">
        {["Homepage Hero", "About Page", "FAQ", "Lead Magnet Landing"].map((page) => (
          <Card key={page} className="flex items-center justify-between p-5 transition-shadow hover:shadow-sm">
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
      </TabsContent>

      <TabsContent value="testimonials" className="space-y-4">
        <div className="flex justify-end">
          <Button className="gap-2 gradient-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
            Add Testimonial
          </Button>
        </div>
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name} className="p-5">
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
      </TabsContent>

      <TabsContent value="banners" className="space-y-4">
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Trust Bar</h3>
          <div className="space-y-3">
            <Input placeholder="e.g., 1000+ Happy Customers" defaultValue="Trusted by 1,000+ seekers worldwide" className="border-0 bg-secondary" />
            <Input placeholder="e.g., 100% Satisfaction Guarantee" defaultValue="100% Satisfaction Guarantee" className="border-0 bg-secondary" />
            <Input placeholder="e.g., Instant Digital Delivery" defaultValue="Instant PDF Download" className="border-0 bg-secondary" />
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

export default ContentPage;
