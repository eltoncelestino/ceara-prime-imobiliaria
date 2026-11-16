import type { MetadataRoute } from "next";
import { MOCK_PROPERTIES } from "@/data/mockData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const propertyUrls = MOCK_PROPERTIES.map((prop) => ({
    url: `${baseUrl}/imoveis/${prop.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/imoveis`, lastModified: new Date() },
    ...propertyUrls,
  ];
}
