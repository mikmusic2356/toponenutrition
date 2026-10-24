import React, { useState } from 'react';
import { Product } from '../../types/product';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FaqSectionProps {
  product: Product;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ product }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="pt-8 border-t border-slate-200 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#7cb20b] mb-1">
          {product.faqBadge || 'Respuestas Técnicas'}
        </div>
        <h2 className="text-xl sm:text-2xl font-normal tracking-wide text-slate-900 font-gunplay uppercase">
          {product.faqTitle || `Preguntas Frecuentes sobre ${product.name.split(' ')[0]}`}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">
          {product.faqSubtitle || 'Todo lo que necesitas saber antes de empezar tu suplementación con TopOneNutrition.'}
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-2.5">
        {product.faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 font-bold text-slate-900 text-xs sm:text-sm hover:text-slate-700 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-[#7cb20b] shrink-0" />
                  <span>{faq.question}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'transform rotate-180 text-slate-900' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-3.5 pb-4 sm:px-4 sm:pb-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                  <p className="pt-2.5">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Callout */}
      <div className="mt-4 text-xs text-slate-500 flex items-center gap-2">
        <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>¿Tienes dudas sobre combinación o tomas específicas? Te atendemos por WhatsApp.</span>
      </div>
    </section>
  );
};
