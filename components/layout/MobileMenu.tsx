"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Menu, Phone, X } from "lucide-react";
import Logo from "@/components/common/Logo";
import { siteConfig } from "@/config/site";
import NavLinks from "./NavLinks";

export default function MobileMenu() {
  const pathname = usePathname();
  const { phone, routes } = siteConfig;

  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const isOpen = openedOn === pathname;
  const close = () => setOpenedOn(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenedOn(null);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenedOn(pathname)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        className="icon-btn"
      >
        <Menu size={25} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-100 lg:hidden">
          {/* Dimmed page backdrop */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={close}
            className="absolute inset-0 size-full cursor-default bg-overlay/30"
          />

          {/* Side panel */}
          <aside
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute inset-y-0 left-0 flex w-[min(88%,425px)] flex-col bg-background shadow-2xl"
          >
            <div className="flex h-[65px] shrink-0 items-center justify-between border-b px-4">
              <Logo onClick={close} />

              <button
                type="button"
                onClick={close}
                aria-label="Close navigation menu"
                className="icon-btn"
              >
                <X size={23} aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label="Booking categories"
              className="flex flex-1 flex-col overflow-y-auto px-4 py-3"
            >
              <NavLinks variant="mobile" onNavigate={close} />

              <Link
                href={routes.myTrips}
                onClick={close}
                className="nav-link nav-link-mobile mt-2 font-semibold"
              >
                My Trips
              </Link>
            </nav>

            <div className="shrink-0 px-4 pb-4 pt-2">
              <Link
                href={routes.trackRide}
                onClick={close}
                className="btn btn-solid btn-pill h-11 w-full"
              >
                <MapPin size={16} aria-hidden="true" />
                Track Ride
              </Link>

              <a
                href={phone.href}
                className="link-muted mt-3 flex items-center justify-center gap-2 py-2 text-sm"
              >
                <Phone size={15} aria-hidden="true" />
                {phone.label}
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
