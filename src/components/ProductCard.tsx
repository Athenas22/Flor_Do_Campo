import React, { useState } from 'react';
import { Product } from '../types';
import { useCartContext } from '../contexts/CartContext';
import { useFavoritesContext } from '../contexts/FavoritesContext';
import { formatPrice } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const { addToCart } = useCartContext();
  const { toggleFavorite, isFavorite } = useFavoritesContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    
    // Simular loading para melhor UX
    setTimeout(() => {
      addToCart(product);
      setIsLoading(false);
    }, 300);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleCardClick = () => {
    onProductClick?.(product);
  };

  const getCategoryBadge = (categoria: string) => {
    const badges = {
      'cha': { label: '🍃 Chá', color: 'bg-green-100 text-green-800' },
      'cosmetico': { label: '💄 Cosmético', color: 'bg-pink-100 text-pink-800' },
      'alimento': { label: '🍯 Alimento', color: 'bg-yellow-100 text-yellow-800' },
      'suplemento': { label: '💊 Suplemento', color: 'bg-blue-100 text-blue-800' },
      'oleo': { label: '🌿 Óleo', color: 'bg-purple-100 text-purple-800' }
    };
    
    return badges[categoria as keyof typeof badges] || { label: categoria, color: 'bg-gray-100 text-gray-800' };
  };

  const badge = getCategoryBadge(product.categoria);

  return (
    <div className="produto-card bg-white border rounded-xl shadow-lg overflow-hidden transform hover:scale-102 hover:shadow-2xl transition-all duration-300 group relative max-w-sm mx-auto h-[700px] flex flex-col">
      {/* Badge de categoria */}
      <div className="absolute top-3 left-3 z-20">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
          {badge.label}
        </span>
      </div>

      {/* Heart icon para favoritar */}
      <div className="absolute top-3 right-3 z-20">
        <button 
          onClick={handleFavoriteClick}
          className={`w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center transition-all duration-200 ${
            isFavorite(product.id) 
              ? 'text-red-500 hover:text-red-600' 
              : 'text-gray-400 hover:text-red-500'
          } hover:bg-white`}
        >
          <i className={`fas fa-heart text-sm ${isFavorite(product.id) ? 'fas' : 'far'}`}></i>
        </button>
      </div>
      
      <div 
        className="produto-link block cursor-pointer flex-1 flex flex-col"
        onClick={handleCardClick}
      >
        <div className="relative overflow-hidden">
          <img 
            src={product.imagem} 
            alt={product.nome} 
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-3 text-lg leading-tight group-hover:text-green-600 transition-colors min-h-[3.5rem] overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
            {product.nome}
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-green-600">
                {formatPrice(product.preco)}
              </p>
              <p className="text-sm text-gray-500">à vista</p>
            </div>
            
            <div className="flex items-center text-yellow-400">
              <i className="fas fa-star text-sm"></i>
              <i className="fas fa-star text-sm"></i>
              <i className="fas fa-star text-sm"></i>
              <i className="fas fa-star text-sm"></i>
              <i className="fas fa-star text-sm"></i>
              <span className="text-gray-500 text-sm ml-1">(4.8)</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mb-4 space-y-2 flex-1">
            <span className="flex items-center gap-2">
              <i className="fas fa-shipping-fast text-green-600"></i>
              <span>Entrega rápida disponível</span>
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-leaf text-green-600"></i>
              <span>100% Natural</span>
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-shield-alt text-blue-600"></i>
              <span>Garantia de qualidade</span>
            </span>
          </div>
        </div>
      </div>
      
      <div className="card-actions p-6 pt-0 space-y-3 mt-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Disponível em estoque</span>
          <span className="text-xs text-green-600 font-semibold">✓ Pronto para envio</span>
        </div>
        
        <button 
          onClick={handleAddToCart}
          disabled={isLoading}
          className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl transform hover:scale-105 hover:-translate-y-1'
          } text-white shadow-lg`}
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin text-lg"></i>
              <span>Adicionando...</span>
            </>
          ) : (
            <>
              <i className="fas fa-shopping-cart text-lg"></i>
              <span>Adicionar ao Carrinho</span>
            </>
          )}
        </button>
        
        <div className="space-y-2">
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium">
            <i className="fas fa-eye"></i>
            Ver Detalhes
          </button>
          <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium">
            <i className="fas fa-share-alt"></i>
            Compartilhar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
