import React, { useState } from 'react';
import { Product, BundleTier, ProductReview } from '../../types/product';
import { formatCOP } from '../../lib/currency';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Flame, 
  Clock, 
  Utensils, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  MessageCircle,
  Play,
  Instagram,
  Star,
  ExternalLink,
  Zap,
  Target,
  Sparkles,
  Wheat,
  Dumbbell
} from 'lucide-react';

interface TankLandingPageProps {
  product: Product;
  onAddToCart: (bundle: BundleTier, flavor: string, size: string) => void;
  onBuyNow: (bundle: BundleTier, flavor: string, size: string) => void;
  onAddReview?: (review: ProductReview) => void;
}

export const TankLandingPage: React.FC<TankLandingPageProps> = ({
  product,
  onAddToCart,
  onBuyNow,
}) => {
  // Sabores oficiales de TANK
  const flavors = [
    { name: 'Vainilla Coco', icon: '🥥🍃', desc: 'Suave, refrescante y natural con coco orgánico' },
    { name: 'Choco Moca', icon: '🍫☕', desc: 'Intenso cacao con toque tostado gourmet de café' },
  ];
  const [selectedFlavor, setSelectedFlavor] = useState<string>('Vainilla Coco');

  // Presentaciones oficiales de TANK
  const sizes = [
    'Container x 3 lbs (1362g)',
    'Container x 7 lbs (3175g)',
    'Caja Batallón 11 lbs (2 x 5.5 lbs)'
  ];
  const [selectedSize, setSelectedSize] = useState<string>('Container x 7 lbs (3175g)');

  // Combos / Planes tácticos
  const plans = [
    {
      id: 'tank_3lbs',
      units: 1,
      name: 'Container x 3 LBS',
      subname: 'Arranque de Volumen Táctico',
      price: 155000,
      priceFormatted: '$155.000',
      shippingNotice: 'Envíos a toda Colombia',
      description: 'Ideal para probar la fórmula y arrancar tu fase de superávit calórico.',
      image: '/images/landing/tank-vainilla-coco-7lbs.png',
      badge: null,
      isBestOption: false,
      savingsBadge: null
    },
    {
      id: 'tank_7lbs',
      units: 1,
      name: 'Container x 7 LBS',
      subname: 'Masa Muscular de Élite',
      price: 245000,
      priceFormatted: '$245.000',
      shippingNotice: 'Envío Express 24-48h',
      description: 'La presentación favorita de los atletas: más tomas, constancia y progreso sostenido.',
      image: '/images/landing/tank-vainilla-coco-7lbs.png',
      badge: 'MÁS VENDIDO',
      isBestOption: true,
      savingsBadge: 'Ahorras 15%'
    },
    {
      id: 'tank_11lbs',
      units: 2,
      name: 'Caja Batallón 11 LBS',
      subname: 'Superávit Calórico Extremo (2 x 5.5 lbs)',
      price: 330000,
      priceFormatted: '$330.000',
      shippingNotice: 'Envío Gratis a Nivel Nacional',
      description: 'Doble ración para atletas en volumen pesado. Máximo valor por gramo de proteína y quinoa.',
      image: '/images/landing/tank-promo-packs.png',
      badge: 'MAYOR AHORRO',
      isBestOption: false,
      savingsBadge: 'Ahorras 25%'
    }
  ];

  const [selectedBundleId, setSelectedBundleId] = useState<string>('tank_7lbs');
  const selectedPlan = plans.find(p => p.id === selectedBundleId) || plans[1];

  // SECTION 2: Señales de Atletas (Superávit y Volumen)
  const athleteSignals = [
    {
      id: 1,
      image: '/images/landing/athlete-1.png',
      text: 'Entrenas pesado cada semana pero tu peso y volumen se quedan estancados',
    },
    {
      id: 2,
      image: '/images/landing/athlete-2.png',
      text: 'Te cuesta consumir las 3.000+ calorías diarias que requiere tu superávit con solo comida sólida',
    },
    {
      id: 3,
      image: '/images/landing/athlete-3.png',
      text: 'Los gainers tradicionales te inflaman, te producen gases y pesadez por exceso de azúcares baratos',
    },
    {
      id: 4,
      image: '/images/landing/athlete-4.png',
      text: 'Buscas ganar masa muscular densa y limpia, no grasa retenida ni panza hinchada',
    },
  ];

  const [carouselIndex, setCarouselIndex] = useState(0);
  const prevSlide = () => {
    setCarouselIndex((prev) => (prev === 0 ? athleteSignals.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCarouselIndex((prev) => (prev === athleteSignals.length - 1 ? 0 : prev + 1));
  };

  // SECTION 8: Reseñas / Experiencias
  const customerReviews = [
    {
      id: 1,
      author: 'Carlos Mario G.',
      time: 'Hace 3 semanas',
      avatar: '/images/landing/athlete-1.png',
      rating: 5,
      comment: 'Llevaba 6 meses estancado en 68kg. Con TANK Vainilla Coco subí a 73kg limpios en 2 meses. Cero pesadez estomacal gracias a los prebióticos y la quinoa.'
    },
    {
      id: 2,
      author: 'Esteban R.',
      time: 'Hace 1 mes',
      avatar: '/images/landing/athlete-4.png',
      rating: 5,
      comment: 'El sabor Choco Moca es de otro planeta. 53g de proteína y más de 1.100 calorías que entran facilísimo después del entrenamiento. Top One no defrauda.'
    },
    {
      id: 3,
      author: 'Andrés Felipe M.',
      time: 'Hace 2 meses',
      avatar: '/images/landing/athlete-2.png',
      rating: 5,
      comment: 'Pedí la caja batallón de 11 libras. La mejor inversión para mi etapa de volumen invernal. Es un gainer con calidad de superfoods, no solo azúcar como otros.'
    }
  ];

  const [reviewIndex, setReviewIndex] = useState(0);
  const prevReview = () => {
    setReviewIndex((prev) => (prev === 0 ? customerReviews.length - 1 : prev - 1));
  };
  const nextReview = () => {
    setReviewIndex((prev) => (prev === customerReviews.length - 1 ? 0 : prev + 1));
  };

  // SECTION 9: Video items
  const [videoCards] = useState([
    {
      id: 1,
      handle: 'toponenutrition',
      location: 'Base de Operaciones',
      badge: 'Ver perfil',
      profileUrl: 'https://www.toponenutrition.com',
      title: 'TANK STRONGER MASS GAINER: Quinoa + Whey en Superávit',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
      poster: '/images/landing/tank-hombre-manos.png',
      caption: 'Cómo tomar TANK para ganar masa muscular limpia',
      followers: 'Top One Élite'
    },
    {
      id: 2,
      handle: 'toponenutrition',
      location: 'Laboratorio Táctico',
      badge: 'Ver perfil',
      profileUrl: 'https://www.toponenutrition.com',
      title: 'Línea Versátil TOP ONE: Fuerza & Rendimiento',
      videoUrl: '',
      poster: '/images/landing/tank-proteinas-versatiles.png',
      caption: 'Fórmulas hipercalóricas y aisladas de alto nivel',
      followers: ''
    },
    {
      id: 3,
      handle: 'toponenutrition',
      location: 'Colombia',
      badge: 'Ver perfil',
      profileUrl: 'https://www.toponenutrition.com',
      title: 'Packs y Combos Tácticos de Volumen',
      videoUrl: '',
      poster: '/images/landing/tank-promo-packs.png',
      caption: 'Presentaciones 3lbs, 7lbs y Caja Batallón 11lbs',
      followers: 'Comunidad Kombat'
    }
  ]);

  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  // SECTION: FAQ State
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0, 1]);
  const toggleFaq = (index: number) => {
    setOpenFaqIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqList = [
    {
      question: '¿Por qué TANK STRONGER MASS GAINER es tan poderoso frente a otros gainers?',
      answer:
        'Porque combina carbohidratos complejos y proteínas de excelente calidad en proporción inteligente (50/40). Integramos proteína de suero (Whey Protein) con Quinoa Orgánica ("Superfood") de altísimo valor biológico, prebióticos para una digestión impecable, y 4g de matriz de Creatina + Glutamina para acelerar la recuperación celular.'
    },
    {
      question: '¿Cuántas calorías y proteína aporta por servicio?',
      answer:
        'Aporta 1.190 calorías densas y 53g de proteína de alta calidad preparado en agua. Si lo preparas en leche entera o vegetal, alcanzas hasta 1.500 calorías y 69g de proteína por toma, ideal para asegurar tu superávit calórico diario.'
    },
    {
      question: '¿Me va a generar pesadez o inflamación estomacal?',
      answer:
        'No. A diferencia de gainers genéricos cargados de maltodextrinas baratas y azúcares simples, TANK incluye carbohidratos complejos de Quinoa Orgánica y prebióticos digestivos que garantizan una asimilación suave, protegiendo tu flora intestinal.'
    },
    {
      question: '¿Cómo y cuándo debo tomar TANK?',
      answer:
        'Puedes dividir la porción en 2 tomas al día (por ejemplo: media porción a media mañana y media porción inmediatamente después de entrenar), o tomar una porción completa post-entreno batida con agua fresca o leche.'
    },
    {
      question: '¿Qué sabores y presentaciones están disponibles?',
      answer:
        'Viene en 2 deliciosos sabores: Vainilla Coco 🥥🍃 y Choco Moca 🍫☕. Puedes elegir entre Container de 3 LBS, Container de 7 LBS o la rendidora Caja Batallón de 11 LBS (con 2 raciones tácticas de 5.5 lbs).'
    },
    {
      question: '¿Hacen envíos a toda Colombia?',
      answer:
        'Sí. Despachamos a todas las ciudades y municipios de Colombia con entregas express 24-48 horas y múltiples medios de pago seguros (Bancolombia QR, Nequi, Tarjetas y Contraentrega).'
    }
  ];

  const scrollToPlans = () => {
    const el = document.getElementById('seccion-planes-combos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlanAndBuy = (plan: typeof plans[0]) => {
    const bundle: BundleTier = {
      id: plan.id,
      name: `${plan.name} (${selectedFlavor})`,
      units: plan.units,
      price: plan.price,
      originalPrice: Math.round(plan.price * 1.2),
      savingsText: plan.savingsBadge || undefined
    };
    onBuyNow(bundle, selectedFlavor, plan.name);
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white font-sans selection:bg-[#9af91e] selection:text-black">
      
      {/* ======================================================== */}
      {/* TOP BANNER TÁCTICO                                       */}
      {/* ======================================================== */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-b border-neutral-800 py-2 px-4 text-center text-xs">
        <span className="font-extrabold text-[#9af91e] uppercase tracking-wider">TOP ONE™ NUTRITION</span>
        <span className="mx-2 text-neutral-600">·</span>
        <span className="text-neutral-300 font-semibold">Tácticos y Orgánicos por Excelencia 🍃⚡️</span>
        <span className="mx-2 text-neutral-600 hidden sm:inline">·</span>
        <span className="text-rose-500 font-bold hidden sm:inline">Envíos Rápidos a toda Colombia</span>
      </div>

      {/* ======================================================== */}
      {/* SECCIÓN 1: HERO PRINCIPAL (ADAPTADO A TANK)              */}
      {/* ======================================================== */}
      <section className="relative pt-12 pb-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Columna Izquierda: Imagen Oficial de TANK STRONGER */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group max-w-[520px] w-full">
              {/* Resplandor verde lima / rojo detrás */}
              <div className="absolute -inset-4 bg-[#9af91e]/20 rounded-3xl blur-3xl pointer-events-none transition-all group-hover:bg-[#9af91e]/30" />
              
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950/80 shadow-2xl p-4 sm:p-6">
                <img
                  src="/images/landing/tank-vainilla-coco-7lbs.png"
                  alt="TANK Stronger Mass Gainer Top One"
                  className="w-full h-auto object-contain transform transition-transform duration-700 hover:scale-105 drop-shadow-[0_15px_30px_rgba(154,249,30,0.2)]"
                />

                {/* Badge flotante de Superávit */}
                <div className="absolute bottom-4 left-4 right-4 bg-neutral-950/90 border border-neutral-800 rounded-xl p-3 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9af91e] animate-ping" />
                    <span className="text-xs font-black text-white uppercase tracking-wider">1.190 kcal · 53g Proteína</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#9af91e] bg-[#9af91e]/10 px-2 py-0.5 rounded border border-[#9af91e]/30">
                    + Quinoa Orgánica
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Título, Subtítulo y Botones */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6 text-left">
            {/* Tag militar / táctico */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#9af91e]/40 bg-[#9af91e]/10 text-[#9af91e] text-xs font-black tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SUPERÁVIT CALÓRICO & VOLUMEN REAL</span>
            </div>

            {/* Titular Principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              TANK STRONGER <br />
              <span className="text-[#9af91e]">MASS GAINER</span> <br />
              <span className="text-lg sm:text-2xl font-bold text-neutral-400 block mt-2 font-mono">
                Whey Protein + Superfoods (Quinoa) 🍃⚡️
              </span>
            </h1>

            {/* Texto Descriptivo */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
              Fórmula hipercalórica de máxima asimilación: <strong className="text-white">53g de proteína de élite</strong>, <strong className="text-white">1.190 calorías densas</strong> y carbohidratos complejos de <strong className="text-[#9af91e]">Quinoa Orgánica</strong>. Diseñada para romper cualquier estancamiento de peso sin inflamación estomacal.
            </p>

            {/* Selector interactivo de Sabores en el Hero */}
            <div className="w-full max-w-md bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4">
              <span className="text-xs font-black uppercase tracking-wider text-neutral-400 block mb-2.5">
                Combatiente, ¿en qué bando estás? 👇
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {flavors.map((flv) => {
                  const isSelected = selectedFlavor === flv.name;
                  return (
                    <button
                      key={flv.name}
                      onClick={() => setSelectedFlavor(flv.name)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? 'border-[#9af91e] bg-[#9af91e]/15 text-[#9af91e] ring-1 ring-[#9af91e]'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <span className="text-lg">{flv.icon}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate">{flv.name}</div>
                        <div className="text-[10px] text-neutral-400 truncate">Sabor oficial</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Botón CTA Verde Lima Táctico */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToPlans}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#9af91e] to-[#80d80f] hover:from-[#88e010] hover:to-[#9af91e] text-neutral-950 font-black text-base shadow-lg shadow-[#9af91e]/25 hover:shadow-[#9af91e]/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <span>Ver presentaciones y precios</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#9af91e]" />
                <span>Prebióticos digestivos incluidos</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* BANNER TRANSVERSAL DE APOYO (tak banner 1)               */}
      {/* ======================================================== */}
      <section className="relative w-full overflow-hidden border-y border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <div className="rounded-3xl overflow-hidden border border-neutral-800 relative shadow-2xl">
            <img
              src="/images/landing/tank-banner-1.png"
              alt="TOP ONE TANK Mass Gainer Banner"
              className="w-full h-auto object-cover max-h-[380px]"
            />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 2: SEÑALES DE ATLETAS EN ETAPA DE VOLUMEN        */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#070707] via-neutral-950 to-[#070707] border-t border-neutral-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-black tracking-widest uppercase mb-3">
              ¿TE IDENTIFICAS CON ESTO?
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Obstáculos que enfrentan los atletas buscando <span className="text-[#9af91e]">ganar masa muscular</span>
            </h2>
          </div>

          <div className="hidden md:grid grid-cols-4 gap-6">
            {athleteSignals.map((signal) => (
              <div
                key={signal.id}
                className="group flex flex-col bg-neutral-900/50 rounded-2xl overflow-hidden border border-neutral-800 hover:border-[#9af91e]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#9af91e]/10"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={signal.image}
                    alt="Atleta entrenando"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex items-center justify-center">
                  <p className="text-xs sm:text-sm text-neutral-300 text-center leading-snug font-medium">
                    {signal.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="relative md:hidden max-w-sm mx-auto">
            <div className="bg-neutral-900/60 rounded-2xl overflow-hidden border border-neutral-800 shadow-xl">
              <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-950">
                <img
                  src={athleteSignals[carouselIndex].image}
                  alt="Atleta en entrenamiento"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-5">
                <p className="text-sm text-neutral-200 text-center leading-snug font-medium min-h-[50px] flex items-center justify-center">
                  {athleteSignals[carouselIndex].text}
                </p>
              </div>
            </div>

            <button
              onClick={prevSlide}
              aria-label="Anterior señal"
              className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900/90 text-white border border-neutral-700 flex items-center justify-center hover:bg-[#9af91e] hover:text-black transition-colors shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Siguiente señal"
              className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900/90 text-white border border-neutral-700 flex items-center justify-center hover:bg-[#9af91e] hover:text-black transition-colors shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex justify-center gap-2 mt-4">
              {athleteSignals.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    carouselIndex === i ? 'bg-[#9af91e] w-6' : 'bg-neutral-700'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 3: TRANSPARENCIA Y COMPOSICIÓN (QUINOA & WHEY)   */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Callout Superior con icono de energía */}
          <div className="mb-16 max-w-3xl mx-auto rounded-2xl border border-[#9af91e]/40 bg-neutral-950/80 p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9af91e] to-[#72c20a] text-neutral-950 flex items-center justify-center shrink-0 shadow-lg shadow-[#9af91e]/20">
                <Wheat className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm text-neutral-300 font-medium">
                  Ganar masa muscular de calidad no es comer chatarra ni consumir calorías vacías.
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#9af91e] mt-1">
                  Tu cuerpo necesita un balance exacto 50/40 entre carbohidratos de alto valor biológico y proteínas de rápida y lenta absorción.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#9af91e]">
              FÓRMULA TÁCTICA & SUPERFOODS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Texto Explicativo */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                La combinación más inteligente <br />
                <span className="text-[#9af91e]">del mundo del fitness:</span> <br />
                Quinoa Orgánica & Whey Protein
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Única con ingredientes que el atleta de alto rendimiento realmente necesita. Un desarrollo pensado en la combinación de componentes científicamente comprobados como fuente de proteína de alto valor biológico e ingredientes orgánicos de altísimo aporte nutricional (&quot;SUPERFOODS&quot;), como la <strong>QUINOA</strong>.
              </p>

              {/* Caja verde lima / negra */}
              <div className="rounded-xl border border-[#9af91e]/60 bg-gradient-to-br from-neutral-950 via-neutral-900/70 to-neutral-950 p-6 text-left shadow-lg">
                <h4 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9af91e]" />
                  ¿Por qué este Gainer es tan poderoso y tu mejor opción?
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Gracias a que en su fórmula se combinan carbohidratos y proteínas de excelente calidad (<strong className="text-[#9af91e]">50/40</strong>). Se utilizan para brindar un <strong className="text-white">APORTE EXTRA DE CALORÍAS</strong> de fácil digestión gracias a la inclusión de <strong className="text-rose-400">PREBIÓTICOS</strong>, cubriendo todo el espectro de absorción de nutrientes.
                </p>
              </div>
            </div>

            {/* Imagen Atleta con Tarro TANK (D:\hombre mostrando con sus manos la proteina.PNG) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-sm w-full rounded-2xl border border-neutral-800 bg-neutral-950 p-3 shadow-2xl overflow-hidden group">
                <img
                  src="/images/landing/tank-hombre-manos.png"
                  alt="Hombre mostrando TANK Stronger Mass Gainer"
                  className="w-full h-auto object-cover rounded-xl transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-neutral-950/90 border border-[#9af91e]/50 p-3 rounded-xl text-center">
                  <span className="text-xs font-bold text-[#9af91e]">TOP ONE™ NUTRITION</span>
                  <div className="text-[11px] text-neutral-300">Tácticos y Orgánicos por Excelencia</div>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 text-center">
            <p className="text-[11px] text-neutral-500">
              * Registro y formulación garantizada por TOP ONE™ Nutrition. Consulta las instrucciones en la tabla nutricional.
            </p>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 4: BASE DE ENTRENAMIENTO Y LOS 4 PILARES        */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#070707] via-neutral-950 to-[#070707] border-t border-neutral-900/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#9af91e]/30 bg-[#9af91e]/10 text-[#9af91e] text-xs font-black tracking-widest uppercase mb-6">
            TU BASE DE ENTRENAMIENTO
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
            Tu rutina pesada, tu descanso, tu constancia...
          </h2>

          <p className="text-base sm:text-xl font-bold text-[#9af91e] mb-12">
            ¿Y si además tuvieras el combustible calórico correcto?
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 max-w-3xl mx-auto">
            {/* Pilar 1 */}
            <div className="relative rounded-2xl bg-neutral-900/70 border border-neutral-800 p-5 flex flex-col items-center justify-center min-h-[140px] hover:border-[#9af91e]/50 transition-colors">
              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#9af91e] text-black flex items-center justify-center text-xs font-black">
                ✓
              </span>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center mb-3 text-[#9af91e]">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-neutral-200">
                Entrenamiento Pesado
              </span>
            </div>

            {/* Pilar 2 */}
            <div className="relative rounded-2xl bg-neutral-900/70 border border-neutral-800 p-5 flex flex-col items-center justify-center min-h-[140px] hover:border-[#9af91e]/50 transition-colors">
              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#9af91e] text-black flex items-center justify-center text-xs font-black">
                ✓
              </span>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center mb-3 text-[#9af91e]">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-neutral-200">
                Tu descanso nocturno
              </span>
            </div>

            {/* Pilar 3 */}
            <div className="relative rounded-2xl bg-neutral-900/70 border border-neutral-800 p-5 flex flex-col items-center justify-center min-h-[140px] hover:border-[#9af91e]/50 transition-colors">
              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#9af91e] text-black flex items-center justify-center text-xs font-black">
                ✓
              </span>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center mb-3 text-[#9af91e]">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-neutral-200">
                Superávit Calórico Real
              </span>
            </div>

            {/* Pilar 4 */}
            <div className="relative rounded-2xl bg-neutral-900/70 border border-neutral-800 p-5 flex flex-col items-center justify-center min-h-[140px] hover:border-[#9af91e]/50 transition-colors">
              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#9af91e] text-black flex items-center justify-center text-xs font-black">
                ✓
              </span>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center mb-3 text-rose-500">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-neutral-200">
                Tu constancia diaria
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Estos son los pilares reales de tu progreso. Lo que ponemos sobre la mesa con TANK es un combustible hipercalórico premium, limpio, fácil de tomar y sin sabor a jarabe ni pesadez estomacal.
          </p>

          {/* Tarjeta de Respaldo Táctico */}
          <div className="max-w-2xl mx-auto rounded-2xl border border-[#9af91e]/60 bg-gradient-to-b from-neutral-900/90 to-neutral-950 p-6 sm:p-8 text-center shadow-xl relative">
            <div className="inline-block px-3 py-1 rounded-full bg-[#9af91e]/20 text-[#9af91e] text-[11px] font-black uppercase tracking-wider mb-4 border border-[#9af91e]/30">
              TU RESPALDO DE SUPERÁVIT, NO TU REEMPLAZO
            </div>
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-medium">
              Por eso creamos <strong className="text-[#9af91e] font-bold">TANK STRONGER MASS GAINER</strong>: no sustituye tu comida casera, es el aliado táctico que garantiza las calorías y aminoácidos que tu cuerpo necesita para construir músculo día tras día.
            </p>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 5: ESPECIFICACIONES TÁCTICAS DEL PRODUCTO        */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
            
            {/* Columna Izquierda: Especificaciones y Checks Oficiales */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-block px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 text-xs font-black uppercase tracking-widest">
                FÓRMULA HIPERCALÓRICA PRO
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                TANK STRONGER <span className="text-[#9af91e]">MASS GAINER</span>
              </h2>

              <p className="text-base text-neutral-400">
                Whey Protein + Quinoa Superfood + Prebióticos + Creatina & Glutamina.
              </p>

              {/* Banner Verde Lima Táctico */}
              <div className="rounded-xl bg-gradient-to-r from-[#9af91e] to-[#79ce0a] p-4 text-neutral-950 font-black text-xs sm:text-sm tracking-wide uppercase shadow-lg shadow-[#9af91e]/20">
                1.190 CALORÍAS · 53G PROTEÍNA · SIN INFLAMACIÓN DIGESTIVA
              </div>

              {/* Checks oficiales de la información provista */}
              <div className="space-y-3">
                <div className="rounded-xl bg-neutral-900/80 border border-neutral-800 p-4 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#9af91e] text-black flex items-center justify-center shrink-0 text-xs font-black">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-200">
                    <strong className="text-white">ULTRA HIGH CALORIE:</strong> 1.190 calorías x servicio (hasta 1.500 kcal preparadas en leche).
                  </span>
                </div>

                <div className="rounded-xl bg-neutral-900/80 border border-neutral-800 p-4 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#9af91e] text-black flex items-center justify-center shrink-0 text-xs font-black">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-200">
                    <strong className="text-white">HIGH QUALITY PROTEIN:</strong> 53g x servicio (69g en leche) de 6 fuentes de alto valor biológico.
                  </span>
                </div>

                <div className="rounded-xl bg-neutral-900/80 border border-neutral-800 p-4 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#9af91e] text-black flex items-center justify-center shrink-0 text-xs font-black">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-200">
                    <strong className="text-white">CARBOS COMPLEJOS:</strong> 179g x servicio provenientes de la Quinoa Orgánica sin picos nocivos.
                  </span>
                </div>

                <div className="rounded-xl bg-neutral-900/80 border border-neutral-800 p-4 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 text-xs font-black">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-200">
                    <strong className="text-white">ENRIQUECIDA TÁCTICAMENTE:</strong> Con 4g de Creatina y Glutamina para fuerza y recuperación.
                  </span>
                </div>
              </div>

            </div>

            {/* Columna Derecha: Tarro TANK Vainilla Coco */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-md w-full">
                <div className="absolute -inset-6 bg-[#9af91e]/20 rounded-3xl blur-2xl pointer-events-none group-hover:bg-[#9af91e]/30 transition-all" />
                <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950/80 shadow-2xl p-6 flex flex-col items-center justify-center">
                  <img
                    src="/images/landing/tank-vainilla-coco-7lbs.png"
                    alt="TANK Vainilla Coco 7 lbs"
                    className="w-full h-auto max-h-[360px] object-contain transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="mt-4 text-center">
                    <span className="text-xs font-extrabold text-[#9af91e] tracking-wider uppercase">
                      Presentación Container x 7 LBS
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <button
              onClick={scrollToPlans}
              className="px-12 py-5 rounded-full bg-gradient-to-r from-[#9af91e] via-[#8ae010] to-[#9af91e] hover:from-[#80d80f] hover:to-[#9af91e] text-neutral-950 font-black text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(154,249,30,0.35)] hover:shadow-[0_0_50px_rgba(154,249,30,0.55)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3"
            >
              <span>COMPRAR AHORA</span>
              <span className="w-6 h-6 rounded-full bg-neutral-950 text-[#9af91e] flex items-center justify-center text-sm font-black">
                ↓
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 6: COMPOSICIÓN Y ROTULADO TRANSPARENTE           */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#070707] via-neutral-950 to-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#9af91e]/30 bg-[#9af91e]/10 text-[#9af91e] text-xs font-black tracking-widest uppercase">
              COMPOSICIÓN DEL PRODUCTO
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Foto de Proteínas Versátiles TOP ONE */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative group max-w-md w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl p-2">
                <img
                  src="/images/landing/tank-proteinas-versatiles.png"
                  alt="Proteínas de alta gama Top One"
                  className="w-full h-auto object-cover rounded-xl transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Texto y Caja de Transparencia */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Revisa exactamente <br />
                <span className="text-[#9af91e]">qué contiene esta fórmula</span> <br />
                sin fórmulas escondidas ni rellenos
              </h2>

              <div className="w-16 h-0.5 bg-[#9af91e]" />

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Publicamos la información nutricional completa de <strong>TANK STRONGER</strong> tal como aparece en su rotulado oficial. Puedes verificar cada gramo de proteína, carbohidrato de quinoa y aminoácidos antes de comprar.
              </p>

              <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-5 space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#9af91e]">
                  TRANSPARENCIA REAL TOP ONE
                </span>
                <p className="text-sm font-bold text-white">
                  6 fuentes de proteína + Quinoa Orgánica completa + 4g de matriz celular de Creatina y Glutamina. Sin letras pequeñas.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-4">
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Consulta la ración sugerida en la tabla de tu envase. Alimento para deportistas diseñado para apoyar un estado de superávit calórico y desarrollo muscular con entrenamiento de resistencia.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 7: COMPARATIVA DIRECTA (GAINER GENÉRICO VS TANK) */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#9af91e]/30 bg-[#9af91e]/10 text-[#9af91e] text-xs font-black tracking-widest uppercase mb-4">
              COMPARATIVA DIRECTA
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Gainer Genérico vs. <br />
              <span className="text-[#9af91e]">TANK STRONGER MASS GAINER</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#9af91e] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
            
            {/* Tabla Comparativa de 5 Filas */}
            <div className="lg:col-span-8 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/80 shadow-2xl">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900/70">
                    <th className="p-4 sm:p-5 font-bold text-neutral-400 w-1/4">Característica</th>
                    <th className="p-4 sm:p-5 font-bold text-neutral-300 w-3/8">Gainer Tradicional</th>
                    <th className="p-4 sm:p-5 font-black text-[#9af91e] bg-[#9af91e]/10 w-3/8">
                      TANK STRONGER TOP ONE
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  <tr className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-neutral-300">Fuente de Carbohidratos</td>
                    <td className="p-4 sm:p-5 text-neutral-400">100% Maltodextrina y azúcares baratos</td>
                    <td className="p-4 sm:p-5 font-bold text-white bg-[#9af91e]/5">
                      Quinoa Orgánica de absorción gradual + Carbos Complejos
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-neutral-300">Digestión y Asimilación</td>
                    <td className="p-4 sm:p-5 text-neutral-400">Pesadez estomacal, hinchazón y gases</td>
                    <td className="p-4 sm:p-5 font-bold text-white bg-[#9af91e]/5">
                      Amigable con tu digestión gracias a la inclusión de Prebióticos
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-neutral-300">Proteína x Servicio</td>
                    <td className="p-4 sm:p-5 text-neutral-400">20g - 30g de fuentes vegetales diluidas</td>
                    <td className="p-4 sm:p-5 font-bold text-white bg-[#9af91e]/5">
                      53g en agua (hasta 69g en leche) de 6 fuentes de élite
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-neutral-300">Fórmula Celular</td>
                    <td className="p-4 sm:p-5 text-neutral-400">Sin creatina o dosis insignificantes</td>
                    <td className="p-4 sm:p-5 font-bold text-white bg-[#9af91e]/5">
                      4g Matriz combinada de Creatina + L-Glutamina pura
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-neutral-300">Sabores y Textura</td>
                    <td className="p-4 sm:p-5 text-neutral-400">Empalagosos con sabor químico fuerte</td>
                    <td className="p-4 sm:p-5 font-bold text-white bg-[#9af91e]/5">
                      2 deliciosos sabores: Vainilla Coco 🥥🍃 y Choco Moca 🍫☕
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Imagen Comparativa / Tarro TANK a la Derecha */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative rounded-2xl border border-neutral-800 bg-neutral-950 p-6 flex flex-col items-center justify-center max-w-sm w-full shadow-2xl">
                <img
                  src="/images/landing/tank-vainilla-coco-7lbs.png"
                  alt="TANK Stronger Top One"
                  className="w-full h-auto max-h-[300px] object-contain drop-shadow-[0_10px_25px_rgba(154,249,30,0.2)]"
                />
                <span className="text-xs font-black text-[#9af91e] mt-4 uppercase">
                  Tecnología Táctica Top One™
                </span>
              </div>
            </div>

          </div>

          <div className="flex justify-center">
            <button
              onClick={scrollToPlans}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-[#9af91e] to-[#80d80f] hover:from-[#88e010] hover:to-[#9af91e] text-neutral-950 font-black text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(154,249,30,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>COMPRAR AHORA</span>
              <span className="w-5 h-5 rounded-full bg-neutral-950 text-[#9af91e] flex items-center justify-center text-xs font-black">
                ↓
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 8: TESTIMONIOS Y EXPERIENCIAS REALES             */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#070707] via-neutral-950 to-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#9af91e]/30 bg-[#9af91e]/10 text-[#9af91e] text-xs font-black tracking-widest uppercase mb-4">
              EXPERIENCIAS DE COMBATE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Atletas que transformaron su <br />
              <span className="text-[#9af91e]">fase de volumen con TANK</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-4 max-w-xl mx-auto">
              Comentarios reales de personas que integraron TANK STRONGER MASS GAINER dentro de su plan diario de superávit y entrenamiento.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-3 gap-6">
              {customerReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between hover:border-[#9af91e]/40 transition-colors shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        className="w-11 h-11 rounded-xl object-cover border border-neutral-700"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{rev.author}</h4>
                        <span className="text-[11px] text-neutral-500">{rev.time}</span>
                      </div>
                    </div>

                    <div className="flex text-amber-400 gap-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                      &quot;{rev.comment}&quot;
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View with Carousel Controls */}
            <div className="md:hidden">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={customerReviews[reviewIndex].avatar}
                    alt={customerReviews[reviewIndex].author}
                    className="w-12 h-12 rounded-xl object-cover border border-neutral-700"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {customerReviews[reviewIndex].author}
                    </h4>
                    <span className="text-xs text-neutral-500">
                      {customerReviews[reviewIndex].time}
                    </span>
                  </div>
                </div>

                <div className="flex text-amber-400 gap-1 mb-4">
                  {Array.from({ length: customerReviews[reviewIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                  ))}
                </div>

                <p className="text-sm text-neutral-200 leading-relaxed min-h-[70px]">
                  &quot;{customerReviews[reviewIndex].comment}&quot;
                </p>
              </div>

              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={prevReview}
                  aria-label="Anterior reseña"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center hover:bg-[#9af91e] hover:text-black transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {customerReviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setReviewIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        reviewIndex === i ? 'w-6 bg-[#9af91e]' : 'w-2 bg-neutral-700'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextReview}
                  aria-label="Siguiente reseña"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center hover:bg-[#9af91e] hover:text-black transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 9: VIDEOS Y EXPERIENCIAS CON ENLACES             */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#9af91e]/30 bg-[#9af91e]/10 text-[#9af91e] text-xs font-black tracking-widest uppercase mb-4">
              VIDEOS Y EXPERIENCIAS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Mira contenido táctico de <br />
              <span className="text-[#9af91e]">TOP ONE NUTRITION</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-4 max-w-xl mx-auto">
              Contenido oficial para conocer cómo preparar tu batido, testimonios de atletas y formas de maximizar tus ganancias en el gimnasio.
            </p>
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {videoCards.map((card) => (
              <div
                key={card.id}
                className="rounded-2xl border border-neutral-800 bg-neutral-950/80 overflow-hidden shadow-2xl flex flex-col group hover:border-[#9af91e]/50 transition-all"
              >
                {/* Header estilo Instagram / Top One */}
                <div className="p-3.5 border-b border-neutral-800/80 flex items-center justify-between bg-neutral-900/40">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#9af91e] p-[1.5px] flex items-center justify-center">
                      <div className="w-full h-full bg-neutral-950 rounded-full flex items-center justify-center">
                        <Instagram className="w-3.5 h-3.5 text-[#9af91e]" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-none">{card.handle}</div>
                      {card.location && (
                        <span className="text-[10px] text-neutral-400 leading-none">{card.location}</span>
                      )}
                    </div>
                  </div>

                  <a
                    href={card.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-[#9af91e] hover:bg-[#80d80f] text-neutral-950 text-[11px] font-black transition-colors cursor-pointer"
                  >
                    {card.badge}
                  </a>
                </div>

                {/* Video / Poster Container */}
                <div className="relative aspect-[4/5] bg-neutral-900 flex items-center justify-center overflow-hidden">
                  <img
                    src={card.poster}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Play Button Overlay */}
                  <button
                    onClick={() => {
                      if (card.videoUrl) {
                        setActiveVideoModal(card.videoUrl);
                      } else {
                        setActiveVideoModal('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1');
                      }
                    }}
                    aria-label={`Reproducir video de ${card.title}`}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#9af91e] text-black flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  </button>
                </div>

                {/* Footer de la tarjeta con link directo */}
                <div className="p-4 bg-neutral-950 flex flex-col items-center justify-center">
                  <a
                    href={card.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-white transition-colors flex items-center gap-2"
                  >
                    <span>Ver en la base oficial</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Video Modal Popup */}
      {activeVideoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-neutral-900/90 text-white flex items-center justify-center text-lg font-bold hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
            <iframe
              src={activeVideoModal}
              title="Top One Video Player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECCIÓN 10: PLANES Y PRESENTACIONES TANK (3 PRESENTACIONES) */}
      {/* ======================================================== */}
      <section id="seccion-planes-combos" className="py-20 md:py-28 bg-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#9af91e]/30 bg-[#9af91e]/10 text-[#9af91e] text-xs font-black tracking-widest uppercase mb-4">
              ELIGE TU PRESENTACIÓN TÁCTICA
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Elige tu ración de <br />
              <span className="text-[#9af91e]">TANK STRONGER MASS GAINER</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#9af91e] mx-auto mt-4" />

            {/* Selector de Sabor para la Compra */}
            <div className="mt-8 inline-flex items-center gap-2 p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800">
              <span className="text-xs font-bold text-neutral-400 px-3">Sabor seleccionado:</span>
              {flavors.map(f => (
                <button
                  key={f.name}
                  onClick={() => setSelectedFlavor(f.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedFlavor === f.name
                      ? 'bg-[#9af91e] text-neutral-950 shadow-md'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span>{f.icon}</span>
                  <span>{f.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid de 3 Planes / Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-5xl mx-auto">
            {plans.map((plan) => {
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 ${
                    plan.isBestOption
                      ? 'bg-neutral-950 border-2 border-[#9af91e] shadow-[0_0_35px_rgba(154,249,30,0.25)] md:-translate-y-2'
                      : 'bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 shadow-xl'
                  }`}
                >
                  {/* Banner superior "MÁS VENDIDO" */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-gradient-to-r from-[#9af91e] via-[#8ae010] to-[#9af91e] text-neutral-950 font-black text-xs uppercase tracking-wider shadow-md">
                      {plan.badge}
                    </div>
                  )}

                  {/* Badge de ahorro */}
                  {plan.savingsBadge && (
                    <div className="absolute top-5 right-5 px-3 py-1 rounded-md bg-rose-500/20 text-rose-400 text-[11px] font-black uppercase tracking-wider border border-rose-500/40">
                      {plan.savingsBadge}
                    </div>
                  )}

                  {/* Imagen de la Presentación */}
                  <div className="w-full flex items-center justify-center my-4 min-h-[170px]">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="max-h-40 w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
                    />
                  </div>

                  {/* Datos del Plan */}
                  <div className="text-center space-y-3 my-4">
                    <h3 className="text-xl font-black text-white">{plan.name}</h3>
                    <div className="text-xs font-bold text-[#9af91e]">{plan.subname}</div>

                    <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                      {plan.priceFormatted}
                    </div>

                    <div className="inline-block px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-medium">
                      {plan.shippingNotice}
                    </div>

                    <p className="text-xs text-neutral-400 min-h-[36px] flex items-center justify-center">
                      {plan.description}
                    </p>
                  </div>

                  {/* Botón de Comprar Ahora */}
                  <div className="pt-4">
                    <button
                      onClick={() => handleSelectPlanAndBuy(plan)}
                      className={`w-full py-4 px-6 rounded-full font-black text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        plan.isBestOption
                          ? 'bg-gradient-to-r from-[#9af91e] to-[#80d80f] hover:from-[#88e010] hover:to-[#9af91e] text-neutral-950 shadow-lg shadow-[#9af91e]/30 hover:scale-[1.02] active:scale-[0.98]'
                          : 'bg-white hover:bg-neutral-200 text-neutral-950 hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      Comprar {plan.name}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN PREGUNTAS FRECUENTES (FAQS)                      */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#070707] via-neutral-950 to-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#9af91e]/30 bg-[#9af91e]/10 text-[#9af91e] text-xs font-black tracking-widest uppercase mb-4">
              PREGUNTAS FRECUENTES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Resuelve tus dudas antes de <br />
              <span className="text-[#9af91e]">elegir tu presentación</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#9af91e] mx-auto mt-4" />
          </div>

          <div className="space-y-3.5">
            {faqList.map((faq, index) => {
              const isOpen = openFaqIndexes.includes(index);
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-[#9af91e]/50 bg-neutral-900/70 shadow-lg shadow-[#9af91e]/5'
                      : 'border-neutral-800/80 bg-neutral-950/60 hover:border-neutral-700'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-neutral-800 text-white rotate-45'
                          : 'bg-[#9af91e] text-neutral-950'
                      }`}
                    >
                      <span className="text-base font-black leading-none">+</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/50">
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
      {/* SECCIÓN 11: MEDIOS DE PAGO Y SEGURIDAD                  */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 bg-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#9af91e]/30 bg-[#9af91e]/10 text-[#9af91e] text-xs font-black tracking-widest uppercase mb-6">
            COMPRA SEGURA TOP ONE
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            Paga fácil y seguro con <br />
            <span className="text-[#9af91e]">medios confiables</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-10 leading-relaxed">
            En el checkout podrás elegir entre transferencias, Nequi, tarjetas de crédito, corresponsales y pago contraentrega.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <div className="h-12 sm:h-14 px-4 sm:px-5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center font-bold text-xs sm:text-sm text-neutral-200 shadow-sm hover:border-neutral-700 transition-colors">
              <span className="font-extrabold text-[#fdc400] mr-1.5 font-sans">QR</span> Bancolombia
            </div>

            <div className="h-12 sm:h-14 px-4 sm:px-5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center text-[10px] sm:text-xs text-neutral-300 shadow-sm hover:border-neutral-700 transition-colors">
              <span className="font-medium">Corresponsales</span>
              <span className="font-bold text-white">Bancolombia</span>
            </div>

            <div className="h-12 sm:h-14 px-4 sm:px-5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center text-[10px] sm:text-xs text-neutral-300 shadow-sm hover:border-neutral-700 transition-colors">
              <span className="font-bold text-white">Transferencia</span>
              <span className="font-medium text-neutral-400">bancaria</span>
            </div>

            <div className="h-12 sm:h-14 px-5 sm:px-6 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-md">
              <span className="text-[#1a1f71] font-black italic text-xl tracking-tighter">VISA</span>
            </div>

            <div className="h-12 sm:h-14 px-5 sm:px-6 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-md">
              <div className="flex items-center -space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#eb001b]" />
                <div className="w-6 h-6 rounded-full bg-[#f79e1b] opacity-90" />
              </div>
            </div>

            <div className="h-12 sm:h-14 px-4 sm:px-5 rounded-xl bg-[#006fcf] border border-blue-500 flex items-center justify-center shadow-md">
              <span className="text-white font-black text-xs tracking-wider uppercase">AMEX</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-800 bg-neutral-900/80 text-xs sm:text-sm font-semibold text-neutral-200 mb-12 shadow-inner">
            <span className="w-4 h-4 rounded-full bg-[#9af91e] text-black flex items-center justify-center text-[10px] font-black">
              ✓
            </span>
            <span>Transacciones procesadas con métodos de pago certificados</span>
          </div>

          <div className="flex justify-center mb-16">
            <button
              onClick={scrollToPlans}
              className="px-12 py-5 rounded-full bg-gradient-to-r from-[#9af91e] via-[#8ae010] to-[#9af91e] hover:from-[#80d80f] hover:to-[#9af91e] text-neutral-950 font-black text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(154,249,30,0.35)] hover:shadow-[0_0_55px_rgba(154,249,30,0.55)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3"
            >
              <span>COMPRAR AHORA</span>
              <span className="w-6 h-6 rounded-full bg-neutral-950 text-[#9af91e] flex items-center justify-center text-sm font-black">
                ↓
              </span>
            </button>
          </div>

          <div className="border-t border-neutral-900 pt-8 max-w-3xl mx-auto">
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              TOP ONE™ Nutrition - ¡Somos tácticos y orgánicos por excelencia! WHEY PROTEIN + SUPERFOODS 🍃⚡️. Consíguela en nuestra base: www.toponenutrition.com. Registro sanitario vigente.
            </p>
          </div>

        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/?text=Hola%2C%20quisiera%20pedir%20informaci%C3%B3n%20sobre%20TANK%20STRONGER%20MASS%20GAINER%20de%20Top%20One"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
      >
        <MessageCircle className="w-8 h-8 fill-white stroke-none" />
      </a>

    </div>
  );
};
