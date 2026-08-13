import { useEffect } from "react";

// Lightweight SEO helper - sets document title + meta description per page
// without pulling in react-helmet. Renders nothing.
export default function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Finovia` : "Finovia — Smart Financial Choices, Made Simple";
    document.title = fullTitle;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    if (description) meta.setAttribute("content", description);
  }, [title, description]);

  return null;
}
