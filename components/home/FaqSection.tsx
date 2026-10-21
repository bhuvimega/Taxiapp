import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { faqData } from "./faqData";

// Helps Google show these questions as rich results.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function FaqSection() {
  return (
    <section className="section">
      <div className="mx-auto w-full max-w-[704px] px-4 sm:px-6">
        <SectionHeading align="center" title="Frequently asked questions" />

        <div className="border-t">
          {faqData.map(({ question, answer }) => (
            <details key={question} className="faq-item">
              <summary className="faq-summary">
                {question}
                <ChevronDown size={16} className="faq-chevron" aria-hidden="true" />
              </summary>
              <p className="faq-answer">{answer}</p>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
