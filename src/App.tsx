/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, BundleTier, ProductReview, CustomerOrder, OrderStatus } from './types/product';
import { BlogPost } from './types/blog';
import { DEFAULT_PRODUCTS } from './data/defaultProducts';
import { DEFAULT_BLOG_POSTS } from './data/defaultBlogPosts';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ProductLandingPage } from './components/landing/ProductLandingPage';
import { TankLandingPage } from './components/landing/TankLandingPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckoutDrawer } from './components/cart/CheckoutDrawer';
import { ThankYouPage } from './components/cart/ThankYouPage';
import { BlogPostView } from './components/blog/BlogPostView';
import { BlogIndexPage } from './components/blog/BlogIndexPage';
import { dbService } from './services/dbService';

const STORAGE_KEY_PRODUCTS = 'topone_products_v2';
const STORAGE_KEY_CART = 'topone_cart_v1';
const STORAGE_KEY_ORDERS = 'topone_orders_v1';
const STORAGE_KEY_BLOG = 'topone_blog_posts_v1';

// Seed sample orders for instant testing in dashboard
const SAMPLE_INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'TOP1-842910',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'en_preparacion',
    customer: {
      name: 'Alejandro Morales',
      phone: '612 849 201',
      address: 'Calle Mayor 45, 3º B',
      city: 'Madrid',
      postalCode: '28013',
      notes: 'Llamar al telefonillo antes de subir. Si no estoy, dejar al conserje.',
    },
    items: [
      {
        product: DEFAULT_PRODUCTS[0],
        bundle: DEFAULT_PRODUCTS[0].bundles[1], // Pack Dúo
        selectedFlavor: 'Neutro (Sin sabor)',
        selectedSize: '500g (100 tomas)',
        quantity: 1,
      },
    ],
    subtotal: 49.90,
    shippingCost: 0,
    total: 49.90,
    paymentMethod: 'card',
  },
  {
    id: 'TOP1-739104',
    createdAt: new Date(Date.now() - 3600000 * 22).toISOString(),
    status: 'enviado',
    customer: {
      name: 'Lucía Fernández Ramos',
      phone: '689 312 045',
      address: 'Avinguda Diagonal 230, Ático 1ª',
      city: 'Barcelona',
      postalCode: '08018',
      notes: 'Entregar preferiblemente por la mañana.',
    },
    items: [
      {
        product: DEFAULT_PRODUCTS[1], // IsoPro CFM Whey
        bundle: DEFAULT_PRODUCTS[1].bundles[1], // Pack Definición Dúo
        selectedFlavor: 'Doble Chocolate Belga',
        selectedSize: '1000g (33 tomas)',
        quantity: 1,
      },
    ],
    subtotal: 69.90,
    shippingCost: 0,
    total: 69.90,
    paymentMethod: 'bizum',
  },
];

