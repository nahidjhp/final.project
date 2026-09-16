"use client";

import { useMemo, useState } from "react";
import { Check, Loader2, Plus, Users, X } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import TutorProfileForm from "@/components/TutorProfileForm";
import CreateCourseForm from "@/components/CreateCourseForm";
import StatusBadge from "@/components/StatusBadge";
import { useTutorDashboardData, useReviewEnrollment } from "@/hooks/useTutorDashboard";
import { useAppSelector } from "@/store/hooks";
import { formatMoney } from "@/lib/format";

function StatCard({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-5">
      <Icon size={18} className="text-teal" />
      <p className="mt-3 text-2xl font-extrabold text-ink">{value}</p>
      <p className="mt-1 text-xs text-ink-soft">{label}</p>
    </div>
  );
}

function DashboardBody() {
  const { user } = useAppSelector((s) => s.auth);
  const { data, isLoading } = useTutorDashboardData(true);
  const review = useReviewEnrollment();
  const [creatingCourse, setCreatingCourse] = useState(false);

  const pending = useMemo(
    () => data?.enrollments.filter((e) => e.status === "under_review" || e.status === "pending_payment") ?? [],
    [data]
  );
  const approvedCount = data?.enrollments.filter((e) => e.status === "approved").length ?? 0;
  const uniqueStudents = new Set(data?.enrollments.map((e) => e.id)).size;

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-ink-soft">
        <Loader2 className="animate-spin" size={22} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-12">
        <p className="rounded-xl border border-dashed border-line px-4 py-10 text-center text-sm text-ink-soft">
          Your dashboard isn&apos;t available right now.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Tutor dashboard</h1>
          <p className="mt-1 text-sm text-ink-soft">{user?.first_name ? `Welcome back, ${user.first_name}` : "Welcome back."}</p>
        </div>
        <button
          onClick={() => setCreatingCourse(true)}
          className="flex items-center gap-1.5 rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-navy transition-opacity hover:opacity-90"
        >
          <Plus size={15} />
          New course
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Users} label="Active courses" value={data.courses.length} />
        <StatCard icon={Check} label="Approved enrollments" value={approvedCount} />
        <StatCard icon={Users} label="Total enrollments" value={uniqueStudents} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <section className="rounded-2xl border border-line bg-paper-raised p-6">
          <h2 className="text-base font-bold text-ink">My courses</h2>
          {!data.courses.length ? (
            <p className="mt-4 text-sm text-ink-soft">You haven&apos;t created any course yet.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {data.courses.map((c) => (
                <li key={c.id} className="rounded-lg border border-line px-4 py-3 text-sm">
                  <p className="font-medium text-ink">{c.title}</p>
                  <p className="mt-1 text-xs text-ink-soft">
                    {c.language} · {c.level} · {c.active_students}/{c.capacity} enrolled
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-line bg-paper-raised p-6">
          <h2 className="text-base font-bold text-ink">Pending enrollments</h2>
          {!pending.length ? (
            <p className="mt-4 text-sm text-ink-soft">No enrollments are waiting for review.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {pending.map((e) => (
                <li key={e.id} className="rounded-lg border border-line px-4 py-3 text-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-ink">{e.course.title}</p>
                    <StatusBadge status={e.status} />
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">{formatMoney(e.payment_amount, e.currency)}</p>
                  {e.payment_proof && (
                    <a href={e.payment_proof} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-teal underline">
                      View payment proof
                    </a>
                  )}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => review.mutate({ id: e.id, action: "approve" })}
                      disabled={review.isPending}
                      className="flex items-center gap-1 rounded-md bg-teal px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      <Check size={13} /> Approve
                    </button>
                    <button
                      onClick={() => review.mutate({ id: e.id, action: "reject" })}
                      disabled={review.isPending}
                      className="flex items-center gap-1 rounded-md border border-coral px-3 py-1.5 text-xs font-semibold text-coral transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      <X size={13} /> Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {creatingCourse && <CreateCourseForm onClose={() => setCreatingCourse(false)} />}
    </div>
  );
}

function TutorDashboardGate() {
  const { user } = useAppSelector((s) => s.auth);

  // /api/me/ tells us directly whether a tutor profile exists and
  // whether it's approved — no need to guess from a failed request.
  if (!user?.has_tutor_profile || !user.tutor_approved) {
    return <TutorProfileForm />;
  }

  return <DashboardBody />;
}

export default function TutorDashboardPage() {
  return (
    <AuthGuard requireTeacher={true}>
      <TutorDashboardGate />
    </AuthGuard>
  );
}
