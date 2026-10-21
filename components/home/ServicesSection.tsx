import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { servicesData } from "./servicesData";

export default function ServicesSection() {
  return (
    <section className="section section-brand">
      <div className="site-container">
        <SectionHeading
          eyebrow="Our Services"
          title="Cab services for every journey"
          description="From outstation cab booking to airport taxis and local rentals — choose the ride that fits your plan."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicesData.map(({ title, description, linkText, href, icon: Icon }) => (
            <article key={title} className="feature-card">
              <div className="icon-tile icon-tile-brand">
                <Icon size={21} aria-hidden="true" />
              </div>

              <h3 className="feature-card-title">{title}</h3>
              <p className="feature-card-text flex-1">{description}</p>

              <Link href={href} className="feature-card-link">
                {linkText}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
