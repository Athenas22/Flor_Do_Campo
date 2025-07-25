import React, { useState, useEffect } from 'react';
import { useCartContext } from '../contexts/CartContext';

interface NavbarProps {
  onSearchChange?: (searchTerm: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchChange }) => {
  const { toggleCart, getCartItemsCount } = useCartContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItemsCount = getCartItemsCount();

  // Detectar scroll para alterar o estilo do navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    // Chamar uma vez para definir o estado inicial
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange?.(searchTerm);
  };

  return (
    <nav className={`navbar transition-all duration-300 ${
      isScrolled ? 'scrolled' : ''
    }`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="logo">
          <a href="#" className="logo-link">
            <h1 className={`font-bold transition-all duration-300 ${
              isScrolled ? 'text-green-700 text-xl' : 'text-gray-800 text-2xl'
            }`}>
              Flor do Campo 🌼
            </h1>
          </a>
        </div>
        <div className="nav-right flex items-center space-x-6">
          <form onSubmit={handleSearchSubmit} className="search-bar hidden md:flex">
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              value={searchTerm}
              onChange={handleSearchChange}
              className={`border rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 ${
                isScrolled ? 'w-64' : 'w-80'
              }`}
            />
            <button 
              type="submit"
              className="bg-green-600 text-white px-4 rounded-r-md hover:bg-green-700 transition-colors"
            >
              <i className="fas fa-search"></i>
            </button>
          </form>
          <div className="nav-icons flex items-center space-x-5">
            <button 
              onClick={toggleCart}
              className="text-gray-600 hover:text-green-700 cursor-pointer transition-all relative"
            >
              <i className="fas fa-shopping-cart text-2xl"></i>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <a href="#" className="text-gray-600 hover:text-green-700">
              <i className="fas fa-user text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
