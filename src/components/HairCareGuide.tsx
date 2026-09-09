import React, { useState } from 'react';
import { Sparkles, BookOpen, ChevronRight, X, Feather, ShieldCheck } from 'lucide-react';

const GUIDES = [
  {
    id: 'g1',
    title: 'The Art of Heatless Silk Curls: Zero Frizz, Maximum Bounce',
    readTime: '3 min read',
    category: 'Styling Masterclass',
    summary: 'Master the 3-minute wrapping method before bed to wake up with voluminous blowout curls without high-heat irons.',
    content: `Using heat tools consistently above 350°F causes irreversible protein denaturation inside the hair cortex, stripping natural lipid moisture. 

Here is our signature 3-step heatless ritual:
1. Start with 85% dry hair. Lightly mist a nourishing leave-in conditioning spray along mid-lengths and ends.
2. Center the NimmyTrends Mulberry Silk Ribbon across your crown and secure loosely at the top.
3. Divide hair into two sections. Wrap 1-inch ribbons of hair under and over the silk rod, adding small pieces as you move downwards. Secure the ends with silk ribbon ties and release the top anchor.
Sleep peacefully and wake up to cascading waves with mirror-like shine!`,
  },
  {
    id: 'g2',
    title: 'Why Botanical Cellulose Acetate Is Better for Scalp Health',
    readTime: '4 min read',
    category: 'Material Science',
    summary: 'Discover why standard brittle plastic creates micro-fissures, and how botanical acetate protects your cuticles.',
    content: `Unlike injection-molded petro-plastics that have sharp microscopic seam burrs along comb edges, French cellulose acetate is crafted from renewable organic cotton and wood pulp.

Each comb tooth is laser-cut and manually buffed with Italian pumice stones for 72 hours until seamlessly silky. 

This prevents micro-tearing of the delicate cuticle layer, eliminates snagging during detangling, and protects your scalp for smooth, healthy hair vitality.`,
  },
  {
    id: 'g3',
    title: 'Silk Care: How to Wash & Maintain Pure 22-Momme Mulberry Silk',
    readTime: '2 min read',
    category: 'Longevity Guide',
    summary: 'A simple gentle washing ritual that preserves the natural luster, softness, and sericin proteins of your silk wraps and ribbons.',
    content: `Grade 6A Mulberry silk is an organic protein fiber that responds beautifully to gentle care.

Follow these simple rules:
- Hand wash in lukewarm water with a pH-neutral silk or delicate wool cleanser.
- Submerge gently for 3 minutes without scrubbing or wringing.
- Roll flat inside a clean dry cotton towel to press out excess water.
- Reshape and dry flat away from radiant radiators or direct scorching sun. Your silk wraps and ribbons will retain their cloud-like softness for years.`,
  },
];

export const HairCareGuide: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<typeof GUIDES[0] | null>(null);

  return (
    <section className="py-16 bg-[#FAF7F4] border-b border-[#EAE0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#A46358] text-xs font-semibold uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Trichology & Styling Journal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#2D2825] mt-1 font-normal">
              Hair Health & Rituals
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#786F6A] max-w-md">
            Expert guidance on damage-free heatless curls, silk care, and scalp tension relief from our salon artisans.
          </p>
        </div>

        {/* 3 Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIDES.map((guide) => (
            <div
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className="bg-white p-6 rounded-2xl border border-[#EDE2D8] hover:border-[#DECAC2] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#8C7D75] mb-2 font-medium">
                  <span className="text-[#A46358] uppercase font-bold tracking-wider">{guide.category}</span>
                  <span>{guide.readTime}</span>
                </div>

                <h3 className="font-serif text-lg text-[#2D2825] group-hover:text-[#A46358] transition-colors font-semibold leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-[#6B615A] leading-relaxed mt-2.5">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F2EAE5] flex items-center justify-between text-xs font-semibold text-[#A46358]">
                <span>Read Full Article</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Guide Article Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2825]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div 
            className="fixed inset-0" 
            onClick={() => setSelectedGuide(null)} 
          />

          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E8DDD6] overflow-hidden z-10 p-6 sm:p-8 my-auto">
            <div className="flex items-center justify-between border-b border-[#F0E6E0] pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A46358]">
                  {selectedGuide.category} • {selectedGuide.readTime}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#2D2825] mt-1 font-normal">
                  {selectedGuide.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedGuide(null)}
                className="p-1.5 text-[#786F6A] hover:text-[#2D2825] hover:bg-[#F5EAE6] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-[#5C534D] leading-relaxed space-y-3 whitespace-pre-line max-h-96 overflow-y-auto pr-2">
              {selectedGuide.content}
            </div>

            <div className="mt-6 pt-4 border-t border-[#F0E6E0] flex items-center justify-between">
              <span className="text-[11px] text-[#8C7D75] italic">
                NimmyTrends — Makes you beautiful
              </span>
              <button
                onClick={() => setSelectedGuide(null)}
                className="px-5 py-2 bg-[#2D2825] text-white text-xs font-semibold rounded-full hover:bg-[#3E3834] cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
