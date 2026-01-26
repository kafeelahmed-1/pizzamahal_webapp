import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order } from '@/data/menuData';
import { useToast } from '@/hooks/use-toast';

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const useOrdersContext = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrdersContext must be used within an OrdersProvider');
  }
  return context;
};

// API base URL
const API_BASE_URL = 'http://localhost:4000/api';

// Function to play notification sound
const playNotificationSound = async () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Resume audio context if it's suspended (required by modern browsers)
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Create a pleasant notification sound (ascending notes)
    oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.15); // E5
    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.3); // G5

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.45);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.45);
  } catch (error) {
    console.warn('Could not play notification sound:', error);
  }
};

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  // API functions
  const fetchOrdersFromBackend = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (response.ok) {
        const backendOrders = await response.json();
        // Map backend orders to frontend format
        const mappedOrders = backendOrders.map((order: any) => ({
          id: order._id,
          items: order.items,
          customer: {
            name: order.name,
            phone: order.phone,
            address: order.address,
          },
          orderType: 'delivery' as const, // Default, since backend doesn't have this
          status: order.status,
          total: order.total,
          createdAt: new Date(order.createdAt),
        }));
        return mappedOrders;
      }
    } catch (error) {
      console.warn('Failed to fetch orders from backend:', error);
    }
    return [];
  };

  const createOrderInBackend = async (order: Order) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: order.customer.name,
          phone: order.customer.phone,
          address: order.customer.address,
          items: order.items,
          total: order.total,
        }),
      });
      if (response.ok) {
        const createdOrder = await response.json();
        console.log('Order created in backend:', createdOrder);
      } else {
        console.warn('Failed to create order in backend:', response.statusText);
      }
    } catch (error) {
      console.warn('Error creating order in backend:', error);
    }
  };

  const updateOrderStatusInBackend = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        console.warn('Failed to update order status in backend:', response.statusText);
      }
    } catch (error) {
      console.warn('Error updating order status in backend:', error);
    }
  };

  // Utility function to check if an order is expired (older than 24 hours)
  const isOrderExpired = (order: Order): boolean => {
    const now = new Date();
    const orderTime = new Date(order.createdAt);
    const hoursDiff = (now.getTime() - orderTime.getTime()) / (1000 * 60 * 60);
    return hoursDiff > 24;
  };

  // Function to clean up expired orders
  const cleanupExpiredOrders = () => {
    setOrders((currentOrders) => {
      const validOrders = currentOrders.filter(order => !isOrderExpired(order));
      if (validOrders.length !== currentOrders.length) {
        localStorage.setItem('pizzaOrders', JSON.stringify(validOrders));
        console.log(`Cleaned up ${currentOrders.length - validOrders.length} expired orders`);
      }
      return validOrders;
    });
  };

  useEffect(() => {
    const loadOrders = async () => {
      // First, try to load from backend
      const backendOrders = await fetchOrdersFromBackend();
      if (backendOrders.length > 0) {
        setOrders(backendOrders);
        // Update localStorage with backend data
        localStorage.setItem('pizzaOrders', JSON.stringify(backendOrders));
        console.log('Loaded orders from backend');
      } else {
        // Fallback to localStorage
        const storedOrders = JSON.parse(localStorage.getItem('pizzaOrders') || '[]');
        const parsedOrders = storedOrders.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
        }));
        const validOrders = parsedOrders.filter((order: Order) => !isOrderExpired(order));
        setOrders(validOrders);
        console.log('Loaded orders from localStorage');
      }
    };

    loadOrders();

    // Request notification permission for browser notifications
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted');
        }
      });
    }

    // Set up periodic cleanup and sync every hour
    const syncInterval = setInterval(async () => {
      cleanupExpiredOrders();
      const backendOrders = await fetchOrdersFromBackend();
      if (backendOrders.length > 0) {
        setOrders(backendOrders);
        localStorage.setItem('pizzaOrders', JSON.stringify(backendOrders));
      }
    }, 60 * 60 * 1000); // 1 hour

    // Cleanup on unmount
    return () => clearInterval(syncInterval);
  }, []);

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    );
    // Filter out expired orders before saving
    const validOrders = updatedOrders.filter(order => !isOrderExpired(order));
    setOrders(validOrders);
    localStorage.setItem('pizzaOrders', JSON.stringify(validOrders));

    // Send to backend
    updateOrderStatusInBackend(orderId, status);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => {
      const newOrders = [...prev, order];
      // Filter out expired orders
      const validOrders = newOrders.filter(o => !isOrderExpired(o));
      localStorage.setItem('pizzaOrders', JSON.stringify(validOrders));
      return validOrders;
    });

    // Send to backend
    createOrderInBackend(order);

    // Show beautiful notification for new order
    toast({
      title: "🍕 New Order Alert!",
      description: `Order #${order.id} - ${order.customer.name} (${order.items.length} items) - ₨${order.total.toLocaleString()}`,
      duration: 8000,
      className: "border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950",
    });

    // Play notification sound
    playNotificationSound();

    // Also show a browser notification if permission is granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🍕 New Order Received!', {
        body: `Order #${order.id} from ${order.customer.name} - ₨${order.total.toLocaleString()}`,
        icon: '/favicon.ico',
        tag: 'new-order',
      });
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
};