"use client";

import HeroCarousel from "@/components/HeroCarousel";
import ServicesSection from "@/components/ServicesSection";
import BotsSection from "@/components/BotsSection";
import AboutSection from "@/components/AboutSection";
import ContactsSection from "@/components/ContactsSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative">

      {/* Hero Section */}
      <div className="relative z-10 mb-40 sm:mb-48 lg:mb-56">
        <HeroCarousel />
      </div>

      {/* Main Sections */}
      <main className="flex flex-col items-center space-y-40 sm:space-y-48 lg:space-y-56">

        <section id="Services" className="w-full flex justify-center">
          <ServicesSection />
        </section>

        <section id="Bots" className="w-full flex justify-center">
          <BotsSection />
        </section>

        <section id="Contact" className="w-full flex justify-center">
          <ContactsSection />
        </section>

        <section id="About" className="w-full flex justify-center">
          <AboutSection />
        </section>
      </main>

    </div >
  );
}
