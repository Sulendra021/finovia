import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PageShell } from "../components/shared.jsx";
import Seo from "../components/Seo.jsx";
import { blogApi } from "../services/api.js";
import { MOCK_BLOG_POSTS } from "../data/mockBlogPosts.js";
import { BlogCard } from "../components/blog/BlogCard.jsx";
import { ArrowLeft, Clock, Calendar, User, Share2, Check, BookOpen } from "lucide-react";

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    blogApi.getOne(id)
      .then((res) => {
        if (isMounted) {
          if (res && res.title) {
            setPost(res);
          } else {
            // Find in mock data fallback
            const fallback = MOCK_BLOG_POSTS.find((b) => b.id === id || b._id === id) || MOCK_BLOG_POSTS[0];
            setPost(fallback);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          const fallback = MOCK_BLOG_POSTS.find((b) => b.id === id || b._id === id) || MOCK_BLOG_POSTS[0];
          setPost(fallback);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <PageShell>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading article...</p>
        </div>
      </PageShell>
    );
  }

  if (!post) {
    return (
      <PageShell>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Article Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">The article you are looking for does not exist or has been removed.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Seo title={`${post.title} | Finovia Blog`} description={post.excerpt} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Back link */}
        <button
          onClick={() => navigate("/blog")}
          className="fin-focus inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to All Articles
        </button>

        {/* Category & Title */}
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 mb-4">
            {post.category || "Financial Guide"}
          </span>
          <h1 className="fin-display text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight sm:leading-tight">
            {post.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed font-medium">
            {post.excerpt}
          </p>
        </div>

        {/* Author / Date / Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 py-4 border-y border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                {(post.author || "F")[0]}
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block text-xs">{post.author || "Finovia Team"}</span>
                <span className="text-[11px] text-slate-400">Financial Analyst</span>
              </div>
            </div>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-3 text-[11px] sm:text-xs">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {post.date || (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Aug 2026")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {post.readTime || "5 min read"}
              </span>
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="fin-focus inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors text-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? "Link Copied!" : "Share Article"}
          </button>
        </div>

        {/* Hero Image Banner */}
        <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
          {post.imageUrl ? (
            <img src={post.imageUrl} alt={post.title} className="w-full h-72 sm:h-96 object-cover" />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 flex items-center justify-center p-8 text-center text-white">
              <BookOpen className="w-16 h-16 opacity-30" />
            </div>
          )}
        </div>

        {/* Article Body Content */}
        <div
          className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Bio Footer Box */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shrink-0">
            {(post.author || "F")[0]}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Written by {post.author || "Finovia Research Team"}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Finovia's editorial desk covers personal finance, credit cards, banking regulations, and investment strategies with strict accuracy and objective analysis.
            </p>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
