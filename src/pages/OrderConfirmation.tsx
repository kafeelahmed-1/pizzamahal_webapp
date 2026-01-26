import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, Phone, User } from 'lucide-react';
import { Header } from '@/components/customer/Header';
import { CartPanel } from '@/components/cart/CartPanel';

interface OrderState {
  orderId: string;
  orderType: 'delivery' | 'takeaway';
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  total: number;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state as OrderState | null;

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <p className="text-lg text-muted-foreground mb-4">No order found</p>
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
      
      <main className="container py-12">
        <div className="mx-auto max-w-lg text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Order Placed!
          </h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. We're preparing it now.
          </p>

          {/* Order Details Card */}
          <div className="rounded-lg border border-border bg-card p-6 text-left mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-lg font-bold text-foreground">
                {orderData.orderId}
              </span>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                orderData.orderType === 'delivery'
                  ? 'bg-info/10 text-info'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {orderData.orderType === 'delivery' ? 'Delivery' : 'Takeaway'}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                {orderData.customer.name}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                {orderData.customer.phone}
              </div>
              {orderData.customer.address && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {orderData.customer.address}
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="font-semibold text-foreground">Total Paid</span>
              <span className="text-xl font-bold text-foreground">
                Rs. {orderData.total.toFixed(0)}
              </span>
            </div>
          </div>

          {/* Estimated Time */}
          <div className="rounded-lg bg-accent/50 p-4 mb-8">
            <div className="flex items-center justify-center gap-2 text-accent-foreground">
              <Clock className="h-5 w-5" />
              <span className="font-medium">
                Estimated {orderData.orderType === 'delivery' ? 'delivery' : 'pickup'} time:
              </span>
              <span className="font-bold">25-35 min</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Order More
          </button>
        </div>
      </main>

      <CartPanel />
    </div>
  );
};

export default OrderConfirmation;
