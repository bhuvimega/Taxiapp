import Link from "next/link";
import { Suspense } from "react";
import { Phone } from "lucide-react";
import Logo from "@/components/common/Logo";
import { footerGroups, footerTrustItems } from "@/config/footer";
import { siteConfig } from "@/config/site";
import CopyrightYear from "./CopyrightYear";

export default function Footer() {
  const { phone } = siteConfig;

  return (
    <footer className="border-t bg-background text-foreground">
      <div className="site-container pb-6 pt-10 lg:pt-12">
        {/* Brand + link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-[1.35fr_1.1fr_1.2fr_1.1fr_1.1fr_1fr] lg:gap-x-8">
          <div className="col-span-2 sm:col-span-1">
            <Logo className="mb-4" />

            <p className="max-w-[235px] text-sm leading-relaxed text-muted-foreground">
              Premium intercity &amp; local cab booking with transparent,
              all-inclusive fares and verified drivers across India.
            </p>

            <ul className="mt-4 space-y-2.5">
              {footerTrustItems.map(({ label, Icon }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-body">
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    className="shrink-0 text-brand-text"
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-3 text-sm font-semibold">{group.title}</h2>

              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-muted text-sm leading-5">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Copyright + contact */}
        <div className="mt-10 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-muted-foreground">
            © <Suspense fallback="2026"><CopyrightYear /></Suspense> {siteConfig.name}. Phase 1 demo — mocked
            payments, OTP &amp; dispatch.
          </p>

          <a
            href={phone.href}
            className="link-muted inline-flex items-center gap-2 self-start text-xs sm:self-auto"
          >
            <Phone size={14} aria-hidden="true" />
            <span>{phone.label}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
