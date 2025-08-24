import React from 'react';

const Banner: React.FC = () => {
    const scrollToProducts = () => {
        const productsSection = document.getElementById('produtos');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="banner-boas-vindas">
            <div className="banner-content">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    BEM-VINDO À FLOR DO CAMPO
                </h1>
                <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                    Produtos naturais selecionados para seu bem-estar
                </p>
                <button
                    className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
                    onClick={scrollToProducts}
                >
                    Explorar Produtos
                </button>
            </div>
        </section>
    );
};

export default Banner;
