import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

export function BlogCard({ post }) {
  const blogId = post.id || post._id || "blog-1";

  return (
    <article className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative h-44 bg-gradient-to-br from-blue-600 to-indigo-800 overflow-hidden">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-slate-800">
              <BookOpen className="w-10 h-10 text-white/70" />
            </div>
          )}
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-blue-700 dark:text-blue-400 backdrop-blur border border-blue-100 dark:border-slate-700 shadow-xs">
            {post.category}
          </span>
        </div>

        <div className="p-5">
          <Link to={`/blog/${blogId}`} className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <h3 className="fin-display font-semibold text-slate-900 dark:text-white text-base leading-snug line-clamp-2">
              {post.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto text-xs">
        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-[11px]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> {post.readTime || "5 min read"}
          </span>
        </div>

        <Link
          to={`/blog/${blogId}`}
          className="fin-focus inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-xs"
        >
          Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
