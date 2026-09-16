import api from "@/lib/axios";
import { BlogPost } from "@/types";

export const blogService = {
  list: () => api.get<BlogPost[]>("/blogs/"),
};
