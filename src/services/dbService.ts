import { turso } from '../lib/turso';
import { Product, CustomerOrder, OrderStatus, ProductReview } from '../types/product';
import { BlogPost } from '../types/blog';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts';
import { DEFAULT_BLOG_POSTS } from '../data/defaultBlogPosts';

export const dbService = {
  // --- PRODUCTOS ---
  async getProducts(): Promise<Product[]> {
    try {
      const res = await turso.execute('SELECT data_json FROM products ORDER BY rowid ASC');
      if (res.rows && res.rows.length > 0) {
        return res.rows.map((r) => JSON.parse(r.data_json as string) as Product);
      }
    } catch (err) {
      console.warn('Advertencia al consultar Turso DB para productos, usando fallback:', err);
    }
    return DEFAULT_PRODUCTS;
  },

  async saveProduct(prod: Product): Promise<void> {
    try {
      await turso.execute({
        sql: `
          INSERT INTO products (
            id, slug, name, tagline, category, badge, rating, reviews_count,
            base_price, original_price, image_type, custom_image_url,
            accent_color, secondary_color, canister_color,
            hero_title, hero_subtitle, cta_text, guarantee_days,
            stock_status, published, data_json, updated_at
          ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?,
            ?, ?, ?,
            ?, ?, ?, ?,
            ?, ?, ?, CURRENT_TIMESTAMP
          )
          ON CONFLICT(id) DO UPDATE SET
            slug = excluded.slug,
            name = excluded.name,
            tagline = excluded.tagline,
            category = excluded.category,
            badge = excluded.badge,
            rating = excluded.rating,
            reviews_count = excluded.reviews_count,
            base_price = excluded.base_price,
            original_price = excluded.original_price,
            image_type = excluded.image_type,
            custom_image_url = excluded.custom_image_url,
            accent_color = excluded.accent_color,
            secondary_color = excluded.secondary_color,
            canister_color = excluded.canister_color,
            hero_title = excluded.hero_title,
            hero_subtitle = excluded.hero_subtitle,
            cta_text = excluded.cta_text,
            guarantee_days = excluded.guarantee_days,
            stock_status = excluded.stock_status,
            published = excluded.published,
            data_json = excluded.data_json,
            updated_at = CURRENT_TIMESTAMP;
        `,
        args: [
          prod.id,
          prod.slug,
          prod.name,
          prod.tagline,
          prod.category,
          prod.badge,
          prod.rating,
          prod.reviewsCount,
          prod.basePrice,
          prod.originalPrice,
          prod.imageType,
          prod.customImageUrl || '',
          prod.accentColor,
          prod.secondaryColor || '',
          prod.canisterColor || 'dark',
          prod.heroTitle,
          prod.heroSubtitle,
          prod.ctaText,
          prod.guaranteeDays,
          prod.stockStatus,
          prod.published ? 1 : 0,
          JSON.stringify(prod),
        ],
      });
    } catch (err) {
      console.error('Error al guardar producto en Turso:', err);
      throw err;
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      await turso.execute({
        sql: 'DELETE FROM products WHERE id = ?',
        args: [id],
      });
    } catch (err) {
      console.error('Error al eliminar producto de Turso:', err);
      throw err;
    }
  },

  // --- PEDIDOS (ORDERS) ---
  async getOrders(): Promise<CustomerOrder[]> {
    try {
      const res = await turso.execute('SELECT data_json FROM orders ORDER BY created_at DESC');
      if (res.rows && res.rows.length > 0) {
        return res.rows.map((r) => JSON.parse(r.data_json as string) as CustomerOrder);
      }
    } catch (err) {
      console.warn('Advertencia al consultar Turso DB para pedidos:', err);
    }
    return [];
  },

  async saveOrder(order: CustomerOrder): Promise<void> {
    try {
      await turso.execute({
        sql: `
          INSERT INTO orders (
            id, created_at, status, customer_name, customer_phone,
            customer_address, customer_city, customer_postal_code,
            customer_notes, subtotal, shipping_cost, total,
            payment_method, data_json
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            status = excluded.status,
            data_json = excluded.data_json;
        `,
        args: [
          order.id,
          order.createdAt,
          order.status,
          order.customer.name,
          order.customer.phone,
          order.customer.address,
          order.customer.city,
          order.customer.postalCode,
          order.customer.notes || '',
          order.subtotal,
          order.shippingCost,
          order.total,
          order.paymentMethod,
          JSON.stringify(order),
        ],
      });
    } catch (err) {
      console.error('Error al guardar pedido en Turso:', err);
      throw err;
    }
  },

  async updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
    try {
      const res = await turso.execute({
        sql: 'SELECT data_json FROM orders WHERE id = ?',
        args: [id],
      });
      if (res.rows && res.rows.length > 0) {
        const order = JSON.parse(res.rows[0].data_json as string) as CustomerOrder;
        order.status = status;
        await turso.execute({
          sql: 'UPDATE orders SET status = ?, data_json = ? WHERE id = ?',
          args: [status, JSON.stringify(order), id],
        });
      }
    } catch (err) {
      console.error('Error al actualizar estado del pedido en Turso:', err);
      throw err;
    }
  },

  async deleteOrder(id: string): Promise<void> {
    try {
      await turso.execute({
        sql: 'DELETE FROM orders WHERE id = ?',
        args: [id],
      });
    } catch (err) {
      console.error('Error al eliminar pedido de Turso:', err);
      throw err;
    }
  },

  // --- BLOG POSTS ---
  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const res = await turso.execute('SELECT data_json FROM blog_posts ORDER BY published_at DESC');
      if (res.rows && res.rows.length > 0) {
        return res.rows.map((r) => JSON.parse(r.data_json as string) as BlogPost);
      }
    } catch (err) {
      console.warn('Advertencia al consultar Turso DB para blog posts, usando fallback:', err);
    }
    return DEFAULT_BLOG_POSTS;
  },

  async saveBlogPost(post: BlogPost): Promise<void> {
    try {
      await turso.execute({
        sql: `
          INSERT INTO blog_posts (
            id, slug, title, subtitle, category, cover_image, published_at, status, data_json, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
          ON CONFLICT(id) DO UPDATE SET
            slug = excluded.slug,
            title = excluded.title,
            subtitle = excluded.subtitle,
            category = excluded.category,
            cover_image = excluded.cover_image,
            published_at = excluded.published_at,
            status = excluded.status,
            data_json = excluded.data_json,
            updated_at = CURRENT_TIMESTAMP;
        `,
        args: [
          post.id,
          post.slug,
          post.title,
          post.subtitle || '',
          post.category,
          post.coverImage || '',
          post.publishedAt,
          post.status,
          JSON.stringify(post),
        ],
      });
    } catch (err) {
      console.error('Error al guardar artículo de blog en Turso:', err);
      throw err;
    }
  },

  async deleteBlogPost(id: string): Promise<void> {
    try {
      await turso.execute({
        sql: 'DELETE FROM blog_posts WHERE id = ?',
        args: [id],
      });
    } catch (err) {
      console.error('Error al eliminar artículo de blog en Turso:', err);
      throw err;
    }
  },

  // --- RESEÑAS (REVIEWS) ---
  async addReview(review: ProductReview, productId: string): Promise<void> {
    try {
      await turso.execute({
        sql: `
          INSERT INTO reviews (
            id, product_id, author, verified, date, rating, title, comment, objective, helpful_count
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        args: [
          review.id,
          productId,
          review.author,
          review.verified ? 1 : 0,
          review.date,
          review.rating,
          review.title,
          review.comment,
          review.objective || '',
          review.helpfulCount || 0,
        ],
      });

      const res = await turso.execute({
        sql: 'SELECT data_json FROM products WHERE id = ?',
        args: [productId],
      });
      if (res.rows && res.rows.length > 0) {
        const prod = JSON.parse(res.rows[0].data_json as string) as Product;
        prod.reviews = [review, ...(prod.reviews || [])];
        prod.reviewsCount = (prod.reviewsCount || 0) + 1;
        await dbService.saveProduct(prod);
      }
    } catch (err) {
      console.error('Error al guardar reseña en Turso:', err);
    }
  },
};
