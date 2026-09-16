import RegisterForm from "@/components/RegisterForm";

export default function RegisterTutorPage() {
  return <RegisterForm isTeacher={true} title="Create a tutor account" subtitle="After signing up, complete your profile so an admin can approve it." />;
}
