"use client";

import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blog.service";

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blog"],
    queryFn: async () => (await blogService.list()).data,
  });
}
