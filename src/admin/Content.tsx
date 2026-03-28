"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Edit, GripVertical, LoaderCircle, Plus, Save, Trash2 } from "lucide-react";
import { defaultHomepageContent, type HomepageContent } from "@/content/homepage-content";
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

type PageField = {
  id: string;
  label: string;
  type: "text" | "textarea";
  value: string;
  section: string;
};

type PageDefinition = {
  title: string;
  description: string;
  fields: PageField[];
};

const initialTestimonials = [
  { name: "Priya Sharma", text: "This guide transformed my understanding of Vedic astrology!", rating: 5 },
  { name: "David Wilson", text: "Beautifully written and incredibly insightful. Worth every penny.", rating: 5 },
  { name: "Maya Chen", text: "The cosmic healing bundle is a treasure trove of wisdom.", rating: 4 },
];

const getHomepagePageDefinition = (homepageContent: HomepageContent): PageDefinition => ({
  title: "Landing Storefront Content",
  description: "Saving this form persists homepage copy and updates the storefront.",
  fields: [
    { id: "hero-badge", label: "Hero badge", type: "text", value: homepageContent.hero.badge, section: "Hero" },
    { id: "hero-heading-intro", label: "Hero heading intro", type: "text", value: homepageContent.hero.headingIntro, section: "Hero" },
    { id: "hero-heading-highlight", label: "Hero heading highlight", type: "text", value: homepageContent.hero.headingHighlight, section: "Hero" },
    { id: "hero-heading-ending", label: "Hero heading ending", type: "text", value: homepageContent.hero.headingEnding, section: "Hero" },
    { id: "hero-description", label: "Hero description", type: "textarea", value: homepageContent.hero.description, section: "Hero" },
    { id: "hero-primary-cta", label: "Primary CTA label", type: "text", value: homepageContent.hero.primaryCtaLabel, section: "Hero" },
    { id: "hero-secondary-cta", label: "Secondary CTA label", type: "text", value: homepageContent.hero.secondaryCtaLabel, section: "Hero" },
    { id: "hero-account-prompt", label: "Account prompt", type: "text", value: homepageContent.hero.accountPrompt, section: "Hero" },
    { id: "hero-account-link", label: "Account link text", type: "text", value: homepageContent.hero.accountLinkText, section: "Hero" },
    { id: "hero-card-1-title", label: "Feature card 1 title", type: "text", value: homepageContent.hero.featureCards[0]?.title ?? "", section: "Hero feature cards" },
    { id: "hero-card-1-body", label: "Feature card 1 body", type: "textarea", value: homepageContent.hero.featureCards[0]?.body ?? "", section: "Hero feature cards" },
    { id: "hero-card-2-title", label: "Feature card 2 title", type: "text", value: homepageContent.hero.featureCards[1]?.title ?? "", section: "Hero feature cards" },
    { id: "hero-card-2-body", label: "Feature card 2 body", type: "textarea", value: homepageContent.hero.featureCards[1]?.body ?? "", section: "Hero feature cards" },
    { id: "hero-card-3-title", label: "Feature card 3 title", type: "text", value: homepageContent.hero.featureCards[2]?.title ?? "", section: "Hero feature cards" },
    { id: "hero-card-3-body", label: "Feature card 3 body", type: "textarea", value: homepageContent.hero.featureCards[2]?.body ?? "", section: "Hero feature cards" },
    { id: "featured-eyebrow", label: "Featured guides eyebrow", type: "text", value: homepageContent.featured.eyebrow, section: "Featured guides" },
    { id: "featured-title", label: "Featured guides title", type: "text", value: homepageContent.featured.title, section: "Featured guides" },
    { id: "featured-description", label: "Featured guides description", type: "textarea", value: homepageContent.featured.description, section: "Featured guides" },
    { id: "featured-view-all", label: "Featured guides CTA", type: "text", value: homepageContent.featured.viewAllLabel, section: "Featured guides" },
    { id: "benefits-eyebrow", label: "Benefits eyebrow", type: "text", value: homepageContent.benefits.eyebrow, section: "Benefits" },
    { id: "benefits-title", label: "Benefits title", type: "text", value: homepageContent.benefits.title, section: "Benefits" },
    { id: "benefits-description", label: "Benefits description", type: "textarea", value: homepageContent.benefits.description, section: "Benefits" },
    { id: "benefit-1-title", label: "Benefit 1 title", type: "text", value: homepageContent.benefits.items[0]?.title ?? "", section: "Benefits" },
    { id: "benefit-1-desc", label: "Benefit 1 description", type: "textarea", value: homepageContent.benefits.items[0]?.desc ?? "", section: "Benefits" },
    { id: "benefit-2-title", label: "Benefit 2 title", type: "text", value: homepageContent.benefits.items[1]?.title ?? "", section: "Benefits" },
    { id: "benefit-2-desc", label: "Benefit 2 description", type: "textarea", value: homepageContent.benefits.items[1]?.desc ?? "", section: "Benefits" },
    { id: "benefit-3-title", label: "Benefit 3 title", type: "text", value: homepageContent.benefits.items[2]?.title ?? "", section: "Benefits" },
    { id: "benefit-3-desc", label: "Benefit 3 description", type: "textarea", value: homepageContent.benefits.items[2]?.desc ?? "", section: "Benefits" },
    { id: "benefit-4-title", label: "Benefit 4 title", type: "text", value: homepageContent.benefits.items[3]?.title ?? "", section: "Benefits" },
    { id: "benefit-4-desc", label: "Benefit 4 description", type: "textarea", value: homepageContent.benefits.items[3]?.desc ?? "", section: "Benefits" },
    { id: "how-eyebrow", label: "How it works eyebrow", type: "text", value: homepageContent.howItWorks.eyebrow, section: "How it works" },
    { id: "how-title", label: "How it works title", type: "text", value: homepageContent.howItWorks.title, section: "How it works" },
    { id: "how-description", label: "How it works description", type: "textarea", value: homepageContent.howItWorks.description, section: "How it works" },
    { id: "step-1-title", label: "Step 1 title", type: "text", value: homepageContent.howItWorks.steps[0]?.title ?? "", section: "How it works" },
    { id: "step-1-desc", label: "Step 1 description", type: "textarea", value: homepageContent.howItWorks.steps[0]?.desc ?? "", section: "How it works" },
    { id: "step-2-title", label: "Step 2 title", type: "text", value: homepageContent.howItWorks.steps[1]?.title ?? "", section: "How it works" },
    { id: "step-2-desc", label: "Step 2 description", type: "textarea", value: homepageContent.howItWorks.steps[1]?.desc ?? "", section: "How it works" },
    { id: "step-3-title", label: "Step 3 title", type: "text", value: homepageContent.howItWorks.steps[2]?.title ?? "", section: "How it works" },
    { id: "step-3-desc", label: "Step 3 description", type: "textarea", value: homepageContent.howItWorks.steps[2]?.desc ?? "", section: "How it works" },
    { id: "stories-eyebrow", label: "Reader stories eyebrow", type: "text", value: homepageContent.stories.eyebrow, section: "Reader stories" },
    { id: "stories-title", label: "Reader stories title", type: "text", value: homepageContent.stories.title, section: "Reader stories" },
    { id: "stories-description", label: "Reader stories description", type: "textarea", value: homepageContent.stories.description, section: "Reader stories" },
    { id: "capture-eyebrow", label: "Lead capture eyebrow", type: "text", value: homepageContent.leadCapture.eyebrow, section: "Lead capture" },
    { id: "capture-title", label: "Lead capture title", type: "text", value: homepageContent.leadCapture.title, section: "Lead capture" },
    { id: "capture-description", label: "Lead capture description", type: "textarea", value: homepageContent.leadCapture.description, section: "Lead capture" },
    { id: "capture-cta", label: "Lead capture CTA label", type: "text", value: homepageContent.leadCapture.ctaLabel, section: "Lead capture" },
    { id: "final-eyebrow", label: "Final CTA eyebrow", type: "text", value: homepageContent.finalCta.eyebrow, section: "Final CTA" },
    { id: "final-title", label: "Final CTA title", type: "text", value: homepageContent.finalCta.title, section: "Final CTA" },
    { id: "final-description", label: "Final CTA description", type: "textarea", value: homepageContent.finalCta.description, section: "Final CTA" },
    { id: "final-cta-label", label: "Final CTA button label", type: "text", value: homepageContent.finalCta.ctaLabel, section: "Final CTA" },
  ],
});

