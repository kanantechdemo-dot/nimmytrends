import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const { 
    wishlist, 
    isWishlistOpen, 
    setIsWishlistOpen, 
    toggleWishlist, 
    addToCart, 
    formatPrice,
    setQuickViewProduct 
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (product: typeof PRODUCTS[0]) => {
    addToCart(product, product.colors[0], 1);
    toggleWishlist(product.id);
  };

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach((p) => {
      addToCart(p, p.colors[0], 1);
    });
    wishlistedProducts.forEach((p) => {
      toggleWishlist(p.id);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#2D2825]/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="fixed inset-0 cursor-pointer" 
        onClick={() => setIsWishlistOpen(false)} 
      />

      <div className="relative w-full max-w-md bg-[#FAF7F4] h-full shadow-2xl flex flex-col z-10 border-l border-[#EBE2DC] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#EBE2DC] bg-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Heart className="w-5 h-5 fill-[#C4877D] text-[#C4877D]" />
            <h2 className="font-serif text-xl text-[#2D2825] font-normal">
              Saved Hair Favorites
            </h2>
            <span className="text-xs bg-[#F5EAE6] text-[#A46358] font-bold px-2.5 py-0.5 rounded-full">
              {wishlistedProducts.length}
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-[#786F6A] hover:text-[#2D2825] hover:bg-[#F5EAE6] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F3ECE7] flex items-center justify-center mx-auto text-[#8C7D75]">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg text-[#2D2825]">No saved favorites yet</h3>
              <p className="text-xs text-[#786F6A] max-w-xs mx-auto">
                Tap the heart on any silk accessory or styling tool to save it for later.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="mt-4 px-6 py-2.5 bg-[#2D2825] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#3D3733] transition-colors cursor-pointer"
              >
                Explore Accessories
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="flex space-x-3.5 bg-white p-3.5 rounded-2xl border border-[#EDE2D8] shadow-xs"
              >
                <div 
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setQuickViewProduct(product);
                  }}
                  className="w-20 h-24 rounded-xl overflow-hidden bg-[#F5EFEA] shrink-0 border border-[#EAE1DA] cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 
                        onClick={() => {
                          setIsWishlistOpen(false);
                          setQuickViewProduct(product);
                        }}
                        className="text-xs font-semibold text-[#2D2825] truncate pr-2 cursor-pointer hover:text-[#A46358]"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-[#9E948E] hover:text-[#A46358] transition-colors cursor-pointer"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#786F6A] mt-0.5 truncate">
                      {product.material}
                    </p>

                    <div className="text-xs font-bold text-[#2D2825] mt-1">
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full py-1.5 bg-[#FAF3F0] hover:bg-[#2D2825] text-[#A46358] hover:text-white border border-[#E8DDD7] hover:border-[#2D2825] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 cursor-pointer mt-2"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {wishlistedProducts.length > 0 && (
          <div className="p-5 border-t border-[#EAE0D8] bg-white space-y-3">
            <button
              onClick={handleAddAllToCart}
              className="w-full py-3 rounded-full bg-[#2D2825] hover:bg-[#3D3733] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Move All to Shopping Bag</span>
              <ArrowRight className="w-4 h-4 text-[#EBDCD6]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
