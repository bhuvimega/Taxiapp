import { aboutValues } from "./aboutData";

export default function AboutValues() {
  return (
    <section aria-labelledby="values-heading">
      <h2 id="values-heading" className="text-2xl font-extrabold tracking-tight">
        What we stand for
      </h2>

      <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {aboutValues.map(({ title, description, icon: Icon }) => (
          <li key={title} className="panel p-6">
            <div className="icon-tile icon-tile-soft">
              <Icon size={20} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-base font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
