import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Luggage, Snowflake, Users } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { fleetData } from "./fleetData";

export default function FleetSection() {
  return (
    <section className="section section-brand">
      <div className="site-container">
        <SectionHeading
          eyebrow="Our fleet"
          title="Choose your cab"
          description="Pick from clean, well-maintained AC vehicles sized for your group and luggage."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fleetData.map(({ name, models, price, seats, bags, image, imageAlt, href }) => (
            <article key={name} className="media-card">
              <div className="relative aspect-[11/5] w-full">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold leading-7">{name}</h3>
                  <span className="chip chip-highlight">{price}</span>
                </div>

                <p className="mt-1 text-xs text-body">{models}</p>

                <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-body">
                  <li className="flex items-center gap-1.5">
                    <Users size={16} aria-hidden="true" />
                    {seats} seats
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Luggage size={16} aria-hidden="true" />
                    {bags} bags
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Snowflake size={16} aria-hidden="true" />
                    AC
                  </li>
                </ul>

                <Link href={href} className="feature-card-link mt-auto pt-5">
                  Book {name}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
