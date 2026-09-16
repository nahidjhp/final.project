import api from "@/lib/axios";
import { Course, Enrollment } from "@/types";

export interface CreateCoursePayload {
  title: string;
  courseId: string;
  description?: string;
  language: string;
  level: string;
  schedule_day: string;
  schedule_start: string;
  schedule_end: string;
  capacity: number;
  price_per_hour?: number;
}

export const coursesService = {
  list: () => api.get<Course[]>("/courses/"),
  detail: (id: number | string) => api.get<Course>(`/courses/${id}/`),
  create: (payload: CreateCoursePayload) => api.post<Course>("/courses/", payload),
  update: (id: number | string, payload: Partial<CreateCoursePayload>) => api.patch(`/courses/${id}/`, payload),
  remove: (id: number | string) => api.delete(`/courses/${id}/`),
  // A tutor approves or rejects a pending enrollment for one of their own courses.
  approveEnrollment: (id: number) => api.patch<Enrollment>(`/enrollments/${id}/approve/`),
  rejectEnrollment: (id: number, note?: string) =>
    api.patch<Enrollment>(`/enrollments/${id}/reject/`, note ? { payment_note: note } : {}),
};
