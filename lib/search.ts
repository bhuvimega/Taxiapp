import { tripTabs, type TripType } from "@/config/booking";
import { cars, type Car } from "@/config/cars";

export type RawParams = Record<string, string | string[] | undefined>;

export type SearchQuery = {
  type: TripType;
  /** Big heading, e.g. "Annur - Coimbatore". */
  title: string;
  /** "One way", "Round trip" … */
  tripLabel: string;
  pickupDate: string; // YYYY-MM-DD
  pickupTime: string; // HH:mm
  returnDate?: string;
  distanceKm: number;
  days: number;
};

export type Quote = {
  car: Car;
  fare: number;
  taxes: number;
  listPrice?: number;
  discountPercent: number;
  includedKm: number;
  postLimitPerKm: number;
};

/* ---------------------------- parsing ---------------------------- */

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim();
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^\d{2}:\d{2}$/;

function splitDateTime(value?: string) {
  const [date, time] = (value ?? "").split("T");
  return DATE.test(date ?? "") && TIME.test(time ?? "") ? { date, time } : null;
}

const toUTC = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};

/** Rough road distances (km). Anything else gets a stable pseudo-estimate. */
const KNOWN_ROUTES: Record<string, number> = {
  "chennai|coimbatore": 505,
  "bengaluru|chennai": 345,
  "bengaluru|mysuru": 145,
  "mumbai|pune": 150,
  "agra|delhi": 230,
  "chennai|puducherry": 155,
  "coimbatore|madurai": 215,
  "coimbatore|salem": 165,
  "annur|coimbatore": 30,
  "kochi|coimbatore": 195,
  "hyderabad|vijayawada": 275,
};

function routeDistance(a: string, b: string) {
  const key = [a, b].map((s) => s.toLowerCase()).sort().join("|");
  if (KNOWN_ROUTES[key]) return KNOWN_ROUTES[key];

  let hash = 0;
  for (const ch of key) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return 120 + (hash % 380);
}

/** Returns null when the URL doesn't hold a complete, valid search. */
export function parseSearch(raw: RawParams): SearchQuery | null {
  const type = first(raw.type) as TripType | undefined;
  if (!type || !tripTabs.some((t) => t.id === type)) return null;

  if (type === "one-way" || type === "round-trip") {
    const from = first(raw.from);
    const to = first(raw.to);
    const pickup = splitDateTime(first(raw.pickup));
    if (!from || !to || !pickup) return null;

    let returnDate: string | undefined;
    let days = 1;
    if (type === "round-trip") {
      const ret = splitDateTime(first(raw.return));
      if (!ret) return null;
      returnDate = ret.date;
      days = Math.max(1, Math.round((toUTC(ret.date) - toUTC(pickup.date)) / 86_400_000) + 1);
    }

    return {
      type,
      title: `${from} - ${to}`,
      tripLabel: type === "one-way" ? "One way" : "Round trip",
      pickupDate: pickup.date,
      pickupTime: pickup.time,
      returnDate,
      distanceKm: routeDistance(from, to),
      days,
    };
  }

  const date = first(raw.date);
  const time = first(raw.time);
  if (!date || !time || !DATE.test(date) || !TIME.test(time)) return null;

  if (type === "local") {
    const city = first(raw.city);
    if (!city) return null;
    return {
      type,
      title: `Local rental · ${city}`,
      tripLabel: "Local rental",
      pickupDate: date,
      pickupTime: time,
      distanceKm: 80,
      days: 1,
    };
  }

  const airport = first(raw.airport);
  const direction = first(raw.direction) === "pickup" ? "pickup" : "drop";
  if (!airport) return null;
  return {
    type,
    title: `${direction === "drop" ? "Drop to" : "Pickup from"} ${airport}`,
    tripLabel: direction === "drop" ? "Airport drop" : "Airport pickup",
    pickupDate: date,
    pickupTime: time,
    distanceKm: 25,
    days: 1,
  };
}

/* ---------------------------- pricing ---------------------------- */

export function getQuotes(q: SearchQuery): Quote[] {
  const minKm = { "one-way": 130, "round-trip": 250 * q.days, local: 80, airport: 25 }[q.type];
  const tripKm = q.type === "round-trip" ? q.distanceKm * 2 : q.distanceKm;
  const includedKm = Math.max(tripKm, minKm);

  return cars
    .map((car) => {
      let fare = includedKm * car.ratePerKm;
      if (q.type === "airport") fare = Math.max(fare, 399);

      return {
        car,
        fare,
        taxes: Math.round(fare * 0.05),
        discountPercent: car.discountPercent,
        listPrice: car.discountPercent
          ? Math.round(fare / (1 - car.discountPercent / 100))
          : undefined,
        includedKm,
        postLimitPerKm: car.ratePerKm + 2,
      };
    })
    .sort((a, b) => a.fare - b.fare);
}

/* ---------------------------- formatting ---------------------------- */

export const formatINR = (n: number) => `₹${new Intl.NumberFormat("en-IN").format(n)}`;

/** "2026-10-20" → "20-10-2026" */
export const formatDate = (iso: string) => iso.split("-").reverse().join("-");

/** "17:30" → "5:30 PM" */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}
