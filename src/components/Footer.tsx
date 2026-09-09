import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';
import { Sparkles, Mail, CheckCircle2, Heart, ShieldCheck, Truck } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const { applyPromo, showToast, setIsQuizOpen } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setIsSubscribed(true);
    applyPromo('BEAUTIFUL10');
    showToast({
      type: 'success',
      title: 'Welcome to the Beauty Club!',
      message: 'Code BEAUTIFUL10 has been applied for 10% off your order.',
    });
  };

  return (
    <footer className="bg-[#262220] text-[#EDE4DE] pt-16 pb-12 border-t border-[#3A3430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter VIP Banner */}
        <div className="bg-[#332C28] rounded-3xl p-8 lg:p-12 mb-16 border border-[#453D38] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center space-x-2 text-[#E7A99C] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join the NimmyTrends Beauty Club</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF7F4] font-normal">
              Receive 10% off your first luxury order.
            </h3>
            <p className="text-xs text-[#B5A9A2] leading-relaxed">
              Enjoy secret seasonal collection drops, complimentary hair styling guides, and private VIP member discounts.
            </p>
          </div>

          <div className="w-full max-w-md">
            {isSubscribed ? (
              <div className="bg-[#243328] border border-[#3C5743] p-4 rounded-2xl flex items-center space-x-3 text-xs text-[#A8DAB5]">
                <CheckCircle2 className="w-5 h-5 text-[#62B878] shrink-0" />
                <div>
                  <p className="font-semibold text-white">You&apos;re on the VIP list!</p>
                  <p className="text-[11px] text-[#A8DAB5]">
                    Promo code <strong className="font-mono text-white">BEAUTIFUL10</strong> has been applied to your bag.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#8C7D75] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-[#26211E] text-xs text-white placeholder-[#8C7D75] pl-10 pr-4 py-3 rounded-full border border-[#4A403A] focus:outline-none focus:border-[#C4877D]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FAF7F4] hover:bg-white text-[#262220] text-xs font-semibold uppercase tracking-wider rounded-full transition-colors shrink-0 cursor-pointer"
                >
                  Join & Save 10%
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3D3733]">
          
          {/* Col 1: Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F4]">
                NimmyTrends
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4877D] mt-0.5">
                Makes you beautiful
              </p>
            </div>
            <p className="text-xs text-[#A89D96] leading-relaxed max-w-sm">
              NimmyTrends curates the finest Grade 6A Mulberry silk hair accessories and handcrafted French cellulose acetate styling tools, designed to nourish hair health and bring effortless grace to every morning.
            </p>
            <div className="flex items-center space-x-4 pt-2 text-xs text-[#B5A9A2]">
              <span className="flex items-center space-x-1">
                <Truck className="w-3.5 h-3.5 text-[#C4877D]" />
                <span>Free Worldwide Ship &gt;$50</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C4877D]" />
                <span>30-Day Guarantee</span>
              </span>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F4]">
              Collections
            </h4>
            <ul className="space-y-2 text-[#A89D96]">
              <li>
                <button 
                  onClick={() => onSelectCategory('hair-extensions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hair Extensions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('hair-accessories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hair Accessories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('brooches')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Brooches
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('styling-tools')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Styling Tools
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('pins-barrettes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pins & Barrettes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hair Guidance */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F4]">
              Hair Guidance
            </h4>
            <ul className="space-y-2 text-[#A89D96]">
              <li>
                <button 
                  onClick={() => setIsQuizOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer text-[#E7A99C] font-medium"
                >
                  60-Second Hair Matcher Quiz
                </button>
              </li>
              <li>
                <a href="#products-catalog-section" className="hover:text-white transition-colors">
                  Heatless Curls Masterclass
                </a>
              </li>
              <li>
                <a href="#products-catalog-section" className="hover:text-white transition-colors">
                  Seamless Hair Extension Care
                </a>
              </li>
              <li>
                <a href="#products-catalog-section" className="hover:text-white transition-colors">
                  Pure Mulberry Silk Care
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F4]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-[#A89D96]">
              <li>
                <span className="hover:text-white cursor-pointer">
                  30-Day Happiness Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">
                  Complimentary Shipping & Delivery
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">
                  Track Your Package
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">
                  support@nimmytrends.com
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7D75] gap-4">
          <div className="flex items-center space-x-2">
            <span>&copy; 2026 NimmyTrends. All rights reserved.</span>
            <span>•</span>
            <span className="italic text-[#C4877D]">Makes you beautiful</span>
          </div>

          <div className="flex items-center space-x-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Ethics & Sustainability</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
