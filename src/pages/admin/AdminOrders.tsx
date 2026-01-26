import { useState, useRef } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { OrderCard } from '@/components/admin/OrderCard';
import { OrderModal } from '@/components/admin/OrderModal';
import { PrintReceipt } from '@/components/admin/PrintReceipt';
import { useOrdersContext } from '@/context/OrdersContext';
import { Order } from '@/data/menuData';
import { Search, Filter, Menu } from 'lucide-react';

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useOrdersContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orderToPrint, setOrderToPrint] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
            All Orders
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        <div className="p-4 lg:p-8">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h1 className="font-display text-4xl font-extrabold text-gradient text-shadow">
              All Orders
            </h1>
            <p className="text-muted-foreground mt-1">
              Search and manage all orders
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by order ID, name, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Order['status'] | 'all')}
                className="rounded-lg border border-input bg-card px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>

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

      {/* Print area */}
      <div className="hidden print:block">
        {orderToPrint && <PrintReceipt order={orderToPrint} />}
      </div>
    </div>
  );
};

export default AdminOrders;
