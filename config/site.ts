import type { TripType } from "@/config/booking";

/** Single source of truth for brand info, routes and primary navigation. */
export const siteConfig = {
  name: "GoCabxi",
  phone: { label: "+91 1800-462-2294", href: "tel:+9118004622294" },
  routes: {
    home: "/",
    myTrips: "/customer/trips",
    trackRide: "/track-ride",
    /** Home page, scrolled to the booking form (id="booking"). */
    booking: "/#booking",
  },
} as const;

/** Header menu: each item selects a tab in the booking form instead of opening a page. */
export const navItems = [
  { label: "One-Way", trip: "one-way" },
  { label: "Round-Trip", trip: "round-trip" },
  { label: "Airport", trip: "airport" },
  { label: "Rentals", trip: "local" },
] as const satisfies readonly { label: string; trip: TripType }[];
