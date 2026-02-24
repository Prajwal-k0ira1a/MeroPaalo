import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Problem from "../components/landing/Problem";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import Pricing from "../components/landing/Pricing";
import CTABanner from "../components/landing/CTABanner";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Pricing />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}