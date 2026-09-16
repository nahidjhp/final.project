"use client";

import Link from "next/link";
import { BookMarked, CheckCircle2, CreditCard, Pencil } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import { useStudentDashboardData } from "@/hooks/useStudentDashboard";
import { useAppSelector } from "@/store/hooks";
import StatusBadge from "@/components/StatusBadge";
import { formatMoney } from "@/lib/format";

function DashboardBody() {
  const { user } = useAppSelector((s) => s.auth);
  const { data, isLoading, isError } = useStudentDashboardData();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Student dashboard</h1>
          <p className="mt-1 text-sm text-ink-soft">{user?.first_name ? `Welcome back, ${user.first_name}` : "Welcome back."}</p>
        </div>
        <Link
          href="/dashboard/student/edit"
          className="flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-amber"
        >
          <Pencil size={15} />
          Edit profile
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="h-40 animate-pulse rounded-2xl bg-line/50" />
          <div className="h-40 animate-pulse rounded-2xl bg-line/50" />
        </div>
      ) : isError || !data ? (
        <p className="rounded-xl border border-dashed border-line px-4 py-10 text-center text-sm text-ink-soft">
          Your dashboard isn&apos;t available right now.
        </p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-2xl border border-line bg-paper-raised p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-ink">
              <BookMarked size={18} className="text-teal" />
              My enrollments
            </h2>
            {!data.enrollments.length ? (
              <p className="mt-4 text-sm text-ink-soft">You haven&apos;t enrolled in any course yet — browse the course list to get started.</p>
            ) : (
              <ul className="mt-4 flex flex-col gap-3">
                {data.enrollments.map((e) => (
                  <li key={e.id} className="flex items-center justify-between rounded-lg border border-line px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-ink">{e.course.title}</p>
                      <p className="mt-1 text-xs text-ink-soft">{formatMoney(e.payment_amount, e.currency)}</p>
                    </div>
                    <StatusBadge status={e.status} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div className="flex flex-col gap-5">
            <section className="rounded-2xl border border-line bg-paper-raised p-6">
              <h2 className="flex items-center gap-2 text-base font-bold text-ink">
                <CreditCard size={18} className="text-amber-ink" />
                Payment status
              </h2>
              {!data.enrollments.length ? (
                <p className="mt-4 text-sm text-ink-soft">No payments submitted yet.</p>
              ) : (
                <ul className="mt-4 flex flex-col gap-2.5">
                  {data.enrollments.map((e) => (
                    <li key={e.id} className="flex items-center justify-between text-sm">
                      <span className="text-ink-soft">{e.course.title}</span>
                      <StatusBadge status={e.status} />
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="rounded-2xl border border-line bg-paper-raised p-6">
              <h2 className="flex items-center gap-2 text-base font-bold text-ink">
                <CheckCircle2 size={18} className="text-coral" />
                Approved courses
              </h2>
              {!data.approved_courses.length ? (
                <p className="mt-4 text-sm text-ink-soft">Once a course is approved, you&apos;ll see it here.</p>
              ) : (
                <ul className="mt-4 flex flex-col gap-2.5">
                  {data.approved_courses.map((c) => (
                    <li key={c.id} className="text-sm text-ink">{c.title}</li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StudentDashboardPage() {
  return (
    <AuthGuard requireTeacher={false}>
      <DashboardBody />
    </AuthGuard>
  );
}
