import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  MapPin, 
  ArrowRight, 
  Lock, 
  Copy,
  Sparkles,
  PackageCheck
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    promoDiscount, 
    appliedPromo, 
    formatPrice, 
    clearCart,
    showToast 
  } = useStore();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Customer shipping details
  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 (555) 234-8901',
    address: '450 Sutter Street, Suite 800',
    city: 'San Francisco',
    state: 'CA',
    zip: '94108',
    country: 'United States',
  });

  // Payment form details
  const [paymentData, setPaymentData] = useState({
    cardNumber: '4242 •••• •••• 4242',
    cardName: 'Eleanor Vance',
    expiry: '12/28',
    cvv: '842',
  });

  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const isFreeStandard = cartSubtotal >= 50;
  const shippingCost = shippingMethod === 'express' ? 12 : (isFreeStandard ? 0 : 4.99);
  const orderTotal = Math.max(0, cartSubtotal - promoDiscount + shippingCost);

  const handleInputChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleAutofillDemo = () => {
    setFormData({
      name: 'Sophia Montgomery',
      email: 'sophia.montgomery@example.com',
      phone: '+1 (555) 890-1234',
      address: '742 Evergreen Terrace',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'United States',
    });
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const randomOrder = 'NT-' + Math.floor(10000 + Math.random() * 90000);
      setOrderNumber(randomOrder);
      setStep('confirmed');
      clearCart();
      showToast({
        type: 'success',
        title: 'Order Placed!',
        message: `Order ${randomOrder} confirmed. Makes you beautiful.`,
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2825]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={() => {
          if (step !== 'confirmed') setIsCheckoutOpen(false);
        }} 
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E8DDD6] overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F0E6E0] bg-[#FAF7F4] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-xl font-bold text-[#2D2825]">
              NimmyTrends
            </span>
            <span className="text-[#C4B7AF]">•</span>
            <span className="text-xs uppercase tracking-widest text-[#A46358] font-semibold">
              Secure Checkout
            </span>
          </div>

          {step !== 'confirmed' && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 text-[#786F6A] hover:text-[#2D2825] hover:bg-[#EFE7E2] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Stepper indicator if not confirmed */}
        {step !== 'confirmed' && (
          <div className="px-6 py-3 bg-[#FAF3F0] border-b border-[#EDE2D8] flex items-center justify-center space-x-8 text-xs font-semibold uppercase tracking-wider">
            <div className={`flex items-center space-x-2 ${step === 'shipping' ? 'text-[#A46358]' : 'text-[#3D6E50]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${step === 'shipping' ? 'bg-[#A46358]' : 'bg-[#5C7F67]'}`}>
                {step === 'payment' ? '✓' : '1'}
              </span>
              <span>Shipping</span>
            </div>
            <span className="w-8 h-px bg-[#D9CCC3]" />
            <div className={`flex items-center space-x-2 ${step === 'payment' ? 'text-[#A46358]' : 'text-[#8C7D75]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${step === 'payment' ? 'bg-[#A46358]' : 'bg-[#C2B5AC]'}`}>
                2
              </span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          
          {/* STEP 1: SHIPPING */}
          {step === 'shipping' && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif text-[#2D2825] flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#A46358]" />
                  <span>Delivery Address</span>
                </h3>
                <button
                  type="button"
                  onClick={handleAutofillDemo}
                  className="text-xs text-[#A46358] font-medium hover:underline cursor-pointer"
                >
                  Autofill Sample Data
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-[#786F6A] font-semibold uppercase tracking-wider text-[10px] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DECAC2] bg-[#FAF7F4] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#786F6A] font-semibold uppercase tracking-wider text-[10px] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DECAC2] bg-[#FAF7F4] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#786F6A] font-semibold uppercase tracking-wider text-[10px] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DECAC2] bg-[#FAF7F4] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#786F6A] font-semibold uppercase tracking-wider text-[10px] mb-1">
                    Street Address & Suite
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DECAC2] bg-[#FAF7F4] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#786F6A] font-semibold uppercase tracking-wider text-[10px] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DECAC2] bg-[#FAF7F4] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#786F6A] font-semibold uppercase tracking-wider text-[10px] mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#DECAC2] bg-[#FAF7F4] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#786F6A] font-semibold uppercase tracking-wider text-[10px] mb-1">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#DECAC2] bg-[#FAF7F4] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method Options */}
              <div className="pt-4 border-t border-[#EFE5DE]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2825] mb-3 flex items-center space-x-2">
                  <Truck className="w-3.5 h-3.5 text-[#A46358]" />
                  <span>Choose Delivery Method</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`flex items-start justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-[#A46358] bg-[#FAF3F0] ring-1 ring-[#A46358]'
                        : 'border-[#E2D5CC] bg-white hover:bg-[#FAF7F4]'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-[#2D2825]">Complimentary Standard</p>
                      <p className="text-[11px] text-[#786F6A]">3 – 5 Business Days</p>
                    </div>
                    <span className="text-xs font-bold text-[#3D6E50]">
                      {isFreeStandard ? 'FREE' : formatPrice(4.99)}
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`flex items-start justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-[#A46358] bg-[#FAF3F0] ring-1 ring-[#A46358]'
                        : 'border-[#E2D5CC] bg-white hover:bg-[#FAF7F4]'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-[#2D2825]">Express Priority</p>
                      <p className="text-[11px] text-[#786F6A]">1 – 2 Business Days</p>
                    </div>
                    <span className="text-xs font-bold text-[#2D2825]">
                      {formatPrice(12.00)}
                    </span>
                  </label>
                </div>
              </div>

              {/* Summary Bar */}
              <div className="bg-[#FAF7F4] p-4 rounded-2xl border border-[#EDE2D8] flex items-center justify-between text-xs">
                <span className="text-[#5C534D]">Order Total ({cart.length} items):</span>
                <span className="text-base font-bold text-[#2D2825]">{formatPrice(orderTotal)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#2D2825] hover:bg-[#3E3834] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4 text-[#EBDCD6]" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && (
            <form onSubmit={handleCompleteOrder} className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif text-[#2D2825] flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-[#A46358]" />
                  <span>Payment Information</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs text-[#786F6A] hover:underline"
                >
                  ← Edit Shipping
                </button>
              </div>

              {/* Express 1-Tap Pay Simulation */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="py-3 bg-black text-white text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <span>Apple Pay</span>
                </button>
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="py-3 bg-[#FAF0EC] border border-[#DECAC2] text-[#2D2825] text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 hover:bg-[#F2E5DF] transition-colors cursor-pointer"
                >
                  <span>PayPal</span>
                </button>
              </div>

              <div className="flex items-center space-x-3 my-2">
                <div className="flex-1 h-px bg-[#EAE0D8]" />
                <span className="text-[11px] text-[#8C7D75] uppercase">Or Pay with Credit Card</span>
                <div className="flex-1 h-px bg-[#EAE0D8]" />
              </div>

              {/* Card Form */}
              <div className="space-y-4 text-xs bg-[#FAF7F4] p-4 rounded-2xl border border-[#EDE2D8]">
                <div>
                  <label className="block text-[#786F6A] font-semibold uppercase tracking-wider text-[10px] mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentData.cardName}
                    onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#DECAC2] bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#786F6A] font-semibold uppercase tracking-wider text-[10px] mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#DECAC2] bg-white focus:outline-none font-mono"
                    />
                    <Lock className="w-3.5 h-3.5 text-[#8C7D75] absolute right-3 top-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#786F6A] font-semibold uppercase tracking-wider text-[10px] mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentData.expiry}
                      onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full p-2.5 rounded-xl border border-[#DECAC2] bg-white focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[#786F6A] font-semibold uppercase tracking-wider text-[10px] mb-1">
                      Security Code (CVV)
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#DECAC2] bg-white focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Order total recap */}
              <div className="space-y-1.5 text-xs text-[#5C534D] pt-2 border-t border-[#EFE5DE]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-[#A46358]">
                    <span>Promo ({appliedPromo})</span>
                    <span>-{formatPrice(promoDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping ({shippingMethod})</span>
                  <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2D2825] pt-2 border-t border-[#EDE2D8]">
                  <span>Amount to Pay</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-full bg-[#2D2825] hover:bg-[#3E3834] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:opacity-70"
              >
                {isProcessing ? (
                  <span className="flex items-center space-x-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing Payment...</span>
                  </span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-[#EBDCD6]" />
                    <span>Pay {formatPrice(orderTotal)} & Place Order</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 3: ORDER CONFIRMED */}
          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300">
              
              <div className="w-16 h-16 rounded-full bg-[#EBF5EE] text-[#3D6E50] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#A46358]">
                  Order Placed Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#2D2825]">
                  Thank you, {formData.name.split(' ')[0]}!
                </h3>
                <p className="text-xs text-[#786F6A] max-w-sm mx-auto">
                  A confirmation email with shipping updates has been dispatched to <strong className="text-[#2D2825]">{formData.email}</strong>.
                </p>
              </div>

              {/* Order Ticket Card */}
              <div className="bg-[#FAF7F4] p-5 rounded-2xl border border-[#EDE2D8] text-left max-w-md mx-auto space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-[#EDE2D8] pb-2.5">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8C7D75]">Order Identifier</span>
                    <p className="font-mono font-bold text-sm text-[#2D2825]">{orderNumber}</p>
                  </div>
                  <span className="bg-[#EBF5EE] text-[#3D6E50] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Confirmed
                  </span>
                </div>

                <div className="space-y-1 text-[#645A55]">
                  <div className="flex justify-between">
                    <span>Shipping To:</span>
                    <span className="font-medium text-[#2D2825]">{formData.address}, {formData.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Arrival:</span>
                    <span className="font-medium text-[#2D2825]">In 3 Business Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carrier:</span>
                    <span className="font-medium text-[#2D2825]">Luxury Insured Courier</span>
                  </div>
                </div>

                {/* Milestone progress */}
                <div className="pt-3 border-t border-[#EDE2D8]">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-[#8C7D75] mb-2">
                    <span className="text-[#A46358]">1. Confirmed</span>
                    <span>2. Silk Handcraft</span>
                    <span>3. In Transit</span>
                    <span>4. Delivered</span>
                  </div>
                  <div className="w-full bg-[#E5DAD3] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#A46358] h-full w-1/4 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setStep('shipping');
                  }}
                  className="px-8 py-3 rounded-full bg-[#2D2825] hover:bg-[#3D3733] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  Continue Shopping NimmyTrends
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
