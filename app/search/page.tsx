import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BenefitsBar from "@/components/search/BenefitsBar";
import CarCard from "@/components/search/CarCard";
import SearchHeader from "@/components/search/SearchHeader";
import { getQuotes, parseSearch, type RawParams } from "@/lib/search";

export const metadata: Metadata = {
  title: "Select Car | GoCabxi",
  robots: { index: false },
};

type PageProps = { searchParams: Promise<RawParams> };

export default function SearchPage({ searchParams }: PageProps) {
  // searchParams is request-time data, so it must be read inside <Suspense>.
  return (
    <Suspense fallback={<ResultsSkeleton />}>
      <Results searchParams={searchParams} />
    </Suspense>
  );
}

async function Results({ searchParams }: PageProps) {
  const raw = await searchParams;
  const query = parseSearch(raw);

  if (!query) {
    return (
      <div className="site-container py-20 text-center">
        <h1 className="text-2xl font-extrabold">We couldn’t read your trip details</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please fill in the booking form again to see available cabs.
        </p>
        <Link href="/" className="btn btn-solid btn-pill mt-6 h-11">
          Back to booking
        </Link>
      </div>
    );
  }

  const quotes = getQuotes(query);

  // Pass the whole search along to the next step, plus the chosen car.
  const carry = new URLSearchParams(
    Object.entries(raw).flatMap(([k, v]) => (typeof v === "string" ? [[k, v]] : [])),
  );

  return (
    <>
      <SearchHeader query={query} />

      <div className="site-container space-y-5 py-6">
        <BenefitsBar />

        <ul className="space-y-4">
          {quotes.map((quote) => {
            const params = new URLSearchParams(carry);
            params.set("car", quote.car.id);
            params.set("fare", String(quote.fare));

            return (
              <li key={quote.car.id}>
                <CarCard quote={quote} href={`/booking?${params.toString()}`} />
              </li>
            );
          })}
        </ul>

        <p className="text-center text-xs text-muted-foreground">
          Demo fares based on approximate distance. Final fare is confirmed at booking.
        </p>
      </div>
    </>
  );
}

function ResultsSkeleton() {
  return (
    <div className="site-container space-y-4 py-6" aria-busy="true">
      <div className="h-16 animate-pulse rounded-xl bg-muted" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-44 animate-pulse rounded-2xl bg-muted" />
      ))}
    </div>
  );
}
