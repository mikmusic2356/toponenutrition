import React from 'react';
import { Product } from '../../types/product';
import { ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

interface GuaranteeSectionProps {
  product: Product;
  onScrollToPacks: () => void;
}

export const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({ product, onScrollToPacks }) => {
  return (
    <section id="garantia" className="pt-8 border-t border-slate-200 w-full min-w-0 max-w-full">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl p-5 sm:p-8 shadow-xl relative overflow-hidden w-full max-w-full">
        {/* Subtle green ambient accent glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7cb20b]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#7cb20b] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Garantía Incondicional de {product.guaranteeDays} Días
          </div>

          <h2 className="text-xl sm:text-2xl font-normal tracking-wide font-gunplay uppercase text-white">
            {product.guaranteeTitle || `Prueba ${product.name.split(' ')[0]} sin riesgo durante ${product.guaranteeDays} días`}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {product.guaranteeDescription ||
              `Estamos tan seguros de la pureza y eficacia de nuestras fórmulas que si no experimentas mejoras tangibles en tu rendimiento o si no te convence el sabor o la digestión, te devolvemos el 100% de tu dinero.`}
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-300 pt-1">
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-[#7cb20b]" />
              Devolución sencilla
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#7cb20b]" />
              Recogida a domicilio
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#7cb20b]" />
              Garantía oficial
            </span>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onScrollToPacks}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#7cb20b] hover:bg-[#6fa00a] text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Asegurar mi Oferta Ahora
            </button>
            <span className="text-[11px] text-slate-400 font-mono">
              Stock actual: <strong className="text-emerald-400">Disponible</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
