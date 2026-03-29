import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import ProblemSection from "../components/ProblemSection";
import Features from "../components/Features";
import TwoAgents from "../components/TwoAgents";
import RFPWorkflow from "../components/RFPWorkflow";
import Footer from "../components/Footer";
import Integration from "../components/integration";
import SecurityComplianceDiagram from "../components/SecurityComplianceDiagram";
import Carousel from "../components/Carousel";
import FAQSection from "../components/FAQSection";
import hero from "../assets/hero (3).png";
import { usePageSroll } from "../usePageScroll";

export default function Index() {

  usePageSroll("[data-section]");

  return (
    <div className="w-full min-h-screen">
      <Navbar />

      <section data-section id="home" className="scroll-mt-12">
        <HeroBanner />
        <img src={hero} alt="hero" />
      </section>

      <section data-section id="problem" className="scroll-mt-20">
        <ProblemSection />
      </section>

      <section data-section id="how-it-works" className="scroll-mt-5">
        <Carousel />
      </section>

      <section data-section id="product" className="scroll-mt-4">
        <TwoAgents />
      </section>

      <section data-section id="workflow" className="scroll-mt-5">
        <RFPWorkflow />
      </section>

      <section data-section id="integration" className="scroll-mt-5">
        <Integration />
      </section>

      <section data-section id="security" className="scroll-mt-5">
        <SecurityComplianceDiagram />
      </section>

      <section data-section id="features" className="scroll-mt-12">
        <Features />
      </section>

      <section data-section id="faq" className="scroll-mt-5">
        <FAQSection />
      </section>
      <Footer />
    </div>
  );
}
