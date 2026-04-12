import { useState } from 'react';
import { FEATURES } from '../../data/features.js';
import { FeatureCard } from '../cards/FeatureCard.jsx';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';

export function FeaturesSection() {
  const [activeCard, setActiveCard] = useState(null);
  const isPointer = useMediaQuery('(hover: hover)');

  function handleActivate(index) {
    if (isPointer) {
      setActiveCard(index);
    } else {
      setActiveCard((prev) => (prev === index ? null : index));
    }
  }

  function handleDeactivate() {
    if (isPointer) setActiveCard(null);
  }

  return (
    <section data-section id="features" className="scroll-mt-12">
      <div className="w-full pt-10 md:pt-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-5 md:mb-10 gap-6 md:gap-8">
            <div className="space-y-3">
              <p className="anseru-section-tag">Platform Features</p>
              <h2 className="anseru-section-title">
                Powerful Capabilities for
                <br className="hidden md:block" />
                Modern Deal Teams
              </h2>
            </div>
            <p className=" text-[15px] hidden md:block text-base md:text-lg text-black/60 max-w-md leading-tight pr-6 text-gray-600" style={{fontWeight:'400'}}>
              Centralize knowledge, generate accurate responses, and collaborate seamlessly across teams.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                isActive={activeCard === index}
                isMobile={!isPointer}
                onActivate={() => handleActivate(index)}
                onDeactivate={handleDeactivate}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
