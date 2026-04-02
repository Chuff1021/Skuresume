"use client";

import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Statistics } from "@/components/landing/statistics";
import { Features } from "@/components/landing/features";
import { TemplatesShowcase } from "@/components/landing/templates-showcase";
import { Testimonials } from "@/components/landing/testimonials";
import { DonationBanner } from "@/components/landing/donation-banner";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero is outside the bordered container */}
      <Hero />

      {/* All sections inside bordered container */}
      <div className="container mx-auto [&>section]:border-t [&>section]:border-border [&>section:first-child]:border-t-0">
        <Statistics />
        <Features />
      </div>

      <TemplatesShowcase />
      <Testimonials />
      <DonationBanner />
      <FAQ />
      <Footer />
    </div>
  );
}
