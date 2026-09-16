"use client";

import Link from "next/link";
import { ArrowRight, MessagesSquare, ShieldCheck, Sparkles } from "lucide-react";
import { useCourses } from "@/hooks/useCourses";
import { useTutors } from "@/hooks/useTutors";
import { useBlogPosts } from "@/hooks/useBlog";
import CourseCard from "@/components/CourseCard";
import TutorCard from "@/components/TutorCard";
import BlogCard from "@/components/BlogCard";
import { CardSkeleton, RowSkeleton } from "@/components/Skeletons";
import { tutorDisplayName } from "@/lib/format";

function SectionHeader({ title, href, linkLabel }: { title: string; href: string; linkLabel: string }) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <Link href={href} className="flex items-center gap-1 text-sm font-medium text-teal hover:opacity-80">
        {linkLabel}
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}

function EmptyNote({ text }: { text: string }) {
  return <p className="rounded-xl border border-dashed border-line px-4 py-6 text-center text-sm text-ink-soft">{text}</p>;
}

export default function HomePage() {
  const courses = useCourses();
  const tutors = useTutors();
  const blog = useBlogPosts();

  const tutorNameById = new Map<number, string>();
  tutors.data?.forEach((t) => tutorNameById.set(t.id, tutorDisplayName(t.user)));

  return (
    <div>
      <section className="border-b border-line bg-navy text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
          <div>
            <h1 className="text-3xl font-extrabold leading-[1.35] md:text-4xl">
              Learn English with a tutor who actually tracks your progress
            </h1>
            <p className="mt-5 max-w-lg leading-8 text-white/70">
              Book real lessons, learn from approved tutors, and see exactly where every enrollment and payment stands — no guesswork.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register/student" className="rounded-lg bg-amber px-5 py-3 text-sm font-bold text-navy transition-opacity hover:opacity-90">
                Start learning
              </Link>
              <Link href="/register/tutor" className="rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                Teach on FluentDoor
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 content-center gap-3">
            {[
              { icon: Sparkles, label: "Practical courses", desc: "Built for real conversation" },
              { icon: ShieldCheck, label: "Approved tutors", desc: "Vetted before they go live" },
              { icon: MessagesSquare, label: "Clear enrollment status", desc: "Track every payment and review" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3.5">
                <Icon size={20} className="shrink-0 text-amber" />
                <div>
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="text-xs text-white/60">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <SectionHeader title="Popular courses" href="/courses" linkLabel="Browse all courses" />
        {courses.isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : courses.isError || !courses.data?.length ? (
          <EmptyNote text="No courses to show right now. New courses are added regularly." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.data.slice(0, 3).map((c) => (
              <CourseCard key={c.id} course={c} tutorName={tutorNameById.get(c.tutor.id)} />
            ))}
          </div>
        )}
      </section>

      <section className="border-y border-line bg-paper-raised">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <SectionHeader title="Featured tutors" href="/tutors" linkLabel="See all tutors" />
          {tutors.isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => <RowSkeleton key={i} />)}
            </div>
          ) : tutors.isError || !tutors.data?.length ? (
            <EmptyNote text="Tutor listings aren't available right now." />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {tutors.data.slice(0, 4).map((t) => (
                <TutorCard key={t.id} tutor={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <SectionHeader title="From the blog" href="/blog" linkLabel="Read all posts" />
        {blog.isLoading ? (
          <div className="space-y-4">
            <div className="h-16 animate-pulse rounded-lg bg-line/50" />
            <div className="h-16 animate-pulse rounded-lg bg-line/50" />
          </div>
        ) : blog.isError || !blog.data?.length ? (
          <EmptyNote text="No posts have been published yet." />
        ) : (
          <div>
            {blog.data.slice(0, 3).map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
