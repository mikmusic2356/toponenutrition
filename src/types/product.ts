export type ProductCategory =
  | 'creatina'
  | 'proteina'
  | 'preentreno'
  | 'intra-entreno'
  | 'termogenico'
  | 'recuperacion'
  | 'hipercalorica'
  | 'aminoacidos'
  | 'multivitaminico'
  | 'accesorios';

export interface BundleTier {
  id: string;
  name: string;
  units: number;
  badge?: string;
  price: number;
  originalPrice: number;
  savingsText?: string;
  popular?: boolean;
  freeGift?: string;
}

export interface BenefitItem {
  id: string;
  icon: 'zap' | 'shield-check' | 'award' | 'flame' | 'activity' | 'heart' | 'sparkles' | 'check-circle';
  title: string;
  description: string;
  stat?: string;
}

export interface ComparisonRow {
  feature: string;
  topOne: string;
  competitor: string;
  topOneHighlight?: boolean;
}

export interface NutritionIngredient {
  ingredient: string;
  perServing: string;
  dailyValue?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  verified: boolean;
  date: string;
  rating: number;
  title: string;
  comment: string;
  objective?: string;
  helpfulCount?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SectionVisibility {
  hero: boolean;
  bundles: boolean;
  benefits: boolean;
  comparison: boolean;
  nutrition: boolean;
  reviews: boolean;
  faqs: boolean;
  guarantee: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  badge: string;
  rating: number;
  reviewsCount: number;
  basePrice: number;
  originalPrice: number;
  flavors: string[];
  sizes: string[];
  flavorImageMap?: Record<string, string>; // Maps each flavor name to an image URL
  imageType: 'creatine' | 'whey' | 'preworkout' | 'amino' | 'custom';
  customImageUrl?: string;
  gallery?: string[];
  accentColor: string; // default #7cb20b
  secondaryColor?: string; // e.g. #dc2626
  canisterColor?: 'dark' | 'white' | 'graphite' | 'lime';
  
  // High-converting copywriting
  heroTitle: string;
  heroSubtitle: string;
  heroBullets: string[];
  ctaText: string;
  guaranteeDays: number;
  guaranteeTitle?: string;
  guaranteeDescription?: string;
  stockStatus: 'in_stock' | 'low_stock';
  published: boolean;
  
  // Structured sections
  bundles: BundleTier[];
  benefits: BenefitItem[];
  
  salesArgumentsTitle?: string;
  salesArgumentsSubtitle?: string;
  salesArgumentsBullets?: string[];
  
  comparison: {
    badgeTitle?: string;
    title: string;
    subtitle: string;
    topOneLabel: string;
    competitorLabel: string;
    rows: ComparisonRow[];
  };
  
  nutritionalFacts: {
    badgeTitle?: string;
    sectionTitle?: string;
    sectionSubtitle?: string;
    displayMode?: 'table' | 'image';
    imageUrl?: string;
    imageCaption?: string;
    servingSize: string;
    servingsPerContainer: number;
    table: NutritionIngredient[];
    certificates: string[];
    usageInstructions: string;
  };
  
  reviews: ProductReview[];
  faqBadge?: string;
  faqTitle?: string;
  faqSubtitle?: string;
  faqs: FaqItem[];
  
  sectionsConfig: SectionVisibility;
}

export interface CartItem {
  product: Product;
  bundle: BundleTier;
  selectedFlavor: string;
  selectedSize: string;
  quantity: number;
}

export type OrderStatus = 'en_preparacion' | 'enviado' | 'entregado' | 'cancelado';

export interface CustomerOrder {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    notes?: string;
  };
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: 'epayco' | 'cod' | 'card' | 'bizum' | 'whatsapp';
}
