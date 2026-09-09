import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isWishlisted, 
    setQuickViewProduct 
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isFavorite = isWishlisted(product.id);
  const displayImage = selectedColor.image || product.images[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-2xl border border-[#EDE3DC] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image & Badges Container */}
      <div 
        className="relative aspect-4/5 w-full overflow-hidden bg-[#F5EFEA] cursor-pointer"
        onClick={() => setQuickViewProduct(product)}
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="inline-block bg-white/90 backdrop-blur-xs text-[#A46358] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs border border-[#F2E5DF]">
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="inline-block bg-[#2D2825]/90 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
              Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/85 hover:bg-white text-[#4A423D] hover:text-[#C4877D] backdrop-blur-xs shadow-sm transition-transform active:scale-90 z-10"
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-[#C4877D] text-[#C4877D]' : 'text-[#786F6A]'
            }`} 
          />
        </button>

        {/* Hover Quick View Trigger (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleQuickView}
            className="w-full py-2.5 bg-white/95 hover:bg-white text-[#2D2825] text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md backdrop-blur-sm flex items-center justify-center space-x-1.5 transition-colors cursor-pointer border border-[#EBE2DC]"
          >
            <Eye className="w-3.5 h-3.5 text-[#8C7D75]" />
            <span>Quick Preview</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          
          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center space-x-1.5 mb-2.5">
              {product.colors.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                      isSelected 
                        ? 'ring-2 ring-[#C4877D] ring-offset-1 scale-110 border-transparent' 
                        : 'border-[#D9CCC3] hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
              <span className="text-[10px] text-[#8C7D75] ml-1 font-medium">
                {selectedColor.name}
              </span>
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-1 text-[11px]">
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-semibold text-[#2D2825]">{product.rating}</span>
            <span className="text-[#8C7D75]">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => setQuickViewProduct(product)}
            className="text-sm font-semibold text-[#2D2825] hover:text-[#A46358] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Subtitle / Material */}
          <p className="text-xs text-[#786F6A] line-clamp-1 mt-0.5">
            {product.material}
          </p>

        </div>

        {/* Price & Action Row */}
        <div className="mt-3.5 pt-3 border-t border-[#F2EAE5] flex items-center justify-between">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-sm sm:text-base font-bold text-[#2D2825]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E948E] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all flex items-center space-x-1 cursor-pointer ${
              isAdded
                ? 'bg-[#5C7F67] text-white'
                : 'bg-[#FAF3F0] hover:bg-[#2D2825] text-[#A46358] hover:text-white border border-[#E8DDD7] hover:border-[#2D2825]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3 h-3 text-white" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" />
                <span>Bag</span>
              </>
            )}
          </button>
        </div>

        {/* Low Stock Warning */}
        {product.stockLeft && product.stockLeft < 10 && (
          <div className="mt-2 text-[10px] text-[#A46358] font-medium flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A46358] animate-ping" />
            <span>Only {product.stockLeft} left in stock</span>
          </div>
        )}

      </div>
    </div>
  );
};
