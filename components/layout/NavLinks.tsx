"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToBooking, useTrip } from "@/components/providers/TripProvider";
import { navItems, siteConfig } from "@/config/site";

type NavLinksProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export default function NavLinks({
  variant = "desktop",
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname();
  const { trip, selectTrip } = useTrip();
  const onHome = pathname === "/";

  return (
    <>
      {navItems.map((item) => {
        const isActive = onHome && trip === item.trip;

        return (
          <Link
            key={item.trip}
            href={siteConfig.routes.booking}
            onClick={(event) => {
              selectTrip(item.trip);
              onNavigate?.();

              if (onHome) {
                event.preventDefault();
                // Mobile: wait for the menu to close and unlock page scrolling.
                window.setTimeout(
                  scrollToBooking,
                  variant === "mobile" ? 150 : 0,
                );
              }
            }}
            aria-current={isActive ? "true" : undefined}
            className={
              variant === "mobile" ? "nav-link nav-link-mobile" : "nav-link"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
