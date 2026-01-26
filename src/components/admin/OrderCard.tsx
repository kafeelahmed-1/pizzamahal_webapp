import { Clock, MapPin, Phone, Printer, Eye } from 'lucide-react';
import { Order } from '@/data/menuData';
import { StatusBadge } from './StatusBadge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: Order['status']) => void;
  onViewDetails: (order: Order) => void;
  onPrint: (order: Order) => void;
}

export function OrderCard({ order, onStatusChange, onViewDetails, onPrint }: OrderCardProps) {
  const timeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold text-foreground">
              {order.id}
            </span>
            <StatusBadge status={order.status} />
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {timeAgo(order.createdAt)}
          </div>
        </div>
        <span className="text-lg font-bold text-foreground">
          Rs. {order.total.toFixed(0)}
        </span>
      </div>

      {/* Customer Info */}
      <div className="space-y-1 text-sm">
        <p className="font-medium text-foreground">{order.customer.name}</p>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Phone className="h-3 w-3" />
          {order.customer.phone}
        </div>
        {order.customer.address && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {order.customer.address}
          </div>
        )}
        <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
          order.orderType === 'delivery' 
            ? 'bg-info/10 text-info' 
            : 'bg-muted text-muted-foreground'
        }`}>
          {order.orderType === 'delivery' ? 'Delivery' : 'Takeaway'}
        </span>
      </div>

      {/* Items Summary */}
      <div className="border-t border-border pt-3">
        <p className="text-xs text-muted-foreground mb-1">Items:</p>
        <ul className="space-y-0.5 text-sm">
          {order.items.slice(0, 2).map((item, index) => (
            <li key={index} className="text-foreground">
              {item.quantity}x {item.name}
              {item.selectedSize && ` (${item.selectedSize})`}
            </li>
          ))}
          {order.items.length > 2 && (
            <li className="text-muted-foreground">
              +{order.items.length - 2} more items
            </li>
          )}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-border">
        <Select
          value={order.status}
          onValueChange={(value) => onStatusChange(order.id, value as Order['status'])}
        >
          <SelectTrigger className="flex-1 h-9 text-sm bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <button
          onClick={() => onViewDetails(order)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
          title="View Details"
        >
          <Eye className="h-4 w-4" />
        </button>

        <button
          onClick={() => onPrint(order)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
          title="Print Order"
        >
          <Printer className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
