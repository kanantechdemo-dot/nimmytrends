import React, { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import { ProductCategory } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryChips } from './components/CategoryChips';
import { ProductGrid } from './components/ProductGrid';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { HairCareGuide } from './components/HairCareGuide';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { HairQuizModal } from './components/HairQuizModal';
import { ToastNotification } from './components/ToastNotification';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCategory = (category: ProductCategory) => {
    setActiveCategory(category);
    setSearchQuery('');
  };

  const handleExploreClick = () => {
    const el = document.getElementById('products-catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F4] text-[#2D2825] font-sans antialiased">
        {/* Top Ticker & Currency Selector */}
        <AnnouncementBar />

        {/* Global Navigation */}
        <Navbar
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Editorial Brand Hero */}
          <Hero
            onSelectCategory={handleSelectCategory}
            onExploreClick={handleExploreClick}
          />

          {/* Category Filter Pills */}
          <CategoryChips
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
          />

          {/* Main Product Catalog with Filters & Sorting */}
          <ProductGrid
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            searchQuery={searchQuery}
          />

          {/* The NimmyTrends Craftsmanship & Quality Standard */}
          <BrandPhilosophy />

          {/* Customer Reviews & Hair Stories */}
          <CustomerReviewsSection />

          {/* Hair Care & Heatless Styling Journal */}
          <HairCareGuide />
        </main>

        {/* Global Footer & Newsletter */}
        <Footer onSelectCategory={handleSelectCategory} />

        {/* Interactive Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <WishlistDrawer />
        <CheckoutModal />
        <HairQuizModal />
        <ToastNotification />
      </div>
    </StoreProvider>
  );
}
