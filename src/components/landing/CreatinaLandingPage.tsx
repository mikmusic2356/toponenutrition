import React, { useState } from 'react';
import { Product, BundleTier, ProductReview } from '../../types/product';
import { formatCOP } from '../../lib/currency';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  MessageCircle,
  Star,
  Zap,
  Target,
  Sparkles,
  Dumbbell,
  Droplet,
  Layers,
  Award
} from 'lucide-react';

interface CreatinaLandingPageProps {
  product: Product;
  onAddToCart: (bundle: BundleTier, flavor: string, size: string) => void;
  onBuyNow: (bundle: BundleTier, flavor: string, size: string) => void;
  onAddReview?: (review: ProductReview) => void;
}

export const CreatinaLandingPage: React.FC<CreatinaLandingPageProps> = ({
  product,
  onAddToCart,
  onBuyNow,
}) => {
  // Sabores oficiales de CREATINA MONOHIDRATO DELTA con sus respectivas imágenes
  const flavors = [
    { 
      name: 'Sin Sabor', 
      icon: '⚡', 
      desc: '100% pura, versátil y perfecta para combinar con cualquier batido o agua',
      image: '/images/landing/creatina-unidad-sin-sabor.png',
      badgeImage: '/images/landing/sin sabor.jpg',
      badgeColor: '#4c6976'
    },
    { 
      name: 'Maracuyá', 
      icon: '🥭', 
      desc: 'Sabor tropical cítrico, ultra refrescante en agua bien fría',
      image: '/images/landing/creatina-unidad-maracuya.png',
      badgeImage: '/images/landing/sabor a maracuya.jpg',
      badgeColor: '#eab308'
    },
    { 
      name: 'Uva', 
      icon: '🍇', 
      desc: 'Delicioso e intenso toque dulce frutal con disolución instantánea',
      image: '/images/landing/creatina-unidad-uva.png',
      badgeImage: '/images/landing/sabor uva.jpg',
      badgeColor: '#9333ea'
    },
    { 
      name: 'Frutos Rojos', 
      icon: '🍓', 
      desc: 'Explosión de frutos silvestres para recargar tu energía con sabor premium',
      image: '/images/landing/creatina-unidad-frutos-rojos.png',
      badgeImage: '/images/landing/Translate_text_to_Spanish_8dd6df73.jpg',
      badgeColor: '#e11d48'
    },
  ];

  const [selectedFlavor, setSelectedFlavor] = useState<string>('Sin Sabor');

  // Mapeo dinámico de imágenes transparentes según el Sabor seleccionado para el envase individual
  const getFlavorImage = (flavorName: string) => {
    switch (flavorName) {
      case 'Maracuyá':
        return '/images/landing/creatina-unidad-maracuya.png';
      case 'Uva':
        return '/images/landing/creatina-unidad-uva.png';
      case 'Frutos Rojos':
        return '/images/landing/creatina-unidad-frutos-rojos.png';
      case 'Sin Sabor':
      default:
        return '/images/landing/creatina-unidad-sin-sabor.png';
    }
  };

  const currentFlavorImage = getFlavorImage(selectedFlavor);

  // Combos solicitados: La Unidad, El Dúo, x3 y x4 (con fondos transparentes PNG)
  const plans = [
    {
      id: 'creatina_unidad',
      units: 1,
      name: 'La Unidad (1 Tarro)',
      subname: '360g / 60 Servicios Reales',
      price: 85000,
      originalPrice: 105000,
      priceFormatted: '$85.000',
      shippingNotice: 'Envíos a toda Colombia',
      description: 'Ideal para iniciar tu ciclo de fuerza, potencia y rendimiento muscular diario.',
      badge: null,
      isBestOption: false,
      savingsBadge: 'Ahorras $20.000',
      isDynamicFlavorImage: true,
      staticImage: null,
    },
    {
      id: 'creatina_duo',
      units: 2,
      name: 'El Dúo Promo (2 Tarros)',
      subname: '720g / 120 Servicios Totales',
      price: 155000,
      originalPrice: 210000,
      priceFormatted: '$155.000',
      shippingNotice: 'Envío Express 24-48h',
      description: 'La opción predilecta de atletas: 4 meses de entrenamiento continuo sin interrupciones.',
      badge: 'MÁS VENDIDO',
      isBestOption: true,
      savingsBadge: 'Ahorras $55.000',
      isDynamicFlavorImage: false,
      staticImage: '/images/landing/creatina-combo-duo.png',
    },
    {
      id: 'creatina_x3',
      units: 3,
      name: 'Arsenal x3 (Bodegón)',
      subname: '1.080g / 180 Servicios Élite',
      price: 219000,
      originalPrice: 315000,
      priceFormatted: '$219.000',
      shippingNotice: 'Envío Gratis a Nivel Nacional',
      description: 'Máximo volumen y abastecimiento. Asegura tu saturación de fosfocreatina al mejor costo.',
      badge: 'MAYOR AHORRO',
      isBestOption: false,
      savingsBadge: 'Ahorras $96.000',
      isDynamicFlavorImage: false,
      staticImage: '/images/landing/creatina-combo-x3.png',
    },
    {
      id: 'creatina_x4',
      units: 4,
      name: 'Pack Batallón x4',
      subname: '1.440g / 240 Servicios Pro',
      price: 279000,
      originalPrice: 420000,
      priceFormatted: '$279.000',
      shippingNotice: 'Envío Prioritario 100% Gratis',
      description: 'La recarga definitiva para atletas de alto rendimiento o compartir en equipo.',
      badge: 'PACK PROFESIONAL',
      isBestOption: false,
      savingsBadge: 'Ahorras $141.000',
      isDynamicFlavorImage: false,
      staticImage: '/images/landing/creatina-combo-x4.png',
    }
  ];

  const [selectedBundleId, setSelectedBundleId] = useState<string>('creatina_duo');

  // Sección 2: Señales de Atletas para Creatina
  const athleteSignals = [
    {
      id: 1,
      image: '/images/landing/athlete-1.png',
      text: 'Llegas a la 8va o 10ma repetición y tus músculos fallan sin poder empujar 2 repeticiones extra',
    },
    {
      id: 2,
      image: '/images/landing/athlete-2.png',
      text: 'Sientes fatiga celular rápida y te toma demasiados días recuperarte entre entrenamientos pesados',
    },
    {
      id: 3,
      image: '/images/landing/athlete-3.png',
      text: 'Has probado creatinas genéricas que no se disuelven, parecen arena en el fondo y causan malestar',
    },
    {
      id: 4,
      image: '/images/landing/athlete-4.png',
      text: 'Buscas aumentar fuerza explosiva real, volumen muscular celular y resistencia anaeróbica comprobada',
    },
  ];

  // Testimonios verificados
  const customerReviews = [
    {
      id: 1,
      author: 'Carlos Andrés Montoya',
      time: 'Hace 3 días',
      rating: 5,
      comment: 'La creatina DELTA es otro nivel. Compré el sabor Maracuyá y la disolución es perfecta, cero grumos y sabor delicioso. Mis marcas en press de banca y sentadilla subieron 10kg en 3 semanas.',
      avatar: '/images/landing/tank-athlete-1.jpg',
    },
    {
      id: 2,
      author: 'Sargento David R.',
      time: 'Hace 5 días',
      rating: 5,
      comment: 'Pedí el combo DÚO (uno Sin Sabor para mezclar con mi proteína y otro Uva para antes de entrenar). Cero hinchazón estomacal y una recuperación muscular brutal.',
      avatar: '/images/landing/tank-athlete-2.jpg',
    },
    {
      id: 3,
      author: 'Valentina Restrepo',
      time: 'Hace 1 semana',
      rating: 5,
      comment: 'Llevo 2 meses tomando la de Frutos Rojos. Rinde los 60 servicios exactos y la calidad es indiscutible. La entrega me llegó al día siguiente a Medellín.',
      avatar: '/images/landing/tank-athlete-3.jpg',
    },
    {
      id: 4,
      author: 'Felipe Jaramillo',
      time: 'Hace 2 semanas',
      rating: 5,
      comment: 'El combo x4 con sabor nos salió baratísimo a mi hermano y a mí. Se nota la pureza del monohidrato de alta graduación. Recomendada 100%.',
      avatar: '/images/landing/tank-athlete-4.jpg',
    },
  ];

  const [reviewIndex, setReviewIndex] = useState(0);
  const nextReview = () => setReviewIndex((prev) => (prev + 1) % customerReviews.length);
  const prevReview = () => setReviewIndex((prev) => (prev - 1 + customerReviews.length) % customerReviews.length);

  // FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs = [
    {
      question: '¿Qué es la Creatina Monohidrato y cómo funciona en el músculo?',
      answer: 'La creatina monohidrato es el suplemento con mayor respaldo científico del mundo deportivo. Incrementa las reservas intracelulares de fosfocreatina, permitiendo sintetizar ATP (la molécula de energía celular inmediata) a una velocidad mucho mayor durante esfuerzos de alta intensidad.'
    },
    {
      question: '¿Es necesario realizar una fase de carga con la Creatina DELTA?',
      answer: 'No es obligatoria. Tomando 1 servicio (5g / 1 scoop) todos los días de forma constante, tus depósitos musculares alcanzarán la saturación óptima en 2 a 3 semanas sin experimentar molestias digestivas ni desperdiciar producto.'
    },
    {
      question: '¿La creatina causa retención de líquidos o aumento de grasa?',
      answer: 'La creatina retiene agua a nivel INTRACELULAR (dentro de las fibras musculares), lo que favorece un entorno anabólico, mayor volumen magro y síntesis proteica. No genera retención subcutánea ni aumenta grasa corporal.'
    },
    {
      question: '¿En qué momento del día es mejor tomarla?',
      answer: 'La creatina funciona por acumulación y saturación celular constante. Puedes consumirla antes o después del entrenamiento, o en cualquier momento del día en tus días de descanso, preferiblemente con agua o tu batido favorito.'
    },
    {
      question: '¿Cuántos servicios rinde cada tarro de 360g?',
      answer: 'Cada tarro de Creatina DELTA contiene 360g netos, entregando 60 servicios completos de alta potencia (2 meses completos de suplementación diaria por tarro).'
    }
  ];

  const scrollToPlans = () => {
    const el = document.getElementById('seccion-combos-creatina');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePurchaseAction = (plan: typeof plans[0], isBuyNow: boolean) => {
    const bundleTier: BundleTier = {
      id: plan.id,
      name: plan.name,
      units: plan.units,
      price: plan.price,
      originalPrice: plan.originalPrice,
      savingsText: plan.savingsBadge || undefined,
      popular: plan.isBestOption,
      badge: plan.badge || undefined,
    };

    if (isBuyNow) {
      onBuyNow(bundleTier, selectedFlavor, '360g (60 Servicios)');
    } else {
      onAddToCart(bundleTier, selectedFlavor, '360g (60 Servicios)');
    }
  };

  return (
    <div className="bg-[#f8fafc] text-slate-800 font-sans selection:bg-[#4c6976] selection:text-white min-h-screen">
      
      {/* ======================================================== */}
      {/* SECCIÓN 1: HERO PRINCIPAL CREATINA MONOHIDRATO          */}
      {/* ======================================================== */}
      <section className="relative pt-6 sm:pt-10 pb-16 md:pb-24 overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100">
        
        {/* Decoración ambiental sutil */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4c6976]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-slate-200/60 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Columna Izquierda: Información Principal */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge superior */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4c6976]/10 border border-[#4c6976]/25 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#4c6976] animate-pulse" />
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#4c6976]">
                  POTENCIA · FUERZA EXPLOSIVA · 60 SERVICIOS
                </span>
              </div>

              {/* Título Principal con la regla de colores: CREATINA en #4c6976, MONOHIDRATO en negro */}
              <h1 className="h1-title font-gunplay text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wider leading-[1.08]">
                <span className="text-[#4c6976]">CREATINA</span> <span className="text-black">MONOHIDRATO</span> <br />
                <span className="text-black">DELTA // 100% PURA</span>
              </h1>

              {/* Subtítulo persuasivo */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                Incrementa tu fuerza anaeróbica, potencia cada repetición al fallo y multiplica la hidratación celular de tus fibras musculares. <strong className="text-black font-bold">360g / 60 servicios de máxima pureza</strong> formulados para atletas de élite.
              </p>

              {/* Bullets tácticos de valor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#4c6976]/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#4c6976]/10 flex items-center justify-center shrink-0 text-[#4c6976]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-black uppercase">Resíntesis de ATP</div>
                    <div className="text-[12px] text-slate-600">Energía pura celular para series pesadas</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#4c6976]/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#4c6976]/10 flex items-center justify-center shrink-0 text-[#4c6976]">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-black uppercase">Voluminización Celular</div>
                    <div className="text-[12px] text-slate-600">Retención de agua intracelular anabólica</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#4c6976]/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#4c6976]/10 flex items-center justify-center shrink-0 text-[#4c6976]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-black uppercase">Micronizada Fina</div>
                    <div className="text-[12px] text-slate-600">Cero grumos, disolución instantánea 100%</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#4c6976]/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#4c6976]/10 flex items-center justify-center shrink-0 text-[#4c6976]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-black uppercase">0% Azúcar y Relleno</div>
                    <div className="text-[12px] text-slate-600">Pureza molecular garantizada sin gluten</div>
                  </div>
                </div>
              </div>

              {/* Selector interactivo de Sabores con Imágenes en el Hero */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Sabor activo: <span className="text-[#4c6976]">{selectedFlavor}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Haz clic en una imagen para cambiar de sabor
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {flavors.map((flv) => {
                    const isSelected = selectedFlavor === flv.name;
                    return (
                      <button
                        key={flv.name}
                        onClick={() => setSelectedFlavor(flv.name)}
                        className={`relative p-2 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col items-center gap-2 group ${
                          isSelected
                            ? 'border-[#4c6976] bg-white ring-2 ring-[#4c6976]/40 shadow-lg -translate-y-0.5'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                        }`}
                      >
                        {/* Contenedor de la Imagen del Sabor */}
                        <div className="w-full h-24 sm:h-28 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 relative">
                          <img
                            src={flv.badgeImage}
                            alt={`Sabor ${flv.name}`}
                            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                          />
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#4c6976] text-white flex items-center justify-center text-[10px] font-black shadow-md">
                              ✓
                            </div>
                          )}
                        </div>

                        {/* Nombre del Sabor */}
                        <div className="w-full text-center px-1">
                          <div className={`text-xs font-black uppercase truncate ${isSelected ? 'text-[#4c6976]' : 'text-slate-800'}`}>
                            {flv.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">
                            360g / 60 serv
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Botón CTA llamativo: Negro por defecto, cambia a #4c6976 al dar clic / hover */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={scrollToPlans}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-black hover:bg-[#4c6976] active:bg-[#4c6976] text-white font-gunplay text-base uppercase tracking-wider shadow-lg shadow-black/20 hover:shadow-[#4c6976]/30 transition-all duration-200 cursor-pointer group"
                >
                  <span>Ver combos y precios</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Truck className="w-4 h-4 text-[#4c6976]" />
                  <span>Envíos rápidos a toda Colombia</span>
                </div>
              </div>

            </div>

            {/* Columna Derecha: Tarro de Creatina Dinámico según Sabor */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                
                {/* Aura suave de iluminación */}
                <div className="absolute inset-0 bg-[#4c6976]/15 rounded-3xl blur-2xl transform scale-90 pointer-events-none" />

                <div className="relative rounded-3xl bg-white border border-slate-200 shadow-xl p-6 sm:p-8 flex flex-col items-center justify-center">
                  
                  {/* Badge flotante de sabor */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#4c6976]/10 border border-[#4c6976]/30 text-[#4c6976] text-[11px] font-black uppercase tracking-wider">
                    {selectedFlavor}
                  </div>

                  {/* Imagen dinámica del tarro */}
                  <div className="w-full h-80 sm:h-96 flex items-center justify-center overflow-hidden">
                    <img
                      src={currentFlavorImage}
                      alt={`Creatina Monohidrato DELTA - ${selectedFlavor}`}
                      key={selectedFlavor}
                      className="max-h-full max-w-full object-contain transform hover:scale-105 transition-all duration-500 drop-shadow-xl"
                    />
                  </div>

                  {/* Detalle inferior */}
                  <div className="mt-4 text-center">
                    <span className="text-xs font-black text-[#4c6976] tracking-wider uppercase">
                      DELTA NUTRITION · 360G / 60 SERVICIOS
                    </span>
                    <p className="text-[12px] text-slate-500 mt-0.5">
                      Monohidrato de Creatina de Máxima Pureza
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 2: BENEFICIOS DE LOS SABORES DISPONIBLES         */}
      {/* ======================================================== */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#4c6976]/10 border border-[#4c6976]/25 text-[#4c6976] text-xs font-black tracking-widest uppercase mb-3">
              VARIEDAD Y FRESCURA TÁCTICA
            </div>
            <h2 className="h2-title font-gunplay text-2xl sm:text-4xl uppercase tracking-wide leading-tight">
              ELIGE TU SABOR FAVORITO DE <span className="text-[#4c6976]">CREATINA</span> <span className="text-black">MONOHIDRATO</span>
            </h2>
            <div className="w-16 h-1 bg-[#4c6976] mx-auto mt-4 rounded-full" />
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-4">
              Cada fórmula está diseñada con saborizantes de alta gama sin aportar azúcares vacíos, garantizando una disolución transparente y deliciosa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flavors.map((flv) => {
              const isSelected = selectedFlavor === flv.name;
              return (
                <div
                  key={flv.name}
                  onClick={() => setSelectedFlavor(flv.name)}
                  className={`rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-50 border-[#4c6976] shadow-lg ring-2 ring-[#4c6976]/30'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-100 mb-4 flex items-center justify-center p-2">
                      <img
                        src={flv.image}
                        alt={`Creatina ${flv.name}`}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xl">{flv.icon}</span>
                      <h3 className="text-base font-black text-black uppercase">{flv.name}</h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {flv.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#4c6976]">60 Servicios</span>
                    <span className={`text-[11px] font-black uppercase ${isSelected ? 'text-[#4c6976]' : 'text-slate-400'}`}>
                      {isSelected ? '✓ Seleccionado' : 'Elegir'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 3: SEÑALES DE ATLETAS (¿TE OCURRE ESTO?)         */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#4c6976]/10 border border-[#4c6976]/25 text-[#4c6976] text-xs font-black tracking-widest uppercase mb-3">
            SEÑALES DE FATIGA Y ESTANCAMIENTO
          </div>
          
          <h2 className="h2-title font-gunplay text-2xl sm:text-4xl uppercase tracking-wide leading-tight mb-4">
            ¿TE IDENTIFICAS CON ALGUNO DE ESTOS <br />
            <span className="text-[#4c6976]">PUNTOS DE COMBATE EN EL GYM?</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-12">
            La suplementación con creatina pura es el eslabón que separa el estancamiento de un progreso continuo en fuerza, hipertrofia y densidad muscular.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {athleteSignals.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-[#4c6976]/50 transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="rounded-xl overflow-hidden aspect-video bg-slate-100 mb-4 border border-slate-100">
                    <img
                      src={item.image}
                      alt={item.text}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    &quot;{item.text}&quot;
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-[#4c6976]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Solucionado con Creatina DELTA</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 4: INFORMACIÓN NUTRICIONAL CERTIFICADA           */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#4c6976]/10 border border-[#4c6976]/25 text-[#4c6976] text-xs font-black tracking-widest uppercase mb-3">
              TABLA NUTRICIONAL OFICIAL
            </div>
            <h2 className="h2-title font-gunplay text-2xl sm:text-4xl uppercase tracking-wide leading-tight">
              PERFIL Y PUREZA DE LA <span className="text-[#4c6976]">CREATINA</span> <span className="text-black">MONOHIDRATO</span>
            </h2>
            <div className="w-16 h-1 bg-[#4c6976] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Foto de la Tabla Nutricional oficial reemplazada por Fitness Hombre Creatina DELTA */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xl max-w-md w-full">
                <img
                  src="/images/landing/creatina-hombre-fitness.jpeg"
                  alt="Fitness Hombre Creatina DELTA Monohidrato"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Desglose de Atributos */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h3 className="font-gunplay text-2xl sm:text-3xl uppercase tracking-wide text-black leading-tight">
                Calidad de grado farmacéutico sin compromisos
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Nuestra Creatina Monohidrato DELTA está elaborada con materia prima de altísima biodisponibilidad. Sometida a rigurosos controles de pureza para garantizar cero impurezas, metales pesados o subproductos indeseados.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#4c6976] font-mono">5.000mg</div>
                  <span className="text-xs text-slate-600 font-semibold">Creatina Monohidrato Pura</span>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-black font-mono">60</div>
                  <span className="text-xs text-slate-600 font-semibold">Servicios Reales por Tarro</span>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-black font-mono">0g</div>
                  <span className="text-xs text-slate-600 font-semibold">Grasas y Azúcares Añadidos</span>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#4c6976] font-mono">100%</div>
                  <span className="text-xs text-slate-600 font-semibold">Micronizada Libre de Gluten</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-black uppercase flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#4c6976]" />
                  Instrucciones recomendadas de consumo
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Disolver 1 scoop (5g) en 250 - 300 ml de agua o bebida favorita. Tomar todos los días de forma constante, preferiblemente antes o después de la sesión de entrenamiento.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={scrollToPlans}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-black hover:bg-[#4c6976] active:bg-[#4c6976] text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-[#4c6976]/30 transition-all duration-200 cursor-pointer"
                >
                  <span>Elegir mi presentación con descuento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 5: COMPARATIVA (CREATINA DELTA VS GENÉRICAS)     */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#4c6976]/10 border border-[#4c6976]/25 text-[#4c6976] text-xs font-black tracking-widest uppercase mb-3">
              TABLA COMPARATIVA
            </div>
            <h2 className="h2-title font-gunplay text-2xl sm:text-4xl uppercase tracking-wide leading-tight">
              ¿QUÉ HACE SUPERIOR A LA <span className="text-[#4c6976]">CREATINA</span> <span className="text-black">MONOHIDRATO</span> DELTA?
            </h2>
            <div className="w-16 h-1 bg-[#4c6976] mx-auto mt-4 rounded-full" />
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100">
                    <th className="p-4 sm:p-5 font-black text-slate-700 uppercase">Atributo</th>
                    <th className="p-4 sm:p-5 font-bold text-slate-400 uppercase">Creatina Genérica</th>
                    <th className="p-4 sm:p-5 font-black text-[#4c6976] bg-[#4c6976]/10 uppercase">
                      DELTA Creatina Monohidrato
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-black">Molienda y Solubilidad</td>
                    <td className="p-4 sm:p-5 text-slate-500">Textura arenosa que sedimenta en el fondo</td>
                    <td className="p-4 sm:p-5 font-bold text-black bg-[#4c6976]/5">
                      Micronizado ultrafino de disolución instantánea 100%
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-black">Tolerancia Digestiva</td>
                    <td className="p-4 sm:p-5 text-slate-500">Molestias gastrointestinales e hinchazón</td>
                    <td className="p-4 sm:p-5 font-bold text-black bg-[#4c6976]/5">
                      Digestión suave, absorción celular inmediata
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-black">Servicios Reales</td>
                    <td className="p-4 sm:p-5 text-slate-500">Tarros pequeños de 30 o 45 tomas</td>
                    <td className="p-4 sm:p-5 font-bold text-black bg-[#4c6976]/5">
                      60 servicios completos garantizados (360g)
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-black">Variedad de Sabores</td>
                    <td className="p-4 sm:p-5 text-slate-500">Únicamente sin sabor o con químicos amargos</td>
                    <td className="p-4 sm:p-5 font-bold text-black bg-[#4c6976]/5">
                      4 Opciones: Sin Sabor, Maracuyá, Uva y Frutos Rojos
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 6: RESEÑAS Y TESTIMONIOS VERIFICADOS             */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#4c6976]/10 border border-[#4c6976]/25 text-[#4c6976] text-xs font-black tracking-widest uppercase mb-3">
              OPINIONES DE ATLETAS
            </div>
            <h2 className="h2-title font-gunplay text-2xl sm:text-4xl uppercase tracking-wide leading-tight">
              EXPERIENCIAS REALES CON <span className="text-[#4c6976]">CREATINA</span> <span className="text-black">MONOHIDRATO</span>
            </h2>
            <div className="w-16 h-1 bg-[#4c6976] mx-auto mt-4 rounded-full" />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {customerReviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between hover:border-[#4c6976]/40 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-300"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-black">{rev.author}</h4>
                      <span className="text-[10px] text-slate-400">{rev.time}</span>
                    </div>
                  </div>

                  <div className="flex text-amber-400 gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    &quot;{rev.comment}&quot;
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] font-bold text-[#4c6976]">
                  <Check className="w-3 h-3" />
                  <span>Compra verificada TopOne</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View with Carousel Controls */}
          <div className="md:hidden">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={customerReviews[reviewIndex].avatar}
                  alt={customerReviews[reviewIndex].author}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-300"
                />
                <div>
                  <h4 className="text-sm font-bold text-black">
                    {customerReviews[reviewIndex].author}
                  </h4>
                  <span className="text-xs text-slate-400">
                    {customerReviews[reviewIndex].time}
                  </span>
                </div>
              </div>

              <div className="flex text-amber-400 gap-1 mb-3">
                {Array.from({ length: customerReviews[reviewIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed min-h-[70px]">
                &quot;{customerReviews[reviewIndex].comment}&quot;
              </p>
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={prevReview}
                aria-label="Anterior reseña"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-black flex items-center justify-center hover:bg-[#4c6976] hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {customerReviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      reviewIndex === i ? 'w-6 bg-[#4c6976]' : 'w-2 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextReview}
                aria-label="Siguiente reseña"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-black flex items-center justify-center hover:bg-[#4c6976] hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 7: COMBOS Y PLANES (LA UNIDAD, DUO, X3, X4)       */}
      {/* ======================================================== */}
      <section id="seccion-combos-creatina" className="py-20 md:py-28 bg-slate-100 border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#4c6976]/10 border border-[#4c6976]/25 text-[#4c6976] text-xs font-black tracking-widest uppercase mb-3">
              COMBOS DISPONIBLES EN BODEGA
            </div>
            
            <h2 className="h2-title font-gunplay text-3xl sm:text-5xl uppercase tracking-wide leading-tight">
              ELIGE TU COMBO DE <span className="text-[#4c6976]">CREATINA</span> <span className="text-black">MONOHIDRATO</span>
            </h2>
            
            <div className="w-20 h-1 bg-[#4c6976] mx-auto mt-4 rounded-full" />

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-4">
              Aprovecha los descuentos escalonados por cantidad. Envíos directos desde fábrica a cualquier ciudad o municipio de Colombia.
            </p>

            {/* Selector de Sabor para la Compra con imágenes */}
            <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 px-2 w-full sm:w-auto text-center">
                Sabor para tu pedido:
              </span>
              {flavors.map((flv) => {
                const isSelected = selectedFlavor === flv.name;
                return (
                  <button
                    key={flv.name}
                    onClick={() => setSelectedFlavor(flv.name)}
                    className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-[#4c6976] text-white shadow-md ring-2 ring-[#4c6976]/40'
                        : 'text-slate-700 hover:text-black hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <img
                      src={flv.badgeImage}
                      alt={flv.name}
                      className="w-7 h-7 rounded-lg object-cover border border-white/40 shrink-0"
                    />
                    <span>{flv.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid de los 4 Combos solicitados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {plans.map((plan) => {
              const cardImage = plan.isDynamicFlavorImage 
                ? currentFlavorImage 
                : (plan.staticImage || currentFlavorImage);

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl flex flex-col justify-between p-6 transition-all duration-300 ${
                    plan.isBestOption
                      ? 'bg-white border-2 border-[#4c6976] shadow-xl md:-translate-y-2'
                      : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Badge superior "MÁS VENDIDO" */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#4c6976] text-white font-black text-[11px] uppercase tracking-wider shadow-md whitespace-nowrap">
                      {plan.badge}
                    </div>
                  )}

                  {/* Badge de ahorro */}
                  {plan.savingsBadge && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-[#4c6976]/10 text-[#4c6976] text-[10px] font-black uppercase tracking-wider border border-[#4c6976]/20">
                      {plan.savingsBadge}
                    </div>
                  )}

                  {/* Imagen de la Presentación */}
                  <div className="w-full flex items-center justify-center my-4 h-48">
                    <img
                      src={cardImage}
                      alt={`${plan.name} - Creatina Monohidrato`}
                      key={`${plan.id}-${selectedFlavor}`}
                      className="max-h-full max-w-full object-contain drop-shadow-md transition-all duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Datos del Plan */}
                  <div className="text-center space-y-2 my-2">
                    <h3 className="font-gunplay text-xl uppercase tracking-wide text-black leading-tight">{plan.name}</h3>
                    <div className="text-xs font-bold text-[#4c6976]">{plan.subname}</div>
                    
                    <div className="pt-2">
                      <div className="text-2xl sm:text-3xl font-black text-black">
                        {plan.priceFormatted}
                      </div>
                      <div className="text-xs text-slate-400 line-through">
                        ${plan.originalPrice.toLocaleString('es-CO')}
                      </div>
                    </div>

                    <div className="text-[11px] font-bold text-slate-600 flex items-center justify-center gap-1.5 pt-1">
                      <Truck className="w-3.5 h-3.5 text-[#4c6976]" />
                      <span>{plan.shippingNotice}</span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed pt-2 min-h-[48px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Botones de Compra: Negro llamativo que cambia a #4c6976 al dar clic */}
                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handlePurchaseAction(plan, true)}
                      className="w-full py-3.5 px-4 rounded-xl bg-black hover:bg-[#4c6976] active:bg-[#4c6976] text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-[#4c6976]/30 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                    >
                      <span>COMPRAR AHORA</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <button
                      onClick={() => handlePurchaseAction(plan, false)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Añadir al carrito
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 8: PREGUNTAS FRECUENTES (FAQS)                   */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#4c6976]/10 border border-[#4c6976]/25 text-[#4c6976] text-xs font-black tracking-widest uppercase mb-3">
              PREGUNTAS FRECUENTES
            </div>
            <h2 className="h2-title font-gunplay text-2xl sm:text-4xl uppercase tracking-wide leading-tight">
              TODO LO QUE DEBES SABER SOBRE LA <br />
              <span className="text-[#4c6976]">CREATINA</span> <span className="text-black">MONOHIDRATO</span>
            </h2>
            <div className="w-16 h-1 bg-[#4c6976] mx-auto mt-4 rounded-full" />
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/70 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-black">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'bg-[#4c6976] text-white rotate-45' : 'bg-slate-200 text-black'
                    }`}>
                      <span className="text-base font-black leading-none">+</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 9: MEDIOS DE PAGO Y SEGURIDAD                    */}
      {/* ======================================================== */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#4c6976]/10 border border-[#4c6976]/25 text-[#4c6976] text-xs font-black tracking-widest uppercase mb-4">
            COMPRA Y PAGO SEGURO
          </div>

          <h2 className="h2-title font-gunplay text-2xl sm:text-4xl uppercase tracking-wide leading-tight mb-4">
            MEDIOS DE PAGO <span className="text-[#4c6976]">CERTIFICADOS EN COLOMBIA</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-8">
            Aceptamos pagos directos por Nequi, Daviplata, transferencias Bancolombia, QR y tarjetas de crédito con encriptación SSL de 256 bits.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <div className="h-12 px-4 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-xs sm:text-sm text-slate-800 shadow-sm">
              <span className="font-extrabold text-[#fdc400] mr-1.5 font-sans">QR</span> Bancolombia
            </div>

            <div className="h-12 px-4 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center text-[10px] sm:text-xs text-slate-600 shadow-sm">
              <span className="font-medium">Nequi / Daviplata</span>
              <span className="font-bold text-black">Transferencia Inmediata</span>
            </div>

            <div className="h-12 px-5 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
              <span className="text-[#1a1f71] font-black italic text-lg tracking-tighter">VISA</span>
            </div>

            <div className="h-12 px-5 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
              <div className="flex items-center -space-x-3">
                <div className="w-5 h-5 rounded-full bg-[#eb001b]" />
                <div className="w-5 h-5 rounded-full bg-[#f79e1b] opacity-90" />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#4c6976]" />
            <span>Garantía de Satisfacción 30 Días o Devolución de Dinero</span>
          </div>

        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/?text=Hola%2C%20quisiera%20pedir%20informaci%C3%B3n%20sobre%20la%20CREATINA%20MONOHIDRATO%20DELTA%20de%20Top%20One"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
      >
        <MessageCircle className="w-8 h-8 fill-white stroke-none" />
      </a>

    </div>
  );
};
