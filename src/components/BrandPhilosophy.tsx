import React from 'react';
import { Feather, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section className="py-16 bg-[#F8F2ED] border-y border-[#EBE1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-[#A46358] text-xs font-semibold uppercase tracking-widest bg-white/70 backdrop-blur-xs px-3.5 py-1 rounded-full border border-[#EADBCE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The NimmyTrends Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2D2825] font-normal">
            Beauty engineered for hair vitality.
          </h2>
          <p className="text-xs sm:text-sm text-[#786F6A] leading-relaxed">
            Most hair accessories on the market are cast from brittle petrochemical plastic and abrasive elastics that snap hair shafts. At NimmyTrends, we pair couture craftsmanship with trichological care.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          
          <div className="bg-white p-6 rounded-2xl border border-[#EDE2D8] shadow-xs space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0EC] flex items-center justify-center text-[#A46358]">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#2D2825] font-semibold">100% Pure Mulberry Silk</h3>
            <p className="text-xs text-[#6B615A] leading-relaxed">
              Crafted exclusively from 22-Momme Grade 6A silk containing natural amino acids that mirror hair keratin, preventing bedtime friction and moisture loss.
            </p>
            <div className="pt-2 flex items-center space-x-1.5 text-[11px] font-semibold text-[#A46358]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero friction or creases</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EDE2D8] shadow-xs space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0EC] flex items-center justify-center text-[#A46358]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#2D2825] font-semibold">French Cellulose Acetate</h3>
            <p className="text-xs text-[#6B615A] leading-relaxed">
              Sourced from natural plant fibers and cotton pulp. Meticulously hand-buffed to seamless perfection so individual teeth glide through hair without snagging.
            </p>
            <div className="pt-2 flex items-center space-x-1.5 text-[11px] font-semibold text-[#A46358]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Non-toxic & shatterproof</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EDE2D8] shadow-xs space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0EC] flex items-center justify-center text-[#A46358]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#2D2825] font-semibold">Zero-Tension Springs</h3>
            <p className="text-xs text-[#6B615A] leading-relaxed">
              Custom calibrated internal springs distribute pressure across 360° of hair volume, eliminating the sharp pinch points that cause chronic tension headaches.
            </p>
            <div className="pt-2 flex items-center space-x-1.5 text-[11px] font-semibold text-[#A46358]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>All-day comfortable hold</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EDE2D8] shadow-xs space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0EC] flex items-center justify-center text-[#A46358]">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#2D2825] font-semibold">30-Day Happiness Trial</h3>
            <p className="text-xs text-[#6B615A] leading-relaxed">
              We want you to feel confident, poised, and radiant every morning. If any accessory or styling tool isn’t your holy grail, return it easily within 30 days.
            </p>
            <div className="pt-2 flex items-center space-x-1.5 text-[11px] font-semibold text-[#A46358]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Hassle-free guarantee</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
