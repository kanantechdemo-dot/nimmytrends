import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Truck, 
  Tag, 
  Gift, 
  ShieldCheck 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    cartCount,
    formatPrice, 
    appliedPromo, 
    promoDiscount, 
    applyPromo, 
    removePromo,
    setIsCheckoutOpen 
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [showGiftInput, setShowGiftInput] = useState(false);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 50;
  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const shippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const shippingFee = cartSubtotal === 0 ? 0 : isFreeShipping ? 0 : 4.99;
  const finalTotal = Math.max(0, cartSubtotal - promoDiscount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const result = applyPromo(promoInput);
    if (!result.success) {
      setPromoError(result.message);
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#2D2825]/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="fixed inset-0 cursor-pointer" 
        onClick={() => setIsCartOpen(false)} 
      />

      <div className="relative w-full max-w-md bg-[#FAF7F4] h-full shadow-2xl flex flex-col z-10 border-l border-[#EBE2DC] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#EBE2DC] bg-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <ShoppingBag className="w-5 h-5 text-[#A46358]" />
            <h2 className="font-serif text-xl text-[#2D2825] font-normal">
              Your Shopping Bag
            </h2>
            <span className="text-xs bg-[#F5EAE6] text-[#A46358] font-bold px-2.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#786F6A] hover:text-[#2D2825] hover:bg-[#F5EAE6] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF3F0] p-3.5 border-b border-[#EFE5DE] text-xs">
          <div className="flex items-center justify-between font-medium text-[#4A423D] mb-1.5">
            <span className="flex items-center space-x-1.5">
              <Truck className="w-3.5 h-3.5 text-[#A46358]" />
              {isFreeShipping ? (
                <span className="text-[#3D6E50] font-semibold">
                  You unlocked Complimentary Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#A46358]">{formatPrice(amountNeeded)}</strong> more for Free Shipping
                </span>
              )}
            </span>
            <span className="text-[11px] font-mono text-[#8C7D75]">
              {Math.round(shippingProgress)}%
            </span>
          </div>
          <div className="w-full bg-[#E8DCD5] rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFreeShipping ? 'bg-[#5C7F67]' : 'bg-[#C4877D]'
              }`}
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F3ECE7] flex items-center justify-center mx-auto text-[#8C7D75]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg text-[#2D2825]">Your bag is empty</h3>
              <p className="text-xs text-[#786F6A] max-w-xs mx-auto">
                Explore our luxurious hair extensions, handcrafted accessories, brooches, and gentle hair tools.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2.5 bg-[#2D2825] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#3D3733] transition-colors cursor-pointer"
              >
                Discover NimmyTrends
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor.name}`}
                className="flex space-x-3.5 bg-white p-3.5 rounded-2xl border border-[#EDE2D8] shadow-xs"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#F5EFEA] shrink-0 border border-[#EAE1DA]">
                  <img
                    src={item.selectedColor.image || item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-semibold text-[#2D2825] truncate pr-2">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor.name)}
                        className="text-[#9E948E] hover:text-[#A46358] transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-1.5 mt-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-stone-300"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                      <span className="text-[11px] text-[#786F6A]">
                        {item.selectedColor.name}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Line Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#DECFC6] rounded-lg bg-[#FAF7F4] overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor.name, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs text-[#4A423D] hover:bg-[#F0E6E0] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs font-semibold text-[#2D2825] font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor.name, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs text-[#4A423D] hover:bg-[#F0E6E0] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[#2D2825]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Complimentary Gift Box / Note Accordion */}
          {cart.length > 0 && (
            <div className="pt-2">
              <button
                onClick={() => setShowGiftInput(!showGiftInput)}
                className="text-xs text-[#A46358] font-medium flex items-center space-x-1.5 hover:underline cursor-pointer"
              >
                <Gift className="w-3.5 h-3.5" />
                <span>{showGiftInput ? 'Hide Gift Message' : 'Add Complimentary Gift Note'}</span>
              </button>
              {showGiftInput && (
                <div className="mt-2">
                  <textarea
                    rows={2}
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Enter your personalized gift card message..."
                    className="w-full text-xs p-2.5 rounded-xl border border-[#DECAC2] bg-white focus:outline-none"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#EAE0D8] bg-white space-y-3 shadow-lg">
            
            {/* Promo Code Input */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-[#FAF0EC] p-2.5 rounded-xl text-xs border border-[#F2DDD5]">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-3.5 h-3.5 text-[#A46358]" />
                    <span className="font-semibold text-[#A46358]">{appliedPromo}</span>
                    <span className="text-[#786F6A]">(-{formatPrice(promoDiscount)})</span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-xs text-[#A46358] font-bold hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex space-x-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. BEAUTIFUL10)"
                    className="flex-1 text-xs px-3 py-2 rounded-xl border border-[#DECAC2] bg-[#FAF7F4] uppercase focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2D2825] hover:bg-[#433C37] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#5C534D] pt-1 border-t border-[#F2EAE5]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#2D2825]">{formatPrice(cartSubtotal)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-[#A46358]">
                  <span>Discount</span>
                  <span>-{formatPrice(promoDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#3D6E50] font-semibold">FREE</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2D2825] pt-2 border-t border-[#F2EAE5]">
                <span>Estimated Total</span>
                <span className="text-base">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              id="cart-proceed-checkout-btn"
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-full bg-[#2D2825] hover:bg-[#3D3733] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#EBDCD6]" />
            </button>

            {/* Trust badge */}
            <div className="flex items-center justify-center space-x-2 text-[10px] text-[#8C7D75] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5C7F67]" />
              <span>SSL Encrypted Checkout • 30-Day Money Back Guarantee</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
