import React from 'react';
import { Product } from '../../types/product';
import { ShieldCheck, Award, Zap, Check } from 'lucide-react';

interface SupplementVisualProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const SupplementVisual: React.FC<SupplementVisualProps> = ({
  product,
  className = '',
  size = 'hero',
}) => {
  // Fallback to custom image if provided and valid
  if (product.customImageUrl && product.customImageUrl.trim() !== '') {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200 p-4 flex items-center justify-center ${className}`}>
        <img
          src={product.customImageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-transform duration-300 hover:scale-105"
        />
      </div>
    );
  }

  const isDark = product.canisterColor === 'dark' || product.canisterColor === 'graphite' || product.imageType === 'creatine';
  const isWhite = product.canisterColor === 'white' || product.imageType === 'whey';
  const isRed = product.imageType === 'preworkout';

  const brandGreen = product.accentColor || '#7cb20b';
  const brandRed = product.secondaryColor || '#dc2626';

  // Base canister background gradient
  const canisterBg = isWhite
    ? 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 60%, #e2e8f0 100%)'
    : isRed
    ? 'linear-gradient(145deg, #18181b 0%, #09090b 65%, #000000 100%)'
    : 'linear-gradient(145deg, #1e293b 0%, #0f172a 65%, #020617 100%)';

  const labelBg = isWhite
    ? 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)'
    : 'linear-gradient(180deg, #090d16 0%, #0f172a 50%, #090d16 100%)';

  const textColor = isWhite ? '#0f172a' : '#ffffff';
  const subtextColor = isWhite ? '#475569' : '#94a3b8';

  const dimensions = {
    sm: 'w-36 h-48',
    md: 'w-56 h-72',
    lg: 'w-72 h-96',
    hero: 'w-full max-w-[420px] aspect-[4/5]',
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${dimensions} ${className}`}>
      {/* Dynamic ambient studio glow behind canister */}
      <div
        className="absolute inset-x-8 bottom-4 h-32 rounded-full blur-2xl opacity-30 transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${brandGreen} 0%, transparent 70%)`,
        }}
      />

      {/* SVG 3D-effect Canister Architecture */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-2">
        <svg
          viewBox="0 0 380 480"
          className="w-full h-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Canister Metallic Lid Gradient */}
            <linearGradient id={`lidGrad_${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="25%" stopColor="#475569" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="75%" stopColor="#475569" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Canister Body Curved Gradient */}
            <linearGradient id={`bodyGrad_${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              {isWhite ? (
                <>
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="18%" stopColor="#f8fafc" />
                  <stop offset="45%" stopColor="#ffffff" />
                  <stop offset="80%" stopColor="#f1f5f9" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#020617" />
                  <stop offset="20%" stopColor="#1e293b" />
                  <stop offset="50%" stopColor="#334155" />
                  <stop offset="78%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#020617" />
                </>
              )}
            </linearGradient>

            {/* Specular highlight vertical streak */}
            <linearGradient id={`sheenGrad_${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.22)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>

            {/* Subtle shadow ground */}
            <radialGradient id={`groundShadow_${product.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
              <stop offset="60%" stopColor="rgba(0,0,0,0.15)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>

          {/* Cast Shadow on Podium */}
          <ellipse cx="190" cy="460" rx="145" ry="16" fill={`url(#groundShadow_${product.id})`} />

          {/* Canister Body Base Shape */}
          <rect
            x="60"
            y="95"
            width="260"
            height="355"
            rx="28"
            fill={`url(#bodyGrad_${product.id})`}
            stroke={isWhite ? '#cbd5e1' : '#334155'}
            strokeWidth="1.5"
          />

          {/* Vertical gloss sheen reflection */}
          <rect
            x="115"
            y="100"
            width="45"
            height="345"
            fill={`url(#sheenGrad_${product.id})`}
          />

          {/* Canister Neck */}
          <rect
            x="85"
            y="70"
            width="210"
            height="32"
            rx="6"
            fill={`url(#lidGrad_${product.id})`}
            stroke="#1e293b"
            strokeWidth="1"
          />

          {/* Heavy Tread Lid */}
          <rect
            x="70"
            y="35"
            width="240"
            height="42"
            rx="8"
            fill={`url(#lidGrad_${product.id})`}
            stroke="#0f172a"
            strokeWidth="1.5"
          />

          {/* Lid grip ribs */}
          {Array.from({ length: 15 }).map((_, idx) => (
            <line
              key={idx}
              x1={85 + idx * 15}
              y1="40"
              x2={85 + idx * 15}
              y2="72"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeOpacity="0.45"
            />
          ))}

          {/* Top of Lid highlight rim */}
          <ellipse cx="190" cy="38" rx="116" ry="6" fill="#94a3b8" fillOpacity="0.35" />

          {/* FRONT LABEL MATTE WRAP */}
          <rect
            x="70"
            y="125"
            width="240"
            height="285"
            rx="12"
            fill={labelBg}
            stroke={isWhite ? '#e2e8f0' : '#1e293b'}
            strokeWidth="1"
          />

          {/* Top Brand Stripe in Corporate Green */}
          <rect x="70" y="125" width="240" height="7" fill={brandGreen} rx="2" />

          {/* Label Content */}
          <g>
            {/* Brand Wordmark & Emblem */}
            <text
              x="190"
              y="160"
              textAnchor="middle"
              fill={textColor}
              fontSize="16"
              fontWeight="900"
              letterSpacing="2.5"
              fontFamily="'gunplay rg', 'Gunplay Rg', 'Gunplay', sans-serif"
            >
              TOP<tspan fill={brandGreen}>ONE</tspan> NUTRITION
            </text>

            <text
              x="190"
              y="175"
              textAnchor="middle"
              fill={subtextColor}
              fontSize="8.5"
              fontWeight="600"
              letterSpacing="1.8"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              SPORTS SCIENCE & PERFORMANCE
            </text>

            {/* Separator hairline */}
            <line x1="90" y1="186" x2="290" y2="186" stroke={brandGreen} strokeWidth="1" strokeOpacity="0.5" />

            {/* Product Category Sub-header */}
            <text
              x="190"
              y="204"
              textAnchor="middle"
              fill={brandGreen}
              fontSize="10"
              fontWeight="800"
              letterSpacing="1.5"
              fontFamily="'gunplay rg', 'Gunplay Rg', 'Gunplay', sans-serif"
            >
              {product.category.toUpperCase()}
            </text>

            {/* Main Product Title Text wrapped visually */}
            {product.imageType === 'creatine' && (
              <>
                <text x="190" y="235" textAnchor="middle" fill={textColor} fontSize="22" fontWeight="900" fontFamily="'gunplay rg', 'Gunplay Rg', 'Gunplay', sans-serif" letterSpacing="0.5">
                  CREAPURE®
                </text>
                <text x="190" y="258" textAnchor="middle" fill={subtextColor} fontSize="13" fontWeight="700" fontFamily="'gunplay rg', 'Gunplay Rg', 'Gunplay', sans-serif">
                  MONOHIDRATO 100%
                </text>
                <text x="190" y="278" textAnchor="middle" fill={brandGreen} fontSize="11" fontWeight="800">
                  ULTRAMICRONIZADO 200 MESH
                </text>
              </>
            )}

            {product.imageType === 'whey' && (
              <>
                <text x="190" y="235" textAnchor="middle" fill={textColor} fontSize="24" fontWeight="900" fontFamily="'gunplay rg', 'Gunplay Rg', 'Gunplay', sans-serif" letterSpacing="0.5">
                  ISOPRO 100%
                </text>
                <text x="190" y="258" textAnchor="middle" fill={brandGreen} fontSize="14" fontWeight="800" fontFamily="'gunplay rg', 'Gunplay Rg', 'Gunplay', sans-serif">
                  CFM WHEY ISOLATE
                </text>
                <text x="190" y="278" textAnchor="middle" fill={subtextColor} fontSize="10" fontWeight="700">
                  90% PROTEÍNA · CON DIGEZYME®
                </text>
              </>
            )}

            {product.imageType === 'preworkout' && (
              <>
                <text x="190" y="235" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="'gunplay rg', 'Gunplay Rg', 'Gunplay', sans-serif" letterSpacing="1">
                  NEURO<tspan fill={brandRed}>IGNITE</tspan>
                </text>
                <text x="190" y="258" textAnchor="middle" fill={brandGreen} fontSize="13" fontWeight="800" fontFamily="'gunplay rg', 'Gunplay Rg', 'Gunplay', sans-serif">
                  EXTREME PRE-WORKOUT
                </text>
                <text x="190" y="278" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="700">
                  8000MG CITRULINA · 400MG CAFEÍNA
                </text>
              </>
            )}

            {product.imageType === 'amino' && (
              <>
                <text x="190" y="235" textAnchor="middle" fill={textColor} fontSize="21" fontWeight="900" fontFamily="'gunplay rg', 'Gunplay Rg', 'Gunplay', sans-serif">
                  INTRA-FUEL
                </text>
                <text x="190" y="258" textAnchor="middle" fill={brandGreen} fontSize="12.5" fontWeight="800" fontFamily="'gunplay rg', 'Gunplay Rg', 'Gunplay', sans-serif">
                  EAA + ELECTROLITOS
                </text>
                <text x="190" y="278" textAnchor="middle" fill={subtextColor} fontSize="10" fontWeight="700">
                  100% FERMENTACIÓN VEGAN
                </text>
              </>
            )}

            {product.imageType === 'custom' && (
              <>
                <text x="190" y="245" textAnchor="middle" fill={textColor} fontSize="18" fontWeight="800" fontFamily="'gunplay rg', 'Gunplay Rg', 'Gunplay', sans-serif">
                  {product.name.slice(0, 18)}
                </text>
                <text x="190" y="270" textAnchor="middle" fill={brandGreen} fontSize="11" fontWeight="700">
                  FORMULACIÓN TOPONE
                </text>
              </>
            )}

            {/* Spec Box Pillars */}
            <rect x="85" y="295" width="210" height="52" rx="8" fill={isWhite ? '#f1f5f9' : '#020617'} stroke={isWhite ? '#cbd5e1' : '#1e293b'} strokeWidth="1" />
            
            <g transform="translate(95, 305)">
              <text x="25" y="14" textAnchor="middle" fill={subtextColor} fontSize="8" fontWeight="600">DOSIS</text>
              <text x="25" y="32" textAnchor="middle" fill={textColor} fontSize="11" fontWeight="800">
                {product.nutritionalFacts.servingSize.split(' ')[0]}
              </text>

              <line x1="58" y1="5" x2="58" y2="35" stroke={subtextColor} strokeOpacity="0.25" />

              <text x="95" y="14" textAnchor="middle" fill={subtextColor} fontSize="8" fontWeight="600">TOMAS</text>
              <text x="95" y="32" textAnchor="middle" fill={textColor} fontSize="11" fontWeight="800">
                {product.nutritionalFacts.servingsPerContainer}
              </text>

              <line x1="132" y1="5" x2="132" y2="35" stroke={subtextColor} strokeOpacity="0.25" />

              <text x="165" y="14" textAnchor="middle" fill={subtextColor} fontSize="8" fontWeight="600">PUREZA</text>
              <text x="165" y="32" textAnchor="middle" fill={brandGreen} fontSize="11" fontWeight="800">
                LAB 100%
              </text>
            </g>

            {/* Quality Seals Row */}
            <g transform="translate(90, 362)">
              {/* Seal 1 */}
              <circle cx="20" cy="18" r="14" fill={isWhite ? '#ffffff' : '#1e293b'} stroke={brandGreen} strokeWidth="1.5" />
              <text x="20" y="17" textAnchor="middle" fill={textColor} fontSize="6" fontWeight="900">GMP</text>
              <text x="20" y="24" textAnchor="middle" fill={brandGreen} fontSize="5" fontWeight="700">CERT</text>

              {/* Seal 2 */}
              <circle cx="68" cy="18" r="14" fill={isWhite ? '#ffffff' : '#1e293b'} stroke={brandGreen} strokeWidth="1.5" />
              <text x="68" y="17" textAnchor="middle" fill={textColor} fontSize="6" fontWeight="900">ISO</text>
              <text x="68" y="24" textAnchor="middle" fill={brandGreen} fontSize="5" fontWeight="700">22000</text>

              {/* Seal 3 */}
              <circle cx="116" cy="18" r="14" fill={isWhite ? '#ffffff' : '#1e293b'} stroke={brandGreen} strokeWidth="1.5" />
              <text x="116" y="17" textAnchor="middle" fill={textColor} fontSize="6" fontWeight="900">WADA</text>
              <text x="116" y="24" textAnchor="middle" fill={brandGreen} fontSize="5" fontWeight="700">TEST</text>

              {/* Seal 4 */}
              <circle cx="164" cy="18" r="14" fill={isWhite ? '#ffffff' : '#1e293b'} stroke={brandGreen} strokeWidth="1.5" />
              <text x="164" y="17" textAnchor="middle" fill={textColor} fontSize="6" fontWeight="900">HPLC</text>
              <text x="164" y="24" textAnchor="middle" fill={brandGreen} fontSize="5" fontWeight="700">99.9%</text>
            </g>

            {/* Net Weight Badge at label bottom */}
            <text
              x="190"
              y="402"
              textAnchor="middle"
              fill={subtextColor}
              fontSize="9"
              fontWeight="700"
              letterSpacing="1"
            >
              PESO NETO: {product.sizes[0] || '500G'} · HECHO EN LA UE
            </text>
          </g>
        </svg>

        {/* Floating Verification Tag badge over image corner */}
        <div className="absolute top-6 left-2 sm:left-4 z-10 bg-white/95 backdrop-blur-sm border border-slate-200 shadow-sm py-1 px-2.5 rounded-md flex items-center gap-1.5 text-xs font-semibold text-slate-800">
          <Award className="w-3.5 h-3.5 text-[#7cb20b]" />
          <span>Fórmula de Grado Clínico</span>
        </div>

        <div className="absolute bottom-6 right-2 sm:right-4 z-10 bg-slate-900 text-white py-1 px-2.5 rounded-md text-xs font-mono font-medium shadow-sm flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#7cb20b]" />
          <span>Lote #2026-QA</span>
        </div>
      </div>
    </div>
  );
};
