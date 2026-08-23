import React from "react";
import { PageShell, PageHero } from "../components/shared.jsx";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { blogApi } from "../services/api.js";
import { BlogCard } from "../components/blog/BlogCard.jsx";

export default function BlogPage() {
  const { data: posts } = useLiveData(blogApi.getAll, []);

  return (
    <PageShell>
      <Seo title="Blog & News" description="Straightforward reads on credit, loans, insurance and investing." />
      <PageHero eyebrow="Blog & News" title="Money, explained plainly" subtitle="Straightforward reads on credit, loans, insurance and investing - no jargon, no sales pitch." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((b) => (
          <BlogCard key={b.id || b._id} post={b} />
        ))}
      </div>
    </PageShell>
  );
}
