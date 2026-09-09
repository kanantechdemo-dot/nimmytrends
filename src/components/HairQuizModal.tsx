import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShoppingBag, 
  RotateCcw,
  Feather,
  Heart
} from 'lucide-react';

export const HairQuizModal: React.FC = () => {
  const { isQuizOpen, setIsQuizOpen, addToCart, formatPrice, setIsCartOpen, applyPromo } = useStore();

  const [step, setStep] = useState(1);
  const [hairType, setHairType] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [frustration, setFrustration] = useState<string>('');

  if (!isQuizOpen) return null;

  const handleReset = () => {
    setStep(1);
    setHairType('');
    setGoal('');
    setFrustration('');
  };

  // Determine customized bundle based on answers
  const bundleItems = [
    PRODUCTS[0], // Seamless Remy Extensions
    PRODUCTS[3], // Pure Mulberry Silk Ribbon Scarf
    step >= 4 && goal === 'Heatless Styling' ? PRODUCTS[2] : PRODUCTS[6], // Heatless curler or detangling comb
  ];

  const bundleSubtotal = bundleItems.reduce((acc, p) => acc + p.price, 0);
  const bundleDiscountPrice = Math.round(bundleSubtotal * 0.85);

  const handleAddBundleToCart = () => {
    bundleItems.forEach((item) => {
      addToCart(item, item.colors[0], 1);
    });
    applyPromo('NIMMY15');
    setIsQuizOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2825]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={() => setIsQuizOpen(false)} 
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E8DDD6] overflow-hidden z-10 my-auto">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F0E6E0] bg-[#FAF7F4] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#C4877D]" />
            <span className="font-serif text-lg text-[#2D2825] font-normal">
              NimmyTrends Hair Stylist Quiz
            </span>
          </div>
          <button
            onClick={() => setIsQuizOpen(false)}
            className="p-1.5 text-[#786F6A] hover:text-[#2D2825] hover:bg-[#EFE7E2] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#FAF3F0] h-1.5 w-full">
          <div 
            className="bg-[#A46358] h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Hair Type */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A46358]">Step 1 of 3</span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#2D2825]">
                  What best describes your hair texture?
                </h3>
                <p className="text-xs text-[#786F6A]">
                  We formulate our tension balance and silk weights based on your hair density.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'fine', title: 'Fine / Silky', desc: 'Easily creases, needs gentle non-slip grip' },
                  { id: 'medium', title: 'Medium / Wavy', desc: 'Versatile texture, prone to light frizz' },
                  { id: 'thick', title: 'Thick / Long', desc: 'Needs wide-capacity accessories with secure hold' },
                  { id: 'curly', title: 'Curly / Coily (3A-4C)', desc: 'Requires ultra-smooth silk to preserve definition' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setHairType(item.title);
                      setStep(2);
                    }}
                    className="p-4 rounded-2xl border border-[#DECAC2] hover:border-[#A46358] bg-[#FAF7F4] hover:bg-[#FAF3F0] text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2D2825] group-hover:text-[#A46358]">
                        {item.title}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C4877D] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[11px] text-[#786F6A] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Goal */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A46358]">Step 2 of 3</span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#2D2825]">
                  What is your primary styling aspiration?
                </h3>
                <p className="text-xs text-[#786F6A]">
                  Every NimmyTrends piece is designed with an ergonomic purpose.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'heatless', title: 'Heatless Styling', desc: 'Wake up with salon blowout waves without heat irons' },
                  { id: 'damage-free', title: 'Zero Creases & Snags', desc: 'Eliminate ponytail dent lines and split ends completely' },
                  { id: 'quick-updo', title: 'Effortless 60s Updo', desc: 'Chic, polished hair buns for work or running errands' },
                  { id: 'glamour', title: 'Bridal & Occasion Shine', desc: 'Elevated accessories with luminous pearl & brass details' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setGoal(item.title);
                      setStep(3);
                    }}
                    className="p-4 rounded-2xl border border-[#DECAC2] hover:border-[#A46358] bg-[#FAF7F4] hover:bg-[#FAF3F0] text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2D2825] group-hover:text-[#A46358]">
                        {item.title}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C4877D] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[11px] text-[#786F6A] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#786F6A] hover:underline"
                >
                  ← Back to Step 1
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Biggest Frustration */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A46358]">Step 3 of 3</span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#2D2825]">
                  What is your biggest daily hair frustration?
                </h3>
                <p className="text-xs text-[#786F6A]">
                  We curate a custom remedy for your exact pain point.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'headaches', title: 'Tension Headaches', desc: 'Heavy accessories or tight styling that pinches your scalp' },
                  { id: 'breakage', title: 'Frizz & Breakage', desc: 'Rough friction causing dry ends and flyaways' },
                  { id: 'slippage', title: 'Accessories Sliding Out', desc: 'Standard plastic accessories that slip down within an hour' },
                  { id: 'dents', title: 'Elastic Ponytail Ridges', desc: 'Crimps that ruin your hairstyle when taking hair down' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setFrustration(item.title);
                      setStep(4);
                    }}
                    className="p-4 rounded-2xl border border-[#DECAC2] hover:border-[#A46358] bg-[#FAF7F4] hover:bg-[#FAF3F0] text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2D2825] group-hover:text-[#A46358]">
                        {item.title}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C4877D] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[11px] text-[#786F6A] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-[#786F6A] hover:underline"
                >
                  ← Back to Step 2
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: RECOMMENDATION BUNDLE */}
          {step === 4 && (
            <div className="space-y-5 text-center animate-in zoom-in-95 duration-300">
              <div className="inline-flex items-center space-x-2 bg-[#FAF0EC] border border-[#F2DDD5] text-[#A46358] rounded-full px-3.5 py-1 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your Personalized Beauty Match</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-serif text-[#2D2825]">
                  The Damage-Free Essential Routine
                </h3>
                <p className="text-xs text-[#786F6A]">
                  Customized for <strong className="text-[#2D2825]">{hairType}</strong> targeting <strong className="text-[#2D2825]">{goal}</strong>.
                </p>
              </div>

              {/* Recommended 3-piece items grid */}
              <div className="bg-[#FAF7F4] p-4 rounded-2xl border border-[#EDE2D8] space-y-2.5 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7D75]">
                  Curated 3-Piece Kit
                </span>
                <div className="space-y-2">
                  {bundleItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 bg-white p-2.5 rounded-xl border border-[#EDE2D8]">
                      <img src={item.images[0]} alt={item.name} className="w-12 h-12 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 min-w-0 text-xs">
                        <h5 className="font-semibold text-[#2D2825] truncate">{item.name}</h5>
                        <p className="text-[11px] text-[#786F6A] truncate">{item.material}</p>
                      </div>
                      <span className="text-xs font-bold text-[#A46358]">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>

                {/* Bundle pricing & discount */}
                <div className="pt-2 border-t border-[#EDE2D8] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#786F6A] line-through mr-1.5">{formatPrice(bundleSubtotal)}</span>
                    <span className="font-bold text-base text-[#2D2825]">{formatPrice(bundleDiscountPrice)}</span>
                  </div>
                  <span className="bg-[#EBF5EE] text-[#3D6E50] text-[11px] font-bold px-2 py-0.5 rounded-full">
                    Includes 15% VIP Discount
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAddBundleToCart}
                  className="w-full py-3.5 rounded-full bg-[#2D2825] hover:bg-[#3D3733] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#EBDCD6]" />
                  <span>Add Complete Routine to Bag (Save 15%)</span>
                </button>

                <button
                  onClick={handleReset}
                  className="text-xs text-[#8C7D75] hover:underline flex items-center justify-center space-x-1 mx-auto pt-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retake Quiz</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
