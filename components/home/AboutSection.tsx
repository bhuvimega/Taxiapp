import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="section">
      <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src="/images/about-travellers.webp"
            alt="A family taking a selfie at the open boot of their cab"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="eyebrow">About GoCabxi</p>
          <h2 className="section-title">Honest cab booking, built for India</h2>

          <p className="mt-4 text-sm leading-6 sm:text-base">
            GoCabxi is a modern intercity and local cab-booking platform built
            for honest pricing and dependable rides across India.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            We connect travellers with a verified vendor fleet to offer
            outstation cabs, one-way and round-trip journeys, airport transfers
            and hourly local rentals — all with a transparent,
            platform-calculated fare you see upfront.
          </p>

          <Link href="/about" className="btn btn-solid btn-pill mt-6 h-11">
            Read more about us
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
