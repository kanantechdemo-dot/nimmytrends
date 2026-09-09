import React, { useState, useEffect } from 'react';
import { useStore, CURRENCIES } from '../context/StoreContext';
import { CurrencyCode } from '../types';
import { ChevronDown, Sparkles, Truck, ShieldCheck, Heart } from 'lucide-react';

const ANNOUNCEMENTS = [
  { text: 'Complimentary shipping on orders over $50 • Handcrafted luxury', icon: Truck },
  { text: 'Use code BEAUTIFUL10 for 10% off your first order', icon: Sparkles },
  { text: '30-Day Happiness Guarantee • Pure Grade 6A Mulberry Silk', icon: ShieldCheck },
  { text: 'Take the 60-Second Hair Matcher Quiz to find your routine', icon: Heart },
];

export const AnnouncementBar: React.FC = () => {
  const { currency, setCurrencyCode, setIsQuizOpen } = useStore();
  const [index, setIndex] = useState(0);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[index];
  const IconComponent = current.icon;

  return (
    <div className="bg-[#2D2825] text-[#F9F6F3] text-xs font-normal border-b border-[#3E3834] relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        
        {/* Left: Quick perks or tagline */}
        <div className="hidden md:flex items-center space-x-4 text-[#D8CEC8]">
          <span className="inline-flex items-center text-[11px] tracking-wide uppercase font-medium text-[#E7A99C]">
            NimmyTrends Official
          </span>
          <span className="text-[#645A55]">•</span>
          <button
            onClick={() => setIsQuizOpen(true)}
            className="text-[11px] hover:text-white transition-colors cursor-pointer underline underline-offset-2 decoration-[#C4877D]"
          >
            Hair Quiz: Find Your Match
          </button>
        </div>

        {/* Center: Dynamic Announcement Ticker */}
        <div className="flex-1 flex items-center justify-center text-center px-2">
          <div className="flex items-center space-x-2 transition-all duration-300 transform">
            <IconComponent className="w-3.5 h-3.5 text-[#E7A99C] shrink-0 animate-pulse" />
            <span className="text-[11px] sm:text-xs tracking-wide text-[#F9F6F3] font-normal truncate max-w-[280px] sm:max-w-md">
              {current.text}
            </span>
          </div>
        </div>

        {/* Right: Currency Selector */}
        <div className="relative">
          <button
            id="currency-selector-button"
            onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
            className="flex items-center space-x-1.5 text-[11px] text-[#D8CEC8] hover:text-white transition-colors py-1 px-2 rounded focus:outline-none"
            title="Switch Currency"
          >
            <span className="font-medium text-[#FAF7F4]">{currency.code} ({currency.symbol})</span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isCurrencyOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCurrencyOpen && (
            <>
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setIsCurrencyOpen(false)}
              />
              <div className="absolute right-0 mt-1 w-36 bg-white text-[#2D2825] rounded-lg shadow-xl border border-[#EBE2DC] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-3 py-1 text-[10px] font-semibold text-[#8C7D75] uppercase tracking-wider border-b border-[#F5EAE6]">
                  Select Currency
                </div>
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                  const curr = CURRENCIES[code];
                  const isSelected = curr.code === currency.code;
                  return (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrencyCode(code);
                        setIsCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#FDF8F5] transition-colors ${
                        isSelected ? 'font-semibold text-[#A46358] bg-[#FAF3F0]' : 'text-[#4A423D]'
                      }`}
                    >
                      <span>{curr.code}</span>
                      <span className="text-[#8C7D75] font-mono">{curr.symbol}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
