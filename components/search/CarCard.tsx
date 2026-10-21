import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Route, Star, Tag, UserRound } from "lucide-react";
import { exclusions, inclusions } from "@/config/cars";
import { formatINR, type Quote } from "@/lib/search";

type CarCardProps = {
  quote: Quote;
  /** Link for the "Select Car" button. */
  href: string;
};

export default function CarCard({ quote, href }: CarCardProps) {
  const { car, fare, taxes, listPrice, discountPercent, includedKm, postLimitPerKm } = quote;

  return (
    <article className="panel grid gap-5 p-4 sm:grid-cols-[200px_1fr] sm:p-5 lg:grid-cols-[220px_1fr_240px]">
      {/* Photo */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted sm:aspect-auto sm:min-h-[130px]">
        <Image
          src={car.image}
          alt={`${car.name} or similar`}
          fill
          sizes="(min-width: 1024px) 220px, (min-width: 640px) 200px, 100vw"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h2 className="text-lg font-bold sm:text-xl">{car.name}</h2>
          <span className="text-xs italic text-muted-foreground">or similar</span>
          <span className="chip bg-foreground text-background">
            {car.rating}
            <Star size={11} className="fill-highlight text-highlight" aria-label="rating" />
          </span>
        </div>

        <p className="mt-1 text-xs italic text-muted-foreground">{car.seats} seater AC Cab</p>

        <ul className="mt-4 space-y-2.5 text-sm">
          <li className="flex items-center gap-3">
            <UserRound size={18} className="shrink-0 text-brand-text" aria-hidden="true" />
            Driver allowance included
          </li>
          <li className="flex items-center gap-3">
            <Route size={18} className="shrink-0 text-brand-text" aria-hidden="true" />
            <span>
              <strong>{includedKm} kms</strong> included | Post limit:{" "}
              <strong>{formatINR(postLimitPerKm)}/km</strong>
            </span>
          </li>
        </ul>

        <details className="group mt-3">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-xs font-medium text-brand-text focus-ring [&::-webkit-details-marker]:hidden">
            Inclusions and Exclusions
            <ChevronDown size={14} className="transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>

          <div className="mt-3 grid gap-4 text-xs sm:grid-cols-2">
            <div>
              <p className="mb-1 font-semibold">Included</p>
              <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                {inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-1 font-semibold">Not included</p>
              <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                {exclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </div>

      {/* Price + CTA */}
      <div className="flex flex-col items-start border-t pt-4 sm:col-span-2 lg:col-span-1 lg:items-end lg:border-t-0 lg:pt-0 lg:text-right">
        {discountPercent > 0 && listPrice && (
          <p className="flex items-center gap-1.5 text-sm font-semibold text-brand-text">
            <Tag size={14} aria-hidden="true" />
            {discountPercent}% OFF
            <s className="font-medium text-muted-foreground">{formatINR(listPrice)}</s>
          </p>
        )}

        <p className="mt-1 text-4xl font-extrabold tracking-tight text-brand-text">
          {formatINR(fare)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">+ {formatINR(taxes)} Charges and Taxes</p>

        <Link
          href={href}
          className="btn btn-solid mt-4 h-11 w-full rounded-lg px-8 text-sm uppercase tracking-wide lg:w-40"
        >
          Select Car
        </Link>
      </div>
    </article>
  );
}
