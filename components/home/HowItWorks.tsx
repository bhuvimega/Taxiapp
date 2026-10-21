import SectionHeading from "@/components/common/SectionHeading";
import { howItWorksSteps } from "./howItWorksData";

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="site-container">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="Four steps to your ride"
        />

        <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map(({ title, description, icon: Icon }, index) => (
            <li key={title} className="step-card">
              <div className="flex items-start justify-between">
                <div className="icon-tile icon-tile-soft">
                  <Icon size={20} aria-hidden="true" />
                </div>

                {/* Decorative — the <ol> already announces the order */}
                <span className="step-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-5 text-base font-semibold leading-6">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
