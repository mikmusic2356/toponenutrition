import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';
import { Product } from '../../types/product';

interface FooterProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onOpenAdmin: () => void;
  onOpenBlog?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ products, onSelectProduct, onOpenAdmin, onOpenBlog }) => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-12 pb-16 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
        
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-12 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#7cb20b]" />
            </div>
            <div>
              <div className="font-bold text-white">Envío Express 24/48h</div>
              <div className="text-slate-400">Envíos a toda Colombia</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#7cb20b]" />
            </div>
            <div>
              <div className="font-bold text-white">Pureza de Grado Clínico</div>
              <div className="text-slate-400">Certificación por lote HPLC</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5 text-[#7cb20b]" />
            </div>
            <div>
              <div className="font-bold text-white">30 Días de Garantía</div>
              <div className="text-slate-400">Reembolso 100% garantizado</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#7cb20b]" />
            </div>
            <div>
              <div className="font-bold text-white">Estándar GMP e ISO 22000</div>
              <div className="text-slate-400">Fabricación segura en la UE</div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="text-xl font-normal tracking-wide font-gunplay uppercase text-white">
              TOP<span className="text-[#7cb20b]">ONE</span> NUTRITION
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nutrición deportiva de alto impacto con formulaciones transparentes, sin dosis enanas y con materias primas patentadas originales.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
              >
                Acceso al Panel de Administración y Constructor Visual
              </button>
            </div>
          </div>

          {/* Product Landings */}
          <div>
            <div className="text-xs font-normal uppercase tracking-wider text-slate-300 mb-3 font-gunplay">
              Landings de Productos
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              {products.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      onSelectProduct(p);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-left"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quality & Science */}
          <div>
            <div className="text-xs font-normal uppercase tracking-wider text-slate-300 mb-3 font-gunplay">
              Ciencia y Calidad
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenBlog}
                  className="text-[#7cb20b] hover:underline font-bold text-left cursor-pointer"
                >
                  → Blog & Guías Técnicas
                </button>
              </li>
              <li>Materia Prima Creapure® Alemania</li>
              <li>Aislado Nativo Provon® CFM</li>
              <li>Complejo Enzimático DigeZyme®</li>
              <li>Certificación WADA Antidoping</li>
              <li>Transparencia en Etiquetado</li>
            </ul>
          </div>

          {/* Customer Service & Payment */}
          <div>
            <div className="text-xs font-normal uppercase tracking-wider text-slate-300 mb-3 font-gunplay">
              Atención al Cliente
            </div>
            <div className="space-y-2 text-xs text-slate-400">
              <div>Soporte WhatsApp: L-V 9:00 a 19:00h</div>
              <div>Email: soporte@toponenutrition.com</div>
              <div className="pt-3">
                <span className="text-[11px] font-semibold text-slate-300 block mb-1">Métodos de Pago:</span>
                <div className="flex gap-2 text-[11px] text-slate-300 font-mono">
                  <span>Tarjeta</span> · <span>Bizum</span> · <span>Contraentrega</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} TopOneNutrition. Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Aviso Legal</span>
            <span className="hover:text-slate-300 cursor-pointer">Política de Privacidad</span>
            <span className="hover:text-slate-300 cursor-pointer">Envíos y Devoluciones</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
