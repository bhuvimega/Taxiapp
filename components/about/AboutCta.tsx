import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Dark call-to-action panel + the "FAQ or contact us" line underneath. */
export default function AboutCta() {
  return (
    <>
      <div className="flex flex-col gap-6 rounded-3xl bg-surface-dark px-6 py-8 text-surface-dark-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Ready to ride with GoCabxi?</h2>
          <p className="mt-2 text-sm text-surface-dark-foreground/70 sm:text-base">
            Get a guaranteed all-inclusive fare in seconds.
          </p>
        </div>

        <Link href="/" className="btn btn-accent btn-pill h-12 w-fit px-6">
          Book a Cab
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Looking for something specific? Visit our{" "}
        <Link href="/faq" className="rounded-sm font-semibold text-brand-text hover:underline focus-ring">
          FAQ
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="rounded-sm font-semibold text-brand-text hover:underline focus-ring">
          contact us
        </Link>
        .
      </p>
    </>
  );
}
