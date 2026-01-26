import { Order } from '@/data/menuData';

interface PrintReceiptProps {
  order: Order;
}

export function PrintReceipt({ order }: PrintReceiptProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="print-receipt font-mono text-sm">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-lg font-bold">PIZZA MAHAL</h1>
        <p className="text-xs">Royal Taste Since 2020</p>
        <p className="text-xs">123 Main Street, City</p>
        <p className="text-xs">Tel: (555) 123-4567</p>
      </div>

      <div className="border-t border-dashed border-foreground/30 my-2" />

      {/* Order Info */}
      <div className="mb-3">
        <p className="font-bold">Order: {order.id}</p>
        <p className="text-xs">{formatDate(order.createdAt)}</p>
        <p className="text-xs mt-1">
          Type: {order.orderType === 'delivery' ? 'DELIVERY' : 'TAKEAWAY'}
        </p>
      </div>

      {/* Customer */}
      <div className="mb-3">
        <p className="font-bold text-xs">CUSTOMER:</p>
        <p>{order.customer.name}</p>
        <p className="text-xs">{order.customer.phone}</p>
        {order.customer.address && (
          <p className="text-xs">{order.customer.address}</p>
        )}
      </div>

      <div className="border-t border-dashed border-foreground/30 my-2" />

      {/* Items */}
      <div className="mb-3">
        {order.items.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>Rs. {item.totalPrice.toFixed(0)}</span>
            </div>
            {item.selectedSize && (
              <p className="text-xs ml-3">- {item.selectedSize}</p>
            )}
            {item.selectedToppings?.map((topping, i) => (
              <p key={i} className="text-xs ml-3">
                + {topping}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-foreground/30 my-2" />

      {/* Total */}
      <div className="text-right mb-4">
        <p className="text-lg font-bold">
          TOTAL: Rs. {order.total.toFixed(0)}
        </p>
      </div>

      <div className="border-t border-dashed border-foreground/30 my-2" />

      {/* Footer */}
      <div className="text-center text-xs">
        <p>Thank you for your order!</p>
        <p>Please visit again</p>
        <p className="mt-2">* * * * * * * * * *</p>
      </div>
    </div>
  );
}
