"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Clock, FileVideo, ImagePlus } from "lucide-react";
import { tutorProfileSchema, TutorProfileValues } from "@/lib/validation";
import FormField, { inputClass } from "@/components/FormField";
import { useCreateTutorProfile } from "@/hooks/useTutorDashboard";

export default function TutorProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TutorProfileValues>({ resolver: zodResolver(tutorProfileSchema) });

  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const createProfile = useCreateTutorProfile();

  const onSubmit = (values: TutorProfileValues) => {
    const subjects = values.subjectsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    createProfile.mutate({
      first_name: values.first_name,
      last_name: values.last_name,
      phone_number: values.phone_number,
      country: values.country,
      subjects,
      bio: values.bio,
      teaching_style: values.teaching_style,
      expectation: values.expectation,
      description: values.description,
      intro_video_url: values.intro_video_url,
      profile_picture: pictureFile,
      intro_video_file: videoFile,
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <div className="mb-7 rounded-2xl border border-amber/30 bg-amber/10 px-5 py-4 text-sm text-amber-ink">
        <p className="flex items-center gap-2 font-semibold">
          <Clock size={16} />
          Your account hasn&apos;t been approved yet
        </p>
        <p className="mt-1 text-amber-ink/80">Complete the form below so an admin can review and approve your tutor profile.</p>
      </div>

      <h1 className="mb-1 text-2xl font-bold text-ink">Complete your tutor profile</h1>
      <p className="mb-7 text-sm text-ink-soft">This information is used to review and approve your account.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 rounded-2xl border border-line bg-paper-raised p-6">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="First name">
            <input type="text" className={inputClass} {...register("first_name")} />
          </FormField>
          <FormField label="Last name">
            <input type="text" className={inputClass} {...register("last_name")} />
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Phone number">
            <input type="text" className={inputClass} {...register("phone_number")} />
          </FormField>
          <FormField label="Country">
            <input type="text" className={inputClass} {...register("country")} />
          </FormField>
        </div>
        <FormField label="Subjects (comma-separated)" error={errors.subjectsText?.message}>
          <input type="text" className={inputClass} placeholder="e.g. English, Grammar, IELTS" {...register("subjectsText")} />
        </FormField>
        <FormField label="Bio" error={errors.bio?.message}>
          <textarea className={`${inputClass} min-h-24`} placeholder="Tell students about your teaching background" {...register("bio")} />
        </FormField>
        <FormField label="Teaching style">
          <textarea className={`${inputClass} min-h-16`} {...register("teaching_style")} />
        </FormField>
        <FormField label="What you expect from students">
          <textarea className={`${inputClass} min-h-16`} {...register("expectation")} />
        </FormField>
        <FormField label="Additional description">
          <textarea className={`${inputClass} min-h-16`} {...register("description")} />
        </FormField>
        <FormField label="Intro video URL (optional)" error={errors.intro_video_url?.message}>
          <input type="url" className={inputClass} placeholder="https://..." {...register("intro_video_url")} />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Profile picture (optional)">
            <label htmlFor="profile_picture" className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-line px-3.5 py-3 text-sm text-ink-soft transition-colors hover:border-amber">
              <ImagePlus size={16} />
              {pictureFile?.name ?? "Choose an image"}
            </label>
            <input
              id="profile_picture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setPictureFile(e.target.files?.[0] ?? null)}
            />
          </FormField>
          <FormField label="Intro video file (optional)">
            <label htmlFor="intro_video_file" className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-line px-3.5 py-3 text-sm text-ink-soft transition-colors hover:border-amber">
              <FileVideo size={16} />
              {videoFile?.name ?? "Choose a video"}
            </label>
            <input
              id="intro_video_file"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
            />
          </FormField>
        </div>
        <button
          type="submit"
          disabled={createProfile.isPending}
          className="mt-2 w-full rounded-lg bg-amber py-3 text-sm font-bold text-navy transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {createProfile.isPending ? "Submitting..." : "Submit for review"}
        </button>
      </form>
    </div>
  );
}
