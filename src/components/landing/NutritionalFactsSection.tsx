import React from 'react';
import { Product } from '../../types/product';
import { ShieldCheck, Info, Check, Clock, Droplets } from 'lucide-react';

interface NutritionalFactsSectionProps {
  product: Product;
}

export const NutritionalFactsSection: React.FC<NutritionalFactsSectionProps> = ({ product }) => {
  const { nutritionalFacts } = product;
  const isImageMode = nutritionalFacts.displayMode === 'image' && Boolean(nutritionalFacts.imageUrl);

  return (
    <section id="nutricion" className="pt-8 border-t border-slate-200 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#7cb20b] mb-1">
          {nutritionalFacts.badgeTitle || 'Composición de Grado Clínico'}
        </div>
        <h2 className="text-xl sm:text-2xl font-normal tracking-wide text-slate-900 font-gunplay uppercase">
          {nutritionalFacts.sectionTitle || 'Información Nutricional Oficial'}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">
          {nutritionalFacts.sectionSubtitle || 'Valores medios analizados por toma y dosis diaria recomendada.'}
        </p>
      </div>

      <div className="space-y-5 w-full max-w-full">
        
        {isImageMode ? (
          /* Custom Nutritional Facts Image Display */
          <div className="bg-white rounded-xl border-2 border-slate-900 p-5 shadow-xs w-full max-w-full">
            <div className="border-b-4 border-slate-900 pb-2 mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-normal tracking-wide text-slate-900 uppercase font-gunplay">
                  Ficha Técnica / Etiqueta Oficial
                </h3>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {nutritionalFacts.imageCaption || 'Composición e información nutricional certificada'}
                </div>
              </div>
              <div className="px-2.5 py-1 bg-slate-100 rounded text-[11px] font-mono text-slate-600 border border-slate-200">
                Documento Oficial
              </div>
            </div>

            <div className="flex justify-center bg-slate-50 p-3 sm:p-5 rounded-lg border border-slate-200 overflow-hidden w-full max-w-full">
              <img
                src={nutritionalFacts.imageUrl}
                alt={nutritionalFacts.sectionTitle || 'Información Nutricional'}
                className="max-h-[500px] w-auto max-w-full object-contain rounded shadow-sm hover:scale-[1.02] transition-transform duration-200"
                loading="lazy"
              />
            </div>
            {nutritionalFacts.imageCaption && (
              <p className="text-[11px] text-center text-slate-500 mt-2 italic">
                {nutritionalFacts.imageCaption}
              </p>
            )}
          </div>
        ) : (
          /* Official Supplement Facts Box */
          <div className="bg-white rounded-xl border-2 border-slate-900 p-5 shadow-xs">
          
          {/* Supplement Header */}
          <div className="border-b-6 border-slate-900 pb-2">
            <h3 className="text-xl font-normal tracking-wide text-slate-900 uppercase font-gunplay">
              Supplement Facts / Ficha Técnica
            </h3>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Valores analizados en laboratorio independiente
            </div>
          </div>

          {/* Serving Size info */}
          <div className="py-2 border-b-4 border-slate-900 text-xs text-slate-800 flex justify-between items-center">
            <div>
              <span className="font-bold">Dosis por toma:</span> {nutritionalFacts.servingSize}
            </div>
            <div>
              <span className="font-bold">Tomas por bote:</span> {nutritionalFacts.servingsPerContainer}
            </div>
          </div>

          {/* Table of active ingredients */}
          <div className="divide-y divide-slate-200">
            <div className="py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 flex justify-between">
              <span>Ingrediente Activo</span>
              <span>Por Toma</span>
            </div>

            {nutritionalFacts.table.map((row, idx) => (
              <div
                key={idx}
                className="py-1.5 text-xs flex justify-between items-center text-slate-800"
              >
                <span className={row.ingredient.startsWith('—') ? 'pl-3 text-slate-500' : 'font-semibold text-slate-900'}>
                  {row.ingredient}
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {row.perServing}
                  </span>
                  {row.dailyValue && (
                    <span className="text-[10px] text-slate-500 w-8 text-right font-mono">
                      {row.dailyValue}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <div className="pt-2.5 border-t-4 border-slate-900 text-[10px] text-slate-500 leading-snug">
            * VRN: Valores de Referencia de Nutrientes según reglamento (UE) 1169/2011. ** VRN no establecido oficialmente.
          </div>
        </div>
      )}

        {/* How to Take Protocol & Quality Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Protocol Card */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#7cb20b]" />
              <h4 className="text-xs font-normal text-slate-900 font-gunplay uppercase tracking-wider">
                Protocolo de Toma Recomendado
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {nutritionalFacts.usageInstructions}
            </p>
          </div>

          {/* Certifications Card */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#7cb20b]" />
              <h4 className="text-xs font-normal text-slate-900 font-gunplay uppercase tracking-wider">
                Sellos y Calidad Verificada
              </h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {nutritionalFacts.certificates.map((cert, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white rounded border border-slate-200 text-[11px] font-semibold text-slate-800 flex items-center gap-1"
                >
                  <Check className="w-3 h-3 text-[#7cb20b]" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
