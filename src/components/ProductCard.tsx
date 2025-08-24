import React from 'react';
import { Produto } from '../data/produtos';

interface ProductCardProps {
    produto: Produto;
    onAddToCart: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ produto, onAddToCart }) => {
    const handleAddToCart = () => {
        if (produto.disponivel) {
            onAddToCart(produto.id);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Badge de Destaque */}
            {produto.destaque && (
                <div className="absolute top-4 left-4 z-10">
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                        <i className="fas fa-star mr-1"></i>
                        Destaque
                    </span>
                </div>
            )}

            {/* Imagem do Produto */}
            <div className="relative h-64 overflow-hidden">
                <img 
                    src={produto.imagem} 
                    alt={produto.nome}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {!produto.disponivel && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                            Indisponível
                        </span>
                    </div>
                )}
            </div>

            {/* Conteúdo do Card */}
            <div className="p-6">
                <div className="mb-2">
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {produto.categoria}
                    </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {produto.nome}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {produto.descricao}
                </p>
                
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-green-600">
                        R$ {produto.preco.toFixed(2)}
                    </div>
                    
                    <button
                        onClick={handleAddToCart}
                        disabled={!produto.disponivel}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            produto.disponivel
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        <i className="fas fa-cart-plus mr-1"></i>
                        {produto.disponivel ? 'Adicionar' : 'Indisponível'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
