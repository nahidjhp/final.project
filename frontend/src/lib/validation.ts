import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const editProfileSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  phone_number: z.string().optional(),
  bio: z.string().optional(),
});

export const tutorProfileSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone_number: z.string().optional(),
  country: z.string().optional(),
  subjectsText: z.string().min(2, "Enter at least one subject (comma-separated)"),
  bio: z.string().min(20, "Your bio should be at least 20 characters"),
  teaching_style: z.string().optional(),
  expectation: z.string().optional(),
  description: z.string().optional(),
  intro_video_url: z.string().url("Enter a valid URL").optional().or(z.literal("")),
});

export const enrollSchema = z.object({
  payment_amount: z
    .string()
    .min(1, "Amount is required")
    .refine((v) => Number(v) > 0, "Amount must be greater than 0"),
  currency: z.string().min(1, "Currency is required"),
  payment_note: z.string().optional(),
});

export const createCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  courseId: z.string().min(2, "Course ID is required"),
  description: z.string().optional(),
  language: z.string().min(1, "Language is required"),
  level: z.string().min(1, "Level is required"),
  schedule_day: z.string().min(1, "Schedule day is required"),
  schedule_start: z.string().min(1, "Start time is required"),
  schedule_end: z.string().min(1, "End time is required"),
  capacity: z
    .string()
    .min(1, "Capacity is required")
    .refine((v) => Number.isInteger(Number(v)) && Number(v) > 0, "Capacity must be a positive number"),
  price_per_hour: z.string().optional(),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type EditProfileValues = z.infer<typeof editProfileSchema>;
export type TutorProfileValues = z.infer<typeof tutorProfileSchema>;
export type EnrollValues = z.infer<typeof enrollSchema>;
export type CreateCourseValues = z.infer<typeof createCourseSchema>;
