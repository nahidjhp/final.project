"use client";

import { useBlogPosts } from "@/hooks/useBlog";
import BlogCard from "@/components/BlogCard";

export default function BlogPage() {
  const blog = useBlogPosts();

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink">Blog</h1>
        <p className="mt-1.5 text-sm text-ink-soft">Tips and articles to help you learn English faster.</p>
      </div>

      {blog.isLoading ? (
        <div className="space-y-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-lg bg-line/50" />
          ))}
        </div>
      ) : blog.isError || !blog.data?.length ? (
        <p className="rounded-xl border border-dashed border-line px-4 py-10 text-center text-sm text-ink-soft">
          No posts have been published yet.
        </p>
      ) : (
        <div>
          {blog.data.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
