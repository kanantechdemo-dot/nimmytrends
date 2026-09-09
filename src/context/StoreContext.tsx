import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductColor, CartItem, CurrencyCode, CurrencyConfig } from '../types';
import { PRODUCTS, PROMO_CODES } from '../data/products';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1.36 },
  INR: { code: 'INR', symbol: '₹', rate: 83.5 },
};

export interface Toast {
  id: string;
  type: 'cart' | 'wishlist' | 'info' | 'success';
  title: string;
  message: string;
  image?: string;
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color?: ProductColor, quantity?: number) => void;
  removeFromCart: (productId: string, colorName: string) => void;
  updateQuantity: (productId: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  appliedPromo: string | null;
  promoDiscount: number;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Checkout Modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Hair Quiz Modal
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;

  // Currency
  currency: CurrencyConfig;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;

  // Toast
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart State with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nimmytrends_cart');
      return saved ? JSON.parse(saved) : [
        // Preload one starter item so new users see cart mechanics immediately
        {
          product: PRODUCTS[0],
          selectedColor: PRODUCTS[0].colors[0],
          quantity: 1,
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist State with localStorage persistence
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nimmytrends_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[1].id, PRODUCTS[3].id];
    } catch {
      return [];
    }
  });

  // Currency State
  const [currency, setCurrency] = useState<CurrencyConfig>(() => {
    try {
      const saved = localStorage.getItem('nimmytrends_currency') as CurrencyCode;
      return (saved && CURRENCIES[saved]) ? CURRENCIES[saved] : CURRENCIES.USD;
    } catch {
      return CURRENCIES.USD;
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Promo codes
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('nimmytrends_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nimmytrends_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setCurrencyCode = (code: CurrencyCode) => {
    const nextCurrency = CURRENCIES[code] || CURRENCIES.USD;
    setCurrency(nextCurrency);
    try {
      localStorage.setItem('nimmytrends_currency', code);
    } catch (e) {
      console.error(e);
    }
  };

  const formatPrice = (amountInUSD: number): string => {
    const converted = amountInUSD * currency.rate;
    if (currency.code === 'INR') {
      return `${currency.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  const addToCart = (product: Product, color?: ProductColor, quantity = 1) => {
    const chosenColor = color || product.colors[0];
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.name === chosenColor.name
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedColor: chosenColor, quantity }];
    });

    showToast({
      type: 'cart',
      title: 'Added to Bag',
      message: `${quantity}× ${product.name} (${chosenColor.name})`,
      image: chosenColor.image || product.images[0],
    });
  };

  const removeFromCart = (productId: string, colorName: string) => {
    setCart((prev) => prev.filter(
      (item) => !(item.product.id === productId && item.selectedColor.name === colorName)
    ));
  };

  const updateQuantity = (productId: string, colorName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorName);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor.name === colorName
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const applyPromo = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    if (PROMO_CODES[clean]) {
      setAppliedPromo(clean);
      const discount = PROMO_CODES[clean].discountPercent;
      showToast({
        type: 'success',
        title: 'Promo Applied!',
        message: `${PROMO_CODES[clean].description} (${discount}% OFF)`,
      });
      return { success: true, message: `${discount}% off applied successfully!` };
    }
    return { success: false, message: 'Invalid promo code. Try BEAUTIFUL10' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const promoDiscount = appliedPromo && PROMO_CODES[appliedPromo]
    ? (cartSubtotal * PROMO_CODES[appliedPromo].discountPercent) / 100
    : 0;

  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast({
          type: 'info',
          title: 'Removed from Wishlist',
          message: product ? product.name : 'Item removed',
        });
        return prev.filter((id) => id !== productId);
      } else {
        showToast({
          type: 'wishlist',
          title: 'Saved to Wishlist',
          message: product ? product.name : 'Saved to favorites',
          image: product?.images[0],
        });
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        appliedPromo,
        promoDiscount,
        applyPromo,
        removePromo,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isQuizOpen,
        setIsQuizOpen,
        currency,
        setCurrencyCode,
        formatPrice,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
