export type BlogCategory = 
  | 'Nutrición'
  | 'Suplementación'
  | 'Entrenamiento'
  | 'Salud y Bienestar'
  | 'Ciencia Deportiva';

export type BlogBlockType = 
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'callout'
  | 'list'
  | 'quote'
  | 'product_card';

export interface BlogContentBlock {
  id: string;
  type: BlogBlockType;
  // heading
  level?: 'h2' | 'h3';
  title?: string;
  // paragraph / quote
  content?: string;
  // image
  imageUrl?: string;
  imageCaption?: string;
  imageAlt?: string;
  // callout
  calloutType?: 'tip' | 'warning' | 'science';
  calloutTitle?: string;
  calloutText?: string;
  // list
  listStyle?: 'bullet' | 'ordered';
  listItems?: string[];
  // quote
  quoteAuthor?: string;
  // product card embedded
  productId?: string;
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
  coverImageCaption?: string;
  category: BlogCategory;
  tags: string[];
  author: BlogAuthor;
  publishedAt: string; // YYYY-MM-DD
  readTimeMinutes: number;
  status: 'published' | 'draft';
  
  // Content blocks
  blocks: BlogContentBlock[];
  
  // Attached commercial products from TopOneNutrition catalog
  attachedProductIds: string[];
  
  // Related articles for «Noticias de interés»
  relatedPostIds: string[];
  
  // SEO Fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}
