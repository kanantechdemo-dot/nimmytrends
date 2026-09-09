import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';
import { Sparkles, ShieldCheck, ArrowRight, Heart, Feather } from 'lucide-react';

interface HeroProps {
  onSelectCategory: (category: ProductCategory) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory, onExploreClick }) => {
  const { setIsQuizOpen } = useStore();

  return (
    <section className="relative overflow-hidden bg-[#F8F2ED] border-b border-[#EBE1D9] py-12 lg:py-20">
      
      {/* Delicate background decorative glow / subtle warm gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#F2DDD5]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-24 w-80 h-80 rounded-full bg-[#EAE2D8]/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text & CTA Block (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-[#E8DDD6] rounded-full px-4 py-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C4877D]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6D65]">
                Makes you beautiful
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif text-[#2D2825] font-normal leading-[1.12] tracking-tight">
              Elevated hair accessories & gentle styling tools,{' '}
              <span className="italic font-light text-[#A46358] block sm:inline">
                crafted with pure love.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#6B615A] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover luxurious Remy human hair extensions, handcrafted hair accessories, heirloom brooches, and damage-free styling tools engineered to protect your hair, elevate your styling, and enhance your natural beauty.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                id="hero-shop-all-btn"
                onClick={() => {
                  onSelectCategory('all');
                  onExploreClick();
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#2D2825] hover:bg-[#3D3733] text-[#FAF7F4] text-sm font-semibold tracking-wide uppercase shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Shop All Essentials</span>
                <ArrowRight className="w-4 h-4 text-[#EBDCD6]" />
              </button>

              <button
                id="hero-hair-quiz-btn"
                onClick={() => setIsQuizOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-[#F9F5F1] text-[#4A423D] border border-[#DDD1C8] text-sm font-semibold tracking-wide uppercase shadow-xs hover:border-[#C4877D] transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C4877D]" />
                <span>Take 60s Hair Quiz</span>
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-6 border-t border-[#E8DDD6] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-[#A46358]">
                  <Feather className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2D2825]">6A Silk</span>
                </div>
                <p className="text-[11px] text-[#786F6A]">100% Pure Mulberry</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-[#A46358]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2D2825]">Gentle Grip</span>
                </div>
                <p className="text-[11px] text-[#786F6A]">Zero Crease, No Split Ends</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-[#A46358]">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2D2825]">30 Days</span>
                </div>
                <p className="text-[11px] text-[#786F6A]">Happiness Guarantee</p>
              </div>
            </div>

          </div>

          {/* Right Visual Composition (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Feature Imagery Container */}
              <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-xl border-4 border-white relative bg-[#EBE0D8]">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85"
                  alt="NimmyTrends Hair Extensions and Luxury Accessories"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Product Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg border border-[#EFE5DE] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#FAF3F0] shrink-0 border border-[#E7DCD5]">
                      <img 
                        src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80" 
                        alt="Seamless Remy Extensions" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#A46358]">Featured Staple</span>
                      <h4 className="text-xs font-semibold text-[#2D2825]">Seamless Remy Extensions</h4>
                      <div className="flex items-center space-x-1 text-[11px] text-[#786F6A]">
                        <span className="text-amber-500">★★★★★</span>
                        <span>4.9 (348)</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onSelectCategory('hair-extensions')}
                    className="p-2 bg-[#2D2825] hover:bg-[#A46358] text-white rounded-lg transition-colors cursor-pointer"
                    title="View Hair Extensions"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Floating Customer Satisfaction Sticker */}
              <div className="absolute -top-4 -right-3 sm:-right-4 bg-white rounded-xl shadow-md border border-[#EBE2DC] p-3 flex items-center space-x-2.5 animate-in fade-in zoom-in duration-300">
                <div className="w-8 h-8 rounded-full bg-[#FAF0EC] flex items-center justify-center text-[#A46358] font-bold text-xs">
                  99%
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-semibold text-[#2D2825] leading-tight">Hair Breakage Reduced</p>
                  <p className="text-[10px] text-[#8C7D75]">Verified clinical wearers</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
