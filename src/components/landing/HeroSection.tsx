import React, { useState } from 'react';
import { Product, BundleTier } from '../../types/product';
import { SupplementVisual } from '../common/SupplementVisual';
import { Check, Star, ShieldCheck, Truck, ArrowRight, Gift, Clock, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  product: Product;
  onAddToCart: (bundle: BundleTier, flavor: string, size: string) => void;
  onBuyNow: (bundle: BundleTier, flavor: string, size: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  product,
  onAddToCart,
  onBuyNow,
}) => {
  const [selectedBundleId, setSelectedBundleId] = useState<string>(
    product.bundles.find((b) => b.popular)?.id || product.bundles[0]?.id || ''
  );
  const [selectedFlavor, setSelectedFlavor] = useState<string>(product.flavors[0] || 'Original');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Estándar');

  const selectedBundle =
    product.bundles.find((b) => b.id === selectedBundleId) || product.bundles[0];

  const brandGreen = product.accentColor || '#7cb20b';

  return (
    <section className="relative overflow-hidden bg-white pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-slate-200">
      {/* Background soft ambient grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Kicker Bar / Social proof line */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="font-bold text-slate-900 ml-1 tabular-nums font-mono">
              {product.rating.toFixed(2)}
            </span>
          </div>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{product.reviewsCount.toLocaleString()} atletas verificados</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="font-medium text-emerald-700 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            En stock · Envío express 24h
          </span>
          <span aria-hidden="true" className="text-slate-300 hidden sm:inline">·</span>
          <span className="text-slate-500 hidden sm:inline">{product.badge}</span>
        </div>

        {/* 2-Column Responsive Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Visual Canister & Media Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="sticky top-20 w-full flex flex-col items-center">
              <div className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-100 rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-sm flex flex-col items-center relative">
                
                {/* Special Promotional Tag */}
                <div className="w-full flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
                  <span className="uppercase tracking-wider font-semibold text-slate-700">
                    {product.category}
                  </span>
                  <span className="text-slate-700 font-bold bg-slate-200/70 px-2 py-0.5 rounded">
                    LOTE QA 100% PURO
                  </span>
                </div>

                {/* 3D Visual Canister */}
                <SupplementVisual product={product} size="hero" className="my-2" />

                {/* Flavor & Size Selector within visual pod */}
                <div className="w-full mt-4 pt-4 border-t border-slate-200/80 space-y-3">
                  {/* Flavors */}
                  {product.flavors.length > 0 && (
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-medium text-slate-700">Sabor Seleccionado:</span>
                        <span className="font-bold text-slate-900">{selectedFlavor}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {product.flavors.map((flavor) => (
                          <button
                            key={flavor}
                            type="button"
                            onClick={() => setSelectedFlavor(flavor)}
                            className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                              selectedFlavor === flavor
                                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {flavor}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sizes */}
                  {product.sizes.length > 1 && (
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-medium text-slate-700">Formato / Peso:</span>
                        <span className="font-bold text-slate-900">{selectedSize}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                              selectedSize === size
                                ? 'bg-slate-900 text-white font-semibold'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust micro-row below canister */}
              <div className="w-full grid grid-cols-3 gap-2 mt-3 text-center">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60 text-slate-700">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Entrega</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">24/48 Horas</div>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60 text-slate-700">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Garantía</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">30 Días Total</div>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60 text-slate-700">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Pago Seguro</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">Bizum / Tarjeta / COD</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Persuasive Copy + Pack Offers + CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            
            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide text-slate-900 leading-[1.18] font-gunplay uppercase" style={{ textWrap: 'balance' }}>
              {product.heroTitle}
            </h1>

            {/* Subheadline */}
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              {product.heroSubtitle}
            </p>

            {/* Scientific Proof Bullets */}
            <div className="mt-4 space-y-2">
              {product.heroBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-[#7cb20b]/20 text-[#659208] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* PACK BUNDLE SELECTION MODULE (High conversion engine) */}
            <div id="packs" className="mt-6 p-4 sm:p-5 bg-slate-50/80 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Paso 1: Elige tu Pack de Ahorro
                </span>
                <span className="text-xs font-medium text-emerald-700">
                  Mejor precio garantizado directo de fábrica
                </span>
              </div>

              {/* Bundle Cards */}
              <div className="space-y-2.5">
                {product.bundles.map((bundle) => {
                  const isSelected = selectedBundle?.id === bundle.id;
                  return (
                    <div
                      key={bundle.id}
                      onClick={() => setSelectedBundleId(bundle.id)}
                      className={`relative cursor-pointer rounded-lg p-3 sm:p-3.5 transition-all border flex items-center justify-between ${
                        isSelected
                          ? 'bg-white border-[#7cb20b] shadow-md ring-2 ring-[#7cb20b]/20'
                          : 'bg-white/80 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Popular / Promo Badge */}
                      {bundle.badge && (
                        <span className="absolute -top-2.5 right-4 bg-slate-900 text-[#7cb20b] text-[10px] font-extrabold px-2.5 py-0.5 rounded tracking-wide uppercase">
                          {bundle.badge}
                        </span>
                      )}

                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                            isSelected
                              ? 'border-[#7cb20b] bg-[#7cb20b]'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>

                        <div>
                          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <span>{bundle.name}</span>
                            {bundle.freeGift && (
                              <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-0.5">
                                <Gift className="w-3 h-3 text-[#7cb20b]" />
                                {bundle.freeGift}
                              </span>
                            )}
                          </div>
                          {bundle.savingsText && (
                            <div className="text-xs text-[#dc2626] font-semibold mt-0.5">
                              {bundle.savingsText}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pricing block */}
                      <div className="text-right shrink-0">
                        <div className="text-lg font-black text-slate-900 font-mono tabular-nums">
                          {bundle.price.toFixed(2)}€
                        </div>
                        {bundle.originalPrice && (
                          <div className="text-xs text-slate-600 line-through font-mono tabular-nums">
                            {bundle.originalPrice.toFixed(2)}€
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-5 space-y-2.5">
                <button
                  type="button"
                  onClick={() => onBuyNow(selectedBundle, selectedFlavor, selectedSize)}
                  className="w-full py-3.5 px-6 rounded-lg text-white font-black text-base tracking-wide bg-[#7cb20b] hover:bg-[#6fa00a] active:scale-[0.99] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{product.ctaText}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onAddToCart(selectedBundle, selectedFlavor, selectedSize)}
                    className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Añadir a mi pedido</span>
                    <span className="font-mono tabular-nums text-slate-300">
                      ({selectedBundle.price.toFixed(2)}€)
                    </span>
                  </button>
                </div>
              </div>

              {/* Guarantee and Payment Assurance Micro-Bar */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Prueba 30 días sin riesgo
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-slate-600" />
                  Envío gratis desde 39€
                </span>
                <span className="text-slate-400">
                  Bizum · Visa/MC · Contraentrega
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
