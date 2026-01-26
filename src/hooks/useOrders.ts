import { useState, useEffect } from 'react';
import { Order } from '@/data/menuData';
import { useToast } from '@/hooks/use-toast';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

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

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('pizzaOrders') || '[]');
    // Convert createdAt strings back to Date objects
    const parsedOrders = storedOrders.map((order: any) => ({
      ...order,
      createdAt: new Date(order.createdAt),
    }));
    setOrders(parsedOrders);

    // Request notification permission for browser notifications
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted');
        }
      });
    }
  }, []);

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('pizzaOrders', JSON.stringify(updatedOrders));
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [...prev, order]);
    const existingOrders = JSON.parse(localStorage.getItem('pizzaOrders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('pizzaOrders', JSON.stringify(existingOrders));

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

  return { orders, updateOrderStatus, addOrder };
};