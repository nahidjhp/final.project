import { CalendarClock, GraduationCap, SignalHigh, Users } from "lucide-react";
import { Course } from "@/types";

export default function CourseCard({
  course,
  tutorName,
  onEnroll,
}: {
  course: Course;
  tutorName?: string;
  onEnroll?: (course: Course) => void;
}) {
  const seatsLeft = course.capacity - course.active_students;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper-raised transition-shadow hover:shadow-lg hover:shadow-navy/5">
      <div className="flex h-36 items-center justify-center overflow-hidden bg-navy-soft text-amber">
        {course.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
        ) : (
          <GraduationCap size={34} strokeWidth={1.4} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <h3 className="text-base font-bold leading-snug text-ink">{course.title}</h3>
        <p className="text-sm text-ink-soft">with {tutorName ?? "Unknown tutor"}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
          {course.level && (
            <span className="flex items-center gap-1 rounded-full bg-teal-soft px-2.5 py-1 text-teal">
              <SignalHigh size={12} /> {course.level}
            </span>
          )}
          {course.language && (
            <span className="rounded-full bg-amber/15 px-2.5 py-1 text-amber-ink">{course.language}</span>
          )}
          {course.schedule_day && (
            <span className="flex items-center gap-1 rounded-full bg-line/60 px-2.5 py-1 text-ink-soft">
              <CalendarClock size={12} /> {course.schedule_day}
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center justify-between text-sm">
          <span className="font-semibold text-ink">${course.price_per_hour}/hr</span>
          <span className="flex items-center gap-1 text-xs text-ink-soft">
            <Users size={12} /> {seatsLeft > 0 ? `${seatsLeft} seats left` : "Full"}
          </span>
        </div>
        {onEnroll && (
          <button
            onClick={() => onEnroll(course)}
            className="mt-2 w-full rounded-lg bg-navy py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Enroll in this course
          </button>
        )}
      </div>
    </div>
  );
}
