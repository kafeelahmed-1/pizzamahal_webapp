import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Header } from '@/components/customer/Header';
import { CartPanel } from '@/components/cart/CartPanel';
import { useOrdersContext } from '@/context/OrdersContext';

type OrderType = 'delivery' | 'takeaway';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { addOrder } = useOrdersContext();
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (orderType === 'delivery' && !formData.address.trim()) {
      newErrors.address = 'Address is required for delivery';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate order ID
    const orderId = `ORD-${String(Date.now()).slice(-6)}`;
    
    // Create order object
    const order = {
      id: orderId,
      items,
      customer: formData,
      orderType,
      status: 'pending' as const,
      total,
      createdAt: new Date(),
    };

    // Add order using the hook (this will trigger notifications)
    addOrder(order);
    
    // Clear cart and navigate to confirmation
    clearCart();
    navigate('/order-confirmation', {
      state: {
        orderId,
        orderType,
        customer: formData,
        total,
      },
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/')}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
          >
            Browse Menu
          </button>
        </div>
        <CartPanel />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Menu
        </button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h1 className="font-display text-2xl font-bold text-foreground mb-6">
              Checkout
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Order Type
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                      orderType === 'delivery'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <MapPin className="mx-auto h-5 w-5 mb-1" />
                    Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                      orderType === 'takeaway'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <User className="mx-auto h-5 w-5 mb-1" />
                    Takeaway
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="John Smith"
                    className={`w-full rounded-lg border bg-background py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.name ? 'border-destructive' : 'border-input'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="(555) 123-4567"
                    className={`w-full rounded-lg border bg-background py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.phone ? 'border-destructive' : 'border-input'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              {/* Address (only for delivery) */}
              {orderType === 'delivery' && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, address: e.target.value }))
                      }
                      placeholder="123 Main Street, Apt 4B"
                      rows={3}
                      className={`w-full rounded-lg border bg-background py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                        errors.address ? 'border-destructive' : 'border-input'
                      }`}
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-1 text-sm text-destructive">{errors.address}</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-primary py-4 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Place Order — Rs. {total.toFixed(0)}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-3 mb-6">
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-start justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {item.quantity}x {item.name}
                    </p>
                    {item.selectedSize && (
                      <p className="text-sm text-muted-foreground">
                        {item.selectedSize}
                      </p>
                    )}
                    {item.selectedToppings && item.selectedToppings.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        +{item.selectedToppings.join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="font-medium text-foreground">
                    Rs. {item.totalPrice.toFixed(0)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">Rs. {total.toFixed(0)}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium text-success">Free</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-foreground">
                  Rs. {total.toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CartPanel />
    </div>
  );
};

export default Checkout;
