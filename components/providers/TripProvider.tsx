"use client";

import { createContext, useContext, useState } from "react";
import type { TripType } from "@/config/booking";

type TripContextValue = {
  /** The tab currently selected in the booking form. */
  trip: TripType;
  selectTrip: (trip: TripType) => void;
};

const TripContext = createContext<TripContextValue | null>(null);

/**
 * Shares the selected trip tab between the header menu and the booking form.
 * It lives in the root layout, so the choice survives page navigation
 * (e.g. clicking "Airport" while on /about, then arriving on the home page).
 */
export function TripProvider({ children }: { children: React.ReactNode }) {
  const [trip, selectTrip] = useState<TripType>("one-way");
  return <TripContext.Provider value={{ trip, selectTrip }}>{children}</TripContext.Provider>;
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used inside <TripProvider>");
  return ctx;
}

/** Smoothly scrolls to the booking form, then moves keyboard focus to the active tab. */
export function scrollToBooking() {
  const form = document.getElementById("booking");
  if (!form) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

  window.setTimeout(() => {
    form
      .querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')
      ?.focus({ preventScroll: true });
  }, reduceMotion ? 0 : 500);
}
