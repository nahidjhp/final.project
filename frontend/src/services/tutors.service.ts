import api from "@/lib/axios";
import { Tutor } from "@/types";

export const tutorsService = {
  list: () => api.get<Tutor[]>("/tutors/"),
};
