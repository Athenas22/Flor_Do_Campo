import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import FeaturedProducts from '../components/FeaturedProducts';
import Catalog from '../components/Catalog';
import CartSidebar from '../components/CartSidebar';
import Footer from '../components/Footer';
import { Product } from '../types';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleProductClick = (product: Product) => {
    // TODO: Implementar navegação para página de detalhes do produto
    console.log('Produto clicado:', product);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearchChange={handleSearchChange} />
      <CartSidebar />
      
      {/* Espaçamento para compensar o navbar fixo */}
      <div className="pt-20">
        <HeroBanner />
        
        <main className="space-y-16 pt-16">
          <FeaturedProducts onProductClick={handleProductClick} />
          <Catalog 
            searchTerm={searchTerm} 
            onProductClick={handleProductClick}
          />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
