"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { registerSchema, RegisterValues } from "@/lib/validation";
import FormField, { inputClass } from "@/components/FormField";
import { useRegister } from "@/hooks/useAuthActions";

export default function RegisterForm({ isTeacher, title, subtitle }: { isTeacher: boolean; title: string; subtitle: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  const doRegister = useRegister();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-14">
      <div className="mb-7 text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-navy text-amber">
          <UserPlus size={19} />
        </span>
        <h1 className="mt-4 text-2xl font-bold text-ink">{title}</h1>
        <p className="mt-1.5 text-sm text-ink-soft">{subtitle}</p>
      </div>

      <form
        onSubmit={handleSubmit((values) => doRegister.mutate({ ...values, is_teacher: isTeacher }))}
        className="flex flex-col gap-4 rounded-2xl border border-line bg-paper-raised p-6"
      >
        <div className="grid grid-cols-2 gap-3">
          <FormField label="First name" error={errors.first_name?.message}>
            <input type="text" className={inputClass} placeholder="Jane" {...register("first_name")} />
          </FormField>
          <FormField label="Last name" error={errors.last_name?.message}>
            <input type="text" className={inputClass} placeholder="Doe" {...register("last_name")} />
          </FormField>
        </div>
        <FormField label="Email" error={errors.email?.message}>
          <input type="email" className={inputClass} placeholder="you@example.com" {...register("email")} />
        </FormField>
        <FormField label="Password" error={errors.password?.message}>
          <input type="password" className={inputClass} placeholder="At least 8 characters" {...register("password")} />
        </FormField>
        <button
          type="submit"
          disabled={doRegister.isPending}
          className="mt-2 w-full rounded-lg bg-amber py-3 text-sm font-bold text-navy transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {doRegister.isPending ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Already have an account? <Link href="/login" className="font-medium text-teal">Sign in</Link>
      </p>
    </div>
  );
}
