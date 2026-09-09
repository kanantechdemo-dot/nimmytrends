import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onSearch,
  searchQuery,
}) => {
  const { 
    cartCount, 
    cartSubtotal, 
    setIsCartOpen, 
    wishlistCount, 
    setIsWishlistOpen,
    formatPrice,
    setQuickViewProduct,
    setIsQuizOpen
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const navLinks: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'hair-extensions', label: 'Hair Extensions' },
    { id: 'hair-accessories', label: 'Hair Accessories' },
    { id: 'brooches', label: 'Brooches' },
    { id: 'styling-tools', label: 'Styling Tools' },
    { id: 'pins-barrettes', label: 'Pins & Barrettes' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F4]/95 backdrop-blur-md border-b border-[#EBE2DC] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-[#2D2825] hover:text-[#A46358] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#4A423D] hover:text-[#A46358] focus:outline-none"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Identity / Logo */}
          <div className="flex flex-col items-center lg:items-start select-none cursor-pointer" onClick={() => onSelectCategory('all')}>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2D2825]">
                NimmyTrends
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4877D] mt-1 hidden sm:inline-block"></span>
            </div>
            <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-light text-[#8C7D75] -mt-0.5">
              Makes you beautiful
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = activeCategory === link.id && !searchQuery;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onSelectCategory(link.id);
                    if (searchQuery) onSearch('');
                  }}
                  className={`text-xs xl:text-sm font-medium tracking-wide uppercase py-2 transition-all relative ${
                    isActive 
                      ? 'text-[#A46358] font-semibold' 
                      : 'text-[#5C534D] hover:text-[#2D2825]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C4877D] rounded-full animate-in fade-in" />
                  )}
                </button>
              );
            })}

            <button
              onClick={() => setIsQuizOpen(true)}
              className="inline-flex items-center space-x-1.5 text-xs font-medium uppercase tracking-wider text-[#A46358] bg-[#F5EAE6] hover:bg-[#EBDCD6] px-3 py-1.5 rounded-full transition-colors"
            >
              <Sparkles className="w-3 h-3 text-[#C4877D]" />
              <span>Hair Quiz</span>
            </button>
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Desktop Search trigger button */}
            <button
              id="desktop-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center space-x-2 text-xs text-[#786F6A] bg-[#F3ECE7] hover:bg-[#EBE2DC] hover:text-[#2D2825] px-3.5 py-2 rounded-full transition-colors"
              title="Search products"
            >
              <Search className="w-3.5 h-3.5 text-[#8C7D75]" />
              <span>Search extensions, accessories, brooches...</span>
            </button>

            {/* Wishlist Button with Badge */}
            <button
              id="header-wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-[#4A423D] hover:text-[#A46358] transition-colors focus:outline-none"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#C4877D] text-[#C4877D]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C4877D] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Bag / Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 bg-[#2D2825] hover:bg-[#3D3733] text-[#FAF7F4] px-3.5 py-2 rounded-full shadow-sm transition-all transform active:scale-95"
              aria-label={`Cart with ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#F5EAE6]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#C4877D] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#2D2825]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium tracking-wider hidden sm:inline-block">
                Bag
              </span>
              {cartCount > 0 && (
                <span className="text-xs font-semibold text-[#EBDCD6] hidden md:inline-block border-l border-[#4A423D] pl-2">
                  {formatPrice(cartSubtotal)}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Live Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#2D2825]/60 backdrop-blur-sm flex flex-col items-center pt-16 px-4 animate-in fade-in duration-200">
          <div 
            className="fixed inset-0"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-[#FAF7F4] rounded-2xl shadow-2xl border border-[#E0D5CE] p-4 sm:p-6 z-10">
            
            <div className="flex items-center justify-between border-b border-[#EBE2DC] pb-4">
              <div className="flex items-center space-x-3 flex-1">
                <Search className="w-5 h-5 text-[#8C7D75]" />
                <input
                  ref={searchInputRef}
                  id="main-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search hair extensions, hair accessories, brooches, styling tools..."
                  className="w-full bg-transparent text-base sm:text-lg text-[#2D2825] placeholder-[#A49B95] focus:outline-none"
                />
              </div>
              {searchQuery && (
                <button
                  onClick={() => onSearch('')}
                  className="text-xs text-[#8C7D75] hover:text-[#2D2825] px-2"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 text-[#786F6A] hover:text-[#2D2825] hover:bg-[#EFE7E2] rounded-full transition-colors ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Suggestions & Results */}
            <div className="mt-4 max-h-96 overflow-y-auto pr-1">
              {searchQuery.trim() ? (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#8C7D75] mb-3">
                    Found {searchResults.length} {searchResults.length === 1 ? 'item' : 'items'}
                  </div>
                  {searchResults.length === 0 ? (
                    <div className="py-8 text-center text-[#786F6A]">
                      <p className="text-sm">No hair treasures found matching &ldquo;{searchQuery}&rdquo;</p>
                      <p className="text-xs text-[#A49B95] mt-1">Try searching &ldquo;extensions&rdquo;, &ldquo;brooch&rdquo;, or &ldquo;curler&rdquo;</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setQuickViewProduct(item);
                            setIsSearchOpen(false);
                          }}
                          className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-[#F2E8E3] cursor-pointer transition-colors border border-transparent hover:border-[#E5D5CD]"
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded-lg shrink-0 bg-[#E8DDD7]"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium text-[#2D2825] truncate">{item.name}</h4>
                            <p className="text-[11px] text-[#786F6A] truncate">{item.material}</p>
                            <span className="text-xs font-semibold text-[#A46358]">{formatPrice(item.price)}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#A49B95] shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#8C7D75] mb-2">
                    Popular Searches
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Hair Extensions', 'Hair Accessories', 'Brooches', 'Heatless Curl Set', 'Pins & Barrettes'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => onSearch(tag)}
                        className="text-xs bg-[#F3ECE7] hover:bg-[#EBDCD6] text-[#4A423D] px-3 py-1.5 rounded-full transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-[#EBE2DC] pt-3 flex items-center justify-between text-xs text-[#786F6A]">
                    <span>Take our hair matcher quiz</span>
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setIsQuizOpen(true);
                      }}
                      className="text-[#A46358] font-medium hover:underline flex items-center space-x-1"
                    >
                      <span>Start 60s Quiz</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F4] border-b border-[#E0D5CE] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center bg-[#F3ECE7] rounded-xl px-3 py-2 text-sm text-[#2D2825]">
            <Search className="w-4 h-4 text-[#8C7D75] mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search accessories..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="bg-transparent w-full focus:outline-none text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const isActive = activeCategory === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onSelectCategory(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium tracking-wide uppercase transition-colors ${
                    isActive 
                      ? 'bg-[#EBDCD6] text-[#A46358] font-semibold' 
                      : 'text-[#4A423D] hover:bg-[#F3ECE7]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="border-t border-[#EAE1DA] pt-3 flex flex-col space-y-2">
            <button
              onClick={() => {
                setIsQuizOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-[#F5EAE6] text-[#A46358] py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hair Routine Matcher Quiz</span>
            </button>
            <div className="text-center text-[11px] text-[#8C7D75] pt-1">
              Official Tagline: <span className="italic">Makes you beautiful</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
