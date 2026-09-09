import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductColor, Review } from '../types';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  ChevronDown, 
  Check, 
  Feather,
  Sparkles,
  Plus
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isWishlisted,
    setIsCheckoutOpen,
    showToast
  } = useStore();

  const product = quickViewProduct;
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product ? product.colors[0] : null
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string>('details');
  const [isAdded, setIsAdded] = useState(false);

  // Review submission state
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewHairType, setNewReviewHairType] = useState('Medium wavy');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState<Review[]>([]);

  if (!product) return null;

  const activeColor = selectedColor || product.colors[0];
  const isFavorite = isWishlisted(product.id);

  // Combine product default reviews with newly added local reviews
  const allReviews: Review[] = [
    ...(localReviews.filter((r) => (r as any).productId === product.id)),
    ...(product.reviews || [])
  ];

  const handleAddToCart = () => {
    addToCart(product, activeColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, activeColor, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review & { productId: string } = {
      id: 'rev-' + Date.now(),
      productId: product.id,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle || 'Magnificent hair piece',
      comment: newReviewComment,
      hairType: newReviewHairType,
      verified: true,
    };

    setLocalReviews((prev) => [newRev, ...prev]);
    setIsWritingReview(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast({
      type: 'success',
      title: 'Review Shared!',
      message: 'Thank you for sharing your hair care experience.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2825]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={() => setQuickViewProduct(null)} 
      />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E8DDD6] overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">
        
        {/* Top Header with Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0E6E0] bg-[#FAF7F4]">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#A46358]">
              {product.category === 'hair-extensions'
                ? 'Hair Extensions'
                : product.category === 'hair-accessories'
                ? 'Hair Accessories'
                : product.category === 'brooches'
                ? 'Brooches'
                : product.category === 'styling-tools'
                ? 'Styling Tools'
                : 'Pins & Barrettes'}
            </span>
            <span className="text-[#C4B7AF]">•</span>
            <span className="text-[11px] text-[#786F6A] font-medium">
              NimmyTrends Official
            </span>
          </div>
          <button
            onClick={() => setQuickViewProduct(null)}
            className="p-1.5 text-[#786F6A] hover:text-[#2D2825] hover:bg-[#EFE7E2] rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left: Gallery */}
            <div className="space-y-4">
              <div className="aspect-4/5 w-full rounded-2xl overflow-hidden bg-[#F5EFEA] border border-[#EDE2D8] relative">
                <img
                  src={product.images[activeImageIndex] || activeColor.image || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#A46358] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs border border-[#F2E5DF]">
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#4A423D] backdrop-blur-xs shadow-sm transition-transform active:scale-95"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#C4877D] text-[#C4877D]' : 'text-[#786F6A]'}`} />
                </button>
              </div>

              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="flex items-center space-x-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#A46358] ring-2 ring-[#C4877D]/30'
                          : 'border-[#EAE0D8] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees Box */}
              <div className="bg-[#FAF7F4] rounded-2xl p-4 border border-[#EDE3DC] space-y-2.5 text-xs text-[#5C534D]">
                <div className="flex items-center space-x-2.5">
                  <Truck className="w-4 h-4 text-[#A46358] shrink-0" />
                  <span>Free shipping on all orders over $50</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#A46358] shrink-0" />
                  <span>30-Day Happiness Guarantee • Free Returns</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Feather className="w-4 h-4 text-[#A46358] shrink-0" />
                  <span>Gentle on hair • Snag-free craftsmanship</span>
                </div>
              </div>
            </div>

            {/* Right: Product Purchase Options */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                
                {/* Star rating */}
                <div className="flex items-center space-x-2 mb-2 text-xs">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-[#2D2825]">{product.rating}</span>
                  <span className="text-[#8C7D75]">
                    ({allReviews.length} customer reviews)
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-serif text-[#2D2825] font-normal leading-tight">
                  {product.name}
                </h1>

                <p className="text-xs text-[#8C7D75] mt-1 italic">
                  {product.tagline}
                </p>

                {/* Price */}
                <div className="flex items-baseline space-x-3 mt-3">
                  <span className="text-2xl font-bold text-[#2D2825]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#9E948E] line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-[#FAF0EC] text-[#A46358] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#F2DDD5]">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Color Selector */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold uppercase tracking-wider text-[#4A423D]">
                      Color & Finish:
                    </span>
                    <span className="text-[#A46358] font-medium">
                      {activeColor.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => {
                      const isSelected = activeColor.name === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#A46358] bg-[#FAF3F0] ring-2 ring-[#C4877D]/20 shadow-xs'
                              : 'border-[#E2D5CC] hover:bg-[#F9F5F2]'
                          }`}
                        >
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-[#D0C2B9]"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-xs text-[#4A423D] font-medium">
                            {color.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity & Stock */}
                <div className="mt-6 flex items-center space-x-4">
                  <div className="flex items-center border border-[#DECFC6] rounded-xl bg-[#FAF7F4] overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 text-[#4A423D] hover:bg-[#F0E6E0] transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-xs font-bold text-[#2D2825] font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2 text-[#4A423D] hover:bg-[#F0E6E0] transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {product.stockLeft && product.stockLeft < 10 && (
                    <span className="text-xs text-[#A46358] font-medium flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#A46358] animate-ping" />
                      <span>Only {product.stockLeft} left in stock</span>
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-2.5">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer ${
                      isAdded
                        ? 'bg-[#5C7F67] text-white'
                        : 'bg-[#2D2825] hover:bg-[#3E3834] text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#EBDCD6]" />
                        <span>Add to Bag — {formatPrice(product.price * quantity)}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 rounded-full bg-[#FAF0EC] hover:bg-[#F5E6E0] text-[#A46358] border border-[#E8DDD6] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C4877D]" />
                    <span>Instant Checkout</span>
                  </button>
                </div>

              </div>

              {/* Informational Accordions */}
              <div className="border-t border-[#EAE0D8] pt-6 space-y-3">
                
                {/* Details Accordion */}
                <div className="border border-[#EAE0D8] rounded-xl overflow-hidden bg-[#FCFAF8]">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'details' ? '' : 'details')}
                    className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#2D2825] hover:bg-[#F7EFEB] transition-colors"
                  >
                    <span>Craftsmanship & Dimensions</span>
                    <ChevronDown className={`w-4 h-4 text-[#8C7D75] transition-transform ${activeAccordion === 'details' ? 'rotate-180' : ''}`} />
                  </button>
                  {activeAccordion === 'details' && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#5C534D] space-y-2">
                      <p>{product.description}</p>
                      <ul className="list-disc pl-4 space-y-1 text-[#645A55]">
                        {product.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Hair Care Accordion */}
                <div className="border border-[#EAE0D8] rounded-xl overflow-hidden bg-[#FCFAF8]">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'care' ? '' : 'care')}
                    className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#2D2825] hover:bg-[#F7EFEB] transition-colors"
                  >
                    <span>Hair Health & Care Instructions</span>
                    <ChevronDown className={`w-4 h-4 text-[#8C7D75] transition-transform ${activeAccordion === 'care' ? 'rotate-180' : ''}`} />
                  </button>
                  {activeAccordion === 'care' && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#5C534D] space-y-2">
                      <p className="font-medium text-[#2D2825]">Recommended by stylists for zero-snag longevity:</p>
                      <ul className="list-disc pl-4 space-y-1 text-[#645A55]">
                        {product.careInstructions.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Reviews Accordion */}
                <div className="border border-[#EAE0D8] rounded-xl overflow-hidden bg-[#FCFAF8]">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'reviews' ? '' : 'reviews')}
                    className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#2D2825] hover:bg-[#F7EFEB] transition-colors"
                  >
                    <span>Verified Buyer Reviews ({allReviews.length})</span>
                    <ChevronDown className={`w-4 h-4 text-[#8C7D75] transition-transform ${activeAccordion === 'reviews' ? 'rotate-180' : ''}`} />
                  </button>
                  {activeAccordion === 'reviews' && (
                    <div className="px-4 pb-4 pt-2 space-y-4">
                      <div className="flex items-center justify-between border-b border-[#EFE5DE] pb-3">
                        <div className="flex items-center space-x-1.5 text-xs">
                          <span className="font-bold text-[#2D2825]">{product.rating} out of 5</span>
                          <span className="text-[#8C7D75]">based on customer reports</span>
                        </div>
                        <button
                          onClick={() => setIsWritingReview(!isWritingReview)}
                          className="text-xs text-[#A46358] font-semibold hover:underline flex items-center space-x-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Write a Review</span>
                        </button>
                      </div>

                      {/* Write Review Form */}
                      {isWritingReview && (
                        <form onSubmit={handleReviewSubmit} className="bg-white p-3.5 rounded-xl border border-[#DECAC2] space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-semibold uppercase text-[#786F6A] block">Your Name</label>
                              <input
                                type="text"
                                required
                                value={newReviewAuthor}
                                onChange={(e) => setNewReviewAuthor(e.target.value)}
                                placeholder="e.g., Charlotte M."
                                className="w-full text-xs p-2 rounded-lg border border-[#DECAC2] bg-[#FAF7F4] focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-semibold uppercase text-[#786F6A] block">Hair Texture</label>
                              <select
                                value={newReviewHairType}
                                onChange={(e) => setNewReviewHairType(e.target.value)}
                                className="w-full text-xs p-2 rounded-lg border border-[#DECAC2] bg-[#FAF7F4] focus:outline-none"
                              >
                                <option>Fine straight hair</option>
                                <option>Thick wavy hair</option>
                                <option>Curly 3A-3C hair</option>
                                <option>Coily 4A-4C hair</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-semibold uppercase text-[#786F6A] block">Rating</label>
                            <div className="flex items-center space-x-1 mt-1">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                  type="button"
                                  key={s}
                                  onClick={() => setNewReviewRating(s)}
                                  className="text-amber-500 cursor-pointer"
                                >
                                  <Star className={`w-4 h-4 ${s <= newReviewRating ? 'fill-amber-400' : 'text-stone-300'}`} />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-semibold uppercase text-[#786F6A] block">Headline</label>
                            <input
                              type="text"
                              value={newReviewTitle}
                              onChange={(e) => setNewReviewTitle(e.target.value)}
                              placeholder="e.g. Magnificent quality and finish!"
                              className="w-full text-xs p-2 rounded-lg border border-[#DECAC2] bg-[#FAF7F4] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-semibold uppercase text-[#786F6A] block">Review</label>
                            <textarea
                              rows={2}
                              required
                              value={newReviewComment}
                              onChange={(e) => setNewReviewComment(e.target.value)}
                              placeholder="How did this piece work with your hair routine?"
                              className="w-full text-xs p-2 rounded-lg border border-[#DECAC2] bg-[#FAF7F4] focus:outline-none"
                            />
                          </div>

                          <div className="flex items-center justify-end space-x-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setIsWritingReview(false)}
                              className="px-3 py-1.5 text-xs text-[#786F6A] hover:bg-[#F2EAE5] rounded-lg"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-1.5 text-xs bg-[#2D2825] text-white font-semibold rounded-lg hover:bg-[#433C37]"
                            >
                              Publish Review
                            </button>
                          </div>
                        </form>
                      )}

                      {/* Reviews List */}
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                        {allReviews.map((rev) => (
                          <div key={rev.id} className="p-3 bg-white rounded-xl border border-[#EBE2DC] text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[#2D2825]">{rev.author}</span>
                              <span className="text-[10px] text-[#8C7D75]">{rev.date}</span>
                            </div>
                            <div className="flex items-center space-x-2 my-1">
                              <div className="flex items-center text-amber-500">
                                {[...Array(rev.rating)].map((_, idx) => (
                                  <Star key={idx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                              <span className="text-[10px] bg-[#FAF0EC] text-[#A46358] px-2 py-0.5 rounded-full font-medium">
                                {rev.hairType}
                              </span>
                            </div>
                            <h5 className="font-medium text-[#2D2825] mt-1">{rev.title}</h5>
                            <p className="text-[#645A55] mt-1 leading-relaxed">{rev.comment}</p>
                          </div>
                        ))}
                      </div>

                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
