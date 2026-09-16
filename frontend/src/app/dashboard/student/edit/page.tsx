"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthGuard from "@/components/AuthGuard";
import FormField, { inputClass } from "@/components/FormField";
import { editProfileSchema, EditProfileValues } from "@/lib/validation";
import { useEditStudentProfile } from "@/hooks/useStudentDashboard";
import { useAppSelector } from "@/store/hooks";

function EditForm() {
  const router = useRouter();
  const { user } = useAppSelector((s) => s.auth);
  const editProfile = useEditStudentProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileValues>({ resolver: zodResolver(editProfileSchema) });

  useEffect(() => {
    if (user) {
      reset({ first_name: user.first_name, last_name: user.last_name });
    }
  }, [user, reset]);

  return (
    <div className="mx-auto max-w-lg px-5 py-12">
      <h1 className="mb-1 text-2xl font-bold text-ink">Edit profile</h1>
      <p className="mb-7 text-sm text-ink-soft">Keep your details up to date.</p>

      <form
        onSubmit={handleSubmit((values) =>
          editProfile.mutate(values, { onSuccess: () => router.push("/dashboard/student") })
        )}
        className="flex flex-col gap-4 rounded-2xl border border-line bg-paper-raised p-6"
      >
        <div className="grid grid-cols-2 gap-3">
          <FormField label="First name" error={errors.first_name?.message}>
            <input type="text" className={inputClass} {...register("first_name")} />
          </FormField>
          <FormField label="Last name" error={errors.last_name?.message}>
            <input type="text" className={inputClass} {...register("last_name")} />
          </FormField>
        </div>
        <FormField label="Phone number">
          <input type="text" className={inputClass} placeholder="Optional" {...register("phone_number")} />
        </FormField>
        <FormField label="Bio">
          <textarea className={`${inputClass} min-h-24`} placeholder="A little about you (optional)" {...register("bio")} />
        </FormField>
        <button
          type="submit"
          disabled={editProfile.isPending}
          className="mt-2 w-full rounded-lg bg-amber py-3 text-sm font-bold text-navy transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {editProfile.isPending ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}

export default function EditStudentProfilePage() {
  return (
    <AuthGuard requireTeacher={false}>
      <EditForm />
    </AuthGuard>
  );
}
