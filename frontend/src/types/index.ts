export type EnrollmentStatus =
  | "draft"
  | "pending_payment"
  | "under_review"
  | "approved"
  | "rejected"
  | "cancelled";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_teacher: boolean;
  profile_picture: string | null;
  has_tutor_profile: boolean;
  tutor_id: number | null;
  tutor_approved: boolean | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
}


export type LanguagesSpoken = string[] | Record<string, string>;

export interface TutorUserMini {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}


export interface CourseTutorMini {
  id: number;
  user: number;
  profile_picture: string | null;
  languages_spoken: LanguagesSpoken;
  subjects: string[];
}

export interface TutorCertificate {
  id: number;
  title: string;
  issued_by?: string;
  issue_date?: string | null;
  certificate_image?: string | null;
}

export interface TutorEducation {
  id: number;
  degree: string;
  institution_name: string;
  country?: string;
  city?: string;
  field?: string;
  start_date?: string | null;
  end_date?: string | null;
}

export interface TutorExperience {
  id: number;
  title: string;
  organization?: string;
  country?: string;
  city?: string;
  start_date?: string | null;
  end_date?: string | null;
  description?: string;
}

export interface TutorCourseOffering {
  id: number;
  course_title: string;
  duration_minutes: number;
  course_type: "online" | "offline";
  price_per_hour: string;
  lesson_package: string;
  language: string;
  days_available: string[];
  time_slots: string[];
  start_date: string;
  description: string;
}


export interface Tutor {
  id: number;
  user: TutorUserMini;
  profile_picture: string | null;
  languages_spoken: LanguagesSpoken;
  country: string;
  subjects: string[];
  phone_number: string;
  bio: string;
  teaching_style: string;
  expectation: string;
  description: string;
  intro_video_url: string;
  intro_video_file: string | null;
  certificates: TutorCertificate[];
  educations: TutorEducation[];
  experiences: TutorExperience[];
  courses: TutorCourseOffering[];
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  lesson_video?: string | null;
  lesson_document?: string | null;
}

export interface Course {
  id: number;
  courseId: string;
  title: string;
  description: string;
  detail: string;
  requirements: string;
  materials: string;
  price_per_hour: string;
  price_per_dollar: string;
  price_per_toman: string;
  language: string;
  level: string;
  schedule_day: string;
  schedule_start: string;
  schedule_end: string;
  capacity: number;
  active_students: number;
  length: number;
  course_duration: number;
  image: string | null;
  language_flag: string | null;
  lessons: Lesson[];
  tutor: CourseTutorMini;
}

export interface Enrollment {
  id: number;
  course: Course;
  status: EnrollmentStatus;
  payment_amount: string;
  currency: string;
  payment_note: string;
  payment_proof: string | null;
  submitted_at: string;
  reviewed_at: string | null;
}

export interface StudentProfile {
  id: number;
  user: number;
  courses_list: number[];
  favourite_tutors: number[];
  student_active: boolean;
  student_homework_completed: unknown[];
}

export interface StudentDashboardData {
  student: StudentProfile;
  enrollments: Enrollment[];
  approved_courses: Course[];
}

export interface TutorDashboardData {
  tutor: Tutor;
  courses: Course[];
  enrollments: Enrollment[];
}

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  description: string;
  content: string;
  category?: string;
  difficulty_level: "Easy" | "Intermediate" | "Advanced";
  featured: boolean;
  created_at: string;
  updated_at: string;
  picture: string | null;
}
