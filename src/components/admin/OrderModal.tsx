import { Order } from '@/data/menuData';
import { StatusBadge } from './StatusBadge';
import { PrintReceipt } from './PrintReceipt';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MapPin, Phone, Clock, Printer, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface OrderModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onPrint: (order: Order) => void;
  onDownloadPDF: (order: Order) => void;
}

export function OrderModal({ order, isOpen, onClose, onPrint, onDownloadPDF }: OrderModalProps) {
  if (!order) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDownloadPDF = (order: Order) => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="font-family: monospace; font-size: 12px; max-width: 300px; margin: 0 auto; padding: 10px;">
        <div style="text-align: center; margin-bottom: 15px;">
          <h1 style="font-size: 16px; font-weight: bold; margin: 0;">PIZZA MAHAL</h1>
          <p style="font-size: 10px; margin: 2px 0;">Royal Taste Since 2020</p>
          <p style="font-size: 10px; margin: 2px 0;">123 Main Street, City</p>
          <p style="font-size: 10px; margin: 2px 0;">Tel: (555) 123-4567</p>
        </div>
        <div style="border-top: 1px dashed #000; margin: 8px 0;"></div>
        <div style="margin-bottom: 12px;">
          <p style="font-weight: bold; margin: 0;">Order: ${order.id}</p>
          <p style="font-size: 10px; margin: 2px 0;">${formatDate(order.createdAt)}</p>
          <p style="font-size: 10px; margin: 2px 0;">Type: ${order.orderType === 'delivery' ? 'DELIVERY' : 'TAKEAWAY'}</p>
        </div>
        <div style="margin-bottom: 12px;">
          <p style="font-weight: bold; font-size: 10px; margin: 0;">CUSTOMER:</p>
          <p style="margin: 2px 0;">${order.customer.name}</p>
          <p style="font-size: 10px; margin: 2px 0;">${order.customer.phone}</p>
          ${order.customer.address ? `<p style="font-size: 10px; margin: 2px 0;">${order.customer.address}</p>` : ''}
        </div>
        <div style="border-top: 1px dashed #000; margin: 8px 0;"></div>
        <div style="margin-bottom: 12px;">
          ${order.items.map(item => `
            <div style="margin-bottom: 8px;">
              <div style="display: flex; justify-content: space-between;">
                <span>${item.quantity}x ${item.name}</span>
                <span>Rs. ${item.totalPrice.toFixed(0)}</span>
              </div>
              ${item.selectedSize ? `<p style="font-size: 10px; margin: 2px 0 2px 12px;">- ${item.selectedSize}</p>` : ''}
              ${item.selectedToppings?.map(topping => `<p style="font-size: 10px; margin: 2px 0 2px 12px;">+ ${topping}</p>`).join('') || ''}
            </div>
          `).join('')}
        </div>
        <div style="border-top: 1px dashed #000; margin: 8px 0;"></div>
        <div style="text-align: right; margin-bottom: 15px;">
          <p style="font-size: 14px; font-weight: bold; margin: 0;">TOTAL: Rs. ${order.total.toFixed(0)}</p>
        </div>
        <div style="border-top: 1px dashed #000; margin: 8px 0;"></div>
        <div style="text-align: center; font-size: 10px;">
          <p style="margin: 2px 0;">Thank you for your order!</p>
          <p style="margin: 2px 0;">Please visit again</p>
          <p style="margin: 8px 0;">* * * * * * * * * *</p>
        </div>
      </div>
    `;

    const opt = {
      margin: 0.5,
      filename: `receipt-${order.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a6', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-display text-xl">
              Order {order.id}
            </DialogTitle>
            <StatusBadge status={order.status} />
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <h4 className="font-semibold text-foreground">{order.customer.name}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              {order.customer.phone}
            </div>
            {order.customer.address && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {order.customer.address}
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {formatDate(order.createdAt)}
            </div>
            <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
              order.orderType === 'delivery' 
                ? 'bg-info/10 text-info' 
                : 'bg-secondary text-secondary-foreground'
            }`}>
              {order.orderType === 'delivery' ? 'Delivery' : 'Takeaway'}
            </span>
          </div>

          {/* Items */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Order Items</h4>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between rounded-lg border border-border p-3"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {item.quantity}x {item.name}
                    </p>
                    {item.selectedSize && (
                      <p className="text-sm text-muted-foreground">
                        Size: {item.selectedSize}
                      </p>
                    )}
                    {item.selectedToppings && item.selectedToppings.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Extras: {item.selectedToppings.join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold text-foreground">
                    Rs. {item.totalPrice.toFixed(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-lg font-semibold text-foreground">Total</span>
            <span className="text-2xl font-bold text-foreground">
              Rs. {order.total.toFixed(0)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onPrint(order)}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border py-3 font-medium hover:bg-muted transition-colors"
            >
              <Printer className="h-5 w-5" />
              Print Receipt
            </button>
            <button
              onClick={() => onDownloadPDF(order)}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-3 font-medium hover:bg-primary/90 transition-colors"
            >
              <Download className="h-5 w-5" />
              Download PDF
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
