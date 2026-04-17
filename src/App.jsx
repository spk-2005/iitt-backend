import { useRef, lazy, Suspense } from 'react';
import { useScrollSnap } from './hooks/useScrollSnap.js';
import { Navbar } from './components/layout/Navbar.jsx';
import { HeroSection } from './components/sections/HeroSection.jsx';
import { ProblemSection } from './components/sections/ProblemSection.jsx';
import { HowItWorksSection } from './components/sections/HowItWorksSection.jsx';
import { ProductSection } from './components/sections/ProductSection.jsx';

// Lazy load below-the-fold sections
const WorkflowSection = lazy(() => import('./components/sections/WorkflowSection.jsx').then(module => ({ default: module.WorkflowSection })));
const IntegrationSection = lazy(() => import('./components/sections/IntegrationSection.jsx').then(module => ({ default: module.IntegrationSection })));
const SecuritySection = lazy(() => import('./components/sections/SecuritySection.jsx').then(module => ({ default: module.SecuritySection })));
const FeaturesSection = lazy(() => import('./components/sections/FeaturesSection.jsx').then(module => ({ default: module.FeaturesSection })));
const FAQSection = lazy(() => import('./components/sections/FAQSection.jsx').then(module => ({ default: module.FAQSection })));
const CTASection = lazy(() => import('./components/sections/CTASection.jsx').then(module => ({ default: module.CTASection })));

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
        
        <Suspense fallback={null}>
          <WorkflowSection />
          <IntegrationSection />
          <SecuritySection />
          <FeaturesSection />
          <FAQSection />
          <CTASection />
        </Suspense>
      </main>
    </>
  );
}
