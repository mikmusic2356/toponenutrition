import React from 'react';
import { Product } from '../../types/product';
import { Zap, ShieldCheck, Award, Flame, Activity, Heart, Sparkles, CheckCircle } from 'lucide-react';

interface BenefitsSectionProps {
  product: Product;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ product }) => {
  const getIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-[#7cb20b]' };
    switch (iconName) {
      case 'zap': return <Zap {...props} />;
      case 'shield-check': return <ShieldCheck {...props} />;
      case 'award': return <Award {...props} />;
      case 'flame': return <Flame {...props} />;
      case 'activity': return <Activity {...props} />;
      case 'heart': return <Heart {...props} />;
      case 'sparkles': return <Sparkles {...props} />;
      default: return <CheckCircle {...props} />;
    }
  };

  return (
    <section id="beneficios" className="pt-8 border-t border-slate-200 w-full min-w-0 max-w-full">
      {/* Section Header */}
      <div className="mb-6">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#7cb20b] mb-1">
          Rendimiento & Fisiología
        </div>
        <h2 className="text-xl sm:text-2xl font-normal tracking-wide text-slate-900 font-gunplay uppercase">
          Beneficios Clave Respaldados por Evidencia Científica
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">
          Formulado con ingredientes activos a dosis terapéuticas reales, eliminando agentes de carga o mezclas no declaradas.
        </p>
      </div>

      {/* Benefits Grid (2 columns on sm/md/lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {product.benefits.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                  {getIcon(b.icon)}
                </div>
                {b.stat && (
                  <span className="text-[11px] font-mono font-bold text-[#659208] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {b.stat}
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-slate-900 mb-1.5 font-gunplay uppercase tracking-wide">
                {b.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {b.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>ESTÁNDAR TOPONE</span>
              <span className="text-[#659208] font-bold">100% ACTIVO</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Arguments Card in Column 2 */}
      {product.salesArgumentsBullets && product.salesArgumentsBullets.length > 0 && (
        <div className="mt-6 bg-slate-50 rounded-xl border border-slate-200 p-5">
          <div className="mb-3">
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
              Transparencia Absoluta
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5 font-gunplay uppercase tracking-wide">
              {product.salesArgumentsTitle || 'La Diferencia TopOneNutrition'}
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              {product.salesArgumentsSubtitle ||
                'Comparamos nuestra fórmula y control de calidad con los estándares más estrictos.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.salesArgumentsBullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="w-4 h-4 rounded-full bg-[#7cb20b]/20 text-[#659208] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </span>
                <span className="text-xs text-slate-700 leading-snug">{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
