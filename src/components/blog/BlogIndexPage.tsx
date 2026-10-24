import React, { useState } from 'react';
import { BlogPost, BlogCategory } from '../../types/blog';
import { Product } from '../../types/product';
import { Search, Calendar, Clock, ArrowRight, ChevronRight, Sparkles, Filter, BookOpen } from 'lucide-react';

interface BlogIndexPageProps {
  posts: BlogPost[];
  allProducts: Product[];
  onSelectPost: (post: BlogPost) => void;
  onSelectProduct: (product: Product) => void;
  onBackToShop: () => void;
}

const CATEGORIES: ('Todas' | BlogCategory)[] = [
  'Todas',
  'Suplementación',
  'Nutrición',
  'Entrenamiento',
  'Ciencia Deportiva',
  'Salud y Bienestar',
];

export const BlogIndexPage: React.FC<BlogIndexPageProps> = ({
  posts,
  allProducts,
  onSelectPost,
  onSelectProduct,
  onBackToShop,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'Todas' | BlogCategory>('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter published posts (or all if in admin context)
  const publishedPosts = posts.filter((p) => p.status === 'published');

  const filteredPosts = publishedPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'Todas' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0] || publishedPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-12 sm:py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7cb20b]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#7cb20b] mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Ciencia & Nutrición de Alto Rendimiento</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal font-gunplay uppercase tracking-wide text-white leading-tight">
              Blog & Guías Técnicas TopOneNutrition
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Artículos fundamentados en evidencia científica, protocolos de suplementación clínica y estrategias de rendimiento para atletas y deportistas exigentes.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por tema (creatina, leucina, pre-entreno, hidratación)..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 placeholder:text-slate-400 rounded-xl border border-white/20 focus:border-[#7cb20b] focus:outline-none transition-all text-xs sm:text-sm font-medium shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs (Functional Button Controls with Zero-Pill Aesthetic) */}
      <div className="border-b border-slate-200 bg-slate-50 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#7cb20b]" /> Categoría:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-sm font-bold text-slate-700">
              No se han encontrado artículos que coincidan con tu búsqueda.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Todas');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-[#659208] hover:underline"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* FEATURED POST (HERO CARD) */}
            {featuredPost && (
              <div
                onClick={() => onSelectPost(featuredPost)}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
              >
                <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto overflow-hidden relative">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-xs text-white text-xs font-bold font-mono px-3 py-1 rounded">
                    {featuredPost.category}
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span>{featuredPost.publishedAt}</span>
                      <span>·</span>
                      <span>{featuredPost.readTimeMinutes} min de lectura</span>
                      <span>·</span>
                      <span className="text-slate-600 font-semibold">{featuredPost.author.name}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-normal font-gunplay uppercase tracking-wide text-slate-900 group-hover:text-[#659208] transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                      {featuredPost.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#659208]">
                    <span>Leer artículo completo</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            )}

            {/* ARTICLES GRID */}
            {gridPosts.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-6">
                  Más Publicaciones Recientes ({gridPosts.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridPosts.map((post) => (
                    <article
                      key={post.id}
                      onClick={() => onSelectPost(post)}
                      className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col cursor-pointer group"
                    >
                      <div className="h-48 bg-slate-100 overflow-hidden relative">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded">
                          {post.category}
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5">
                            <span>{post.publishedAt}</span>
                            <span>·</span>
                            <span>{post.readTimeMinutes} min</span>
                          </div>

                          <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#659208] transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h4>

                          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                            {post.subtitle}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#659208]">
                          <span>Leer guía</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
