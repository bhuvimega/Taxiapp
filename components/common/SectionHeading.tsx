type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

/**
 * Optional eyebrow + h2 + optional lead paragraph. Colour is inherited, so it
 * works on a white section and on a `.section-brand` section without props.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "section-head section-head-center" : "section-head"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-lead">{description}</p>}
    </div>
  );
}
