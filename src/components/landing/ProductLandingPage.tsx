import React, { useState } from 'react';
import { Product, BundleTier, ProductReview } from '../../types/product';
import { ProductGallery } from './ProductGallery';
import { BenefitsSection } from './BenefitsSection';
import { ComparisonTable } from './ComparisonTable';
import { NutritionalFactsSection } from './NutritionalFactsSection';
import { ReviewsSection } from './ReviewsSection';
import { FaqSection } from './FaqSection';
import { GuaranteeSection } from './GuaranteeSection';
import { StickyMobileBuyBar } from './StickyMobileBuyBar';
import { Star, Check, ArrowRight, Gift, ShieldCheck, Truck } from 'lucide-react';
import { formatCOP } from '../../lib/currency';

interface ProductLandingPageProps {
  product: Product;
  onAddToCart: (bundle: BundleTier, flavor: string, size: string) => void;
  onBuyNow: (bundle: BundleTier, flavor: string, size: string) => void;
  onAddReview: (review: ProductReview) => void;
  isPreviewMode?: boolean;
}

export const ProductLandingPage: React.FC<ProductLandingPageProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onAddReview,
  isPreviewMode = false,
}) => {
  // Shared state for flavor & size between Gallery and Purchase
  const [selectedFlavor, setSelectedFlavor] = useState<string>(product.flavors[0] || 'Neutro');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Estándar');

  // Bundle selection
  const [selectedBundleId, setSelectedBundleId] = useState<string>(
    product.bundles.find((b) => b.popular)?.id || product.bundles[0]?.id || ''
  );

  const selectedBundle =
    product.bundles.find((b) => b.id === selectedBundleId) || product.bundles[0];

  const scrollToPacks = () => {
    const el = document.getElementById('packs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileQuickBuy = () => {
    onBuyNow(selectedBundle, selectedFlavor, selectedSize);
  };

  const { sectionsConfig } = product;

  return (
    <main className="w-full max-w-full min-h-screen bg-white">
      {/* Background soft ambient pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-10 w-full max-w-full">
        
        {/* DESKTOP 2-COLUMN LAYOUT: Column 1 Sticky Left, Column 2 Scrollable Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full max-w-full">
          
          {/* ======================================================== */}
          {/* COLUMN 1: PRODUCT IMAGE & INTERACTIVE GALLERY             */}
          {/* Desktop: Sticky Left | Mobile: Static Natural Document Flow */}
          {/* ======================================================== */}
          <div className="w-full min-w-0 max-w-full lg:col-span-5 desktop-sticky-gallery z-20">
            <ProductGallery
              product={product}
              selectedFlavor={selectedFlavor}
              onSelectFlavor={setSelectedFlavor}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />
          </div>

          {/* ======================================================== */}
          {/* COLUMN 2: FULL SCROLLABLE SALES & PERSUASION ENGINE       */}
          {/* ======================================================== */}
          <div className="w-full min-w-0 max-w-full lg:col-span-7 flex flex-col space-y-8 sm:space-y-10">
            
            {/* 1. PRODUCT HEADER & PURCHASE MODULE */}
            <div>
              {/* Top rating & stock indicator */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-600 mb-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-bold text-slate-900 ml-1 tabular-nums font-mono">
                    {product.rating.toFixed(2)}
                  </span>
                </div>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>{product.reviewsCount.toLocaleString()} opiniones</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  En stock · Envío 24h
                </span>
                <span aria-hidden="true" className="text-slate-300 hidden sm:inline">·</span>
                <span className="text-slate-500 font-mono text-[11px] hidden sm:inline">{product.badge}</span>
              </div>

              {/* Main Headline */}
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide text-slate-900 leading-[1.18] font-gunplay uppercase"
                style={{ textWrap: 'balance' }}
              >
                {product.heroTitle}
              </h1>

              {/* Subheadline */}
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {product.heroSubtitle}
              </p>

              {/* Scientific proof bullets */}
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

              {/* PACKS & BUNDLES SELECTION MODULE */}
              {sectionsConfig.bundles && (
                <div id="packs" className="mt-6 p-4 sm:p-5 bg-slate-50/80 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Paso 1: Elige tu Pack de Ahorro
                    </span>
                    <span className="text-xs font-medium text-emerald-700">
                      Directo de laboratorio
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

                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                                isSelected
                                  ? 'border-[#7cb20b] bg-[#7cb20b]'
                                  : 'border-slate-300 bg-white'
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>

                            <div className="min-w-0 flex-1 pr-1.5">
                              <div className="text-xs sm:text-sm font-bold text-slate-900 flex flex-wrap items-center gap-1 sm:gap-2">
                                <span>{bundle.name}</span>
                                {bundle.freeGift && (
                                  <span className="text-[10px] sm:text-[11px] font-medium text-emerald-700 flex items-center gap-0.5">
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

                          {/* Pricing */}
                          <div className="text-right shrink-0">
                            <div className="text-base sm:text-lg font-black text-slate-900 font-mono tabular-nums">
                              {formatCOP(bundle.price)}
                            </div>
                            {bundle.originalPrice && (
                              <div className="text-xs text-slate-600 line-through font-mono tabular-nums">
                                {formatCOP(bundle.originalPrice)}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ACTION CTA BUTTONS */}
                  <div className="mt-5 space-y-2.5">
                    <button
                      type="button"
                      onClick={() => onBuyNow(selectedBundle, selectedFlavor, selectedSize)}
                      className="btn-buy-animated w-full py-3.5 px-6 rounded-lg text-slate-950 font-black text-base tracking-wide bg-[#7cb20b] hover:bg-[#6fa00a] active:scale-[0.99] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{product.ctaText}</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onAddToCart(selectedBundle, selectedFlavor, selectedSize)}
                      className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Añadir a mi pedido</span>
                      <span className="font-mono tabular-nums text-slate-300">
                        ({formatCOP(selectedBundle.price)})
                      </span>
                    </button>
                  </div>

                  {/* Micro reassurance strip */}
                  <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Prueba 30 días sin riesgo
                    </span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-slate-600" />
                      Envíos a toda Colombia
                    </span>
                    <span className="text-slate-400">
                      Nequi · Bancolombia · Tarjeta · Contraentrega
                    </span>
                  </div>

                </div>
              )}
            </div>

            {/* 2. BENEFICIOS CLAVE */}
            {sectionsConfig.benefits && (
              <BenefitsSection product={product} />
            )}

            {/* 3. OPINIONES DE COMPRADORES VERIFICADOS (ARRIBA DE TRANSPARENCIA) */}
            {sectionsConfig.reviews && (
              <ReviewsSection
                product={product}
                onAddReview={onAddReview}
              />
            )}

            {/* 4. TRANSPARENCIA DE INGREDIENTES (TABLA COMPARATIVA) */}
            {sectionsConfig.comparison && (
              <ComparisonTable product={product} />
            )}

            {/* 5. INFORMACIÓN NUTRICIONAL OFICIAL */}
            {sectionsConfig.nutrition && (
              <NutritionalFactsSection product={product} />
            )}

            {/* 6. PREGUNTAS FRECUENTES (FAQS) */}
            {sectionsConfig.faqs && (
              <FaqSection product={product} />
            )}

            {/* 7. GARANTÍA INCONDICIONAL DE 30 DÍAS */}
            {sectionsConfig.guarantee && (
              <GuaranteeSection
                product={product}
                onScrollToPacks={scrollToPacks}
              />
            )}

          </div>

        </div>

      </div>

      {/* Sticky Mobile Buy Bar (< 15% height rule) */}
      {!isPreviewMode && (
        <StickyMobileBuyBar
          product={product}
          onQuickBuy={handleMobileQuickBuy}
        />
      )}
    </main>
  );
};
