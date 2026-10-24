import React, { useState } from 'react';
import { Product } from '../../types/product';
import { SupplementVisual } from '../common/SupplementVisual';
import { ShieldCheck, Truck, RotateCcw, Award, CheckCircle, FileText, Droplets, Sparkles } from 'lucide-react';

interface ProductGalleryProps {
  product: Product;
  selectedFlavor: string;
  onSelectFlavor: (flavor: string) => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export type GalleryView = 'main' | 'gallery' | 'label' | 'mix' | 'certificate';

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  product,
  selectedFlavor,
  onSelectFlavor,
  selectedSize,
  onSelectSize,
}) => {
  const [activeView, setActiveView] = useState<GalleryView>('main');
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState<number>(0);

  const brandGreen = product.accentColor || '#7cb20b';
  const hasCustomImage = Boolean(product.customImageUrl);
  const galleryItems = product.gallery || [];

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col items-center">
      
      {/* Main Showcase Frame */}
      <div className="w-full max-w-full bg-gradient-to-b from-slate-50 via-white to-slate-100 rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-sm relative overflow-hidden flex flex-col items-center">
        
        {/* Top Header Tag */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
          <span className="uppercase tracking-wider font-semibold text-slate-700">
            {product.category}
          </span>
          <span className="text-slate-900 font-bold bg-white/90 border border-slate-200 shadow-xs px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#7cb20b]"></span>
            LOTE QA VERIFICADO
          </span>
        </div>

        {/* View switcher container */}
        <div className="w-full min-h-[380px] sm:min-h-[420px] flex items-center justify-center relative">
          
          {/* VIEW 1: Main Product Image (Custom Photo or Flavor Image or 3D Render) */}
          {activeView === 'main' && (
            <div className="w-full h-full flex flex-col items-center justify-center animate-fadeIn p-2">
              {product.flavorImageMap?.[selectedFlavor] || hasCustomImage ? (
                <div className="relative group flex items-center justify-center w-full h-[360px] sm:h-[400px]">
                  <img
                    src={product.flavorImageMap?.[selectedFlavor] || product.customImageUrl}
                    alt={`${product.name} - ${selectedFlavor}`}
                    referrerPolicy="no-referrer"
                    className="max-h-[340px] sm:max-h-[380px] w-auto max-w-full object-contain mx-auto drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded border border-slate-200 text-slate-600 shadow-2xs">
                    {product.flavorImageMap?.[selectedFlavor] ? `Sabor: ${selectedFlavor}` : 'Foto Original'}
                  </div>
                </div>
              ) : (
                <SupplementVisual product={product} size="hero" />
              )}
            </div>
          )}

          {/* VIEW 1.5: Gallery Selected Image */}
          {activeView === 'gallery' && galleryItems[selectedGalleryIdx] && (
            <div className="w-full h-full flex flex-col items-center justify-center animate-fadeIn p-2">
              <div className="relative group flex items-center justify-center w-full h-[360px] sm:h-[400px]">
                <img
                  src={galleryItems[selectedGalleryIdx]}
                  alt={`${product.name} - Vista ${selectedGalleryIdx + 1}`}
                  referrerPolicy="no-referrer"
                  className="max-h-[340px] sm:max-h-[380px] w-auto max-w-full object-contain mx-auto drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 text-[10px] font-mono bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded border border-slate-200 text-slate-600 shadow-2xs">
                  Galería #{selectedGalleryIdx + 1}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: Label & Supplement Macro Detail */}
          {activeView === 'label' && (
            <div className="w-full h-full max-w-sm bg-slate-900 text-white rounded-xl p-5 border border-slate-700 shadow-lg flex flex-col justify-between animate-fadeIn my-4">
              <div>
                <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-3">
                  <span className="font-mono text-[11px] text-[#7cb20b] uppercase font-bold tracking-wider">
                    Sello de Pureza Oficial
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">ISO 22000 / GMP</span>
                </div>

                <div className="text-lg font-normal font-gunplay uppercase tracking-wide text-white">
                  {product.name}
                </div>
                <div className="text-xs text-[#7cb20b] font-mono mt-0.5 font-bold">
                  {product.badge}
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Materia Prima:</span>
                    <span className="font-bold text-white">100% Grado Farmacéutico</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Control Metales Pesados:</span>
                    <span className="font-bold text-emerald-400">&lt; 0.001 ppm (No detectable)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Disolución Micronizada:</span>
                    <span className="font-bold text-white">200 Mesh Ultrafino</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Certificado Antidopaje:</span>
                    <span className="font-bold text-emerald-400">WADA Free Testing</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                <span>FABRICADO EN LA UNIÓN EUROPEA</span>
                <span className="text-[#7cb20b] font-bold">HPLC OK</span>
              </div>
            </div>
          )}

          {/* VIEW 3: Dissolution & Shaker Mix */}
          {activeView === 'mix' && (
            <div className="w-full h-full max-w-sm bg-gradient-to-b from-sky-50 via-white to-slate-50 rounded-xl p-6 border border-sky-200 text-center flex flex-col items-center justify-center animate-fadeIn my-4">
              <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-3">
                <Droplets className="w-8 h-8 text-sky-600 animate-pulse" />
              </div>
              <h4 className="text-base font-normal text-slate-900 font-gunplay uppercase tracking-wide">
                Disolución Instantánea en 10 Segundos
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Sin residuos en el fondo del shaker ni grumos arenosos. Gracias a la micronización 200 Mesh, el polvo se integra perfectamente en agua fría, zumo o batido.
              </p>

              <div className="mt-4 p-2.5 bg-white rounded-lg border border-sky-100 text-xs font-mono text-slate-800 w-full flex items-center justify-between">
                <span>Tolerancia estomacal:</span>
                <span className="text-emerald-700 font-bold">100% Cero pesadez</span>
              </div>
            </div>
          )}

          {/* VIEW 4: HPLC Certificate of Analysis */}
          {activeView === 'certificate' && (
            <div className="w-full h-full max-w-sm bg-white rounded-xl p-5 border-2 border-slate-900 text-slate-900 shadow-md flex flex-col justify-between animate-fadeIn my-4">
              <div>
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2 mb-2">
                  <div className="text-xs font-normal uppercase tracking-wider text-slate-900 font-gunplay">
                    Certificado de Análisis HPLC
                  </div>
                  <FileText className="w-4 h-4 text-[#7cb20b]" />
                </div>
                <div className="text-[11px] font-mono text-slate-500 mb-3">
                  Laboratorio de Control de Calidad Independiente
                </div>

                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between py-1 bg-slate-50 px-2 rounded">
                    <span>Pureza Analizada:</span>
                    <strong className="text-emerald-700 font-bold">&gt; 99.98%</strong>
                  </div>
                  <div className="flex justify-between py-1 px-2">
                    <span>DCD (Dicyandiamida):</span>
                    <strong className="text-slate-800">Negativo (&lt; 0.005%)</strong>
                  </div>
                  <div className="flex justify-between py-1 bg-slate-50 px-2 rounded">
                    <span>DHT (Dihidrotriazina):</span>
                    <strong className="text-slate-800">Negativo (&lt; 0.003%)</strong>
                  </div>
                  <div className="flex justify-between py-1 px-2">
                    <span>Microbiología:</span>
                    <strong className="text-emerald-700 font-bold">Conforme (UE 2073/2005)</strong>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                <span>ESTADO: CERTIFICADO APTO</span>
                <span className="font-bold text-slate-900">SELLO QA 2026</span>
              </div>
            </div>
          )}

        </div>

        {/* Gallery Interactive Thumbnails Selector */}
        <div className="w-full max-w-full mt-3 pt-3 border-t border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500 mb-2 uppercase tracking-wider text-left">
            Galería y Vistas del Producto:
          </div>
          <div className="w-full max-w-full flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {/* THUMBNAIL 1: Main Photo */}
            <button
              type="button"
              onClick={() => setActiveView('main')}
              className={`p-1 rounded-lg border text-center transition-all cursor-pointer shrink-0 min-w-[64px] flex flex-col items-center justify-center ${
                activeView === 'main'
                  ? 'border-[#7cb20b] bg-[#7cb20b]/10 shadow-xs ring-2 ring-[#7cb20b]/30'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              {hasCustomImage ? (
                <img
                  src={product.customImageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <div className="w-8 h-8 rounded bg-slate-900 text-[#7cb20b] text-[10px] font-bold flex items-center justify-center font-mono">
                  3D
                </div>
              )}
              <span className="text-[9px] font-bold text-slate-700 mt-1">Portada</span>
            </button>

            {/* THUMBNAILS: Secondary Gallery Images */}
            {galleryItems.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveView('gallery');
                  setSelectedGalleryIdx(idx);
                }}
                className={`p-1 rounded-lg border text-center transition-all cursor-pointer shrink-0 min-w-[64px] flex flex-col items-center justify-center ${
                  activeView === 'gallery' && selectedGalleryIdx === idx
                    ? 'border-[#7cb20b] bg-[#7cb20b]/10 shadow-xs ring-2 ring-[#7cb20b]/30'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Galería ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 object-contain rounded"
                />
                <span className="text-[9px] font-bold text-slate-700 mt-1">Foto #{idx + 1}</span>
              </button>
            ))}

            {/* THUMBNAIL: Label */}
            <button
              type="button"
              onClick={() => setActiveView('label')}
              className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer shrink-0 min-w-[64px] ${
                activeView === 'label'
                  ? 'border-[#7cb20b] bg-[#7cb20b]/10 shadow-xs ring-2 ring-[#7cb20b]/30'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] font-bold text-slate-800">Etiqueta</div>
              <div className="text-[9px] text-slate-500">Macro</div>
            </button>

            {/* THUMBNAIL: Mix */}
            <button
              type="button"
              onClick={() => setActiveView('mix')}
              className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer shrink-0 min-w-[64px] ${
                activeView === 'mix'
                  ? 'border-[#7cb20b] bg-[#7cb20b]/10 shadow-xs ring-2 ring-[#7cb20b]/30'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] font-bold text-slate-800">Disolución</div>
              <div className="text-[9px] text-slate-500">Textura</div>
            </button>

            {/* THUMBNAIL: HPLC */}
            <button
              type="button"
              onClick={() => setActiveView('certificate')}
              className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer shrink-0 min-w-[64px] ${
                activeView === 'certificate'
                  ? 'border-[#7cb20b] bg-[#7cb20b]/10 shadow-xs ring-2 ring-[#7cb20b]/30'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] font-bold text-slate-800">HPLC Lab</div>
              <div className="text-[9px] text-slate-500">Certificado</div>
            </button>
          </div>
        </div>

        {/* Flavor & Size Selector inside Column 1 */}
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
                    onClick={() => onSelectFlavor(flavor)}
                    className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap cursor-pointer ${
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
                    onClick={() => onSelectSize(size)}
                    className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap cursor-pointer ${
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

      {/* Trust micro-row directly below Canister in sticky column */}
      <div className="w-full max-w-full grid grid-cols-3 gap-1.5 sm:gap-2 mt-3 text-center">
        <div className="p-2 sm:p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-700">
          <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7cb20b] mx-auto mb-1" />
          <div className="text-[9px] sm:text-[10px] font-semibold text-slate-500 uppercase tracking-tight">Envío Express</div>
          <div className="text-[11px] sm:text-xs font-bold text-slate-900 mt-0.5">24/48 Horas</div>
        </div>
        <div className="p-2 sm:p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-700">
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7cb20b] mx-auto mb-1" />
          <div className="text-[9px] sm:text-[10px] font-semibold text-slate-500 uppercase tracking-tight">Garantía Total</div>
          <div className="text-[11px] sm:text-xs font-bold text-slate-900 mt-0.5">30 Días Prueba</div>
        </div>
        <div className="p-2 sm:p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-700">
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7cb20b] mx-auto mb-1" />
          <div className="text-[9px] sm:text-[10px] font-semibold text-slate-500 uppercase tracking-tight">Pago Seguro</div>
          <div className="text-[11px] sm:text-xs font-bold text-slate-900 mt-0.5">Bizum / Tarjeta</div>
        </div>
      </div>

    </div>
  );
};
