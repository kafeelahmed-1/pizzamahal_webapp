import { useState } from 'react';
import { Header } from '@/components/customer/Header';
import { CategoryTabs } from '@/components/customer/CategoryTabs';
import { ProductCard } from '@/components/customer/ProductCard';
import { ProductModal } from '@/components/customer/ProductModal';
import { CartPanel } from '@/components/cart/CartPanel';
import Hero from '@/components/customer/Hero';
import Footer from '@/components/customer/Footer';
import { menuItems, MenuItem, categories } from '@/data/menuData';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems =
    activeCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const handleAddToCart = (item: MenuItem) => {
    if (item.customizable) {
      setSelectedProduct(item);
      setIsModalOpen(true);
    } else {
      // For non-customizable items, we'd add directly to cart
      setSelectedProduct(item);
      setIsModalOpen(true);
    }
  };

  const groupedItems = activeCategory === 'all'
    ? categories.reduce((acc, cat) => {
        const items = menuItems.filter((item) => item.category === cat.id);
        if (items.length > 0) {
          acc.push({ category: cat, items });
        }
        return acc;
      }, [] as { category: typeof categories[0]; items: MenuItem[] }[])
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main id="menu-section" className="container py-6 sm:py-8 px-4 sm:px-6 animate-fade-in">
        {groupedItems ? (
          // Grouped view when showing all
          <div className="space-y-8 sm:space-y-10">
            {groupedItems.map(({ category, items }) => (
              <section key={category.id} className="animate-fade-in">
                <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span>{category.icon}</span>
                  {category.name}
                </h2>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((item) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          // Flat view when filtering by category
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      <ProductModal
        item={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      />

      <CartPanel />
      <Footer />
    </div>
  );
};

export default Index;