const buildPageDefinitions = (homepageContent: HomepageContent): Record<string, PageDefinition> => ({
  "Homepage Hero": getHomepagePageDefinition(homepageContent),
  "About Page": {
    title: "About Page Content",
    description: "This page is not connected yet.",
    fields: [{ id: "about-notes", label: "Editor notes", type: "textarea", value: "Map About page copy here next.", section: "Notes" }],
  },
  FAQ: {
    title: "FAQ Content",
    description: "This page is not connected yet.",
    fields: [{ id: "faq-notes", label: "Editor notes", type: "textarea", value: "Map FAQ copy here next.", section: "Notes" }],
  },
  "Lead Magnet Landing": {
    title: "Lead Magnet Landing Content",
    description: "This page is not connected yet.",
    fields: [{ id: "lead-notes", label: "Editor notes", type: "textarea", value: "Map free-guide copy here next.", section: "Notes" }],
  },
  "Shop Index": {
    title: "Shop Index Content",
    description: "This page is not connected yet.",
    fields: [{ id: "shop-notes", label: "Editor notes", type: "textarea", value: "Map shop copy here next.", section: "Notes" }],
  },
  "Contact Page": {
    title: "Contact Page Content",
    description: "This page is not connected yet.",
    fields: [{ id: "contact-notes", label: "Editor notes", type: "textarea", value: "Map contact copy here next.", section: "Notes" }],
  },
});

