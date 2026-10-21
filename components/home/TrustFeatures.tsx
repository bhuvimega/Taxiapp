import { trustFeatures } from "./trustFeaturesData";

export default function TrustFeatures() {
  return (
    <section className="border-b-[7px] border-brand bg-background">
      <div className="site-container grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {trustFeatures.map(({ title, description, icon: Icon }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="icon-tile icon-tile-soft size-10">
              <Icon size={20} aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold leading-5">{title}</h3>
              <p className="mt-1 text-xs leading-[19px] text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
