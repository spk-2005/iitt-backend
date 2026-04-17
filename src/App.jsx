import { useRef, lazy, Suspense } from 'react';
import { useScrollSnap } from './hooks/useScrollSnap.js';
import { Navbar } from './components/layout/Navbar.jsx';
import { HeroSection } from './components/sections/HeroSection.jsx';
// Lazy load all below-the-fold sections
const ProblemSection = lazy(() => import('./components/sections/ProblemSection.jsx').then(module => ({ default: module.ProblemSection })));
const HowItWorksSection = lazy(() => import('./components/sections/HowItWorksSection.jsx').then(module => ({ default: module.HowItWorksSection })));
const ProductSection = lazy(() => import('./components/sections/ProductSection.jsx').then(module => ({ default: module.ProductSection })));
const WorkflowSection = lazy(() => import('./components/sections/WorkflowSection.jsx').then(module => ({ default: module.WorkflowSection })));
const IntegrationSection = lazy(() => import('./components/sections/IntegrationSection.jsx').then(module => ({ default: module.IntegrationSection })));
const SecuritySection = lazy(() => import('./components/sections/SecuritySection.jsx').then(module => ({ default: module.SecuritySection })));
const FeaturesSection = lazy(() => import('./components/sections/FeaturesSection.jsx').then(module => ({ default: module.FeaturesSection })));
const FAQSection = lazy(() => import('./components/sections/FAQSection.jsx').then(module => ({ default: module.FAQSection })));
const CTASection = lazy(() => import('./components/sections/CTASection.jsx').then(module => ({ default: module.CTASection })));
import { Footer } from './components/layout/Footer.jsx';
import AnseruPrivacyPolicy from './pages/PrivacyPolicy.jsx';
import AnseruTermsOfService from './pages/TermsOfServices.jsx';

export default function App() {
  const carouselRef = useRef(null);
  const agentsRef = useRef(null);

  // Intercepts wheel events on desktop to snap through the 400vh carousel
  // and 200vh agents sections one slide at a time.
  useScrollSnap(carouselRef, agentsRef);

  if (window.location.pathname === '/privacy-policy') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 mt-20">
          <AnseruPrivacyPolicy />
        </main>
        <Footer />
      </div>
    );
  }

  if (window.location.pathname === '/terms-of-service') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 mt-20">
          <AnseruTermsOfService />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={null}>
          <ProblemSection />
          <HowItWorksSection carouselRef={carouselRef} />
          <ProductSection agentsRef={agentsRef} />
          <WorkflowSection />
          <IntegrationSection />
          <SecuritySection />
          <FeaturesSection />
          <FAQSection />
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
