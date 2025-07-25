import React, { createContext, useContext, ReactNode } from 'react';
import { useCart } from '../hooks/useCart';
import { CartItem, Product } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, quantidade?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantidade: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  toggleCart: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext deve ser usado dentro de um CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const cartMethods = useCart();

  return (
    <CartContext.Provider value={cartMethods}>
      {children}
    </CartContext.Provider>
  );
};
