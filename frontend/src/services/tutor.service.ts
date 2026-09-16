import api from "@/lib/axios";
import { TutorDashboardData } from "@/types";

export interface CreateTutorProfilePayload {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  country?: string;
  subjects: string[];
  languages_spoken?: { language: string; level: string }[];
  bio?: string;
  teaching_style?: string;
  expectation?: string;
  description?: string;
  intro_video_url?: string;
  profile_picture?: File | null;
  intro_video_file?: File | null;
}

export const tutorService = {
 
  createProfile: (payload: CreateTutorProfilePayload) => {
    const formData = new FormData();
    const { profile_picture, intro_video_file, subjects, languages_spoken, ...rest } = payload;

    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });
    formData.append("subjects", JSON.stringify(subjects));
    if (languages_spoken?.length) {
      formData.append("languages_spoken", JSON.stringify(languages_spoken));
    }
    if (profile_picture) formData.append("profile_picture", profile_picture);
    if (intro_video_file) formData.append("intro_video_file", intro_video_file);

    return api.post("/create-tutor-profile/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  myDashboard: () => api.get<TutorDashboardData>("/tutors/me/dashboard/"),
};
