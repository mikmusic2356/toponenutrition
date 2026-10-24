import React, { useState } from 'react';
import { Product, ProductReview } from '../../types/product';
import { Star, CheckCircle2, ThumbsUp, PlusCircle, X } from 'lucide-react';

interface ReviewsSectionProps {
  product: Product;
  onAddReview: (review: ProductReview) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ product, onAddReview }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  // Form states
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [objective, setObjective] = useState('Fuerza e Hipertrofia');

  const filteredReviews = product.reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newRev: ProductReview = {
      id: `rev_user_${Date.now()}`,
      author: name.trim(),
      verified: true,
      date: 'Reciente',
      rating,
      title: title.trim() || 'Opinión verificada',
      comment: comment.trim(),
      objective,
      helpfulCount: 0,
    };

    onAddReview(newRev);
    setModalOpen(false);
    setName('');
    setTitle('');
    setComment('');
  };

  return (
    <section id="opiniones" className="pt-8 border-t border-slate-200 w-full min-w-0 max-w-full">
      {/* Header & Score Summary */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 w-full max-w-full">
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#7cb20b] mb-1">
            Social Proof & Experiencia Real
          </div>
          <h2 className="text-xl sm:text-2xl font-normal tracking-wide text-slate-900 font-gunplay uppercase">
            Opiniones de Compradores Verificados
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-600">
            Comentarios reales de atletas que entrenan con {product.name.split(' ')[0]}.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black text-slate-900 font-mono">
                {product.rating.toFixed(2)}
              </span>
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-[11px] text-slate-500">
              {product.reviewsCount.toLocaleString()} compras verificadas
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#7cb20b]" />
            <span>Valorar</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none w-full max-w-full">
        <button
          onClick={() => setFilterRating('all')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            filterRating === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Todas ({product.reviews.length})
        </button>
        {[5, 4, 3].map((r) => (
          <button
            key={r}
            onClick={() => setFilterRating(r)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              filterRating === r
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>{r}★</span>
          </button>
        ))}
      </div>

      {/* Reviews Cards (2-column grid in Column 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#7cb20b]/50 transition-all duration-200 relative overflow-hidden group"
          >
            {/* Ambient accent top bar on hover */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#7cb20b] to-emerald-500 opacity-80 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Author, verification badge & date */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 truncate">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-[#7cb20b] font-bold text-xs flex items-center justify-center shrink-0 uppercase">
                    {rev.author.charAt(0)}
                  </div>
                  <div className="truncate">
                    <span className="font-bold text-slate-900 text-xs truncate block">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-emerald-700 inline-flex items-center gap-1 text-[10px] font-bold tracking-tight bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 fill-emerald-100" />
                        <span>Comprador Verificado</span>
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">{rev.date}</span>
              </div>

              {/* Rating stars & verified product tag */}
              <div className="flex items-center gap-2 mb-2.5">
                <div className="flex text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {rev.rating}.0 / 5.0
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug">
                {rev.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              {rev.objective ? (
                <span className="truncate pr-2">
                  <span className="text-slate-400">Objetivo:</span> <strong className="text-slate-800 font-semibold">{rev.objective}</strong>
                </span>
              ) : <span />}
              {rev.helpfulCount !== undefined && (
                <span className="flex items-center gap-1 text-[11px] text-slate-600 font-medium shrink-0 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
                  <ThumbsUp className="w-3 h-3 text-emerald-600" />
                  <span>Útil ({rev.helpfulCount})</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-normal tracking-wide text-slate-900 mb-1 font-gunplay uppercase">
              Dejar una opinión sobre {product.name.split(' ')[0]}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Comparte tu experiencia real de entrenamiento para ayudar a otros atletas.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tu Nombre o Apodo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Roberto G. - Atleta Powerlifting"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Valoración
                </label>
                <div className="flex gap-2">
                  {[5, 4, 3, 2, 1].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setRating(num)}
                      className={`flex-1 py-1.5 rounded text-xs font-bold border transition-colors cursor-pointer ${
                        rating === num
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {num} ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Objetivo Principal
                </label>
                <select
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                >
                  <option value="Fuerza e Hipertrofia">Fuerza e Hipertrofia</option>
                  <option value="Definición y Pérdida de Grasa">Definición y Pérdida de Grasa</option>
                  <option value="Rendimiento y Potencia">Rendimiento y Potencia</option>
                  <option value="Salud y Recuperación">Salud y Recuperación</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Titular de tu Opinión
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Disolución perfecta y resultados rápidos"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Comentario Detallado
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Cuéntanos cómo tomas el producto, sabor, sensaciones estomacales..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#7cb20b] hover:bg-[#6fa00a] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Publicar Opinión Verificada
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
