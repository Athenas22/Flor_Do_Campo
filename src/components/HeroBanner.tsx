import React from 'react';
import { scrollToElement } from '../utils/helpers';

const HeroBanner: React.FC = () => {
  const handleScrollToCatalog = () => {
    scrollToElement('catalogo');
  };

  return (
    <section className="banner-boas-vindas">
      <div className="banner-content text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Bem-vindo à Flor do Campo</h1>
        <p className="mt-4 text-lg">Produtos naturais selecionados para seu bem-estar</p>
        <button 
          onClick={handleScrollToCatalog}
          className="btn-explorar mt-8 inline-block bg-white text-green-800 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          Explorar Produtos
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
