"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BookOpen, LogOut, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAppSelector } from "@/store/hooks";
import { useLogout } from "@/hooks/useAuthActions";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/tutors", label: "Tutors" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  const logout = useLogout();

  const dashboardHref = user?.is_teacher ? "/dashboard/tutor" : "/dashboard/student";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-navy dark:text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-amber">
            <BookOpen size={17} />
          </span>
          FluentDoor
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                pathname === l.href
                  ? "text-navy font-semibold dark:text-amber"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <Link
                href={dashboardHref}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink"
              >
                My Dashboard
              </Link>
              <button
                onClick={() => logout.mutate()}
                className="flex items-center gap-1.5 rounded-md bg-navy px-3.5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink">
                Sign in
              </Link>
              <Link
                href="/register/student"
                className="rounded-md bg-amber px-3.5 py-2 text-sm font-semibold text-navy transition-opacity hover:opacity-90"
              >
                Get started free
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-md px-2 py-2.5 text-sm text-ink">
                {l.label}
              </Link>
            ))}
            <div className="my-2 border-t border-line" />
            {isAuthenticated ? (
              <>
                <Link href={dashboardHref} onClick={() => setOpen(false)} className="rounded-md px-2 py-2.5 text-sm text-ink">
                  My Dashboard
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    logout.mutate();
                  }}
                  className="rounded-md px-2 py-2.5 text-left text-sm text-coral"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-md px-2 py-2.5 text-sm text-ink">
                  Sign in
                </Link>
                <Link href="/register/student" onClick={() => setOpen(false)} className="rounded-md px-2 py-2.5 text-sm font-semibold text-amber-ink">
                  Get started free
                </Link>
              </>
            )}
            <div className="mt-2 flex items-center gap-2 px-2">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
