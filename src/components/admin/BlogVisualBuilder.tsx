import React, { useState } from 'react';
import { BlogPost, BlogContentBlock, BlogCategory, BlogBlockType } from '../../types/blog';
import { Product } from '../../types/product';
import { BlogPostView } from '../blog/BlogPostView';
import {
  Save, Eye, ArrowLeft, Smartphone, Monitor, Plus, Trash2, Check,
  Type, Image, HelpCircle, Star, Palette, Sparkles, Award, Upload,
  ArrowUp, ArrowDown, ExternalLink, RefreshCw, AlertCircle, X,
  ShoppingBag, Link as LinkIcon, Calendar, Clock, User, Tag, Search, Globe
} from 'lucide-react';

interface BlogVisualBuilderProps {
  initialPost: BlogPost;
  allPosts: BlogPost[];
  allProducts: Product[];
  onSave: (updatedPost: BlogPost) => void;
  onCancel: () => void;
  onPreviewLive: (post: BlogPost) => void;
  onSelectProduct: (product: Product) => void;
}

export const BlogVisualBuilder: React.FC<BlogVisualBuilderProps> = ({
  initialPost,
  allPosts,
  allProducts,
  onSave,
  onCancel,
  onPreviewLive,
  onSelectProduct,
}) => {
  const [post, setPost] = useState<BlogPost>({ ...initialPost });
  const [activeTab, setActiveTab] = useState<'info' | 'blocks' | 'products' | 'related' | 'seo'>('info');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [hasSaved, setHasSaved] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  // Update post field helper
  const updateField = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) => {
    setPost((prev) => ({ ...prev, [key]: value }));
    setHasSaved(false);
  };

  const handleSave = () => {
    onSave(post);
    setHasSaved(true);
    setTimeout(() => setHasSaved(false), 3000);
  };

  // Helper to generate slug from title
  const handleAutoSlug = () => {
    const slug = post.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    updateField('slug', slug);
  };

  // Cover image upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updateField('coverImage', result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Secondary block image upload
  const handleBlockImageUpload = (blockIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const blocks = [...post.blocks];
        blocks[blockIndex] = { ...blocks[blockIndex], imageUrl: result };
        updateField('blocks', blocks);
      }
    };
    reader.readAsDataURL(file);
  };

  // Block management
  const handleAddBlock = (type: BlogBlockType) => {
    const newBlock: BlogContentBlock = {
      id: `b_${Date.now()}`,
      type,
    };

    switch (type) {
      case 'heading':
        newBlock.level = 'h2';
        newBlock.title = 'Nuevo Encabezado de Sección';
        break;
      case 'paragraph':
        newBlock.content = 'Escribe aquí el contenido del párrafo informativo explicando los fundamentos...';
        break;
      case 'image':
        newBlock.imageUrl = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80';
        newBlock.imageCaption = 'Pie de foto descriptivo de la imagen';
        break;
      case 'callout':
        newBlock.calloutType = 'science';
        newBlock.calloutTitle = 'Dato Científico Clave';
        newBlock.calloutText = 'Los estudios demuestran una mejora medible en el rendimiento al aplicar este protocolo.';
        break;
      case 'list':
        newBlock.listStyle = 'bullet';
        newBlock.listItems = [
          'Primer punto clave a tener en cuenta',
          'Segundo beneficio comprobado por la ciencia',
          'Tercer aspecto práctico de aplicación diaria',
        ];
        break;
      case 'quote':
        newBlock.content = 'La consistencia en la suplementación y el entrenamiento supera a cualquier atajo.';
        newBlock.quoteAuthor = 'Comité Técnico TopOneNutrition';
        break;
      case 'product_card':
        newBlock.productId = allProducts[0]?.id || '';
        break;
    }

    updateField('blocks', [...post.blocks, newBlock]);
  };

  const handleUpdateBlock = (index: number, updated: BlogContentBlock) => {
    const blocks = [...post.blocks];
    blocks[index] = updated;
    updateField('blocks', blocks);
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const blocks = [...post.blocks];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= blocks.length) return;
    const temp = blocks[index];
    blocks[index] = blocks[target];
    blocks[target] = temp;
    updateField('blocks', blocks);
  };

  const handleDeleteBlock = (index: number) => {
    updateField('blocks', post.blocks.filter((_, i) => i !== index));
  };

  // Tags management
  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    const clean = newTagInput.trim().replace(/^#/, '');
    if (!post.tags.includes(clean)) {
      updateField('tags', [...post.tags, clean]);
    }
    setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    updateField('tags', post.tags.filter((t) => t !== tagToRemove));
  };

  // Toggle attached product
  const handleToggleProduct = (productId: string) => {
    const isAttached = post.attachedProductIds.includes(productId);
    const newAttached = isAttached
      ? post.attachedProductIds.filter((id) => id !== productId)
      : [...post.attachedProductIds, productId];
    updateField('attachedProductIds', newAttached);
  };

  // Toggle related post
  const handleToggleRelatedPost = (postId: string) => {
    const isRelated = post.relatedPostIds.includes(postId);
    const newRelated = isRelated
      ? post.relatedPostIds.filter((id) => id !== postId)
      : [...post.relatedPostIds, postId];
    updateField('relatedPostIds', newRelated);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 overflow-hidden">
      {/* Top Builder Control Header */}
      <header className="h-14 bg-slate-900 text-white px-4 flex items-center justify-between border-b border-slate-800 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            title="Volver al panel"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-xs font-mono text-[#7cb20b]">Constructor Visual de Blog TopOneNutrition</div>
            <h2 className="text-sm font-normal text-white truncate max-w-xs sm:max-w-md font-gunplay uppercase tracking-wide">
              {post.title || 'Nuevo Artículo sin Título'}
            </h2>
          </div>
        </div>

        {/* Viewport switch & actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status selector */}
          <div className="flex items-center bg-slate-800 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => updateField('status', 'draft')}
              className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                post.status === 'draft'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Borrador
            </button>
            <button
              type="button"
              onClick={() => updateField('status', 'published')}
              className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                post.status === 'published'
                  ? 'bg-[#7cb20b] text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Publicado
            </button>
          </div>

          {/* Device toggle */}
          <div className="hidden sm:flex items-center bg-slate-800 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setPreviewDevice('desktop')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                previewDevice === 'desktop' ? 'bg-[#7cb20b] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Vista de Escritorio"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              type="button"
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
            type="button"
            onClick={() => onPreviewLive(post)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Previsualizar cómo lo verá el lector"
          >
            <Eye className="w-3.5 h-3.5 text-[#7cb20b]" />
            <span className="hidden sm:inline">Ver en Vivo</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-1.5 bg-[#7cb20b] hover:bg-[#6fa00a] text-slate-950 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            {hasSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Guardado!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Guardar Artículo</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Split Body: Left Editor / Right Live Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL: Editor Controls */}
        <aside className="w-full lg:w-[480px] xl:w-[540px] bg-white border-r border-slate-200 flex flex-col shrink-0 z-10 shadow-lg">
          {/* Tabs navigation */}
          <div className="border-b border-slate-200 bg-slate-50 p-2 shrink-0">
            <div className="grid grid-cols-5 gap-1 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === 'info'
                    ? 'bg-[#7cb20b] text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                General
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('blocks')}
                className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer relative ${
                  activeTab === 'blocks'
                    ? 'bg-[#7cb20b] text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                Bloques ({post.blocks.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-[#7cb20b] text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                Productos ({post.attachedProductIds.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('related')}
                className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === 'related'
                    ? 'bg-[#7cb20b] text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                Noticias
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === 'seo'
                    ? 'bg-[#7cb20b] text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                SEO
              </button>
            </div>
          </div>

          {/* Form Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* TAB 1: GENERAL & PORTADA */}
            {activeTab === 'info' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Título Principal del Artículo (H1 Responsive)
                  </label>
                  <textarea
                    rows={2}
                    value={post.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="Ej. Guía Científica de la Creatina Monohidrato..."
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subtítulo / Entradilla Descriptiva
                  </label>
                  <textarea
                    rows={2}
                    value={post.subtitle}
                    onChange={(e) => updateField('subtitle', e.target.value)}
                    placeholder="Breve resumen del contenido que enganche al lector..."
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                  />
                </div>

                {/* Slug / URL individual */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      URL Individual del Artículo (Slug)
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoSlug}
                      className="text-[10px] text-[#659208] hover:underline font-bold"
                    >
                      Generar desde título
                    </button>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs bg-slate-100 border border-r-0 border-slate-300 px-2.5 py-2 rounded-l-lg text-slate-500 font-mono">
                      /blog/
                    </span>
                    <input
                      type="text"
                      value={post.slug}
                      onChange={(e) => updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                      className="flex-1 text-xs p-2 rounded-r-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b] font-mono"
                    />
                  </div>
                </div>

                {/* Category & Read Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Categoría
                    </label>
                    <select
                      value={post.category}
                      onChange={(e) => updateField('category', e.target.value as BlogCategory)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7cb20b]"
                    >
                      <option value="Suplementación">Suplementación</option>
                      <option value="Nutrición">Nutrición</option>
                      <option value="Entrenamiento">Entrenamiento</option>
                      <option value="Ciencia Deportiva">Ciencia Deportiva</option>
                      <option value="Salud y Bienestar">Salud y Bienestar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tiempo de Lectura (min)
                    </label>
                    <input
                      type="number"
                      value={post.readTimeMinutes}
                      onChange={(e) => updateField('readTimeMinutes', parseInt(e.target.value) || 5)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>
                </div>

                {/* Author & Date */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nombre del Autor
                    </label>
                    <input
                      type="text"
                      value={post.author.name}
                      onChange={(e) => updateField('author', { ...post.author, name: e.target.value })}
                      placeholder="Dr. Marcos Valenzuela"
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cargo / Especialidad
                    </label>
                    <input
                      type="text"
                      value={post.author.role}
                      onChange={(e) => updateField('author', { ...post.author, role: e.target.value })}
                      placeholder="Director Científico"
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Fecha de Publicación
                  </label>
                  <input
                    type="date"
                    value={post.publishedAt}
                    onChange={(e) => updateField('publishedAt', e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 font-mono"
                  />
                </div>

                {/* Imagen de portada */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Imagen de Portada del Artículo
                    </span>
                    <label className="text-[11px] font-bold text-[#659208] hover:text-[#7cb20b] cursor-pointer flex items-center gap-1">
                      <Upload className="w-3 h-3" /> Subir archivo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  {post.coverImage && (
                    <div className="relative rounded-lg overflow-hidden border border-slate-200 h-32 bg-slate-100">
                      <img
                        src={post.coverImage}
                        alt="Portada"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      O introduce la URL directa de la imagen:
                    </label>
                    <input
                      type="url"
                      value={post.coverImage}
                      onChange={(e) => updateField('coverImage', e.target.value)}
                      placeholder="https://..."
                      className="w-full text-xs p-2 rounded-lg border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Pie de Foto de Portada (Opcional)
                    </label>
                    <input
                      type="text"
                      value={post.coverImageCaption || ''}
                      onChange={(e) => updateField('coverImageCaption', e.target.value)}
                      placeholder="Ej. Análisis de solubilidad y pureza en laboratorio..."
                      className="w-full text-xs p-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Etiquetas / Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      placeholder="Escribe una etiqueta y pulsa Enter"
                      className="flex-1 text-xs p-2 rounded-lg border border-slate-300"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-slate-800"
                    >
                      Añadir
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-700"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-red-500 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: VISUAL BLOCKS EDITOR */}
            {activeTab === 'blocks' && (
              <div className="space-y-4">
                {/* Block insertion bar */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-700 block mb-2 uppercase tracking-wider">
                    Añadir Bloque al Artículo (Sin programar)
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleAddBlock('paragraph')}
                      className="py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded text-xs font-semibold text-slate-800 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <Type className="w-3.5 h-3.5 text-[#7cb20b]" /> Párrafo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock('heading')}
                      className="py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded text-xs font-semibold text-slate-800 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <Type className="w-3.5 h-3.5 font-black text-slate-900" /> Título H2/H3
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock('image')}
                      className="py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded text-xs font-semibold text-slate-800 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <Image className="w-3.5 h-3.5 text-sky-600" /> Imagen
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock('product_card')}
                      className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors col-span-3 sm:col-span-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#7cb20b]" /> Tarjeta Producto
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock('callout')}
                      className="py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded text-xs font-semibold text-slate-800 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Tip / Alerta
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock('list')}
                      className="py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded text-xs font-semibold text-slate-800 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <Check className="w-3.5 h-3.5 text-[#7cb20b]" /> Puntos Clave
                    </button>
                  </div>
                </div>

                {/* Blocks list */}
                <div className="space-y-3">
                  {post.blocks.map((block, idx) => (
                    <div
                      key={block.id}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 shadow-2xs relative"
                    >
                      {/* Block control bar */}
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-500">#{idx + 1}</span>
                          <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                            {block.type === 'heading'
                              ? `Título ${block.level?.toUpperCase() || 'H2'}`
                              : block.type === 'paragraph'
                              ? 'Párrafo'
                              : block.type === 'image'
                              ? 'Imagen Secundaria'
                              : block.type === 'callout'
                              ? `Destacado (${block.calloutType})`
                              : block.type === 'product_card'
                              ? 'Tarjeta Comercial de Producto'
                              : block.type === 'list'
                              ? 'Lista de Puntos'
                              : 'Cita'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveBlock(idx, 'up')}
                            className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                            title="Subir bloque"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === post.blocks.length - 1}
                            onClick={() => handleMoveBlock(idx, 'down')}
                            className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                            title="Bajar bloque"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBlock(idx)}
                            className="p-1 text-slate-400 hover:text-red-500 cursor-pointer ml-1"
                            title="Eliminar bloque"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Heading block inputs */}
                      {block.type === 'heading' && (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <select
                              value={block.level || 'h2'}
                              onChange={(e) =>
                                handleUpdateBlock(idx, { ...block, level: e.target.value as any })
                              }
                              className="text-xs p-1.5 rounded border border-slate-300 font-bold"
                            >
                              <option value="h2">H2 (Principal)</option>
                              <option value="h3">H3 (Secundario)</option>
                            </select>
                            <input
                              type="text"
                              value={block.title || ''}
                              onChange={(e) =>
                                handleUpdateBlock(idx, { ...block, title: e.target.value })
                              }
                              placeholder="Texto del encabezado..."
                              className="flex-1 text-xs p-2 rounded-lg border border-slate-300 font-bold bg-white"
                            />
                          </div>
                        </div>
                      )}

                      {/* Paragraph block inputs */}
                      {block.type === 'paragraph' && (
                        <textarea
                          rows={4}
                          value={block.content || ''}
                          onChange={(e) =>
                            handleUpdateBlock(idx, { ...block, content: e.target.value })
                          }
                          placeholder="Texto del párrafo..."
                          className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white leading-relaxed"
                        />
                      )}

                      {/* Image block inputs */}
                      {block.type === 'image' && (
                        <div className="space-y-2">
                          {block.imageUrl && (
                            <div className="relative rounded overflow-hidden h-24 bg-slate-100 border border-slate-200">
                              <img
                                src={block.imageUrl}
                                alt="Vista previa"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex gap-2 items-center">
                            <input
                              type="url"
                              value={block.imageUrl || ''}
                              onChange={(e) =>
                                handleUpdateBlock(idx, { ...block, imageUrl: e.target.value })
                              }
                              placeholder="https://... URL de la imagen"
                              className="flex-1 text-xs p-2 rounded-lg border border-slate-300 bg-white"
                            />
                            <label className="p-2 bg-slate-200 hover:bg-slate-300 rounded cursor-pointer shrink-0 text-slate-700" title="Subir desde equipo">
                              <Upload className="w-3.5 h-3.5" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleBlockImageUpload(idx, e)}
                                className="sr-only"
                              />
                            </label>
                          </div>
                          <input
                            type="text"
                            value={block.imageCaption || ''}
                            onChange={(e) =>
                              handleUpdateBlock(idx, { ...block, imageCaption: e.target.value })
                            }
                            placeholder="Pie de foto descriptivo..."
                            className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white text-slate-600 italic"
                          />
                        </div>
                      )}

                      {/* Product Card embedded inputs */}
                      {block.type === 'product_card' && (
                        <div className="space-y-2 bg-white p-2.5 rounded-lg border border-slate-200">
                          <label className="block text-[11px] font-bold text-slate-700">
                            Seleccionar Producto de TopOneNutrition para Insertar:
                          </label>
                          <select
                            value={block.productId || ''}
                            onChange={(e) =>
                              handleUpdateBlock(idx, { ...block, productId: e.target.value })
                            }
                            className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-semibold"
                          >
                            {allProducts.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name} ({p.basePrice.toFixed(2)}€)
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Callout inputs */}
                      {block.type === 'callout' && (
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              value={block.calloutType || 'science'}
                              onChange={(e) =>
                                handleUpdateBlock(idx, { ...block, calloutType: e.target.value as any })
                              }
                              className="text-xs p-1.5 rounded border border-slate-300"
                            >
                              <option value="science">Ciencia (Oscuro / Verde)</option>
                              <option value="tip">Consejo Nutricional (Verde)</option>
                              <option value="warning">Advertencia / Alerta (Rojo)</option>
                            </select>
                            <input
                              type="text"
                              value={block.calloutTitle || ''}
                              onChange={(e) =>
                                handleUpdateBlock(idx, { ...block, calloutTitle: e.target.value })
                              }
                              placeholder="Título del destacado..."
                              className="text-xs p-1.5 rounded border border-slate-300 font-bold bg-white"
                            />
                          </div>
                          <textarea
                            rows={2}
                            value={block.calloutText || ''}
                            onChange={(e) =>
                              handleUpdateBlock(idx, { ...block, calloutText: e.target.value })
                            }
                            placeholder="Contenido explicativo del destacado..."
                            className="w-full text-xs p-2 rounded border border-slate-300 bg-white"
                          />
                        </div>
                      )}

                      {/* List inputs */}
                      {block.type === 'list' && (
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold text-slate-600">
                            Puntos de la lista (uno por línea):
                          </label>
                          <textarea
                            rows={3}
                            value={(block.listItems || []).join('\n')}
                            onChange={(e) =>
                              handleUpdateBlock(idx, {
                                ...block,
                                listItems: e.target.value.split('\n').filter(Boolean),
                              })
                            }
                            className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                          />
                        </div>
                      )}

                      {/* Quote inputs */}
                      {block.type === 'quote' && (
                        <div className="space-y-2">
                          <textarea
                            rows={2}
                            value={block.content || ''}
                            onChange={(e) =>
                              handleUpdateBlock(idx, { ...block, content: e.target.value })
                            }
                            placeholder="Texto de la cita..."
                            className="w-full text-xs p-2 rounded border border-slate-300 bg-white italic"
                          />
                          <input
                            type="text"
                            value={block.quoteAuthor || ''}
                            onChange={(e) =>
                              handleUpdateBlock(idx, { ...block, quoteAuthor: e.target.value })
                            }
                            placeholder="Autor o entidad..."
                            className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white text-right"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: ATTACHED PRODUCTS FROM CATALOG */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    Anexar Productos Comerciales de TopOneNutrition
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Selecciona los productos de tu catálogo que aparecerán en tarjetas comerciales destacadas con precio y botón «Ver producto» enlazado a su landing page.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {allProducts.map((product) => {
                    const isAttached = post.attachedProductIds.includes(product.id);
                    return (
                      <div
                        key={product.id}
                        onClick={() => handleToggleProduct(product.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isAttached
                            ? 'bg-[#7cb20b]/10 border-[#7cb20b] shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-12 bg-white rounded border border-slate-200 p-0.5 flex items-center justify-center shrink-0">
                            {product.customImageUrl ? (
                              <img
                                src={product.customImageUrl}
                                alt={product.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-900 rounded text-[#7cb20b] text-[9px] font-bold flex items-center justify-center font-mono">
                                3D
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 leading-snug">
                              {product.name}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                              {product.category} · <strong className="text-slate-800">{product.basePrice.toFixed(2)}€</strong>
                            </div>
                          </div>
                        </div>

                        <input
                          type="checkbox"
                          checked={isAttached}
                          onChange={() => handleToggleProduct(product.id)}
                          className="w-4 h-4 text-[#7cb20b] rounded focus:ring-[#7cb20b] cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: RELATED POSTS («NOTICIAS DE INTERÉS») */}
            {activeTab === 'related' && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    Sección «Noticias de Interés»
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Elige qué artículos relacionados se mostrarán al final de esta publicación para aumentar el tiempo de permanencia y las visitas internas.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {allPosts
                    .filter((p) => p.id !== post.id)
                    .map((otherPost) => {
                      const isRelated = post.relatedPostIds.includes(otherPost.id);
                      return (
                        <div
                          key={otherPost.id}
                          onClick={() => handleToggleRelatedPost(otherPost.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isRelated
                              ? 'bg-[#7cb20b]/10 border-[#7cb20b] shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={otherPost.coverImage}
                              alt={otherPost.title}
                              referrerPolicy="no-referrer"
                              className="w-12 h-10 object-cover rounded shrink-0 border border-slate-200"
                            />
                            <div>
                              <div className="text-xs font-bold text-slate-900 line-clamp-1">
                                {otherPost.title}
                              </div>
                              <div className="text-[11px] text-slate-500">
                                {otherPost.category} · {otherPost.readTimeMinutes} min de lectura
                              </div>
                            </div>
                          </div>

                          <input
                            type="checkbox"
                            checked={isRelated}
                            onChange={() => handleToggleRelatedPost(otherPost.id)}
                            className="w-4 h-4 text-[#7cb20b] rounded focus:ring-[#7cb20b] cursor-pointer"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* TAB 5: SEO & SEARCH SNIPPET */}
            {activeTab === 'seo' && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    Optimización para Motores de Búsqueda (SEO)
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Personaliza cómo se mostrará tu artículo en los resultados de Google y al compartir en redes sociales.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      Título SEO (Meta Title)
                    </label>
                    <span className="text-[11px] font-mono text-slate-500">
                      {(post.seoTitle || post.title).length} / 60 caracteres
                    </span>
                  </div>
                  <input
                    type="text"
                    value={post.seoTitle ?? post.title}
                    onChange={(e) => updateField('seoTitle', e.target.value)}
                    placeholder="Título optimizado con palabras clave..."
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      Meta Descripción SEO
                    </label>
                    <span className="text-[11px] font-mono text-slate-500">
                      {(post.seoDescription || post.subtitle).length} / 160 caracteres
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={post.seoDescription ?? post.subtitle}
                    onChange={(e) => updateField('seoDescription', e.target.value)}
                    placeholder="Resumen atractivo para incentivar clics en los resultados de búsqueda..."
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 leading-relaxed"
                  />
                </div>

                {/* Live Google Search Snippet Preview */}
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#7cb20b]" /> Previsualización en Google Search
                  </div>
                  <div className="text-xs text-[#202124] truncate flex items-center gap-1 font-sans">
                    <span className="font-semibold">toponenutrition.es</span>
                    <span className="text-slate-400">› blog › {post.slug}</span>
                  </div>
                  <div className="text-base text-[#1a0dab] hover:underline font-medium line-clamp-1 cursor-pointer">
                    {post.seoTitle || post.title || 'Título del artículo'}
                  </div>
                  <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                    {post.seoDescription || post.subtitle || 'Descripción del artículo en el buscador...'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Footer inside Left Panel */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
            <span className="text-slate-500 truncate max-w-[200px]">
              Slug: <strong className="font-mono text-slate-700">/{post.slug}</strong>
            </span>
            <button
              type="button"
              onClick={handleSave}
              className="py-1.5 px-4 bg-[#7cb20b] hover:bg-[#6fa00a] text-slate-950 font-bold rounded cursor-pointer"
            >
              Guardar Artículo
            </button>
          </div>
        </aside>

        {/* RIGHT PANEL: Live Interactive Preview */}
        <main className="flex-1 bg-slate-200 overflow-y-auto flex items-start justify-center p-4 sm:p-6">
          <div
            className={`transition-all duration-300 bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-300 ${
              previewDevice === 'mobile'
                ? 'w-[390px] min-h-[800px] border-8 border-slate-800 rounded-[38px] my-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
                : 'w-full max-w-[1020px] min-h-screen'
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
              <span>PREVISUALIZACIÓN EN VIVO · BLOG TOPONENUTRITION</span>
              <span className="text-[#7cb20b] font-bold">
                {post.status === 'published' ? 'ESTADO: PUBLICADO' : 'ESTADO: BORRADOR'}
              </span>
            </div>

            {/* Actual Live Article Component */}
            <BlogPostView
              post={post}
              allPosts={allPosts}
              allProducts={allProducts}
              onSelectPost={(p) => setPost(p)}
              onSelectProduct={onSelectProduct}
              onBackToBlog={() => {}}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
