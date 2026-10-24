import React, { useState } from 'react';
import { Product, CustomerOrder, OrderStatus } from '../../types/product';
import { BlogPost, BlogCategory } from '../../types/blog';
import { VisualBuilder } from './VisualBuilder';
import { BlogVisualBuilder } from './BlogVisualBuilder';
import { SupplementVisual } from '../common/SupplementVisual';
import {
  Layers, Plus, Edit3, Copy, Trash2, Eye, CheckCircle2,
  XCircle, ArrowRight, ShieldCheck, TrendingUp, ShoppingBag, Sparkles, RefreshCw,
  Package, MapPin, Phone, CreditCard, Clock, MessageCircle, X, Search, Filter,
  BookOpen, Tag, FileText, Globe, Check
} from 'lucide-react';
import { formatCOP } from '../../lib/currency';

interface AdminDashboardProps {
  products: Product[];
  orders: CustomerOrder[];
  blogPosts: BlogPost[];
  onUpdateProduct: (product: Product) => void;
  onCreateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onDuplicateProduct: (product: Product) => void;
  onSelectProductToView: (product: Product) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onDeleteOrder: (orderId: string) => void;
  onUpdateBlogPost: (post: BlogPost) => void;
  onCreateBlogPost: (post: BlogPost) => void;
  onDeleteBlogPost: (postId: string) => void;
  onDuplicateBlogPost: (post: BlogPost) => void;
  onSelectBlogPostToView: (post: BlogPost) => void;
  onResetDefaults: () => void;
  onCloseAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  blogPosts,
  onUpdateProduct,
  onCreateProduct,
  onDeleteProduct,
  onDuplicateProduct,
  onSelectProductToView,
  onUpdateOrderStatus,
  onDeleteOrder,
  onUpdateBlogPost,
  onCreateBlogPost,
  onDeleteBlogPost,
  onDuplicateBlogPost,
  onSelectBlogPostToView,
  onResetDefaults,
  onCloseAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'blog' | 'orders'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>('all');
  const [blogStatusFilter, setBlogStatusFilter] = useState<string>('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<CustomerOrder | null>(null);

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesQuery =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.phone.includes(searchQuery) ||
      o.customer.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesQuery && matchesStatus;
  });

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const pendingOrdersCount = orders.filter((o) => o.status === 'en_preparacion').length;

  const handleCreateNew = () => {
    const newId = `prod_${Date.now()}`;
    const newProduct: Product = {
      id: newId,
      slug: `nuevo-suplemento-${products.length + 1}`,
      name: `Nuevo Suplemento Pro #${products.length + 1}`,
      tagline: 'Fórmula de vanguardia para atletas de alto rendimiento',
      category: 'creatina',
      badge: 'Fórmula Avanzada Certificada',
      rating: 5.0,
      reviewsCount: 1,
      basePrice: 29.90,
      originalPrice: 39.90,
      flavors: ['Neutro', 'Frutas del Bosque'],
      sizes: ['500g', '1000g'],
      imageType: 'creatine',
      accentColor: '#7cb20b',
      secondaryColor: '#dc2626',
      canisterColor: 'dark',
      heroTitle: 'Maximiza tu Potencial Físico con la Nueva Fórmula TopOneNutrition',
      heroSubtitle: 'Diseñado bajo los más estrictos estándares de pureza y asimilación biológica para deportistas exigentes.',
      heroBullets: [
        'Materia prima testada por lote en laboratorios independientes',
        'Máxima biodisponibilidad y solubilidad instantánea',
        '0% azúcares añadidos ni rellenos de maltodextrina',
      ],
      ctaText: 'Comprar ahora con 15% Descuento',
      guaranteeDays: 30,
      guaranteeTitle: 'Garantía Incondicional de 30 Días',
      guaranteeDescription: 'Si no notas mejoras en tu rendimiento o si no te convence el sabor, te devolvemos el 100% de tu dinero.',
      stockStatus: 'in_stock',
      published: true,
      bundles: [
        {
          id: `b_new_1`,
          name: '1 Bote (Iniciación)',
          units: 1,
          price: 29.90,
          originalPrice: 39.90,
          savingsText: 'Ahorro 10.00€',
        },
        {
          id: `b_new_2`,
          name: 'Pack Doble Ahorro (2 Botes)',
          units: 2,
          badge: 'MÁS VENDIDO · AHORRA 20%',
          price: 52.90,
          originalPrice: 79.80,
          savingsText: 'Ahorras 26.90€',
          popular: true,
          freeGift: 'Shaker Pro Gratis',
        },
      ],
      benefits: [
        {
          id: 'b1',
          icon: 'zap',
          title: 'Máxima Absorción Biológica',
          description: 'Micropartículas optimizadas para una llegada celular inmediata.',
          stat: '100% Celular',
        },
        {
          id: 'b2',
          icon: 'shield-check',
          title: 'Pureza Garantizada HPLC',
          description: 'Cero metales pesados ni contaminantes cruzados.',
          stat: '99.9% Pureza',
        },
      ],
      comparison: {
        title: 'Comparativa de Calidad y Pureza',
        subtitle: 'Comprueba por qué nuestra fórmula supera a los genéricos del mercado.',
        topOneLabel: 'TopOneNutrition Pro',
        competitorLabel: 'Marca Genérica Comercial',
        rows: [
          {
            feature: 'Pureza de Materia Prima',
            topOne: '99.9% Certificado en la UE',
            competitor: 'Origen no declarado',
            topOneHighlight: true,
          },
          {
            feature: 'Digestión y Solubilidad',
            topOne: 'Disolución limpia inmediata',
            competitor: 'Gránulos ásperos y sedimentos',
            topOneHighlight: true,
          },
        ],
      },
      nutritionalFacts: {
        badgeTitle: 'Composición de Grado Clínico',
        sectionTitle: 'Información Nutricional Oficial',
        sectionSubtitle: 'Valores medios analizados por toma y dosis diaria recomendada.',
        displayMode: 'table',
        servingSize: '10g (1 dosificador)',
        servingsPerContainer: 50,
        table: [
          { ingredient: 'Compuesto Activo Principal', perServing: '8000 mg', dailyValue: '**' },
          { ingredient: 'Matriz de Absorción Mineral', perServing: '500 mg', dailyValue: '50%' },
        ],
        certificates: ['GMP Quality', 'ISO 22000', 'Informed-Sport'],
        usageInstructions: 'Mezclar 1 dosificador en 250ml de agua fresca antes o después de entrenar.',
      },
      reviews: [
        {
          id: `r_first`,
          author: 'Atleta Verificado',
          verified: true,
          date: 'Reciente',
          rating: 5,
          title: 'Increíble sabor y digestión perfecta',
          comment: 'La mejor compra que he hecho para mi preparación.',
          objective: 'Rendimiento y Potencia',
        },
      ],
      faqBadge: 'Respuestas Técnicas',
      faqTitle: 'Preguntas Frecuentes sobre este Suplemento',
      faqSubtitle: 'Todo lo que necesitas saber antes de empezar tu suplementación con TopOneNutrition.',
      faqs: [
        {
          question: '¿Cuándo empezaré a notar los resultados?',
          answer: 'Desde las primeras tomas con uso continuado según el protocolo recomendado.',
        },
        {
          question: '¿Cómo y cuándo se recomienda tomar este producto?',
          answer: 'Mezclar una toma con 250ml de agua fresca antes o después del entrenamiento.',
        },
      ],
      sectionsConfig: {
        hero: true,
        bundles: true,
        benefits: true,
        comparison: true,
        nutrition: true,
        reviews: true,
        faqs: true,
        guarantee: true,
      },
    };

    onCreateProduct(newProduct);
    setEditingProduct(newProduct);
  };

  const handleCreateNewBlogPost = () => {
    const newId = `post_${Date.now()}`;
    const newPost: BlogPost = {
      id: newId,
      slug: `nuevo-articulo-nutricion-${blogPosts.length + 1}`,
      title: `Nuevo Artículo de Nutrición y Rendimiento #${blogPosts.length + 1}`,
      subtitle: 'Resumen introductorio que explica las claves de esta guía especializada.',
      coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      coverImageCaption: 'Fotografía técnica de nutrición deportiva de alta precisión.',
      category: 'Suplementación',
      tags: ['Nutrición', 'Rendimiento', 'TopOneNutrition'],
      author: {
        name: 'Equipo Técnico TopOneNutrition',
        role: 'Especialistas en Ciencias del Deporte',
      },
      publishedAt: new Date().toISOString().split('T')[0],
      readTimeMinutes: 5,
      status: 'draft',
      attachedProductIds: products.length > 0 ? [products[0].id] : [],
      relatedPostIds: blogPosts.slice(0, 2).map((p) => p.id),
      seoTitle: `Nuevo Artículo #${blogPosts.length + 1} | Blog TopOneNutrition`,
      seoDescription: 'Aprende los protocolos comprobados de suplementación y entrenamiento con TopOneNutrition.',
      blocks: [
        {
          id: `b_${Date.now()}_1`,
          type: 'paragraph',
          content: 'Escribe aquí la introducción de tu nuevo artículo explicando la importancia de este tema para el rendimiento físico...',
        },
        {
          id: `b_${Date.now()}_2`,
          type: 'heading',
          level: 'h2',
          title: 'Fundamentos Biomecánicos y Fisiológicos',
        },
        {
          id: `b_${Date.now()}_3`,
          type: 'paragraph',
          content: 'Detalla aquí las adaptaciones y ventajas de aplicar esta estrategia de suplementación...',
        },
        {
          id: `b_${Date.now()}_4`,
          type: 'callout',
          calloutType: 'science',
          calloutTitle: 'Recomendación Científica',
          calloutText: 'Mantener un aporte constante garantiza la máxima concentración de nutrientes en plasma celular.',
        },
        {
          id: `b_${Date.now()}_5`,
          type: 'product_card',
          productId: products[0]?.id || '',
        },
      ],
    };

    onCreateBlogPost(newPost);
    setEditingBlogPost(newPost);
  };

  // If in Visual Builder mode for a product
  if (editingProduct) {
    return (
      <VisualBuilder
        initialProduct={editingProduct}
        onSave={(updated) => {
          onUpdateProduct(updated);
          setEditingProduct(updated);
        }}
        onCancel={() => setEditingProduct(null)}
        onPreviewLive={(p) => {
          onSelectProductToView(p);
          onCloseAdmin();
        }}
      />
    );
  }

  // If in Visual Builder mode for a blog post
  if (editingBlogPost) {
    return (
      <BlogVisualBuilder
        initialPost={editingBlogPost}
        allPosts={blogPosts}
        allProducts={products}
        onSave={(updated) => {
          onUpdateBlogPost(updated);
          setEditingBlogPost(updated);
        }}
        onCancel={() => setEditingBlogPost(null)}
        onPreviewLive={(p) => {
          onSelectBlogPostToView(p);
          onCloseAdmin();
        }}
        onSelectProduct={onSelectProductToView}
      />
    );
  }

  const publishedCount = products.filter((p) => p.published).length;

  const paymentMethodLabels: Record<string, string> = {
    card: 'Tarjeta (Visa/MC)',
    bizum: 'Bizum',
    cod: 'Contraentrega',
    whatsapp: 'WhatsApp',
  };

  const statusColors: Record<OrderStatus, string> = {
    en_preparacion: 'bg-amber-100 text-amber-900 border-amber-300',
    enviado: 'bg-sky-100 text-sky-900 border-sky-300',
    entregado: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    cancelado: 'bg-rose-100 text-rose-900 border-rose-300',
  };

  const statusLabels: Record<OrderStatus, string> = {
    en_preparacion: 'En preparación',
    enviado: 'Enviado',
    entregado: 'Entregado',
    cancelado: 'Cancelado',
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Admin Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#7cb20b] text-slate-950 font-black text-xs flex items-center justify-center">
              CMS
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-base font-normal text-white font-gunplay uppercase tracking-wider">
                  TopOneNutrition · Dashboard Administrativo
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Turso DB: Conectado
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Landings de Productos & Gestión Integral de Pedidos (Base de Datos en Tiempo Real)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetDefaults}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Restaurar las landings originales de demostración"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar</span>
            </button>

            <button
              onClick={onCloseAdmin}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-900 bg-[#7cb20b] hover:bg-[#6fa00a] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Ver Tienda en Vivo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4 border-t border-slate-800 text-xs font-semibold overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-[#7cb20b] text-[#7cb20b] font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Landings de Productos ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            className={`py-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'blog'
                ? 'border-[#7cb20b] text-[#7cb20b] font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#7cb20b]" />
            <span>Constructor de Blogs ({blogPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#7cb20b] text-[#7cb20b] font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pedidos de Clientes ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {pendingOrdersCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* ========================================================= */}
        {/* TAB 1: PRODUCT LANDINGS & VISUAL BUILDER MANAGER          */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* KPI Metric Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Productos</span>
                  <Layers className="w-4 h-4 text-[#7cb20b]" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {products.length}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {publishedCount} publicadas en tienda
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Arquitectura</span>
                  <Sparkles className="w-4 h-4 text-[#7cb20b]" />
                </div>
                <div className="text-sm font-bold text-slate-900">
                  1 Landing Dedicada / Producto
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-1">
                  2 Columnas con Galería Sticky
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Constructor Visual</span>
                  <Edit3 className="w-4 h-4 text-[#7cb20b]" />
                </div>
                <div className="text-sm font-bold text-slate-900">
                  100% Editable en Vivo
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Textos, packs, comparativa y nutrición
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Pedidos</span>
                  <ShoppingBag className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {orders.length}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-mono">
                  {formatCOP(totalRevenue)} recaudados
                </div>
              </div>
            </div>

            {/* Toolbar & Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar producto o slug..."
                    className="text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 w-full focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                  />
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                >
                  <option value="all">Todas las categorías</option>
                  <option value="hipercalorica">Hipercalórica / Mass Gainer</option>
                  <option value="proteina">Proteína (WPI / Isolate / Beef)</option>
                  <option value="creatina">Creatina (CrM)</option>
                  <option value="preentreno">Pre-entreno</option>
                  <option value="intra-entreno">Intra-entreno</option>
                  <option value="aminoacidos">Aminoácidos</option>
                  <option value="termogenico">Termogénico</option>
                  <option value="multivitaminico">Multivitamínico</option>
                  <option value="recuperacion">Recuperación</option>
                  <option value="accesorios">Accesorios Tácticos</option>
                </select>
              </div>

              <button
                onClick={handleCreateNew}
                className="w-full sm:w-auto py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4 text-[#7cb20b]" />
                <span>Crear Nueva Landing Page de Producto</span>
              </button>
            </div>

            {/* Product Cards Table/Grid */}
            <div className="space-y-3">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:border-slate-300 transition-all shadow-xs"
                >
                  <div className="flex items-start gap-4">
                    {/* Visual miniature indicator */}
                    <div className="w-12 h-14 rounded-lg bg-slate-900 text-white flex flex-col items-center justify-center font-bold text-xs shrink-0 font-mono shadow-xs">
                      <span className="text-[#7cb20b] text-[10px]">T1</span>
                      <span className="text-[10px]">{p.category.slice(0, 3).toUpperCase()}</span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-normal text-slate-900 font-gunplay uppercase tracking-wide">
                          {p.name}
                        </h3>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            p.published
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {p.published ? 'PUBLICADA' : 'BORRADOR'}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                        <span className="font-mono text-slate-700">/producto/{p.slug}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums font-semibold text-slate-900">
                          Desde {formatCOP(p.basePrice)}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{p.bundles.length} ofertas/packs</span>
                        <span aria-hidden="true">·</span>
                        <span>{p.reviews.length} opiniones</span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                    <button
                      onClick={() => {
                        onSelectProductToView(p);
                        onCloseAdmin();
                      }}
                      className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Ver landing pública"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Ver Landing</span>
                    </button>

                    <button
                      onClick={() => onDuplicateProduct(p)}
                      className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      title="Duplicar landing como nueva plantilla"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setEditingProduct(p)}
                      className="py-2 px-3.5 bg-[#7cb20b] hover:bg-[#6fa00a] text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                      title="Abrir en Constructor Visual en Vivo"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Diseñar en Constructor</span>
                    </button>

                    {products.length > 1 && (
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar la landing page de "${p.name}"?`)) {
                            onDeleteProduct(p.id);
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: CONSTRUCTOR DE BLOGS DE TOPONENUTRITION            */}
        {/* ========================================================= */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            {/* Blog KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Artículos</span>
                  <BookOpen className="w-4 h-4 text-[#7cb20b]" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {blogPosts.length}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  En el blog corporativo
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Publicados</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-emerald-700 font-mono">
                  {blogPosts.filter((b) => b.status === 'published').length}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Visibles para los lectores y Google
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Borradores</span>
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-amber-600 font-mono">
                  {blogPosts.filter((b) => b.status === 'draft').length}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  En edición privada
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Productos Anexados</span>
                  <ShoppingBag className="w-4 h-4 text-[#7cb20b]" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {blogPosts.reduce((acc, p) => acc + p.attachedProductIds.length, 0)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Enlaces internos hacia landings
                </div>
              </div>
            </div>

            {/* Filter and New Article Action Bar */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 flex-col sm:flex-row gap-3 w-full">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar artículo por título, tema o slug..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                  />
                </div>

                {/* Category filter */}
                <div className="w-full sm:w-48">
                  <select
                    value={blogCategoryFilter}
                    onChange={(e) => setBlogCategoryFilter(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                  >
                    <option value="all">Todas las Categorías</option>
                    <option value="Suplementación">Suplementación</option>
                    <option value="Nutrición">Nutrición</option>
                    <option value="Entrenamiento">Entrenamiento</option>
                    <option value="Ciencia Deportiva">Ciencia Deportiva</option>
                    <option value="Salud y Bienestar">Salud y Bienestar</option>
                  </select>
                </div>

                {/* Status filter */}
                <div className="w-full sm:w-40">
                  <select
                    value={blogStatusFilter}
                    onChange={(e) => setBlogStatusFilter(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                  >
                    <option value="all">Todos los Estados</option>
                    <option value="published">Solo Publicados</option>
                    <option value="draft">Solo Borradores</option>
                  </select>
                </div>
              </div>

              {/* Create new article button */}
              <button
                type="button"
                onClick={handleCreateNewBlogPost}
                className="w-full md:w-auto py-2 px-4 bg-[#7cb20b] hover:bg-[#6fa00a] text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Artículo</span>
              </button>
            </div>

            {/* Articles List */}
            <div className="space-y-3">
              {blogPosts
                .filter((p) => {
                  const matchesSearch =
                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
                  const matchesCat =
                    blogCategoryFilter === 'all' || p.category === blogCategoryFilter;
                  const matchesStatus =
                    blogStatusFilter === 'all' || p.status === blogStatusFilter;
                  return matchesSearch && matchesCat && matchesStatus;
                })
                .map((postItem) => {
                  const linkedProducts = products.filter((prod) =>
                    postItem.attachedProductIds.includes(prod.id) ||
                    postItem.attachedProductIds.includes(prod.slug)
                  );

                  return (
                    <div
                      key={postItem.id}
                      className="p-4 sm:p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                    >
                      {/* Left: Thumbnail and Details */}
                      <div className="flex items-start gap-4 min-w-0 flex-1">
                        <div className="w-20 h-16 sm:w-28 sm:h-20 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          <img
                            src={postItem.coverImage}
                            alt={postItem.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#659208] bg-[#7cb20b]/10 px-2 py-0.5 rounded">
                              {postItem.category}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                postItem.status === 'published'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                              }`}
                            >
                              {postItem.status === 'published' ? 'PUBLICADO' : 'BORRADOR'}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {postItem.publishedAt} · {postItem.readTimeMinutes} min
                            </span>
                          </div>

                          <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1 line-clamp-1">
                            {postItem.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                            <span className="font-mono text-slate-700">/blog/{postItem.slug}</span>
                            <span aria-hidden="true">·</span>
                            <span>{postItem.blocks.length} bloques de contenido</span>
                            {linkedProducts.length > 0 && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="text-[#659208] font-semibold flex items-center gap-1">
                                  <ShoppingBag className="w-3 h-3" />
                                  {linkedProducts.length} producto{linkedProducts.length > 1 ? 's' : ''} anexado{linkedProducts.length > 1 ? 's' : ''}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectBlogPostToView(postItem);
                            onCloseAdmin();
                          }}
                          className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Ver artículo público en la tienda"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Ver Artículo</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onDuplicateBlogPost(postItem)}
                          className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                          title="Duplicar artículo"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingBlogPost(postItem)}
                          className="py-2 px-3.5 bg-[#7cb20b] hover:bg-[#6fa00a] text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                          title="Abrir en Constructor Visual de Blog"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Diseñar Artículo</span>
                        </button>

                        {blogPosts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`¿Eliminar el artículo "${postItem.title}"?`)) {
                                onDeleteBlogPost(postItem.id);
                              }
                            }}
                            className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                            title="Eliminar artículo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: GESTIÓN DE PEDIDOS (CUSTOMER ORDERS)                */}
        {/* ========================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Orders KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Total Pedidos Registrados
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {orders.length}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  100% con datos de entrega completos
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Ingresos Totales (COP)
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                  {formatCOP(totalRevenue)}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-1">
                  Ventas efectivas
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Ticket Medio por Compra
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                  {formatCOP(avgOrderValue)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Impulsado por los packs de ahorro
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Pedidos en Preparación
                </div>
                <div className="text-2xl font-black text-amber-600 font-mono">
                  {pendingOrdersCount}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Requieren empaquetado y envío
                </div>
              </div>
            </div>

            {/* Orders Filter Toolbar */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por cliente, tel, ciudad o ID..."
                    className="text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 w-full focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                >
                  <option value="all">Todos los estados</option>
                  <option value="en_preparacion">En preparación</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>

              <div className="text-xs text-slate-500 font-mono">
                Mostrando <strong>{filteredOrders.length}</strong> pedidos
              </div>
            </div>

            {/* Orders List Table */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-700">No hay pedidos con este filtro</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Cuando los clientes completen compras en las landings, aparecerán listados aquí con todos sus datos.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                  >
                    {/* Left: Order Info & Customer Details */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-sm font-black text-slate-950">
                          {order.id}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          · {new Date(order.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>

                        {/* Status badge with selector */}
                        <div className="relative inline-block ml-2">
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer ${statusColors[order.status]}`}
                          >
                            <option value="en_preparacion">En preparación</option>
                            <option value="enviado">Enviado</option>
                            <option value="entregado">Entregado</option>
                            <option value="cancelado">Cancelado</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer info card */}
                      <div className="text-xs text-slate-700 space-y-1">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{order.customer.name}</span>
                          <span className="text-slate-400 font-normal">|</span>
                          <span className="font-mono text-slate-600">{order.customer.phone}</span>
                        </div>
                        <div className="text-slate-600 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{order.customer.address}, {order.customer.postalCode} {order.customer.city}</span>
                        </div>
                        {order.customer.notes && (
                          <div className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                            Nota: {order.customer.notes}
                          </div>
                        )}
                      </div>

                      {/* Items thumbnails preview */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {order.items.map((item, i) => (
                          <div
                            key={i}
                            className="text-[11px] bg-slate-50 border border-slate-200 rounded-md px-2 py-1 flex items-center gap-1.5"
                          >
                            <span className="font-bold text-slate-900">{item.product.name.split(' ')[0]}</span>
                            <span className="text-slate-500">({item.bundle.name})</span>
                            <span className="font-bold text-[#659208]">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Payment, Total and Action Buttons */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-xs text-slate-500">
                          {paymentMethodLabels[order.paymentMethod] || order.paymentMethod}
                        </div>
                        <div className="text-lg font-black text-slate-900 font-mono tabular-nums">
                          {formatCOP(order.total)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrderDetails(order)}
                          className="py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#7cb20b]" />
                          <span>Ver Ficha Completa</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar el pedido ${order.id}?`)) {
                              onDeleteOrder(order.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                          title="Eliminar pedido de prueba"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </main>

      {/* FULL CUSTOMER ORDER DETAILS MODAL (ALL FIELDS THE CLIENT FILLED) */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b border-slate-200 pb-4 mb-5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#7cb20b] font-bold uppercase tracking-wider">
                <Package className="w-4 h-4" />
                <span>Expediente de Pedido del Cliente</span>
              </div>
              <h3 className="text-xl font-normal text-slate-900 font-gunplay uppercase tracking-wide mt-1 flex items-center gap-2">
                <span>{selectedOrderDetails.id}</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border ${statusColors[selectedOrderDetails.status]}`}>
                  {statusLabels[selectedOrderDetails.status]}
                </span>
              </h3>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                Registrado el {new Date(selectedOrderDetails.createdAt).toLocaleString('es-ES')}
              </div>
            </div>

            {/* Customer Filled Fields Grid */}
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <h4 className="text-xs font-normal uppercase tracking-wider text-slate-800 font-gunplay">
                  Campos Llenados por el Cliente
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Nombre y Apellidos:</span>
                    <strong className="text-slate-900 text-sm">{selectedOrderDetails.customer.name}</strong>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Teléfono de Contacto:</span>
                    <strong className="text-slate-900 text-sm font-mono">{selectedOrderDetails.customer.phone}</strong>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 sm:col-span-2">
                    <span className="text-slate-500 block text-[11px]">Dirección de Envío Completa:</span>
                    <strong className="text-slate-900 text-sm">
                      {selectedOrderDetails.customer.address}, {selectedOrderDetails.customer.postalCode} {selectedOrderDetails.customer.city}
                    </strong>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Método de Pago Elegido:</span>
                    <strong className="text-slate-900 text-xs">
                      {paymentMethodLabels[selectedOrderDetails.paymentMethod] || selectedOrderDetails.paymentMethod}
                    </strong>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Notas de Entrega / Timbre:</span>
                    <span className="text-slate-800 text-xs">
                      {selectedOrderDetails.customer.notes || 'Ninguna especificada'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items in this order with visuals */}
              <div>
                <h4 className="text-xs font-normal uppercase tracking-wider text-slate-800 mb-2 font-gunplay">
                  Productos y Packs Incluidos
                </h4>
                <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden bg-white">
                  {selectedOrderDetails.items.map((item, i) => (
                    <div key={i} className="p-3.5 flex items-center gap-3.5">
                      <div className="w-14 h-16 rounded-lg bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                        <SupplementVisual product={item.product} size="sm" className="scale-65" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {item.product.name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {item.bundle.name} · {item.selectedFlavor} · {item.selectedSize}
                        </div>
                        {item.bundle.freeGift && (
                          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                            🎁 {item.bundle.freeGift}
                          </div>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-mono text-slate-500">
                          {item.quantity} x {formatCOP(item.bundle.price)}
                        </div>
                        <div className="text-sm font-mono font-black text-slate-900">
                          {formatCOP(item.bundle.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals Breakdown */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-mono font-semibold text-slate-900">{formatCOP(selectedOrderDetails.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Envío:</span>
                  <span className="font-mono">
                    {selectedOrderDetails.shippingCost === 0 ? 'GRATIS' : formatCOP(selectedOrderDetails.shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Cobrado:</span>
                  <span className="font-mono text-base">{formatCOP(selectedOrderDetails.total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${selectedOrderDetails.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hola ${selectedOrderDetails.customer.name}, te escribimos desde TopOneNutrition sobre tu pedido ${selectedOrderDetails.id}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contactar al Cliente por WhatsApp</span>
                </a>

                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="py-2.5 px-5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
