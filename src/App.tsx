import React from 'react';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import HomePage from './pages/HomePage';
import './App.css';

const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <HomePage />
        </div>
      </CartProvider>
    </FavoritesProvider>
  );
};

export default App;
