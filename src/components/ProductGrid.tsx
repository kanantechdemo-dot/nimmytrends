import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, HairType } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, X, Sparkles, RotateCcw } from 'lucide-react';

interface ProductGridProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
}

type SortOption = 'featured' | 'bestsellers' | 'price-asc' | 'price-desc' | 'rating';

export const ProductGrid: React.FC<ProductGridProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedHairType, setSelectedHairType] = useState<HairType>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'under25' | '25to45' | 'above45'>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filter materials list
  const materials = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => {
      if (p.material.includes('Remy') || p.material.includes('Human Hair')) set.add('Remy Human Hair');
      else if (p.material.includes('Silk')) set.add('Mulberry Silk');
      else if (p.material.includes('Pearl')) set.add('Freshwater Pearl');
      else if (p.material.includes('Gold') || p.material.includes('Brass') || p.material.includes('Crystals')) set.add('Gold & Jewels');
      else if (p.material.includes('Acetate') || p.material.includes('Cellulose')) set.add('Cellulose Acetate');
      else if (p.material.includes('Ceramic') || p.material.includes('Bristles')) set.add('Ionic & Natural Tools');
    });
    return Array.from(set);
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches = 
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.material.toLowerCase().includes(query) ||
          item.tagline.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Hair type filter
      if (selectedHairType !== 'all') {
        if (item.hairType !== 'all' && item.hairType !== selectedHairType) {
          return false;
        }
      }

      // Price filter
      if (priceRange === 'under25' && item.price >= 25) return false;
      if (priceRange === '25to45' && (item.price < 25 || item.price > 45)) return false;
      if (priceRange === 'above45' && item.price <= 45) return false;

      // Material filter
      if (selectedMaterial !== 'all') {
        if (!item.material.toLowerCase().includes(selectedMaterial.toLowerCase().split(' ')[0])) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'bestsellers') {
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      }
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [activeCategory, searchQuery, selectedHairType, priceRange, selectedMaterial, sortBy]);

  const hasActiveFilters = 
    selectedHairType !== 'all' || 
    priceRange !== 'all' || 
    selectedMaterial !== 'all';

  const clearFilters = () => {
    setSelectedHairType('all');
    setPriceRange('all');
    setSelectedMaterial('all');
  };

  return (
    <section id="products-catalog-section" className="py-12 bg-[#FAF7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Control Toolbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#EAE0D8] gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#A46358] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Couture Hair Accessories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2825] mt-1 capitalize font-normal">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : activeCategory === 'all'
                ? 'All Handcrafted Collections'
                : activeCategory === 'hair-extensions'
                ? 'Hair Extensions'
                : activeCategory === 'hair-accessories'
                ? 'Hair Accessories'
                : activeCategory === 'brooches'
                ? 'Brooches'
                : activeCategory === 'styling-tools'
                ? 'Styling Tools'
                : 'Pins & Barrettes'}
            </h2>
            <p className="text-xs sm:text-sm text-[#786F6A] mt-1">
              Showing {filteredProducts.length} luxury hair essentials
            </p>
          </div>

          {/* Controls: Filter Button (Mobile/Tablet) & Sorting */}
          <div className="flex items-center space-x-3 self-start md:self-auto">
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border ${
                hasActiveFilters
                  ? 'bg-[#F2E5E0] text-[#A46358] border-[#DECAC2]'
                  : 'bg-white text-[#4A423D] border-[#E2D5CC] hover:bg-[#F7EFEB]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#A46358]" />
              )}
            </button>

            {/* Sort Select */}
            <div className="flex items-center space-x-2 bg-white border border-[#E2D5CC] rounded-xl px-3 py-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8C7D75]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-xs text-[#2D2825] font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="bestsellers">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>
        </div>

        {/* Collapsible Filter Bar */}
        {isFilterDrawerOpen && (
          <div className="bg-white rounded-2xl border border-[#EDE2D8] p-5 my-6 shadow-xs animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EAE5]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2825] flex items-center space-x-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#A46358]" />
                <span>Refine by Hair Type, Price & Material</span>
              </h4>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-[#A46358] hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset all</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs">
              
              {/* Hair Type Filter */}
              <div>
                <span className="font-semibold text-[#4A423D] uppercase tracking-wider block mb-2">
                  Hair Type / Texture
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All Hair' },
                    { id: 'fine', label: 'Fine' },
                    { id: 'thick', label: 'Thick' },
                    { id: 'curly', label: 'Curly' },
                    { id: 'wavy', label: 'Wavy' },
                  ].map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setSelectedHairType(h.id as HairType)}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                        selectedHairType === h.id
                          ? 'bg-[#2D2825] text-white font-medium'
                          : 'bg-[#F9F5F1] text-[#5C534D] hover:bg-[#EFE5DE]'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <span className="font-semibold text-[#4A423D] uppercase tracking-wider block mb-2">
                  Price Range
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under25', label: 'Under $25' },
                    { id: '25to45', label: '$25 – $45' },
                    { id: 'above45', label: '$45+' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPriceRange(p.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                        priceRange === p.id
                          ? 'bg-[#2D2825] text-white font-medium'
                          : 'bg-[#F9F5F1] text-[#5C534D] hover:bg-[#EFE5DE]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Filter */}
              <div>
                <span className="font-semibold text-[#4A423D] uppercase tracking-wider block mb-2">
                  Artisan Material
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedMaterial('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                      selectedMaterial === 'all'
                        ? 'bg-[#2D2825] text-white font-medium'
                        : 'bg-[#F9F5F1] text-[#5C534D] hover:bg-[#EFE5DE]'
                    }`}
                  >
                    All Materials
                  </button>
                  {materials.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMaterial(m)}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                        selectedMaterial === m
                          ? 'bg-[#2D2825] text-white font-medium'
                          : 'bg-[#F9F5F1] text-[#5C534D] hover:bg-[#EFE5DE]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex items-center flex-wrap gap-2 pt-4">
            <span className="text-[11px] font-medium text-[#786F6A]">Active Filters:</span>
            {selectedHairType !== 'all' && (
              <span className="inline-flex items-center space-x-1 bg-[#F5EAE6] text-[#A46358] text-xs px-2.5 py-1 rounded-full">
                <span>Hair: {selectedHairType}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedHairType('all')} />
              </span>
            )}
            {priceRange !== 'all' && (
              <span className="inline-flex items-center space-x-1 bg-[#F5EAE6] text-[#A46358] text-xs px-2.5 py-1 rounded-full">
                <span>Price: {priceRange}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange('all')} />
              </span>
            )}
            {selectedMaterial !== 'all' && (
              <span className="inline-flex items-center space-x-1 bg-[#F5EAE6] text-[#A46358] text-xs px-2.5 py-1 rounded-full">
                <span>Material: {selectedMaterial}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedMaterial('all')} />
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-[11px] text-[#8C7D75] hover:text-[#2D2825] underline ml-1 cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#EDE2D8] mt-6 p-8">
            <div className="w-16 h-16 rounded-full bg-[#FAF0EC] flex items-center justify-center mx-auto mb-4 text-[#A46358]">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif text-[#2D2825]">No pieces match your specific criteria</h3>
            <p className="text-sm text-[#786F6A] max-w-md mx-auto mt-2">
              Try adjusting your filter sliders or search query to browse our other handcrafted collections.
            </p>
            <button
              onClick={() => {
                clearFilters();
                onSelectCategory('all');
              }}
              className="mt-6 px-6 py-2.5 bg-[#2D2825] text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#3E3834] transition-colors cursor-pointer"
            >
              View All Collections
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
