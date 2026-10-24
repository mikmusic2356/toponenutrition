import React from 'react';
import { Product } from '../../types/product';
import { Check, X, ShieldAlert, Award } from 'lucide-react';

interface ComparisonTableProps {
  product: Product;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ product }) => {
  const { comparison } = product;

  return (
    <section id="comparativa" className="pt-8 border-t border-slate-200 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#7cb20b] mb-1">
          {comparison.badgeTitle || 'Transparencia de Ingredientes'}
        </div>
        <h2 className="text-xl sm:text-2xl font-normal tracking-wide text-slate-900 font-gunplay uppercase">
          {comparison.title}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">
          {comparison.subtitle}
        </p>
      </div>

      {/* Comparison Table Container */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white w-full max-w-full">
        <div className="overflow-x-auto w-full max-w-full">
          <table className="w-full text-left border-collapse min-w-[440px] sm:min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-3 px-3.5 sm:px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 w-1/3">
                  Parámetro
                </th>
                <th className="py-3 px-3.5 sm:px-4 text-[11px] font-black uppercase tracking-wider text-slate-950 bg-[#7cb20b]/10 border-x border-[#7cb20b]/30 w-1/3">
                  <div className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#659208]" />
                    <span>{comparison.topOneLabel}</span>
                  </div>
                </th>
                <th className="py-3 px-3.5 sm:px-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 w-1/3">
                  <div className="flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
                    <span>{comparison.competitorLabel}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {comparison.rows.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                >
                  {/* Feature Name */}
                  <td className="py-3 px-3.5 sm:px-4 font-semibold text-slate-900 align-top">
                    {row.feature}
                  </td>

                  {/* TopOne Column (Highlighted) */}
                  <td className="py-3 px-3.5 sm:px-4 font-medium text-slate-900 bg-[#7cb20b]/5 border-x border-[#7cb20b]/20 align-top">
                    <div className="flex items-start gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#7cb20b] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span className="font-semibold text-slate-900">
                        {row.topOne}
                      </span>
                    </div>
                  </td>

                  {/* Generic Competitor Column */}
                  <td className="py-3 px-3.5 sm:px-4 text-slate-500 align-top">
                    <div className="flex items-start gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-2.5 h-2.5 stroke-[2.5]" />
                      </span>
                      <span>{row.competitor}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer note inside table */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>* Ensayos analíticos contrastados por laboratorios ENAC/ISO.</span>
          <span className="font-mono text-slate-700 font-semibold">0% Sustancias Ocultas</span>
        </div>
      </div>
    </section>
  );
};
