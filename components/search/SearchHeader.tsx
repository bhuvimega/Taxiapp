import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";
import { formatDate, formatTime, type SearchQuery } from "@/lib/search";

export default function SearchHeader({ query }: { query: SearchQuery }) {
  const details = [
    { label: "Trip Type", value: query.tripLabel },
    { label: "Pick up", value: formatDate(query.pickupDate) },
    { label: "Time", value: formatTime(query.pickupTime) },
    ...(query.returnDate ? [{ label: "Return", value: formatDate(query.returnDate) }] : []),
  ];

  return (
    <div className="border-b bg-brand-light">
      <div className="site-container flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Select Car" }]} />
          <h1 className="mt-1 truncate text-lg font-bold sm:text-xl">{query.title}</h1>
        </div>

        <dl className="flex flex-wrap gap-x-8 gap-y-3">
          {details.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="text-sm font-semibold">{value}</dd>
            </div>
          ))}
        </dl>

        <Link
          href="/#booking"
          className="inline-flex w-fit items-center rounded-full bg-card px-5 py-2 text-sm font-medium text-brand-text underline underline-offset-2 focus-ring"
        >
          Modify Booking
        </Link>
      </div>
    </div>
  );
}
