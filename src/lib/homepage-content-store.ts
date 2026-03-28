import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";
import { defaultHomepageContent, type HomepageContent } from "@/content/homepage-content";

const contentDir = path.join(process.cwd(), ".content");
const homepageContentPath = path.join(contentDir, "homepage.json");

const mergeHomepageContent = (input?: Partial<HomepageContent> | null): HomepageContent => ({
  hero: {
    ...defaultHomepageContent.hero,
    ...(input?.hero ?? {}),
    featureCards: defaultHomepageContent.hero.featureCards.map((card, index) => ({
      ...card,
      ...(input?.hero?.featureCards?.[index] ?? {}),
    })),
  },
  featured: {
    ...defaultHomepageContent.featured,
    ...(input?.featured ?? {}),
  },
  benefits: {
    ...defaultHomepageContent.benefits,
    ...(input?.benefits ?? {}),
    items: defaultHomepageContent.benefits.items.map((item, index) => ({
      ...item,
      ...(input?.benefits?.items?.[index] ?? {}),
    })),
  },
  howItWorks: {
    ...defaultHomepageContent.howItWorks,
    ...(input?.howItWorks ?? {}),
    steps: defaultHomepageContent.howItWorks.steps.map((step, index) => ({
      ...step,
      ...(input?.howItWorks?.steps?.[index] ?? {}),
    })),
  },
  stories: {
    ...defaultHomepageContent.stories,
    ...(input?.stories ?? {}),
  },
  leadCapture: {
    ...defaultHomepageContent.leadCapture,
    ...(input?.leadCapture ?? {}),
  },
  finalCta: {
    ...defaultHomepageContent.finalCta,
    ...(input?.finalCta ?? {}),
  },
});

export async function readHomepageContent(): Promise<HomepageContent> {
  try {
    const file = await readFile(homepageContentPath, "utf8");
    return mergeHomepageContent(JSON.parse(file) as Partial<HomepageContent>);
  } catch {
    return defaultHomepageContent;
  }
}

export async function getHomepageContent(): Promise<HomepageContent> {
  noStore();
  return readHomepageContent();
}

export async function saveHomepageContent(content: HomepageContent): Promise<HomepageContent> {
  const merged = mergeHomepageContent(content);
  await mkdir(contentDir, { recursive: true });
  await writeFile(homepageContentPath, JSON.stringify(merged, null, 2), "utf8");
  return merged;
}
