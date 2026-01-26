import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, MenuItem } from '@/data/menuData';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: MenuItem, quantity: number, size?: string, toppings?: string[]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const calculateItemPrice = (
    item: MenuItem,
    quantity: number,
    size?: string,
    toppings?: string[]
  ): number => {
    let basePrice = item.price;
    
    if (size && item.sizes) {
      const sizeModifier = item.sizes.find((s) => s.name === size)?.priceModifier || 0;
      basePrice += sizeModifier;
    }
    
    if (toppings && item.toppings) {
      toppings.forEach((toppingName) => {
        const topping = item.toppings?.find((t) => t.name === toppingName);
        if (topping) basePrice += topping.price;
      });
    }
    
    return basePrice * quantity;
  };

  const addItem = (
    item: MenuItem,
    quantity: number,
    size?: string,
    toppings?: string[]
  ) => {
    const cartItemId = `${item.id}-${size || 'default'}-${(toppings || []).sort().join(',')}`;
    
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.id === item.id &&
          i.selectedSize === size &&
          JSON.stringify(i.selectedToppings?.sort()) === JSON.stringify(toppings?.sort())
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQuantity = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQuantity,
          totalPrice: calculateItemPrice(item, newQuantity, size, toppings),
        };
        return updated;
      }

      return [
        ...prev,
        {
          ...item,
          quantity,
          selectedSize: size,
          selectedToppings: toppings,
          totalPrice: calculateItemPrice(item, quantity, size, toppings),
        },
      ];
    });

    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id || prev.indexOf(item) !== prev.findIndex((i) => i.id === id)));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((prev) =>
      prev.map((item, index) => {
        if (prev.findIndex((i) => i.id === id) === index) {
          return {
            ...item,
            quantity,
            totalPrice: calculateItemPrice(
              item,
              quantity,
              item.selectedSize,
              item.selectedToppings
            ),
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => setItems([]);
  const toggleCart = () => setIsOpen((prev) => !prev);
  const closeCart = () => setIsOpen(false);
  const openCart = () => setIsOpen(true);

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        openCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
