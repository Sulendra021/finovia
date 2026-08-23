import React from "react";
import { BookOpen, Clock } from "lucide-react";

export function BlogCard({ post }) {
  return (
    <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all">
      <div className="h-32 bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
        <BookOpen className="w-7 h-7 text-blue-300 dark:text-blue-600" />
      </div>
      <div className="p-5">
        <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide">
          {post.category}
        </span>
        <h3 className="fin-display font-semibold text-slate-900 dark:text-white mt-2 leading-snug text-sm">
          {post.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500">
          <span>{post.date || (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Recent")}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}
