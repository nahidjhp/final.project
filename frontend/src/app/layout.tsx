import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import QueryProvider from "@/providers/QueryProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthBootstrap from "@/providers/AuthBootstrap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



const inter = localFont({
  src: "../../public/fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FluentDoor | Learn English with real tutors",
  description: "Book English lessons with approved tutors, track your enrollments, and learn at your own pace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <ReduxProvider>
            <QueryProvider>
              <AuthBootstrap />
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster
                position="top-center"
                toastOptions={{
                  style: {
                    fontFamily: "var(--font-inter)",
                    background: "var(--paper-raised)",
                    color: "var(--ink)",
                    border: "1px solid var(--line)",
                  },
                }}
              />
            </QueryProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
