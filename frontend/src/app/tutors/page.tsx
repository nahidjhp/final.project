"use client";

import { useTutors } from "@/hooks/useTutors";
import TutorCard from "@/components/TutorCard";
import { RowSkeleton } from "@/components/Skeletons";

export default function TutorsPage() {
  const tutors = useTutors();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink">Tutors</h1>
        <p className="mt-1.5 text-sm text-ink-soft">Every tutor listed here has been reviewed and approved by an admin.</p>
      </div>

      {tutors.isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => <RowSkeleton key={i} />)}
        </div>
      ) : tutors.isError || !tutors.data?.length ? (
        <p className="rounded-xl border border-dashed border-line px-4 py-10 text-center text-sm text-ink-soft">
          No tutors to show right now.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {tutors.data.map((t) => (
            <TutorCard key={t.id} tutor={t} />
          ))}
        </div>
      )}
    </div>
  );
}