const getFieldValue = (fields: PageField[], id: string) => fields.find((field) => field.id === id)?.value ?? "";

const fieldsToHomepageContent = (fields: PageField[]): HomepageContent => ({
  hero: {
    badge: getFieldValue(fields, "hero-badge"),
    headingIntro: getFieldValue(fields, "hero-heading-intro"),
    headingHighlight: getFieldValue(fields, "hero-heading-highlight"),
    headingEnding: getFieldValue(fields, "hero-heading-ending"),
    description: getFieldValue(fields, "hero-description"),
    primaryCtaLabel: getFieldValue(fields, "hero-primary-cta"),
    secondaryCtaLabel: getFieldValue(fields, "hero-secondary-cta"),
    accountPrompt: getFieldValue(fields, "hero-account-prompt"),
    accountLinkText: getFieldValue(fields, "hero-account-link"),
    featureCards: [
      { title: getFieldValue(fields, "hero-card-1-title"), body: getFieldValue(fields, "hero-card-1-body") },
      { title: getFieldValue(fields, "hero-card-2-title"), body: getFieldValue(fields, "hero-card-2-body") },
      { title: getFieldValue(fields, "hero-card-3-title"), body: getFieldValue(fields, "hero-card-3-body") },
    ],
  },
  featured: {
    eyebrow: getFieldValue(fields, "featured-eyebrow"),
    title: getFieldValue(fields, "featured-title"),
    description: getFieldValue(fields, "featured-description"),
    viewAllLabel: getFieldValue(fields, "featured-view-all"),
  },
  benefits: {
    eyebrow: getFieldValue(fields, "benefits-eyebrow"),
    title: getFieldValue(fields, "benefits-title"),
    description: getFieldValue(fields, "benefits-description"),
    items: [
      { title: getFieldValue(fields, "benefit-1-title"), desc: getFieldValue(fields, "benefit-1-desc") },
      { title: getFieldValue(fields, "benefit-2-title"), desc: getFieldValue(fields, "benefit-2-desc") },
      { title: getFieldValue(fields, "benefit-3-title"), desc: getFieldValue(fields, "benefit-3-desc") },
      { title: getFieldValue(fields, "benefit-4-title"), desc: getFieldValue(fields, "benefit-4-desc") },
    ],
  },
  howItWorks: {
    eyebrow: getFieldValue(fields, "how-eyebrow"),
    title: getFieldValue(fields, "how-title"),
    description: getFieldValue(fields, "how-description"),
    steps: [
      { num: "01", title: getFieldValue(fields, "step-1-title"), desc: getFieldValue(fields, "step-1-desc") },
      { num: "02", title: getFieldValue(fields, "step-2-title"), desc: getFieldValue(fields, "step-2-desc") },
      { num: "03", title: getFieldValue(fields, "step-3-title"), desc: getFieldValue(fields, "step-3-desc") },
    ],
  },
  stories: {
    eyebrow: getFieldValue(fields, "stories-eyebrow"),
    title: getFieldValue(fields, "stories-title"),
    description: getFieldValue(fields, "stories-description"),
  },
  leadCapture: {
    eyebrow: getFieldValue(fields, "capture-eyebrow"),
    title: getFieldValue(fields, "capture-title"),
    description: getFieldValue(fields, "capture-description"),
    ctaLabel: getFieldValue(fields, "capture-cta"),
  },
  finalCta: {
    eyebrow: getFieldValue(fields, "final-eyebrow"),
    title: getFieldValue(fields, "final-title"),
    description: getFieldValue(fields, "final-description"),
    ctaLabel: getFieldValue(fields, "final-cta-label"),
  },
});

