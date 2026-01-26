import { categories } from '@/data/menuData';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-4 border-b border-border">
      <div className="container px-4 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => onCategoryChange('all')}
            className={`category-tab whitespace-nowrap ${
              activeCategory === 'all'
                ? 'category-tab-active'
                : 'category-tab-inactive'
            }`}
          >
            All Items
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`category-tab whitespace-nowrap ${
                activeCategory === category.id
                  ? 'category-tab-active'
                  : 'category-tab-inactive'
              }`}
            >
              <span className="mr-1.5">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
