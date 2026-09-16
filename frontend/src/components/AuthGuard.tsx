"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export default function AuthGuard({ requireTeacher, children }: { requireTeacher: boolean; children: React.ReactNode }) {
  const { status, user } = useAppSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (status === "authenticated" && user && user.is_teacher !== requireTeacher) {
      router.replace(user.is_teacher ? "/dashboard/tutor" : "/dashboard/student");
    }
  }, [status, user, requireTeacher, router]);

  if (status === "idle" || status === "loading") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-ink-soft">
        <Loader2 className="animate-spin" size={22} />
      </div>
    );
  }

  if (status !== "authenticated" || user?.is_teacher !== requireTeacher) return null;

  return <>{children}</>;
}
