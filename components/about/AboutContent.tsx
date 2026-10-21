import { Star } from "lucide-react";
import { aboutParagraphs, aboutStats } from "./aboutData";

/** Intro paragraphs + the four headline numbers. */
export default function AboutContent() {
  return (
    <>
      <div className="space-y-4 text-base leading-7">
        {aboutParagraphs.map((text, index) => (
          <p key={index} className={index === 0 ? "text-foreground" : "text-muted-foreground"}>
            {text}
          </p>
        ))}
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {aboutStats.map(({ value, label, star }) => (
          <li key={label} className="panel px-4 py-5 text-center">
            <p className="flex items-center justify-center gap-1 text-2xl font-extrabold">
              {value}
              {star && <Star size={18} className="fill-current" aria-label="stars" />}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{label}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
