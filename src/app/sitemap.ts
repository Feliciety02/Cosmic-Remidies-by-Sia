import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { products } from "@/data/products";

const sitemap = (): MetadataRoute.Sitemap => {
  const routes = ["", "/shop", "/about", "/faq", "/free-guide", "/contact"];

  return [
    ...routes.map((route) => ({
      url: absoluteUrl(route || "/"),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/product/${product.id}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
};

export default sitemap;
