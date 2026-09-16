"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { tutorService, CreateTutorProfilePayload } from "@/services/tutor.service";
import { coursesService } from "@/services/courses.service";
import { extractErrorMessage } from "./useAuthActions";

export function useTutorDashboardData(enabled: boolean) {
  return useQuery({
    queryKey: ["tutor", "dashboard"],
    queryFn: async () => (await tutorService.myDashboard()).data,
    enabled,
  });
}

export function useCreateTutorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTutorProfilePayload) => tutorService.createProfile(payload),
    onSuccess: () => {
      toast.success("Profile submitted — it's now awaiting admin approval.");
      queryClient.invalidateQueries({ queryKey: ["tutor", "dashboard"] });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Could not submit your profile."));
    },
  });
}

export function useReviewEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, action }: { id: number; action: "approve" | "reject" }) =>
      action === "approve" ? coursesService.approveEnrollment(id) : coursesService.rejectEnrollment(id),
    onSuccess: (_, variables) => {
      toast.success(variables.action === "approve" ? "Enrollment approved." : "Enrollment rejected.");
      queryClient.invalidateQueries({ queryKey: ["tutor", "dashboard"] });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Could not update this enrollment."));
    },
  });
}
