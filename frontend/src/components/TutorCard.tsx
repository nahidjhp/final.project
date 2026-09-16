import { MapPin, User } from "lucide-react";
import { Tutor } from "@/types";
import { formatLanguagesSpoken, tutorDisplayName } from "@/lib/format";

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  const languages = formatLanguagesSpoken(tutor.languages_spoken);

  return (
    <div className="flex items-start gap-4 rounded-xl border border-line bg-paper-raised p-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-teal-soft text-teal">
        {tutor.profile_picture ? (
          
          <img src={tutor.profile_picture} alt={tutorDisplayName(tutor.user)} className="h-full w-full object-cover" />
        ) : (
          <User size={22} />
        )}
      </div>
      <div>
        <h3 className="font-bold text-ink">{tutorDisplayName(tutor.user)}</h3>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
          {languages.length > 0 && <span>{languages.join(" · ")}</span>}
          {tutor.country && (
            <span className="flex items-center gap-1">
              <MapPin size={11} /> {tutor.country}
            </span>
          )}
        </div>
        {tutor.subjects?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tutor.subjects.map((s) => (
              <span key={s} className="rounded-full bg-amber/15 px-2 py-0.5 text-xs text-amber-ink">
                {s}
              </span>
            ))}
          </div>
        )}
        {tutor.bio && <p className="mt-1.5 text-sm leading-6 text-ink-soft">{tutor.bio}</p>}
      </div>
    </div>
  );
}
