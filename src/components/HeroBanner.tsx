import React from 'react';
import { scrollToElement } from '../utils/helpers';

const HeroBanner: React.FC = () => {
  const handleScrollToCatalog = () => {
    scrollToElement('catalogo');
  };

  return (
    <section className="banner-boas-vindas">
      <div className="banner-content">
        <h1 className="text-4xl md:text-5xl">Bem-vindo à Flor do Campo</h1>
        <p className="text-lg">Produtos naturais selecionados para seu bem-estar</p>
        <button 
          onClick={handleScrollToCatalog}
          className="btn-explorar"
        >
          Explorar Produtos
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
