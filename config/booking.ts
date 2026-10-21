import { ArrowRight, Clock3, Plane, Repeat } from "lucide-react";

/** Static data + types for the hero booking form. */

export const SEARCH_PATH = "/search";

export const tripTabs = [
  {
    id: "one-way",
    label: "One-Way Outstation",
    description: "Point-to-point intercity drop. Pay only for one side.",
    icon: ArrowRight,
  },
  {
    id: "round-trip",
    label: "Round-Trip Outstation",
    description: "Return journey with the same cab & driver.",
    icon: Repeat,
  },
  {
    id: "airport",
    label: "Airport Transfer",
    description: "Fixed-fare airport pickups & drops.",
    icon: Plane,
  },
  {
    id: "local",
    label: "Local / Hourly Rental",
    description: "Hourly packages for local city travel.",
    icon: Clock3,
  },
] as const;

export type TripType = (typeof tripTabs)[number]["id"];

export const popularCities = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Tiruchirappalli",
  "Salem",
  "Puducherry",
  "Bengaluru",
  "Mysuru",
  "Kochi",
  "Hyderabad",
  "Mumbai",
  "Pune",
  "Delhi",
  "Agra",
];

export const airports = [
  "Chennai International Airport (MAA)",
  "Coimbatore International Airport (CJB)",
  "Madurai Airport (IXM)",
  "Bengaluru Airport (BLR)",
  "Hyderabad Airport (HYD)",
  "Mumbai Airport (BOM)",
  "Delhi Airport (DEL)",
];