export default function App() {
  // Load products from localStorage or default
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading saved products:', e);
    }
    return DEFAULT_PRODUCTS;
  });

  // Load blog posts from localStorage or default
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BLOG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading saved blog posts:', e);
    }
    return DEFAULT_BLOG_POSTS;
  });

  // Load orders from localStorage
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading saved orders:', e);
    }
    return [];
  });

  // Determine active product from URL query or fallback
  const getProductFromUrl = (prods: Product[]): Product => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('p') || params.get('producto');
    if (slug) {
      const found = prods.find((p) => p.slug === slug);
      if (found) return found;
    }
    const hash = window.location.hash.replace('#', '');
    if (hash && !hash.startsWith('blog') && !hash.startsWith('/blog')) {
      const cleanHash = hash.replace(/^\/?producto\//, '');
      const foundByHash = prods.find((p) => p.slug === cleanHash);
      if (foundByHash) return foundByHash;
    }
    return prods[0] || DEFAULT_PRODUCTS[0];
  };

  const [activeProduct, setActiveProduct] = useState<Product>(() => getProductFromUrl(products));
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.search.includes('admin=true');
  });

  // View state: 'product' | 'blog_index' | 'blog_post'
  const [currentView, setCurrentView] = useState<'product' | 'blog_index' | 'blog_post'>('product');
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading cart:', e);
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CustomerOrder | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sincronizar en tiempo real con la base de datos Turso en la nube
  useEffect(() => {
    let isMounted = true;
    async function syncFromTurso() {
      try {
        const [dbProducts, dbOrders, dbBlog] = await Promise.all([
          dbService.getProducts(),
          dbService.getOrders(),
          dbService.getBlogPosts(),
        ]);
        if (isMounted) {
          if (dbProducts && dbProducts.length > 0) {
            setProducts(dbProducts);
            setActiveProduct((prev) => {
              const matched = dbProducts.find((p) => p.id === prev.id || p.slug === prev.slug);
              return matched || dbProducts[0];
            });
          }
          if (Array.isArray(dbOrders)) {
            setOrders(dbOrders);
          }
          if (dbBlog && dbBlog.length > 0) {
            setBlogPosts(dbBlog);
          }
        }
      } catch (err) {
        console.warn('Error al sincronizar con Turso en arranque:', err);
      }
    }
    syncFromTurso();
    return () => {
      isMounted = false;
    };
  }, []);

  // Persist products
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products:', e);
    }
  }, [products]);

  // Persist blog posts
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BLOG, JSON.stringify(blogPosts));
    } catch (e) {
      console.error('Error saving blog posts:', e);
    }
  }, [blogPosts]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  }, [orders]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cartItems]);

  // URL Hash & Query routing listener
  useEffect(() => {
    const handleRoute = () => {
      const hash = window.location.hash.replace('#', '');
      const search = new URLSearchParams(window.location.search);

      if (search.get('admin') === 'true') {
        setIsAdminView(true);
        return;
      }

      // Check blog URL
      const blogParam = search.get('blog') || search.get('articulo');
      if (blogParam) {
        const found = blogPosts.find((b) => b.slug === blogParam || b.id === blogParam);
        if (found) {
          setSelectedBlogPost(found);
          setCurrentView('blog_post');
          return;
        }
      }

      if (hash.startsWith('/blog/') || hash.startsWith('blog/')) {
        const slug = hash.replace(/^\/?blog\//, '');
        const found = blogPosts.find((b) => b.slug === slug || b.id === slug);
        if (found) {
          setSelectedBlogPost(found);
          setCurrentView('blog_post');
          return;
        }
      } else if (hash === '/blog' || hash === 'blog' || search.get('view') === 'blog') {
        setCurrentView('blog_index');
        setSelectedBlogPost(null);
        return;
      }

      // Check product slug
      const prodSlug = search.get('p') || search.get('producto');
      if (prodSlug) {
        const foundProd = products.find((p) => p.slug === prodSlug || p.id === prodSlug);
        if (foundProd) {
          setActiveProduct(foundProd);
          setCurrentView('product');
          return;
        }
      } else if (hash.startsWith('/producto/') || hash.startsWith('producto/')) {
        const cleanProdSlug = hash.replace(/^\/?producto\//, '');
        const foundProd = products.find((p) => p.slug === cleanProdSlug || p.id === cleanProdSlug);
        if (foundProd) {
          setActiveProduct(foundProd);
          setCurrentView('product');
          return;
        }
      }
    };

    handleRoute();
    window.addEventListener('popstate', handleRoute);
    window.addEventListener('hashchange', handleRoute);

    return () => {
      window.removeEventListener('popstate', handleRoute);
      window.removeEventListener('hashchange', handleRoute);
    };
  }, [blogPosts, products]);

  // Navigation handlers
  const handleSelectProduct = (product: Product) => {
    setActiveProduct(product);
    setCurrentView('product');
    setCompletedOrder(null);
    setIsAdminView(false);
    window.location.hash = `/producto/${product.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBlogIndex = () => {
    setCurrentView('blog_index');
    setSelectedBlogPost(null);
    setCompletedOrder(null);
    setIsAdminView(false);
    window.location.hash = `/blog`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setCurrentView('blog_post');
    setCompletedOrder(null);
    setIsAdminView(false);
    window.location.hash = `/blog/${post.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to cart handler
  const handleAddToCart = (bundle: BundleTier, flavor: string, size: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === activeProduct.id &&
          item.bundle.id === bundle.id &&
          item.selectedFlavor === flavor &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      } else {
        return [
          ...prev,
          {
            product: activeProduct,
            bundle,
            selectedFlavor: flavor,
            selectedSize: size,
            quantity: 1,
          },
        ];
      }
    });

    setToastMessage(`¡${activeProduct.name.split(' ')[0]} añadido al pedido!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Buy now (adds and opens drawer immediately)
  const handleBuyNow = (bundle: BundleTier, flavor: string, size: string) => {
    handleAddToCart(bundle, flavor, size);
    setIsCartOpen(true);
  };

  // Quantity updates
  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Add review to current product
  const handleAddReview = (newReview: ProductReview) => {
    const updatedProducts = products.map((p) => {
      if (p.id === activeProduct.id) {
        const updatedReviews = [newReview, ...p.reviews];
        const newRating = Number(
          (
            updatedReviews.reduce((acc, r) => acc + r.rating, 0) /
            updatedReviews.length
          ).toFixed(2)
        );
        return {
          ...p,
          reviews: updatedReviews,
          rating: newRating,
          reviewsCount: updatedReviews.length,
        };
      }
      return p;
    });

    setProducts(updatedProducts);
    const updatedActive = updatedProducts.find((p) => p.id === activeProduct.id);
    if (updatedActive) setActiveProduct(updatedActive);

    dbService.addReview(newReview, activeProduct.id).catch(console.error);
    setToastMessage('¡Gracias por tu reseña verificada! Guardada en la base de datos.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Admin Product Actions
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    if (activeProduct.id === updatedProduct.id) {
      setActiveProduct(updatedProduct);
    }
    dbService.saveProduct(updatedProduct).catch(console.error);
    setToastMessage(`Página de "${updatedProduct.name}" sincronizada en Turso DB.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
    dbService.saveProduct(newProduct).catch(console.error);
    setToastMessage(`Nueva landing para "${newProduct.name}" creada en Turso DB.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteProduct = (productId: string) => {
    if (products.length <= 1) return;
    const remaining = products.filter((p) => p.id !== productId);
    setProducts(remaining);
    if (activeProduct.id === productId) {
      setActiveProduct(remaining[0]);
    }
    dbService.deleteProduct(productId).catch(console.error);
    setToastMessage('Landing page eliminada de Turso DB.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDuplicateProduct = (productToDuplicate: Product) => {
    const cloned: Product = {
      ...productToDuplicate,
      id: `prod_${Date.now()}`,
      slug: `${productToDuplicate.slug}-copia`,
      name: `${productToDuplicate.name} (Copia)`,
      published: false,
    };
    setProducts((prev) => [...prev, cloned]);
    dbService.saveProduct(cloned).catch(console.error);
    setToastMessage(`Landing duplicada en Turso DB: "${cloned.name}".`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Admin Blog Actions
  const handleUpdateBlogPost = (updatedPost: BlogPost) => {
    setBlogPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
    if (selectedBlogPost?.id === updatedPost.id) {
      setSelectedBlogPost(updatedPost);
    }
    dbService.saveBlogPost(updatedPost).catch(console.error);
    setToastMessage(`Artículo "${updatedPost.title.slice(0, 24)}..." guardado en Turso DB.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateBlogPost = (newPost: BlogPost) => {
    setBlogPosts((prev) => [newPost, ...prev]);
    dbService.saveBlogPost(newPost).catch(console.error);
    setToastMessage('Nuevo artículo de blog guardado en Turso DB.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteBlogPost = (postId: string) => {
    if (blogPosts.length <= 1) return;
    setBlogPosts((prev) => prev.filter((p) => p.id !== postId));
    if (selectedBlogPost?.id === postId) {
      setSelectedBlogPost(null);
      setCurrentView('blog_index');
    }
    dbService.deleteBlogPost(postId).catch(console.error);
    setToastMessage('Artículo de blog eliminado de Turso DB.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDuplicateBlogPost = (postToDuplicate: BlogPost) => {
    const cloned: BlogPost = {
      ...postToDuplicate,
      id: `post_${Date.now()}`,
      slug: `${postToDuplicate.slug}-copia`,
      title: `${postToDuplicate.title} (Copia)`,
      status: 'draft',
      publishedAt: new Date().toISOString().split('T')[0],
      blocks: postToDuplicate.blocks.map((b) => ({
        ...b,
        id: `b_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      })),
    };
    setBlogPosts((prev) => [cloned, ...prev]);
    dbService.saveBlogPost(cloned).catch(console.error);
    setToastMessage(`Artículo duplicado en Turso DB como borrador.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetDefaults = () => {
    if (
      confirm(
        '¿Deseas restaurar los productos originales de fábrica? Se perderán las modificaciones no guardadas.'
      )
    ) {
      setProducts(DEFAULT_PRODUCTS);
      setBlogPosts(DEFAULT_BLOG_POSTS);
      setActiveProduct(DEFAULT_PRODUCTS[0]);
      localStorage.removeItem(STORAGE_KEY_PRODUCTS);
      localStorage.removeItem(STORAGE_KEY_BLOG);
      // Re-seed Turso DB as well
      Promise.all([
        ...DEFAULT_PRODUCTS.map((p) => dbService.saveProduct(p)),
        ...DEFAULT_BLOG_POSTS.map((b) => dbService.saveBlogPost(b)),
      ]).catch(console.error);
      setToastMessage('Plantillas originales y artículos restaurados y sincronizados.');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  // Order placed handler -> switches to dedicated Thank You Page!
  const handleCompleteOrder = (order: CustomerOrder) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    setCompletedOrder(order);
    dbService.saveOrder(order).catch(console.error);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Order status management
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    dbService.updateOrderStatus(orderId, newStatus).catch(console.error);
    setToastMessage(`Estado del pedido ${orderId} actualizado a "${newStatus}" en Turso DB.`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    dbService.deleteOrder(orderId).catch(console.error);
    setToastMessage(`Pedido ${orderId} eliminado de la base de datos.`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const totalCartUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 selection:bg-[#7cb20b]/20 selection:text-slate-900 w-full max-w-full">
      
      {/* Toast Notification */}
      {toastMessage && (
        <aside
          aria-label="Notificaciones"
          className="fixed top-20 right-4 z-50 bg-slate-900 text-white text-xs font-semibold py-2.5 px-4 rounded-lg shadow-xl border border-slate-700 flex items-center gap-2 animate-bounce"
        >
          <div className="w-4 h-4 rounded-full bg-[#7cb20b] text-slate-950 flex items-center justify-center text-[10px] font-black">
            ✓
          </div>
          <span>{toastMessage}</span>
        </aside>
      )}

      {/* Main Mode Routing */}
      {isAdminView ? (
        <AdminDashboard
          products={products}
          orders={orders}
          blogPosts={blogPosts}
          onUpdateProduct={handleUpdateProduct}
          onCreateProduct={handleCreateProduct}
          onDeleteProduct={handleDeleteProduct}
          onDuplicateProduct={handleDuplicateProduct}
          onSelectProductToView={handleSelectProduct}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onDeleteOrder={handleDeleteOrder}
          onUpdateBlogPost={handleUpdateBlogPost}
          onCreateBlogPost={handleCreateBlogPost}
          onDeleteBlogPost={handleDeleteBlogPost}
          onDuplicateBlogPost={handleDuplicateBlogPost}
          onSelectBlogPostToView={handleSelectBlogPost}
          onResetDefaults={handleResetDefaults}
          onCloseAdmin={() => setIsAdminView(false)}
        />
      ) : completedOrder ? (
        /* DEDICATED THANK YOU PAGE AFTER CHECKOUT */
        <div>
          <Header
            currentProduct={activeProduct}
            allProducts={products}
            onSelectProduct={handleSelectProduct}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={totalCartUnits}
            onOpenAdmin={() => setIsAdminView(true)}
            isAdminView={false}
            onOpenBlog={handleOpenBlogIndex}
            isBlogView={false}
          />
          <ThankYouPage
            order={completedOrder}
            onBackToStore={() => {
              setCompletedOrder(null);
              setCurrentView('product');
            }}
          />
          <Footer
            products={products}
            onSelectProduct={handleSelectProduct}
            onOpenAdmin={() => setIsAdminView(true)}
            onOpenBlog={handleOpenBlogIndex}
          />
        </div>
      ) : currentView === 'blog_post' && selectedBlogPost ? (
        /* DEDICATED BLOG POST ARTICLE VIEW */
        <div className="flex flex-col min-h-screen">
          <Header
            currentProduct={activeProduct}
            allProducts={products}
            onSelectProduct={handleSelectProduct}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={totalCartUnits}
            onOpenAdmin={() => setIsAdminView(true)}
            isAdminView={false}
            onOpenBlog={handleOpenBlogIndex}
            isBlogView={true}
          />
          <div className="flex-1">
            <BlogPostView
              post={selectedBlogPost}
              allPosts={blogPosts}
              allProducts={products}
              onSelectPost={handleSelectBlogPost}
              onSelectProduct={handleSelectProduct}
              onBackToBlog={handleOpenBlogIndex}
            />
          </div>
          <Footer
            products={products}
            onSelectProduct={handleSelectProduct}
            onOpenAdmin={() => setIsAdminView(true)}
            onOpenBlog={handleOpenBlogIndex}
          />
        </div>
      ) : currentView === 'blog_index' ? (
        /* DEDICATED BLOG ARTICLES DIRECTORY */
        <div className="flex flex-col min-h-screen">
          <Header
            currentProduct={activeProduct}
            allProducts={products}
            onSelectProduct={handleSelectProduct}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={totalCartUnits}
            onOpenAdmin={() => setIsAdminView(true)}
            isAdminView={false}
            onOpenBlog={handleOpenBlogIndex}
            isBlogView={true}
          />
          <div className="flex-1">
            <BlogIndexPage
              posts={blogPosts}
              allProducts={products}
              onSelectPost={handleSelectBlogPost}
              onSelectProduct={handleSelectProduct}
              onBackToShop={() => setCurrentView('product')}
            />
          </div>
          <Footer
            products={products}
            onSelectProduct={handleSelectProduct}
            onOpenAdmin={() => setIsAdminView(true)}
            onOpenBlog={handleOpenBlogIndex}
          />
        </div>
      ) : (
        /* STANDARD DEDICATED PRODUCT LANDING STOREFRONT */
        <div className="flex flex-col min-h-screen w-full max-w-full">
          {/* Top Announcement Bar */}
          <div className="bg-slate-950 text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-center font-medium border-b border-slate-800 w-full max-w-full">
            <span className="font-bold text-[#7cb20b]">ENVÍOS A TODA COLOMBIA</span>
            <span className="mx-2 text-slate-600">·</span>
            <span>Garantía de Satisfacción 30 Días</span>
            <span className="mx-2 text-slate-600 hidden sm:inline">·</span>
            <span className="text-slate-400 hidden sm:inline">Entregas express 24-48 horas</span>
          </div>

          {/* Navigation Header strictly following 3-Zone Top Bar Contract */}
          <Header
            currentProduct={activeProduct}
            allProducts={products}
            onSelectProduct={handleSelectProduct}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={totalCartUnits}
            onOpenAdmin={() => setIsAdminView(true)}
            isAdminView={false}
            onOpenBlog={handleOpenBlogIndex}
            isBlogView={false}
          />

          {/* Standalone Product Sales Landing Page */}
          <div className="flex-1">
            <TankLandingPage
              product={activeProduct}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onAddReview={handleAddReview}
            />
          </div>

          {/* Global Footer */}
          <Footer
            products={products}
            onSelectProduct={handleSelectProduct}
            onOpenAdmin={() => setIsAdminView(true)}
            onOpenBlog={handleOpenBlogIndex}
          />
        </div>
      )}

      {/* Checkout Drawer */}
      <CheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
        onCompleteOrder={handleCompleteOrder}
      />

    </div>
  );
}
