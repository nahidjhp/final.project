"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Plus, X } from "lucide-react";
import { createCourseSchema, CreateCourseValues } from "@/lib/validation";
import FormField, { inputClass } from "@/components/FormField";
import { coursesService } from "@/services/courses.service";
import { extractErrorMessage } from "@/hooks/useAuthActions";

export default function CreateCourseForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCourseValues>({ resolver: zodResolver(createCourseSchema) });

  const queryClient = useQueryClient();
  const createCourse = useMutation({
    mutationFn: (values: CreateCourseValues) =>
      coursesService.create({
        ...values,
        capacity: Number(values.capacity),
        price_per_hour: values.price_per_hour ? Number(values.price_per_hour) : undefined,
      }),
    onSuccess: () => {
      toast.success("Course created.");
      queryClient.invalidateQueries({ queryKey: ["tutor", "dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      onClose();
    },
    onError: (error) => toast.error(extractErrorMessage(error, "Could not create the course.")),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-paper-raised p-6">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-ink">New course</h2>
            <p className="mt-1 text-sm text-ink-soft">Fill in the essentials — you can add lessons afterward.</p>
          </div>
          <button onClick={onClose} className="text-ink-soft hover:text-ink" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit((v) => createCourse.mutate(v))} className="flex flex-col gap-4">
          <FormField label="Title" error={errors.title?.message}>
            <input type="text" className={inputClass} {...register("title")} />
          </FormField>
          <FormField label="Course ID" error={errors.courseId?.message}>
            <input type="text" className={inputClass} placeholder="e.g. cr1010" {...register("courseId")} />
          </FormField>
          <FormField label="Description">
            <textarea className={`${inputClass} min-h-20`} {...register("description")} />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Language" error={errors.language?.message}>
              <input type="text" className={inputClass} {...register("language")} />
            </FormField>
            <FormField label="Level" error={errors.level?.message}>
              <input type="text" className={inputClass} placeholder="Beginner / Intermediate / Advanced" {...register("level")} />
            </FormField>
          </div>
          <FormField label="Schedule day" error={errors.schedule_day?.message}>
            <input type="text" className={inputClass} placeholder="e.g. Monday" {...register("schedule_day")} />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Start time" error={errors.schedule_start?.message}>
              <input type="time" className={inputClass} {...register("schedule_start")} />
            </FormField>
            <FormField label="End time" error={errors.schedule_end?.message}>
              <input type="time" className={inputClass} {...register("schedule_end")} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Capacity" error={errors.capacity?.message}>
              <input type="number" className={inputClass} {...register("capacity")} />
            </FormField>
            <FormField label="Price per hour ($)">
              <input type="number" step="0.01" className={inputClass} {...register("price_per_hour")} />
            </FormField>
          </div>
          <button
            type="submit"
            disabled={createCourse.isPending}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-amber py-3 text-sm font-bold text-navy transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <Plus size={16} />
            {createCourse.isPending ? "Creating..." : "Create course"}
          </button>
        </form>
      </div>
    </div>
  );
}