const ContentPage = () => {
  const [homepageContent, setHomepageContent] = useState<HomepageContent>(defaultHomepageContent);
  const [isLoadingHomepage, setIsLoadingHomepage] = useState(true);
  const [isSavingPage, setIsSavingPage] = useState(false);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [pageListPage, setPageListPage] = useState(1);
  const [testimonialPage, setTestimonialPage] = useState(1);
  const [pageEditorOpen, setPageEditorOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("");
  const [pageFields, setPageFields] = useState<PageField[]>([]);
  const [testimonialDialogOpen, setTestimonialDialogOpen] = useState(false);
  const [testimonialDraft, setTestimonialDraft] = useState({ name: "", text: "", rating: "5" });
  const [editingTestimonialName, setEditingTestimonialName] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [bannerSaveOpen, setBannerSaveOpen] = useState(false);
  const pageDefinitions = buildPageDefinitions(homepageContent);
  const pages = Object.keys(pageDefinitions);
  const pageSize = 4;
  const testimonialPageSize = 2;
  const paginatedPages = pages.slice((pageListPage - 1) * pageSize, pageListPage * pageSize);
  const paginatedTestimonials = testimonials.slice((testimonialPage - 1) * testimonialPageSize, testimonialPage * testimonialPageSize);
  const selectedPageDefinition = pageDefinitions[selectedPage];
  const fieldSections = pageFields.reduce<Record<string, PageField[]>>((accumulator, field) => {
    if (!accumulator[field.section]) {
      accumulator[field.section] = [];
    }

    accumulator[field.section].push(field);
    return accumulator;
  }, {});

  useEffect(() => {
    let active = true;

    const loadHomepageContent = async () => {
      try {
        const response = await fetch("/api/content/homepage", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Unable to load homepage content");
        }

        const content = (await response.json()) as HomepageContent;

        if (active) {
          setHomepageContent(content);
        }
      } catch {
        if (active) {
          toast.error("Using fallback homepage content. The stored version could not be loaded.");
        }
      } finally {
        if (active) {
          setIsLoadingHomepage(false);
        }
      }
    };

    loadHomepageContent();

    return () => {
      active = false;
    };
  }, []);

  const openPageEditor = (page: string) => {
    setSelectedPage(page);
    setPageFields(pageDefinitions[page]?.fields.map((field) => ({ ...field })) ?? []);
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

  const savePageChanges = async () => {
    if (selectedPage !== "Homepage Hero") {
      toast.error("Only the homepage editor is connected to the storefront right now.");
      return;
    }

    setIsSavingPage(true);

    try {
      const nextHomepageContent = fieldsToHomepageContent(pageFields);
      const response = await fetch("/api/content/homepage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nextHomepageContent),
      });

      if (!response.ok) {
        throw new Error("Unable to save homepage content");
      }

      const payload = (await response.json()) as { content: HomepageContent };
      setHomepageContent(payload.content);
      setPageFields(getHomepagePageDefinition(payload.content).fields);
      toast.success("Homepage content saved. The storefront has been updated.");
      setPageEditorOpen(false);
    } catch {
      toast.error("Homepage content could not be saved.");
    } finally {
      setIsSavingPage(false);
    }
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
                <p className="text-sm text-muted-foreground">{page === "Homepage Hero" ? "Connected to the storefront" : "Not connected yet"}</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => openPageEditor(page)} disabled={page === "Homepage Hero" && isLoadingHomepage}>
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
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedPageDefinition?.title ?? `Edit ${selectedPage}`}</DialogTitle>
            <DialogDescription>{selectedPageDefinition?.description ?? "Review and update page content."}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="content-page-name">Page</Label>
              <Input id="content-page-name" value={selectedPage} readOnly />
            </div>
            {Object.entries(fieldSections).map(([section, fields]) => (
              <div key={section} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">{section}</h3>
                <div className="space-y-4">
                  {fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id}>{field.label}</Label>
                      {field.type === "textarea" ? (
                        <Textarea
                          id={field.id}
                          rows={4}
                          value={field.value}
                          onChange={(event) =>
                            setPageFields((current) =>
                              current.map((item) => (item.id === field.id ? { ...item, value: event.target.value } : item)),
                            )
                          }
                        />
                      ) : (
                        <Input
                          id={field.id}
                          value={field.value}
                          onChange={(event) =>
                            setPageFields((current) =>
                              current.map((item) => (item.id === field.id ? { ...item, value: event.target.value } : item)),
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPageEditorOpen(false)} disabled={isSavingPage}>
              Cancel
            </Button>
            <Button onClick={savePageChanges} disabled={isSavingPage || (selectedPage === "Homepage Hero" && isLoadingHomepage)}>
              {isSavingPage ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
              Save Content
            </Button>
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
