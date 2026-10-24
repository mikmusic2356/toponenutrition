import React, { useState } from 'react';
import { Product, BundleTier, BenefitItem, ComparisonRow, ProductReview, FaqItem, NutritionIngredient } from '../../types/product';
import { ProductLandingPage } from '../landing/ProductLandingPage';
import {
  Save, Eye, ArrowLeft, Smartphone, Monitor, Plus, Trash2, Check,
  Layers, Type, DollarSign, List, Shield, HelpCircle, Star, Palette, Sparkles, Award,
  Upload, Image, FileText, ArrowUp, ArrowDown, ExternalLink, RefreshCw, AlertCircle, X, ChevronDown, CheckCircle2
} from 'lucide-react';

interface VisualBuilderProps {
  initialProduct: Product;
  onSave: (updatedProduct: Product) => void;
  onCancel: () => void;
  onPreviewLive: (product: Product) => void;
}

export const VisualBuilder: React.FC<VisualBuilderProps> = ({
  initialProduct,
  onSave,
  onCancel,
  onPreviewLive,
}) => {
  const [product, setProduct] = useState<Product>({ ...initialProduct });
  const [activeTab, setActiveTab] = useState<'info' | 'hero' | 'bundles' | 'benefits' | 'comparison' | 'nutrition' | 'reviews' | 'faqs' | 'guarantee' | 'sections' | 'colors'>('info');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [hasSaved, setHasSaved] = useState(false);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  // Field change helpers
  const updateField = <K extends keyof Product>(key: K, value: Product[K]) => {
    setProduct((prev) => ({ ...prev, [key]: value }));
    setHasSaved(false);
  };

  const handleSave = () => {
    onSave(product);
    setHasSaved(true);
    setTimeout(() => setHasSaved(false), 3000);
  };

  // Bundle handlers
  const handleAddBundle = () => {
    const newBundle: BundleTier = {
      id: `bundle_${Date.now()}`,
      name: `Nuevo Pack ${product.bundles.length + 1} Unidades`,
      units: product.bundles.length + 1,
      price: product.basePrice * (product.bundles.length + 1) * 0.85,
      originalPrice: product.originalPrice * (product.bundles.length + 1),
      savingsText: 'Ahorro especial',
      freeGift: 'Shaker Pro Gratis',
    };
    updateField('bundles', [...product.bundles, newBundle]);
  };

  const handleUpdateBundle = (index: number, updated: BundleTier) => {
    const newBundles = [...product.bundles];
    newBundles[index] = updated;
    updateField('bundles', newBundles);
  };

  const handleDeleteBundle = (index: number) => {
    if (product.bundles.length <= 1) return;
    updateField('bundles', product.bundles.filter((_, i) => i !== index));
  };

  // Benefits handlers
  const handleAddBenefit = () => {
    const newBenefit: BenefitItem = {
      id: `b_${Date.now()}`,
      icon: 'zap',
      title: 'Nuevo Beneficio de Rendimiento',
      description: 'Describe el impacto fisiológico o la ventaja demostrada.',
      stat: '100% Efectivo',
    };
    updateField('benefits', [...product.benefits, newBenefit]);
  };

  const handleUpdateBenefit = (index: number, updated: BenefitItem) => {
    const newBenefits = [...product.benefits];
    newBenefits[index] = updated;
    updateField('benefits', newBenefits);
  };

  const handleDeleteBenefit = (index: number) => {
    updateField('benefits', product.benefits.filter((_, i) => i !== index));
  };

  // Comparison handlers
  const handleAddComparisonRow = () => {
    const newRow: ComparisonRow = {
      feature: 'Nuevo Parámetro de Calidad',
      topOne: 'Especificación superior TopOne',
      competitor: 'Deficiencia en marcas genéricas',
      topOneHighlight: true,
    };
    updateField('comparison', {
      ...product.comparison,
      rows: [...product.comparison.rows, newRow],
    });
  };

  const handleUpdateComparisonRow = (index: number, updated: ComparisonRow) => {
    const newRows = [...product.comparison.rows];
    newRows[index] = updated;
    updateField('comparison', { ...product.comparison, rows: newRows });
  };

  const handleDeleteComparisonRow = (index: number) => {
    updateField('comparison', {
      ...product.comparison,
      rows: product.comparison.rows.filter((_, i) => i !== index),
    });
  };

  // Nutrition Table handlers
  const handleAddNutritionRow = () => {
    const newRow: NutritionIngredient = {
      ingredient: 'Nuevo Ingrediente Activo',
      perServing: '1000 mg',
      dailyValue: '**',
    };
    updateField('nutritionalFacts', {
      ...product.nutritionalFacts,
      table: [...product.nutritionalFacts.table, newRow],
    });
  };

  const handleUpdateNutritionRow = (index: number, updated: NutritionIngredient) => {
    const newTable = [...product.nutritionalFacts.table];
    newTable[index] = updated;
    updateField('nutritionalFacts', { ...product.nutritionalFacts, table: newTable });
  };

  const handleDeleteNutritionRow = (index: number) => {
    updateField('nutritionalFacts', {
      ...product.nutritionalFacts,
      table: product.nutritionalFacts.table.filter((_, i) => i !== index),
    });
  };

  // FAQ handlers
  const handleAddFaq = () => {
    const newFaq: FaqItem = {
      question: '¿Nueva pregunta frecuente?',
      answer: 'Escribe aquí la respuesta técnica clara y persuasiva.',
    };
    updateField('faqs', [...product.faqs, newFaq]);
  };

  const handleUpdateFaq = (index: number, updated: FaqItem) => {
    const newFaqs = [...product.faqs];
    newFaqs[index] = updated;
    updateField('faqs', newFaqs);
  };

  const handleDeleteFaq = (index: number) => {
    updateField('faqs', product.faqs.filter((_, i) => i !== index));
  };

  // Nutrition row move
  const handleMoveNutritionRow = (index: number, direction: 'up' | 'down') => {
    const table = [...product.nutritionalFacts.table];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= table.length) return;
    const temp = table[index];
    table[index] = table[targetIndex];
    table[targetIndex] = temp;
    updateField('nutritionalFacts', { ...product.nutritionalFacts, table });
  };

  // Nutrition image upload handler
  const handleNutritionImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updateField('nutritionalFacts', {
          ...product.nutritionalFacts,
          displayMode: 'image',
          imageUrl: result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // Load nutrition table presets
  const handleLoadNutritionPreset = (type: 'creatine' | 'whey' | 'preworkout') => {
    if (type === 'creatine') {
      updateField('nutritionalFacts', {
        ...product.nutritionalFacts,
        servingSize: '3.4g (1 cacito colmado)',
        servingsPerContainer: 147,
        table: [
          { ingredient: 'Creapure® Creatina Monohidrato', perServing: '3400 mg', dailyValue: '**' },
          { ingredient: '— de la cual Creatina Pura', perServing: '3000 mg', dailyValue: '**' },
        ],
        certificates: ['Creapure® AlzChem ID', 'Informed-Sport', 'GMP Standard ISO 22000', '100% Vegano'],
      });
    } else if (type === 'whey') {
      updateField('nutritionalFacts', {
        ...product.nutritionalFacts,
        servingSize: '30g (1 dosificador)',
        servingsPerContainer: 33,
        table: [
          { ingredient: 'Valor Energético', perServing: '112 kcal / 474 kJ', dailyValue: '6%' },
          { ingredient: 'Proteína Aislada CFM 90%', perServing: '26.8 g', dailyValue: '54%' },
          { ingredient: 'BCAAs Naturales (2:1:1)', perServing: '6.2 g', dailyValue: '**' },
          { ingredient: 'L-Glutamina Kyowa Quality®', perServing: '4.8 g', dailyValue: '**' },
          { ingredient: 'Grasas Totales (Saturadas)', perServing: '0.3 g (0.1 g)', dailyValue: '<1%' },
          { ingredient: 'Carbohidratos (Azúcares)', perServing: '0.4 g (0.2 g)', dailyValue: '<1%' },
        ],
        certificates: ['Glanbia Provon® CFM', 'DigeZyme® Multi-Enzyme', 'GMP Certified', 'Sin Gluten'],
      });
    } else if (type === 'preworkout') {
      updateField('nutritionalFacts', {
        ...product.nutritionalFacts,
        servingSize: '15g (1 dosificador raso)',
        servingsPerContainer: 30,
        table: [
          { ingredient: 'L-Citrulina Malato 2:1', perServing: '6000 mg', dailyValue: '**' },
          { ingredient: 'Beta-Alanina CarnoSyn®', perServing: '3200 mg', dailyValue: '**' },
          { ingredient: 'Betaina Anhidra', perServing: '2000 mg', dailyValue: '**' },
          { ingredient: 'Tirosina Ultrapura', perServing: '1000 mg', dailyValue: '**' },
          { ingredient: 'Cafeína Anhidra Natural', perServing: '300 mg', dailyValue: '**' },
          { ingredient: 'AstraGin® Absorción', perServing: '50 mg', dailyValue: '**' },
        ],
        certificates: ['CarnoSyn® Verified', 'AstraGin® Certified', 'Informed-Sport Tested', '100% Vegano'],
      });
    }
  };

  // Move FAQ handler
  const handleMoveFaq = (index: number, direction: 'up' | 'down') => {
    const faqs = [...product.faqs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= faqs.length) return;
    const temp = faqs[index];
    faqs[index] = faqs[targetIndex];
    faqs[targetIndex] = temp;
    updateField('faqs', faqs);
  };

  // Preset FAQs
  const handleLoadSuggestedFaqs = () => {
    const name = product.name.split(' ')[0] || 'este suplemento';
    const suggested: FaqItem[] = [
      {
        question: `¿Cómo y cuándo se recomienda tomar ${name}?`,
        answer: product.nutritionalFacts.usageInstructions || 'Tomar una dosis diaria disuelta en 250ml de agua fresca, preferiblemente antes o después del entrenamiento. En días de descanso, tomar por la mañana.',
      },
      {
        question: `¿Tiene efectos secundarios o requiere fases de carga/descanso?`,
        answer: 'Fórmula testada de grado clínico 100% segura para uso continuado. No requiere fase de carga ni provoca retención hídrica subcutánea ni molestias gástricas.',
      },
      {
        question: `¿Se puede combinar con otros suplementos (proteína, pre-entreno)?`,
        answer: 'Totalmente compatible y sinérgico. Se puede mezclar en el mismo shaker con tu proteína post-entreno o batido habitual.',
      },
      {
        question: `¿Cuánto tarda en llegar mi pedido y cómo se envía?`,
        answer: 'Envío urgente en 24/48 horas laborables con entrega garantizada en tu domicilio y número de seguimiento activo vía SMS y WhatsApp.',
      },
    ];
    updateField('faqs', suggested);
  };

  // Main product image & gallery handlers
  const handleUploadMainProductImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updateField('customImageUrl', result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadGalleryImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const list = product.gallery ? [...product.gallery] : [];
        list.push(result);
        updateField('gallery', list);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    const list = product.gallery ? [...product.gallery] : [];
    list.push(newGalleryUrl.trim());
    updateField('gallery', list);
    setNewGalleryUrl('');
  };

  const handleRemoveGalleryImage = (idx: number) => {
    const list = (product.gallery || []).filter((_, i) => i !== idx);
    updateField('gallery', list);
  };

  const handleSetGalleryAsPrimary = (idx: number) => {
    const currentPrimary = product.customImageUrl;
    const item = (product.gallery || [])[idx];
    if (!item) return;
    const remainingGallery = (product.gallery || []).filter((_, i) => i !== idx);
    if (currentPrimary) {
      remainingGallery.unshift(currentPrimary);
    }
    updateField('customImageUrl', item);
    updateField('gallery', remainingGallery);
  };

  const handleMoveGalleryItem = (idx: number, direction: 'up' | 'down') => {
    const list = [...(product.gallery || [])];
    const target = direction === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= list.length) return;
    const temp = list[idx];
    list[idx] = list[target];
    list[target] = temp;
    updateField('gallery', list);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 overflow-hidden">
      
      {/* Top Builder Control Header */}
      <header className="h-14 bg-slate-900 text-white px-4 flex items-center justify-between border-b border-slate-800 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            title="Volver al panel"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-xs font-mono text-[#7cb20b]">Constructor Visual 100% Editable</div>
            <h2 className="text-sm font-normal text-white truncate max-w-xs sm:max-w-md font-gunplay uppercase tracking-wide">
              {product.name}
            </h2>
          </div>
        </div>

        {/* Viewport switch & actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Device toggle */}
          <div className="hidden sm:flex items-center bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                previewDevice === 'desktop' ? 'bg-[#7cb20b] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Vista de Escritorio (2 Columnas con Galería Sticky)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                previewDevice === 'mobile' ? 'bg-[#7cb20b] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Vista Móvil"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onPreviewLive(product)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Ver cómo los clientes verán esta página"
          >
            <Eye className="w-3.5 h-3.5 text-[#7cb20b]" />
            <span className="hidden sm:inline">Ver en Vivo</span>
          </button>

          <button
            onClick={handleSave}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              hasSaved
                ? 'bg-emerald-500 text-white'
                : 'bg-[#7cb20b] hover:bg-[#6fa00a] text-slate-950'
            }`}
          >
            {hasSaved ? <Check className="w-4 h-4 stroke-[3]" /> : <Save className="w-4 h-4" />}
            <span>{hasSaved ? '¡Guardado!' : 'Guardar Landing'}</span>
          </button>
        </div>
      </header>

      {/* Main Split Body: Editor Left, Live Preview Right */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: Builder Tabs & Controls */}
        <aside className="w-full lg:w-[480px] xl:w-[540px] bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-hidden shadow-md">
          
          {/* Sub Navigation Tabs Header & Pills */}
          <div className="border-b border-slate-200 bg-slate-50 p-2.5 shrink-0 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Secciones Editables de la Landing</span>
              <span className="text-[#7cb20b] font-mono font-bold">11 Bloques 100% Personalizables</span>
            </div>

            {/* Quick Mobile / Tablet Dropdown selector */}
            <div className="sm:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as any)}
                className="w-full text-xs font-bold p-2 bg-white rounded-lg border border-slate-300 shadow-2xs text-slate-800"
              >
                <option value="info">1. General & Datos del Producto</option>
                <option value="hero">2. Hero Copy (Titular & Balas)</option>
                <option value="bundles">3. Packs & Ofertas ({product.bundles.length})</option>
                <option value="benefits">4. Beneficios Científicos ({product.benefits.length})</option>
                <option value="comparison">5. Tabla Comparativa</option>
                <option value="nutrition">6. Información Nutricional (Formulario / Imagen)</option>
                <option value="faqs">7. Respuestas Técnicas & FAQs ({product.faqs.length})</option>
                <option value="reviews">8. Opiniones Verificadas ({product.reviews.length})</option>
                <option value="guarantee">9. Garantía de Satisfacción ({product.guaranteeDays} días)</option>
                <option value="sections">10. Visibilidad de Secciones</option>
                <option value="colors">11. Estilo, Bote y Colores</option>
              </select>
            </div>

            {/* Multi-Row / Wrap Pill Navigation (Visible on all screens) */}
            <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto scrollbar-thin">
              {[
                { id: 'info', label: 'General', icon: Type, count: null },
                { id: 'hero', label: 'Hero Copy', icon: Sparkles, count: null },
                { id: 'bundles', label: 'Packs & Ofertas', icon: DollarSign, count: product.bundles.length },
                { id: 'benefits', label: 'Beneficios', icon: List, count: product.benefits.length },
                { id: 'comparison', label: 'Comparativa', icon: Shield, count: null },
                { id: 'nutrition', label: 'Nutrición Oficial', icon: FileText, count: product.nutritionalFacts.displayMode === 'image' ? 'IMG' : 'TABLA' },
                { id: 'faqs', label: 'Respuestas / FAQs', icon: HelpCircle, count: product.faqs.length },
                { id: 'reviews', label: 'Opiniones', icon: Star, count: product.reviews.length },
                { id: 'guarantee', label: 'Garantía', icon: Award, count: `${product.guaranteeDays}d` },
                { id: 'sections', label: 'Secciones', icon: Layers, count: null },
                { id: 'colors', label: 'Colores & Bote', icon: Palette, count: null },
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                      isActive
                        ? 'bg-slate-900 text-white font-bold ring-2 ring-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-[#7cb20b]' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                    {tab.count !== null && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                          isActive ? 'bg-[#7cb20b] text-slate-950' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Fields */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* TAB 1: GENERAL & IDENTITY */}
            {activeTab === 'info' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombre del Suplemento
                  </label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Slug de la URL Independiente (Identificador único)
                  </label>
                  <div className="flex items-center">
                    <span className="text-xs text-slate-600 bg-slate-100 px-3 py-2.5 border border-r-0 border-slate-300 rounded-l-lg font-mono">
                      /producto/
                    </span>
                    <input
                      type="text"
                      value={product.slug}
                      onChange={(e) =>
                        updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))
                      }
                      className="w-full text-xs p-2.5 rounded-r-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Categoría Fitness
                    </label>
                    <select
                      value={product.category}
                      onChange={(e) => updateField('category', e.target.value as any)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                    >
                      <option value="creatina">Creatina (CrM / Monohidrato)</option>
                      <option value="proteina">Proteína (WPI / Isolate / Beef)</option>
                      <option value="hipercalorica">Hipercalórica (Mass Gainer / Volumen)</option>
                      <option value="preentreno">Pre-entreno (Energy / Focus / Pump)</option>
                      <option value="intra-entreno">Intra-entreno (EAA / Hidratación)</option>
                      <option value="aminoacidos">Aminoácidos & Electrólitos</option>
                      <option value="termogenico">Termogénico / Quema de Grasa</option>
                      <option value="multivitaminico">Multivitamínico Sport</option>
                      <option value="recuperacion">Recuperación Muscular</option>
                      <option value="accesorios">Accesorios Tácticos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Badge de Calidad Superior
                    </label>
                    <input
                      type="text"
                      value={product.badge}
                      onChange={(e) => updateField('badge', e.target.value)}
                      placeholder="Ej. 100% Sello Original Creapure® Alemania"
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Precio Base Individual (COP)
                    </label>
                    <input
                      type="number"
                      step="1000"
                      value={product.basePrice}
                      onChange={(e) => updateField('basePrice', parseFloat(e.target.value) || 0)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Precio Original / Tachado (COP)
                    </label>
                    <input
                      type="number"
                      step="0.10"
                      value={product.originalPrice}
                      onChange={(e) => updateField('originalPrice', parseFloat(e.target.value) || 0)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sabores Disponibles (separados por coma)
                  </label>
                  <input
                    type="text"
                    value={product.flavors.join(', ')}
                    onChange={(e) => {
                      const newFlavors = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                      updateField('flavors', newFlavors);
                    }}
                    placeholder="Ej. Cookies & Cream, Chocolate Belga, Vainilla Francesa"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                  />
                </div>

                {/* GESTIÓN DE SABORES Y ENLACE DE FOTO POR CADA SABOR */}
                {product.flavors.length > 0 && (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#7cb20b]" />
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Enlazar Imágenes a Cada Sabor
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Cuando el cliente seleccione este sabor en la landing, la foto principal del producto cambiará automáticamente a la imagen configurada aquí.
                    </p>

                    <div className="space-y-2">
                      {product.flavors.map((flv) => {
                        const currentImg = product.flavorImageMap?.[flv] || '';
                        return (
                          <div key={flv} className="p-2.5 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="w-2 h-2 rounded-full bg-[#7cb20b] shrink-0" />
                              <span className="text-xs font-bold text-slate-900 truncate">{flv}</span>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto flex-1 justify-end">
                              {currentImg && (
                                <img
                                  src={currentImg}
                                  alt={flv}
                                  className="w-8 h-8 object-contain rounded border border-slate-200 shrink-0"
                                />
                              )}
                              <input
                                type="url"
                                value={currentImg}
                                onChange={(e) => {
                                  const updatedMap = { ...(product.flavorImageMap || {}) };
                                  if (e.target.value) {
                                    updatedMap[flv] = e.target.value;
                                  } else {
                                    delete updatedMap[flv];
                                  }
                                  updateField('flavorImageMap', updatedMap);
                                }}
                                placeholder="Pega URL de imagen para este sabor"
                                className="flex-1 sm:max-w-xs text-xs p-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#7cb20b]"
                              />
                              <label className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold cursor-pointer shrink-0" title="Subir imagen desde tu equipo">
                                <Upload className="w-3.5 h-3.5" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (loadEvt) => {
                                        const res = loadEvt.target?.result as string;
                                        if (res) {
                                          const updatedMap = { ...(product.flavorImageMap || {}), [flv]: res };
                                          updateField('flavorImageMap', updatedMap);
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Formatos / Tamaños (separados por coma)
                  </label>
                  <input
                    type="text"
                    value={product.sizes.join(', ')}
                    onChange={(e) =>
                      updateField(
                        'sizes',
                        e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                  />
                </div>

                {/* IMAGEN PRINCIPAL Y GALERÍA DEL PRODUCTO (Reemplaza plantilla de bote rígida) */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image className="w-4 h-4 text-[#7cb20b]" />
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Imagen Principal del Producto
                      </span>
                    </div>
                    {product.customImageUrl && (
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Foto Activa
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Sube la fotografía real del producto (bote, bolsa, sobre o caja de cualquier tamaño y diseño). Esta imagen se mostrará en la cabecera y en los carritos de compra.
                  </p>

                  {/* Main image preview or upload box */}
                  {product.customImageUrl ? (
                    <div className="relative p-2.5 bg-white rounded-lg border border-slate-200 flex items-center gap-3">
                      <img
                        src={product.customImageUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-20 object-contain rounded bg-slate-50 border border-slate-100 p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {product.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                          {product.customImageUrl.startsWith('data:') ? 'Imagen local subida' : product.customImageUrl}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <label className="text-[11px] font-bold text-[#659208] hover:text-[#7cb20b] cursor-pointer flex items-center gap-1">
                            <Upload className="w-3 h-3" /> Cambiar foto
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleUploadMainProductImage}
                              className="sr-only"
                            />
                          </label>
                          <span className="text-slate-300">·</span>
                          <button
                            type="button"
                            onClick={() => updateField('customImageUrl', '')}
                            className="text-[11px] font-bold text-red-600 hover:text-red-700 cursor-pointer flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Quitar imagen
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-white hover:border-[#7cb20b] transition-colors">
                      <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                      <div className="text-xs font-bold text-slate-700">
                        Sube una foto del producto desde tu equipo
                      </div>
                      <div className="text-[11px] text-slate-400 mb-2.5">
                        Formatos recomendados: PNG transparente o JPG en alta calidad
                      </div>
                      <label className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-xs">
                        <Upload className="w-3.5 h-3.5 text-[#7cb20b]" /> Seleccionar Archivo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUploadMainProductImage}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  )}

                  {/* Direct URL input alternative */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      O pega una URL directa de imagen:
                    </label>
                    <input
                      type="url"
                      value={product.customImageUrl || ''}
                      onChange={(e) => updateField('customImageUrl', e.target.value)}
                      placeholder="https://ejemplo.com/fotos/producto.png"
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                    />
                  </div>

                  {/* GALLERY SECTION */}
                  <div className="pt-3 border-t border-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                        <span>Galería de Imágenes Adicionales</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                          {(product.gallery || []).length}
                        </span>
                      </div>
                      <label className="text-[11px] font-bold text-[#659208] hover:text-[#7cb20b] cursor-pointer flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> Subir a Galería
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUploadGalleryImage}
                          className="sr-only"
                        />
                      </label>
                    </div>

                    <p className="text-[11px] text-slate-500">
                      Añade más fotos para que el cliente pueda ver el producto desde varios ángulos, textura del polvo o etiqueta en la ficha interactiva.
                    </p>

                    {/* Add by URL */}
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={newGalleryUrl}
                        onChange={(e) => setNewGalleryUrl(e.target.value)}
                        placeholder="https://... URL de foto para la galería"
                        className="flex-1 text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                      />
                      <button
                        type="button"
                        onClick={handleAddGalleryUrl}
                        disabled={!newGalleryUrl.trim()}
                        className="py-1.5 px-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Añadir
                      </button>
                    </div>

                    {/* Gallery Thumbnails List */}
                    {product.gallery && product.gallery.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {product.gallery.map((imgUrl, gIdx) => (
                          <div
                            key={gIdx}
                            className="p-2 rounded-lg border border-slate-200 bg-white flex items-center gap-2 relative group"
                          >
                            <img
                              src={imgUrl}
                              alt={`Vista ${gIdx + 1}`}
                              referrerPolicy="no-referrer"
                              className="w-12 h-14 object-contain rounded bg-slate-50 border border-slate-100 shrink-0"
                            />
                            <div className="flex-1 min-w-0 text-[10px]">
                              <div className="font-mono font-bold text-slate-700">Foto #{gIdx + 1}</div>
                              <button
                                type="button"
                                onClick={() => handleSetGalleryAsPrimary(gIdx)}
                                className="text-[10px] text-[#659208] hover:underline font-bold mt-0.5 block truncate cursor-pointer text-left"
                                title="Convertir en foto principal"
                              >
                                Hacer Principal
                              </button>
                              <div className="flex items-center gap-1 mt-1">
                                <button
                                  type="button"
                                  disabled={gIdx === 0}
                                  onClick={() => handleMoveGalleryItem(gIdx, 'up')}
                                  className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                                  title="Mover arriba"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  disabled={gIdx === product.gallery!.length - 1}
                                  onClick={() => handleMoveGalleryItem(gIdx, 'down')}
                                  className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                                  title="Mover abajo"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveGalleryImage(gIdx)}
                                  className="p-0.5 text-slate-400 hover:text-red-500 cursor-pointer ml-auto"
                                  title="Eliminar de galería"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-400 italic bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                        No hay imágenes secundarias en la galería todavía.
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Estado de Publicación</span>
                    <span className="text-[11px] text-slate-500">
                      {product.published ? 'Visible para todos los clientes' : 'Borrador privado'}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={product.published}
                      onChange={(e) => updateField('published', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7cb20b]"></div>
                  </label>
                </div>
              </div>
            )}

            {/* TAB 2: HERO COPYWRITING */}
            {activeTab === 'hero' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Titular Principal de Alto Impacto
                  </label>
                  <textarea
                    rows={2}
                    value={product.heroTitle}
                    onChange={(e) => updateField('heroTitle', e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subtítulo Persuasivo y Científico
                  </label>
                  <textarea
                    rows={3}
                    value={product.heroSubtitle}
                    onChange={(e) => updateField('heroSubtitle', e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Texto del Botón de Llamada a la Acción (CTA)
                  </label>
                  <input
                    type="text"
                    value={product.ctaText}
                    onChange={(e) => updateField('ctaText', e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b] font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Puntos Clave Rápidos (Bullets)
                  </label>
                  {product.heroBullets.map((bullet, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => {
                          const newB = [...product.heroBullets];
                          newB[idx] = e.target.value;
                          updateField('heroBullets', newB);
                        }}
                        className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateField(
                            'heroBullets',
                            product.heroBullets.filter((_, i) => i !== idx)
                          )
                        }
                        className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      updateField('heroBullets', [...product.heroBullets, 'Nuevo punto clave verificado'])
                    }
                    className="mt-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Añadir Punto Clave
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: PACKS & BUNDLES */}
            {activeTab === 'bundles' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Ofertas que multiplican el ticket medio de compra.
                  </span>
                  <button
                    type="button"
                    onClick={handleAddBundle}
                    className="py-1 px-2.5 bg-slate-900 text-white rounded text-xs font-bold flex items-center gap-1 hover:bg-slate-800 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Añadir Pack
                  </button>
                </div>

                <div className="space-y-3">
                  {product.bundles.map((bundle, index) => (
                    <div
                      key={bundle.id}
                      className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2.5 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-700">
                          Pack #{index + 1}
                        </span>
                        {product.bundles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteBundle(index)}
                            className="text-slate-400 hover:text-red-500 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Nombre de la Oferta
                          </label>
                          <input
                            type="text"
                            value={bundle.name}
                            onChange={(e) =>
                              handleUpdateBundle(index, { ...bundle, name: e.target.value })
                            }
                            className="w-full text-xs p-1.5 rounded border border-slate-300"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Badge Promocional
                          </label>
                          <input
                            type="text"
                            value={bundle.badge || ''}
                            onChange={(e) =>
                              handleUpdateBundle(index, { ...bundle, badge: e.target.value })
                            }
                            placeholder="MÁS VENDIDO · AHORRA 20%"
                            className="w-full text-xs p-1.5 rounded border border-slate-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Precio Oferta (COP)
                          </label>
                          <input
                            type="number"
                            step="1000"
                            value={bundle.price}
                            onChange={(e) =>
                              handleUpdateBundle(index, {
                                ...bundle,
                                price: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="w-full text-xs p-1.5 rounded border border-slate-300 font-mono font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Precio Original (COP)
                          </label>
                          <input
                            type="number"
                            step="1000"
                            value={bundle.originalPrice}
                            onChange={(e) =>
                              handleUpdateBundle(index, {
                                ...bundle,
                                originalPrice: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="w-full text-xs p-1.5 rounded border border-slate-300 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Texto Ahorro
                          </label>
                          <input
                            type="text"
                            value={bundle.savingsText || ''}
                            onChange={(e) =>
                              handleUpdateBundle(index, { ...bundle, savingsText: e.target.value })
                            }
                            placeholder="Ahorras $25.000 COP"
                            className="w-full text-xs p-1.5 rounded border border-slate-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Regalo Incluido (Hook de conversión)
                        </label>
                        <input
                          type="text"
                          value={bundle.freeGift || ''}
                          onChange={(e) =>
                            handleUpdateBundle(index, { ...bundle, freeGift: e.target.value })
                          }
                          placeholder="Ej. Shaker Pro TopOne gratis"
                          className="w-full text-xs p-1.5 rounded border border-slate-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SCIENTIFIC BENEFITS */}
            {activeTab === 'benefits' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Modifica o añade beneficios destacados.
                  </span>
                  <button
                    type="button"
                    onClick={handleAddBenefit}
                    className="py-1 px-2.5 bg-slate-900 text-white rounded text-xs font-bold flex items-center gap-1 hover:bg-slate-800 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Añadir Beneficio
                  </button>
                </div>

                <div className="space-y-3">
                  {product.benefits.map((b, idx) => (
                    <div key={b.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-700">
                          Beneficio #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteBenefit(idx)}
                          className="text-slate-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Título
                          </label>
                          <input
                            type="text"
                            value={b.title}
                            onChange={(e) =>
                              handleUpdateBenefit(idx, { ...b, title: e.target.value })
                            }
                            className="w-full text-xs p-1.5 rounded border border-slate-300"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Métrica / Stat
                          </label>
                          <input
                            type="text"
                            value={b.stat || ''}
                            onChange={(e) =>
                              handleUpdateBenefit(idx, { ...b, stat: e.target.value })
                            }
                            placeholder="+14% Fuerza máx."
                            className="w-full text-xs p-1.5 rounded border border-slate-300 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Explicación detallada
                        </label>
                        <textarea
                          rows={2}
                          value={b.description}
                          onChange={(e) =>
                            handleUpdateBenefit(idx, { ...b, description: e.target.value })
                          }
                          className="w-full text-xs p-1.5 rounded border border-slate-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sales Arguments Box */}
                <div className="pt-3 border-t border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Argumentos de Venta y Transparencia
                  </h4>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Título del bloque
                    </label>
                    <input
                      type="text"
                      value={product.salesArgumentsTitle || ''}
                      onChange={(e) => updateField('salesArgumentsTitle', e.target.value)}
                      placeholder="La Diferencia TopOneNutrition"
                      className="w-full text-xs p-2 rounded border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Subtítulo explicativo
                    </label>
                    <input
                      type="text"
                      value={product.salesArgumentsSubtitle || ''}
                      onChange={(e) => updateField('salesArgumentsSubtitle', e.target.value)}
                      className="w-full text-xs p-2 rounded border border-slate-300"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {product.reviews.length} opiniones configuradas.
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const newRev: ProductReview = {
                        id: `rev_${Date.now()}`,
                        author: 'Atleta Verificado TopOne',
                        verified: true,
                        date: 'Hace poco',
                        rating: 5,
                        title: 'Excelente calidad comprobada',
                        comment: 'Resultados visibles desde la primera semana de entrenamiento.',
                        objective: 'Fuerza e Hipertrofia',
                      };
                      updateField('reviews', [newRev, ...product.reviews]);
                    }}
                    className="py-1 px-2.5 bg-slate-900 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Añadir Reseña
                  </button>
                </div>

                <div className="space-y-3">
                  {product.reviews.map((rev, idx) => (
                    <div key={rev.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex justify-between items-center gap-2">
                        <input
                          type="text"
                          value={rev.author}
                          onChange={(e) => {
                            const newR = [...product.reviews];
                            newR[idx].author = e.target.value;
                            updateField('reviews', newR);
                          }}
                          placeholder="Nombre del autor"
                          className="text-xs font-bold p-1 rounded border border-slate-300 flex-1"
                        />
                        <select
                          value={rev.rating}
                          onChange={(e) => {
                            const newR = [...product.reviews];
                            newR[idx].rating = parseInt(e.target.value) || 5;
                            updateField('reviews', newR);
                          }}
                          className="text-xs p-1 rounded border border-slate-300"
                        >
                          <option value="5">5 ★</option>
                          <option value="4">4 ★</option>
                          <option value="3">3 ★</option>
                        </select>
                        <button
                          type="button"
                          onClick={() =>
                            updateField(
                              'reviews',
                              product.reviews.filter((_, i) => i !== idx)
                            )
                          }
                          className="text-slate-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={rev.title}
                        onChange={(e) => {
                          const newR = [...product.reviews];
                          newR[idx].title = e.target.value;
                          updateField('reviews', newR);
                        }}
                        placeholder="Titular de la reseña"
                        className="w-full text-xs p-1 rounded border border-slate-300 font-semibold"
                      />

                      <textarea
                        rows={2}
                        value={rev.comment}
                        onChange={(e) => {
                          const newR = [...product.reviews];
                          newR[idx].comment = e.target.value;
                          updateField('reviews', newR);
                        }}
                        className="w-full text-xs p-1.5 rounded border border-slate-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: INGREDIENT COMPARISON */}
            {activeTab === 'comparison' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Etiqueta Superior (Badge)
                  </label>
                  <input
                    type="text"
                    value={product.comparison.badgeTitle ?? 'Transparencia de Ingredientes'}
                    onChange={(e) =>
                      updateField('comparison', { ...product.comparison, badgeTitle: e.target.value })
                    }
                    placeholder="Transparencia de Ingredientes"
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Título de la Sección Comparativa
                  </label>
                  <input
                    type="text"
                    value={product.comparison.title}
                    onChange={(e) =>
                      updateField('comparison', { ...product.comparison, title: e.target.value })
                    }
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subtítulo de la Comparativa
                  </label>
                  <input
                    type="text"
                    value={product.comparison.subtitle}
                    onChange={(e) =>
                      updateField('comparison', { ...product.comparison, subtitle: e.target.value })
                    }
                    className="w-full text-xs p-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-emerald-800 mb-1">
                      Etiqueta Columna TopOne
                    </label>
                    <input
                      type="text"
                      value={product.comparison.topOneLabel}
                      onChange={(e) =>
                        updateField('comparison', { ...product.comparison, topOneLabel: e.target.value })
                      }
                      className="w-full text-xs p-2 rounded border border-emerald-300 bg-emerald-50/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Etiqueta Columna Genérica
                    </label>
                    <input
                      type="text"
                      value={product.comparison.competitorLabel}
                      onChange={(e) =>
                        updateField('comparison', { ...product.comparison, competitorLabel: e.target.value })
                      }
                      className="w-full text-xs p-2 rounded border border-slate-300"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold text-slate-700">Filas de Comparación</span>
                  <button
                    type="button"
                    onClick={handleAddComparisonRow}
                    className="py-1 px-2.5 bg-slate-900 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Añadir Fila
                  </button>
                </div>

                <div className="space-y-3">
                  {product.comparison.rows.map((row, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          value={row.feature}
                          onChange={(e) =>
                            handleUpdateComparisonRow(idx, { ...row, feature: e.target.value })
                          }
                          placeholder="Nombre del parámetro"
                          className="text-xs font-bold p-1 rounded border border-slate-300 w-2/3"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteComparisonRow(idx)}
                          className="text-slate-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="block text-[10px] font-bold text-emerald-700 mb-0.5">
                            TopOneNutrition
                          </label>
                          <input
                            type="text"
                            value={row.topOne}
                            onChange={(e) =>
                              handleUpdateComparisonRow(idx, { ...row, topOne: e.target.value })
                            }
                            className="w-full p-1.5 rounded border border-emerald-300 bg-emerald-50/40 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                            Competidor Genérico
                          </label>
                          <input
                            type="text"
                            value={row.competitor}
                            onChange={(e) =>
                              handleUpdateComparisonRow(idx, { ...row, competitor: e.target.value })
                            }
                            className="w-full p-1.5 rounded border border-slate-300 bg-white text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: NUTRITION & SUPPLEMENT FACTS */}
            {activeTab === 'nutrition' && (
              <div className="space-y-5">
                {/* Section Header Customization */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-[#7cb20b]" />
                    <span>Títulos de la Sección Nutricional</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Etiqueta Superior (Badge)
                    </label>
                    <input
                      type="text"
                      value={product.nutritionalFacts.badgeTitle ?? 'Composición de Grado Clínico'}
                      onChange={(e) =>
                        updateField('nutritionalFacts', {
                          ...product.nutritionalFacts,
                          badgeTitle: e.target.value,
                        })
                      }
                      placeholder="Composición de Grado Clínico"
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Título Principal de la Sección
                    </label>
                    <input
                      type="text"
                      value={product.nutritionalFacts.sectionTitle ?? 'Información Nutricional Oficial'}
                      onChange={(e) =>
                        updateField('nutritionalFacts', {
                          ...product.nutritionalFacts,
                          sectionTitle: e.target.value,
                        })
                      }
                      placeholder="Información Nutricional Oficial"
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Subtítulo Descriptivo
                    </label>
                    <input
                      type="text"
                      value={product.nutritionalFacts.sectionSubtitle ?? 'Valores medios analizados por toma y dosis diaria recomendada.'}
                      onChange={(e) =>
                        updateField('nutritionalFacts', {
                          ...product.nutritionalFacts,
                          sectionSubtitle: e.target.value,
                        })
                      }
                      placeholder="Valores medios analizados por toma y dosis diaria recomendada."
                      className="w-full text-xs p-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                {/* Presentation Mode Selector: Form Table vs Upload Image */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800">
                    Modo de Presentación de la Ficha Técnica
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateField('nutritionalFacts', {
                          ...product.nutritionalFacts,
                          displayMode: 'table',
                        })
                      }
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                        product.nutritionalFacts.displayMode !== 'image'
                          ? 'border-[#7cb20b] bg-[#7cb20b]/10 ring-2 ring-[#7cb20b]/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                        <FileText className="w-4 h-4 text-[#7cb20b]" />
                        <span>Formulario (Tabla)</span>
                      </div>
                      <span className="text-[11px] text-slate-500 leading-snug">
                        Ingredientes, dosis por toma, porciones y % VRN estructurado.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateField('nutritionalFacts', {
                          ...product.nutritionalFacts,
                          displayMode: 'image',
                        })
                      }
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                        product.nutritionalFacts.displayMode === 'image'
                          ? 'border-[#7cb20b] bg-[#7cb20b]/10 ring-2 ring-[#7cb20b]/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                        <Image className="w-4 h-4 text-[#7cb20b]" />
                        <span>Subir Imagen</span>
                      </div>
                      <span className="text-[11px] text-slate-500 leading-snug">
                        Sube una foto o etiqueta oficial sin tener que rellenar filas.
                      </span>
                    </button>
                  </div>
                </div>

                {/* MODE 1: UPLOAD / PASTE IMAGE */}
                {product.nutritionalFacts.displayMode === 'image' && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image className="w-4 h-4 text-emerald-600" />
                        <h4 className="text-xs font-bold text-slate-800">
                          Imagen de la Etiqueta Nutricional
                        </h4>
                      </div>
                      {product.nutritionalFacts.imageUrl && (
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">
                          ✓ Imagen cargada
                        </span>
                      )}
                    </div>

                    {/* File Upload Button */}
                    <div className="flex flex-col gap-2">
                      <label className="block text-[11px] font-bold text-slate-600">
                        1. Subir desde tu equipo (PNG, JPG, WEBP)
                      </label>
                      <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-[#7cb20b] bg-white cursor-pointer transition-colors group">
                        <Upload className="w-6 h-6 text-slate-400 group-hover:text-[#7cb20b] mb-1.5 transition-colors" />
                        <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900">
                          Haz clic para seleccionar archivo de imagen
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5">
                          Se procesa y guarda directamente en tu catálogo
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleNutritionImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Direct Image URL input */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-600">
                        2. O introduce enlace web directo (URL)
                      </label>
                      <input
                        type="url"
                        value={product.nutritionalFacts.imageUrl || ''}
                        onChange={(e) =>
                          updateField('nutritionalFacts', {
                            ...product.nutritionalFacts,
                            imageUrl: e.target.value,
                          })
                        }
                        placeholder="https://ejemplo.com/etiqueta-nutricional.jpg"
                        className="w-full text-xs p-2 rounded-lg border border-slate-300 font-mono"
                      />
                    </div>

                    {/* Image preview */}
                    {product.nutritionalFacts.imageUrl && (
                      <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>Vista previa de la etiqueta:</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateField('nutritionalFacts', {
                                ...product.nutritionalFacts,
                                imageUrl: '',
                              })
                            }
                            className="text-[11px] text-red-500 hover:text-red-700 font-normal cursor-pointer flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Eliminar imagen
                          </button>
                        </div>
                        <div className="flex justify-center bg-slate-100 p-2 rounded max-h-48 overflow-hidden">
                          <img
                            src={product.nutritionalFacts.imageUrl}
                            alt="Preview Etiqueta"
                            className="max-h-44 object-contain rounded"
                          />
                        </div>
                      </div>
                    )}

                    {/* Image Caption */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Pie de imagen / Ficha técnica de lote
                      </label>
                      <input
                        type="text"
                        value={product.nutritionalFacts.imageCaption || ''}
                        onChange={(e) =>
                          updateField('nutritionalFacts', {
                            ...product.nutritionalFacts,
                            imageCaption: e.target.value,
                          })
                        }
                        placeholder="Ficha técnica de lote y análisis de pureza certificado por laboratorio"
                        className="w-full text-xs p-2 rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>
                )}

                {/* MODE 2: STRUCTURED TABLE FORM */}
                {product.nutritionalFacts.displayMode !== 'image' && (
                  <div className="space-y-4">
                    {/* Quick Presets */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-[11px] font-bold text-slate-600 mb-2 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#7cb20b]" />
                        <span>Cargar Plantilla Rápida de Ingredientes:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleLoadNutritionPreset('creatine')}
                          className="px-2.5 py-1 text-[11px] font-bold bg-white hover:bg-slate-100 rounded border border-slate-200 text-slate-800 transition-colors cursor-pointer"
                        >
                          ⚡ Creatina Creapure®
                        </button>
                        <button
                          type="button"
                          onClick={() => handleLoadNutritionPreset('whey')}
                          className="px-2.5 py-1 text-[11px] font-bold bg-white hover:bg-slate-100 rounded border border-slate-200 text-slate-800 transition-colors cursor-pointer"
                        >
                          🥛 Whey Isolate CFM
                        </button>
                        <button
                          type="button"
                          onClick={() => handleLoadNutritionPreset('preworkout')}
                          className="px-2.5 py-1 text-[11px] font-bold bg-white hover:bg-slate-100 rounded border border-slate-200 text-slate-800 transition-colors cursor-pointer"
                        >
                          🔥 Pre-Workout Booster
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Tamaño de la toma
                        </label>
                        <input
                          type="text"
                          value={product.nutritionalFacts.servingSize}
                          onChange={(e) =>
                            updateField('nutritionalFacts', {
                              ...product.nutritionalFacts,
                              servingSize: e.target.value,
                            })
                          }
                          placeholder="3.4g (1 cacito)"
                          className="w-full text-xs p-2 rounded-lg border border-slate-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Tomas por envase
                        </label>
                        <input
                          type="number"
                          value={product.nutritionalFacts.servingsPerContainer}
                          onChange={(e) =>
                            updateField('nutritionalFacts', {
                              ...product.nutritionalFacts,
                              servingsPerContainer: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full text-xs p-2 rounded-lg border border-slate-300 font-mono"
                        />
                      </div>
                    </div>

                    {/* Table of active ingredients editor */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-800">
                          Tabla de Ingredientes Activos ({product.nutritionalFacts.table.length})
                        </span>
                        <button
                          type="button"
                          onClick={handleAddNutritionRow}
                          className="py-1 px-2.5 bg-slate-900 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-slate-800"
                        >
                          <Plus className="w-3.5 h-3.5" /> Añadir Fila
                        </button>
                      </div>

                      <div className="space-y-2">
                        {product.nutritionalFacts.table.map((row, idx) => (
                          <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                            <div className="flex flex-col gap-0.5">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveNutritionRow(idx, 'up')}
                                className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                                title="Subir"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === product.nutritionalFacts.table.length - 1}
                                onClick={() => handleMoveNutritionRow(idx, 'down')}
                                className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                                title="Bajar"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>

                            <input
                              type="text"
                              value={row.ingredient}
                              onChange={(e) =>
                                handleUpdateNutritionRow(idx, { ...row, ingredient: e.target.value })
                              }
                              placeholder="Ingrediente activo"
                              className="flex-1 text-xs p-1.5 rounded border border-slate-300 font-medium"
                            />
                            <input
                              type="text"
                              value={row.perServing}
                              onChange={(e) =>
                                handleUpdateNutritionRow(idx, { ...row, perServing: e.target.value })
                              }
                              placeholder="Por toma (ej: 3400 mg)"
                              className="w-28 text-xs p-1.5 rounded border border-slate-300 font-mono"
                            />
                            <input
                              type="text"
                              value={row.dailyValue || ''}
                              onChange={(e) =>
                                handleUpdateNutritionRow(idx, { ...row, dailyValue: e.target.value })
                              }
                              placeholder="% VRN"
                              className="w-16 text-xs p-1.5 rounded border border-slate-300 font-mono text-center"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteNutritionRow(idx)}
                              className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                              title="Eliminar fila"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Common Nutrition Fields: Usage instructions & Certificates */}
                <div className="pt-2 border-t border-slate-200 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Protocolo de Toma Recomendado (Instrucciones)
                    </label>
                    <textarea
                      rows={3}
                      value={product.nutritionalFacts.usageInstructions}
                      onChange={(e) =>
                        updateField('nutritionalFacts', {
                          ...product.nutritionalFacts,
                          usageInstructions: e.target.value,
                        })
                      }
                      placeholder="Mezclar 1 cacito con 250ml de agua fresca antes de entrenar..."
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sellos de Calidad y Certificados
                    </label>
                    <input
                      type="text"
                      value={product.nutritionalFacts.certificates.join(', ')}
                      onChange={(e) =>
                        updateField('nutritionalFacts', {
                          ...product.nutritionalFacts,
                          certificates: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="Creapure®, Informed-Sport, GMP ISO 22000, 100% Vegano"
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 font-medium"
                    />
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {['Creapure®', 'Informed-Sport', 'GMP Standard ISO 22000', '100% Vegano', 'Sin Gluten', 'Doping Free', 'Glanbia CFM®'].map((sello) => (
                        <button
                          key={sello}
                          type="button"
                          onClick={() => {
                            if (!product.nutritionalFacts.certificates.includes(sello)) {
                              updateField('nutritionalFacts', {
                                ...product.nutritionalFacts,
                                certificates: [...product.nutritionalFacts.certificates, sello],
                              });
                            }
                          }}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer"
                        >
                          + {sello}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 8: FAQS / RESPUESTAS TÉCNICAS */}
            {activeTab === 'faqs' && (
              <div className="space-y-4">
                {/* Header Customization */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4 text-[#7cb20b]" />
                    <span>Títulos de la Sección FAQs</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Etiqueta Superior (Badge)
                    </label>
                    <input
                      type="text"
                      value={product.faqBadge ?? 'Respuestas Técnicas'}
                      onChange={(e) => updateField('faqBadge', e.target.value)}
                      placeholder="Respuestas Técnicas"
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Título Principal de Preguntas Frecuentes
                    </label>
                    <input
                      type="text"
                      value={product.faqTitle ?? `Preguntas Frecuentes sobre ${product.name.split(' ')[0]}`}
                      onChange={(e) => updateField('faqTitle', e.target.value)}
                      placeholder={`Preguntas Frecuentes sobre ${product.name.split(' ')[0]}`}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Subtítulo Descriptivo
                    </label>
                    <input
                      type="text"
                      value={product.faqSubtitle ?? 'Todo lo que necesitas saber antes de empezar tu suplementación con TopOneNutrition.'}
                      onChange={(e) => updateField('faqSubtitle', e.target.value)}
                      placeholder="Todo lo que necesitas saber antes de empezar tu suplementación con TopOneNutrition."
                      className="w-full text-xs p-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                {/* FAQ List and Actions */}
                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs font-bold text-slate-800">
                    Preguntas Configuradas ({product.faqs.length})
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleLoadSuggestedFaqs}
                      className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors border border-slate-200"
                      title="Cargar 4 preguntas frecuentes habituales"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#7cb20b]" /> Cargar Sugeridas
                    </button>
                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="py-1 px-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Añadir FAQ
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {product.faqs.map((faq, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5 shadow-2xs">
                      <div className="flex justify-between items-center pb-1 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                            #{idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-700 truncate max-w-[200px]">
                            {faq.question || 'Pregunta sin título'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveFaq(idx, 'up')}
                            className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                            title="Subir"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === product.faqs.length - 1}
                            onClick={() => handleMoveFaq(idx, 'down')}
                            className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                            title="Bajar"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteFaq(idx)}
                            className="p-1 text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                            title="Eliminar pregunta"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Pregunta formulada
                        </label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) =>
                            handleUpdateFaq(idx, { ...faq, question: e.target.value })
                          }
                          placeholder="¿Pregunta frecuente?"
                          className="text-xs font-bold p-2 rounded-lg border border-slate-300 w-full bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Respuesta técnica y clara
                        </label>
                        <textarea
                          rows={3}
                          value={faq.answer}
                          onChange={(e) =>
                            handleUpdateFaq(idx, { ...faq, answer: e.target.value })
                          }
                          placeholder="Escribe la respuesta detallada..."
                          className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 9: GUARANTEE */}
            {activeTab === 'guarantee' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Días de Garantía de Satisfacción
                  </label>
                  <input
                    type="number"
                    value={product.guaranteeDays}
                    onChange={(e) => updateField('guaranteeDays', parseInt(e.target.value) || 30)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Titular de la Garantía
                  </label>
                  <input
                    type="text"
                    value={product.guaranteeTitle || ''}
                    onChange={(e) => updateField('guaranteeTitle', e.target.value)}
                    placeholder="Prueba sin riesgo durante 30 días"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Descripción / Compromiso de Devolución
                  </label>
                  <textarea
                    rows={4}
                    value={product.guaranteeDescription || ''}
                    onChange={(e) => updateField('guaranteeDescription', e.target.value)}
                    placeholder="Estamos tan seguros de la pureza y eficacia de nuestras fórmulas..."
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                  />
                </div>
              </div>
            )}

            {/* TAB 10: SECTIONS VISIBILITY */}
            {activeTab === 'sections' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 mb-3">
                  Activa o desactiva módulos de la landing según tu estrategia de venta:
                </p>

                {(Object.keys(product.sectionsConfig) as Array<keyof typeof product.sectionsConfig>).map(
                  (sectionKey) => {
                    const labels: Record<string, string> = {
                      hero: 'Sección Principal Hero (Titular, Galería Sticky, Botón Comprar)',
                      bundles: 'Bloque de Ofertas y Packs',
                      benefits: 'Beneficios Científicos & Argumentos de Venta',
                      reviews: 'Opiniones Verificadas de Compradores',
                      comparison: 'Tabla Comparativa de Calidad',
                      nutrition: 'Ficha de Información Nutricional Oficial',
                      faqs: 'Acordeón de Preguntas Frecuentes',
                      guarantee: 'Garantía y Devolución',
                    };

                    const isChecked = product.sectionsConfig[sectionKey];

                    return (
                      <label
                        key={sectionKey}
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
                      >
                        <span className="text-xs font-semibold text-slate-800">
                          {labels[sectionKey] || sectionKey}
                        </span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            updateField('sectionsConfig', {
                              ...product.sectionsConfig,
                              [sectionKey]: e.target.checked,
                            })
                          }
                          className="w-4 h-4 text-[#7cb20b] rounded focus:ring-[#7cb20b]"
                        />
                      </label>
                    );
                  }
                )}
              </div>
            )}

            {/* TAB 11: THEME & BRAND COLORS */}
            {activeTab === 'colors' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Color Corporativo Principal
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={product.accentColor}
                      onChange={(e) => updateField('accentColor', e.target.value)}
                      className="w-10 h-10 rounded border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={product.accentColor}
                      onChange={(e) => updateField('accentColor', e.target.value)}
                      className="text-xs p-2 rounded border border-slate-300 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => updateField('accentColor', '#7cb20b')}
                      className="text-xs text-[#659208] hover:underline cursor-pointer"
                    >
                      Restaurar Verde TopOne (#7cb20b)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Color Terciario / Alertas
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={product.secondaryColor || '#dc2626'}
                      onChange={(e) => updateField('secondaryColor', e.target.value)}
                      className="w-10 h-10 rounded border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={product.secondaryColor || '#dc2626'}
                      onChange={(e) => updateField('secondaryColor', e.target.value)}
                      className="text-xs p-2 rounded border border-slate-300 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => updateField('secondaryColor', '#dc2626')}
                      className="text-xs text-red-600 hover:underline cursor-pointer"
                    >
                      Restaurar Rojo (#dc2626)
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Quick Footer inside Left Panel */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              URL: <strong className="font-mono text-slate-700">/producto/{product.slug}</strong>
            </span>
            <button
              onClick={handleSave}
              className="py-1.5 px-4 bg-[#7cb20b] hover:bg-[#6fa00a] text-slate-950 font-bold rounded cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>

        </aside>

        {/* RIGHT PANEL: Live Interactive Preview */}
        <main className="flex-1 bg-slate-200 overflow-y-auto flex items-start justify-center p-4 sm:p-6">
          <div
            className={`transition-all duration-300 bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-300 ${
              previewDevice === 'mobile'
                ? 'w-[390px] min-h-[800px] border-8 border-slate-800 rounded-[38px] my-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
                : 'w-full max-w-[1280px] min-h-screen'
            }`}
          >
            {/* Visual device notch for mobile mockup */}
            {previewDevice === 'mobile' && (
              <div className="h-6 bg-slate-800 flex items-center justify-center">
                <div className="w-24 h-3.5 bg-black rounded-b-xl" />
              </div>
            )}

            {/* Simulated Top Notification Bar */}
            <div className="bg-slate-900 text-white text-[10px] sm:text-xs py-1.5 px-3 flex justify-between items-center font-mono">
              <span>VISTA PREVIA EN TIEMPO REAL · 100% EDITABLE</span>
              <span className="text-[#7cb20b]">TopOneNutrition Live Sync</span>
            </div>

            {/* Actual Live Landing Page Component */}
            <ProductLandingPage
              product={product}
              onAddToCart={() => alert('¡Simulación de añadir al carrito exitosa!')}
              onBuyNow={() => alert('¡Simulación de compra directa iniciada!')}
              onAddReview={(rev) => updateField('reviews', [rev, ...product.reviews])}
              isPreviewMode={true}
            />
          </div>
        </main>

      </div>
    </div>
  );
};
