export type ProductCategory = 
  | 'all' 
  | 'hair-extensions' 
  | 'hair-accessories' 
  | 'brooches' 
  | 'styling-tools' 
  | 'pins-barrettes';

export type HairType = 'all' | 'fine' | 'thick' | 'curly' | 'wavy' | 'straight';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  hairType: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: ProductCategory;
  material: string;
  hairType: HairType;
  colors: ProductColor[];
  images: string[];
  description: string;
  details: string[];
  careInstructions: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  isStaffPick?: boolean;
  stockLeft?: number;
  badge?: string;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'INR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
}
