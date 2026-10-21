import SectionHeading from "@/components/common/SectionHeading";
import { reasonsData } from "./whyChooseUsData";

export default function WhyChooseUs() {
  return (
    <section className="section section-brand">
      <div className="site-container">
        <SectionHeading
          eyebrow="Why GoCabxi"
          title="Why choose GoCabxi?"
          description="A booking journey designed around transparency and trust — from quote to drop."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasonsData.map(({ title, description, icon: Icon }) => (
            <article key={title} className="feature-card">
              <div className="icon-tile icon-tile-brand">
                <Icon size={21} aria-hidden="true" />
              </div>

              <h3 className="feature-card-title">{title}</h3>
              <p className="feature-card-text">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
