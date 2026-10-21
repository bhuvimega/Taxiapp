import Link from "next/link";
import { Apple, Play, Smartphone } from "lucide-react";
import { appFeatures, storeLinks } from "./appDownloadData";

export default function AppDownload() {
  return (
    <section className="section-brand pb-14 sm:pb-16 lg:pb-20">
      <div className="site-container">
        <div className="relative isolate overflow-hidden rounded-3xl bg-surface-dark p-6 text-surface-dark-foreground sm:p-10 lg:p-12">
          {/* Decorative circles */}
          <span className="absolute -right-16 -top-16 -z-10 size-56 rounded-full bg-brand/20" />
          <span className="absolute -bottom-20 -left-10 -z-10 size-52 rounded-full bg-highlight/10" />

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="chip chip-dark">
                <Smartphone size={14} className="text-highlight" aria-hidden="true" />
                GoCabxi App
              </span>

              <h2 className="section-title mt-3">Book faster with the GoCabxi app</h2>

              <ul className="mt-6 grid max-w-[560px] gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                {appFeatures.map(({ label, icon: Icon }) => (
                  <li key={label} className="flex items-start gap-3 text-surface-dark-foreground/85">
                    <Icon size={17} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={storeLinks.googlePlay} className="store-btn">
                  <Play size={20} aria-hidden="true" />
                  <span className="leading-tight">
                    <span className="block text-[10px] font-medium uppercase text-muted-foreground">
                      Get it on
                    </span>
                    <span className="block text-base font-semibold">Google Play</span>
                  </span>
                </Link>

                <Link href={storeLinks.appStore} className="store-btn">
                  <Apple size={20} aria-hidden="true" />
                  <span className="leading-tight">
                    <span className="block text-[10px] font-medium text-muted-foreground">
                      Download on the
                    </span>
                    <span className="block text-base font-semibold">App Store</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* QR card — swap the placeholder for your real QR image */}
            <div className="hidden w-[200px] rounded-3xl bg-white p-4 text-on-brand lg:block">
              <div className="flex aspect-square items-center justify-center rounded-2xl bg-muted">
                <Smartphone size={56} className="text-subtle" aria-hidden="true" />
              </div>
              <p className="mt-3 text-center text-xs font-semibold">Scan to download</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
