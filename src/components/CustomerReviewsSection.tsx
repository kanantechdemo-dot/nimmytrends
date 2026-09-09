import React from 'react';
import { Star, CheckCircle2, Instagram } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Margaux D.',
    location: 'Paris, France',
    hairType: 'Fine Straight Hair',
    rating: 5,
    title: 'The extensions blend seamlessly and feel completely weightless',
    quote: 'My entire life, hair extensions felt heavy and obvious because my strands are so fine. The Seamless Remy extensions lay flat against my scalp and stay undetectable all day. Truly revolutionary.',
    product: 'Seamless Remy Human Hair Extensions',
  },
  {
    name: 'Serena L.',
    location: 'New York, NY',
    hairType: 'Thick Long Wavy Hair',
    rating: 5,
    title: 'Replaced my $200 curling wand with the silk ribbon',
    quote: 'I was skeptical about heatless curlers, but the pure Mulberry silk ribbon gives me the bounciest blowout waves of my life while I sleep. My hairdresser asked what treatment I did to make my hair so shiny!',
    product: 'Mulberry Silk Heatless Curls Ribbon Set',
  },
  {
    name: 'Dr. Ananya P.',
    location: 'London, UK',
    hairType: 'Curly 3B Texture',
    rating: 5,
    title: 'The Camellia brooch and silk scarf are pure poetry',
    quote: 'I pinned the Camellia brooch to my lapel with the silk scarf tied into a low chignon. The craftsmanship feels like genuine fine jewelry and looks so sophisticated.',
    product: 'Vintage Pearl & Crystal Camellia Brooch',
  },
];

const COMMUNITY_GALLERY = [
  {
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    handle: '@camille_wellness',
    style: 'Low chignon with Freshwater Pearl Pins',
  },
  {
    img: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?auto=format&fit=crop&w=600&q=80',
    handle: '@elena_hairstyling',
    style: 'Sleek style with French Metal Barrette',
  },
  {
    img: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=600&q=80',
    handle: '@lillian.curls',
    style: 'Nocturnal Silk Turban with defined curl pattern',
  },
  {
    img: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80',
    handle: '@maya_editorial',
    style: 'Silk Ribbon Scarf woven into low braid',
  },
];

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#FAF7F4] border-b border-[#EAE0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center space-x-1 text-amber-500 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2D2825] font-normal">
            Real hair stories. Radiant results.
          </h2>
          <p className="text-xs sm:text-sm text-[#786F6A]">
            Over 45,000 women have transformed their daily hair ritual with NimmyTrends.
          </p>
        </div>

        {/* Testimonials 3-Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-[#EDE2D8] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] bg-[#FAF0EC] text-[#A46358] font-bold px-2 py-0.5 rounded-full">
                    {t.hairType}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-[#2D2825] mb-2 leading-snug">
                  &ldquo;{t.title}&rdquo;
                </h4>

                <p className="text-xs text-[#6B615A] leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F2EAE5] flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center space-x-1.5 font-bold text-[#2D2825]">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5C7F67]" />
                  </div>
                  <span className="text-[10px] text-[#8C7D75]">{t.location}</span>
                </div>
                <span className="text-[10px] text-[#A46358] font-medium text-right max-w-[120px] truncate">
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Community Styled Gallery */}
        <div className="mt-16 pt-12 border-t border-[#EDE2D8]">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A46358]">
                Community Lookbook
              </span>
              <h3 className="text-2xl font-serif text-[#2D2825] mt-0.5">
                Styled by You #NimmyTrends
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-xs text-[#786F6A]">
              <Instagram className="w-4 h-4 text-[#A46358]" />
              <span>Tag @nimmytrends to be featured</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COMMUNITY_GALLERY.map((item, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden aspect-square bg-[#E8DDD7] border border-[#E5DAD3]">
                <img
                  src={item.img}
                  alt={item.style}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2825]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white text-xs">
                  <span className="font-semibold text-xs text-[#F5EAE6]">{item.handle}</span>
                  <span className="text-[10px] text-[#D8CEC8] line-clamp-1">{item.style}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
