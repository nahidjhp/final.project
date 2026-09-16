import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-raised">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-ink-soft">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold text-navy dark:text-ink">FluentDoor</p>
            <p className="mt-2 max-w-xs leading-6">
              Learn English with interactive courses, approved tutors, and a dashboard that actually tracks your progress.
            </p>
          </div>
          <div className="flex gap-10">
            <div>
              <p className="mb-2 font-medium text-ink">Explore</p>
              <ul className="flex flex-col gap-1.5">
                <li><Link href="/courses" className="hover:text-ink">Courses</Link></li>
                <li><Link href="/tutors" className="hover:text-ink">Tutors</Link></li>
                <li><Link href="/blog" className="hover:text-ink">Blog</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-medium text-ink">Account</p>
              <ul className="flex flex-col gap-1.5">
                <li><Link href="/login" className="hover:text-ink">Sign in</Link></li>
                <li><Link href="/register/student" className="hover:text-ink">Join as a student</Link></li>
                <li><Link href="/register/tutor" className="hover:text-ink">Join as a tutor</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-line pt-5 text-xs">
          Frontend built with Next.js — connected to a Django REST Framework backend.
        </p>
      </div>
    </footer>
  );
}
