import api from "@/lib/axios";
import { StudentDashboardData } from "@/types";

export interface EditStudentProfilePayload {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  bio?: string;
  profile_picture?: File | null;
}

export interface EnrollPayload {
  course: number | string;
  payment_amount: string | number;
  currency: string;
  payment_note?: string;
  payment_proof: File;
}

export const studentService = {
  dashboard: () => api.get<StudentDashboardData>("/students/me/dashboard/"),

  editProfile: (payload: EditStudentProfilePayload) => {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value as string | Blob);
      }
    });
    return api.patch("/students/me/profile/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  
  enroll: (payload: EnrollPayload) => {
    const formData = new FormData();
    formData.append("course", String(payload.course));
    formData.append("payment_amount", String(payload.payment_amount));
    formData.append("currency", payload.currency);
    if (payload.payment_note) formData.append("payment_note", payload.payment_note);
    formData.append("payment_proof", payload.payment_proof);
    return api.post("/enrollments/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
