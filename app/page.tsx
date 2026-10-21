import AboutSection from "@/components/home/AboutSection";
import AppDownload from "@/components/home/AppDownload";
import CtaBanner from "@/components/home/CtaBanner";
import FaqSection from "@/components/home/FaqSection";
import FleetSection from "@/components/home/FleetSection";
import HeroBooking from "@/components/home/HeroBooking";
import HowItWorks from "@/components/home/HowItWorks";
import ServicesSection from "@/components/home/ServicesSection";
import Testimonials from "@/components/home/Testimonials";
import TrustFeatures from "@/components/home/TrustFeatures";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <HeroBooking />
      <TrustFeatures />
      <HowItWorks />
      <ServicesSection />
      <AboutSection />
      <FleetSection />
      <WhyChooseUs />
      <Testimonials />
      <AppDownload />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
