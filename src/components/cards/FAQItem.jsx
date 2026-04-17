import { useState } from 'react';

import faqIconSrc from '../../assets/Frame (11).png?format=webp&quality=80';

export function FAQItem({ question, answer, isOpen, onToggle }) {

  return (
    <div className="faq-item flex flex-col border border-gray-100 bg-white rounded-sm overflow-hidden">
      <button
        className="flex items-center justify-between py-3 md:py-4 px-4 cursor-pointer hover:bg-gray-100 transition-all select-none text-left w-full bg-transparent"
        style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex  items-center gap-3">
          <img src={faqIconSrc} loading="lazy" alt="" width={16} height={16} className="w-4 h-4 md:w-auto md:h-auto shrink-0" />
          <h3 className="text-black font-normal leading-snug" style={{ fontSize: 'clamp(13px,3.5vw,15px)' }}>{question}</h3>
        </div>
        <span className="text-black text-base md:text-lg leading-none ml-4 shrink-0 font-light">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? '500px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-4 pb-4 pt-1 md:ml-0 md:mr-6">
          <p className="text-gray-600 leading-relaxed" style={{ fontSize: 'clamp(12px,3.2vw,14px)' }}>{answer}</p>
        </div>
      </div>
    </div>
  );
}
