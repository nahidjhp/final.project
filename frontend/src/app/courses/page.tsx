"use client";

import { useState } from "react";
import { useCourses } from "@/hooks/useCourses";
import { useTutors } from "@/hooks/useTutors";
import { useAppSelector } from "@/store/hooks";
import CourseCard from "@/components/CourseCard";
import EnrollDialog from "@/components/EnrollDialog";
import { CardSkeleton } from "@/components/Skeletons";
import { Course } from "@/types";
import { tutorDisplayName } from "@/lib/format";

export default function CoursesPage() {
  const courses = useCourses();
  const tutors = useTutors();
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  const canEnroll = isAuthenticated && !user?.is_teacher;
  const [enrolling, setEnrolling] = useState<Course | null>(null);

  const tutorNameById = new Map<number, string>();
  tutors.data?.forEach((t) => tutorNameById.set(t.id, tutorDisplayName(t.user)));

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink">Courses</h1>
        <p className="mt-1.5 text-sm text-ink-soft">Pick a course that matches your level and enroll — a tutor reviews every enrollment.</p>
      </div>

      {courses.isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : courses.isError || !courses.data?.length ? (
        <p className="rounded-xl border border-dashed border-line px-4 py-10 text-center text-sm text-ink-soft">
          No courses found. Please check back later.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.data.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              tutorName={tutorNameById.get(c.tutor.id)}
              onEnroll={canEnroll ? (course) => setEnrolling(course) : undefined}
            />
          ))}
        </div>
      )}

      {enrolling && <EnrollDialog course={enrolling} onClose={() => setEnrolling(null)} />}
    </div>
  );
}
