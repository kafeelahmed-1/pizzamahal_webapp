import { Plus } from 'lucide-react';
import { MenuItem } from '@/data/menuData';

interface ProductCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export function ProductCard({ item, onAddToCart }: ProductCardProps) {
  return (
    <div className="card-product group flex flex-col h-full animate-fade-in">
      <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-muted shadow-inner">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl sm:text-6xl transition-transform duration-300 group-hover:scale-110">
            {item.category === 'pizzas' || item.category === 'deals' ? '🍕' : 
             item.category === 'burgers' ? '🍔' :
             item.category === 'fries' ? '🍟' :
             item.category === 'shawarma' ? '🌯' : '🥤'}
          </div>
        )}
        {item.customizable && (
          <span className="absolute top-2 right-2 rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground shadow-md animate-bounce">
            Customizable
          </span>
        )}
      </div>
      
      <div className="flex flex-1 flex-col">
        <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
          {item.name}
        </h3>
        <p className="mt-1 flex-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg sm:text-xl font-bold text-foreground">
            Rs. {item.price.toFixed(0)}
            {item.customizable && (
              <span className="ml-1 text-xs font-normal text-muted-foreground">+</span>
            )}
          </span>
          
          <button
            onClick={() => onAddToCart(item)}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:shadow-md hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
