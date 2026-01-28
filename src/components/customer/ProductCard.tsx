import { Plus, Star, Flame, Sparkles } from 'lucide-react';
import { MenuItem } from '@/data/menuData';

interface ProductCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export function ProductCard({ item, onAddToCart }: ProductCardProps) {
  const isPopular = item.name.toLowerCase().includes('margherita') || item.name.toLowerCase().includes('pepperoni');
  const isNew = item.name.toLowerCase().includes('special') || item.name.toLowerCase().includes('premium');

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-orange-50/30 to-red-50/20 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-orange-100/50 backdrop-blur-sm">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg animate-pulse">
          <Flame className="h-3 w-3" />
          Popular
        </div>
      )}

      {/* New Badge */}
      {isNew && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-xs font-bold text-white shadow-lg animate-bounce">
          <Sparkles className="h-3 w-3" />
          New
        </div>
      )}

      {/* Image Container */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-orange-100 to-red-100 shadow-inner">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl sm:text-7xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
            {item.category === 'pizzas' || item.category === 'deals' ? '🍕' :
             item.category === 'burgers' ? '🍔' :
             item.category === 'fries' ? '🍟' :
             item.category === 'shawarma' ? '🌯' : '🥤'}
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Customizable Badge */}
        {item.customizable && (
          <div className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-2 py-1 text-xs font-bold text-white shadow-lg transform transition-all duration-300 group-hover:scale-110">
            Custom
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Title with gradient */}
        <h3 className="font-display text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-gray-900 via-orange-800 to-red-800 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:via-red-600 group-hover:to-pink-600 transition-all duration-300 leading-tight">
          {item.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-600 ml-1">(4.{Math.floor(Math.random() * 9) + 1})</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4 flex-1 group-hover:text-gray-700 transition-colors duration-300">
          {item.description}
        </p>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-3 border-t border-orange-100/50">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Rs. {item.price.toFixed(0)}
            </span>
            {item.customizable && (
              <span className="text-xs font-medium text-green-600 mt-1">+ Customizable</span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(item)}
            className="group/btn relative overflow-hidden flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-orange-600 hover:to-red-600 transform border border-orange-400/20"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

            <Plus className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110 relative z-10" />
            <span className="text-sm font-medium relative z-10">Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 via-red-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
    </div>
  );
}
