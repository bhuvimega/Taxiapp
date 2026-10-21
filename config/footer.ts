import { Clock3, ShieldCheck, Wallet } from "lucide-react";

export const footerGroups = [
  {
    title: "Cab Services",
    links: [
      { label: "Outstation Cabs", href: "/outstation-cabs" },
      { label: "One-Way Cabs", href: "/one-way" },
      { label: "Round-Trip Cabs", href: "/round-trip" },
      { label: "Airport Taxi", href: "/airport" },
      { label: "Local / Hourly Rental", href: "/rentals" },
    ],
  },
  {
    title: "Popular Routes",
    links: [
      { label: "Mumbai to Pune Cabs", href: "/routes/mumbai-to-pune" },
      { label: "Bengaluru to Mysuru Cabs", href: "/routes/bengaluru-to-mysuru" },
      { label: "Delhi to Agra Cabs", href: "/routes/delhi-to-agra" },
      { label: "Chennai to Puducherry Cabs", href: "/routes/chennai-to-puducherry" },
    ],
  },
  {
    title: "Popular Cities",
    links: [
      { label: "Cabs in Mumbai", href: "/cities/mumbai" },
      { label: "Cabs in Bengaluru", href: "/cities/bengaluru" },
      { label: "Cabs in Delhi", href: "/cities/delhi" },
      { label: "Cabs in Hyderabad", href: "/cities/hyderabad" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cancellation Policy", href: "/cancellation-policy" },
    ],
  },
] as const;

export const footerTrustItems = [
  { label: "Verified drivers", Icon: ShieldCheck },
  { label: "Zero hidden charges", Icon: Wallet },
  { label: "24×7 support", Icon: Clock3 },
] as const;
