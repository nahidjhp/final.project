import api from "@/lib/axios";
import { User } from "@/types";

export interface RegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_teacher: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  register: (payload: RegisterPayload) => api.post<User>("/register/", payload),
  login: (payload: LoginPayload) => api.post("/login/", payload),
  logout: () => api.post("/logout/"),
  me: () => api.get<User>("/me/"),
};
