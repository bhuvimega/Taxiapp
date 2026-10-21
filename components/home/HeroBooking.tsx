import Image from "next/image";
import BookingForm from "./BookingForm";

/**
 * Server component: image + headline render with no JavaScript.
 * Only <BookingForm /> is a client component.
 */
export default function HeroBooking() {
  return (
    <section className="relative isolate min-h-[560px] sm:min-h-[580px]">
      <Image
        src="/images/hero-travel.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-overlay/65" />

      <div className="site-container pb-16 pt-16 sm:pt-[72px]">
        <div className="mx-auto max-w-[760px] text-center">
          <h1 className="text-[38px] font-extrabold leading-[1.08] tracking-[-1.5px] text-white sm:text-5xl lg:text-[60px]">
            Intercity Cabs,
            <br />
            <span className="text-highlight">booked in seconds.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[650px] text-sm font-medium leading-6 text-white/90 sm:text-base">
            Get a guaranteed all-inclusive fare, pick your car, and ride with a
            verified driver. Outstation, airport and hourly — one clean flow.
          </p>
        </div>

        <BookingForm />
      </div>
    </section>
  );
}
