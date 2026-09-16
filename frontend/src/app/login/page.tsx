"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { loginSchema, LoginValues } from "@/lib/validation";
import FormField, { inputClass } from "@/components/FormField";
import { useLogin } from "@/hooks/useAuthActions";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const login = useLogin();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-14">
      <div className="mb-7 text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-navy text-amber">
          <LogIn size={19} />
        </span>
        <h1 className="mt-4 text-2xl font-bold text-ink">Sign in to your account</h1>
        <p className="mt-1.5 text-sm text-ink-soft">Continue where you left off.</p>
      </div>

      <form
        onSubmit={handleSubmit((values) => login.mutate(values))}
        className="flex flex-col gap-4 rounded-2xl border border-line bg-paper-raised p-6"
      >
        <FormField label="Email" error={errors.email?.message}>
          <input type="email" className={inputClass} placeholder="you@example.com" {...register("email")} />
        </FormField>
        <FormField label="Password" error={errors.password?.message}>
          <input type="password" className={inputClass} placeholder="••••••••" {...register("password")} />
        </FormField>
        <button
          type="submit"
          disabled={login.isPending}
          className="mt-2 w-full rounded-lg bg-amber py-3 text-sm font-bold text-navy transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {login.isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Don&apos;t have an account?{" "}
        <Link href="/register/student" className="font-medium text-teal">Join as a student</Link>
        {" or "}
        <Link href="/register/tutor" className="font-medium text-teal">as a tutor</Link>
      </p>
    </div>
  );
}
