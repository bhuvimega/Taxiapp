import Link from "next/link";
import { CarFront } from "lucide-react";
import { siteConfig } from "@/config/site";

type LogoProps = {
  /** Used by the mobile menu to close itself when the logo is tapped. */
  onClick?: () => void;
  className?: string;
};

/** The GoCabxi logo. Header, mobile menu and footer all render this one component. */
export default function Logo({ onClick, className = "" }: LogoProps) {
  return (
    <Link
      href={siteConfig.routes.home}
      onClick={onClick}
      aria-label={`${siteConfig.name} home`}
      className={`inline-flex shrink-0 items-center gap-2.5 rounded-sm focus-ring ${className}`}
    >
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-brand text-white">
        <CarFront size={23} strokeWidth={2.2} aria-hidden="true" />
        <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border border-background bg-highlight" />
      </span>

      <span className="text-[21px] font-extrabold tracking-tight text-foreground">
        Go<span className="text-brand">Cabxi</span>
      </span>
    </Link>
  );
}
