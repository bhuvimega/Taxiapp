import { Headset, IndianRupee, MapPinned, ShieldCheck } from "lucide-react";

/** First paragraph is shown darker, the rest in muted text. */
export const aboutParagraphs = [
  "We connect travellers with a verified vendor fleet to offer outstation cabs, one-way and round-trip journeys, airport transfers and hourly local rentals — all with a transparent, platform-calculated fare you see upfront.",
  "From Mumbai to Pune, Bengaluru to Mysuru, Delhi to Agra and beyond, GoCabxi focuses on comfortable, well-maintained vehicles, professional drivers and reliable pickups, backed by 24×7 human support.",
  "Our vendor-led dispatch assigns the best-rated driver for your route, while live status tracking keeps you informed at every step — from booking confirmation to drop-off.",
];

export const aboutStats = [
  { value: "18+", label: "Cities served", star: false },
  { value: "4", label: "Service types", star: false },
  { value: "4.8", label: "Avg driver rating", star: true },
  { value: "24×7", label: "Support", star: false },
];

export const aboutValues = [
  {
    title: "Transparency first",
    description:
      "Itemised, all-inclusive fares locked at booking — no surge or hidden charges.",
    icon: IndianRupee,
  },
  {
    title: "Safety & trust",
    description:
      "Background-checked drivers and well-maintained, sanitised vehicles.",
    icon: ShieldCheck,
  },
  {
    title: "Reliability",
    description:
      "Vendor-led dispatch and live tracking for on-time, dependable pickups.",
    icon: MapPinned,
  },
  {
    title: "Human support",
    description:
      "24×7 assistance before, during and after every journey.",
    icon: Headset,
  },
];
