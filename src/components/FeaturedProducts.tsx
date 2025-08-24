import React from 'react';
import { produtos } from '../data/produtos';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface FeaturedProductsProps {
  onProductClick?: (product: Product) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onProductClick }) => {
  // Pegar os primeiros 4 produtos como destaque
  const featuredProducts = produtos.slice(0, 4);

  return (
    <section className="ofertas py-16 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="w-full px-6 lg:px-12 xl:px-16">
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{fontSize: '4rem'}}>
              ✨ Produtos em Destaque
            </h2>
            <p className="text-lg text-gray-600 text-center">
              Descubra nossa seleção especial de produtos naturais com qualidade premium
            </p>
          </div>
          
          {/* Espaçador visual */}
          <div className="h-8"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {featuredProducts.map((product) => (
            <div key={product.id} className="w-full max-w-sm">
              <ProductCard
                product={product}
                onProductClick={onProductClick}
              />
              </div>
            ))}
        </div>
        
        <div className="text-center mt-16">
          <button 
            onClick={() => {
              const catalogSection = document.getElementById('catalogo');
              catalogSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-green-600 text-white font-bold py-4 px-12 text-lg rounded-full shadow-xl hover:bg-green-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Ver Todos os Produtos
          </button>
        </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;