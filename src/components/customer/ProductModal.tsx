import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { MenuItem } from '@/data/menuData';
import { useCart } from '@/context/CartContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProductModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ item, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(item?.sizes?.[0]?.name || '');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  if (!item) return null;

  const handleToppingToggle = (topping: string) => {
    setSelectedToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  const calculateTotal = () => {
    let total = item.price;
    
    if (selectedSize && item.sizes) {
      const sizeModifier = item.sizes.find((s) => s.name === selectedSize)?.priceModifier || 0;
      total += sizeModifier;
    }
    
    selectedToppings.forEach((toppingName) => {
      const topping = item.toppings?.find((t) => t.name === toppingName);
      if (topping) total += topping.price;
    });
    
    return total * quantity;
  };

  const handleAddToCart = () => {
    addItem(
      item,
      quantity,
      item.customizable ? selectedSize : undefined,
      item.customizable ? selectedToppings : undefined
    );
    onClose();
    setQuantity(1);
    setSelectedSize(item.sizes?.[0]?.name || '');
    setSelectedToppings([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{item.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-muted-foreground">{item.description}</p>

          {/* Size Selection */}
          {item.customizable && item.sizes && (
            <div>
              <h4 className="mb-3 font-semibold text-foreground">Select Size</h4>
              <div className="flex gap-2">
                {item.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                      selectedSize === size.name
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-background hover:border-primary/50'
                    }`}
                  >
                    <div>{size.name}</div>
                    {size.priceModifier > 0 && (
                      <div className="text-xs text-muted-foreground">
                        +Rs. {size.priceModifier.toFixed(0)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Toppings */}
          {item.customizable && item.toppings && (
            <div>
              <h4 className="mb-3 font-semibold text-foreground">Extra Toppings</h4>
              <div className="grid grid-cols-2 gap-2">
                {item.toppings.map((topping) => (
                  <label
                    key={topping.name}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border-2 px-3 py-2 transition-colors ${
                      selectedToppings.includes(topping.name)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedToppings.includes(topping.name)}
                        onChange={() => handleToppingToggle(topping.name)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{topping.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      +Rs. {topping.price.toFixed(0)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Quantity</h4>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-muted"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Add to Cart — Rs. {calculateTotal().toFixed(0)}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
