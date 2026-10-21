import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import Logo from "@/components/common/Logo";
import { siteConfig } from "@/config/site";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";

export default function Header() {
  const { phone, routes } = siteConfig;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-header-border bg-header-background">
      <div className="site-container flex h-[76px] items-center justify-between">
        <Logo />

        <nav
          aria-label="Booking categories"
          className="hidden items-center gap-1 md:flex"
        >
          <NavLinks />
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href={routes.myTrips}
            className="link-body whitespace-nowrap text-sm font-medium"
          >
            My Trips
          </Link>

          <a
            href={phone.href}
            className="link-muted flex items-center gap-2 whitespace-nowrap text-sm"
          >
            <Phone size={16} aria-hidden="true" />
            {phone.label}
          </a>

          <Link href={routes.trackRide} className="btn btn-outline btn-pill">
            <MapPin size={16} aria-hidden="true" />
            Track Ride
          </Link>
        </div>

        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
