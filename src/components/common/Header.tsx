import React, { useState } from 'react';
import { ShoppingBag, Settings, Menu, X, ChevronDown, Check } from 'lucide-react';
import { Product } from '../../types/product';
import { formatCOP } from '../../lib/currency';

interface HeaderProps {
  currentProduct: Product;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenCart: () => void;
  cartCount: number;
  onOpenAdmin: () => void;
  isAdminView?: boolean;
  onOpenBlog?: () => void;
  isBlogView?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentProduct,
  allProducts,
  onSelectProduct,
  onOpenCart,
  cartCount,
  onOpenAdmin,
  isAdminView = false,
  onOpenBlog,
  isBlogView = false,
}) => {
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 md:gap-8 w-full max-w-full">
        
        {/* Zone 1: Single text element wordmark with official logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group shrink min-w-0"
            title="TOPONE NUTRITION"
          >
            <img
              src="/top-one-logo.png"
              alt="TOPONE NUTRITION"
              className="h-9 sm:h-11 w-auto object-contain shrink-0"
            />
          </a>

          {/* Product landing quick switcher dropdown */}
          <div className="relative">
            <button
              onClick={() => setProductMenuOpen(!productMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap cursor-pointer"
              title="Cambiar de Landing de Producto"
            >
              <span>Landing: <strong className="text-slate-900">{currentProduct.name.split(' ')[0]} {currentProduct.name.split(' ')[1] || ''}</strong></span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${productMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {productMenuOpen && (
              <>
                {/* Backdrop overlay for closing dropdown on click outside */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProductMenuOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-2xl border border-slate-200 py-2 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Landings de Productos Disponibles
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {allProducts.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          setProductMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          p.id === currentProduct.id
                            ? 'bg-slate-100 text-slate-900 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate pr-2">{p.name}</span>
                        {p.id === currentProduct.id && (
                          <Check className="w-3.5 h-3.5 text-[#7cb20b] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={onOpenBlog}
            className={`transition-colors whitespace-nowrap shrink-0 font-semibold cursor-pointer ${
              isBlogView ? 'text-[#659208] font-bold' : 'hover:text-slate-900'
            }`}
          >
            Blog & Guías
          </button>
          <a href="#beneficios" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Beneficios
          </a>
          <a href="#opiniones" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Opiniones
          </a>
          <a href="#comparativa" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Comparativa
          </a>
          <a href="#nutricion" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Nutrición
          </a>
          <a href="#faq" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Preguntas
          </a>
        </nav>

        {/* Zone 3: 1 primary action + cart & admin access */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
          {/* Admin Dashboard switch button */}
          <button
            onClick={onOpenAdmin}
            className={`p-2 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              isAdminView
                ? 'bg-[#7cb20b] text-slate-950 font-bold hover:bg-[#6fa00a]'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
            }`}
            title="Abrir Panel Administrativo y Constructor Visual"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAdminView ? 'Ver Tienda' : 'Panel Admin'}</span>
          </button>

          {/* Primary Action: Shopping Cart Drawer button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 sm:px-3.5 sm:py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0"
            aria-label="Ver carrito"
          >
            <ShoppingBag className="w-4 h-4 text-[#7cb20b]" />
            <span className="hidden sm:inline">Pedido</span>
            {cartCount > 0 && (
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#dc2626] text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center -mr-1">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 shrink-0"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Navegación del Producto
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm font-medium text-slate-700">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBlog?.();
              }}
              className="p-2 bg-[#7cb20b]/10 text-slate-900 font-bold rounded text-left flex items-center justify-between"
            >
              <span>Blog & Guías Técnicas</span>
              <span className="text-[10px] bg-[#7cb20b] text-slate-950 font-bold px-1.5 py-0.5 rounded">Nuevo</span>
            </button>
            <a
              href="#beneficios"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-slate-50 rounded hover:bg-slate-100"
            >
              Beneficios
            </a>
            <a
              href="#opiniones"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-slate-50 rounded hover:bg-slate-100"
            >
              Opiniones
            </a>
            <a
              href="#comparativa"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-slate-50 rounded hover:bg-slate-100"
            >
              Comparativa
            </a>
            <a
              href="#nutricion"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-slate-50 rounded hover:bg-slate-100"
            >
              Nutrición
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-slate-50 rounded hover:bg-slate-100"
            >
              Preguntas
            </a>
            <a
              href="#packs"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-[#7cb20b]/10 text-slate-900 font-bold rounded"
            >
              Comprar Ofertas
            </a>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Ver Otras Landings de Productos
            </div>
            <div className="space-y-1">
              {allProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between ${
                    p.id === currentProduct.id
                      ? 'bg-slate-900 text-white font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate">{p.name}</span>
                  <span className="text-[11px] tabular-nums font-mono">
                    {formatCOP(p.basePrice)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
