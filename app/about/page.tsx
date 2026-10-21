import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";
import AboutCta from "@/components/about/AboutCta";
import AboutValues from "@/components/about/AboutValues";
import PageIntro from "@/components/common/PageIntro";

export const metadata: Metadata = {
  title: "About Us | GoCabxi",
  description:
    "GoCabxi is a modern intercity and local cab-booking platform built for honest pricing and dependable rides across India.",
};

export default function AboutPage() {
  return (
    <div className="bg-muted">
      <PageIntro
        eyebrow="About GoCabxi"
        title="Honest cab booking, built for India"
        description="GoCabxi is a modern intercity and local cab-booking platform built for honest pricing and dependable rides across India."
      />

      <div className="narrow-container space-y-14 py-12 sm:py-16">
        <AboutContent />
        <AboutValues />
        <div>
          <AboutCta />
        </div>
      </div>
    </div>
  );
}
