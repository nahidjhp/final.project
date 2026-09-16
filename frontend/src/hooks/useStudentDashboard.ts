"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { studentService, EditStudentProfilePayload, EnrollPayload } from "@/services/student.service";
import { extractErrorMessage } from "./useAuthActions";

export function useStudentDashboardData() {
  return useQuery({
    queryKey: ["student", "dashboard"],
    queryFn: async () => (await studentService.dashboard()).data,
  });
}

export function useEditStudentProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditStudentProfilePayload) => studentService.editProfile(payload),
    onSuccess: () => {
      toast.success("Profile updated.");
      queryClient.invalidateQueries({ queryKey: ["student", "dashboard"] });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Could not update your profile."));
    },
  });
}

export function useEnrollCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EnrollPayload) => studentService.enroll(payload),
    onSuccess: () => {
      toast.success("Enrollment submitted — it's now under review.");
      queryClient.invalidateQueries({ queryKey: ["student", "dashboard"] });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Could not submit your enrollment."));
    },
  });
}
