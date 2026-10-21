import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

export default function CtaBanner() {
  return (
    <section className="section section-brand">
      <div className="site-container">
        <div className="rounded-3xl bg-on-brand/5 px-6 py-12 text-center sm:py-16">
          <SectionHeading
            align="center"
            title="Ready for your next journey?"
            description="Lock a guaranteed, all-inclusive fare in seconds — free cancellation up to 6 hours before pickup."
          />

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/outstation-cabs" className="btn btn-highlight btn-pill h-12 px-6">
              Book a Cab
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            <Link href="/routes" className="btn btn-light btn-pill h-12 px-6">
              Explore Routes
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
