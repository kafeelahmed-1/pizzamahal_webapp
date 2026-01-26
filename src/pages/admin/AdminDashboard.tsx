import { useState, useRef } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { OrderCard } from '@/components/admin/OrderCard';
import { OrderModal } from '@/components/admin/OrderModal';
import { PrintReceipt } from '@/components/admin/PrintReceipt';
import { useOrdersContext } from '@/context/OrdersContext';
import { Order } from '@/data/menuData';
import { ClipboardList, Clock, ChefHat, Package, CheckCircle, Menu } from 'lucide-react';

const statusFilters = [
  { id: 'all', label: 'All Orders', icon: ClipboardList },
  { id: 'pending', label: 'Pending', icon: Clock },
  { id: 'preparing', label: 'Preparing', icon: ChefHat },
  { id: 'ready', label: 'Ready', icon: Package },
  { id: 'completed', label: 'Completed', icon: CheckCircle },
];

const AdminDashboard = () => {
  const { orders, updateOrderStatus } = useOrdersContext();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const [orderToPrint, setOrderToPrint] = useState<Order | null>(null);

  const filteredOrders =
    activeFilter === 'all'
      ? orders
      : orders.filter((order) => order.status === activeFilter);

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handlePrint = (order: Order) => {
    setOrderToPrint(order);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleDownloadPDF = (order: Order) => {
    // This will be handled by the OrderModal component
  };

  const orderCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    ready: orders.filter((o) => o.status === 'ready').length,
    completed: orders.filter((o) => o.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="font-display text-xl font-extrabold text-gradient text-shadow">
            Orders Dashboard
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        <div className="p-4 lg:p-8">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h1 className="font-display text-4xl font-extrabold text-gradient text-shadow">
              Orders Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all incoming orders
            </p>
          </div>

          {/* Status Filters */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {statusFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border hover:bg-muted'
                }`}
              >
                <filter.icon className="h-4 w-4" />
                {filter.label}
                <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                  activeFilter === filter.id
                    ? 'bg-primary-foreground/20'
                    : 'bg-muted'
                }`}>
                  {orderCounts[filter.id as keyof typeof orderCounts]}
                </span>
              </button>
            ))}
          </div>

          {/* Orders Grid */}
          {filteredOrders.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-8 lg:p-12 text-center">
              <p className="text-muted-foreground">No orders found</p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onViewDetails={handleViewDetails}
                  onPrint={handlePrint}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <OrderModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        onPrint={handlePrint}
        onDownloadPDF={handleDownloadPDF}
      />

      {/* Print area - hidden on screen */}
      <div className="hidden print:block">
        {orderToPrint && <PrintReceipt order={orderToPrint} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
