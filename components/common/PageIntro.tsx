type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

/**
 * Light intro block for inner pages (About, Contact, Legal …).
 * Sits on the page's soft background with a divider underneath.
 */
export default function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="border-b py-14 sm:py-20">
      <div className="narrow-container">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-[760px] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {description}
        </p>
      </div>
    </section>
  );
}
