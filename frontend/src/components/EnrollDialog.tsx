"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { enrollSchema, EnrollValues } from "@/lib/validation";
import FormField, { inputClass } from "@/components/FormField";
import { useEnrollCourse } from "@/hooks/useStudentDashboard";
import { Course } from "@/types";
import toast from "react-hot-toast";

export default function EnrollDialog({ course, onClose }: { course: Course; onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnrollValues>({
    resolver: zodResolver(enrollSchema),
    defaultValues: { payment_amount: course.price_per_hour, currency: "USD" },
  });

  const [proofFile, setProofFile] = useState<File | null>(null);
  const enroll = useEnrollCourse();

  const onSubmit = (values: EnrollValues) => {
    if (!proofFile) {
      toast.error("Please attach a payment proof image.");
      return;
    }
    enroll.mutate(
      { course: course.id, payment_amount: Number(values.payment_amount), currency: values.currency, payment_note: values.payment_note, payment_proof: proofFile },
      { onSuccess: onClose }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-line bg-paper-raised p-6">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-ink">Enroll in {course.title}</h2>
            <p className="mt-1 text-sm text-ink-soft">Submit your payment details — a tutor or admin will review it.</p>
          </div>
          <button onClick={onClose} className="text-ink-soft hover:text-ink" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Amount" error={errors.payment_amount?.message}>
              <input type="number" step="0.01" className={inputClass} {...register("payment_amount")} />
            </FormField>
            <FormField label="Currency" error={errors.currency?.message}>
              <select className={inputClass} {...register("currency")}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="TOMAN">TOMAN</option>
              </select>
            </FormField>
          </div>
          <FormField label="Note (optional)">
            <textarea className={`${inputClass} min-h-16`} placeholder="Anything the reviewer should know" {...register("payment_note")} />
          </FormField>
          <FormField label="Payment proof">
            <label
              htmlFor="payment_proof"
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-line px-3.5 py-3 text-sm text-ink-soft transition-colors hover:border-amber"
            >
              <Upload size={16} />
              {proofFile?.name ?? "Upload a screenshot or photo of your payment"}
            </label>
            <input
              id="payment_proof"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
            />
          </FormField>
          <button
            type="submit"
            disabled={enroll.isPending}
            className="mt-1 w-full rounded-lg bg-amber py-3 text-sm font-bold text-navy transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {enroll.isPending ? "Submitting..." : "Submit enrollment"}
          </button>
        </form>
      </div>
    </div>
  );
}
