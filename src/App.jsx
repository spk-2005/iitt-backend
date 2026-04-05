import { useRef } from 'react';
import { useScrollSnap } from './hooks/useScrollSnap.js';
import { Navbar } from './components/layout/Navbar.jsx';
import { HeroSection } from './components/sections/HeroSection.jsx';
import { ProblemSection } from './components/sections/ProblemSection.jsx';
import { HowItWorksSection } from './components/sections/HowItWorksSection.jsx';
import { ProductSection } from './components/sections/ProductSection.jsx';
import { WorkflowSection } from './components/sections/WorkflowSection.jsx';
import { SecuritySection } from './components/sections/SecuritySection.jsx';
import { FeaturesSection } from './components/sections/FeaturesSection.jsx';
import { IntegrationSection } from './components/sections/IntegrationSection.jsx';
import { FAQSection } from './components/sections/FAQSection.jsx';
import { CTASection } from './components/sections/CTASection.jsx';

export default function App() {
  const carouselRef = useRef(null);
  const agentsRef = useRef(null);

  // Intercepts wheel events on desktop to snap through the 400vh carousel
  // and 200vh agents sections one slide at a time.
  useScrollSnap(carouselRef, agentsRef);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection carouselRef={carouselRef} />
        <ProductSection agentsRef={agentsRef} />
        <WorkflowSection />
        <IntegrationSection />
        <SecuritySection />
        <FeaturesSection />
        <FAQSection />
        <CTASection />
      </main>
    </>
  );
}
