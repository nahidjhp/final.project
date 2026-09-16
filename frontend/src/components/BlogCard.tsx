import { BlogPost } from "@/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex gap-4 border-b border-line py-5 first:pt-0 last:border-none">
      <div className="w-20 shrink-0 text-xs text-ink-soft">
        {post.created_at ? new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-ink">{post.title}</h3>
          {post.difficulty_level && (
            <span className="rounded-full bg-teal-soft px-2 py-0.5 text-[11px] font-medium text-teal">{post.difficulty_level}</span>
          )}
        </div>
        {post.description && <p className="mt-1.5 text-sm leading-6 text-ink-soft">{post.description}</p>}
        <p className="mt-2 text-xs text-ink-soft">By {post.author}</p>
      </div>
    </article>
  );
}
