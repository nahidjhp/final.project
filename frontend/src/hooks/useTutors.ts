"use client";

import { useQuery } from "@tanstack/react-query";
import { tutorsService } from "@/services/tutors.service";

export function useTutors() {
  return useQuery({
    queryKey: ["tutors"],
    queryFn: async () => (await tutorsService.list()).data,
  });
}
