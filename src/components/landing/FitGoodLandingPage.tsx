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
  Calendar, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  MessageCircle,
  Play,
  Instagram,
  Star,
  ExternalLink
} from 'lucide-react';

interface FitGoodLandingPageProps {
  product: Product;
  onAddToCart: (bundle: BundleTier, flavor: string, size: string) => void;
  onBuyNow: (bundle: BundleTier, flavor: string, size: string) => void;
  onAddReview?: (review: ProductReview) => void;
}

export const FitGoodLandingPage: React.FC<FitGoodLandingPageProps> = ({
  product,
  onAddToCart,
  onBuyNow,
}) => {
  // Bundle Selection
  const [selectedBundleId, setSelectedBundleId] = useState<string>(
    product.bundles.find((b) => b.popular)?.id || product.bundles[0]?.id || ''
  );
  const selectedBundle =
    product.bundles.find((b) => b.id === selectedBundleId) || product.bundles[0];

  const [selectedFlavor, setSelectedFlavor] = useState<string>(
    product.flavors[0] || 'Neutro'
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0] || '400g (80 porciones)'
  );

  // SECTION 2: Athlete Signals
  const athleteSignals = [
    {
      id: 1,
      image: '/images/landing/athlete-1.png',
      text: 'Te cuesta completar la última serie al mismo ritmo que las primeras',
    },
    {
      id: 2,
      image: '/images/landing/athlete-2.png',
      text: 'Terminas la rutina sin energía para el resto del día',
    },
    {
      id: 3,
      image: '/images/landing/athlete-3.png',
      text: 'Eres constante con tu rutina, pero cuesta trabajo mantener el mismo nivel de energía en cada sesión',
    },
    {
      id: 4,
      image: '/images/landing/athlete-4.png',
      text: 'Entrenas duro, pero sientes que el progreso avanza más lento de lo esperado',
    },
  ];

  const [carouselIndex, setCarouselIndex] = useState(0);
  const prevSlide = () => {
    setCarouselIndex((prev) => (prev === 0 ? athleteSignals.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCarouselIndex((prev) => (prev === athleteSignals.length - 1 ? 0 : prev + 1));
  };

  // SECTION 8: Reviews / Experiencias
  const customerReviews = [
    {
      id: 1,
      author: 'Felipe A.',
      time: 'Hace 2 meses',
      avatar: '/images/landing/athlete-1.png',
      rating: 5,
      comment: 'Estaba buscando una creatina sin mezclas innecesarias. Me convenció más revisar la etiqueta y ver la información clara.'
    },
    {
      id: 2,
      author: 'Valentina G.',
      time: 'Hace 3 semanas',
      avatar: '/images/landing/athlete-3.png',
      rating: 5,
      comment: 'La estoy usando junto con mi plan de alimentación y entrenamiento. Me gusta porque no tiene un sabor pesado.'
    },
    {
      id: 3,
      author: 'Julián P.',
      time: 'Hace 1 mes',
      avatar: '/images/landing/athlete-4.png',
      rating: 5,
      comment: 'Pedí 3 unidades porque entreno con mi hermano. Nos gustó que sea sencilla: creatina monohidratada y una etiqueta fácil de entender.'
    }
  ];

  const [reviewIndex, setReviewIndex] = useState(0);
  const prevReview = () => {
    setReviewIndex((prev) => (prev === 0 ? customerReviews.length - 1 : prev - 1));
  };
  const nextReview = () => {
    setReviewIndex((prev) => (prev === customerReviews.length - 1 ? 0 : prev + 1));
  };

  // SECTION 9: Video items with embed/link capability
  const [videoCards, setVideoCards] = useState([
    {
      id: 1,
      handle: 'fitgoodpro',
      location: 'Bogotá',
      badge: 'Ver perfil',
      profileUrl: 'https://instagram.com/fitgoodpro',
      title: 'El ingrediente más estudiado del mundo',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1', // Customizable link!
      isCustomVideo: false,
      poster: '/images/landing/hero-creatine-can.png',
      caption: 'Creatine 1000 - Máxima pureza y disolución rápida',
      followers: ''
    },
    {
      id: 2,
      handle: 'fitgoodpro',
      location: 'Bogotá',
      badge: 'Ver perfil',
      profileUrl: 'https://instagram.com/fitgoodpro',
      title: 'SUPER BISGLICINATO - TU RUTINA SIN ENREDOS',
      videoUrl: '',
      isCustomVideo: false,
      poster: '/images/landing/section-9-videos.png',
      caption: 'Experiencias de atletas en Bogotá',
      followers: ''
    },
    {
      id: 3,
      handle: 'fitgoodpro',
      location: '',
      badge: 'Ver perfil',
      profileUrl: 'https://instagram.com/fitgoodpro',
      title: 'SUPER BISGLICINATO - 100 DOSIS',
      videoUrl: '',
      isCustomVideo: false,
      poster: '/images/landing/section-9-videos.png',
      caption: 'Recomendaciones y formas de uso',
      followers: '5.454 seguidores'
    }
  ]);

  // Video modal / player state
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  // FAQ State (Preguntas Frecuentes)
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0, 2]); // First and third open as shown in user screenshot

  const toggleFaq = (index: number) => {
    setOpenFaqIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqList = [
    {
      question: '¿Por qué elegir Creatine 1000 y no cualquier otra creatina?',
      answer:
        'Porque declaramos exactamente lo que contiene, en las cantidades que indica el rotulado — sin fórmulas escondidas ni rellenos. Revisa la ficha del producto y compáralo tú mismo.',
    },
    {
      question: '¿Cómo se toma?',
      answer:
        'Se recomienda consumir 1 scoop (5 gramos) al día disuelto en agua o tu bebida de preferencia. Puedes tomarla antes o después de entrenar, de forma consistente todos los días.',
    },
    {
      question: '¿Hay que hacer fase de carga?',
      answer:
        'Existen distintos protocolos. Consulta con un profesional de nutrición deportiva para el que mejor se ajuste a tu caso, y sigue siempre las indicaciones del rotulado.',
    },
    {
      question: '¿Se puede tomar en días de descanso?',
      answer:
        'Sí. La creatina funciona por saturación celular constante, por lo que es importante consumirla también los días en que no entrenas para mantener los niveles óptimos en tu organismo.',
    },
    {
      question: '¿Engorda o retiene líquidos?',
      answer:
        'La creatina no contiene calorías ni genera acumulación de grasa corporal. Puede favorecer la hidratación intracelular dentro del músculo, lo cual es beneficioso para la síntesis de fuerza y volumen magro.',
    },
    {
      question: '¿Se puede combinar con otros productos?',
      answer:
        'Sí, es compatible para combinarse con proteína, aminoácidos, cafeína o electrolitos en tu rutina diaria habitual.',
    },
    {
      question: '¿Hacen envíos a toda Colombia?',
      answer:
        'Sí, realizamos envíos seguros y rápidos a nivel nacional con cobertura a las principales ciudades y municipios del país.',
    },
  ];

  // SECTION 10: Pricing Plans (Combos de la Imagen 5)
  const plans = [
    {
      id: 'plan_1',
      units: 1,
      name: '1 unidad',
      price: 79000,
      priceFormatted: '$79.000',
      shippingNotice: 'Envío según cobertura',
      description: 'Ideal para comenzar tu rutina con Creatine 1000.',
      image: '/images/landing/plan-1-can.png',
      badge: null,
      isBestOption: false,
      savingsBadge: null
    },
    {
      id: 'plan_2',
      units: 2,
      name: '2 unidades',
      price: 140000,
      priceFormatted: '$140.000',
      shippingNotice: 'Envío según cobertura',
      description: 'Más constancia, mejor valor por compra.',
      image: '/images/landing/plan-2-cans.png',
      badge: null,
      isBestOption: false,
      savingsBadge: 'Ahorras 10%'
    },
    {
      id: 'plan_3',
      units: 3,
      name: '3 unidades',
      price: 175000,
      priceFormatted: '$175.000',
      shippingNotice: 'Envío según cobertura',
      description: 'La opción con mayor ahorro para mantener tu rutina.',
      image: '/images/landing/plan-3-cans.png',
      badge: 'MEJOR OPCIÓN',
      isBestOption: true,
      savingsBadge: 'Ahorras 15%'
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
      name: plan.name,
      units: plan.units,
      price: plan.price,
      originalPrice: plan.price * 1.15,
      savingsText: plan.savingsBadge || undefined
    };
    onBuyNow(bundle, selectedFlavor, selectedSize);
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white font-sans selection:bg-[#ff6a00] selection:text-white">
      
      {/* ======================================================== */}
      {/* SECCIÓN 1: HERO PRINCIPAL (IMAGEN 1)                     */}
      {/* ======================================================== */}
      <section className="relative pt-12 pb-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group max-w-[500px] w-full">
              <div className="absolute -inset-4 bg-[#ff6a00]/15 rounded-3xl blur-2xl pointer-events-none transition-all group-hover:bg-[#ff6a00]/25" />
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-950/60 shadow-2xl">
                <img
                  src="/images/landing/hero-creatine-can.png"
                  alt="Creatine 1000 de FitGood"
                  className="w-full h-auto object-cover object-center transform transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/landing/hero-section-1.png';
                  }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-start space-y-6 text-left">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#ff6a00]/40 bg-[#ff6a00]/10 text-[#ff7700] text-xs font-black tracking-widest uppercase">
              NUEVO PRODUCTO FITGOOD
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Conoce <br />
              <span className="text-[#ff6a00]">Creatine 1000</span> <br />
              de FitGood
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
              Un ingrediente, un propósito. Fácil de mezclar, y con la transparencia total de lo que estás poniendo en tu cuerpo.
            </p>

            <button
              onClick={scrollToPlans}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#ff6200] to-[#ff7b00] hover:from-[#e55800] hover:to-[#ff6a00] text-neutral-950 font-black text-base shadow-lg shadow-[#ff6a00]/25 hover:shadow-[#ff6a00]/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
            >
              <span>Ver presentaciones</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 2: SEÑALES QUE MUCHOS ATLETAS IDENTIFICAN        */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#070707] via-neutral-950 to-[#070707] border-t border-neutral-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center text-white mb-12 sm:mb-16">
            Señales que muchos atletas identifican en su entrenamiento
          </h2>

          <div className="hidden md:grid grid-cols-4 gap-6">
            {athleteSignals.map((signal) => (
              <div
                key={signal.id}
                className="group flex flex-col bg-neutral-900/50 rounded-2xl overflow-hidden border border-neutral-800 hover:border-[#ff6a00]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#ff6a00]/10"
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
              className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900/90 text-white border border-neutral-700 flex items-center justify-center hover:bg-[#ff6a00] hover:text-black transition-colors shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Siguiente señal"
              className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900/90 text-white border border-neutral-700 flex items-center justify-center hover:bg-[#ff6a00] hover:text-black transition-colors shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex justify-center gap-2 mt-4">
              {athleteSignals.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    carouselIndex === i ? 'bg-[#ff6a00] w-6' : 'bg-neutral-700'
                  }`}
                  aria-label={`Ir al slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 3: TRANSPARENCIA Y COMPOSICIÓN                   */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16 max-w-3xl mx-auto rounded-2xl border border-[#ff6a00]/40 bg-neutral-950/80 p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff7a00] to-[#ff5500] text-neutral-950 flex items-center justify-center shrink-0 shadow-lg shadow-[#ff6a00]/20">
                <Flame className="w-6 h-6 fill-current stroke-current" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm text-neutral-300 font-medium">
                  Estas son señales que muchos atletas identifican en su día a día de entrenamiento.
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#ff7700] mt-1">
                  Vale la pena tenerlas en cuenta junto con tu descanso, tu alimentación general y tu plan de entrenamiento.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#ff7700]">
              TRANSPARENCIA Y COMPOSICIÓN
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                Uno de los ingredientes más estudiados <br />
                <span className="text-[#ff6a00]">del mundo del entrenamiento</span> <br />
                y uno de los más adulterados en el mercado
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                La creatina es un compuesto natural, presente en alimentos como carnes y pescado, y es también uno de los ingredientes deportivos más investigados a nivel mundial. El problema no es la creatina en sí — es que el mercado está lleno de versiones diluidas, mal etiquetadas o mezcladas con rellenos baratos que no aportan nada.
              </p>

              <div className="rounded-xl border border-[#ff6a00]/60 bg-gradient-to-br from-neutral-950 via-neutral-900/60 to-neutral-950 p-6 text-left shadow-lg">
                <h4 className="text-sm sm:text-base font-bold text-white mb-2">
                  Lo que sí podemos decirte con total transparencia:
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  <strong className="text-[#ff7700]">Creatine 1000 declara exactamente lo que contiene, en las cantidades que indica su etiqueta</strong> — sin letras pequeñas ni fórmulas &quot;propietarias&quot; que esconden la proporción real de cada ingrediente.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-xs sm:max-w-sm w-full rounded-2xl border border-neutral-800 bg-neutral-950/80 p-6 flex flex-col items-center justify-center">
                <img
                  src="/images/landing/transparency-diagram.png"
                  alt="Composición natural de la creatina (carne, pescado, cuerpo)"
                  className="w-full h-auto object-contain filter drop-shadow-[0_0_15px_rgba(255,106,0,0.15)]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/landing/transparency-section-3.png';
                  }}
                />
              </div>
            </div>

          </div>

          <div className="mt-8 text-center">
            <p className="text-[11px] text-neutral-500">
              No se afirma que este producto corrija una deficiencia individual. Consulta la etiqueta para más detalles.
            </p>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 4: BASE DE ENTRENAMIENTO Y PILARES               */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#070707] via-neutral-950 to-[#070707] border-t border-neutral-900/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 text-[#ff7700] text-xs font-black tracking-widest uppercase mb-6">
            TU BASE DE ENTRENAMIENTO
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
            Tu rutina, tu descanso, tu alimentación, tu constancia...
          </h2>

          <p className="text-base sm:text-xl font-bold text-[#ff6a00] mb-12">
            ¿Y si además tuvieras el ingrediente correcto?
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 max-w-3xl mx-auto">
            <div className="relative rounded-2xl bg-neutral-900/70 border border-neutral-800 p-5 flex flex-col items-center justify-center min-h-[140px] hover:border-[#ff6a00]/50 transition-colors">
              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#ff6a00] text-black flex items-center justify-center text-xs font-black">
                ✓
              </span>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center mb-3 text-[#ff7700]">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-neutral-200">
                Tu rutina de entrenamiento
              </span>
            </div>

            <div className="relative rounded-2xl bg-neutral-900/70 border border-neutral-800 p-5 flex flex-col items-center justify-center min-h-[140px] hover:border-[#ff6a00]/50 transition-colors">
              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#ff6a00] text-black flex items-center justify-center text-xs font-black">
                ✓
              </span>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center mb-3 text-[#ff7700]">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-neutral-200">
                Tu descanso
              </span>
            </div>

            <div className="relative rounded-2xl bg-neutral-900/70 border border-neutral-800 p-5 flex flex-col items-center justify-center min-h-[140px] hover:border-[#ff6a00]/50 transition-colors">
              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#ff6a00] text-black flex items-center justify-center text-xs font-black">
                ✓
              </span>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center mb-3 text-[#ff7700]">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-neutral-200">
                Tu alimentación
              </span>
            </div>

            <div className="relative rounded-2xl bg-neutral-900/70 border border-neutral-800 p-5 flex flex-col items-center justify-center min-h-[140px] hover:border-[#ff6a00]/50 transition-colors">
              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#ff6a00] text-black flex items-center justify-center text-xs font-black">
                ✓
              </span>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center mb-3 text-[#ff7700]">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-neutral-200">
                Tu constancia
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Estos son los pilares reales de tu progreso — nosotros no los reemplazamos. Lo que sí ponemos sobre la mesa es un ingrediente puro, fácil de incorporar a tu rutina, sin sabores raros ni procesos complicados.
          </p>

          <div className="max-w-2xl mx-auto rounded-2xl border border-[#ff6a00]/60 bg-gradient-to-b from-neutral-900/90 to-neutral-950 p-6 sm:p-8 text-center shadow-xl relative">
            <div className="inline-block px-3 py-1 rounded-full bg-[#ff6a00]/20 text-[#ff7700] text-[11px] font-black uppercase tracking-wider mb-4 border border-[#ff6a00]/30">
              TU RESPALDO, NO TU REEMPLAZO
            </div>
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-medium">
              Por eso creamos <strong className="text-[#ff6a00] font-bold">Creatine 1000</strong>: no sustituye tu esfuerzo en el gym, es el ingrediente que lo acompaña — para que lo único que tengas que pensar en tu próxima serie sea dar el máximo.
            </p>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 5: LLAMADO A LA ACCIÓN DEL PRODUCTO              */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-block px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 text-xs font-black uppercase tracking-widest">
                PRESENTACIÓN EN POLVO
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Creatine 1000 <span className="text-[#ff6a00]">de FitGood</span>
              </h2>

              <p className="text-base text-neutral-400">
                Creatina monohidratada en polvo.
              </p>

              <div className="rounded-xl bg-gradient-to-r from-[#ff6200] to-[#ff7b00] p-4 text-neutral-950 font-black text-xs sm:text-sm tracking-wide uppercase shadow-lg shadow-[#ff6a00]/20">
                LO QUE VES ES LO QUE HAY, SIN FÓRMULAS ESCONDIDAS
              </div>

              <div className="space-y-3">
                <div className="rounded-xl bg-neutral-900/80 border border-neutral-800 p-4 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ff6a00] text-black flex items-center justify-center shrink-0 text-xs font-black">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-200">
                    Creatina monohidratada, ingrediente principal
                  </span>
                </div>

                <div className="rounded-xl bg-neutral-900/80 border border-neutral-800 p-4 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ff6a00] text-black flex items-center justify-center shrink-0 text-xs font-black">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-200">
                    Disolución rápida, sin grumos
                  </span>
                </div>

                <div className="rounded-xl bg-neutral-900/80 border border-neutral-800 p-4 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ff6a00] text-black flex items-center justify-center shrink-0 text-xs font-black">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-200">
                    Sin sabor artificial fuerte
                  </span>
                </div>

                <div className="rounded-xl bg-neutral-900/80 border border-neutral-800 p-4 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ff6a00] text-black flex items-center justify-center shrink-0 text-xs font-black">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-200">
                    Contenido neto: 400 gramos | 80 porciones aprox.
                  </span>
                </div>
              </div>

            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-md w-full">
                <div className="absolute -inset-6 bg-[#ff6a00]/20 rounded-3xl blur-2xl pointer-events-none group-hover:bg-[#ff6a00]/30 transition-all" />
                <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950/80 shadow-2xl p-4">
                  <img
                    src="/images/landing/cta-creatine-can.png"
                    alt="Creatine 1000 Presentación"
                    className="w-full h-auto object-contain transform transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/landing/cta-product-section-5.png';
                    }}
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <button
              onClick={scrollToPlans}
              className="px-12 py-5 rounded-full bg-gradient-to-r from-[#e5a00d] via-[#f5b820] to-[#e5a00d] hover:from-[#d4930b] hover:to-[#e5a00d] text-neutral-950 font-black text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(245,184,32,0.45)] hover:shadow-[0_0_50px_rgba(245,184,32,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3"
            >
              <span>COMPRAR AHORA</span>
              <span className="w-6 h-6 rounded-full bg-neutral-950 text-[#f5b820] flex items-center justify-center text-sm font-black">
                ↓
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 6: COMPOSICIÓN DEL PRODUCTO (NUEVA IMAGEN 1)     */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#070707] via-neutral-950 to-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 text-[#ff7700] text-xs font-black tracking-widest uppercase">
              COMPOSICIÓN DEL PRODUCTO
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Foto Atleta Tomando Creatina */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative group max-w-md w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
                <img
                  src="/images/landing/athlete-drinking.png"
                  alt="Atleta tomando Creatine 1000"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/landing/section-6-composition.png';
                  }}
                />
              </div>
            </div>

            {/* Texto y Caja de Transparencia */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Revisa exactamente <br />
                <span className="text-[#ff6a00]">qué contiene esta fórmula</span> <br />
                sin necesidad de confiar en nuestra palabra
              </h2>

              <div className="w-16 h-0.5 bg-[#ff6a00]" />

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Publicamos la información nutricional completa y la lista de ingredientes tal como aparece en el rotulado de <strong>Creatine 1000</strong>. No necesitas creernos — puedes verificarlo tú mismo antes de comprar.
              </p>

              {/* Caja Transparencia Real */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-5 space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#ff7700]">
                  TRANSPARENCIA REAL
                </span>
                <p className="text-sm font-bold text-white">
                  Creatina monohidratada como ingrediente principal, información clara y sin fórmulas escondidas.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-4">
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Consulta la cantidad exacta por porción y el modo de consumo en la etiqueta del producto. Este alimento no está destinado a diagnosticar, tratar, curar o prevenir enfermedades.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 7: COMPARATIVA DIRECTA (NUEVA IMAGEN 2)          */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 text-[#ff7700] text-xs font-black tracking-widest uppercase mb-4">
              COMPARATIVA DIRECTA
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Creatina genérica vs. <br />
              <span className="text-[#ff6a00]">Creatine 1000 FitGood</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#ff6a00] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
            
            {/* Tabla Comparativa de 5 Filas */}
            <div className="lg:col-span-8 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/80 shadow-2xl">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900/70">
                    <th className="p-4 sm:p-5 font-bold text-neutral-400 w-1/4">Característica</th>
                    <th className="p-4 sm:p-5 font-bold text-neutral-300 w-3/8">Creatina genérica</th>
                    <th className="p-4 sm:p-5 font-black text-[#ff7700] bg-[#ff6a00]/10 w-3/8">
                      Creatine 1000 FitGood
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  <tr className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-neutral-300">Ingrediente principal</td>
                    <td className="p-4 sm:p-5 text-neutral-400">Puede venir mezclada o con información poco clara</td>
                    <td className="p-4 sm:p-5 font-bold text-white bg-[#ff6a00]/5">
                      Creatina monohidratada 100%
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-neutral-300">Transparencia</td>
                    <td className="p-4 sm:p-5 text-neutral-400">Etiquetas confusas o fórmulas poco específicas</td>
                    <td className="p-4 sm:p-5 font-bold text-white bg-[#ff6a00]/5">
                      Composición simple, directa y fácil de revisar
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-neutral-300">Presentación</td>
                    <td className="p-4 sm:p-5 text-neutral-400">Polvos con sabores fuertes o mezclas innecesarias</td>
                    <td className="p-4 sm:p-5 font-bold text-white bg-[#ff6a00]/5">
                      Presentación en polvo, sabor neutro o según etiqueta final
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-neutral-300">Modo de uso</td>
                    <td className="p-4 sm:p-5 text-neutral-400">Puede requerir preparaciones más incómodas</td>
                    <td className="p-4 sm:p-5 font-bold text-white bg-[#ff6a00]/5">
                      Se mezcla con agua, jugo o bebida de preferencia
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-neutral-300">Rutina deportiva</td>
                    <td className="p-4 sm:p-5 text-neutral-400">Producto genérico sin enfoque claro</td>
                    <td className="p-4 sm:p-5 font-bold text-white bg-[#ff6a00]/5">
                      Pensada para acompañar entrenamiento, actividad física y vida activa
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Imagen Comparativa a la Derecha */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative rounded-2xl border border-neutral-800 bg-neutral-950 p-6 flex items-center justify-center max-w-sm w-full shadow-2xl">
                <img
                  src="/images/landing/comparison-cans.png"
                  alt="Comparación tarro FitGood vs Genérico"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/landing/section-7-comparison.png';
                  }}
                />
              </div>
            </div>

          </div>

          <p className="text-[11px] text-neutral-500 text-center mb-8">
            La información exacta de composición, porción, advertencias y modo de consumo debe verificarse siempre en la etiqueta del producto.
          </p>

          <div className="flex justify-center">
            <button
              onClick={scrollToPlans}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-[#e5a00d] via-[#f5b820] to-[#e5a00d] hover:from-[#d4930b] hover:to-[#e5a00d] text-neutral-950 font-black text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(245,184,32,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>COMPRAR AHORA</span>
              <span className="w-5 h-5 rounded-full bg-neutral-950 text-[#f5b820] flex items-center justify-center text-xs font-black">
                ↓
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 8: EXPERIENCIAS DE ENTRENAMIENTO (NUEVA IMAGEN 3)*/}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#070707] via-neutral-950 to-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 text-[#ff7700] text-xs font-black tracking-widest uppercase mb-4">
              EXPERIENCIAS DE ENTRENAMIENTO
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Personas que la sumaron a su <br />
              <span className="text-[#ff6a00]">rutina workout</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-4 max-w-xl mx-auto">
              Comentarios de personas que integran Creatine 1000 dentro de sus hábitos de entrenamiento, alimentación y constancia diaria.
            </p>
          </div>

          {/* Testimonial Cards Slider / Grid */}
          <div className="relative max-w-5xl mx-auto">
            
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-3 gap-6">
              {customerReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between hover:border-[#ff6a00]/40 transition-colors shadow-lg"
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
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center hover:bg-[#ff6a00] hover:text-black transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {customerReviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setReviewIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        reviewIndex === i ? 'w-6 bg-[#ff6a00]' : 'w-2 bg-neutral-700'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextReview}
                  aria-label="Siguiente reseña"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center hover:bg-[#ff6a00] hover:text-black transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 9: VIDEOS Y EXPERIENCIAS CON LINKS (NUEVA IMAGEN 4) */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 bg-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 text-[#ff7700] text-xs font-black tracking-widest uppercase mb-4">
              VIDEOS Y EXPERIENCIAS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Mira contenido sobre <br />
              <span className="text-[#ff6a00]">Creatine 1000</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-4 max-w-xl mx-auto">
              Contenido compartido desde Instagram para que puedas ver experiencias, recomendaciones y formas de uso dentro de una rutina de entrenamiento.
            </p>
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {videoCards.map((card) => (
              <div
                key={card.id}
                className="rounded-2xl border border-neutral-800 bg-neutral-950/80 overflow-hidden shadow-2xl flex flex-col group hover:border-[#ff6a00]/50 transition-all"
              >
                {/* Header de la tarjeta estilo Instagram */}
                <div className="p-3.5 border-b border-neutral-800/80 flex items-center justify-between bg-neutral-900/40">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[1.5px] flex items-center justify-center">
                      <div className="w-full h-full bg-neutral-950 rounded-full flex items-center justify-center">
                        <Instagram className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-none">{card.handle}</div>
                      {card.location && (
                        <span className="text-[10px] text-neutral-400 leading-none">{card.location}</span>
                      )}
                      {card.followers && (
                        <span className="text-[10px] text-neutral-400 leading-none">{card.followers}</span>
                      )}
                    </div>
                  </div>

                  <a
                    href={card.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-[#0095f6] hover:bg-[#1877f2] text-white text-[11px] font-bold transition-colors cursor-pointer"
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
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/landing/section-9-videos.png';
                    }}
                  />

                  {/* Play Button Overlay */}
                  <button
                    onClick={() => {
                      if (card.videoUrl) {
                        setActiveVideoModal(card.videoUrl);
                      } else {
                        // Default YouTube video about creatine if no link
                        setActiveVideoModal('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1');
                      }
                    }}
                    aria-label={`Reproducir video de ${card.title}`}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#ff6a00] text-black flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
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
                    <span>Ver en Instagram</span>
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
              title="FitGood Video Player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECCIÓN 10: PLANES Y COMBOS (NUEVA IMAGEN 5)              */}
      {/* ======================================================== */}
      <section id="seccion-planes-combos" className="py-20 md:py-28 bg-[#070707] relative border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 text-[#ff7700] text-xs font-black tracking-widest uppercase mb-4">
              ELIGE TU PRESENTACIÓN
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Elige tu plan de <br />
              <span className="text-[#ff6a00]">Creatine 1000</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#ff6a00] mx-auto mt-4" />
          </div>

          {/* Grid de 3 Planes / Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-5xl mx-auto">
            {plans.map((plan) => {
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 ${
                    plan.isBestOption
                      ? 'bg-neutral-950 border-2 border-[#ff6a00] shadow-[0_0_35px_rgba(255,106,0,0.25)] md:-translate-y-2'
                      : 'bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 shadow-xl'
                  }`}
                >
                  {/* Banner superior "MEJOR OPCIÓN" */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-gradient-to-r from-[#e5a00d] via-[#f5b820] to-[#e5a00d] text-neutral-950 font-black text-xs uppercase tracking-wider shadow-md">
                      {plan.badge}
                    </div>
                  )}

                  {/* Badge de ahorro a la derecha */}
                  {plan.savingsBadge && (
                    <div className="absolute top-5 right-5 px-3 py-1 rounded-md bg-[#ff6a00]/20 text-[#ff7700] text-[11px] font-black uppercase tracking-wider border border-[#ff6a00]/40">
                      {plan.savingsBadge}
                    </div>
                  )}

                  {/* Imagen de Tarro(s) */}
                  <div className="w-full flex items-center justify-center my-4 min-h-[160px]">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="max-h-36 w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/landing/cta-creatine-can.png';
                      }}
                    />
                  </div>

                  {/* Datos del Plan */}
                  <div className="text-center space-y-3 my-4">
                    <h3 className="text-xl font-black text-white">{plan.name}</h3>

                    <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                      {plan.priceFormatted}
                    </div>

                    <div className="inline-block px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-medium">
                      {plan.shippingNotice}
                    </div>

                    {plan.savingsBadge && (
                      <div className="text-xs font-bold text-[#ff7700]">
                        {plan.savingsBadge}
                      </div>
                    )}

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
                          ? 'bg-gradient-to-r from-[#ff6200] to-[#ff7b00] hover:from-[#e55800] hover:to-[#ff6a00] text-neutral-950 shadow-lg shadow-[#ff6a00]/30 hover:scale-[1.02] active:scale-[0.98]'
                          : 'bg-white hover:bg-neutral-200 text-neutral-950 hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      Comprar ahora
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
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 text-[#ff7700] text-xs font-black tracking-widest uppercase mb-4">
              PREGUNTAS FRECUENTES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Resuelve tus dudas antes de <br />
              <span className="text-[#ff6a00]">elegir tu presentación</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#ff6a00] mx-auto mt-4" />
          </div>

          {/* Acordeón de FAQs */}
          <div className="space-y-3.5">
            {faqList.map((faq, index) => {
              const isOpen = openFaqIndexes.includes(index);
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-[#ff6a00]/50 bg-neutral-900/70 shadow-lg shadow-[#ff6a00]/5'
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
                          : 'bg-[#ff6a00] text-neutral-950'
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
          
          {/* Badge Superior */}
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 text-[#ff7700] text-xs font-black tracking-widest uppercase mb-6">
            COMPRA SEGURA
          </div>

          {/* Titular */}
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            Paga fácil y seguro con <br />
            <span className="text-[#ff6a00]">medios confiables</span>
          </h2>

          {/* Subtítulo */}
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-10 leading-relaxed">
            En el checkout podrás elegir entre tarjetas, transferencias, billeteras digitales y otros medios de pago disponibles.
          </p>

          {/* Badges de Medios de Pago */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            {/* QR Bancolombia */}
            <div className="h-12 sm:h-14 px-4 sm:px-5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center font-bold text-xs sm:text-sm text-neutral-200 shadow-sm hover:border-neutral-700 transition-colors">
              <span className="font-extrabold text-[#fdc400] mr-1.5 font-sans">QR</span> Bancolombia
            </div>

            {/* Corresponsales Bancolombia */}
            <div className="h-12 sm:h-14 px-4 sm:px-5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center text-[10px] sm:text-xs text-neutral-300 shadow-sm hover:border-neutral-700 transition-colors">
              <span className="font-medium">Corresponsales</span>
              <span className="font-bold text-white">Bancolombia</span>
            </div>

            {/* Transferencia bancaria */}
            <div className="h-12 sm:h-14 px-4 sm:px-5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center text-[10px] sm:text-xs text-neutral-300 shadow-sm hover:border-neutral-700 transition-colors">
              <span className="font-bold text-white">Transferencia</span>
              <span className="font-medium text-neutral-400">bancaria</span>
            </div>

            {/* VISA */}
            <div className="h-12 sm:h-14 px-5 sm:px-6 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-md">
              <span className="text-[#1a1f71] font-black italic text-xl tracking-tighter">VISA</span>
            </div>

            {/* Mastercard */}
            <div className="h-12 sm:h-14 px-5 sm:px-6 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-md">
              <div className="flex items-center -space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#eb001b]" />
                <div className="w-6 h-6 rounded-full bg-[#f79e1b] opacity-90" />
              </div>
            </div>

            {/* American Express */}
            <div className="h-12 sm:h-14 px-4 sm:px-5 rounded-xl bg-[#006fcf] border border-blue-500 flex items-center justify-center shadow-md">
              <span className="text-white font-black text-xs tracking-wider uppercase">AMEX</span>
            </div>
          </div>

          {/* Cápsula de Transacciones Protegidas */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-800 bg-neutral-900/80 text-xs sm:text-sm font-semibold text-neutral-200 mb-12 shadow-inner">
            <span className="w-4 h-4 rounded-full bg-[#ff6a00] text-black flex items-center justify-center text-[10px] font-black">
              ✓
            </span>
            <span>Transacciones procesadas con métodos de pago seguros</span>
          </div>

          {/* Botón COMPRAR AHORA con resplandor dorado */}
          <div className="flex justify-center mb-16">
            <button
              onClick={scrollToPlans}
              className="px-12 py-5 rounded-full bg-gradient-to-r from-[#e5a00d] via-[#f5b820] to-[#e5a00d] hover:from-[#d4930b] hover:to-[#e5a00d] text-neutral-950 font-black text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(245,184,32,0.45)] hover:shadow-[0_0_55px_rgba(245,184,32,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3"
            >
              <span>COMPRAR AHORA</span>
              <span className="w-6 h-6 rounded-full bg-neutral-950 text-[#f5b820] flex items-center justify-center text-sm font-black">
                ↓
              </span>
            </button>
          </div>

          {/* Disclaimer Legal Oficial */}
          <div className="border-t border-neutral-900 pt-8 max-w-3xl mx-auto">
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Creatine 1000 es un alimento en presentación en polvo. Registro sanitario INVIMA RSA-1572-2026. Consúmase de acuerdo con las instrucciones de la etiqueta. Este producto no está destinado a diagnosticar, tratar, curar o prevenir enfermedades. Los síntomas descritos en esta página son inespecíficos y no confirman por sí solos una deficiencia de creatina. Si son frecuentes, intensos o persistentes, consulta a un profesional de la salud.
            </p>
          </div>

        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Creatine%201000%20de%20FitGood"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
      >
        <MessageCircle className="w-8 h-8 fill-white stroke-none" />
      </a>

      {/* Small floating info pill on bottom right */}
      <div className="fixed bottom-24 right-7 z-40 w-7 h-7 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-md font-bold text-xs pointer-events-none">
        !
      </div>

    </div>
  );
};
