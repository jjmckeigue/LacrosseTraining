import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const ROUTES = ["/", "/training", "/about", "/book", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
  }));
}
