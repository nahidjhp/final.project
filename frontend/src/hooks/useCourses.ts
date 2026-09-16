"use client";

import { useQuery } from "@tanstack/react-query";
import { coursesService } from "@/services/courses.service";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => (await coursesService.list()).data,
  });
}
