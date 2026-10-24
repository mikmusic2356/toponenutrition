import React from 'react';
import { Product } from '../../types/product';
import { ArrowRight } from 'lucide-react';
import { formatCOP } from '../../lib/currency';

interface StickyMobileBuyBarProps {
  product: Product;
  onQuickBuy: () => void;
}

export const StickyMobileBuyBar: React.FC<StickyMobileBuyBarProps> = ({
  product,
  onQuickBuy,
}) => {
  const baseBundle = product.bundles[0];

  return (
    <aside
      aria-label="Barra de compra rápida"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3.5 sm:px-4 py-2.5 shadow-lg w-full max-w-full overflow-hidden"
      style={{ maxHeight: '68px' }}
    >
      <div className="flex items-center justify-between gap-2.5 sm:gap-3 max-w-md mx-auto w-full">
        <div className="truncate min-w-0 flex-1">
          <div className="text-xs font-bold text-slate-900 truncate">
            {product.name.split(' ')[0]} {product.name.split(' ')[1]}
          </div>
          <div className="text-xs font-mono font-bold text-[#659208] tabular-nums">
            Desde {baseBundle ? formatCOP(baseBundle.price) : ''}
            {baseBundle?.originalPrice && (
              <span className="text-slate-600 line-through text-[11px] ml-1">
                {formatCOP(baseBundle.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onQuickBuy}
          className="btn-buy-animated py-2 px-4 rounded-lg bg-[#7cb20b] hover:bg-[#6fa00a] text-slate-950 font-black text-xs whitespace-nowrap shadow-sm flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <span>Comprar ahora</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      </div>
    </aside>
  );
};
