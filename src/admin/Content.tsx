"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Edit, GripVertical, Plus, Save, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { PaginationControls } from "@/components/admin/PaginationControls";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const initialTestimonials = [
  { name: "Priya Sharma", text: "This guide transformed my understanding of Vedic astrology!", rating: 5 },
  { name: "David Wilson", text: "Beautifully written and incredibly insightful. Worth every penny.", rating: 5 },
  { name: "Maya Chen", text: "The cosmic healing bundle is a treasure trove of wisdom.", rating: 4 },
];

const pages = ["Homepage Hero", "About Page", "FAQ", "Lead Magnet Landing", "Shop Index", "Contact Page"];

const ContentPage = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [pageListPage, setPageListPage] = useState(1);
  const [testimonialPage, setTestimonialPage] = useState(1);
  const [pageEditorOpen, setPageEditorOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("");
  const [pageSummary, setPageSummary] = useState("");
  const [testimonialDialogOpen, setTestimonialDialogOpen] = useState(false);
  const [testimonialDraft, setTestimonialDraft] = useState({ name: "", text: "", rating: "5" });
  const [editingTestimonialName, setEditingTestimonialName] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [bannerSaveOpen, setBannerSaveOpen] = useState(false);
  const pageSize = 4;
  const testimonialPageSize = 2;
  const paginatedPages = pages.slice((pageListPage - 1) * pageSize, pageListPage * pageSize);
  const paginatedTestimonials = testimonials.slice((testimonialPage - 1) * testimonialPageSize, testimonialPage * testimonialPageSize);

  const openPageEditor = (page: string) => {
    setSelectedPage(page);
    setPageSummary(`Editing notes for ${page}`);
    setPageEditorOpen(true);
  };

  const openTestimonialDialog = (name?: string) => {
    const testimonial = testimonials.find((item) => item.name === name);

    if (testimonial) {
      setTestimonialDraft({
        name: testimonial.name,
        text: testimonial.text,
        rating: String(testimonial.rating),
      });
      setEditingTestimonialName(testimonial.name);
    } else {
      setTestimonialDraft({ name: "", text: "", rating: "5" });
      setEditingTestimonialName(null);
    }

    setTestimonialDialogOpen(true);
  };

  const savePageChanges = () => {
    toast.success(`${selectedPage} is ready for content updates.`);
    setPageEditorOpen(false);
  };

  const saveTestimonial = () => {
    if (!testimonialDraft.name.trim() || !testimonialDraft.text.trim()) {
      toast.error("Name and testimonial text are required.");
      return;
    }

    const nextTestimonial = {
      name: testimonialDraft.name.trim(),
      text: testimonialDraft.text.trim(),
      rating: Number(testimonialDraft.rating) || 5,
    };

    setTestimonials((current) => {
      if (editingTestimonialName) {
        return current.map((item) => (item.name === editingTestimonialName ? nextTestimonial : item));
      }

      return [nextTestimonial, ...current];
    });

    toast.success(editingTestimonialName ? "Testimonial updated." : "Testimonial added.");
    setTestimonialDialogOpen(false);
    setEditingTestimonialName(null);
  };

  const saveBannerChanges = () => {
    toast.success("Trust bar changes saved.");
    setBannerSaveOpen(false);
  };

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
            <Button variant="outline" size="sm" className="gap-2" onClick={() => openPageEditor(page)}>
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
          <Button className="gap-2 gradient-primary text-primary-foreground" onClick={() => openTestimonialDialog()}>
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
                <Button variant="ghost" size="icon" onClick={() => openTestimonialDialog(testimonial.name)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteTarget(testimonial.name)}>
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
          <Button className="mt-4 gap-2 gradient-primary text-primary-foreground" onClick={() => setBannerSaveOpen(true)}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </Card>
      </TabsContent>
      </Tabs>

      <Dialog open={pageEditorOpen} onOpenChange={setPageEditorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {selectedPage}</DialogTitle>
            <DialogDescription>Capture admin notes before wiring a dedicated content editor.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content-page-name">Page</Label>
              <Input id="content-page-name" value={selectedPage} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content-page-summary">Editor notes</Label>
              <Textarea
                id="content-page-summary"
                value={pageSummary}
                onChange={(event) => setPageSummary(event.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPageEditorOpen(false)}>
              Cancel
            </Button>
            <Button onClick={savePageChanges}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={testimonialDialogOpen}
        onOpenChange={(open) => {
          setTestimonialDialogOpen(open);
          if (!open) {
            setEditingTestimonialName(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTestimonialName ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
            <DialogDescription>Manage the customer proof blocks shown on the storefront.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="testimonial-name">Name</Label>
              <Input
                id="testimonial-name"
                value={testimonialDraft.name}
                onChange={(event) => setTestimonialDraft((current) => ({ ...current, name: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonial-rating">Rating</Label>
              <Input
                id="testimonial-rating"
                type="number"
                min="1"
                max="5"
                value={testimonialDraft.rating}
                onChange={(event) => setTestimonialDraft((current) => ({ ...current, rating: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonial-copy">Testimonial</Label>
              <Textarea
                id="testimonial-copy"
                rows={4}
                value={testimonialDraft.text}
                onChange={(event) => setTestimonialDraft((current) => ({ ...current, text: event.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTestimonialDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveTestimonial}>{editingTestimonialName ? "Save Changes" : "Add Testimonial"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirmModal
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="Delete Testimonial"
        description={`Are you sure you want to remove "${deleteTarget ?? ""}" from the rotation?`}
        onConfirm={() => {
          if (deleteTarget) {
            setTestimonials((current) => current.filter((testimonial) => testimonial.name !== deleteTarget));
            toast.success("Testimonial removed.");
          }
          setDeleteTarget(null);
        }}
      />

      <Dialog open={bannerSaveOpen} onOpenChange={setBannerSaveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Trust Bar Changes</DialogTitle>
            <DialogDescription>Confirm the updated trust bar copy before publishing it to the storefront.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBannerSaveOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveBannerChanges}>Confirm Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ContentPage;
