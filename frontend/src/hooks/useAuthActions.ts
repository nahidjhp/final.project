"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authService, LoginPayload, RegisterPayload } from "@/services/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { fetchCurrentUser, clearUser, logoutUser } from "@/store/authSlice";

function extractErrorMessage(error: unknown, fallback: string) {
  const err = error as { response?: { data?: Record<string, unknown> } };
  const data = err?.response?.data;
  if (data && typeof data === "object") {
    const firstKey = Object.keys(data)[0];
    const firstVal = firstKey ? data[firstKey] : null;
    if (Array.isArray(firstVal)) return String(firstVal[0]);
    if (typeof firstVal === "string") return firstVal;
  }
  return fallback;
}

export function useLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: async () => {
      const me = await dispatch(fetchCurrentUser()).unwrap();
      toast.success("Welcome back!");
      router.push(me.is_teacher ? "/dashboard/tutor" : "/dashboard/student");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Incorrect email or password."));
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: () => {
      toast.success("Account created. You can log in now.");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Registration failed. Please check your details."));
    },
  });
}

export function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: () => dispatch(logoutUser()),
    onSuccess: () => {
      dispatch(clearUser());
      toast.success("You've been signed out.");
      router.push("/login");
    },
  });
}

export { extractErrorMessage };
