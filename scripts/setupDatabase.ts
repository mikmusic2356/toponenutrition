import { createClient } from '@libsql/client';
import { DEFAULT_PRODUCTS } from '../src/data/defaultProducts';
import { DEFAULT_BLOG_POSTS } from '../src/data/defaultBlogPosts';

const TURSO_URL = process.env.TURSO_DATABASE_URL || '';
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN || '';

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
});

async function setup() {
  console.log('--- Conectando a Turso DB ---');
  console.log('URL:', TURSO_URL);

  // 1. Create tables
  console.log('Creando esquemas de tablas en Turso...');

  await client.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      tagline TEXT,
      category TEXT NOT NULL,
      badge TEXT,
      rating REAL DEFAULT 5.0,
      reviews_count INTEGER DEFAULT 0,
      base_price REAL NOT NULL,
      original_price REAL NOT NULL,
      image_type TEXT DEFAULT 'custom',
      custom_image_url TEXT,
      accent_color TEXT DEFAULT '#7cb20b',
      secondary_color TEXT,
      canister_color TEXT DEFAULT 'dark',
      hero_title TEXT,
      hero_subtitle TEXT,
      cta_text TEXT,
      guarantee_days INTEGER DEFAULT 30,
      stock_status TEXT DEFAULT 'in_stock',
      published INTEGER DEFAULT 1,
      data_json TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      status TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      customer_address TEXT NOT NULL,
      customer_city TEXT NOT NULL,
      customer_postal_code TEXT NOT NULL,
      customer_notes TEXT,
      subtotal REAL NOT NULL,
      shipping_cost REAL NOT NULL,
      total REAL NOT NULL,
      payment_method TEXT NOT NULL,
      data_json TEXT NOT NULL
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT,
      category TEXT NOT NULL,
      cover_image TEXT,
      published_at TEXT,
      status TEXT DEFAULT 'published',
      data_json TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      author TEXT NOT NULL,
      verified INTEGER DEFAULT 1,
      date TEXT NOT NULL,
      rating REAL NOT NULL,
      title TEXT NOT NULL,
      comment TEXT NOT NULL,
      objective TEXT,
      helpful_count INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Tablas creadas con éxito: products, orders, blog_posts, reviews');

  // 2. Import products
  console.log('Sincronizando productos del catálogo Top One...');
  for (const prod of DEFAULT_PRODUCTS) {
    await client.execute({
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
        JSON.stringify(prod)
      ]
    });
    console.log(`  -> Producto guardado en Turso: [${prod.category}] ${prod.name}`);
  }

  // 3. Import blog posts
  console.log('Sincronizando artículos de blog...');
  for (const post of DEFAULT_BLOG_POSTS) {
    await client.execute({
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
        JSON.stringify(post)
      ]
    });
    console.log(`  -> Artículo de blog guardado en Turso: ${post.title}`);
  }

  // 4. Check results
  const pCount = await client.execute('SELECT COUNT(*) as count FROM products');
  const bCount = await client.execute('SELECT COUNT(*) as count FROM blog_posts');
  console.log(`\nBase de datos Turso operativa con éxito!`);
  console.log(`- Productos en DB: ${pCount.rows[0].count}`);
  console.log(`- Artículos de Blog en DB: ${bCount.rows[0].count}`);
}

setup().catch(console.error);
