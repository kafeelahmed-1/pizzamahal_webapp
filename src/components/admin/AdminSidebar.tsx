import { LayoutDashboard, ClipboardList, BarChart3, Pizza, ArrowLeft, LogOut, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useOrdersContext } from '@/context/OrdersContext';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: ClipboardList, label: 'Orders', path: '/admin/orders' },
  { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {
  const location = useLocation();
  const { orders } = useOrdersContext();
  const { user, logout } = useAuth();

  // Count pending orders
  const pendingOrdersCount = orders.filter(order => order.status === 'pending').length;

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex h-full flex-col">
          {/* Mobile Close Button */}
          <div className="lg:hidden flex justify-end p-4 border-b border-sidebar-border">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
              <Pizza className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-gradient text-shadow">
                Pizza Mahal
              </h1>
              <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const isOrdersPage = item.path === '/admin/orders';
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="flex-1">{item.label}</span>
                      {isOrdersPage && pendingOrdersCount > 0 && (
                        <Badge variant="destructive" className="ml-auto animate-pulse">
                          {pendingOrdersCount}
                        </Badge>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="border-t border-sidebar-border px-4 py-4">
            <div className="mb-3 px-4">
              <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/60">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          {/* Back to Store */}
          <div className="border-t border-sidebar-border px-4 py-4">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Store
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
