import { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem('florDoCampo_carrinho');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('florDoCampo_carrinho', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantidade: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantidade }];
      }
    });
    
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantidade: number) => {
    if (quantidade <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantidade }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantidade, 0);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    toggleCart,
    setIsCartOpen
  };
};
