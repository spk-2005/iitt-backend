import { FAQ_ITEMS } from '../../data/faq.js';
import { FAQItem } from '../cards/FAQItem.jsx';

export function FAQSection() {
  const leftItems = FAQ_ITEMS.filter((item) => item.column === 'left');
  const rightItems = FAQ_ITEMS.filter((item) => item.column === 'right');

  return (
    <section data-section id="faq" className="scroll-mt-5">
      <section className="w-full pt-10 md:py-24 bg-[#f3f4f6] md:bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-10 md:pb-0">
          <div className="mb-5 md:mb-10">
            <p className="anseru-section-tag">FAQs</p>
            <h2 className="anseru-section-title">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            <div className="flex flex-col gap-2 md:gap-3">
              {leftItems.map((item) => (
                <FAQItem key={item.id} question={item.question} answer={item.answer} />
              ))}
            </div>
            <div className="flex flex-col gap-2 md:gap-3">
              {rightItems.map((item) => (
                <FAQItem key={item.id} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
