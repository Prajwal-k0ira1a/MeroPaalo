import Navbar     from "./components/Navbar";
import Hero       from "./components/Hero";
import Problem    from "./components/Problem";
import HowItWorks from "./components/HowItWorks";
import Features   from "./components/Features";
import Pricing    from "./components/Pricing";
import CTABanner  from "./components/CTABanner";
import Footer     from "./components/Footer";

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