import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_SEO, PAGE_SEO_CONFIG } from "../config/seo.js";

/**
 * Production-ready SEO Component
 * Updates Title, Meta Description, Canonical URL, Open Graph, Twitter Cards,
 * Robots directives, and injects Schema.org JSON-LD structured data.
 */
export default function Seo({
  title: customTitle,
  description: customDescription,
  canonical: customCanonical,
  robots: customRobots,
  type: customType,
  image: customImage,
  schema: customSchema,
}) {
  const location = useLocation();
  const routeConfig = PAGE_SEO_CONFIG[location.pathname] || {};

  const isPrivatePath = location.pathname.startsWith("/admin") || location.pathname === "/dashboard" || location.pathname === "/auth";
  const defaultRobots = isPrivatePath ? "noindex, nofollow" : "index, follow";

  const title = customTitle || routeConfig.title || DEFAULT_SEO.defaultTitle;
  const description = customDescription || routeConfig.description || DEFAULT_SEO.defaultDescription;
  const canonical = customCanonical || routeConfig.canonical || `${DEFAULT_SEO.domain}${location.pathname}`;
  const robots = customRobots || routeConfig.robots || defaultRobots;
  const type = customType || routeConfig.type || "website";
  const ogImage = customImage || routeConfig.ogImage || DEFAULT_SEO.ogImage;

  useEffect(() => {
    // 1. Page Title
    document.title = title;

    // Helper function to set or update meta tag
    const setMetaTag = (selector, attribute, attributeValue, contentValue) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentValue);
    };

    // Helper to set link tag
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // 2. Standard Meta Tags & Icons
    setMetaTag('meta[name="description"]', "name", "description", description);
    setMetaTag('meta[name="robots"]', "name", "robots", robots);
    setLinkTag("canonical", canonical);
    setLinkTag("icon", "/favicon.svg?v=2");

    // 3. Open Graph Tags
    setMetaTag('meta[property="og:title"]', "property", "og:title", title);
    setMetaTag('meta[property="og:description"]', "property", "og:description", description);
    setMetaTag('meta[property="og:type"]', "property", "og:type", type);
    setMetaTag('meta[property="og:url"]', "property", "og:url", canonical);
    setMetaTag('meta[property="og:image"]', "property", "og:image", ogImage);
    setMetaTag('meta[property="og:site_name"]', "property", "og:site_name", DEFAULT_SEO.siteName);

    // 4. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", ogImage);
    setMetaTag('meta[name="twitter:site"]', "name", "twitter:site", DEFAULT_SEO.twitterHandle);

    // 5. JSON-LD Structured Data
    const baseSchemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": DEFAULT_SEO.siteName,
        "url": DEFAULT_SEO.domain,
        "description": DEFAULT_SEO.defaultDescription,
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": DEFAULT_SEO.organization.name,
        "url": DEFAULT_SEO.organization.url,
        "logo": DEFAULT_SEO.organization.logo,
        "sameAs": DEFAULT_SEO.organization.sameAs,
      }
    ];

    if (customSchema) {
      baseSchemas.push(customSchema);
    }

    let scriptTag = document.getElementById("finovia-jsonld");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "finovia-jsonld";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(baseSchemas);

  }, [title, description, canonical, robots, type, ogImage, customSchema, location.pathname]);

  return null;
}
