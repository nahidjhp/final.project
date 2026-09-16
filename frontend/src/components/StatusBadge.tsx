import { EnrollmentStatus } from "@/types";

const map: Record<EnrollmentStatus, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-line/60 text-ink-soft" },
  pending_payment: { label: "Payment pending", className: "bg-amber/15 text-amber-ink" },
  under_review: { label: "Under review", className: "bg-amber/15 text-amber-ink" },
  approved: { label: "Approved", className: "bg-teal-soft text-teal" },
  rejected: { label: "Rejected", className: "bg-coral-soft text-coral" },
  cancelled: { label: "Cancelled", className: "bg-line/60 text-ink-soft" },
};

export default function StatusBadge({ status }: { status: EnrollmentStatus }) {
  const s = map[status] ?? map.under_review;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${s.className}`}>
      {s.label}
    </span>
  );
}
