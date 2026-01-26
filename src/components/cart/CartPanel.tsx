import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

export function CartPanel() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm sm:max-w-md flex-col bg-card shadow-xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-xl font-bold">Your Cart</h2>
          <button
            onClick={closeCart}
            className="rounded-lg p-2 hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium text-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add some delicious items to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex gap-4 rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted text-3xl">
                    {item.category === 'pizzas' || item.category === 'deals' ? '🍕' : 
                     item.category === 'burgers' ? '🍔' :
                     item.category === 'fries' ? '🍟' :
                     item.category === 'shawarma' ? '🌯' : '🥤'}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{item.name}</h4>
                    {item.selectedSize && (
                      <p className="text-xs text-muted-foreground">
                        Size: {item.selectedSize}
                      </p>
                    )}
                    {item.selectedToppings && item.selectedToppings.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        +{item.selectedToppings.join(', ')}
                      </p>
                    )}
                    
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded border border-border hover:bg-muted"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded border border-border hover:bg-muted"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <span className="font-semibold text-foreground">
                        Rs. {item.totalPrice.toFixed(0)}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                Clear Cart
              </button>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-foreground">
                  Rs. {total.toFixed(0)}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
