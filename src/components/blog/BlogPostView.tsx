import React, { useEffect, useState } from 'react';
import { BlogPost, BlogContentBlock } from '../../types/blog';
import { Product } from '../../types/product';
import { SupplementVisual } from '../common/SupplementVisual';
import {
  Calendar, Clock, User, ArrowLeft, Share2, Bookmark, Check,
  ExternalLink, Sparkles, AlertCircle, Award, ChevronRight, ShoppingBag, Eye
} from 'lucide-react';
import { formatCOP } from '../../lib/currency';

interface BlogPostViewProps {
  post: BlogPost;
  allPosts: BlogPost[];
  allProducts: Product[];
  onSelectPost: (post: BlogPost) => void;
  onSelectProduct: (product: Product) => void;
  onBackToBlog: () => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({
  post,
  allPosts,
  allProducts,
  onSelectPost,
  onSelectProduct,
  onBackToBlog,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update document title & SEO meta tags dynamically
  useEffect(() => {
    const originalTitle = document.title;
    document.title = post.seoTitle || `${post.title} | Blog TopOneNutrition`;
    
    // Meta description update
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc && post.seoDescription) {
      metaDesc.setAttribute('content', post.seoDescription);
    }

    // Scroll to top on post change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Scroll progress handler
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress(Number((totalScroll / windowHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.title = originalTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [post]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Find attached products from the real catalog
  const attachedProducts = allProducts.filter((p) =>
    post.attachedProductIds.includes(p.id) || post.attachedProductIds.includes(p.slug)
  );

  // Find related posts for «Noticias de interés»
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && (post.relatedPostIds.includes(p.id) || p.category === post.category))
    .slice(0, 3);

  // Fallback to other posts if less than 3
  const finalRelatedPosts =
    relatedPosts.length >= 3
      ? relatedPosts
      : [
          ...relatedPosts,
          ...allPosts.filter(
            (p) => p.id !== post.id && !relatedPosts.some((r) => r.id === p.id)
          ),
        ].slice(0, 3);

  // Helper to render product commercial card
  const renderCommercialProductCard = (productId?: string) => {
    const targetProduct = productId
      ? allProducts.find((p) => p.id === productId || p.slug === productId)
      : attachedProducts[0];

    if (!targetProduct) return null;

    const discountPercent =
      targetProduct.originalPrice > targetProduct.basePrice
        ? Math.round(
            ((targetProduct.originalPrice - targetProduct.basePrice) /
              targetProduct.originalPrice) *
              100
          )
        : null;

    return (
      <div
        key={targetProduct.id}
        className="my-8 p-5 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 shadow-xl overflow-hidden relative group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7cb20b]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center gap-6">
          {/* Product Thumbnail / Image */}
          <div className="w-32 h-36 sm:w-40 sm:h-44 shrink-0 bg-white/5 rounded-xl border border-white/10 p-2 flex items-center justify-center overflow-hidden">
            {targetProduct.customImageUrl ? (
              <img
                src={targetProduct.customImageUrl}
                alt={targetProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <SupplementVisual product={targetProduct} size="md" />
            )}
          </div>

          {/* Product Commercial Details */}
          <div className="flex-1 text-center md:text-left min-w-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-mono mb-1.5">
              <span className="text-[#7cb20b] font-bold uppercase tracking-wider">
                {targetProduct.category}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300 font-bold">
                {targetProduct.badge || 'Grado Clínico Certificado'}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-normal font-gunplay uppercase tracking-wide text-white group-hover:text-[#7cb20b] transition-colors">
              {targetProduct.name}
            </h3>

            <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
              {targetProduct.tagline || targetProduct.heroSubtitle}
            </p>

            {/* Price & Action Button */}
            <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 pt-3 border-t border-slate-800">
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                  {formatCOP(targetProduct.basePrice)}
                </span>
                {targetProduct.originalPrice > targetProduct.basePrice && (
                  <span className="text-xs text-slate-400 line-through font-mono">
                    {formatCOP(targetProduct.originalPrice)}
                  </span>
                )}
                {discountPercent && (
                  <span className="text-[11px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/60 font-mono">
                    -{discountPercent}%
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => onSelectProduct(targetProduct)}
                className="py-2.5 px-5 bg-[#7cb20b] hover:bg-[#6fa00a] text-slate-950 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg hover:shadow-[#7cb20b]/20 shrink-0"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Ver Producto & Ofertas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Helper to render individual content block
  const renderBlock = (block: BlogContentBlock) => {
    switch (block.type) {
      case 'heading':
        if (block.level === 'h3') {
          return (
            <h3
              key={block.id}
              className="text-lg sm:text-xl font-bold text-slate-900 mt-8 mb-3 scroll-mt-24"
            >
              {block.title}
            </h3>
          );
        }
        return (
          <div key={block.id} className="mt-10 mb-4 scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-normal font-gunplay uppercase tracking-wide text-slate-900">
              {block.title}
            </h2>
            <div className="w-12 h-1 bg-[#7cb20b] mt-1.5 rounded-full" />
          </div>
        );

      case 'paragraph':
        return (
          <p
            key={block.id}
            className="text-slate-700 text-base sm:text-[17px] leading-relaxed mb-6"
          >
            {block.content}
          </p>
        );

      case 'image':
        return (
          <figure key={block.id} className="my-8 space-y-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
              <img
                src={block.imageUrl}
                alt={block.imageAlt || block.imageCaption || 'Ilustración del artículo'}
                referrerPolicy="no-referrer"
                className="w-full max-h-[460px] object-cover hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
            {block.imageCaption && (
              <figcaption className="text-xs text-slate-500 text-center italic">
                {block.imageCaption}
              </figcaption>
            )}
          </figure>
        );

      case 'callout':
        const isWarning = block.calloutType === 'warning';
        const isScience = block.calloutType === 'science';
        return (
          <div
            key={block.id}
            className={`my-6 p-4 sm:p-5 rounded-xl border ${
              isWarning
                ? 'bg-red-50/70 border-red-200 text-red-950'
                : isScience
                ? 'bg-slate-900 border-slate-800 text-white'
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-xs uppercase tracking-wider">
              {isWarning ? (
                <AlertCircle className="w-4 h-4 text-red-600" />
              ) : isScience ? (
                <Sparkles className="w-4 h-4 text-[#7cb20b]" />
              ) : (
                <Award className="w-4 h-4 text-[#659208]" />
              )}
              <span className={isScience ? 'text-[#7cb20b]' : isWarning ? 'text-red-700' : 'text-[#659208]'}>
                {block.calloutTitle || 'Nota Importante'}
              </span>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isScience ? 'text-slate-300' : ''}`}>
              {block.calloutText}
            </p>
          </div>
        );

      case 'list':
        return (
          <div key={block.id} className="my-6 space-y-2">
            {block.listItems?.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                <div className="w-5 h-5 rounded-full bg-[#7cb20b]/20 text-[#659208] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        );

      case 'quote':
        return (
          <blockquote
            key={block.id}
            className="my-8 p-5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 italic"
          >
            <p className="text-base sm:text-lg font-medium leading-relaxed">
              "{block.content}"
            </p>
            {block.quoteAuthor && (
              <footer className="text-xs font-semibold not-italic text-slate-500 mt-2 text-right">
                — {block.quoteAuthor}
              </footer>
            )}
          </blockquote>
        );

      case 'product_card':
        return renderCommercialProductCard(block.productId);

      default:
        return null;
    }
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#7cb20b] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Header & Breadcrumbs Bar */}
      <div className="border-b border-slate-200 bg-slate-50/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs text-slate-600">
          <button
            type="button"
            onClick={onBackToBlog}
            className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#7cb20b]" />
            <span>Volver al Blog</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="py-1 px-2.5 bg-white hover:bg-slate-100 rounded border border-slate-200 text-[11px] font-semibold flex items-center gap-1.5 text-slate-700 cursor-pointer transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3 h-3 text-[#7cb20b]" />
                  <span className="text-[#659208] font-bold">¡Enlace Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3 h-3 text-slate-500" />
                  <span>Compartir</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
          <span className="font-bold text-[#659208] uppercase tracking-wider">
            {post.category}
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            {post.publishedAt}
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            {post.readTimeMinutes} min de lectura
          </span>
          {post.status === 'draft' && (
            <>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-amber-600 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 text-[10px]">
                Borrador Privado
              </span>
            </>
          )}
        </div>

        {/* Responsive Main Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal font-gunplay uppercase tracking-wide text-slate-900 leading-tight mb-4">
          {post.title}
        </h1>

        {/* Subtitle / Lead Paragraph */}
        {post.subtitle && (
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-6">
            {post.subtitle}
          </p>
        )}

        {/* Author Bio Bar */}
        <div className="flex items-center gap-3 py-3 border-y border-slate-200 mb-8">
          {post.author.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
              {post.author.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="text-xs font-bold text-slate-900">{post.author.name}</div>
            <div className="text-[11px] text-slate-500">{post.author.role}</div>
          </div>
        </div>

        {/* Main Cover Image */}
        {post.coverImage && (
          <figure className="mb-10 space-y-2">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <img
                src={post.coverImage}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[480px] object-cover"
              />
            </div>
            {post.coverImageCaption && (
              <figcaption className="text-xs text-slate-500 text-center italic">
                {post.coverImageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Article Body Content Blocks */}
        <div className="prose max-w-none">
          {post.blocks.map((block) => renderBlock(block))}
        </div>

        {/* Attached Commercial Products Showcase (if not already embedded inline) */}
        {attachedProducts.length > 0 && (
          <section className="mt-12 pt-8 border-t border-slate-200">
            <div className="mb-4">
              <div className="text-xs font-mono font-bold text-[#659208] uppercase tracking-wider">
                Suplementación Relacionada
              </div>
              <h3 className="text-xl sm:text-2xl font-normal font-gunplay uppercase tracking-wide text-slate-900">
                Fórmulas TopOneNutrition Mencionadas en este Artículo
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Garantía de pureza farmacéutica, lotes certificados y envío en 24-48 horas.
              </p>
            </div>

            <div className="space-y-4">
              {attachedProducts.map((prod) => renderCommercialProductCard(prod.id))}
            </div>
          </section>
        )}

        {/* Tags List */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Temas:</span>
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </main>

      {/* SECTION FINAL: «Noticias de interés» (Mandatory requirement) */}
      <section className="bg-slate-50 border-t border-slate-200 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-mono font-bold text-[#659208] uppercase tracking-wider">
                Lecturas Recomendadas
              </div>
              <h2 className="text-xl sm:text-2xl font-normal font-gunplay uppercase tracking-wide text-slate-900 mt-0.5">
                Noticias de Interés
              </h2>
            </div>
            <button
              type="button"
              onClick={onBackToBlog}
              className="text-xs font-bold text-[#659208] hover:text-[#7cb20b] flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todas las publicaciones</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {finalRelatedPosts.map((related) => (
              <div
                key={related.id}
                onClick={() => onSelectPost(related)}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col cursor-pointer group"
              >
                {/* Image */}
                <div className="h-44 bg-slate-100 overflow-hidden relative">
                  <img
                    src={related.coverImage}
                    alt={related.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded">
                    {related.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5">
                      <span>{related.publishedAt}</span>
                      <span>·</span>
                      <span>{related.readTimeMinutes} min de lectura</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#659208] transition-colors line-clamp-2 leading-snug">
                      {related.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {related.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#659208]">
                    <span>Leer artículo</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};
