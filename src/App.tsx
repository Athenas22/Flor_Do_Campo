import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import './App.css';

const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/carrinho" element={<CartPage />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </FavoritesProvider>
  );
};

export default App;
