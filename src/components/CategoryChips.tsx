import React from 'react';
import { ProductCategory } from '../types';
import { CATEGORIES } from '../data/products';
import { Sparkles, Feather, Flame, Award, Gem, LayoutGrid } from 'lucide-react';

interface CategoryChipsProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

const iconMap: Record<string, React.ElementType> = {
  all: LayoutGrid,
  'hair-extensions': Sparkles,
  'hair-accessories': Feather,
  brooches: Award,
  'styling-tools': Flame,
  'pins-barrettes': Gem,
};

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-6 bg-[#FAF7F4] border-b border-[#EDE4DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = iconMap[cat.id] || LayoutGrid;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as ProductCategory)}
                className={`group flex items-center space-x-2.5 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#2D2825] text-[#FAF7F4] shadow-sm'
                    : 'bg-white text-[#5C534D] hover:bg-[#F3ECE7] hover:text-[#2D2825] border border-[#E5DAD3]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E7A99C]' : 'text-[#8C7D75] group-hover:text-[#2D2825]'}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-[#433C37] text-[#D8CEC8]' : 'bg-[#F2EAE5] text-[#786F6A]'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
