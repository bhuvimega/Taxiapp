import { Quote, Star } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Slider from "@/components/common/Slider";
import { testimonialsData } from "./testimonialsData";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section className="section section-brand">
      <div className="site-container">
        <SectionHeading eyebrow="Loved by travellers" title="What our riders say" />

        <Slider label="Customer reviews">
          {testimonialsData.map(({ name, route, rating, quote }) => (
            <figure key={name} className="feature-card">
              <Quote size={26} strokeWidth={2.5} aria-hidden="true" />

              <div
                role="img"
                aria-label={`${rating} out of 5 stars`}
                className="mt-3 flex gap-0.5"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    aria-hidden="true"
                    className={i < rating ? "fill-highlight" : ""}
                  />
                ))}
              </div>

              <blockquote className="mt-3 flex-1 text-sm leading-6">“{quote}”</blockquote>

              <figcaption className="mt-5 flex items-center gap-3">
                <span className="avatar" aria-hidden="true">
                  {initials(name)}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{name}</span>
                  <span className="block text-xs text-muted-foreground">{route}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Slider>
      </div>
    </section>
  );
}
