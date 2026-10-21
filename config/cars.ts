/**
 * Demo vehicle + pricing data for the search results page.
 * Replace with your API response when the backend is ready.
 */
export const cars = [
  {
    id: "hatchback",
    name: "Wagon R, Swift",
    seats: 4,
    rating: 4.6,
    ratePerKm: 11,
    discountPercent: 10,
    image: "/images/fleet-sedan.webp",
  },
  {
    id: "sedan",
    name: "Dzire, Etios",
    seats: 4,
    rating: 4.7,
    ratePerKm: 13,
    discountPercent: 10,
    image: "/images/fleet-sedan.webp",
  },
  {
    id: "suv",
    name: "Maruti Ertiga, Kia Carens",
    seats: 6,
    rating: 4.7,
    ratePerKm: 17,
    discountPercent: 10,
    image: "/images/fleet-suv.webp",
  },
  {
    id: "premium-suv",
    name: "Innova Crysta, Toyota Hycross",
    seats: 7,
    rating: 4.8,
    ratePerKm: 22,
    discountPercent: 10,
    image: "/images/fleet-premium-suv.webp",
  },
] as const;

export type Car = (typeof cars)[number];

export const inclusions = [
  "Base fare for the included kilometres",
  "Driver allowance",
  "Fuel charges",
  "GST (5%)",
];

export const exclusions = [
  "Toll, parking and state entry taxes",
  "Night charges (10 PM – 6 AM)",
  "Kilometres beyond the included limit",
];
